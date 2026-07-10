/* ==========================================
   chapter-1.js v10 — 第一章「胸痛之夜」
   零单选项 + 选项无点评 + 真人口语
   ========================================== */

const chapter1 = {
  id: 'ch1',
  title: '第一章 · 胸痛之夜',
  initialScene: 'scene_opening',

  scenes: {

    // === 1. 开场 ===
    scene_opening: {
      id: 'scene_opening',
      title: '晚上八点半',
      text: '刚交完班。你打开电脑准备看今晚的病人列表。\n\n护士推门进来——\n\n"医生，来了个胸痛的，疼得挺厉害。"',
      choices: [
        { text: '"好。"合上电脑，站起来。', next: 'scene_patient_in' },
        { text: '"多大年纪？男的还是女的？来了吗？"边走边问。', next: 'scene_patient_in', attr: { 专业度: 3 } },
      ],
    },

    // === 2. 病人 ===
    scene_patient_in: {
      id: 'scene_patient_in',
      title: '胸痛病人',
      text: '一个五十多岁的男人被妻子扶进来。\n\n他一只手按着胸口，额头冒汗，脸色发灰。坐下以后整个人往前蜷着——像一只被踩了壳的虾。\n\n家属声音在抖："医生你快看看——他说胸口痛，一路上都在喊痛。"\n\n病人咬着牙："快点……我疼得不行了……"\n\n护士站在旁边等你的第一句话。',
      choices: [
        { text: '"护士，先测血压、心率、血氧，准备心电图。"然后转向病人。', next: 'scene_where_hurt', attr: { 专业度: 5 } },
        { text: '"先别急。给我指一下——哪里最痛？"', next: 'scene_where_hurt', attr: { 人缘: 4 } },
        { text: '"胸痛多久了？从几点几分开始的？"', next: 'scene_where_hurt', attr: { 专业度: 4 } },
        { text: '"你现在能说话——是个好信号。但胸痛不能拖。"一边观察他的脸色和呼吸。', next: 'scene_where_hurt', attr: { 专业度: 3, 人缘: 2 } },
      ],
    },

    // === 3. 选择点：哪里痛 ===
    scene_where_hurt: {
      id: 'scene_where_hurt',
      title: '哪里痛',
      text: '护士夹血氧、绑袖带。心电图机推过来了。\n\n你："哪里痛？"\n\n病人用手在胸口乱按——"这里！胸口！都痛！"\n\n"是胸口正中间——还是偏左边？"\n\n"都痛！痛得要死了！"',
      choices: [
        { text: '"你不用说得很专业——指一下最痛的位置就行。"', next: 'scene_pain_type', attr: { 专业度: 3, 人缘: 3 } },
        { text: '"有没有痛到左肩、后背、下巴？"', next: 'scene_pain_type', attr: { 专业度: 5 } },
        { text: '"是不是胃这里痛？"', next: 'scene_pain_type', attr: { 专业度: -3 } },
        { text: '"那这样——什么样的痛？闷的？压的？针扎的？烧的？"', next: 'scene_outburst', attr: { 专业度: 3 } },
      ],
    },

    // === 4. 选择点：翻脸 ===
    scene_pain_type: {
      id: 'scene_pain_type',
      title: '翻脸',
      text: '他捂着胸口。你接着问——\n\n"什么样的痛？闷的？压的？还是刺痛——"\n\n他突然抬头。语气不对了。\n\n"我哪知道什么痛！我就是痛！你会不会看病啊——我都痛成这样了你还问问问！"\n\n家属赶紧接："医生——他是真的很痛——不是装的——"\n\n护士小声说："心电图马上好……"',
      choices: [
        { text: '"我知道你痛。问这些是为了判断是不是心脏问题——不是怀疑你。"', next: 'scene_after_outburst', attr: { 人缘: 5, 专业度: 3 } },
        { text: '"你不说清楚——我没法判断。"', next: 'scene_after_outburst', attr: { 专业度: 2, 人缘: -3 } },
        { text: '"好——那我先不问了。先处理。"', next: 'scene_after_outburst', attr: { 人缘: 1, 专业度: -2 } },
        { text: '不理他。转向他老婆："他平时血压高不高？在吃什么药？"', next: 'scene_ask_wife', attr: { 专业度: 4, 人缘: 2 } },
      ],
    },

    scene_outburst: {
      id: 'scene_outburst',
      title: '翻脸',
      text: '他没回答你的问题——直接炸了。\n\n"我哪知道什么痛！我就是痛！你会不会看病啊——我都痛成这样了你还问问问！"\n\n家属赶紧接："医生——他是真的很痛——"\n\n护士小声说："心电图马上好……"',
      choices: [
        { text: '"我知道你痛。我问这些是为了判断是不是心脏问题——不是怀疑你。"', next: 'scene_after_outburst', attr: { 人缘: 5, 专业度: 3 } },
        { text: '"你不说清楚——我没法判断。"', next: 'scene_after_outburst', attr: { 专业度: 2, 人缘: -3 } },
        { text: '"好——那我先不问了。先处理。"', next: 'scene_after_outburst', attr: { 人缘: 1, 专业度: -2 } },
        { text: '不理他。转向他老婆："他平时血压高不高？在吃什么药？"', next: 'scene_ask_wife', attr: { 专业度: 4, 人缘: 2 } },
      ],
    },

    scene_after_outburst: {
      id: 'scene_after_outburst',
      title: '缓和',
      text: '他没继续骂了。疼还在——但力气用光了。\n\n过了一会儿他闷声嘀咕了一句："……闷的。行了吧。像大石头压着。"\n\n关键信息拿到了。但他还有很多事没说——高血压？抽烟？家族史？\n\n他捂着胸口："那你能不能先让我不痛？"',
      choices: [
        { text: '"可以处理疼痛——但胸痛要先查原因。我们一边缓解一边查。"', next: 'scene_history', attr: { 人缘: 5, 专业度: 3 } },
        { text: '"先忍一下。查清楚再说。"', next: 'scene_history', attr: { 人缘: -2, 专业度: 2 } },
        { text: '"先给你止痛。"', next: 'scene_history', attr: { 人缘: 3 } },
        { text: '"你这个痛不是重点——重点是要查原因。"', next: 'scene_history', attr: { 人缘: -5 } },
      ],
    },

    scene_ask_wife: {
      id: 'scene_ask_wife',
      title: '绕道家属',
      text: '他老婆被按了开关一样开始倒豆子——\n\n"血压高——好几年了！让他吃药不吃——叫什么地平——我叫不出名字——反正就是不吃！一天两包烟——他爸五十多心梗走了！"\n\n全拿到了。\n\n病人瞪了她一眼。她瞪回去。"你看什么看——我说的哪句不对？"',
      choices: [
        { text: '"谢谢您——您记得比病历还清楚。"', next: 'scene_history', attr: { 人缘: 4, 专业度: 3 } },
        { text: '"那个降压药——是不是硝苯地平？还是氨氯地平？"', next: 'scene_history', attr: { 专业度: 4 } },
        { text: '低头看心电图。信息够了。先处理。', next: 'scene_ecg', attr: { 专业度: 2 } },
      ],
    },

    // === 5. 选择点：矛盾病史 ===
    scene_history: {
      id: 'scene_history',
      title: '病史',
      text: '疼痛的问题暂时稳住了。你接着问——\n\n"以前有没有高血压？糖尿病？冠心病？"\n\n"没有。"\n\n他老婆在旁边看了他一眼——那个眼神你在急诊科见太多了。\n\n"你血压不是一直高吗？"\n\n"那不算病！年纪大了谁血压不高？"\n\n"平时吃药吗？"\n\n"不吃。"\n\n家属马上接："你每天早上不是吃那个吗？"\n\n"那个不是药！就是降压的。"\n\n护士贴电极的手停了一下。',
      choices: [
        { text: '"降压的也算药——叫什么名字？"', next: 'scene_drug_name', attr: { 专业度: 4 } },
        { text: '"好——我先记上：平时血压偏高、长期吃降压药。这个信息很重要。"', next: 'scene_drug_name', attr: { 专业度: 3, 人缘: 3 } },
        { text: '"吃多久了？每天都吃吗？"', next: 'scene_drug_name', attr: { 专业度: 4 } },
        { text: '记下"血压偏高"。不必纠结措辞——先往下走。', next: 'scene_drug_name', attr: { 专业度: 1 } },
      ],
    },

    // === 6. 选择点：药名 ===
    scene_drug_name: {
      id: 'scene_drug_name',
      title: '药名',
      text: '"什么地平。我记不住。"\n\n家属补充："好像是氨氯地平——还是硝苯地平？反正有个地平。"',
      choices: [
        { text: '"好——先记服用降压药。后面看药盒或者手机记录确认。"', next: 'scene_ecg', attr: { 专业度: 4 } },
        { text: '"到底是哪一个？现在必须说清楚。"', next: 'scene_ecg', attr: { 专业度: 2, 人缘: -2 } },
        { text: '"算了——不重要。"', next: 'scene_ecg', attr: { 专业度: -3 } },
      ],
    },

    // === 7. 心电图 ===
    scene_ecg: {
      id: 'scene_ecg',
      title: '心电图',
      text: '护士把心电图纸递给你。\n\n你低头看——心脏前面那几格，ST段压不下去。不是教科书级别的那种"墓碑"——但够你决定下一步了。\n\n家属盯着你的脸："医生——是不是心梗？"\n\n病人也抬头了："严重不严重？"',
      choices: [
        { text: '"现在下不了结论。但这个情况——要按最危险的来处理。我们会继续查。"', next: 'scene_next', attr: { 专业度: 5, 人缘: 3 } },
        { text: '"有可能是心梗。"', next: 'scene_next', attr: { 专业度: 1, 人缘: -2 } },
        { text: '"不一定——先等等。"', next: 'scene_next', attr: { 人缘: -3 } },
        { text: '"你们别一直问——我在看。"', next: 'scene_next', attr: { 人缘: -5 } },
      ],
    },

    // === 8. 选择点：下一步 ===
    scene_next: {
      id: 'scene_next',
      title: '下一步',
      text: '家属稍微安静了——\n\n"就是先按危险的处理？"\n\n"对。先排最危险的。"\n\n护士在等你的指令。',
      choices: [
        { text: '"抽血查心肌标志物。持续监护。请心内科来会诊。"', next: 'scene_stomach', attr: { 专业度: 8 } },
        { text: '"先观察半小时——看会不会自己缓解。"', next: 'scene_next_delay', attr: { 专业度: -5 } },
        { text: '"可能是胃病——先按胃病处理看看。"', next: 'scene_next_wrong', attr: { 专业度: -8, 人缘: -3 } },
        { text: '"应该没什么大事——回家休息，明天再看。"', next: 'scene_next_wrong', attr: { 专业度: -10, 人缘: -5 } },
      ],
    },

    scene_next_delay: {
      id: 'scene_next_delay',
      title: '延误',
      text: '半小时。疼痛没缓解。心电图变化更明显了。\n\n护士小声说："医生——要不要抽血请会诊？"\n\n你点了点头。这半小时——心肌一直在坏死。',
      choices: [
        { text: '"抽血查心肌标志物。请心内科。"', next: 'scene_stomach' },
        { text: '"再观察半小时——说不定就好了。"', next: 'scene_next_wrong', attr: { 专业度: -5 } },
      ],
    },

    scene_next_wrong: {
      id: 'scene_next_wrong',
      title: '误判',
      text: '带教路过——扫了一眼心电图，又扫了你一眼。\n\n"你觉得这是胃病？"\n\n语气不重。内容像一盆冷水。\n\n"这个年龄、这个位置、这个出汗——心电图已经在提示缺血了——你给按胃病处理？"\n\n他把心电图拍在桌上。"重新评估。"',
      choices: [
        { text: '"我重新评估。"', next: 'scene_stomach' },
        { text: '"心电图不典型——我觉得还是胃的可能性大。"', next: 'scene_next_delay', attr: { 专业度: -5, 人缘: -3 } },
      ],
    },

    // === 9. 选择点：胃病解释 ===
    scene_stomach: {
      id: 'scene_stomach',
      title: '胃病',
      text: '病人听到"流程"两个字，又开始紧张了——\n\n"我昨天吃火锅了……会不会是胃痛？我以前也胃不好。"\n\n家属像抓到安全解释一样立刻接话："对——他以前胃痛过。是不是胃病啊？"',
      choices: [
        { text: '"胃有可能——但你这个年龄、这个痛法、这个出汗，都不能先当胃病。我们先排最危险的——危险排除了再考虑胃。"', next: 'scene_report', attr: { 专业度: 5, 人缘: 2 } },
        { text: '"那先按胃病处理看看。"', next: 'scene_next_wrong', attr: { 专业度: -5 } },
        { text: '"不是胃病。"', next: 'scene_report', attr: { 专业度: 3, 人缘: -2 } },
        { text: '"你们不要自己判断——听我的。"', next: 'scene_report', attr: { 人缘: -3 } },
      ],
    },

    // === 10. 选择点：上级 ===
    scene_report: {
      id: 'scene_report',
      title: '心内科',
      text: '心内科医生走进来了——\n\n"什么情况？"\n\n轮到你说了。',
      choices: [
        { text: '"男性，五十多，胸痛约三小时，伴出汗。左肩后背有不适。自述无高血压——但长期吃某种地平类降压药。心电图有异常。心肌标志物在查。生命体征监测中。"', next: 'scene_treatment', attr: { 专业度: 8, 人缘: 3 } },
        { text: '"胸痛——心电图有点问题。"', next: 'scene_treatment', attr: { 专业度: 1 } },
        { text: '"他说很痛——但问不清楚——家属说他血压高。"', next: 'scene_treatment', attr: { 人缘: -3 } },
        { text: '"可能是胃病——但心电图也有点异常。"', next: 'scene_treatment', attr: { 专业度: -2 } },
      ],
    },

    // === 11. 治疗 ===
    scene_treatment: {
      id: 'scene_treatment',
      title: '明确',
      text: '心内科医生点了下头。\n\n"可以。胸痛先按高风险处理。别被\'胃病\'这个说法带偏。"\n\n心肌标志物回来了——肌钙蛋白升高。复查心电图——ST段变化更明显了。\n\n诊断明确：急性心梗。导管室启动。一根细钢丝从手腕穿进去——支架撑开堵住的血管。\n\n一个小时后——血管通了。他活着。',
      choices: [
        { text: '深呼吸。然后去找家属——她还在外面。', next: 'scene_family' },
        { text: '坐下来补抢救记录。让护士去通知家属。', next: 'scene_family' },
      ],
    },

    // === 12. 家属 ===
    scene_family: {
      id: 'scene_family',
      title: '家属',
      text: '他老婆站在导管室门口。眼睛哭肿了。\n\n"他——他——"\n\n"血管通了。他没事了。"\n\n然后不是感谢——是爆发。\n\n"让他来医院——不来！吃药——三年不吃！嫌我烦！嫌我啰嗦！两个孩子我一个人带！他有没有想过我！"\n\n嚎啕大哭。走廊所有人都看过来。她憋了三年。',
      choices: [
        { text: '拉把椅子坐她旁边。"阿姨——你辛苦了。"就这几个字。然后听。', next: 'scene_fruit', attr: { 人缘: 8 } },
        { text: '"这里是急诊——请冷静。手术成功了。"', next: 'scene_fruit_no_gift', attr: { 人缘: -5 } },
        { text: '"手术很成功。具体心内科会跟您说。"转过身走了。', next: 'scene_fruit_no_gift', attr: { 人缘: -2 } },
      ],
    },

    // === 13. 水果 ===
    scene_fruit: {
      id: 'scene_fruit',
      title: '谢意',
      text: '她擦干脸后从CCU回来了。脸上有了血色——还挤出一个不好意思的笑。\n\n"医生——刚才太不好意思了——这个是给你的——"\n\n塑料袋。金黄色大芒果。',
      choices: [
        { text: '接过芒果。你还没学过急诊科的水果禁忌。', jokeEnding: 'mango' },
        { text: '"阿姨——芒果留给叔叔。您以后盯着他把烟戒了——就是对我最好的感谢。"', next: 'scene_debrief', attr: { 人缘: 3, 运气: 5 } },
      ],
    },

    scene_fruit_no_gift: {
      id: 'scene_fruit_no_gift',
      title: '沉默',
      text: '他老婆没有再来。一个人坐在CCU门口。\n\n林姐路过——一杯水放在你桌上。拍了拍你的肩膀。走了。',
      choices: [
        { text: '喝完那杯水。写完病历。', next: 'scene_debrief' },
        { text: '先不喝。看看CCU那边的情况。', next: 'scene_debrief' },
      ],
    },

    // === 14. 复盘 ===
    scene_debrief: {
      id: 'scene_debrief',
      title: '复盘',
      text: '交班前带教翻着你的病历。\n\n"第一个胸痛。什么感觉？"\n\n"……病人不怎么配合。"\n\n"他们永远不配合。"他笑了一声。',
      choices: [
        { text: '"但我做了心电图——走了流程——他救回来了。"', next: 'scene_debrief_content' },
        { text: '"他老婆比他管用。没有家属——信息拿不到那么多。"', next: 'scene_debrief_content', attr: { 人缘: 2 } },
        { text: '没说话。等他讲。', next: 'scene_debrief_content' },
      ],
    },

    scene_debrief_content: {
      id: 'scene_debrief_content',
      title: '教',
      text: '"今天几个要点。\n\n第一：胸痛病人第一件事永远是心电图。十几块钱。心肌坏死的速度——按分钟算。你早一分钟通血管，他就多一块活着的心脏。\n\n第二：他\'闷\'、\'压\'、\'左胳膊酸\'、\'下巴难受\'——自己说不清楚——但你要能捞出来。\n\n第三：家属。病人不说真话——家属说。病人不肯来——家属拖他来。\n\n第四——今天做得不错。但记住：每个病人都不一样。下一个可能更不配合。下一个可能更危重。做医生——别飘。"',
      choices: [
        { text: '"记住了。"', next: 'scene_chapter_end', isChapterEnd: true },
        { text: '"下次——会更好。"', next: 'scene_chapter_end', isChapterEnd: true },
      ],
    },

    // === 15. 章末 ===
    scene_chapter_end: {
      id: 'scene_chapter_end',
      title: '第一章完',
      text: '天边有一线亮了。\n\n你脱下白大褂挂在椅背上。第一次穿它的时候太大了——像借的。\n\n现在还是有点大。但已经有你的褶子了。\n\n第一个夜班。一个不肯配合的病人。一张心电图。十次选择。一台手术。一次家属的崩溃和一句"你辛苦了"。一次带教的复盘。\n\n还有一整个走廊的病人——他们不管你是不是第一天。\n\n（第一章 · 完）',
      choices: [
        { text: '走出急诊科大门。天亮了。', next: null, isChapterEnd: true },
      ],
    },
  },
};
