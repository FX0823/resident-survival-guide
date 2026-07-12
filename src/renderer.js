/* ==========================================
   renderer.js — UI 渲染层 v2
   章节制 + 职业结局 + 梗结局 + 画廊
   ========================================== */

const Renderer = {

  dom: {},

  init() {
    const ids = [
      'title-screen', 'game-screen', 'joke-ending-screen',
      'chapter-complete-screen', 'gallery-screen',
      'fail-ending-screen', 'cumulative-ending-screen',
      'promotion-ending-screen', 'yinao-screen',
      'btn-start', 'btn-continue', 'btn-gallery', 'ch-unlock-hint', 'btn-reset',
      'ch-select', 'btn-replay-ch1', 'btn-replay-ch2',
      'btn-menu', 'btn-joke-retry', 'btn-gallery-back',
      'btn-chapter-menu', 'btn-fail-retry', 'btn-fail-menu', 'btn-cum-menu', 'btn-promo-menu',
      'btn-yinao-continue', 'yinao-text',
      'scene-label', 'scene-text', 'attr-hints', 'choices-container',
      'joke-ending-icon', 'joke-ending-title', 'joke-ending-text',
      'joke-ending-hint', 'joke-ending-progress',
      'chapter-outcome-icon', 'chapter-outcome-title',
      'chapter-outcome-text', 'chapter-stats', 'chapter-career',
      'fail-ending-icon', 'fail-ending-title', 'fail-ending-text',
      'cum-ending-icon', 'cum-ending-title', 'cum-ending-text',
      'cum-ending-stats',
      'promo-ending-icon', 'promo-ending-title', 'promo-ending-text',
      'gallery-joke', 'gallery-career',
    ];
    for (const id of ids) {
      this.dom[id] = document.getElementById(id);
    }
  },

  // ===== 屏幕切换 =====
  showScreen(screenId) {
    ['title-screen', 'game-screen', 'joke-ending-screen',
     'chapter-complete-screen', 'gallery-screen',
     'fail-ending-screen', 'cumulative-ending-screen',
     'promotion-ending-screen', 'yinao-screen'].forEach(id => {
      this.dom[id].classList.add('hidden');
    });
    const target = document.getElementById(screenId);
    if (target) target.classList.remove('hidden');
  },

  showTitleScreen() {
    this.showScreen('title-screen');

    if (Storage.hasSave()) {
      this.dom['btn-continue'].classList.remove('hidden');
    } else {
      this.dom['btn-continue'].classList.add('hidden');
    }

    Career.init();
    const done = Career.getStats().chaptersCompleted || [];
    if (done.length === 0) {
      this.dom['ch-unlock-hint'].textContent = '';
      this.dom['btn-start'].classList.remove('hidden');
      this.dom['ch-select'].classList.add('hidden');
      this.dom['btn-start'].textContent = '开始游戏';
    } else if (done.includes('ch1') && !done.includes('ch2')) {
      this.dom['ch-unlock-hint'].textContent = '✅ 第一章已通过 — 第二章已解锁';
      this.dom['btn-start'].classList.remove('hidden');
      this.dom['ch-select'].classList.add('hidden');
      this.dom['btn-start'].textContent = '开始第二章';
    } else if (done.includes('ch2')) {
      this.dom['ch-unlock-hint'].textContent = '✅ 全部通关 — 选择章节重玩';
      this.dom['btn-start'].classList.add('hidden');
      this.dom['ch-select'].classList.remove('hidden');
    }
  },

  showGameScreen() {
    this.showScreen('game-screen');
  },

  // ===== 渲染场景 =====
  showScene(scene, attributes) {
    const chTitle = (GameEngine.state.chapter && GameEngine.state.chapter.title)
      ? GameEngine.state.chapter.title : '';
    this.dom['scene-label'].textContent = chTitle + ' — ' + scene.title;

    this.dom['scene-text'].textContent = scene.text;

    const hints = GameEngine.getAttrHints();
    this.dom['attr-hints'].innerHTML = hints.length > 0
      ? hints.map(h => `<div>${h}</div>`).join('')
      : '';

    this.dom['choices-container'].innerHTML = '';
    scene.choices.forEach((choice, index) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.textContent = choice.text;
      btn.addEventListener('click', () => { GameEngine.choose(index); });
      this.dom['choices-container'].appendChild(btn);
    });

    this.dom['scene-text'].style.opacity = '0';
    requestAnimationFrame(() => {
      this.dom['scene-text'].style.transition = 'opacity 0.3s';
      this.dom['scene-text'].style.opacity = '1';
    });
  },

  // ===== 梗结局 =====
  showJokeEnding(ending, totalSeen) {
    this.dom['joke-ending-icon'].textContent = ending.icon;
    this.dom['joke-ending-title'].textContent = ending.title;
    this.dom['joke-ending-text'].textContent = ending.text;
    this.dom['joke-ending-hint'].textContent = '💡 ' + ending.hint;
    const total = Object.keys(Endings.jokeEndings).length;
    this.dom['joke-ending-progress'].textContent = `梗结局收集：${totalSeen}/${total}`;
    this.showScreen('joke-ending-screen');
  },

  // ===== 章节结算 =====
  showChapterComplete(outcome, attributes, careerStats) {
    const config = {
      perfect:  { icon: '🌟', title: '完美处理', text: '这个病人的每一个环节你都处理得无可挑剔。从问诊到诊断到治疗——没有一步多余，没有一步遗漏。\n\n他是幸运的。遇到了今晚状态最好的你。' },
      success:  { icon: '✅', title: '顺利救治', text: '病人救回来了。过程中虽然有些小波折，但关键的判断都对了。\n\n对一个规培生来说，这已经是相当不错的表现。' },
      nearMiss: { icon: '⚠️', title: '有惊无险', text: '病人最终救回来了——但过程中你的犹豫让他多承受了一些本可避免的风险。\n\n记住这种感觉。下次不要再犹豫。' },
    };
    const c = config[outcome] || config.success;

    this.dom['chapter-outcome-icon'].textContent = c.icon;
    this.dom['chapter-outcome-title'].textContent = '第一章 · 胸痛之夜 — ' + c.title;
    this.dom['chapter-outcome-text'].textContent = c.text;

    this.dom['chapter-stats'].innerHTML = [
      { label: '专业度', value: attributes.专业度 },
      { label: '满意度', value: attributes.满意度 },
      { label: '体力', value: attributes.体力 },
    ].map(a => `<span class="attr-badge">${a.label}：${a.value}</span>`).join('');

    const cs = careerStats;
    this.dom['chapter-career'].innerHTML =
      `<p style="font-size:14px;color:var(--text-light);text-align:center;">
        职业总览：接诊 ${cs.totalPatients} 人 |
        成功 ${cs.patientsSaved} |
        失误 ${cs.majorMistakes} |
        声誉 ${cs.reputation}
        <br>当前职称：<strong>${cs.rank}</strong>
      </p>`;

    this.showScreen('chapter-complete-screen');
  },

  // ===== 职业结局 =====
  showCareerEnding(ending, careerStats) {
    this.dom['career-ending-icon'].textContent = ending.icon;
    this.dom['career-ending-title'].textContent = ending.title;
    this.dom['career-ending-text'].textContent = ending.text;

    const cs = careerStats;
    this.dom['career-ending-stats'].innerHTML =
      `<p style="font-size:14px;color:var(--text-light);text-align:center;">
        接诊 ${cs.totalPatients} 人 |
        成功 ${cs.patientsSaved} |
        失误 ${cs.majorMistakes} |
        声誉 ${cs.reputation}
        <br>最终职称：<strong>${cs.rank}</strong>
      </p>`;

    this.showScreen('career-ending-screen');
  },

  // ===== 医闹事件 =====
  showYiNao(attributes) {
    const s = attributes.满意度;
    let text = '家属在走廊里大声嚷嚷了起来。\n\n';
    if (s < 30) {
      text += '"这个医生什么态度！会不会看病！"\n\n周围几个候诊的人都看了过来。护士赶紧过来劝。\n\n你感到脸上发烫。';
    } else if (s < 50) {
      text += '"我们等了这么久——就这样打发我们？"\n\n家属的声音越来越大。旁边的病人开始窃窃私语。\n\n护士小林给你使了个眼色——意思是注意态度。';
    } else {
      text += '"医生——你能不能好好听我们说话？"\n\n家属的语气不太对。虽然还没到闹的程度——但已经很近了。';
    }
    text += '\n\n（患者满意度低于60——你在本章的沟通方式已经引发了不满。继续扣下去可能触发放走病人或投诉结局。）';
    this.dom['yinao-text'].textContent = text;
    this.showScreen('yinao-screen');
  },

  // ===== 章节失败结局 =====
  showChapterFailEnding(ending) {
    this.dom['fail-ending-icon'].textContent = ending.icon;
    this.dom['fail-ending-title'].textContent = ending.title;
    this.dom['fail-ending-text'].textContent = ending.text;
    this.showScreen('fail-ending-screen');
  },

  // ===== 累计结局（猝死/被投诉）=====
  showCumulativeEnding(ending, careerStats) {
    this.dom['cum-ending-icon'].textContent = ending.icon;
    this.dom['cum-ending-title'].textContent = ending.title;
    this.dom['cum-ending-text'].textContent = ending.text;
    const cs = careerStats;
    this.dom['cum-ending-stats'].innerHTML =
      `<p style="font-size:14px;color:var(--text-light);text-align:center;">
        接诊 ${cs.totalPatients} 人 | 成功 ${cs.patientsSaved}
        | 声誉 ${cs.reputation} | 体力 ${cs.体力 || 0}
      </p>`;
    this.showScreen('cumulative-ending-screen');
  },

  // ===== 晋级结局 =====
  showPromotionEnding(ending) {
    this.dom['promo-ending-icon'].textContent = ending.icon;
    this.dom['promo-ending-title'].textContent = ending.title;
    this.dom['promo-ending-text'].textContent = ending.text;
    this.showScreen('promotion-ending-screen');
  },

  // ===== 画廊 =====
  showGallery() {
    // 梗结局
    this.dom['gallery-joke'].innerHTML = Object.values(Endings.jokeEndings)
      .map(e => {
        const unlocked = GameEngine.state.jokeEndingsSeen.includes(e.id);
        return `<div class="gallery-item ${unlocked ? 'unlocked' : 'locked'}">
          <div class="g-icon">${e.icon}</div><div class="g-title">${e.title}</div>
          <div class="g-status">${unlocked ? '✅' : '🔒'}</div></div>`;
      }).join('');

    // 职业结局
    this.dom['gallery-career'].innerHTML = Endings.careerEndings
      .map(e => {
        const unlocked = GameEngine.state.careerEndingsSeen.includes(e.id);
        return `<div class="gallery-item ${unlocked ? 'unlocked' : 'locked'}">
          <div class="g-icon">${e.icon}</div><div class="g-title">${e.title}</div>
          <div class="g-status">${unlocked ? '✅' : '🔒'}</div></div>`;
      }).join('');

    this.showScreen('gallery-screen');
  },
};
