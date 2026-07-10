/* ==========================================
   storage.js — 存档管理
   Web版用 localStorage，微信版换 wx.setStorageSync
   ========================================== */

const Storage = {

  KEY_GAME: 'resident_survival_guide_save',
  KEY_CAREER: 'resident_survival_guide_career',

  /** 保存游戏状态 */
  save(state) {
    const data = {
      chapterId: state.chapter ? state.chapter.id : null,
      currentScene: state.currentScene,
      attributes: state.attributes,
      history: state.history,
      jokeEndingsSeen: state.jokeEndingsSeen || [],
      propertyEndingsSeen: state.propertyEndingsSeen || [],
      careerEndingsSeen: state.careerEndingsSeen || [],
      chapterStats: state.chapterStats,
      savedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(this.KEY_GAME, JSON.stringify(data));
    } catch (e) {
      console.warn('存档失败:', e);
    }
  },

  /** 读取存档 */
  load() {
    try {
      const raw = localStorage.getItem(this.KEY_GAME);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      console.warn('读档失败:', e);
      return null;
    }
  },

  hasSave() {
    return localStorage.getItem(this.KEY_GAME) !== null;
  },

  clear() {
    localStorage.removeItem(this.KEY_GAME);
  },

  /** 保存职业数据（跨章节持久化） */
  saveCareer(stats) {
    try {
      localStorage.setItem(this.KEY_CAREER, JSON.stringify(stats));
    } catch (e) {
      console.warn('职业数据保存失败:', e);
    }
  },

  /** 读取职业数据 */
  loadCareer() {
    try {
      const raw = localStorage.getItem(this.KEY_CAREER);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  },

  /** 重置职业数据 */
  clearCareer() {
    localStorage.removeItem(this.KEY_CAREER);
  },
};
