/* ==========================================
   engine.js v3 — 致命选项 + 属性跨章 + 累计结局
   ========================================== */

const GameEngine = {

  chapters: { ch1: chapter1, ch2: chapter2 },

  state: {
    screen: 'title',
    chapterId: null,
    chapter: null,
    currentScene: null,
    attributes: { 专业度: 50, 人缘: 50, 体力: 80, 运气: 40 },
    history: [],
    jokeEndingsSeen: [],
    previousScene: null,
    _skipDecay: false,
    chapterStats: { goodChoices: 0, badChoices: 0, fatalMistake: false },
  },

  // ===== 从 career 加载跨章属性 =====
  loadAttributes() {
    Career.init();
    const s = Career.getStats();
    if (s.attributes) {
      this.state.attributes = Object.assign({}, s.attributes);
    } else {
      this.state.attributes = { 专业度: 50, 人缘: 50, 体力: 80, 运气: 40 };
    }
  },

  saveAttributes() {
    Career.getStats().attributes = Object.assign({}, this.state.attributes);
    Career.save();
  },

  // ===== 开始章节 =====
  startChapter(chapterId) {
    Career.init();
    const ch = this.chapters[chapterId];
    if (!ch) { console.error('章节不存在:', chapterId); return; }
    this.state.chapterId = chapterId;
    this.state.chapter = ch;
    this.loadAttributes();
    this.state.history = [];
    this.state.currentScene = ch.initialScene;
    this.state.screen = 'game';
    this.state.previousScene = null;
    this.state._skipDecay = false;
    this.state.chapterStats = { goodChoices: 0, badChoices: 0, fatalMistake: false };
    this._finishChapterCalled = false;
    Storage.save(this.state);
    Renderer.showGameScreen();
    this.loadCurrentScene();
  },

  // ===== 继续游戏 =====
  continueGame() {
    const saved = Storage.load();
    if (!saved || !saved.chapterId) { this.startChapter('ch1'); return; }
    Career.init();
    const ch = this.chapters[saved.chapterId] || chapter1;
    this.state.chapterId = saved.chapterId;
    this.state.chapter = ch;
    this.state.attributes = saved.attributes || { 专业度: 50, 人缘: 50, 体力: 80, 运气: 40 };
    this.state.history = saved.history || [];
    this.state.currentScene = saved.currentScene;
    this.state.screen = 'game';
    this.state.previousScene = null;
    this.state._skipDecay = false;
    this.state.jokeEndingsSeen = saved.jokeEndingsSeen || [];
    this.state.chapterStats = saved.chapterStats || { goodChoices: 0, badChoices: 0, fatalMistake: false };
    Renderer.showGameScreen();
    this.loadCurrentScene();
  },

  // ===== 加载场景 =====
  loadCurrentScene() {
    const scene = this.state.chapter.scenes[this.state.currentScene];
    if (!scene) { console.error('找不到场景:', this.state.currentScene); return; }
    if (this.state.history.length > 0 && !this.state._skipDecay) {
      this.state.attributes.体力 = Math.max(0, this.state.attributes.体力 - 2);
    }
    this.state._skipDecay = false;
    Renderer.showScene(scene, this.state.attributes);
  },

  // ===== 玩家选择 =====
  choose(index) {
    if (this.state.screen !== 'game') return;
    const scene = this.state.chapter.scenes[this.state.currentScene];
    const choice = scene.choices[index];
    if (!choice) return;

    this.state.history.push({
      scene: this.state.currentScene,
      sceneTitle: scene.title,
      choiceIndex: index,
      choiceText: choice.text,
    });

    if (choice.quality === 'good') this.state.chapterStats.goodChoices++;
    if (choice.quality === 'bad') this.state.chapterStats.badChoices++;

    if (choice.attr) {
      for (const [key, delta] of Object.entries(choice.attr)) {
        this.state.attributes[key] = Math.max(0, Math.min(100, this.state.attributes[key] + delta));
      }
    }

    // 梗结局（可回溯）
    if (choice.jokeEnding) {
      this.state.previousScene = this.state.currentScene;
      this.state.screen = 'jokeEnding';
      if (!this.state.jokeEndingsSeen.includes(choice.jokeEnding)) {
        this.state.jokeEndingsSeen.push(choice.jokeEnding);
      }
      Storage.save(this.state);
      Renderer.showJokeEnding(Endings.getJokeEnding(choice.jokeEnding), this.state.jokeEndingsSeen.length);
      return;
    }

    // ★ 致命选项：章节失败结局
    if (choice.fatalEnding) {
      this.state.chapterStats.fatalMistake = true;
      this.state.screen = 'failEnding';
      // 统一走 finishChapter 记录成绩
      this.finishChapter();
      Renderer.showChapterFailEnding(Endings.getChapterFailEnding(choice.fatalEnding));
      return;
    }

    // 章节结束
    if (choice.isChapterEnd) {
      this.finishChapter();
      return;
    }

    // 正常跳转
    if (choice.next) {
      this.state.currentScene = choice.next;
      Storage.save(this.state);
      this.loadCurrentScene();
    }
  },

  // ===== 梗结局返回 =====
  returnFromJokeEnding() {
    if (!this.state.previousScene) return;
    this.state.currentScene = this.state.previousScene;
    this.state.previousScene = null;
    this.state.screen = 'game';
    this.state._skipDecay = true;
    Renderer.showGameScreen();
    this.loadCurrentScene();
  },

  // ===== 章节结算（只调用一次！）=====
  _finishChapterCalled: false,
  finishChapter() {
    if (this._finishChapterCalled) return; // 防止重复调用
    this._finishChapterCalled = true;

    this.saveAttributes();

    const cs = this.state.chapterStats;
    const majorMistake = cs.fatalMistake;

    Career.recordChapter(this.state.chapterId, {
      correctChoices: cs.goodChoices || 0,
      badChoices: cs.badChoices || 0,
      majorMistake: majorMistake,
      nearMiss: !majorMistake && cs.badChoices >= 2,
    });

    // 致命结局 → 不检查后续，直接返回
    if (majorMistake) {
      return;
    }

    // 每章结束体力自然衰减
    this.state.attributes.体力 = Math.max(0, this.state.attributes.体力 - 10);
    this.saveAttributes();

    const careerStats = Career.getStats();

    // 累计结局检查（按优先级）
    if (this.state.attributes.体力 < 20) {
      this.state.screen = 'cumulativeEnding';
      Storage.save(this.state);
      Renderer.showCumulativeEnding(Endings.getCumulativeEnding('overwork_death'), Career.getStats());
      return;
    }

    if (careerStats.reputation < 20) {
      this.state.screen = 'cumulativeEnding';
      Storage.save(this.state);
      Renderer.showCumulativeEnding(Endings.getCumulativeEnding('complaint_fired'), Career.getStats());
      return;
    }

    // 晋级检查
    if (careerStats.patientsSaved >= 10) {
      this.state.screen = 'promotionEnding';
      Storage.save(this.state);
      Renderer.showPromotionEnding(Endings.getPromotionEnding('attending_exam'));
      return;
    }

    // 正常结算
    const outcome = cs.badChoices >= 2 ? 'nearMiss' : 'success';
    this.state.screen = 'chapterComplete';
    Storage.save(this.state);
    Renderer.showChapterComplete(outcome, this.state.attributes, Career.getStats());
  },

  // ===== 属性提示 =====
  getAttrHints() {
    const a = this.state.attributes;
    const hints = [];
    if (a.体力 < 25) hints.push('😵 你很累了——眼睛发虚，腿在抖');
    else if (a.体力 < 40) hints.push('🥱 体力在下降');
    if (a.专业度 >= 70) hints.push('📋 临床判断在线');
    if (a.人缘 <= 25) hints.push('😐 你感觉和团队有些疏远');
    return hints;
  },
};
