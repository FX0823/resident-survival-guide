/* ==========================================
   chapter-2.js v4 — 第二章「凌晨两点」
   完整流程 + 错选项支线 + 拒绝检查后果
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
      text: '凌晨两点零七分。窗外下着雨。\n\n急诊大厅地面还有刚拖过的水痕。你已经连上了七个小时。桌上的咖啡凉透了——不记得几点冲的。\n\n护士小林把一叠病历放到你桌上。\n\n"医生——今晚可能有点难熬。"\n\n你抬头。"怎么了？"\n\n她朝大厅偏了偏下巴。',
      choices: [
        { text: '站起来。看看大厅。', next: 'scene_hall' },
        { text: '"几个人？大概什么情况？"先问清楚。', next: 'scene_hall' },
      ],
    },

    // === 2. 大厅 ===
    scene_hall: {
      id: 'scene_hall',
      title: '大厅',
      text: '一个六十多岁的男人坐在椅子上。脸色一般——甚至还能跟旁边的人聊天。妻子拎着袋子站在旁边。\n\n不远处——一个三十多岁的女人靠在丈夫肩上。一直揉太阳穴。脸皱在一起。\n\n小林低声说："两个家属都觉得自己不能等。已经在那边争了一轮了。"',
      choices: [
        { text: '走过去。', next: 'scene_conflict' },
      ],
    },

    // === 3. 选择点1：第一次冲突 ===
    scene_conflict: {
      id: 'scene_conflict',
      title: '冲突',
      text: '年轻女人的丈夫声音很大——\n\n"医生——我们等不了了。她头疼得一直吐。吐了两次了。"\n\n老人妻子马上回头——\n\n"我们老人家胃疼也难受啊。怎么年轻人声音大就先看？"\n\n"我没说年轻人先看——我说我们等不了了——"\n\n"谁等得了？我们都等了半小时了——"\n\n小林压低声音："以前这种情况——最容易投诉。"\n\n她看着你。',
      choices: [
        { text: '"大家先安静。我要搞清楚谁的情况更紧急——不是谁声音大。"', next: 'scene_triage', attr: { 专业度: 5 } },
        { text: '"我理解你们都着急。这样——你们一个一个说。谁先来的？"', next: 'scene_triage', attr: { 人缘: 4 } },
        { text: '"都别吵了。护士——把他们两个的分诊记录给我。"', next: 'scene_triage', attr: { 专业度: 6 } },
        { text: '不说话。站在两家人中间。等他们自己安静。', next: 'scene_triage', attr: { 人缘: 2, 体力: -2 } },
      ],
    },

    // === 4. 分诊 ===
    scene_triage: {
      id: 'scene_triage',
      title: '分诊',
      text: '小林翻开记录——\n\n患者A：男，62岁。登记"胃痛"。血压138/84。心率88。\n\n患者B：女，34岁。登记"剧烈头痛伴呕吐"。血压126/78。\n\n"分诊看——两个人都没有直接进抢救的指征。"\n\n你点头。但分诊只是第一步。',
      choices: [
        { text: '先走向老人。"胃不舒服——您给我说说。"', next: 'scene_old_man', attr: { 专业度: 6 } },
        { text: '先走向年轻女人。"头疼——吐了两次？"', next: 'scene_young_woman', attr: { 专业度: 3 } },
        { text: '站在中间。"你们各自说一下——老人家先来。"', next: 'scene_old_man', attr: { 人缘: 3 } },
      ],
    },

    // === 5. 老人问诊 ===
    scene_old_man: {
      id: 'scene_old_man',
      title: '老人',
      text: '老人抬头——\n\n"医生——我是不是胃又犯了？"\n\n他指着上腹。\n\n妻子马上接："他老胃病了。以前也这样。下午吃了油的东西——我就知道要出事。"\n\n老人说话很慢。不像年轻女人那么激动。甚至有点不好意思——觉得半夜来急诊有点小题大做。',
      choices: [
        { text: '"胃不舒服——除了胃还有没有别的地方不舒服？"', next: 'scene_old_man_chest', attr: { 专业度: 5 } },
        { text: '"以前胃病发作跟这次——感觉一样吗？有没有不一样的？"', next: 'scene_old_man_chest', attr: { 专业度: 4 } },
        { text: '"疼的时候有没有出汗？有没有恶心？"', next: 'scene_old_man_chest', attr: { 专业度: 4 } },
        { text: '"老胃病——做过胃镜没？平时吃哪种胃药？"', next: 'scene_old_man_chest', attr: { 专业度: 1 } },
      ],
    },

    // === 6. 选择点2：胸闷线索 ===
    scene_old_man_chest: {
      id: 'scene_old_man_chest',
      title: '线索',
      text: '你继续问——\n\n"疼的时候有没有胸闷？"\n\n老人愣了一下。\n\n"昨天晚上有一点。"\n\n他妻子猛转头——\n\n"你怎么没跟我说？！"\n\n"我觉得是胃胀——不是胸闷——"\n\n房间安静了。62岁。上腹不适。活动后胸闷。这几个词不应该出现在同一个句子里——除非。',
      choices: [
        { text: '"胸闷的时候——有没有出汗？走路或者活动以后更明显吗？"', next: 'scene_old_man_ecg', attr: { 专业度: 8 } },
        { text: '"昨天晚上胸闷——持续多久？缓过来了吗？"', next: 'scene_old_man_ecg', attr: { 专业度: 5 } },
        { text: '"那还是像胃的问题——先给你开点胃药观察？"', next: 'scene_old_man_wrong_1', attr: { 专业度: -5 } },
        { text: '不问了。这个年龄+上腹痛+活动后胸闷——直接开心电图。', next: 'scene_old_man_ecg', attr: { 专业度: 4 } },
      ],
    },

    scene_old_man_wrong_1: {
      id: 'scene_old_man_wrong_1',
      title: '误判',
      text: '你开了胃药。小林站在原地没动。\n\n"医生——这个老人家——要不要做心电图？"\n\n她不是质疑。是提醒。\n\n你回过神来——62岁、上腹痛、活动相关、胸闷。你差点犯了一个不该犯的错误。',
      choices: [
        { text: '"对——先做心电图。胃药先不开。"', next: 'scene_old_man_ecg', attr: { 体力: -3, 专业度: -5 } },
      ],
    },

    // === 7. 选择点3：开心电图——家属抵制 ===
    scene_old_man_ecg: {
      id: 'scene_old_man_ecg',
      title: '心电图',
      text: '老人慢慢说——\n\n"走路的时候好像更明显。上楼梯——胸口就闷。"\n\n你："先做心电图。"\n\n老人妻子愣住了——\n\n"医生——可他是胃疼啊。做心电图干什么？"\n\n她不是不尊重你。她是真的不理解。在她看来——胃疼和心电图之间没有任何关系。',
      choices: [
        { text: '"阿姨——他这个年纪、这个症状——心脏问题有时候不按典型方式表现。胃不舒服——不一定是胃。"', next: 'scene_old_man_ecg_done_A', attr: { 专业度: 5, 人缘: 4 } },
        { text: '"现在怀疑心脏有问题——需要排除。排除了大家都放心。"', next: 'scene_old_man_ecg_done_A', attr: { 专业度: 4, 人缘: 2 } },
        { text: '"先查了再说。"不解释。开单。', next: 'scene_old_man_ecg_done_A', attr: { 人缘: -2 } },
        { text: '她说的也有道理——"那先观察半小时看看？如果还是疼再做。"', next: 'scene_old_man_sent_home', attr: { 专业度: -8, 人缘: 1 } },
      ],
    },

    scene_old_man_ecg_done_A: {
      id: 'scene_old_man_ecg_done_A',
      title: '安排',
      text: '妻子虽然还有点困惑——但点了点头。\n\n老人被扶去了心电图室。\n\n你转头——年轻女人的丈夫已经快坐不住了。',
      choices: [
        { text: '走向年轻女人。"到你了。"', next: 'scene_young_woman' },
      ],
    },

    // === 8. 错选项支线：放老人回家 ===
    scene_old_man_sent_home: {
      id: 'scene_old_man_sent_home',
      title: '回家',
      text: '你同意了家属的说法——先观察。\n\n半小时后老人说"好一点了"。妻子说"那我们先回去，明天再来看门诊"。\n\n你开了胃药。让他们走了。\n\n凌晨五点。电话响了。\n\n"医生——刚才那个胃疼的老头——家属打电话来说他在家晕倒了——"\n\n你的手指停在键盘上。',
      choices: [
        { text: '"打120让他们马上回来——不，直接送抢救室。"', next: 'scene_old_man_crash', attr: { 体力: -5, 专业度: -10 } },
      ],
    },

    scene_old_man_crash: {
      id: 'scene_old_man_crash',
      title: '抢救',
      text: '老人被120送回来。\n\n心电图——广泛前壁心梗。比几个小时前严重得多。导管室紧急启动。\n\n命救回来了。但心肌损伤面积——因为延误的这几个小时——大了不止一倍。\n\n主任翻完病历。沉默了很久。\n\n"你觉得胃病——他老婆也觉得是胃病——你们都同意。但你是医生。你的职责不是同意——是判断。"',
      choices: [
        { text: '无话可说。', next: 'scene_debrief_mistake', attr: { 专业度: -5 } },
        { text: '"我的错。我不该被家属带偏。"', next: 'scene_debrief_mistake', attr: { 专业度: -3 } },
      ],
    },

    scene_debrief_mistake: {
      id: 'scene_debrief_mistake',
      title: '代价',
      text: '交班记录上留下了这次误判的痕迹。\n\n不是每一次"胃病"都是胃病。不是每一次家属说"没事"就真的没事。\n\n你学到了——但这个代价太大了。\n\n（第二章 · 完 — 重大失误结局）',
      choices: [
        { text: '合上记录。这份记录你会记住很久。', next: 'scene_chapter_end', isChapterEnd: true },
      ],
    },

    // === 9. 年轻女人问诊 ===
    scene_young_woman: {
      id: 'scene_young_woman',
      title: '年轻女人',
      text: '她靠在丈夫肩上——一直在揉太阳穴。脸色很差。\n\n丈夫嗓子都是哑的："医生——她疼得一直吐——是不是脑出血？"\n\n你看着女人。"什么时候开始的？"\n\n"下午——慢慢加重——越来越疼。吐了两次。"',
      choices: [
        { text: '"以前有过类似的头痛吗？"', next: 'scene_young_woman_history', attr: { 专业度: 5 } },
        { text: '"怕光吗？有没有手脚没力？讲话不清楚？"', next: 'scene_young_woman_history', attr: { 专业度: 5 } },
        { text: '"先做个头颅CT——排除一下脑出血。"', next: 'scene_young_woman_ct', attr: { 专业度: 4 } },
        { text: '"应该是偏头痛——你这么年轻，脑出血可能性不大。"', next: 'scene_young_woman_wrong', attr: { 专业度: -3 } },
      ],
    },

    scene_young_woman_wrong: {
      id: 'scene_young_woman_wrong',
      title: '纠正',
      text: '"不太可能"——不是医学判断。\n\n小林在旁边轻轻咳了一声。\n\n你意识到——对一个突发剧烈头痛——"不太可能"不是排除标准。',
      choices: [
        { text: '"还是做个CT排除一下。同时止痛。"', next: 'scene_young_woman_ct', attr: { 体力: -3, 专业度: -3 } },
      ],
    },

    scene_young_woman_history: {
      id: 'scene_young_woman_history',
      title: '病史',
      text: '她犹豫了一下。"以前有过。"\n\n丈夫猛转头——\n\n"你怎么没跟我说过？！"\n\n"以前也这样——我觉得没事——"\n\n他表情变了。不是生气——是害怕。他可能是第一次知道这件事。\n\n你："怕光吗？"\n\n她使劲点头。"怕。灯——太亮了。"\n\n"手脚有没有没力？脸有没有歪？说话有没有不清楚？"\n\n"没有——就是疼——吐——"\n\n反复发作。单侧。恶心。畏光。没有神经功能缺损。偏头痛的特征越来越清晰。',
      choices: [
        { text: '"症状更符合偏头痛。但第一次发作或者发作性质改变——建议做CT排除一下。你们觉得呢？"', next: 'scene_young_treatment', attr: { 专业度: 5, 人缘: 3 } },
        { text: '"先对症处理——止痛、止吐、暗室休息。如果CT你想做——我可以开。"', next: 'scene_young_treatment', attr: { 专业度: 4, 人缘: 2 } },
        { text: '"做个CT放心。急性剧烈头痛——不能不排。"', next: 'scene_young_woman_ct', attr: { 专业度: 4 } },
      ],
    },

    // === 10. 错选项支线：年轻女人拒绝检查 ===
    scene_young_treatment: {
      id: 'scene_young_treatment',
      title: '处理',
      text: '丈夫想了想——\n\n"她以前犯过。休息一晚上就好了。不用做CT了吧——辐射不是有害吗？"\n\n女人也点头。"我想回家睡觉。这里灯太亮了——"\n\n两个人都想走。',
      choices: [
        { text: '"可以。但回家以后如果疼痛加重、或者出现新症状——马上回来。我给你开止痛药——但不能因为是偏头痛就忘了最危险的。"', next: 'scene_young_treatment_done', attr: { 专业度: 4, 人缘: 4 } },
        { text: '"不行。你们可以不做CT——但至少要在留观室观察两个小时。我不能让你这样回家。"', next: 'scene_young_treatment_done', attr: { 专业度: 5, 人缘: 1 } },
        { text: '"那行——回家休息。有事再回来。"', next: 'scene_young_sent_home', attr: { 专业度: -6, 人缘: 2 } },
        { text: '"不做CT？那你们签个字——自愿离院。出了事自己负责。"', next: 'scene_young_treatment_done', attr: { 人缘: -4 } },
      ],
    },

    scene_young_sent_home: {
      id: 'scene_young_sent_home',
      title: '出事',
      text: '他们走了。\n\n两小时后——救护车又把他们送回来了。\n\n头痛加重。喷射性呕吐。血压飙升。急诊CT——蛛网膜下腔少量出血。\n\n不是偏头痛。是动脉瘤的哨兵出血——第一次的头痛是警告，第二次才是灾难。\n\n她没死在第二次。因为第二次你抓住了。但第一次——你放走了她。\n\n主任说："急性头痛——不做CT不能回家。记住。"',
      choices: [
        { text: '记住了。这个教训会刻在骨头里。', next: 'scene_debrief_mistake', attr: { 专业度: -8, 体力: -5 } },
      ],
    },

    scene_young_treatment_done: {
      id: 'scene_young_treatment_done',
      title: '观察',
      text: '女人在留观室接受了止痛和止吐处理。灯光调暗了。\n\n半小时后——头痛明显减轻。她靠在丈夫肩上睡着了。\n\n丈夫看着她的脸——那种松了一大口气的表情。\n\n"谢谢你——医生。"',
      choices: [
        { text: '回头看看。老人的心电图应该回来了。', next: 'scene_conflict_2' },
      ],
    },

    scene_young_woman_ct: {
      id: 'scene_young_woman_ct',
      title: 'CT',
      text: 'CT结果回来了——未见明显异常。排除了蛛血、占位、出血。\n\n临床诊断：偏头痛急性发作。对症处理——止痛、止吐、暗室休息。\n\n半小时后头痛明显减轻。丈夫松了一大口气。',
      choices: [
        { text: '回头看看。老人的心电图应该回来了。', next: 'scene_conflict_2' },
      ],
    },

    // === 11. 选择点4：第二次冲突 ===
    scene_conflict_2: {
      id: 'scene_conflict_2',
      title: '再争',
      text: '小林快步走过来——手里拿着老人的心电图报告。\n\n"医生——老人的心电图——你看看。"\n\n年轻女人的丈夫立刻站起来——\n\n"什么意思？我们这边还没完——怎么又看别人？"\n\n老人妻子也急了——\n\n"我们老人家是不是更危险？！心电图都回来了——"\n\n大厅其他患者开始围观。',
      choices: [
        { text: '"大家放心——急诊不是谁声音大谁先看。我先看老人的心电图——心脏问题等不起——然后马上回来看你们。"', next: 'scene_ecg_result', attr: { 专业度: 6, 人缘: 4 } },
        { text: '不回应。低头看心电图——信息比情绪重要。', next: 'scene_ecg_result', attr: { 专业度: 5, 人缘: -1 } },
        { text: '"你们谁再吵——两个人都等着。按流程来。"', next: 'scene_ecg_result', attr: { 人缘: -4 } },
        { text: '让小林安抚家属——自己看心电图。', next: 'scene_ecg_result', attr: { 专业度: 2 } },
      ],
    },

    // === 12. 结果 ===
    scene_ecg_result: {
      id: 'scene_ecg_result',
      title: '结果',
      text: '你展开心电图纸。\n\nST段压低。多导联。\n\n结合：62岁、上腹不适、活动后胸闷、心电图异常——急性冠脉综合征不能排除。需要抽心肌标志物、动态复查心电图、请心内科会诊。\n\n老人妻子盯着你的脸。\n\n"医生——严重吗？"\n\n主任刚好从值班室出来。',
      choices: [
        { text: '"阿姨——心电图有问题。不是胃的问题——是心脏。但他现在在医院、我们发现得早——这是好事。"', next: 'scene_results_explain', attr: { 专业度: 5, 人缘: 5 } },
        { text: '"心电图不正常。需要抽血进一步确认——可能是心脏的问题。"', next: 'scene_results_explain', attr: { 专业度: 4, 人缘: 2 } },
        { text: '"等进一步检查再说。"不先透露。', next: 'scene_results_explain', attr: { 人缘: -1 } },
      ],
    },

    scene_results_explain: {
      id: 'scene_results_explain',
      title: '解释',
      text: '老人妻子愣了一下。重复了一遍——\n\n"他一直说是胃……"\n\n主任走过来——\n\n"很多老人心脏问题不表现成典型胸痛。他们说是胃疼、说是不舒服——但年龄、危险因素、心电图——这些在告诉你另外一种可能性。不是胃。"\n\n他看了你一眼——微微点头。\n\n年轻女人那边——不管是CT排除了出血还是对症处理观察好转——丈夫也松了口气。\n\n他走到老人妻子面前——\n\n"阿姨——对不起。刚才太急了。"',
      choices: [
        { text: '站在旁边。让他们自己说完。', next: 'scene_debrief' },
        { text: '"急诊就是这样——大家都急。不是谁的错。"', next: 'scene_debrief', attr: { 人缘: 3 } },
      ],
    },

    // === 13. 主任带教 ===
    scene_debrief: {
      id: 'scene_debrief',
      title: '办公室',
      text: '凌晨四点。主任翻完你的处理记录。\n\n"今天两个病人。一个教你医学——一个教你做人。"',
      choices: [
        { text: '等他继续说。', next: 'scene_debrief_content' },
        { text: '"老人那个——差点就当胃病了。"', next: 'scene_debrief_content' },
      ],
    },

    scene_debrief_content: {
      id: 'scene_debrief_content',
      title: '教',
      text: '"老人告诉你——不要相信疾病给自己的名字。他说胃疼——不代表就是胃。62岁、上腹痛、活动后胸闷、心电图异常——他在用胃疼的方式告诉你心脏有问题。你要能听懂。"\n\n"年轻女孩告诉你——不要被现场情绪带走。她靠在丈夫肩上、一直在哭、一直在吐——看起来最痛苦。但最痛苦不代表最危险。今天如果漏了那个老头的非典型心梗——他可能回家以后就在睡梦里走了。"\n\n他站起来。\n\n"急诊医生每天都在做一件事——在所有人都觉得自己最急的时候——找到真正不能等的人。今晚——你做对了。"\n\n窗外。雨停了。',
      choices: [
        { text: '合上病历。天还没亮。', next: 'scene_chapter_end', isChapterEnd: true },
        { text: '"谢谢主任。"站起来。大厅里还有病人。', next: 'scene_chapter_end', isChapterEnd: true },
      ],
    },

    // === 14. 章末 ===
    scene_chapter_end: {
      id: 'scene_chapter_end',
      title: '第二章完',
      text: '你走出办公室。\n\n急诊大厅灯光还是那么亮——急诊的灯从来不暗。\n\n老人已被安排留观。妻子一只手放在他手背上。\n\n年轻女人在留观室睡着了——止痛药起效了。\n\n小林路过——你桌上那杯凉透的咖啡被她换成了热的。\n\n凌晨急诊大厅安静了。但你知道——下一波随时会来。',
      choices: [
        { text: '喝完那杯热咖啡。天快亮了。', next: null, isChapterEnd: true },
      ],
    },
  },
};
