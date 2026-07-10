/* ==========================================
   chapter-1.js v9 — 第一章「胸痛之夜」
   基于真医生设计的10个选择点，每个有trade-off
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
      text: '刚交完班。你打开电脑准备看今晚的病人列表。\n\n门被推开了。护士探进半个身子——\n\n"医生，来了个胸痛的，疼得挺厉害。"',
      choices: [
        { text: '"好。"合上电脑站起来。', next: 'scene_patient_in' },
      ],
    },

    // === 2. 病人进来 ===
    scene_patient_in: {
      id: 'scene_patient_in',
      title: '胸痛病人',
      text: '一个五十多岁的男人被妻子扶进来。\n\n他一只手按着胸口，额头冒汗，脸色发灰。坐下以后整个人往前蜷着，像一只被踩了壳的虾。\n\n家属声音在发抖："医生你快看看——他说胸口痛，一路上都在喊痛。"\n\n病人咬着牙挤出几个字："快点……我疼得不行了……"\n\n你扫了一眼：意识清楚，但明显烦躁。家属紧张。护士站在旁边等你的第一句话。',
      choices: [
        { text: '"先别急。我先看看你哪里痛。"温和——但节奏偏慢。', next: 'scene_choice_1_result', attr: { 人缘: 4 } },
        { text: '"胸痛多久了？"直接进入病史——效率高。', next: 'scene_choice_1_result', attr: { 专业度: 3 } },
        { text: '"护士——先测血压、心率、血氧，准备心电图。"流程意识——处理优先于问诊。', next: 'scene_choice_1_best', attr: { 专业度: 5, 人缘: 2 } },
        { text: '"你现在还能说完整话吗？"判断危急程度——但语气容易让病人更紧张。', next: 'scene_choice_1_result', attr: { 专业度: 2 } },
      ],
    },

    scene_choice_1_best: {
      id: 'scene_choice_1_best',
      title: '第一句话',
      text: '你一边对护士下指令，一边转向病人——\n\n"我先快速问几个关键问题，不耽误处理。"\n\n护士夹血氧、绑袖带。心电图机的电极片贴上去。\n\n你坐近一点——和病人平齐。',
      choices: [
        { text: '"哪里痛？"', next: 'scene_where_hurt' },
      ],
    },

    scene_choice_1_result: {
      id: 'scene_choice_1_result',
      title: '第一句话',
      text: '不管你用什么方式开头——病人现在看着你。\n\n护士在给他夹血氧、绑袖带。心电图机推到了旁边。\n\n他疼得一直在喘。',
      choices: [
        { text: '"哪里痛？给我指一下。"', next: 'scene_where_hurt' },
      ],
    },

    // === 3. 选择点2：病人说"都痛" ===
    scene_where_hurt: {
      id: 'scene_where_hurt',
      title: '哪里痛',
      text: '病人用手在胸口乱按——\n\n"这里！胸口！都痛！"\n\n"是胸口正中间——还是偏左边？"\n\n"都痛！痛得要死了！"\n\n他不配合。不是因为不想——是因为太疼了。疼到没法组织语言。',
      choices: [
        { text: '"有没有痛到左肩、后背、下巴？"抓放射痛——心脏问题的关键线索。', next: 'scene_where_hurt_result', attr: { 专业度: 5 } },
        { text: '"你不用说得很专业——指一下最痛的位置就行。"不执着于描述，让他用动作回答。', next: 'scene_where_hurt_best', attr: { 专业度: 3, 人缘: 3 } },
        { text: '"是不是胃这里痛？"你可能正在被胃病方向带偏。', next: 'scene_where_hurt_result', attr: { 专业度: -3 } },
        { text: '"那就是整个胸口都痛。"总结——但信息太粗了。', next: 'scene_where_hurt_result', attr: { 专业度: 1 } },
      ],
    },

    scene_where_hurt_best: {
      id: 'scene_where_hurt_best',
      title: '指一下',
      text: '他不耐烦地按了按胸口——中间偏左。\n\n"肩膀也痛——背也痛——反正哪里都痛！"\n\n你拿到了：左胸、左肩、后背。心脏神经牵涉痛的经典路线。\n\n下一步：是什么样的疼？',
      choices: [
        { text: '继续问。"什么样的痛？闷的？压的？针扎的？还是烧的？"', next: 'scene_pain_type' },
      ],
    },

    scene_where_hurt_result: {
      id: 'scene_where_hurt_result',
      title: '痛',
      text: '不管你怎么问——他给出了大致的位置。胸口。偏左。可能牵到肩膀和后背。\n\n但你还需要知道一件事：这个疼的性质。闷的？刺的？烧的？\n\n不同性质的痛——指向不同的问题。',
      choices: [
        { text: '"什么样的痛？压着痛、闷痛、针扎痛——还是烧灼感？"', next: 'scene_pain_type' },
      ],
    },

    // === 4. 疼痛性质 → 翻脸 ===
    scene_pain_type: {
      id: 'scene_pain_type',
      title: '翻脸',
      text: '"什么样的痛？闷的？刺的？烧的？"\n\n他突然抬头。语气不对了——\n\n"我哪知道什么痛！我就是痛！你会不会看病啊？我都痛成这样了你还一直问问问！"\n\n家属立刻接话："医生——他是真的很痛——不是装的——"\n\n护士看你一眼，小声说："心电图马上好。"',
      choices: [
        { text: '"我知道你痛。我问这些——是为了判断是不是心脏问题。不是怀疑你。"稳定情绪。继续。', next: 'scene_after_outburst', attr: { 人缘: 5, 专业度: 3 } },
        { text: '"你不说清楚——我没法判断。"有道理。但火上浇油。', next: 'scene_after_outburst_tense', attr: { 专业度: 2, 人缘: -3 } },
        { text: '"好——那我先不问了。先处理。"病人舒服一点。但信息有缺口。', next: 'scene_pain_manage', attr: { 人缘: 1, 专业度: -2 } },
        { text: '"大家都要按流程来——你先配合。"生硬。家属可能不满。', next: 'scene_after_outburst_tense', attr: { 专业度: 1, 人缘: -4 } },
      ],
    },

    scene_after_outburst: {
      id: 'scene_after_outburst',
      title: '缓和',
      text: '他没有完全消气——但没继续骂。\n\n家属看了你一眼，稍微安静下来。\n\n短暂的沉默里，心电图机打出了第一张图。护士递给你——你扫了一眼，心里有数了。\n\n病人捂着胸口："那你能不能先让我不痛？"',
      choices: [
        { text: '"可以处理疼痛——但胸痛最怕的是后面有危险原因。我们一边缓解，一边查原因。"兼顾体验和安全。', next: 'scene_pain_manage', attr: { 人缘: 5, 专业度: 3 } },
        { text: '"先忍一下。查清楚再说。"安全——但冷。', next: 'scene_pain_manage', attr: { 人缘: -2, 专业度: 2 } },
        { text: '"先给你止痛。"安抚有效——但如果没同步评估会有风险。', next: 'scene_pain_manage', attr: { 人缘: 3 } },
        { text: '"你这个痛不是重点——重点是要查原因。"高风险沟通。', next: 'scene_pain_manage', attr: { 人缘: -5 } },
      ],
    },

    scene_after_outburst_tense: {
      id: 'scene_after_outburst_tense',
      title: '紧张',
      text: '气氛不太好。但心电图机打出了第一张纸——你扫了一眼。有异常。\n\n不管刚才沟通怎么样——现在你得把对话拉回正轨。\n\n病人捂着胸口："那你能不能先让我不痛？"',
      choices: [
        { text: '"可以处理疼痛。但我们要一边缓解一边查原因。"回到专业频道——用行动而不是语言重建信任。', next: 'scene_pain_manage', attr: { 专业度: 3 } },
        { text: '"先忍一下——查清楚再说。"继续保持距离。', next: 'scene_pain_manage', attr: { 人缘: -2 } },
      ],
    },

    // === 5. 疼痛处理 ===
    scene_pain_manage: {
      id: 'scene_pain_manage',
      title: '止痛',
      text: '疼痛的问题暂时稳住了——不管你是怎么回答的。\n\n现在要继续挖病史。你问他：\n\n"以前有没有高血压？糖尿病？冠心病？"\n\n"没有。"\n\n他老婆在旁边看了他一眼。那个眼神——你在急诊科见多了。\n\n"你血压不是一直高吗？"',
      choices: [
        { text: '不说话。等他解释。', next: 'scene_history_clash' },
      ],
    },

    // === 6. 选择点5：矛盾病史 ===
    scene_history_clash: {
      id: 'scene_history_clash',
      title: '矛盾',
      text: '"那不算病！年纪大了谁血压不高？"\n\n病人烦躁。他老婆翻了个白眼。\n\n你："平时吃药吗？"\n\n"不吃。"\n\n家属马上接："你每天早上不是吃那个药吗？"\n\n病人瞪了她一眼："那个不是药！就是降压的。"\n\n护士贴电极的手停了一下。',
      choices: [
        { text: '"降压的也算药——叫什么名字？"直接。但可能让病人觉得被纠正。', next: 'scene_drug_name', attr: { 专业度: 4 } },
        { text: '"好——我先记为血压偏高、长期吃降压药。这个信息对判断胸痛很重要。"不争执。快速收束。', next: 'scene_drug_name', attr: { 专业度: 3, 人缘: 3 } },
        { text: '"吃多久了？每天都吃吗？"不纠结药名——先拿关键信息。', next: 'scene_drug_name', attr: { 专业度: 4 } },
        { text: '"那先不管药名。"省时间。但丢了细节。', next: 'scene_drug_name', attr: { 专业度: -1 } },
      ],
    },

    // === 7. 选择点6：药名模糊 ===
    scene_drug_name: {
      id: 'scene_drug_name',
      title: '什么地平',
      text: '"吃几年了。"\n\n"药名记得吗？"\n\n"什么地平。我记不住。"\n\n家属补充："好像是氨氯地平——还是硝苯地平？反正有个地平。"',
      choices: [
        { text: '"好——先记服用降压药。后面看药盒或者手机记录确认。"正确。不拖流程。', next: 'scene_ecg_result', attr: { 专业度: 4 } },
        { text: '"到底是哪一个？现在必须说清楚。"可能拖慢急诊节奏。', next: 'scene_ecg_result', attr: { 专业度: 2, 人缘: -2 } },
        { text: '"算了——不重要。"错误倾向。', next: 'scene_ecg_result', attr: { 专业度: -3 } },
      ],
    },

    // === 8. 选择点7：家属逼问 ===
    scene_ecg_result: {
      id: 'scene_ecg_result',
      title: '心电图',
      text: '护士把心电图纸递给你。\n\n你低头看——波形不对。心脏前面那几格，ST段压不下来。不算教科书级别的典型——但够你决定下一步。\n\n家属盯着你的表情："医生——是不是心梗？"\n\n病人也抬头了："你就说——严重不严重？"',
      choices: [
        { text: '"现在不能简单下结论。但这个情况——要按胸痛急症处理。我们会继续做检查，也会请上级一起看。"不撒谎。不拖延。不制造恐慌。', next: 'scene_next_steps', attr: { 专业度: 5, 人缘: 3 } },
        { text: '"有可能是心梗。"医学上不一定错——但这两个字一出口，家属就炸了。', next: 'scene_next_steps', attr: { 专业度: 1, 人缘: -2 } },
        { text: '"不一定——先等等。"像在拖延。家属更不安。', next: 'scene_next_steps', attr: { 人缘: -3 } },
        { text: '"你们别一直问——我在看。"冲突升级。', next: 'scene_next_steps', attr: { 人缘: -5 } },
      ],
    },

    // === 9. 选择点8：下一步 ===
    scene_next_steps: {
      id: 'scene_next_steps',
      title: '下一步',
      text: '家属稍微安静了——"就是先按危险的处理？"\n\n"对。先排最危险的。"\n\n护士在等你的指令。',
      choices: [
        { text: '"持续监测生命体征。抽血查心肌标志物。请上级来看——按急性胸痛流程走。"安全。标准。', next: 'scene_next_steps_done', attr: { 专业度: 8 } },
        { text: '"先观察半小时——看疼痛会不会自己缓解。"可能延误。', next: 'scene_next_steps_delay', attr: { 专业度: -5 } },
        { text: '"可能是胃病——先按胃病处理看看。"危险支线。', next: 'scene_next_steps_wrong', attr: { 专业度: -8, 人缘: -3 } },
        { text: '"应该没什么大事——回家休息，明天再看。"失败支线。', next: 'scene_next_steps_wrong', attr: { 专业度: -10, 人缘: -5 } },
      ],
    },

    scene_next_steps_delay: {
      id: 'scene_next_steps_delay',
      title: '拖延',
      text: '半小时。\n\n疼痛没有缓解。心电图的变化更明显了。你浪费了30分钟——心肌在这半小时里一直在坏死。\n\n护士小声说："医生——要不要还是抽血请上级？"\n\n你点了点头。早就该这么做了。',
      choices: [
        { text: '"抽血——查心肌标志物。请上级。"亡羊补牢。', next: 'scene_next_steps_done', attr: { 体力: -5 } },
      ],
    },

    scene_next_steps_wrong: {
      id: 'scene_next_steps_wrong',
      title: '误判',
      text: '带教老师路过——扫了一眼心电图，又扫了你一眼。\n\n"你觉得这是胃病？"\n\n他的语气不重。但内容像一盆冷水。\n\n"心电图已经在提示缺血的改变了。这个年龄、这个疼痛位置、这个出汗——你给按胃病处理？"\n\n他把心电图拍在桌上——"重新评估。"',
      choices: [
        { text: '重新评估。这次对了——但信任已经丢了。', next: 'scene_next_steps_done', attr: { 专业度: -8, 体力: -5 } },
      ],
    },

    scene_next_steps_done: {
      id: 'scene_next_steps_done',
      title: '流程',
      text: '护士抽血、上监护。上级医生正在过来。\n\n病人听到"胸痛流程"，又开始紧张了——\n\n"我昨天吃火锅了……会不会是胃痛？我以前也胃不好。"\n\n家属像抓到了安全的解释——马上接话："对——他以前胃痛过。是不是胃病啊？"',
      choices: [
        { text: '"胃病有可能——但胸痛要先排危险的心脏问题。危险的排除了，再考虑胃。"不否认。不盲从。按优先顺序来。', next: 'scene_report', attr: { 专业度: 5, 人缘: 2 } },
        { text: '"那先按胃病处理看看。"危险。', next: 'scene_report', attr: { 专业度: -5 } },
        { text: '"不是胃病。"医学方向可能对——但沟通太硬。', next: 'scene_report', attr: { 专业度: 3, 人缘: -2 } },
        { text: '"你们不要自己判断。"容易引发抵触。', next: 'scene_report', attr: { 人缘: -3 } },
      ],
    },

    // === 10. 选择点10：汇报 ===
    scene_report: {
      id: 'scene_report',
      title: '上级',
      text: '上级医生走进诊室——\n\n"什么情况？"\n\n你需要快速、清楚地说完。',
      choices: [
        { text: '"男性，五十多岁，胸痛约三小时，伴出汗。左肩后背都有不适。自述无高血压——但长期服用某种地平类降压药。心电图有异常。已按急性胸痛流程处理——心肌标志物在查、持续监测中。"完整。清晰。', next: 'scene_treatment', attr: { 专业度: 8, 人缘: 3 } },
        { text: '"胸痛——心电图有点问题。"太粗略。上级得自己翻病历。', next: 'scene_treatment', attr: { 专业度: 1 } },
        { text: '"他说很痛——但问不清楚。"抱怨式。上级对你的印象打折。', next: 'scene_treatment', attr: { 人缘: -3 } },
        { text: '"可能胃病——也可能心梗。"重点不清。上级不知道你做了什么。', next: 'scene_treatment', attr: { 专业度: -2 } },
      ],
    },

    // === 11. 治疗 ===
    scene_treatment: {
      id: 'scene_treatment',
      title: '处理',
      text: '上级看了你一眼——点了下头。\n\n"可以。胸痛先按高风险处理——别被\'胃病\'这个说法带偏。"\n\n心肌标志物结果回来了——肌钙蛋白升高。心电图动态复查——ST段的变化越来越明确。\n\n诊断明确：急性心肌梗死。\n\n导管室已启动。一根细钢丝从手腕穿进去——支架撑开了堵住的血管。',
      choices: [
        { text: '手术期间——去找家属。', next: 'scene_family' },
      ],
    },

    // === 12. 家属 ===
    scene_family: {
      id: 'scene_family',
      title: '家属',
      text: '他老婆站在导管室门口。眼睛哭肿了。\n\n"他——他——"\n\n"血管通了。手术很成功。他没事了。"\n\n然后不是感谢——是爆发。\n\n"让他来医院——不来！吃药——三年不吃！嫌我烦！嫌我啰嗦！两个孩子我一个人带！他有没有想过我！"\n\n嚎啕大哭。走廊所有人都看过来了。她憋了三年。',
      choices: [
        { text: '拉把椅子坐她旁边。"阿姨——你辛苦了。"就这几个字。然后听。', next: 'scene_family_warm', attr: { 人缘: 8 } },
        { text: '"这里是急诊——请您冷静。手术成功了。"每句都对——但频道不对。', next: 'scene_family_cold', attr: { 人缘: -5 } },
        { text: '"手术很成功。具体心内科会跟您说。"转过身——还有一堆事。', next: 'scene_family_go', attr: { 人缘: -2 } },
      ],
    },

    scene_family_warm: {
      id: 'scene_family_warm',
      title: '理解',
      text: '她哭了好一阵。哭累了。擦了擦脸。\n\n"……不好意思——"\n\n"不用。"\n\n"他以后是不是不能抽烟了？"\n\n"不能。药天天吃。三个月复查。他肯定不听——但您是他在家唯一的防线。今天——是他老婆把他拖来医院的。您已经救过他一次了。"\n\n她眼眶又红了。但这次不是崩溃。',
      choices: [{ text: '去看看病人。', next: 'scene_fruit' }],
    },

    scene_family_cold: {
      id: 'scene_family_cold',
      title: '错过',
      text: '"安静？！我老公差点死了你叫我安静？！"\n\n更爆了。有人举手机。林姐杀过来把你支开——蹲在那女人面前，声音轻得你听不清。十五分钟后她平静了。\n\n后来林姐就一句——\n\n"下次——少说两句。多听两句。不是所有药都装在瓶子里。"',
      choices: [{ text: '记住了。', next: 'scene_fruit_no_gift', attr: { 人缘: -3 } }],
    },

    scene_family_go: {
      id: 'scene_family_go',
      title: '背影',
      text: '你转身的时候——她张了张嘴。什么都没说。\n\n后来交班记录上带教写了一行字：\n\n"临床判断尚可。沟通需加强。不是所有救命的都装在药瓶里。"',
      choices: [{ text: '合上记录。', next: 'scene_fruit_no_gift' }],
    },

    // === 13. 水果 ===
    scene_fruit: {
      id: 'scene_fruit',
      title: '谢意',
      text: '他老婆从CCU回来了。脸上有了血色——还挤出一个不好意思的笑。\n\n"医生——刚才太不好意思了——这个是给你的——"\n\n塑料袋。金黄色大芒果。',
      choices: [
        { text: '接过芒果。你还没学过急诊科的水果禁忌。', jokeEnding: 'mango' },
        { text: '"阿姨——芒果留给叔叔。您以后盯着他把烟戒了——就是对我最好的感谢。"', next: 'scene_debrief', attr: { 人缘: 3, 运气: 5 } },
      ],
    },

    scene_fruit_no_gift: {
      id: 'scene_fruit_no_gift',
      title: '沉默',
      text: '他老婆没有再来。一个人坐在CCU门口。\n\n林姐路过——一杯水轻轻放在你桌上。拍了拍你的肩膀。走了。',
      choices: [{ text: '写完病历最后一笔。', next: 'scene_debrief' }],
    },

    // === 14. 复盘 ===
    scene_debrief: {
      id: 'scene_debrief',
      title: '复盘',
      text: '交班前带教从病历里抬起头。\n\n"第一个胸痛。感觉怎么样？"\n\n"……病人不怎么配合。"\n\n"他们永远不配合。"他笑了一声。',
      choices: [
        { text: '"但因为及时做了心电图——及时走了流程——他救回来了。"', next: 'scene_debrief_content' },
        { text: '"因为他老婆把他拖来了——不是我。"', next: 'scene_debrief_content', attr: { 人缘: 2 } },
      ],
    },

    scene_debrief_content: {
      id: 'scene_debrief_content',
      title: '教',
      text: '"都对。"带教往后一靠。\n\n"今天几个要点——记住。\n\n第一：胸痛——先做心电图。十几块钱。心肌坏死的速度按分钟算——早一分钟通血管，就多一块活着的心脏。\n\n第二：病人说\'闷\'、\'压\'、\'左胳膊酸\'、\'下巴难受\'——这几个词是心脏缺血的信号。他自己不知道、说不清楚——但你要能从一堆抱怨里把这些捞出来。\n\n第三：家属。病人隐瞒病史——家属会揭穿。病人不肯来——家属拖他来。你的第二个病人永远是家属。\n\n第四——"他站起来，"今天做得不错。但记住：每个病人都可能不配合。每个家属都可能崩溃。你的第一句话、每一个选择——都在决定走向。"\n\n（第一章 · 完）',
      choices: [
        { text: '合上病历。下班。', next: 'scene_chapter_end', isChapterEnd: true },
      ],
    },

    // === 15. 章末 ===
    scene_chapter_end: {
      id: 'scene_chapter_end',
      title: '第一章完',
      text: '你脱下白大褂。\n\n第一次穿它的时候太大了——像借的。\n\n现在——还是有点大。但已经有你的褶子了。\n\n第一个夜班。一个不肯配合的病人。一张心电图。十次选择。一台手术。一次家属的崩溃和一句"你辛苦了"。一次带教的复盘。\n\n还有一整个走廊的病人——他们不管你是不是第一天。',
      choices: [
        { text: '走出急诊科大门。天亮了。', next: null, isChapterEnd: true },
      ],
    },
  },
};
