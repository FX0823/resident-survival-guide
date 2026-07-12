/* ==========================================
   main.js — 入口：绑定事件，启动应用 v2
   ========================================== */

(function () {
  'use strict';

  Renderer.init();

  const { dom } = Renderer;

  // 开始游戏——自动判断该玩哪一章
  dom['btn-start'].addEventListener('click', () => {
    Career.init();
    const done = Career.getStats().chaptersCompleted || [];
    if (done.length === 0 || done.includes('ch2')) {
      // 新手或全部通关 → 从第一章开始
      GameEngine.startChapter('ch1');
    } else if (done.includes('ch1') && !done.includes('ch2')) {
      // 第一章过了 → 第二章
      GameEngine.startChapter('ch2');
    } else {
      GameEngine.startChapter('ch1');
    }
  });

  // 继续游戏
  dom['btn-continue'].addEventListener('click', () => {
    GameEngine.continueGame();
  });

  // 重置数据
  dom['btn-reset'].addEventListener('click', () => {
    if (confirm('确定重置全部数据？所有存档和进度都会被清空。')) {
      Storage.clear(); Storage.clearCareer(); location.reload();
    }
  });

  // 画廊
  dom['btn-gallery'].addEventListener('click', () => {
    Renderer.showGallery();
  });

  // 游戏中返回主菜单
  dom['btn-menu'].addEventListener('click', () => {
    if (confirm('确定返回主菜单？当前进度已自动保存。')) {
      Renderer.showTitleScreen();
    }
  });

  // 重玩章节选择
  dom['btn-replay-ch1'].addEventListener('click', () => { GameEngine.startChapter('ch1'); });
  dom['btn-replay-ch2'].addEventListener('click', () => { GameEngine.startChapter('ch2'); });

  // 医闹 → 继续
  dom['btn-yinao-continue'].addEventListener('click', () => {
    GameEngine.continueAfterYiNao();
  });

  // 失败结局 → 重试本章
  dom['btn-fail-retry'].addEventListener('click', () => {
    GameEngine.startChapter(GameEngine.state.chapterId || 'ch1');
  });
  // 失败结局 → 返回主菜单
  dom['btn-fail-menu'].addEventListener('click', () => { Renderer.showTitleScreen(); });
  // 累计结局 → 返回主菜单
  dom['btn-cum-menu'].addEventListener('click', () => { Renderer.showTitleScreen(); });
  // 晋级结局 → 返回主菜单
  dom['btn-promo-menu'].addEventListener('click', () => { Renderer.showTitleScreen(); });

  // 梗结局 → 重新选择
  dom['btn-joke-retry'].addEventListener('click', () => {
    GameEngine.returnFromJokeEnding();
  });

  // 章节结算 → 返回主菜单
  dom['btn-chapter-menu'].addEventListener('click', () => {
    Renderer.showTitleScreen();
  });

  // 职业结局 → 返回主菜单
  dom['btn-career-menu'].addEventListener('click', () => {
    Renderer.showTitleScreen();
  });

  // 职业结局 → 查看收集
  dom['btn-career-gallery'].addEventListener('click', () => {
    Renderer.showGallery();
  });

  // 画廊 → 返回
  dom['btn-gallery-back'].addEventListener('click', () => {
    Renderer.showTitleScreen();
  });

  // 启动
  Renderer.showTitleScreen();
  console.log('🏥 规培生存指南 v2 已就绪');
  console.log('  第一章 · 胸痛之夜');
})();
