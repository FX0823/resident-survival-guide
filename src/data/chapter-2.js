/* ==========================================
   chapter-2.js v5 — 第二章「凌晨两点」
   冲突升级 + 真致命选项 + 体力trade-off
   ========================================== */

const chapter2 = {
  id: 'ch2',
  title: '第二章 · 凌晨两点',
  initialScene: 'scene_opening',

  scenes: {

    // === 1. 开场 ===
    scene_opening: {
      id: 'scene_opening',
      title: '凌晨两点',
      text: '凌晨两点零七分。窗外下着雨。\n\n你已经连上了七个小时。桌上的咖啡凉透了。\n\n护士小林把一叠病历放到你桌上。\n\n"医生——今晚可能有点难熬。"\n\n"怎么了？"\n\n她朝大厅偏了偏下巴。\n\n"两个病人刚到。两个家属都觉得自己不能等。"',
      choices: [
        { text: '站起来。看看大厅。', next: 'scene_hall' },
        { text: '"大概什么情况？"边走边问。', next: 'scene_hall' },
      ],
    },

    // === 2. 大厅 ===
    scene_hall: {
      id: 'scene_hall',
      title: '大厅',
      text: '一个六十多岁的男人坐在椅子上。脸色一般——甚至还能跟旁边的人聊天。妻子拎着个袋子，时不时往年轻女人那边看一眼。\n\n不远处——三十多岁的女人靠在丈夫肩上。一直揉太阳穴。脸皱成一团。丈夫坐立不安，手机屏幕亮了又灭。\n\n小林压低声音："分诊都看过了。老的是胃痛，年轻的是头痛。两个生命体征都还平稳——但两个家属都觉得自己等不了。已经在门口吵了一轮了。"\n\n大厅里其他人开始朝这边看。',
      choices: [
        { text: '走过去。先听他们说什么。', next: 'scene_conflict' },
      ],
    },

    // === 3. 选择点1：冲突爆发 ===
    scene_conflict: {
      id: 'scene_conflict',
      title: '冲突',
      text: '你还没走到跟前——年轻女人的丈夫先开口了。\n\n"医生——终于来了。她头疼得一直吐！吐了两次了！我们真的等不了了！"\n\n老人妻子立马回头——\n\n"什么意思？就你们急？我们等了半小时了！他胃疼就不难受？"\n\n"我没说你们不急——我说我们等不了——她疼得脸都白了你看不见？"\n\n"我们老人家就不白了？他脸也是白的！"\n\n年轻女人突然捂着头呻吟了一声——声音很小，但所有人都安静了一下。\n\n两边的脸都转向你。小林盯着你——等你的第一句话。',
      choices: [
        { text: '"都别吵了。"声音不大，但够所有人听见。"我先搞清楚谁的情况更紧急。不是谁声音大就先看。"', next: 'scene_triage', attr: { 专业度: 5 } },
        { text: '"两位——一家一家说。谁先来的？"', next: 'scene_triage', attr: { 人缘: 4 } },
        { text: '"护士——把分诊记录给我。"不站队。先看客观数据。', next: 'scene_triage', attr: { 专业度: 6 } },
        { text: '先走到年轻女人跟前。"你现在最不舒服的是什么？"——她在呻吟。直觉告诉你先确认她。', next: 'scene_young_woman_first', attr: { 人缘: 3 } },
      ],
    },

    // === 4. 分诊信息 ===
    scene_triage: {
      id: 'scene_triage',
      title: '分诊',
      text: '小林翻开记录——\n\n患者A：男，62岁。主诉"胃痛"。血压138/84。心率88。\n\n患者B：女，34岁。主诉"剧烈头痛伴呕吐"。血压126/78。\n\n"分诊看——两个都没有直接进抢救室的指征。"\n\n你点了点头。分诊只是第一步。你决定自己再问一轮。',
      choices: [
        { text: '走向老人。"胃不舒服——您详细说说。"', next: 'scene_old_man', attr: { 专业度: 6 }, setFlag: { sawOldManFirst: true } },
        { text: '走向年轻女人。"头痛——吐了两次？什么时候开始的？"', next: 'scene_young_woman_first', attr: { 专业度: 3 }, setFlag: { sawWomanFirst: true } },
        { text: '站在中间。"两位——各自说一下怎么不舒服。老人家先说。"', next: 'scene_old_man', attr: { 人缘: 3 } },
      ],
    },

    // === 5. 老人问诊 ===
    scene_old_man: {
      id: 'scene_old_man',
      title: '老人',
      text: '老人抬头。说话很慢——\n\n"医生——我胃不舒服。应该是老胃病又犯了。"\n\n他指着上腹。\n\n妻子马上接："他老胃病了。下午吃了油的东西。我就知道要出事。"\n\n老人点头。甚至有点不好意思——觉得半夜来急诊有点小题大做。\n\n你看着他的手指。上腹部。但他说"不舒服"的时候——手掌在胸口和上腹之间来回比划。没有一个明确的点。',
      choices: [
        { text: '"胃不舒服——还有没有别的地方不舒服？胸闷？憋气？"', next: 'scene_old_man_chest', attr: { 专业度: 5 } },
        { text: '"以前胃病发作跟这次——感觉一样吗？"', next: 'scene_old_man_compare', attr: { 专业度: 4 } },
        { text: '"老胃病——做过胃镜吗？平时吃哪种药？"', next: 'scene_old_man_gastric', attr: { 专业度: 2 } },
      ],
    },

    // === 6A. 追问胸闷（选"有没有胸闷"时进入）===
    scene_old_man_chest: {
      id: 'scene_old_man_chest',
      title: '胸闷',
      text: '"除了胃——还有没有胸闷？"\n\n老人愣了一下。\n\n"昨天晚上有一点。"\n\n妻子猛地转头——"你怎么没跟我说？！"\n\n"我觉得是胃胀——不是胸闷——"\n\n你："走路或者活动以后——更明显吗？"\n\n"上楼的时候——会闷。平时没事。"\n\n62岁。上腹不适。活动后胸闷。这几个词不应该出现在同一个句子里。',
      choices: [
        { text: '"叔叔——你这个不像是胃的问题。我需要给你做个心电图——看看心脏。"', next: 'scene_old_man_ecg', attr: { 专业度: 8, 人缘: 3 } },
        { text: '"做个心电图放心些。排除了心脏问题再按胃治。"', next: 'scene_old_man_ecg', attr: { 专业度: 5 } },
        { text: '她老婆说得也有道理——"那先观察一会儿？喝点热水看看能不能缓解？"', next: 'scene_old_man_sent_home', attr: { 专业度: -8 } },
      ],
    },

    // === 6B. 追问既往胃病史（选"以前胃病一样吗"时进入）===
    scene_old_man_compare: {
      id: 'scene_old_man_compare',
      title: '对比',
      text: '"以前胃病发作——跟这次感觉一样吗？"\n\n老人想了想。"不太一样。以前胃疼是烧的——泛酸水。这次是闷的——不泛酸。"\n\n不一样。他说了"不一样"。\n\n"那这次——除了闷——有没有别的？比如胸闷？后背酸？"\n\n"昨天晚上——胸口有点闷。我以为是吃撑了。"\n\n不是吃撑了。62岁。"闷"比"烧"更值得警惕。',
      choices: [
        { text: '"叔叔——这个不一样很重要。我需要给你做个心电图——查查心脏。"', next: 'scene_old_man_ecg', attr: { 专业度: 8, 人缘: 3 } },
        { text: '"做个心电图放心些。"', next: 'scene_old_man_ecg', attr: { 专业度: 5 } },
        { text: '"那先观察一会儿——喝点热水看看能不能缓解。"', next: 'scene_old_man_sent_home', attr: { 专业度: -8 } },
      ],
    },

    // === 6C. 追问胃镜和用药史（选"做过胃镜吗"时进入）===
    scene_old_man_gastric: {
      id: 'scene_old_man_gastric',
      title: '胃病史',
      text: '"老胃病——做过胃镜吗？平时吃哪种胃药？"\n\n"做过——两年前。说是浅表性胃炎。平时吃奥美拉唑。"\n\n妻子补充："他每次不舒服就吃一粒——有时候管用有时候不管用。"\n\n"这次吃药了吗？"\n\n"吃了。没用。还是闷。"\n\n吃了胃药没用。加上活动后胸闷——这个"胃病"越来越不像胃了。',
      choices: [
        { text: '"吃了胃药没用——这个很重要。我需要给你做个心电图——排除一下心脏的问题。"', next: 'scene_old_man_ecg', attr: { 专业度: 8, 人缘: 3 } },
        { text: '"做个心电图吧——放心些。"', next: 'scene_old_man_ecg', attr: { 专业度: 5 } },
        { text: '"那先观察一会儿——说不定等下就好了。"', next: 'scene_old_man_sent_home', attr: { 专业度: -8 } },
      ],
    },

    // === 7. 心电图争议 ===
    scene_old_man_ecg: {
      id: 'scene_old_man_ecg',
      title: '争议',
      text: '妻子有点困惑——\n\n"医生——他是胃疼啊。做心电图干什么？"\n\n年轻女人的丈夫也看过来了。老人自己倒是没说什么——但他看你的眼神里也有一点疑惑。\n\n整个大厅在等你回答。',
      choices: [
        { text: '"阿姨——他这个年纪、这个症状——心脏问题有时候不按典型方式表现。胃不舒服——不一定是胃。"', next: 'scene_old_man_ecg_done', attr: { 专业度: 5, 人缘: 4 } },
        { text: '"先查心电图——排除了心脏问题大家都放心。"', next: 'scene_old_man_ecg_done', attr: { 专业度: 4 } },
        { text: '什么都不解释。直接开单。', next: 'scene_old_man_ecg_done', attr: { 人缘: -1 } },
        { text: '"你说得对——可能没什么事。先观察观察吧。"', next: 'scene_old_man_sent_home', attr: { 专业度: -8 } },
      ],
    },

    scene_old_man_ecg_done: {
      id: 'scene_old_man_ecg_done',
      title: '安排',
      text: '妻子虽然还有点困惑——但点了头。老人被扶去心电图室。\n\n护士说大概十分钟出结果。\n\n你趁这个空隙——处理另一个病人。',
      choices: [
        { text: '走向年轻女人。', next: 'scene_young_woman' },
        { text: '趁这十分钟去倒了杯水。坐了一分钟。然后年轻女人的丈夫站起来了。', next: 'scene_young_woman' },
      ],
    },

    // === 老人心电图结果 ===
    scene_old_man_result: {
      id: 'scene_old_man_result',
      title: '老人结果',
      text: '小林快步走过来——\n\n"医生——老人的心电图出来了。你看看。"\n\n你展开心电图纸。ST段压低。多导联。\n\n结合62岁、上腹痛、活动后胸闷——急性冠脉综合征不能排除。\n\n老人妻子盯着你的表情。"严重吗？"\n\n"心电图有问题——不是胃。是心脏。但他现在在医院、发现得早——这是好事。需要抽血查心肌标志物、动态复查心电图、请心内科会诊。"\n\n她愣了两秒。重复了一遍——"他一直说是胃……"\n\n"我知道。但有时候心脏问题不按典型方式表现。他说的胃疼——其实是心脏在求救。"\n\n妻子沉默了一下。然后点了点头。"那你该怎么治就怎么治。"\n\n你安排启动胸痛流程。老人被转去留观区。',
      choices: [
        { text: '年轻女人那边——CT该回来了。', next: 'scene_results_explain' },
      ],
    },

    // === 致命路径：放走老人 ===
    scene_old_man_sent_home: {
      id: 'scene_old_man_sent_home',
      title: '回家',
      text: '你开了胃药。老人回家了。\n\n凌晨五点。电话响了。\n\n"那个胃疼的老头——家属说他在家晕倒了——"\n\n120送回来。广泛前壁心梗。血压测不到。\n\n他没能撑到天亮。\n\n那张没做成的心电图——永远留在了空白里。',
      choices: [
        { text: '你没法再选了。', fatalEnding: 'ch1_gastric_home' },
      ],
    },

    // === 8. 年轻女人问诊 ===
    scene_young_woman_first: {
      id: 'scene_young_woman_first',
      title: '年轻女人',
      text: '她靠在丈夫肩上——一直揉着太阳穴。\n\n"什么时候开始的？"\n\n"下午——慢慢加重——越来越疼。吐了两次。"\n\n丈夫急得嗓子哑了："医生——她是不是脑出血？"',
      choices: [
        { text: '"以前有过类似的头痛吗？"', next: 'scene_young_woman' },
        { text: '"先做个头颅CT排除一下。"', next: 'scene_young_woman_ct' },
      ],
    },

    scene_young_woman: {
      id: 'scene_young_woman',
      title: '问诊',
      text: '"以前有过类似的头痛吗？"\n\n她犹豫了一下。\n\n"有过。"\n\n丈夫猛转头——\n\n"你怎么没跟我说过？！"\n\n"以前也这样——我觉得没事——"\n\n你："有没有手脚没力？脸歪？说话不清楚？"\n\n"没有——"\n\n"怕光吗？"\n\n她使劲点头。"灯太亮了。我一直闭着眼睛。"\n\n反复发作。单侧头痛。恶心。畏光。没有神经功能缺损。偏头痛的特征在累积。',
      choices: [
        { text: '"你的症状更符合偏头痛。但急性剧烈头痛——建议做CT排除一下。你觉得呢？"', next: 'scene_young_woman_ct', attr: { 专业度: 5, 人缘: 3 } },
        { text: '"先给你止痛处理——CT你可以选择做或不做。但我建议做。"', next: 'scene_young_treatment', attr: { 专业度: 4 } },
        { text: '"应该就是偏头痛——你这么年轻。回家休息就行。我给你开止痛药。"', next: 'scene_young_sent_home', attr: { 专业度: -6 } },
      ],
    },

    // === 9. CT决策 ===
    scene_young_woman_ct: {
      id: 'scene_young_woman_ct',
      title: 'CT',
      text: 'CT安排好了。年轻女人被推去CT室。\n\n你转身看大厅。',
      choices: [
        { text: '去看老人。', next: 'scene_old_man', routeByFlag: { sawOldManFirst: 'scene_old_man_result' } },
      ],
    },

    scene_young_treatment: {
      id: 'scene_young_treatment',
      title: '处理',
      text: '你给女人开了止痛药和止吐药。灯光调暗了。\n\n丈夫还在犹豫——"CT辐射——她以前也犯过——"\n\n你回头看了一眼大厅。',
      choices: [
        { text: '老人还在等——去看他。', next: 'scene_old_man', routeByFlag: { sawOldManFirst: 'scene_old_man_result' } },
      ],
    },

    // === 致命路径：放走年轻女人 ===
    scene_young_sent_home: {
      id: 'scene_young_sent_home',
      title: '回家',
      text: '他们走了。带着止痛药，和一句"谢谢医生"。\n\n四小时后——120送回来。喷射性呕吐。一侧瞳孔散大。急诊CT——蛛网膜下腔出血，动脉瘤再次破裂。\n\n第一次是哨兵出血。第二次是灾难。\n\n开颅手术七个小时。她活下来了——但偏瘫。失语。三十四岁。\n\n"急性剧烈头痛——为什么不建议做CT？"\n\n你没法回答。',
      choices: [
        { text: '你没法再选了。', fatalEnding: 'ch2_sah_miss' },
      ],
    },

    // === 10. 双人收束 ===
    scene_results_explain: {
      id: 'scene_results_explain',
      title: '收束',
      text: '老人的胸痛流程已启动——心肌标志物、心内科会诊、留观。\n\n年轻女人的CT也回来了——未见异常。偏头痛急性发作。止痛处理后明显好转。\n\n两个人都稳住了。\n\n老人妻子走过来——\n\n"医生——谢谢你。一开始我还觉得你搞错了……"\n\n你还没回答——小林又过来了。\n\n"医生——大厅又来了一个。腹痛的。"',
      choices: [
        { text: '"让分诊先看。我歇五分钟。"你靠在椅背上——眼睛闭上了。', next: 'scene_rest_choice', attr: { 体力: 8, 人缘: -3 } },
        { text: '"好。让他进来吧。"你站起来。腿在抖。', next: 'scene_debrief', attr: { 体力: -3, 人缘: 3 } },
        { text: '"小林——能不能让值班的二线先接？我真的需要缓一下。"', next: 'scene_debrief', attr: { 体力: 5, 人缘: 1 } },
      ],
    },

    // === 12. 选择点：休息还是继续 ===
    scene_rest_choice: {
      id: 'scene_rest_choice',
      title: '间隙',
      text: '你闭上眼睛。五分钟。\n\n墙上时钟走了五格。走廊那头有病人在喊——但你没动。\n\n小林又进来了。"医生——那个腹痛的家属在催了——"\n\n你睁开眼。腿还是酸的。但脑子清醒了一点。',
      choices: [
        { text: '"好。让他进来。"站起来。你缓过来了——至少暂时。', next: 'scene_debrief' },
        { text: '"再给我两分钟。"闭上眼。小林叹了口气出去了。', next: 'scene_debrief', attr: { 体力: 5, 人缘: -5 } },
      ],
    },

    // === 13. 主任带教 ===
    scene_debrief: {
      id: 'scene_debrief',
      title: '办公室',
      text: '凌晨四点。主任翻完你的处理记录。\n\n"今天两个病人——一个教你医学，一个教你做人。"',
      choices: [
        { text: '等他继续说。', next: 'scene_debrief_content' },
        { text: '"老人那个——差点就当胃病了。"', next: 'scene_debrief_content' },
      ],
    },

    scene_debrief_content: {
      id: 'scene_debrief_content',
      title: '教',
      text: '"老人告诉你——不要相信疾病给自己的名字。他说胃疼——不代表就是胃。62岁、上腹痛、活动后胸闷、心电图异常——他在用胃疼的方式告诉你心脏有问题。你要能听懂。"\n\n"年轻女孩告诉你——不要被现场情绪带走。她靠在丈夫肩上、一直在哭——看起来最痛苦。但最痛苦不代表最危险。"\n\n他站起来。\n\n"急诊医生每天都在做一件事——在所有人都觉得自己最急的时候——找到真正不能等的人。今晚——你做对了。"\n\n窗外。雨停了。',
      choices: [
        { text: '合上病历。天还没亮。', next: 'scene_chapter_end', isChapterEnd: true },
        { text: '"谢谢主任。"站起来。大厅里还有人等着。', next: 'scene_chapter_end', isChapterEnd: true },
      ],
    },

    // === 14. 章末 ===
    scene_chapter_end: {
      id: 'scene_chapter_end',
      title: '第二章完',
      text: '你走出办公室。\n\n急诊大厅灯光还是那么亮。老人已被收进留观——妻子一只手放在他手背上。年轻女人在留观室睡着了。\n\n小林路过——"咖啡给你换了热的。"\n\n凌晨急诊大厅安静了片刻。但你知道——下一波随时会来。\n\n（第二章 · 完）',
      choices: [
        { text: '喝完那杯热咖啡。天快亮了。', next: null, isChapterEnd: true },
      ],
    },
  },
};
