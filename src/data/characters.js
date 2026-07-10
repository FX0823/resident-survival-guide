/* ==========================================
   characters.js — 角色定义
   每个角色有 name/role/trait/icon（icon 为 MVP 占位）
   ========================================== */

const Characters = {

  player: {
    id: 'player',
    name: '你',
    role: '规培医生 · 第一年',
    trait: '疲惫但努力的新人',
    icon: '🩺',
  },

  director_wang: {
    id: 'director_wang',
    name: '王主任',
    role: '急诊科主任',
    trait: '严厉但护犊子，口头禅是"我当年规培的时候…"',
    icon: '👨‍⚕️',
  },

  nurse_lin: {
    id: 'nurse_lin',
    name: '林姐',
    role: '急诊科护士长',
    trait: '科室真正的话事人。什么都知道，什么都见过，永远淡定。',
    icon: '👩‍⚕️',
  },

  xiao_chen: {
    id: 'xiao_chen',
    name: '小陈',
    role: '同期规培生',
    trait: '卷王本王。论文比你多三篇，值班比你多一倍，但真的会帮你。',
    icon: '🧑‍⚕️',
  },

  xiao_zhou: {
    id: 'xiao_zhou',
    name: '小周',
    role: '实习护士',
    trait: '刚来两个月，遇到什么事都比你还慌。',
    icon: '👩‍💼',
  },

  patient_zhang: {
    id: 'patient_zhang',
    name: '张大爷',
    role: '急诊常客',
    trait: '每个月至少来一次的老病号，什么水果都敢往医生手里塞。',
    icon: '👴',
  },
};
