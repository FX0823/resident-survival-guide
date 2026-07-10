/* ==========================================
   chapter-1.js v8 — 第一章「胸痛之夜」
   拉直流程 + 零假选项 + 信息靠选 + 不绕圈
   ========================================== */

const chapter1 = {
  id: 'ch1',
  title: '第一章 · 胸痛之夜',
  initialScene: 'scene_arrival',

  scenes: {

    // === 1. 报到 ===
    scene_arrival: {
      id: 'scene_arrival',
      title: '第一天',
      text: '急诊科的门滑开。消毒水、汗味、远处有人在哭——同时涌过来。\n\n一个护士差点撞到你："新来的规培医生？我叫小周。王主任在里面——他今天喝豆浆了，说明心情还行。"\n\n她说完跑了。你还没想好先迈哪只脚——门又开了。',
      choices: [
        { text: '往主任办公室走——第一天，第一印象', next: 'scene_patient_enter', attr: { 专业度: 5 } },
        { text: '拉住小周："今晚有什么特别的病人吗？"', next: 'scene_patient_enter', attr: { 人缘: 5 } },
        { text: '在门口深呼吸三次。今晚会很长的。不急这三秒。', next: 'scene_patient_enter', attr: { 体力: 5 } },
      ],
    },

    // === 2. 病人 ===
    scene_patient_enter: {
      id: 'scene_patient_enter',
      title: '第一个病人',
      text: '一个五十来岁的男人被老婆拖进来。他左手死死按着左胸口，整张脸是灰白色的。每走一步都像在泥里拔腿。\n\n"医生——医生——"\n\n他老婆嗓门比他还大："下午就说胸闷！死都不来！刚才突然疼得站不住了！"',
      choices: [
        { text: '扶他坐下。疼成这样站着会出事。', next: 'scene_start_ask', attr: { 人缘: 3 } },
        { text: '"疼多久了？几点开始的？"站着问——时间就是心肌。', next: 'scene_start_ask', attr: { 专业度: 3 } },
        { text: '先不开口。看他的脸、他的手、他呼吸的方式——病人说的话会撒谎，身体不会。', next: 'scene_start_ask', attr: { 专业度: 5 } },
      ],
    },

    // === 3. 问诊：你只有两轮机会 ===
    scene_start_ask: {
      id: 'scene_start_ask',
      title: '问诊',
      text: '他瘫在椅子上，手没离开过胸口。\n\n他疼得满头是汗，但还没失去意识。你得趁他还能说话，尽快拿到最重要的信息——你知道大概只有一两句话的耐心。',
      choices: [
        { text: '"给我指一下——哪个位置最疼？肩膀？胳膊？下巴？"位置能告诉你疼痛的来源。', next: 'scene_got_info_1', attr: { 专业度: 4 } },
        { text: '"什么样的疼？闷的？刺的？烧的？"性质能把心脏问题和胃病、神经痛区分开。', next: 'scene_got_info_1', attr: { 专业度: 3 } },
        { text: '"几点几分开始疼的？中间有没有好过一点点？"时间决定了心肌坏死的程度。', next: 'scene_got_info_1', attr: { 专业度: 5 } },
      ],
    },

    scene_got_info_1: {
      id: 'scene_got_info_1',
      title: '再问一轮',
      text: '他咬着牙回答了你的问题。\n\n但他已经开始冒更多的汗了。呼吸更急了。他忍耐的窗口正在关上。\n\n你可能还有最后一个问题的机会。',
      choices: [
        { text: '继续追问第二个问题——你还缺一块拼图', next: 'scene_got_info_2', attr: { 专业度: 3 } },
        { text: '够了。他说了"闷"、"大石头"——先做心电图。不问了。', next: 'scene_physical', attr: { 专业度: 2 } },
      ],
    },

    scene_got_info_2: {
      id: 'scene_got_info_2',
      title: '够了',
      text: '你问完第二个问题。\n\n他正要回答——然后突然不说了。\n\n不是疼得说不出来——是不想说了。',
      choices: [
        { text: '他马上要翻脸了。', next: 'scene_outburst' },
      ],
    },

    // === 4. 翻脸 ===
    scene_outburst: {
      id: 'scene_outburst',
      title: '翻脸',
      text: '"你到底会不会看病啊！一直问问问——我疼得要死了你倒是治啊！"\n\n他吼得整个急诊科安静了一秒。小周缩到配药间门后面去了。\n\n他老婆在旁边脸都绿了："你吼什么吼——人家医生在给你看病！"',
      choices: [
        { text: '不说话。让他吼。吼完了他就没力气了——然后会自己开口。', next: 'scene_after_outburst', attr: { 人缘: 3, 体力: -2 } },
        { text: '"我在看病。你配合我才能帮你。不配合——我不知道你是心脏病还是胃病。"语气平静。针锋相对。', next: 'scene_after_outburst', attr: { 专业度: 3 } },
        { text: '不理他。转向他老婆："他平时血压高不高？在吃什么药？"——绕过病人直接从家属挖信息。', next: 'scene_ask_wife', attr: { 专业度: 4, 人缘: 2 } },
      ],
    },

    scene_after_outburst: {
      id: 'scene_after_outburst',
      title: '平静',
      text: '他不吼了。疼还在——但力气没了。\n\n过了一会儿他自己开口了："……闷的。行了吧。闷的。像大石头压着。"\n\n你拿到了关键信息。但他还有很多事藏着没说。\n\n高血压？抽烟？家族史？这些你不问他不会主动讲。',
      choices: [
        { text: '"平时血压高不高？在吃什么药？"趁他配合度回升——赶紧问。', next: 'scene_ask_meds', attr: { 专业度: 3 } },
        { text: '"抽烟吗？一天多少？家里人心脏有没有问题？"从生活习惯切入——有时候比直接问病史更管用。', next: 'scene_ask_lifestyle', attr: { 专业度: 3 } },
        { text: '不问了。先做心电图。病史可以补——心肌不能等。', next: 'scene_physical', attr: { 专业度: 2 } },
      ],
    },

    scene_ask_wife: {
      id: 'scene_ask_wife',
      title: '家属',
      text: '他老婆像被按了开关一样开始倒豆子：\n\n"血压高——好几年了！让他吃药不吃！叫什么地平——我叫不出来——反正就是不吃！他爸五十多心梗走了——他一点都不怕！一天两包烟！说了多少年了！"\n\n全拿到了。高血压。依从性差。吸烟。家族史。\n\n你不需要再多问了。',
      choices: [
        { text: '"谢谢您。您记得比病历还清楚。"走向心电图机。', next: 'scene_physical', attr: { 人缘: 4 } },
        { text: '"那个药——是不是硝苯地平？"再确认一下——药名能排除一些别的可能。', next: 'scene_physical', attr: { 专业度: 3 } },
      ],
    },

    scene_ask_meds: {
      id: 'scene_ask_meds',
      title: '吃药',
      text: '"血压高。没觉得有什么——没怎么管。"\n\n"在吃什么降压药吗？"\n\n"不吃。"\n\n他老婆在旁边发出了一声非常响的"哼"。\n\n"……就吃一个。叫什么地平。有时候忘。反正血压也不怎么高。"\n\n拿到了：高血压、地平类、依从性低。"不怎么高"的意思是——根本没管过。',
      choices: [
        { text: '"好。最后一个问题。"你得把家族史和抽烟也问到——还差两块。', next: 'scene_ask_lifestyle', attr: { 专业度: 2 } },
        { text: '够了。高血压+药物就够了。先做心电图。', next: 'scene_physical', attr: { 专业度: 3 } },
      ],
    },

    scene_ask_lifestyle: {
      id: 'scene_ask_lifestyle',
      title: '习惯',
      text: '"抽烟吗？"\n\n"抽。一天一两包。工地上——大家都抽。"\n\n"家里人心脏有没有问题？"\n\n他沉默了好几秒。\n\n"我爸。五十多。心梗。没救回来。"\n\n三条线全对上了。高血压。吸烟。早发家族史。够了。',
      choices: [
        { text: '走向心电图机。你现在有足够的信息了。', next: 'scene_physical' },
      ],
    },

    // === 5. 查体 ===
    scene_physical: {
      id: 'scene_physical',
      title: '查体',
      text: '血压偏高。心跳偏快——心脏在拼命工作，但它自己的供血可能正被切断。\n\n听诊器贴上去——他缩了一下，凉的。心音比正常人闷。肺底有轻微的湿罗音——正常应该是干的。水泡声说明液体积在肺里——心脏泵血已经开始吃力了。\n\n心电图机推过来了。',
      choices: [
        { text: '"拉心电图。加急。"十几块钱的检查——急诊科最管用的武器。', next: 'scene_ecg' },
      ],
    },

    // === 6. 心电图 ===
    scene_ecg: {
      id: 'scene_ecg',
      title: '心电图',
      text: '长长一条纸。你沿着波形扫过去——心脏前面那几格，波形不正常地高高翘起。\n\n正常人：平的、规律的。\n\n他的：像一排墓碑。\n\n这些翘起的线在说一件事——给心脏供血的最重要那根血管，堵了。血管堵了→心肌缺氧→坏死→面积每分钟都在扩大。\n\n从下午五点到现在的窗口——正在关上。',
      choices: [
        { text: '"血管堵了——急性心梗。马上送手术室——用支架把血管撑开。阿司匹林和替格瑞洛现在给。"', next: 'scene_treatment', attr: { 专业度: 10 } },
        { text: '"血管堵了。先用溶栓药把血栓化开。化不开再做手术。"次选——但有时候是唯一能立刻做的。', next: 'scene_treatment_lysis', attr: { 专业度: 5 } },
        { text: '"等一下——万一不是心梗呢？再拉一张确认。"你想排除万一。但万一就是他呢？', next: 'scene_hesitate', attr: { 专业度: -8 } },
      ],
    },

    scene_hesitate: {
      id: 'scene_hesitate',
      title: '代价',
      text: '第二张图还没开始拉。病人的眼睛突然往上翻。全身抽搐——不是疼，是失控。\n\n监护仪尖叫。屏幕上不是正常波形——是一条毫无规律的疯狂抖动。\n\n室颤。心脏不泵血了。它只是在抽搐。\n\n你犹豫的几分钟——血管彻底堵死了。',
      choices: [
        { text: '"除颤！200焦耳！清场！"你的手在抖——但操作是准的。', next: 'scene_defib', attr: { 体力: -10, 专业度: -6 } },
      ],
    },

    scene_defib: {
      id: 'scene_defib',
      title: '抢救',
      text: '砰。身体弹起来。那条疯子曲线消失了。规整的波形慢慢浮现。\n\n他活过来了。但代价已经付了——犹豫造成的额外心肌坏死，永远不会长回来。\n\n你救了他。但不是以最好的方式。',
      choices: [
        { text: '"送手术室。马上！"你不能再等了。', next: 'scene_treatment', attr: { 体力: -5 } },
      ],
    },

    // === 7. 手术 ===
    scene_treatment: {
      id: 'scene_treatment',
      title: '手术',
      text: '一根细如发丝的钢丝——从手腕的血管穿进去，逆着血流走到心脏。找到堵住的地方——一个小小的金属网管——"支架"——撑开。\n\n血管通了。\n\n一个小时后心内科医生摘了口罩："前降支——心脏最主要那根。完全堵了。放了一个支架。送来还算及时。"\n\n你靠在墙上。腿有点软——不是累，是你刚意识到这条命是一连串选择题拼出来的。选错一个就不一样。',
      choices: [
        { text: '去找他老婆。她还在外面。', next: 'scene_family' },
      ],
    },

    scene_treatment_lysis: {
      id: 'scene_treatment_lysis',
      title: '溶栓',
      text: '溶栓药推进去。一小时后——波形退了一半。血栓被溶掉了一部分。\n\n但不完美。溶栓不像支架——支架是把血管物理撑开。溶栓只化掉血栓——血管本身的狭窄还在。\n\n心内科医生后来翻了病历："溶栓没错。但能支架尽量支架——支架是解决根本的。"\n\n你记住了。',
      choices: [
        { text: '去找他老婆。', next: 'scene_family', attr: { 专业度: -2 } },
      ],
    },

    // === 8. 家属 ===
    scene_family: {
      id: 'scene_family',
      title: '家属',
      text: '他老婆站在导管室门口。眼睛肿得只剩一条缝。\n\n"他——他——"\n\n"血管通了。他没事了。"\n\n然后不是感谢。是爆发——\n\n"让他来医院——不来！吃药——三年不吃！嫌我烦！嫌我啰嗦！两个孩子我一个人带！他有没有想过我！"\n\n嚎啕大哭。走廊里所有人都看过来了。\n\n这些话不是冲你。是憋了三年的。',
      choices: [
        { text: '拉把椅子坐她旁边。"阿姨，你辛苦了。"就这几个字。然后听。', next: 'scene_family_warm', attr: { 人缘: 8 } },
        { text: '"这里是急诊——请您冷静。手术成功了。"每句都对。但没一句在频道上。', next: 'scene_family_cold', attr: { 人缘: -5 } },
        { text: '"手术很成功。具体心内科会跟您说。"转过身——你还有一堆事。', next: 'scene_family_go', attr: { 人缘: -2 } },
      ],
    },

    scene_family_warm: {
      id: 'scene_family_warm',
      title: '理解',
      text: '她哭了好一阵。哭累了。擦了擦脸。\n\n"……不好意思——"\n\n"不用。"\n\n"他以后是不是不能抽烟了？"\n\n"不能。药天天吃。三个月复查。他肯定不听——但您是他在家唯一的防线。今天——是他老婆把他拖来医院的。您已经救过他一次了。"\n\n她的眼眶又红了。但这次——不是崩溃。',
      choices: [{ text: '去看看病人。', next: 'scene_fruit' }],
    },

    scene_family_cold: {
      id: 'scene_family_cold',
      title: '错过',
      text: '"安静？！我老公差点死了你叫我安静？！"\n\n更爆了。有人举手机。林姐杀过来把你支开。蹲在那女人面前——声音轻得你听不清。十五分钟后她平静了。\n\n后来林姐就一句："下次——少说两句。多听两句。不是所有药都装在瓶子里。"',
      choices: [{ text: '这句话记住了。', next: 'scene_fruit_no_gift', attr: { 人缘: -3 } }],
    },

    scene_family_go: {
      id: 'scene_family_go',
      title: '背影',
      text: '你转身的时候——她张了张嘴。什么都没说。\n\n后来交班记录上带教写了一行字：\n\n"临床判断尚可。沟通需加强。不是所有救命的都装在药瓶里。"\n\n你盯着看了很久。',
      choices: [{ text: '合上记录。', next: 'scene_fruit_no_gift' }],
    },

    // === 9. 水果 ===
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
      text: '他老婆没有再来。一个人坐在CCU门口。\n\n林姐路过——一杯水轻轻放在你桌上。看了你一眼。拍了拍你的肩膀。走了。\n\n那杯水不知道什么时候凉的。',
      choices: [{ text: '写完病历最后一笔。', next: 'scene_debrief' }],
    },

    // === 10. 复盘 ===
    scene_debrief: {
      id: 'scene_debrief',
      title: '复盘',
      text: '交班前带教从病历里抬起头。"第一个胸痛——什么感觉？"\n\n"……病人不怎么配合。"\n\n"他们永远不配合。"他笑了一声。"那他最后为什么能活？"',
      choices: [
        { text: '"因为及时做了心电图——及时手术通了血管。"', next: 'scene_debrief_content' },
        { text: '"因为他老婆把他拖来了。"', next: 'scene_debrief_content', attr: { 人缘: 2 } },
      ],
    },

    scene_debrief_content: {
      id: 'scene_debrief_content',
      title: '教',
      text: '"都对。"带教往后一靠。\n\n"今天三个要点。\n\n第一：胸痛——第一件事永远是心电图。十几块钱。能救命。心肌坏死的速度按分钟算——你早一分钟通血管，他就多一块活着的心脏。\n\n第二：病人说\'闷\'、\'压\'、\'左胳膊酸\'、\'下巴难受\'——这四个词是心脏缺血的信号。他不知道——你要知道。\n\n第三：家属。病人不说真话——家属说。病人不肯来——家属拖他来。你的第二个病人永远是家属。\n\n最后——"他站起来，"今天还行。但别飘。明天完全不一样。"',
      choices: [
        { text: '"记住了。"', next: 'scene_reflection' },
      ],
    },

    // === 11. 夜末 ===
    scene_reflection: {
      id: 'scene_reflection',
      title: '夜末',
      text: '凌晨。走廊安静下来——如果你把监护仪的滴答声和一个老头的鼾声叫作"安静"的话。\n\n林姐一杯水放在面前。有颜色。\n\n"红枣枸杞。"\n\n"谢谢。第一个自己管的病人——"\n\n"什么感觉？"\n\n你捧着温热的纸杯想了很久——\n\n"像打游戏过了第一关。但命是真的。"\n\n林姐笑了。走了。\n\n窗外天边有一线亮了。',
      choices: [
        { text: '合上病历。天快亮了。', next: 'scene_chapter_end', isChapterEnd: true },
      ],
    },

    // === 12. 章末 ===
    scene_chapter_end: {
      id: 'scene_chapter_end',
      title: '第一章完',
      text: '你脱下白大褂挂在椅背上。第一次穿它的时候太大了——像借的。\n\n现在还是有点大。但已经有你的褶子了。\n\n第一个夜班。一个不肯配合的病人。一张心电图。一台手术。一次家属的眼泪。一次带教的复盘。一杯红枣枸杞。\n\n还有一整个走廊的病人——他们不管你是不是第一天。\n\n（第一章 · 完）',
      choices: [
        { text: '走出急诊科大门。天亮了。', next: null, isChapterEnd: true },
      ],
    },
  },
};
