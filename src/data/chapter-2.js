/* ==========================================
   chapter-2.js — 第二章「凌晨两点」
   基于医生设计稿：观察室轮班 + 分诊冲突
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
      text: '凌晨两点零七分。窗外下着雨。\n\n急诊大厅的地上还有刚拖过的水痕。你已经连续工作了七个小时。桌上的咖啡凉透了——不记得是几点冲的。\n\n护士小林把一叠病历放到你桌上。\n\n"医生——今晚可能有点难熬。"\n\n你抬头。"怎么了？"\n\n她朝大厅方向偏了偏下巴。',
      choices: [
        { text: '站起来。看看大厅里什么情况。', next: 'scene_hall' },
        { text: '"几个人？大概什么情况？"先问清楚再过去。', next: 'scene_hall' },
      ],
    },

    // === 2. 大厅 ===
    scene_hall: {
      id: 'scene_hall',
      title: '大厅',
      text: '你看过去。\n\n一个六十多岁的男人坐在椅子上。脸色一般——甚至还能跟旁边的人聊天。他妻子拎着个袋子站在旁边。\n\n不远处——一个三十多岁的女人靠在丈夫肩膀上。一直揉着太阳穴。脸皱在一起。\n\n小林低声说："两个家属都觉得自己不能等。已经在那边争了一轮了。"\n\n果然——年轻女人的丈夫先开口了。',
      choices: [
        { text: '走过去。先听他们说什么。', next: 'scene_conflict' },
      ],
    },

    // === 3. 第一次冲突（选择点1） ===
    scene_conflict: {
      id: 'scene_conflict',
      title: '冲突',
      text: '年轻女人的丈夫声音很大——\n\n"医生——我们真的等不了了。她头疼得一直吐。吐了两次了。"\n\n老人妻子马上回头——\n\n"我们老人家胃疼也难受啊。怎么年轻人声音大就先看？"\n\n"我没说年轻人先看——我说我们等不了了——"\n\n"谁等得了？我们都等了半小时了——"\n\n小林压低声音："以前这种情况——最容易投诉。"\n\n她看着你。等你的第一句话。',
      choices: [
        { text: '"大家先安静一下。医院有流程——但我要先搞清楚谁的情况更紧急。"', next: 'scene_conflict_resolve_A', attr: { 专业度: 5 } },
        { text: '"我理解你们都着急。这样——你们一个一个说。谁先来的？"', next: 'scene_conflict_resolve_B', attr: { 人缘: 4 } },
        { text: '"都别吵了。护士——把他们两个的分诊记录给我。"先拿数据，不站队。', next: 'scene_triage', attr: { 专业度: 6 } },
        { text: '不说话。站在两家人中间。等他们自己安静下来。', next: 'scene_conflict_resolve_A', attr: { 人缘: 2, 体力: -2 } },
      ],
    },

    scene_conflict_resolve_A: {
      id: 'scene_conflict_resolve_A',
      title: '安静',
      text: '大厅安静了一点。\n\n老人妻子没有再争。年轻女人的丈夫喉结动了动——想说什么，忍住了。\n\n小林把分诊记录翻开。',
      choices: [
        { text: '低头看记录。', next: 'scene_triage' },
      ],
    },

    scene_conflict_resolve_B: {
      id: 'scene_conflict_resolve_B',
      title: '顺序',
      text: '"老人家先来的——我们等了半小时了。"\n\n"那又怎样——她头疼得厉害——"\n\n顺序解决了。但矛盾没解决。\n\n小林小声说："医生——分诊记录你要看一下。"',
      choices: [
        { text: '先看分诊记录。再做判断。', next: 'scene_triage' },
      ],
    },

    // === 4. 分诊信息 ===
    scene_triage: {
      id: 'scene_triage',
      title: '分诊',
      text: '小林翻开记录——\n\n患者A：男，62岁。登记："胃痛"。生命体征目前平稳。血压138/84。心率88。\n\n患者B：女，34岁。登记："剧烈头痛伴呕吐"。生命体征目前稳定。血压126/78。\n\n"分诊看——两个人目前都没有直接进抢救区的指征。"\n\n你点了点头。但分诊只是第一步。\n\n"我自己再问几个问题。"',
      choices: [
        { text: '先走向老人。"阿姨说您是胃疼？"', next: 'scene_old_man', attr: { 专业度: 6 } },
        { text: '先走向年轻女人。"你说头疼——吐了两次？"', next: 'scene_young_woman_first', attr: { 专业度: 3 } },
        { text: '站在两个人中间。"你们各自说一下——怎么不舒服。老人家先说。"', next: 'scene_old_man', attr: { 人缘: 3 } },
      ],
    },

    // === 5. 老人问诊 ===
    scene_old_man: {
      id: 'scene_old_man',
      title: '老人',
      text: '老人看到你走过来——抬头。\n\n"医生——我是不是胃又犯了？"\n\n他指着上腹。\n\n他妻子马上说："他老胃病了。以前也这样。"\n\n老人点头。"下午吃了油的东西——我就知道要出事。"\n\n妻子又补了一句："他每次说不舒服就是这里——不是这里还能是什么。"\n\n老人说话很慢。不像年轻女人那么激动。甚至有点不好意思——觉得半夜来急诊有点小题大做。\n\n你看了他一眼。这种"不好意思"——有时候才是最危险的。',
      choices: [
        { text: '"胃不舒服——这个位置？还有没有别的地方不舒服？"', next: 'scene_old_man_chest', attr: { 专业度: 5 } },
        { text: '"以前胃病发作的时候——跟这次感觉一样吗？有没有不一样的？"', next: 'scene_old_man_chest', attr: { 专业度: 4 } },
        { text: '"疼的时候——有没有出汗？有没有恶心想吐？"', next: 'scene_old_man_chest', attr: { 专业度: 4 } },
        { text: '"老胃病——做过胃镜吗？平时吃什么胃药？"先按胃病方向问。', next: 'scene_old_man_chest', attr: { 专业度: 1 } },
      ],
    },

    // === 6. 关键线索：胸闷 ===
    scene_old_man_chest: {
      id: 'scene_old_man_chest',
      title: '线索',
      text: '不管从哪个角度切入——你继续问了一句话。\n\n"疼的时候——有没有胸闷？"\n\n老人愣了一下。\n\n"昨天晚上有一点。"\n\n他妻子猛地转头——\n\n"你怎么没跟我说？！"\n\n"我觉得是胃胀——不是胸闷——"\n\n房间安静了。\n\n胃痛。上腹不适。胸闷。活动后更明显。年龄62。\n\n这不是胃病。',
      choices: [
        { text: '"胸闷的时候——有没有出汗？有没有恶心？走路或者活动以后更明显吗？"', next: 'scene_old_man_ecg', attr: { 专业度: 8 } },
        { text: '"您昨天晚上胸闷——是持续性的还是一阵一阵的？缓了多久？"', next: 'scene_old_man_ecg', attr: { 专业度: 5 } },
        { text: '"那还是像胃的问题——先给你开点胃药观察一下？"', next: 'scene_old_man_wrong', attr: { 专业度: -5 } },
        { text: '不说话。拿起分诊记录重新看——血压138/84。心率88。活动后胸闷。上腹不适。你心里已经做了决定。', next: 'scene_old_man_ecg', attr: { 专业度: 4 } },
      ],
    },

    scene_old_man_wrong: {
      id: 'scene_old_man_wrong',
      title: '误判',
      text: '你开了胃药。但小林站在原地没动。\n\n"医生——这个老人家——要不要做个心电图？"\n\n她不是在质疑你。她是在提醒你。\n\n你突然回过神来——62岁、上腹不适、活动相关、胸闷。\n\n你差点犯了一个不该犯的错误。',
      choices: [
        { text: '"对——先做心电图。胃药先不开。"纠正。', next: 'scene_old_man_ecg', attr: { 体力: -3, 专业度: -5 } },
      ],
    },

    // === 7. 开心电图（选择点3） ===
    scene_old_man_ecg: {
      id: 'scene_old_man_ecg',
      title: '心电图',
      text: '老人慢慢说——\n\n"走路的时候——好像更明显一点。上楼梯——胸口就闷。"\n\n小林看了你一眼。\n\n你："先做心电图。"\n\n老人妻子愣住了——\n\n"医生——可他是胃疼啊。"\n\n声音不大。但满是困惑。她觉得你搞错了——老人家胃不舒服，开什么心电图。',
      choices: [
        { text: '"阿姨——他这个年纪、这个症状——有时候心脏问题不按典型的方式表现。胃不舒服不一定是胃的问题。"', next: 'scene_old_man_ecg_done', attr: { 专业度: 5, 人缘: 4 } },
        { text: '"现在怀疑心脏有问题。需要排除一下。"', next: 'scene_old_man_ecg_done', attr: { 专业度: 3 } },
        { text: '"先查了再说。"不解释。', next: 'scene_old_man_ecg_done', attr: { 人缘: -2 } },
        { text: '不解释。直接开单。', next: 'scene_old_man_ecg_done', attr: { 专业度: 1, 人缘: -3 } },
      ],
    },

    scene_old_man_ecg_done: {
      id: 'scene_old_man_ecg_done',
      title: '安排',
      text: '妻子虽然有点困惑——但看到你的眼神，没有再多说。\n\n老人被扶去了心电图室。\n\n你转头——年轻女人的丈夫已经快忍不住了。',
      choices: [
        { text: '走向年轻女人。"到你了。"', next: 'scene_young_woman' },
      ],
    },

    // === 8. 年轻女人 ===
    scene_young_woman_first: {
      id: 'scene_young_woman_first',
      title: '年轻女人',
      text: '你先走到年轻女人面前。\n\n她靠在丈夫身上——一直在揉太阳穴。脸色很差。\n\n丈夫急得嗓子都是哑的："医生——她疼得一直吐——是不是脑出血？"\n\n你看着女人。"什么时候开始的？"',
      choices: [
        { text: '"下午开始的——慢慢加重还是突然一下？"', next: 'scene_young_woman' },
        { text: '"以前有过吗——类似的头痛？"', next: 'scene_young_woman' },
      ],
    },

    scene_young_woman: {
      id: 'scene_young_woman',
      title: '问诊',
      text: '"下午开始的——慢慢加重——越来越疼。吐了两次。"\n\n她声音很轻。每说一个字都像在费力气。\n\n你："以前有过类似的头痛吗？"\n\n她犹豫了一下。\n\n"有过。"\n\n她丈夫猛地转头——\n\n"你怎么没跟我说过？！"\n\n"以前也这样——我觉得没事——"\n\n她丈夫的表情从愤怒变成了另外一种东西——不是生气，是害怕。他可能是第一次知道这件事。\n\n你继续问——\n\n"有没有手脚没力？讲话不清楚？脸歪？"\n\n"没有——"\n\n"怕光吗？"\n\n她使劲点头。"怕。灯——太亮了。"\n\n她一直闭着眼睛。\n\n反复发作。单侧。恶心。畏光。没有神经功能缺损。',
      choices: [
        { text: '"你以前发作——有没有看过医生？有没有诊断过偏头痛？"', next: 'scene_young_woman_migraine', attr: { 专业度: 5 } },
        { text: '"先做个头颅CT——排除一下脑出血。"', next: 'scene_young_woman_ct', attr: { 专业度: 4 } },
        { text: '"应该是严重的偏头痛——不是脑出血。先给你止痛处理。"', next: 'scene_young_woman_migraine', attr: { 专业度: 4 } },
        { text: '"可能是紧张性头痛——你这么年轻，脑出血不太可能。"', next: 'scene_young_woman_wrong', attr: { 专业度: -3 } },
      ],
    },

    scene_young_woman_wrong: {
      id: 'scene_young_woman_wrong',
      title: '纠正',
      text: '"不太可能"——不是医学判断。\n\n小林在旁边轻轻咳了一声。\n\n你意识到——对一个三十多岁的突发剧烈头痛患者——"不太可能"不是排除标准。偏头痛的诊断首先要排别的东西。',
      choices: [
        { text: '"还是做个CT——排除一下。同时止痛处理。"纠正。', next: 'scene_young_woman_ct', attr: { 体力: -3, 专业度: -3 } },
      ],
    },

    scene_young_woman_ct: {
      id: 'scene_young_woman_ct',
      title: 'CT',
      text: '你开了CT。年轻女人被推去做检查。\n\n她丈夫跟在平车后面。走之前回头看了你一眼——没有感谢，但也没有敌意。\n\n他其实只是需要一个解释。一个他能理解的解释。',
      choices: [
        { text: '回头看看。老人的心电图应该快回来了。', next: 'scene_conflict_2' },
      ],
    },

    scene_young_woman_migraine: {
      id: 'scene_young_woman_migraine',
      title: '偏头痛',
      text: '她告诉你——以前发作过一次，去社区医院看了，说是偏头痛。没有做过CT。\n\n你给她安排了对症处理——止痛、止吐、暗室休息。同时跟丈夫解释了为什么偏头痛需要跟脑出血鉴别——不是为了吓他，是为了让他放心。\n\n她丈夫的表情终于松了一点。\n\n"所以……不是脑出血？"\n\n"目前的症状和体征——更符合偏头痛。但如果你不放心——我可以安排一个CT确认。"\n\n"那就做一个吧——我想确认。"\n\n"可以。"',
      choices: [
        { text: '回头看看。老人的心电图应该回来了。', next: 'scene_conflict_2' },
      ],
    },

    // === 9. 第二次冲突 ===
    scene_conflict_2: {
      id: 'scene_conflict_2',
      title: '再争',
      text: '小林快步走过来——手里拿着老人的心电图报告。\n\n"医生——老人的心电图——你看看。"\n\n年轻女人的丈夫立刻站起来——\n\n"什么意思？我们刚做完检查，怎么又去看别人？"\n\n老人妻子也急了——\n\n"我们老人家是不是更危险？！心电图都回来了——"\n\n"心电图回来又怎样——我们也在等CT结果——"\n\n大厅其他患者开始围观。\n\n小林小声说——"医生——现在怎么办……"',
      choices: [
        { text: '"大家放心——急诊不是谁声音大谁先看。我们根据风险处理。我先看一下老人的心电图——因为心脏问题等不起——然后马上看年轻女生的CT。"', next: 'scene_ecg_result', attr: { 专业度: 6, 人缘: 4 } },
        { text: '不回应。先低头看心电图——信息比情绪重要。', next: 'scene_ecg_result', attr: { 专业度: 5, 人缘: -1 } },
        { text: '"你们谁再吵——两个人都等着。按流程来。"', next: 'scene_ecg_result', attr: { 人缘: -4 } },
        { text: '让小林先安抚家属——自己看心电图。', next: 'scene_ecg_result', attr: { 专业度: 2 } },
      ],
    },

    // === 10. 结果 ===
    scene_ecg_result: {
      id: 'scene_ecg_result',
      title: '结果',
      text: '你展开心电图纸。\n\nST段——压低。不是那种教科书级别的"墓碑"——但是异常。\n\n结合：年龄62、上腹不适、活动后胸闷、心电图改变。\n\n不能排除急性冠脉综合征。需要按ACS流程进一步评估——心肌标志物、动态复查心电图、请心内科会诊。\n\n你放下图纸。老人妻子盯着你的表情。\n\n"医生——是不是——严重？"\n\n主任刚好从值班室走出来——听到了这一句。',
      choices: [
        { text: '"阿姨——心电图有点问题。但不一定是坏事——因为我们发现了。现在我们要进一步查。您先生——需要留观。"', next: 'scene_results_explain', attr: { 专业度: 5, 人缘: 5 } },
        { text: '"心电图有问题。可能是心脏的问题。需要抽血确认。"', next: 'scene_results_explain', attr: { 专业度: 4, 人缘: 2 } },
        { text: '"等进一步检查再说。"不先透露。', next: 'scene_results_explain', attr: { 人缘: -1 } },
      ],
    },

    scene_results_explain: {
      id: 'scene_results_explain',
      title: '解释',
      text: '老人妻子沉默了两秒。然后重复了一遍——\n\n"他一直说是胃……"\n\n主任走过来。\n\n"很多老人——心脏问题不表现成典型胸痛。他们说是胃疼、说是不舒服——但年龄、危险因素、心电图——这些在告诉你另外一种可能性。不是胃。"\n\n他看了你一眼——微微点了点头。\n\n年轻女人的CT也回来了：未见明显异常。排除了蛛血、占位、出血。临床诊断——偏头痛急性发作。\n\n丈夫松了一大口气。\n\n他看着旁边正在被安排留观的老人——然后过来跟老人妻子说了句话。\n\n"阿姨——对不起。刚才——太急了。"',
      choices: [
        { text: '站在旁边。让他们自己说完。', next: 'scene_debrief' },
        { text: '"急诊就是这样——大家都急。不是谁的错。"', next: 'scene_debrief', attr: { 人缘: 3 } },
      ],
    },

    // === 11. 主任带教 ===
    scene_debrief: {
      id: 'scene_debrief',
      title: '办公室',
      text: '凌晨四点。\n\n主任翻完你的处理记录——合上。\n\n"今天两个病人。"\n\n"一个教你医学。一个教你做人。"',
      choices: [
        { text: '等他继续说。', next: 'scene_debrief_content' },
        { text: '"老人那个——差点就当胃病处理了。"', next: 'scene_debrief_content' },
      ],
    },

    scene_debrief_content: {
      id: 'scene_debrief_content',
      title: '教',
      text: '"老人告诉你——不要相信疾病给自己的名字。他说胃疼——不代表就是胃。62岁、上腹不适、活动后胸闷、心电图异常——他在用胃疼的方式告诉你他心脏有问题。你要能听懂。"\n\n"年轻女孩告诉你——不要被现场情绪带走。她靠在丈夫肩上、一直在哭、一直在吐——她看起来最痛苦。但最痛苦不代表最危险。今天如果漏了那个老头的非典型心梗——他可能回家以后就在睡梦里走了。"\n\n他站起来。\n\n"急诊医生每天都在做一件事。在所有人都觉得自己最急的时候——找到真正不能等的人。今晚——你做对了。"\n\n窗外。雨停了。\n\n（第二章 · 完）',
      choices: [
        { text: '合上病历。天还没亮。', next: 'scene_chapter_end', isChapterEnd: true },
        { text: '"谢谢主任。"站起来。大厅里还有病人。', next: 'scene_chapter_end', isChapterEnd: true },
      ],
    },

    // === 12. 章末 ===
    scene_chapter_end: {
      id: 'scene_chapter_end',
      title: '第二章完',
      text: '你走出办公室。\n\n大厅里灯光还是那么亮——急诊的灯从来不暗。\n\n老人已经被收进留观。她妻子坐在旁边——一只手放在他手背上。\n\n年轻女人靠在丈夫肩上睡着了——止痛药起了作用。\n\n小林路过——你桌上那杯凉透的咖啡被她换成了热的。\n\n"辛苦了。"\n\n"你也是。"\n\n凌晨急诊的大厅——安静了。但你知道——下一波随时会来。\n\n（第二章 · 完）',
      choices: [
        { text: '喝完那杯热咖啡。天快亮了。', next: null, isChapterEnd: true },
      ],
    },
  },
};
