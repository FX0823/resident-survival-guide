/* ==========================================
   career.js — 职业成长系统
   跨章节追踪：治疗正确数、重大失误数、职称
   累计触发职业结局
   ========================================== */

const Career = {

  // 默认初始状态
  defaultStats() {
    return {
      totalPatients: 0,
      patientsSaved: 0,
      patientsNearMiss: 0,
      majorMistakes: 0,
      totalCorrectChoices: 0,
      totalBadChoices: 0,
      reputation: 50,
      rank: '规培医生 第一年',
      chaptersCompleted: [],
      careerEndingsSeen: [],
      attributes: { 专业度: 50, 人缘: 50, 体力: 80, 运气: 40 },
    };
  },

  stats: null,

  init() {
    const saved = Storage.loadCareer();
    if (saved) {
      this.stats = saved;
    } else {
      this.stats = this.defaultStats();
    }
  },

  /** 一章结束后记录成绩——同一章只记录首次完成，防重玩刷数据 */
  recordChapter(chapterId, chapterStats) {
    // 确保 chaptersCompleted 是数组
    if (!Array.isArray(this.stats.chaptersCompleted)) {
      this.stats.chaptersCompleted = [];
    }

    // 同一章已完成过 → 不重复计数，只可能更新声誉
    if (this.stats.chaptersCompleted.includes(chapterId)) {
      if (!chapterStats.majorMistake && !chapterStats.nearMiss) {
        if (this.stats.reputation < 70) this.stats.reputation = 70;
      }
      this.save();
      return;
    }

    this.stats.totalPatients++;
    this.stats.totalCorrectChoices += chapterStats.correctChoices || 0;
    this.stats.totalBadChoices += chapterStats.badChoices || 0;

    if (chapterStats.majorMistake) {
      this.stats.majorMistakes++;
      this.stats.reputation = Math.max(0, this.stats.reputation - 20);
      this.stats.patientsNearMiss++;
    } else if (chapterStats.nearMiss) {
      this.stats.patientsNearMiss++;
      this.stats.reputation = Math.max(0, this.stats.reputation - 5);
    } else {
      this.stats.patientsSaved++;
      this.stats.reputation = Math.min(100, this.stats.reputation + 10);
    }

    this.stats.chaptersCompleted.push(chapterId);
    this.save();
  },

  /** 检查是否触发职业结局 */
  checkCareerEnding() {
    const s = this.stats;

    // 庸医结局：重大失误 ≥ 3
    if (s.majorMistakes >= 3) {
      return 'career_quack';
    }

    // 晋升考核：成功救治 ≥ 5（后续章节做完后触发）
    if (s.patientsSaved >= 5 && s.rank === '规培医生 第一年') {
      return 'career_promotion_exam';
    }

    // 最佳新人：成功救治 ≥ 3 且零重大失误
    if (s.patientsSaved >= 3 && s.majorMistakes === 0 && s.reputation >= 70) {
      return 'career_best_rookie';
    }

    return null;
  },

  /** 晋升 */
  promote(newRank) {
    this.stats.rank = newRank;
    this.save();
  },

  save() {
    Storage.saveCareer(this.stats);
  },

  getRank() {
    return this.stats ? this.stats.rank : '规培医生 第一年';
  },

  getStats() {
    return this.stats || this.defaultStats();
  },
};
