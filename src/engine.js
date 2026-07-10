/* ==========================================
   engine.js — 游戏核心状态机 v2
   章节制 + 职业追踪 + 属性 + 结局
   ========================================== */

const GameEngine = {

  state: {
    screen: 'title',
    chapter: null,
    currentScene: null,
    attributes: { 专业度: 50, 人缘: 50, 体力: 80, 运气: 40 },
    history: [],
    jokeEndingsSeen: [],
    propertyEndingsSeen: [],
    careerEndingsSeen: [],
    previousScene: null,
    _skipDecay: false,
    // 本章统计
    chapterStats: {
      goodChoices: 0,
      badChoices: 0,
      visitedCrisis: false,   // 是否经历了可避免的危机场景
      visitedHesitation: false,
    },
  },

  // ===== 开始新游戏 =====
  startNewGame() {
    Career.init();
    this.state.chapter = chapter1;
    this.state.attributes = { 专业度: 50, 人缘: 50, 体力: 80, 运气: 40 };
    this.state.history = [];
    this.state.currentScene = this.state.chapter.initialScene;
    this.state.screen = 'game';
    this.state.previousScene = null;
    this.state._skipDecay = false;
    this.state.chapterStats = { goodChoices: 0, badChoices: 0, visitedCrisis: false, visitedHesitation: false };
    Storage.save(this.state);
    Renderer.showGameScreen();
    this.loadCurrentScene();
  },

  // ===== 继续游戏 =====
  continueGame() {
    const saved = Storage.load();
    if (!saved || !saved.chapterId) {
      this.startNewGame();
      return;
    }
    Career.init();
    this.state.chapter = chapter1; // 目前只有第一章
    this.state.attributes = saved.attributes;
    this.state.history = saved.history || [];
    this.state.currentScene = saved.currentScene;
    this.state.screen = 'game';
    this.state.previousScene = null;
    this.state._skipDecay = false;
    this.state.jokeEndingsSeen = saved.jokeEndingsSeen || [];
    this.state.propertyEndingsSeen = saved.propertyEndingsSeen || [];
    this.state.careerEndingsSeen = saved.careerEndingsSeen || [];
    this.state.chapterStats = saved.chapterStats || { goodChoices: 0, badChoices: 0, visitedCrisis: false, visitedHesitation: false };
    Renderer.showGameScreen();
    this.loadCurrentScene();
  },

  // ===== 加载场景 =====
  loadCurrentScene() {
    const scene = this.state.chapter.scenes[this.state.currentScene];
    if (!scene) {
      console.error('找不到场景:', this.state.currentScene);
      return;
    }

    // 体力衰减
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

    // 记录历史
    this.state.history.push({
      scene: this.state.currentScene,
      sceneTitle: scene.title,
      choiceIndex: index,
      choiceText: choice.text,
    });

    // 追踪选择质量
    if (choice.quality === 'good') this.state.chapterStats.goodChoices++;
    if (choice.quality === 'bad') this.state.chapterStats.badChoices++;

    // 追踪是否进入危机场景
    if (this.state.currentScene === 'scene_hesitation') {
      this.state.chapterStats.visitedHesitation = true;
    }
    if (this.state.currentScene === 'scene_defibrillation' ||
        this.state.currentScene === 'scene_orders_echo') {
      this.state.chapterStats.visitedCrisis = true;
    }

    // 应用属性变化
    if (choice.attr) {
      for (const [key, delta] of Object.entries(choice.attr)) {
        this.state.attributes[key] = Math.max(
          0, Math.min(100, this.state.attributes[key] + delta)
        );
      }
    }

    // 梗结局
    if (choice.jokeEnding) {
      this.state.previousScene = this.state.currentScene;
      this.state.screen = 'jokeEnding';
      if (!this.state.jokeEndingsSeen.includes(choice.jokeEnding)) {
        this.state.jokeEndingsSeen.push(choice.jokeEnding);
      }
      const ending = Endings.getJokeEnding(choice.jokeEnding);
      Storage.save(this.state);
      Renderer.showJokeEnding(ending, this.state.jokeEndingsSeen.length);
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

  // ===== 从梗结局返回 =====
  returnFromJokeEnding() {
    if (!this.state.previousScene) return;
    this.state.currentScene = this.state.previousScene;
    this.state.previousScene = null;
    this.state.screen = 'game';
    this.state._skipDecay = true;
    Renderer.showGameScreen();
    this.loadCurrentScene();
  },

  // ===== 章节结算 =====
  finishChapter() {
    const cs = this.state.chapterStats;

    // 判断本章结果
    let outcome;
    if (cs.visitedHesitation || cs.badChoices >= 3) {
      outcome = 'nearMiss';  // 犹豫/犯错但最终救回来了
    } else if (cs.visitedCrisis) {
      outcome = 'nearMiss';
    } else if (cs.badChoices === 0 && cs.goodChoices >= 3) {
      outcome = 'perfect';
    } else {
      outcome = 'success';
    }

    const majorMistake = cs.visitedHesitation && cs.badChoices >= 3;

    Career.recordChapter(this.state.chapter.id, {
      correctChoices: cs.goodChoices,
      badChoices: cs.badChoices,
      majorMistake: majorMistake,
      nearMiss: outcome === 'nearMiss',
    });

    // 检查职业结局
    const careerEndingId = Career.checkCareerEnding();

    if (careerEndingId) {
      if (!this.state.careerEndingsSeen.includes(careerEndingId)) {
        this.state.careerEndingsSeen.push(careerEndingId);
      }
      const ending = Endings.getCareerEnding(careerEndingId);
      this.state.screen = 'careerEnding';
      Storage.save(this.state);
      Renderer.showCareerEnding(ending, Career.getStats());
    } else {
      this.state.screen = 'chapterComplete';
      Storage.save(this.state);
      Renderer.showChapterComplete(outcome, this.state.attributes, Career.getStats());
    }
  },

  // ===== 获取属性提示 =====
  getAttrHints() {
    const a = this.state.attributes;
    const hints = [];
    if (a.体力 < 30) hints.push('😵 已经很累了，眼前有些发虚');
    else if (a.体力 < 50) hints.push('🥱 体力在下降');
    if (a.专业度 >= 70) hints.push('📋 临床判断在线');
    if (a.专业度 <= 25) hints.push('😰 对自己的诊断越来越没信心');
    return hints;
  },
};
