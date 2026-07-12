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
    attributes: { 专业度: 50, 满意度: 50, 体力: 80, 运气: 40 },
    history: [],
    jokeEndingsSeen: [],
    previousScene: null,
    _skipDecay: false,
    chapterStats: { goodChoices: 0, badChoices: 0, fatalMistake: false },
    pathFlags: {},
    _yiNaoTriggered: false,  // 本章是否已触发医闹
  },

  // ===== 从 career 加载跨章属性 =====
  loadAttributes() {
    Career.init();
    const s = Career.getStats();
    if (s.attributes) {
      this.state.attributes = Object.assign({}, s.attributes);
    } else {
      this.state.attributes = { 专业度: 50, 满意度: 50, 体力: 80, 运气: 40 };
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
    this.state.pathFlags = {};
    this.state._yiNaoTriggered = false;
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
    this.state.attributes = saved.attributes || { 专业度: 50, 满意度: 50, 体力: 80, 运气: 40 };
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

  // ===== 加载场景（不再自动扣体力——体力只由关键选择决定）=====
  loadCurrentScene() {
    const scene = this.state.chapter.scenes[this.state.currentScene];
    if (!scene) { console.error('找不到场景:', this.state.currentScene); return; }
    this.state._skipDecay = false;
    // 动态场景：根据 pathFlags 生成文本
    if (scene.dynamic) {
      const dynamicScene = this.buildDynamicScene(scene);
      Renderer.showScene(dynamicScene, this.state.attributes);
      return;
    }

    Renderer.showScene(scene, this.state.attributes);
  },

  // ===== 动态场景生成（根据路径标记）=====
  buildDynamicScene(scene) {
    const f = this.state.pathFlags;
    let text = scene.baseText || scene.text;

    // 第一章：胸痛复盘
    if (scene.id === 'scene_debrief_content') {
      if (f.handledWife === 'warm') {
        text += '\n\n"另外——你跟家属的沟通——今天做得很好。那个病人的老婆后来跟林姐说——她说那个小医生让她觉得被听见了。这种事——教科书上不教。但你做到了。"';
      } else if (f.handledWife === 'cold') {
        text += '\n\n"还有一件事——家属。你今天跟那个病人老婆的沟通——差点被投诉。急诊科——家属有时候比病人更需要你。下次——多听两句，少说两句。"';
      }

      if (f.treatment === 'delay') {
        text += '\n\n"你今天在治疗上犹豫了——心电图出来了还在等。记住——心肌坏死的速度是按分钟算的。宁可多做——不能少做。"';
      } else if (f.treatment === 'correct') {
        text += '\n\n"治疗方向选对了——及时抽血、请会诊、走流程。这就是标准路径——没什么花哨——但管用。"';
      }
    }

    return Object.assign({}, scene, { text: text });
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
    if (choice.setFlag) Object.assign(this.state.pathFlags, choice.setFlag);

    // ★ 医闹触发：满意度跌破60且本章未触发过
    if (this.state.attributes.满意度 < 60 && !this.state._yiNaoTriggered &&
        !choice.fatalEnding && !choice.jokeEnding && !choice.isChapterEnd) {
      this.state._yiNaoTriggered = true;
      this._yiNaoPendingNext = choice.next; // 存下原本要去的地方
      Storage.save(this.state);
      Renderer.showYiNao(this.state.attributes);
      return;
    }

    // 标记路由：根据 flag 决定下一个场景
    let nextScene = choice.next;
    if (choice.routeByFlag) {
      for (const [flag, target] of Object.entries(choice.routeByFlag)) {
        if (this.state.pathFlags[flag]) { nextScene = target; break; }
      }
    }

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
    if (nextScene) {
      this.state.currentScene = nextScene;
      Storage.save(this.state);
      this.loadCurrentScene();
    }
  },

  // ===== 医闹后继续 =====
  continueAfterYiNao() {
    if (this._yiNaoPendingNext) {
      const next = this._yiNaoPendingNext;
      this._yiNaoPendingNext = null;
      this.state.currentScene = next;
      this.state.screen = 'game';
      Renderer.showGameScreen();
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

    // 每章结束体力小幅衰减
    this.state.attributes.体力 = Math.max(0, this.state.attributes.体力 - 5);
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
    if (a.满意度 <= 40) hints.push('😐 病人和家属的脸色不太好看');
    else if (a.满意度 <= 60) hints.push('🤝 沟通还算顺畅——但要注意语气');
    return hints;
  },
};
