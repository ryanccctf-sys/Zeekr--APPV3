/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  Car, 
  Store,
  Users, 
  Layers, 
  ChevronLeft, 
  Save, 
  X,
  XCircle,
  CheckCircle2,
  BarChart3,
  Play,
  Pause,
  MessageSquare,
  Search,
  FileText,
  ShieldCheck,
  ChevronDown,
  Calendar,
  Home,
  CreditCard,
  Handshake,
  Mic,
  Activity,
  UserPlus,
  UserCheck,
  UserX,
  LogIn,
  LogOut,
  Coffee,
  MousePointerClick,
  MessageSquareText,
  TrendingUp,
  Clock,
  LayoutGrid,
  UserCircle,
  ArrowUpRight,
  Info,
  History,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Radio,
  ClipboardList,
  Check,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DeviceStatusView } from './components/DeviceStatusView.tsx';
import { DataInsightView } from './components/DataInsightView.tsx';
import { DailyCustomerReportView } from './components/DailyCustomerReportView.tsx';
import { RoleSwitcher, UserRole } from './components/RoleSwitcher.tsx';

const STAGES = [
  '展厅接待', 
  '试乘试驾', 
  '成交谈判', 
  '新车交付', 
  '上门试驾', 
  '线索邀约', 
  '客户回访'
];

const VISIT_TYPES = ['首次', '二次', '未到店'];

const MODELS = [
  '极氪001',
  '极氪7X',
  '极氪007',
  '极氪009',
  '极氪X',
  '极氪MIX'
];

const STORE_EMPLOYEES = ['全部员工', '徐浩峰', '李明宇', '赵欣怡', '周子墨', '陈安琪', '王浩然'];

const ZHIDOU_MODELS = [
  '知豆彩虹',
  '知豆D2',
  '知豆D3',
  '知豆'
];

const SUZHOU_RUNYI_STORES = [
  '苏州园区体验中心',
  '苏州高新区店',
  '苏州相城店',
  '苏州吴中店',
  '苏州姑苏店',
  '苏州吴江店'
];

const DIALOGUE_STAGES = ['全部对话', '展厅接待', '试乘试驾', '产品介绍', '成交谈判', '新车交付'];
const QUALITY_STAGES = ['试乘试驾-IQ傲歌', '线索跟进-凯威德'];

const WeChatCapsule = () => (
  <div className="flex items-center bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full px-2.5 py-1 gap-2.5 shadow-sm scale-[0.85] origin-right">
    <div className="flex gap-1 items-center">
      <div className="w-1 h-1 rounded-full bg-slate-900"></div>
      <div className="w-1.5 h-1.5 rounded-full bg-slate-900"></div>
      <div className="w-1 h-1 rounded-full bg-slate-900"></div>
    </div>
    <div className="w-[1px] h-3 bg-slate-200"></div>
    <div className="relative w-4 h-4 flex items-center justify-center">
      <div className="w-4 h-4 rounded-full border-[1.5px] border-slate-900 flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-slate-900"></div>
      </div>
    </div>
  </div>
);

interface Customer {
  id: string;
  name: string;
  phoneSuffix?: string;
  selectedStages?: string[];
  timeRange: string;
  consultant: string;
  model: string;
  visitType: string;
  status: 'pending' | 'confirmed' | 'expired';
  isInvalid?: boolean;
  summary?: {
    core: string;
    detailed: string;
  };
  keyInfo?: {
    basic: string[];
    focus: string[];
    traits: string[];
    topics: string[];
  };
  qualityInfo?: {
    score: string;
    sections: {
      title: string;
      items: { label: string; status: 'pass' | 'fail' }[];
    }[];
  };
  chatHistory?: {
    time: string;
    sender: '员工' | '客户';
    text: string;
    stage: string;
  }[];
}

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: '1',
    name: '范先生',
    phoneSuffix: '8829',
    selectedStages: ['展厅接待', '试乘试驾'],
    timeRange: '2026-09-22 15:47 - 16:35',
    consultant: '徐浩峰 (极氪伙伴)',
    model: '极氪001',
    visitType: '首次',
    status: 'pending',
    summary: {
      core: '关注 极氪001，高性能四驱，猎装外观，建议提供深度试驾体验',
      detailed: '客户关注 极氪001，双电机四驱版本，猎装绿外观，空气悬架、雅马哈环绕音响，关注城区NZP智驾及800V超快充，需了解置换补贴政策，购车预算 26-30万。'
    },
    keyInfo: {
      basic: ['年内提车', '25-30万', '日常市区通勤+周末自驾'],
      focus: ['极氪001', '四驱双电机', '空悬+CCD', '800V高压快充', 'NZP推送时间', '置换补贴'],
      traits: ['年轻，重视驾控性能', '技术型客户', '对比过小米SU7'],
      topics: ['续航表现', '交付周期']
    },
    qualityInfo: {
      score: '9/10',
      sections: [
        {
          title: '展厅接待',
          items: [
            { label: '主动迎接', status: 'pass' },
            { label: '递送名片/企微添加', status: 'pass' },
            { label: '询问来店渠道', status: 'pass' },
            { label: '引导入座品茶', status: 'pass' },
          ]
        },
        {
          title: '需求分析',
          items: [
            { label: '询问预算与用途', status: 'pass' },
            { label: '询问车型关注点', status: 'pass' },
            { label: '询问对比竞品', status: 'pass' },
            { label: '询问是否置换', status: 'pass' },
          ]
        }
      ]
    },
    chatHistory: [
      { time: '2026-09-22 15:47:10', sender: '员工', text: '您好，范先生，欢迎来到极氪空间！', stage: '展厅接待' },
      { time: '2026-09-22 15:47:15', sender: '客户', text: '你好，我想看看2026款极氪001猎装。', stage: '展厅接待' },
      { time: '2026-09-22 15:48:00', sender: '员工', text: '没问题，展厅这台正是极夜黑外观的双电机四驱旗舰版，带空气悬架，您可以先坐进车内体验下。', stage: '产品介绍' },
      { time: '2026-09-22 15:58:20', sender: '员工', text: '咱们这款标配全栈800V高压系统，CLTC续航705km，充电15分钟即可补能500km。', stage: '产品介绍' },
      { time: '2026-09-22 16:15:30', sender: '客户', text: '底盘调校确实很扎实，操控很稳，现在订车大概多久能提？', stage: '试乘试驾' },
      { time: '2026-09-22 16:25:40', sender: '员工', text: '常规配置周期在2-3周左右，目前门店有本月专属的限时升级权益及置换补贴10,000元。', stage: '成交谈判' }
    ]
  },
  {
    id: '2',
    name: '李女士',
    phoneSuffix: '1234',
    selectedStages: ['展厅接待', '成交谈判'],
    timeRange: '2026-09-22 14:20 - 15:10',
    consultant: '李明宇 (产品专家)',
    model: '极氪7X',
    visitType: '二次',
    status: 'pending',
    summary: {
      core: '关注 极氪7X，家庭大五座SUV，置换需求，对后排安全与静音高度认可',
      detailed: '客户目前驾驶油车轿车，家庭增换购考虑极氪7X。非常看重后排零重力座椅、儿童安全座椅接口以及全系标配激光雷达的安全冗余。'
    },
    keyInfo: {
      basic: ['置换家庭SUV', '22-26万', '二胎家庭用车'],
      focus: ['极氪7X', '大五座空间', '儿童安全', '后排娱乐屏', '隔音静谧性'],
      traits: ['温和', '家庭安全优先', '决策稳重'],
      topics: ['理想L6对比', '选装包政策']
    },
    qualityInfo: {
      score: '8/10',
      sections: [
        {
          title: '展厅接待',
          items: [
            { label: '主动迎接', status: 'pass' },
            { label: '递送名片', status: 'pass' },
            { label: '询问来店渠道', status: 'pass' },
            { label: '引导入座', status: 'pass' },
          ]
        }
      ]
    }
  },
  {
    id: '3',
    name: '王先生',
    phoneSuffix: '5790',
    selectedStages: ['展厅接待', '试乘试驾'],
    timeRange: '2026-09-22 11:00 - 11:55',
    consultant: '周子墨 (销售顾问)',
    model: '极氪007',
    visitType: '首次',
    status: 'pending',
    summary: {
      core: '关注 极氪007 智驾版，看重一体式智慧灯幕与NZP高速高架领航体验',
      detailed: '王先生详细了解极氪007后驱智驾版与四驱性能版区别。试驾重点体验了浩瀚智驾2.0代客泊车与自动变道领航，对车机8295芯片流畅度很满意。'
    }
  },
  {
    id: '4',
    name: '赵总',
    phoneSuffix: '6688',
    selectedStages: ['展厅接待', '试乘试驾', '成交谈判'],
    timeRange: '2026-09-22 10:15 - 11:30',
    consultant: '赵欣怡 (极氪伙伴)',
    model: '极氪009',
    visitType: '二次',
    status: 'confirmed',
    summary: {
      core: '关注 极氪009 豪华商务MPV，注重二排航空座椅与私密静音',
      detailed: '企业商务接待用车升级，赵总对极氪009的双腔空气悬架及后排智能升降雾化隐私玻璃非常认可，已推进公户签约流程。'
    }
  },
  {
    id: '5',
    name: '陈女士',
    phoneSuffix: '3356',
    selectedStages: ['展厅接待', '产品介绍'],
    timeRange: '2026-09-22 09:30 - 10:10',
    consultant: '陈安琪 (客户体验官)',
    model: '极氪MIX',
    visitType: '首次',
    status: 'pending',
    summary: {
      core: '关注 极氪MIX 宝宝巴士，对对开侧滑门与270度旋转座椅极具兴趣',
      detailed: '年轻妈妈用户，关注露营休闲与儿童推车上下便利性，体验了前后旋转对坐模式，计划周末带家人再次到店体验。'
    }
  },
  {
    id: '6',
    name: '张先生',
    phoneSuffix: '9912',
    selectedStages: ['展厅接待', '试乘试驾'],
    timeRange: '2026-09-20 16:00 - 16:40',
    consultant: '王浩然 (极氪伙伴)',
    model: '极氪001',
    visitType: '首次',
    status: 'pending',
    summary: {
      core: '试驾 极氪001 猎装绿，关注操控性与长途续航能力',
      detailed: '对比极氪001与保时捷Taycan，客户对001的底盘扎实度与双腔空悬赞誉有加，待周末带妻子到店复试。'
    }
  },
  {
    id: '7',
    name: '孙女士',
    phoneSuffix: '7734',
    selectedStages: ['展厅接待', '产品介绍', '成交谈判'],
    timeRange: '2026-09-23 10:20 - 11:05',
    consultant: '徐浩峰 (极氪伙伴)',
    model: '极氪7X',
    visitType: '二次',
    status: 'confirmed',
    summary: {
      core: '意向 极氪7X 极夜黑，已确认选装包权益，进入意向定金沟通',
      detailed: '第二次到店，重点核对免息金融分期政策与专属车主权益礼包，预计本周内完成大定锁单。'
    }
  }
];

function getFeishuSummary(customer: any) {
  const id = customer.id;
  const name = customer.name || '客户';
  const model = customer.model || '全新XT5';

  // 1. 全新CT5 (王先生, 尾号5790)
  if (model.includes('CT5') || id === '3') {
    return {
      meetingTitle: '凯迪拉克全新CT5 销售接待与试驾分析',
      module1: {
        receptionType: "到店看车并试驾",
        model: "凯迪拉克全新CT5",
        duration: "约65分钟",
        coreConclusion: "刚毕业客户因预算不足计划2-3年内攒钱购车，完成CT5赛道版试驾并加微信，属于长期蓄水客户。"
      },
      module2: [
        "销售重点介绍了全新CT5赛道版配置、矩阵大灯及电磁悬架。",
        "客户非常喜欢CT5操控与外观，但因刚毕业无首付能力。",
        "已添加微信，销售引导客户按照25万至27万预算进行蓄水。"
      ],
      module3: {
        cardA: {
          title: "产品亮点 / 核心卖点",
          items: [
            "凯迪拉克品牌拥有 **124年** 成熟历史",
            "全新26款车长 **4米930** 且内饰升级",
            "**矩阵大灯** 智能外形，夜间礼貌照路",
            "配备 **MRC电磁悬架** 与 **四活塞制动系统**",
            "全系搭载 **237马力** 发动机与 **10速变速箱**"
          ]
        },
        cardB: {
          title: "配置对比",
          items: [
            "主卖城市运动与赛道版，**风尚版无车**",
            "运动版较标配多 **氛围灯** 与 **16扬AKG音响**",
            "赛道版比赛道性能/运动版 **贵3万元**",
            "赛道版多 **矩阵大灯**、**电磁悬架** 与 **通风**",
            "灰色车漆需 **加8千**，多 **红卡钳** 与 **红钥匙**"
          ]
        },
        cardC: {
          title: "价格信息",
          items: [
            "展厅顶配CT6旗舰版裸车 **32.99万**",
            "CT5赛道版指导价优惠约 **8.5万元**",
            "赛道版折后 **24.59万**，落地约 **27万**",
            "运动版折后 **21.59万**，与赛道差 **3万**",
            "贷款10万分5年，月供 **1900多元**",
            "1年期免息方案固定贷款 **12万元**"
          ]
        }
      },
      module4: {
        cardA: {
          title: "客户画像与意向",
          items: [
            "客户王先生为 **师大刚毕业** 准初中老师",
            "目前尚未入职，未来月薪等同于约 **4至5千**",
            "计划 **2至3年内** 购车，买车心里规划家里出一部分",
            "关注并对比竞品 **奥迪A4L**、**宝马5系** 与 **迈腾**",
            "购车意向强度评级为 **冷（长期蓄水客户）**"
          ]
        },
        cardB: {
          title: "试驾体验与评价",
          items: [
            "客户认为CT5 **指向精准**，踩刹车信心足",
            "体验运动模式，赞赏车速 **提速快** 且 **无顿挫**",
            "嫌弃 **后排空间小**，销售解释因溜背和后驱布局",
            "询问双层玻璃，销售澄清 **仅前排配备** 双层降噪",
            "反馈试驾蔚来ET5后仍 **更喜欢油车** 操控手感"
          ]
        },
        cardC: {
          title: "销售跟进动作",
          items: [
            "到店主动提供 **免费瓶装水** 以缓解炎热",
            "复印登记驾驶证并签署 **试乘试驾协议** 手续",
            "主动赠送 **配置资料单** 供其带走参考",
            "现场完成互加微信，方便后续 **长期联系与促成**",
            "建议客户朝着 **15万首付** 或 **25万总价** 的目标攒钱"
          ]
        }
      },
      testDriveFeedback: {
        cardA: {
          title: "试驾安排与讲解",
          items: [
            "驾照核验完成，签署安全协议，确认试驾路线为标准赛道路线",
            "随车讲解重点：CT5赛道跑车底盘、10AT手自一体变速箱及MRC电磁悬架",
            "驾驶模式演示：运动模式变道及过弯，感受高阻尼对车身的支撑性及指向灵敏度"
          ]
        },
        cardB: {
          title: "客户驾驶反馈",
          items: [
            "底盘：搭载MRC电磁悬架，赛道过急弯极其平稳抗倾摆，路感反馈清晰",
            "动力：起步与加速响应敏锐，10AT变速箱匹配精妙，完全没有顿挫感",
            "操控：变道精准度极其优秀，指向清晰，制动精准，驾控信心极足"
          ]
        },
        cardC: {
          title: "客户顾虑与异议",
          items: [
            "空间顾虑：嫌弃后排头部及腿部空间略显狭小，担心家用载人时会感到局促",
            "隔音疑虑：询问玻璃材质，销售解释目前仅前排配有多层夹胶隔音降噪玻璃",
            "销售应对：解释溜背轿跑和后驱黄金比例布局主打极致运动，空间绝非其核心主场；同时强调前舱静音表现同级一流"
          ]
        }
      },
      priceAndFinance: {
        cardA: {
          title: "价格谈判过程",
          items: [
            "客户开价：未进行实质报价开发，直接表示预算不足",
            "销售第一轮：以CT5指导价让利8.5万作大标杆诱导",
            "最终目标：引导其按照全包27万落地、15万首期做未来理财规划"
          ]
        },
        cardB: {
          title: "金融与优惠方案",
          items: [
            "潜在方案：支持低首付、2年免息低利率金融优惠通道",
            "置换方案：老旧车型享全国大客户5000元通融贴补",
            "销售应对：不进行降价试探，主加微信并促成后期回店体验"
          ]
        }
      },
      followUpWork: [
        "【客户跟进】 刘先生：次日安排旧车上门评估，结果出来后及时告知",
        "【客户跟进】 刘先生：7个工作日内确认配车进度，提前3天通知来店提车",
        "【客户跟进】 张总：周五发送配置对比图+提醒短信，确认周六10点到店"
      ],
      keyDecision: {
        title: "主要决策（与客户接待直接相关，1条）",
        items: [
          { label: "决策内容", value: "销售决定不与客户深度谈判当前车价，转为引导其做长期理财购车规划" },
          { label: "问题", value: "客户刚毕业且无近期购车预算，缺乏当下成交的经济基础" },
          { label: "讨论方案", value: "仅给客户提供配置说明与指导价参考，建议其树立未来2-3年的首付积累目标" },
          { label: "决策依据", value: "短期内无现实成交可能性，盲目让利反而降低利润；通过提供真实引导能有效锁定其毕业后消费偏好" }
        ]
      },
      module5: [
        "【系统/数据类】在青云系统和表格中修改并补全客流数据",
        "【系统/数据类】联系成哥或苗姐删除赵一冰错误到店记录",
        "【资料整理类】下月起将接待记录表格式从7次升级至10次",
        "【客户跟进类】对王先生微信保持不定期维护，关注行情变化"
      ],
      module6: {
        primary: {
          content: "销售决定不与客户深度谈判当前车价，转为引导其做长期理财购车规划。",
          problem: "客户刚毕业且无近期购车预算，缺乏当下成交的经济基础。",
          scheme: "给客户计算27万落地价，引导其先攒15万首付，并告知两年后行情可能更便宜。",
          basis: "短期内无成交可能，通过建立好感和目标激励转化为长期潜客。"
        },
        others: [
          "a. 内部交流决定接客后必须立马发微信备注以防记忆混淆。",
          "b. 决定由泽峰负责填写DCC渠道邀约客户的系统接待信息。"
        ]
      },
      module7: [
        {
          quote: "「这个车长是 4 米 930 的车长，相较于之前最大的变化就是里边内饰的变化。」",
          commentary: "直奔主题对比老款，快速锚定核心升级点。"
        },
        {
          quote: "「后排空间就是小一点，这个就是事实嘛，这也没什么好狡辩的。」",
          commentary: "坦诚承认产品短板，反而更容易赢得客户信任。"
        },
        {
          quote: "「现在看你也比较年轻，先不用考虑那么多，你开个五六年没有再说，对吧？」",
          commentary: "巧妙化解空间顾虑，将定位回归为年轻人自用车。"
        },
        {
          quote: "「现在谈价格没有太大意义，我们还得申请，到时候等你定的时候咱们好好聊聊。」",
          commentary: "针对无近期需求的客户，守住价格底线不亮底牌。"
        }
      ],
      module8: {
        name: "王先生",
        phoneSuffix: "5790",
        native: "山东",
        occupation: "准初中教师（即将分配至石家庄）",
        budget: "25万-27万",
        license: "已满2年（2023年9月领证）",
        companions: "男同学（两人到店）",
        daily: "家中有手动挡大众朗逸，平时出行靠租车"
      }
    };
  }

  // 2. 全新XT5 (范先生)
  if (model.includes('XT5') || id === '1') {
    return {
      meetingTitle: '全新XT5 配置甄选与置换金融方案评估总结',
      module1: {
        receptionType: "到店看车并置换评估",
        model: "凯迪拉克全新XT5",
        duration: "约35分钟",
        coreConclusion: "购车预算20-30万的理性客户，高度关注配置、空间和置换补贴，属于短期意向极高客户。"
      },
      module2: [
        "销售引导置换模式并协助计算置换补贴与大客户专属补贴。",
        "客户强烈偏好红色定制外观，非常相中尊贵版增配HUD、大天窗与蜂鸟阻尼悬架技术。",
        "对免费保养极度渴望，后续计划通过周末上门检测其二手旧车促成最终成交。"
      ],
      module3: {
        cardA: {
          title: "产品亮点 / 核心卖点",
          items: [
            "**蜂鸟底盘升级**：智能电子阻尼与百次瞬时动态四驱调节",
            "**33英寸9K环幕** 曲面屏搭载灵动流畅多媒体舱",
            "全车多层 **夹胶隔降噪玻璃** 与主动空气吸音排噪",
            "高奢前排 **星能舒适真皮座椅** 带多向人体工学调节",
            "承袭凯迪拉克经典美式钻石切面，硬朗且辨识度极好"
          ]
        },
        cardB: {
          title: "配置对比",
          items: [
            "主卖尊贵科技与豪华标配，豪华版主打日常代步务实",
            "尊贵科技版硬升级高频 **自适应蜂鸟阻尼** 与 **HUD顶投屏**",
            "高配版比豪华标配的售价大约贵 **3万元整**",
            "灰色及黑色均为标配现货，专属红色需是个性化定制交期较长"
          ]
        },
        cardC: {
          title: "价格信息",
          items: [
            "豪华版起售价折后约为 **22.99万**",
            "尊贵科技型指导折后车价约为 **25.99万元**",
            "享大客户置换 **1.5万元** 高额政府拆迁补贴红包",
            "旧别克二手评估残值等等额抵顶全部首期金融款项",
            "支持首付低至1.5成，或特享 **两年整免息分期** 还贷"
          ]
        }
      },
      module4: {
        cardA: {
          title: "客户基本画像",
          items: [
            "身份：42岁，本地企业主，从事建材行业，年营业额约2000万",
            "用车场景：商务接待为主，偶尔家庭出行，需要气场与舒适性兼顾",
            "预算：落地50万以内，全款支付，旧车2019年宝马5系可置换",
            "购车时间：本周内决定，有明确用车需求",
            "购车意向强度：热（有明确预算、时间节点，已进入比价最终阶段）"
          ]
        },
        cardB: {
          title: "关注点与顾虑",
          items: [
            "关注点①：后排腿部空间是否足够（经常乘坐后排接待客户）",
            "关注点②：底盘质感与驾驶操控（之前驾驶宝马5系，有参照）",
            "顾虑①：价格略高，询问是否还有降价空间",
            "顾虑②：售后保养网络，担心在外地出差时保养不便",
            "销售应对：演示后排腿部空间；告知全国凯迪拉克4S网点超300家"
          ]
        },
        cardC: {
          title: "竞品对比情况",
          items: [
            "竞品①：宝马5系（客户现有车，对比操控和品牌认知）",
            "竞品②：奔驰E级（客户提及朋友推荐，关注内饰豪华度）",
            "客户态度：认为CT6底盘调教优于5系，但品牌溢价感不如奔驰E",
            "销售应对：用配置清单对比E级同价位，强调CT6性价比更高"
          ]
        }
      },
      testDriveFeedback: {
        cardA: {
          title: "试驾安排与讲解",
          items: [
            "驾照核验完成，客户签署试乘试驾安全协议",
            "试驾路线：展厅→龙华大道→烂路路段→高架桥→返程，共约18公里",
            "销售讲解重点：MRC悬架过烂路表现、ANC主动降噪、后轮转向掉头",
            "驾驶模式演示：舒适→运动，让客户感受方向盘力度变化",
            "试驾全程约28分钟，销售陈浩全程随车讲解"
          ]
        },
        cardB: {
          title: "客户驾驶反馈",
          items: [
            "底盘：「过烂路完全没有想象中的颠，比我的5系强」——高度认可",
            "动力：0-100加速约5.9秒，客户评价「够用，不追求激烈驾驶」",
            "操控：变道稳健，转向精准，「开着比5系更有信心」",
            "隔音：双层夹胶玻璃效果明显，客户主动关掉音响测试背景噪音",
            "后排空间：坐进后排感受腿部空间，「比想象中宽裕，完全够」"
          ]
        },
        cardC: {
          title: "客户顾虑与异议",
          items: [
            "方向盘较重：舒适模式下仍感力度偏大，偏好轻盈手感",
            "车机系统：车机响应速度略慢，询问是否会OTA优化",
            "氛围灯：白天灯光效果不明显，希望可手动控制亮度",
            "销售应对：解释方向盘重量可在个性化设置中微调；承诺OTA持续升级"
          ]
        }
      },
      priceAndFinance: {
        cardA: {
          title: "价格谈判过程",
          items: [
            "客户开价：「45万落地能不能做」（低于实际落地约1万）",
            "销售第一轮：解释当前折扣已是最大力度，落地46万含1.5万置换补贴",
            "客户施压：表示同时在看奔驰E级，E级报价更低",
            "销售让步：申请额外送价值3000元的全车隐形车衣，维持46万落地不变",
            "最终达成：落地46万整 + 全车隐形车衣（价值3000元）"
          ]
        },
        cardB: {
          title: "金融与优惠方案",
          items: [
            "最终落地价：46万整（裸车42万 + 购置税3.7万 + 上户0.3万 + 首年保险1.5万 - 置换补贴1.5万）",
            "付款方式：全款，旧车（19年宝马5系）评估后抵扣",
            "赠品：全车隐形车衣（价值3000元，销售向领导申请获批）",
            "限时活动：本月底前购车额外赠送1年道路救援服务",
            "旧车评估：次日安排评估师上门，初步估值15万-17万"
          ]
        }
      },
      followUpWork: [
        "【客户跟进】 刘先生：次日安排旧车上门评估，结果出来后及时告知",
        "【客户跟进】 刘先生：7个工作日内确认配车进度，提前3天通知来店提车",
        "【客户跟进】 张总：周五发送配置对比图+提醒短信，确认周六10点到店"
      ],
      keyDecision: {
        title: "主要决策（与客户接待直接相关，1条）",
        items: [
          { label: "决策内容", value: "向客户追加赠送全车隐形车衣（价值3000元），维持46万落地价不变" },
          { label: "问题", value: "客户坚持45万落地，低于实际落地1万，直接降价会破坏价格体系" },
          { label: "讨论方案", value: "销售电话请示销售经理，申请以赠品替代降价，隐形车衣成本约800元" },
          { label: "决策依据", value: "客户购买意向极强，旧车置换+全款付款，以小成本赠品锁定高价值成交" }
        ]
      },
      module5: [
        "【系统/数据类】录入并补全范先生别克君越轿车二手评估档案",
        "【客户跟进类】联系评估组敲定周六时间前往范先生处做二手车速测",
        "【客户跟进类】发全新XT5精美动图至群聊并解答其特殊排期疑惑",
        "【商务政策类】提前向集团经理申请置换免息福利通道与常规保维资源"
      ],
      module6: {
        primary: {
          content: "利用这周六上门速测君越的宝贵契机，以此旧车折价作定金引带锁单定购。",
          problem: "所指独有定制红色非常少货，如若等待排期过久容易导致中途退意。",
          scheme: "首要锁定其大置换折扣权益，用申请赠保养福利缓冲等待排期的烦躁。",
          basis: "客户本周定车欲极烈，唯对保养划算度及提车排产顾虑，可用特保资源闭环。"
        },
        others: [
          "a. 泽峰和前台提前查准大客户在库申领优惠资源的详细条件。",
          "b. 本周五前务必和客户打完邀约电话，微信发定位锁死周六车测时间。"
        ]
      },
      module7: [
        {
          quote: "「这个大轮毂开起来，在过不平桥段时，静音厚实感确实远胜A5L。」",
          commentary: "一针见血凸显车辆底盘隔噪与豪车滤震的实车竞争力。"
        },
        {
          quote: "「如果确定这周末你们能把终身免费常规保养申请下来，我们就落定。」",
          commentary: "客户抛出了最后的成交底牌，只需资源支撑即可转化。"
        },
        {
          quote: "「之前的奥迪A5L后座位实在是太压抑了，坐久了让人脑袋疼。」",
          commentary: "竞品痛点正好反衬大五座空间优势，以长板击碎纠结。"
        },
        {
          quote: "「红色外观看起来非常大气经典，哪怕等个一两月也是完全能配得上。」",
          commentary: "客户成功建立起了对定制红色新外观的等待包容心，销售安抚成功。"
        }
      ],
      module8: {
        name: "范先生",
        phoneSuffix: "8829",
        native: "江苏",
        occupation: "企业高级差旅经理",
        budget: "20万-30万",
        license: "已满10年老司机资格",
        companions: "一人到店独立看车",
        daily: "平日开别克君越商务出行较多"
      }
    };
  }

  // 3. Fallback / IQ傲歌 (李女士 / 周先生等)
  return {
    meetingTitle: '奥特能纯电IQ傲歌 销售接待与地库开桩方案评估',
    module1: {
      receptionType: "到店看电车置换评估",
      model: "凯迪拉克IQ傲歌",
      duration: "约50分钟",
      coreConclusion: "关注家庭充电无忧与极高物理防爆安全的理性女性买家，核心研究冬季续航，是有地库车位的意向置换客群。"
    },
    module2: [
      "销售科普奥特能平台的多层防爆阀电池包与原厂终身质保保障解决痛点。",
      "客户倾向优雅纯电颜值，高度相中IQ傲歌静音表现、迎宾车网流灯及19个AKG专业音响。",
      "自家拥有固定产权地库车位，报装个人专属7kW充电桩的条件非常有利物色。"
    ],
    module3: {
      cardA: {
        title: "产品亮点 / 核心卖点",
        items: [
          "通用自研 **奥特能** 纯电超强物理安全防爆防溢平台",
          "原厂承诺电池包 **终身无忧** 原手质保安全护送保障",
          "**19个AKG** 高解析环绕立体声奢华私人车内录音棚",
          "标配前排双层 **夹胶隔降噪风挡玻璃** 静谧隔绝风噪声",
          "**Super Cruise** 超级车道脱手持牌安全无忧巡驾系统"
        ]
      },
      cardB: {
        title: "配置对比",
        items: [
          "主力臻推两驱标准豪华版与尊享的高性能四驱版",
          "两驱豪华搭载前置超高扭电机，百秒加速约 **7.4秒**",
          "四驱尊护搭载双元电机，极速冲刺低至 **4.8秒**",
          "四驱专享流光透感迎宾前脸车网及可随光可亮盾徽",
          "买车超值赠送 **7kW家用自装充电桩** 配搭豪华铺电缆"
        ]
      },
      cardC: {
        title: "价格信息",
        items: [
          "两驱标准豪华版起售指导折后价格为 **20.99万元**",
          "四驱高性能尊护比豪华标准售价方面贵 **3万元整**",
          "官方赠送大贴包尊享别克/凯迪双品牌老车主 **1.2万高额置换补贴**",
          "赠私属特享价值 **2000元官方免费公用快充卡**",
          "享至高10万元零利额还分期方案，有效冲平现量压力"
        ]
      }
    },
    module4: {
      cardA: {
        title: "客户画像与意向",
        items: [
          "客户李女士为性情温顺、极佳讲求全家安稳的医院高管",
          "平日开旧车代步为主，考虑全面代步换电、购低碳新能量",
          "置换预算预算定位在 **20-25万** 之间，极其喜欢车仓氛围细节",
          "对比研究过Model Y后吐槽其减震极硬、后座晕腾、内感极简",
          "名下拥有私产权地下负一层车位，极为支持免费装充电表"
        ]
      },
      cardB: {
        title: "试驾体验与评价",
        items: [
          "称整车静得让人难以置信，边听AKG纯无噪音，质感绝唱极佳",
          "称赞底盘很柔滑、低重心感拉满、过颠陡桥路过缓自适极为舒适",
          "极其认可缓速回收滑档，无高坠拽点头，不易引致父母晕眩",
          "对大面积黑昼全景防热光天幕及隔温档热效果深感放心",
          "对北方冰冬电量存在较大恐惧，听阻热分析后大见回复信心"
        ]
      },
      cardC: {
        title: "销售跟进动作",
        items: [
          "递上热茶，现场同拉计算无息月分期额度与折残置换明细",
          "主安普奥特能双阀防护，技术释疑冰雪极跑对电池的耐性保障",
          "爽快做出可在周二直接协调堪桩队 **免费去其住宅走线路**",
          "打微信，发送地库堪电走线指南、老友回购置换红包等数据单",
          "热情邀请其这周末拉载合家老人，用实车阻尼后座实测晕眩感"
        ]
      }
    },
    testDriveFeedback: {
      cardA: {
        title: "试驾安排与讲解",
        items: [
          "驾驶证件现场复印，李女士签署安全行车责任与体验免责说明协议",
          "规划试车环线：展厅地库及周边市属快速公路，主打平滑与静音体验",
          "销售陈讲解要点：奥特能排爆防燃平台工艺、Super Cruise安全智核巡驾及19扬AKG多维重低音",
          "驾驶预演展现：低盘重力分配及阻泥路面行驶质感、防晕减速阻尼体验",
          "历时约32分钟全程体验，对车内声场科技及静谧性进行了极其完整的演示环节"
        ]
      },
      cardB: {
        title: "客户驾驶反馈",
        items: [
          "隔音：称静得超出常理，开启AKG音响时犹如置身私人室内包房",
          "底盘：过路面接缝或起伏表现优良，滤震韧性强且无多余碎震",
          "动感：起步线性平滑，无电动车常见的俯仰眩晕感，符合家用预期"
        ]
      },
      cardC: {
        title: "客户顾虑与异议",
        items: [
          "冬季担忧：害怕北方冰冷气温对锂电池寿命和实际里程折算有隐形损耗",
          "充电桩：名下有车位但不太了解申请报装配电电表等冗杂事务的办理流程",
          "销售应对：讲解奥特能自发恒温保护和超低温续航保护；承诺只要购车将直接派遣工程师跟进小区并全包报装线路"
        ]
      }
    },
    priceAndFinance: {
      cardA: {
        title: "价格谈判过程",
        items: [
          "客户开价：询问奥特能两驱豪华板20.99万是否有降价空间",
          "销售第一轮：解释国补出清利好最大期，全包23.4万含终身质保",
          "客户施压：对比Model Y表示特斯拉更便宜，且名声更响",
          "销售让步：申请赠送原厂随车高级脚垫及1500元快充卡代金福利"
        ]
      },
      cardB: {
        title: "金融与优惠方案",
        items: [
          "政策落点：折后裸车约20.99万，购车首年免费保险保价",
          "金融政策：首付3成，享受至高10万元零利率定额还分期方案",
          "增值赠品：特赠价值2000元公用快充卡 + 送7kW家用自装充电桩",
          "车位规划：全免派送工程师跟进小区做车位走线、电表报装一站式搞定"
        ]
      }
    },
    followUpWork: [
      "【客户跟进】 刘先生：次日安排旧车上门评估，结果出来后及时告知",
      "【客户跟进】 刘先生：7个工作日内确认配车进度，提前3天通知来店提车",
      "【客户跟进】 张总：周五发送配置对比图+提醒短信，确认周六10点到店"
    ],
    keyDecision: {
      title: "主要决策（与客户接待直接相关，1条）",
      items: [
        { label: "决策内容", value: "向客户承诺免费派送原厂工程师跟进小区，走线及电表报装一站式全免全包" },
        { label: "问题", value: "客户名下有空闲固定车位，但高度嫌恶和不解小区报桩走线等繁琐复杂的行政审批流程" },
        { label: "讨论方案", value: "特批协调专门堪桩组周二上门免费测排，并承诺售前售后全流程跟进，完全替客户跑腿代办" },
        { label: "决策依据", value: "降价折扣已基本底牌（折后20.99万），解决家充安装烦忧是撬动这位高净值医院高管落定最核心的杠杆" }
      ]
    },
    module5: [
      "【系统/数据类】录入李女士老车年限与核车残值详情文档",
      "【客户跟进类】与布桩堪测员明天前往李女士小区做供电走桩核量",
      "【客户跟进类】微信追加推送奥特能电池高冰冻不缩电温控报告",
      "【客户跟进类】星期五傍晚前连环微信锁死李女士家庭二次预约床席"
    ],
    module6: {
      primary: {
        content: "周二免费安排地库堪测师明天核桩线路，以此实情解忧作后续切入抓手。",
        problem: "北方用电客户终极担忧寒冬季电量断塌和车包起火隐虑的固化思维结。",
        scheme: "追加多推北方黑龙江冬天真保高能耗单，重点拿奥特能防撞抗热阀安全撑牌。",
        basis: "先生妻子皆对充电细节与行驶温控极看重，上门堪桩和耐寒数据最能直戳信任。"
      },
      others: [
        "a. 特制向小区管理处发送电力公建说明模板，减少业主申报通电困难。",
        "b. 明日提前打扫和检查粉色内胆尊护版展示车以供到店对比。"
      ]
    },
    module7: [
      {
        quote: "「高能抗拉撞还有奥特能的自动防隔防起火防护，我们平时开很放心。」",
        commentary: "精确对扣家庭白领在纯电用车安防痛点上的高感要求。"
      },
      {
        quote: "「Model Y避震又生又硬，全排颠到简直犯胃病，这个确实柔软扎实不少。」",
        commentary: "竞品底盘阻隔差刚好印证自身的隔震舒适大长板，打出王牌。"
      },
      {
        quote: "「既然你们说上门装桩是免费报建的，那这周二能直接派专人去看看不？」",
        commentary: "实事走桩报建是最佳首要突破点，主动派遣测线有利于快单闭环。"
      },
      {
        quote: "「这个19喇叭的AKG环音真像是音乐厅，一按没噪极安静，下班听正好消遣。」",
        commentary: "完全吸引了都市上班买家对应当极致解压、舒适享受的内心体验。"
      }
    ],
    module8: {
      name: "李女士",
      phoneSuffix: "1234",
      native: "本地",
      occupation: "大型私立医院行政总监",
      budget: "20万-25万",
      license: "已满5年驾车经历",
      companions: "和丈夫一同来访",
      daily: "驾驶一辆雪天代步的老大众，想置换中级纯电"
    }
  };
}



export default function App() {
  const [userRole, setUserRole] = useState<UserRole>('store_manager');
  const [view, setView] = useState<'edit' | 'list' | 'details' | 'confirmation' | 'dataCollection' | 'profile' | 'deviceStatus' | 'customerDetails' | 'checkIn' | 'checkInHistory' | 'reception' | 'receptionInProgress' | 'receptionHistory' | 'receptionManual' | 'receptionSummary' | 'qualityData' | 'dailyReport'>('dataCollection');

  const handleRoleChange = (newRole: UserRole) => {
    setUserRole(newRole);
    if (newRole === 'sales_advisor') {
      // 销售顾问底菜单：客户列表、客户接待、设备状态、我的
      if (view === 'dailyReport' || view === 'dataCollection' || view === 'qualityData') {
        setView('list');
      }
    } else if (newRole === 'store_manager') {
      // 门店店长底菜单：数据洞察、客户列表、设备状态、我的
      if (view === 'reception' || view === 'receptionInProgress' || view === 'receptionHistory' || view === 'receptionManual' || view === 'receptionSummary' || view === 'dailyReport') {
        setView('dataCollection');
      }
    }
  };
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [selectedEmployeeFilter, setSelectedEmployeeFilter] = useState<string>('全部员工');
  const [selectedTimeFilter, setSelectedTimeFilter] = useState<'全部时间' | '今天' | '昨天' | '近7天' | '近30天' | '自定义'>('全部时间');
  const [customStartDate, setCustomStartDate] = useState<string>('2026-09-01');
  const [customEndDate, setCustomEndDate] = useState<string>('2026-09-23');
  const [openFilterModal, setOpenFilterModal] = useState<'employee' | 'time' | null>(null);
  const [tempCustomStart, setTempCustomStart] = useState<string>('2026-09-01');
  const [tempCustomEnd, setTempCustomEnd] = useState<string>('2026-09-23');

  const [confirmationTab, setConfirmationTab] = useState<'pending' | 'confirmed' | 'expired'>('pending');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isInvalidCustomer, setIsInvalidCustomer] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [activeModule3Tab, setActiveModule3Tab] = useState<'cardA' | 'cardB' | 'cardC'>('cardA');
  const [activeModule4Tab, setActiveModule4Tab] = useState<'cardA' | 'cardB' | 'cardC'>('cardA');
  const [activeTestDriveTab, setActiveTestDriveTab] = useState<'cardA' | 'cardB' | 'cardC'>('cardA');
  const [activePriceTab, setActivePriceTab] = useState<'cardA' | 'cardB'>('cardA');
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeDialogueStage, setActiveDialogueStage] = useState('全部对话');
  const [activeQualityStage, setActiveQualityStage] = useState('试乘试驾-IQ傲歌');
  const [expandedQualityItems, setExpandedQualityItems] = useState<string[]>(['需求分析']);
  const [activeExplanation, setActiveExplanation] = useState<{label: string, text: string} | null>(null);
  const [selectedModel, setSelectedModel] = useState('全部');
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [pendingCheckInStatus, setPendingCheckInStatus] = useState<'on-duty' | 'off-duty' | null>(null);
  
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    module2: false,
    module3: false,
    module4: false,
    testDriveFeedback: false,
    priceAndFinance: false,
    followUpWork: false,
    keyDecision: false,
    module7: false
  });

  const toggleSection = (sectionKey: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  interface ReceptionRecord {
    id: string;
    startTime: string;
    endTime: string;
    date: string;
    type: 'auto' | 'manual';
    businessType?: 'car' | 'suzhou_runyi';
    carSelections?: { model: string, scene: string }[];
    customerType?: '首次进店' | '再次进店';
    dealStatus?: '是' | '否';
    customerName?: string;
    processName?: string;
    store?: string;
  }
  const [receptionHistory, setReceptionHistory] = useState<ReceptionRecord[]>(() => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    return [
      {
        id: 'mock-1',
        startTime: '10:15:30',
        endTime: '10:45:12',
        date: today,
        type: 'auto',
        businessType: 'car',
        dealStatus: '是',
        carSelections: [
          { model: '全新XT5', scene: '展厅&试驾' }
        ],
        customerType: '首次进店'
      },
      {
        id: 'mock-2',
        startTime: '14:20:00',
        endTime: '14:55:00',
        date: today,
        type: 'manual',
        businessType: 'car',
        dealStatus: '否',
        carSelections: [
          { model: 'CT4', scene: '试驾' },
          { model: 'XT6', scene: '展厅' }
        ],
        customerType: '再次进店'
      },
      {
        id: 'mock-3',
        startTime: '09:10:00',
        endTime: '09:42:30',
        date: yesterday,
        type: 'auto',
        businessType: 'car',
        dealStatus: '是',
        carSelections: [
          { model: 'IQ锐歌', scene: '展厅' }
        ],
        customerType: '首次进店'
      },
      {
        id: 'mock-4',
        startTime: '16:45:00',
        endTime: '17:15:20',
        date: yesterday,
        type: 'auto',
        businessType: 'car',
        dealStatus: '是',
        carSelections: [
          { model: '全新CT6', scene: '试驾' }
        ],
        customerType: '再次进店'
      },
      {
        id: 'mock-5',
        startTime: '11:00:00',
        endTime: '11:20:45',
        date: twoDaysAgo,
        type: 'manual',
        businessType: 'car',
        dealStatus: '否',
        carSelections: [
          { model: 'GT4', scene: '展厅' }
        ],
        customerType: '首次进店'
      },
      // 苏州润益业务初始接待记录
      {
        id: 'mock-ry-1',
        startTime: '10:05:00',
        endTime: '10:38:20',
        date: today,
        type: 'auto',
        businessType: 'suzhou_runyi',
        dealStatus: '是',
        customerName: '张建国',
        processName: '润益延保销售流程',
        store: '苏州园区体验中心',
        carSelections: [{ model: '苏州园区体验中心', scene: '润益延保销售流程' }]
      },
      {
        id: 'mock-ry-2',
        startTime: '13:40:00',
        endTime: '14:15:00',
        date: today,
        type: 'manual',
        businessType: 'suzhou_runyi',
        dealStatus: '否',
        customerName: '李梦琪',
        processName: '润益延保销售流程',
        store: '苏州高新区店',
        carSelections: [{ model: '苏州高新区店', scene: '润益延保销售流程' }]
      },
      {
        id: 'mock-ry-3',
        startTime: '09:20:00',
        endTime: '09:55:40',
        date: yesterday,
        type: 'auto',
        businessType: 'suzhou_runyi',
        dealStatus: '是',
        customerName: '王浩',
        processName: '润益延保销售流程',
        store: '苏州相城店',
        carSelections: [{ model: '苏州相城店', scene: '润益延保销售流程' }]
      },
      {
        id: 'mock-ry-4',
        startTime: '15:30:00',
        endTime: '16:05:10',
        date: yesterday,
        type: 'manual',
        businessType: 'suzhou_runyi',
        dealStatus: '是',
        customerName: '赵晓晨',
        processName: '润益延保销售流程',
        store: '苏州吴中店',
        carSelections: [{ model: '苏州吴中店', scene: '润益延保销售流程' }]
      },
      {
        id: 'mock-ry-5',
        startTime: '11:15:00',
        endTime: '11:46:30',
        date: twoDaysAgo,
        type: 'auto',
        businessType: 'suzhou_runyi',
        dealStatus: '否',
        customerName: '刘立新',
        processName: '润益延保销售流程',
        store: '苏州姑苏店',
        carSelections: [{ model: '苏州姑苏店', scene: '润益延保销售流程' }]
      }
    ];
  });
  const [historyBusinessType, setHistoryBusinessType] = useState<'car' | 'suzhou_runyi'>('car');
  const [activeReception, setActiveReception] = useState<{startTime: string, date: string} | null>(null);
  const [showEndReceptionConfirm, setShowEndReceptionConfirm] = useState(false);
  const [showInvalidCustomerConfirm, setShowInvalidCustomerConfirm] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [historyDateRange, setHistoryDateRange] = useState({
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [manualReceptionData, setManualReceptionData] = useState<{
    date: string,
    startTime: string,
    endTime: string,
    carSelections: { model: string, scene: string }[],
    customerType: '首次进店' | '再次进店',
    dealStatus: '是' | '否',
    customerName: string
  }>({
    date: new Date().toISOString().split('T')[0],
    startTime: '10:00',
    endTime: '10:30',
    carSelections: [],
    customerType: '首次进店',
    dealStatus: '是',
    customerName: ''
  });

  const [lastReceptionSummary, setLastReceptionSummary] = useState<{
    startTime: string,
    endTime: string,
    duration: string,
    date: string,
    carSelections: { model: string, scene: string }[],
    dealStatus: '是' | '否',
    customerName: string
  } | null>(null);

  const [qualityDateRange, setQualityDateRange] = useState({
    start: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    end: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });
  const [qualityQuickRange, setQualityQuickRange] = useState<'昨天' | '近3天' | '近7天'>('昨天');
  const [qualityFilterModel, setQualityFilterModel] = useState(MODELS[0]);

  const [receptionBrand, setReceptionBrand] = useState<'cadillac' | 'zhidou' | 'suzhou_runyi'>('cadillac');
  const useZhidouModels = receptionBrand === 'zhidou';

  const currentModels = MODELS;

  const handleBrandChange = (brand: 'cadillac' | 'zhidou' | 'suzhou_runyi') => {
    setReceptionBrand(brand);
    const items = brand === 'zhidou' ? ZHIDOU_MODELS : brand === 'suzhou_runyi' ? SUZHOU_RUNYI_STORES : MODELS;
    setSelectedModel('全部');
    setQualityFilterModel(items[0] || MODELS[0]);
    if (lastReceptionSummary) {
      setLastReceptionSummary({
        ...lastReceptionSummary,
        carSelections: []
      });
    }
    setManualReceptionData(prev => ({
      ...prev,
      carSelections: []
    }));
  };

  const handleToggleZhidou = (val: boolean) => {
    handleBrandChange(val ? 'zhidou' : 'cadillac');
  };

  const [checkInHistory, setCheckInHistory] = useState<{
    time: string, 
    date: string, 
    status: 'on-duty' | 'off-duty', 
    method: 'manual' | 'auto'
  }[]>([
    { time: '09:00:00', date: '2026-03-23', status: 'on-duty', method: 'auto' },
    { time: '14:20:15', date: '2026-03-22', status: 'off-duty', method: 'manual' },
    { time: '09:00:00', date: '2026-03-21', status: 'on-duty', method: 'auto' },
  ]);
  
  const getTodayDateStr = () => new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
  const todayRecord = checkInHistory.find(h => h.date === getTodayDateStr());
  
  const [formData, setFormData] = useState({
    name: '张三',
    phoneSuffix: '1234',
    model: '全新XT5',
    visitType: '首次',
    selectedStages: ['展厅接待', '试乘试驾', '成交谈判']
  });

  const toggleStage = (stage: string) => {
    setFormData(prev => ({
      ...prev,
      selectedStages: prev.selectedStages.includes(stage)
        ? prev.selectedStages.filter(s => s !== stage)
        : [...prev.selectedStages, stage]
    }));
  };

  const handleSave = () => {
    setConfirmationTab('confirmed');
    setView('confirmation');
  };

  const openDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setView('details');
    setActiveTab(0);
  };

  const renderEditView = () => (
    <>
      {/* Simple Minimal Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between">
        <button 
          onClick={() => setView('list')}
          className="p-2 -ml-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-slate-800 tracking-tight">编辑客流信息</h1>
        <div className="flex items-center">
          <WeChatCapsule />
        </div>
      </header>

      {/* Form Content */}
      <main className="flex-1 px-6 py-6 space-y-8 overflow-y-auto pb-32">
        {/* Is Valid Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-purple-600 font-semibold mb-2">
            <Users size={18} />
            <span>是否有效卡片</span>
          </div>
          <div className="flex gap-3">
            {['是', '否'].map((option) => (
              <button
                key={option}
                onClick={() => setIsInvalidCustomer(option === '否')}
                className={`flex-1 py-3 px-4 rounded-2xl font-medium transition-all flex items-center justify-center gap-2 border-2 ${
                  (!isInvalidCustomer && option === '是') || (isInvalidCustomer && option === '否')
                  ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-200' 
                  : 'bg-white text-slate-600 border-slate-100 hover:border-purple-200'
                }`}
              >
                {((!isInvalidCustomer && option === '是') || (isInvalidCustomer && option === '否')) && <CheckCircle2 size={16} />}
                {option}
              </button>
            ))}
          </div>
          {isInvalidCustomer && (
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-3 mt-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <AlertCircle size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-amber-700 leading-relaxed font-medium">
                该卡片为无效卡片
              </p>
            </div>
          )}
        </section>

        {!isInvalidCustomer && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Basic Info Section */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 text-purple-600 font-semibold mb-2">
                <Layers size={18} />
                <span>基础信息</span>
              </div>
              
              <div className="space-y-4">
                {/* Name Input */}
                <div className="relative group">
                  <label className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1 block ml-1">客户姓名</label>
                  <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100 transition-all">
                    <User size={18} className="text-slate-400 mr-3" />
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="bg-transparent border-none outline-none w-full text-slate-700 font-medium"
                      placeholder="请输入姓名"
                    />
                  </div>
                </div>

                {/* Phone Suffix Input */}
                <div className="relative group">
                  <label className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1 block ml-1">手机尾号</label>
                  <div className="flex items-center bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100 transition-all">
                    <Phone size={18} className="text-slate-400 mr-3" />
                    <input 
                      type="text" 
                      maxLength={4}
                      value={formData.phoneSuffix}
                      onChange={(e) => setFormData({...formData, phoneSuffix: e.target.value})}
                      className="bg-transparent border-none outline-none w-full text-slate-700 font-medium"
                      placeholder="请输入4位尾号"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Intended Model Section (Single Choice) */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-purple-600 font-semibold mb-2">
                <Car size={18} />
                <span>意向车型</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {currentModels.map((model) => (
                  <button
                    key={model}
                    onClick={() => setFormData({...formData, model: model})}
                    className={`py-3 px-4 rounded-2xl font-medium transition-all flex items-center justify-center gap-2 border-2 ${
                      formData.model === model 
                      ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-200' 
                      : 'bg-white text-slate-600 border-slate-100 hover:border-purple-200'
                    }`}
                  >
                    {formData.model === model && <CheckCircle2 size={16} />}
                    <span className="truncate">{model}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Visit Type Section (Single Choice) */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-purple-600 font-semibold mb-2">
                <Users size={18} />
                <span>客户类型</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {VISIT_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => setFormData({...formData, visitType: type})}
                    className={`py-3 px-2 rounded-2xl text-sm font-medium transition-all flex items-center justify-center gap-1 border-2 ${
                      formData.visitType === type 
                      ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-200' 
                      : 'bg-white text-slate-600 border-slate-100 hover:border-purple-200'
                    }`}
                  >
                    {formData.visitType === type && <CheckCircle2 size={14} />}
                    {type}
                  </button>
                ))}
              </div>
            </section>

            {/* Stages Section (Multi Choice) */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-purple-600 font-semibold mb-2">
                <Layers size={18} />
                <span>跟进环节</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {STAGES.map((stage) => {
                  const isSelected = formData.selectedStages.includes(stage);
                  return (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      key={stage}
                      onClick={() => toggleStage(stage)}
                      className={`py-2.5 px-4 rounded-full text-sm font-medium transition-all border ${
                        isSelected 
                        ? 'bg-purple-100 text-purple-700 border-purple-300' 
                        : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-purple-200'
                      }`}
                    >
                      {stage}
                    </motion.button>
                  );
                })}
              </div>
            </section>
          </motion.div>
        )}
      </main>

      {/* Footer Actions */}
      <footer className="absolute bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-lg border-t border-slate-100 flex gap-4 z-20">
        <button 
          onClick={() => {
            setConfirmationTab('pending');
            setView('confirmation');
          }}
          className="flex-1 py-4 px-6 bg-slate-100 text-slate-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
        >
          <X size={20} />
          取消
        </button>
        <button 
          onClick={handleSave}
          className="flex-[2] py-4 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-purple-200 hover:opacity-90 transition-opacity"
        >
          <Save size={20} />
          保存
        </button>
      </footer>
    </>
  );

  const renderListView = () => {
    const filteredCustomers = MOCK_CUSTOMERS.filter((customer) => {
      // 销售顾问只展示自己的客户
      if (userRole === 'sales_advisor') {
        if (!customer.consultant.includes('徐浩峰')) {
          return false;
        }
      }

      // 门店店长：员工筛选
      if (userRole === 'store_manager' && selectedEmployeeFilter !== '全部员工') {
        if (!customer.consultant.includes(selectedEmployeeFilter)) {
          return false;
        }
      }

      // 时间筛选（销售顾问与门店店长均支持）
      if (selectedTimeFilter !== '全部时间') {
        const customerDateStr = customer.timeRange.slice(0, 10);
        const todayStr = '2026-09-23';
        const yesterdayStr = '2026-09-22';

        if (selectedTimeFilter === '今天') {
          return customerDateStr === todayStr;
        }
        if (selectedTimeFilter === '昨天') {
          return customerDateStr === yesterdayStr;
        }
        if (selectedTimeFilter === '近7天') {
          return customerDateStr >= '2026-09-17' && customerDateStr <= todayStr;
        }
        if (selectedTimeFilter === '近30天') {
          return customerDateStr >= '2026-08-24' && customerDateStr <= todayStr;
        }
        if (selectedTimeFilter === '自定义') {
          const start = customStartDate || '1970-01-01';
          const end = customEndDate || '2099-12-31';
          return customerDateStr >= start && customerDateStr <= end;
        }
      }

      return true;
    });

    return (
      <div className="flex-1 flex flex-col min-h-0 bg-slate-50 relative overflow-y-auto pb-24">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-3.5 py-2.5 flex items-center justify-between shadow-2xs">
          <div className="w-[140px] flex-none"></div>
          <h1 className="text-base font-bold text-slate-800 text-center flex-1">客户列表</h1>
          <div className="w-[140px] flex-none flex justify-end">
            <RoleSwitcher currentRole={userRole} onRoleChange={handleRoleChange} />
          </div>
        </header>

        {/* 顶部筛选栏：店长（员工+时间筛选），销售顾问（时间筛选） */}
        <div className="bg-white border-b border-slate-200/80 px-4 py-2.5 flex items-center justify-between gap-2 shadow-2xs sticky top-0 z-20">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {/* 仅门店店长显示员工筛选按钮 */}
            {userRole === 'store_manager' && (
              <button
                type="button"
                onClick={() => setOpenFilterModal(openFilterModal === 'employee' ? null : 'employee')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-between gap-1.5 truncate ${
                  selectedEmployeeFilter !== '全部员工'
                    ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-2xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <User size={13} className={selectedEmployeeFilter !== '全部员工' ? 'text-blue-600' : 'text-slate-400'} />
                  <span className="truncate">{selectedEmployeeFilter === '全部员工' ? '员工: 全部' : `员工: ${selectedEmployeeFilter}`}</span>
                </div>
                <ChevronDown size={13} className={`shrink-0 transition-transform ${openFilterModal === 'employee' ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
              </button>
            )}

            {/* 时间筛选按钮（店长与销售顾问均可使用） */}
            <button
              type="button"
              onClick={() => {
                setTempCustomStart(customStartDate);
                setTempCustomEnd(customEndDate);
                setOpenFilterModal(openFilterModal === 'time' ? null : 'time');
              }}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-between gap-1.5 truncate ${
                selectedTimeFilter !== '全部时间'
                  ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-2xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-1.5 truncate">
                <Calendar size={13} className={selectedTimeFilter !== '全部时间' ? 'text-blue-600' : 'text-slate-400'} />
                <span className="truncate">
                  {selectedTimeFilter === '全部时间'
                    ? (userRole === 'sales_advisor' ? '全部时间' : '时间: 全部')
                    : selectedTimeFilter === '自定义'
                      ? `${customStartDate.slice(5)}~${customEndDate.slice(5)}`
                      : selectedTimeFilter}
                </span>
              </div>
              <ChevronDown size={13} className={`shrink-0 transition-transform ${openFilterModal === 'time' ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
            </button>
          </div>

          {/* 如果有生效的筛选条件，提供快捷重置 */}
          {((userRole === 'store_manager' && selectedEmployeeFilter !== '全部员工') || selectedTimeFilter !== '全部时间') && (
            <button
              type="button"
              onClick={() => {
                setSelectedEmployeeFilter('全部员工');
                setSelectedTimeFilter('全部时间');
              }}
              className="py-1.5 px-2 rounded-lg text-[11px] font-bold text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors flex items-center gap-1 shrink-0"
            >
              <RotateCcw size={11} />
              <span>重置</span>
            </button>
          )}
        </div>

        {/* List */}
        <div className="p-4 space-y-3.5">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <Users size={15} className="text-slate-500" />
              <span className="text-xs font-bold text-slate-700">
                {userRole === 'store_manager' 
                  ? (selectedEmployeeFilter === '全部员工' ? '门店全部接待记录' : `${selectedEmployeeFilter} 的接待记录`)
                  : (selectedTimeFilter === '全部时间' ? '我的接待客户' : `我的接待客户 (${selectedTimeFilter})`)}
              </span>
            </div>
            <span className="text-xs text-blue-600 font-semibold">共 {filteredCustomers.length} 条接待</span>
          </div>

          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer) => (
              <motion.div
                key={customer.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => openDetails(customer)}
                className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-lg font-bold shadow-md shadow-blue-100 group-hover:scale-105 transition-transform relative">
                      {customer.name[0]}
                      {(!customer.summary || !customer.keyInfo || !customer.qualityInfo) && (
                        <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-black text-slate-900">{customer.name}</h3>
                        {(!customer.summary || !customer.keyInfo || !customer.qualityInfo) && (
                          <span className="flex items-center gap-1 px-1.5 py-0.5 bg-amber-50 text-amber-600 text-[10px] font-bold rounded border border-amber-100">
                            <Clock size={10} />
                            AI生成中
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full border border-blue-100">
                          {customer.visitType}
                        </span>
                        <span className="text-slate-500 text-xs flex items-center gap-1">
                          <Car size={12} className="text-slate-400" /> {customer.model}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      <ChevronLeft size={16} className="rotate-180" />
                    </div>
                  </div>
                </div>

                {/* 呈现是哪一个销售顾问做的接待（仅门店店长视角展示，销售顾问视角隐藏） */}
                <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">{customer.timeRange}</span>
                  {userRole === 'store_manager' && (
                    <div className="flex items-center gap-1.5 bg-blue-50/80 border border-blue-100/80 px-2.5 py-1 rounded-full text-slate-700">
                      <User size={11} className="text-blue-600" />
                      <span className="text-[11px] font-bold">接待顾问: <span className="text-blue-700">{customer.consultant}</span></span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-14 bg-white rounded-2xl border border-dashed border-slate-200 text-center flex flex-col items-center justify-center p-6">
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-2.5">
                <Search size={22} />
              </div>
              <p className="text-sm font-bold text-slate-700">暂无符合条件的接待记录</p>
              <p className="text-xs text-slate-400 mt-1">
                {userRole === 'store_manager' ? '可尝试切换员工或时间范围查看' : '可尝试切换时间范围查看'}
              </p>
              <button
                onClick={() => {
                  setSelectedEmployeeFilter('全部员工');
                  setSelectedTimeFilter('全部时间');
                }}
                className="mt-3 px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-100 transition-colors"
              >
                重置筛选
              </button>
            </div>
          )}
        </div>

        {/* Filter Selection Bottom Sheet */}
        <AnimatePresence>
          {openFilterModal && (
            <div className="fixed inset-0 z-50 flex flex-col justify-end">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpenFilterModal(null)}
                className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs"
              />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                className="relative bg-white rounded-t-3xl p-5 shadow-2xl z-10 max-h-[85vh] overflow-y-auto"
              >
                {/* Employee Filter Sheet */}
                {openFilterModal === 'employee' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <Users size={18} className="text-blue-600" />
                        <h3 className="text-base font-bold text-slate-900">选择接待员工</h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setOpenFilterModal(null)}
                        className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 pt-1">
                      {STORE_EMPLOYEES.map((emp) => {
                        const isSelected = selectedEmployeeFilter === emp;
                        return (
                          <button
                            key={emp}
                            type="button"
                            onClick={() => {
                              setSelectedEmployeeFilter(emp);
                              setOpenFilterModal(null);
                            }}
                            className={`py-3 px-3.5 rounded-2xl text-xs font-bold transition-all border flex items-center justify-between ${
                              isSelected
                                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100'
                                : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
                            }`}
                          >
                            <span>{emp}</span>
                            {isSelected && <Check size={14} className="text-white" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Time Filter Sheet */}
                {openFilterModal === 'time' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <Calendar size={18} className="text-blue-600" />
                        <h3 className="text-base font-bold text-slate-900">选择时间范围</h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setOpenFilterModal(null)}
                        className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    {/* Quick Presets */}
                    <div className="space-y-2">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">快捷时间</p>
                      <div className="grid grid-cols-3 gap-2">
                        {(['全部时间', '今天', '昨天', '近7天', '近30天'] as const).map((timeOpt) => {
                          const isSelected = selectedTimeFilter === timeOpt;
                          return (
                            <button
                              key={timeOpt}
                              type="button"
                              onClick={() => {
                                setSelectedTimeFilter(timeOpt);
                                setOpenFilterModal(null);
                              }}
                              className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all border text-center ${
                                isSelected
                                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                  : 'bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100'
                              }`}
                            >
                              {timeOpt}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Custom Date Range */}
                    <div className="space-y-2.5 pt-2 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">自定义时间范围</p>
                        {selectedTimeFilter === '自定义' && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded">已生效</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2">
                          <label className="block text-[10px] text-slate-400 font-bold mb-0.5">开始日期</label>
                          <input
                            type="date"
                            value={tempCustomStart}
                            onChange={(e) => setTempCustomStart(e.target.value)}
                            className="w-full bg-transparent text-xs font-bold text-slate-800 outline-none"
                          />
                        </div>
                        <span className="text-slate-300 font-bold">至</span>
                        <div className="flex-1 bg-slate-50 border border-slate-200/80 rounded-xl px-3 py-2">
                          <label className="block text-[10px] text-slate-400 font-bold mb-0.5">结束日期</label>
                          <input
                            type="date"
                            value={tempCustomEnd}
                            onChange={(e) => setTempCustomEnd(e.target.value)}
                            className="w-full bg-transparent text-xs font-bold text-slate-800 outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedTimeFilter('全部时间');
                            setOpenFilterModal(null);
                          }}
                          className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-200 transition-colors"
                        >
                          清除时间筛选
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setCustomStartDate(tempCustomStart);
                            setCustomEndDate(tempCustomEnd);
                            setSelectedTimeFilter('自定义');
                            setOpenFilterModal(null);
                          }}
                          className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold text-xs shadow-md shadow-blue-200 hover:bg-blue-700 transition-colors"
                        >
                          确认应用自定义
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderConfirmationView = () => {
    return (
      <div className="flex-1 flex flex-col min-h-0 bg-slate-50 relative overflow-y-auto pb-24">
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md px-4 pt-6 pb-2 flex flex-col items-center border-b border-slate-100">
          <div className="w-full flex justify-between items-center mb-4">
            <div className="w-10"></div>
            <h1 className="text-lg font-bold text-slate-800">AI结果确认</h1>
            <WeChatCapsule />
          </div>
          <div className="flex w-full bg-slate-100 p-1 rounded-xl mb-2">
            <button 
              onClick={() => setConfirmationTab('pending')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                confirmationTab === 'pending' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-400'
              }`}
            >
              待确认 ({MOCK_CUSTOMERS.filter(c => c.status === 'pending').length})
            </button>
            <button 
              onClick={() => setConfirmationTab('confirmed')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                confirmationTab === 'confirmed' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-400'
              }`}
            >
              已确认 ({MOCK_CUSTOMERS.filter(c => c.status === 'confirmed').length})
            </button>
            <button 
              onClick={() => setConfirmationTab('expired')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                confirmationTab === 'expired' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-400'
              }`}
            >
              已失效 ({MOCK_CUSTOMERS.filter(c => c.status === 'expired').length})
            </button>
          </div>
        </header>

        <div className="p-4 space-y-4">
          {confirmationTab === 'pending' && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-amber-50 border border-amber-100 rounded-xl p-3 flex items-start gap-2"
            >
              <AlertCircle size={16} className="text-amber-500 mt-0.5 shrink-0" />
              <p className="text-[11px] text-amber-700 leading-relaxed">
                <span className="font-bold">提示：</span>
                推送次日8:00前不确认将失效无法确认，请及时处理。
              </p>
            </motion.div>
          )}

          {MOCK_CUSTOMERS.filter(c => c.status === confirmationTab).map((customer, idx) => (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => {
                if (confirmationTab === 'pending') {
                  setSelectedCustomer(customer);
                  setIsInvalidCustomer(false);
                  setView('edit');
                } else {
                  setSelectedCustomer(customer);
                  setView('customerDetails');
                }
              }}
              className={`bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 group transition-all active:scale-[0.98] cursor-pointer ${
                confirmationTab === 'expired' ? 'opacity-70 grayscale-[0.3]' : ''
              }`}
            >
              <div className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg font-bold shadow-lg ${
                      idx % 3 === 0 ? 'bg-gradient-to-br from-purple-500 to-indigo-600' : 
                      idx % 3 === 1 ? 'bg-gradient-to-br from-blue-500 to-cyan-600' : 
                      'bg-gradient-to-br from-emerald-500 to-teal-600'
                    }`}>
                      {customer.name[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-slate-800">{customer.name}</h3>
                        {customer.status === 'expired' && (
                          <span className="px-1.5 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded border border-slate-200">
                            已失效
                          </span>
                        )}
                        {customer.status === 'pending' && (!customer.summary || !customer.keyInfo || !customer.qualityInfo) && (
                          <span className="flex items-center gap-1 px-1.5 py-0.5 bg-amber-50 text-amber-600 text-[10px] font-bold rounded border border-amber-100">
                            <Clock size={10} />
                            生成中
                          </span>
                        )}
                        {customer.isInvalid === true ? (
                          <span className="px-2 py-0.5 bg-rose-50 text-rose-600 text-[10px] font-bold rounded-full border border-rose-100">
                            无效卡片
                          </span>
                        ) : (
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            customer.visitType === '首次' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                            customer.visitType === '二次' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                            'bg-slate-50 text-slate-500 border-slate-200'
                          }`}>
                            {customer.visitType}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 mt-1">
                        <Clock size={12} />
                        <span className="text-xs font-mono">{customer.timeRange}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {customer.isInvalid !== true && (
                  <div className="grid grid-cols-2 gap-4 py-3 border-t border-slate-50">
                    <div>
                      <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">意向车型</div>
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Car size={14} className="text-slate-400" />
                        <span className="text-xs font-bold">{customer.model}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">跟进环节</div>
                      <div className="flex flex-wrap gap-1">
                        {customer.selectedStages?.map(stage => (
                          <span key={stage} className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                            {stage}
                          </span>
                        )) || <span className="text-[10px] text-slate-300">未录入</span>}
                      </div>
                    </div>
                  </div>
                )}

                {confirmationTab === 'expired' ? (
                  <div className="mt-3 pt-3 border-t border-slate-50 flex flex-col items-center gap-1">
                    <div className="text-slate-400 text-xs font-bold flex items-center gap-1">
                      点击查看详情 <ChevronLeft size={14} className="rotate-180" />
                    </div>
                    <span className="text-[10px] text-slate-300 italic">推送次日8:00前未确认已失效</span>
                  </div>
                ) : confirmationTab === 'pending' ? (
                  <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-center gap-1 text-purple-600 text-xs font-bold">
                    点击进入详情页确认 <ChevronLeft size={14} className="rotate-180" />
                  </div>
                ) : (
                  <div className="mt-3 pt-3 border-t border-slate-50 flex items-center justify-center gap-1 text-slate-400 text-xs font-bold">
                    点击查看详情 <ChevronLeft size={14} className="rotate-180" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const renderCustomerDetailsView = () => {
    if (!selectedCustomer) return null;
    
    return (
      <div className="flex-1 flex flex-col min-h-0 bg-white relative">
        {/* Simple Minimal Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <button 
            onClick={() => setView('confirmation')}
            className="p-2 -ml-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">客流信息详情</h1>
          <div className="flex items-center">
            <WeChatCapsule />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 px-6 py-6 space-y-8 overflow-y-auto pb-32">
          {/* Is Valid Status Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-purple-600 font-semibold mb-2">
              <Users size={18} />
              <span>是否有效卡片</span>
            </div>
            <div className="flex gap-3">
              <div className={`flex-1 py-3 px-4 rounded-2xl font-medium flex items-center justify-center gap-2 border-2 ${
                selectedCustomer.isInvalid !== true
                ? 'bg-purple-50 text-purple-600 border-purple-200 shadow-sm' 
                : 'bg-white text-slate-300 border-slate-50 opacity-50'
              }`}>
                {selectedCustomer.isInvalid !== true && <CheckCircle2 size={16} />}
                是
              </div>
              <div className={`flex-1 py-3 px-4 rounded-2xl font-medium flex items-center justify-center gap-2 border-2 ${
                selectedCustomer.isInvalid === true
                ? 'bg-rose-50 text-rose-600 border-rose-200 shadow-sm' 
                : 'bg-white text-slate-300 border-slate-50 opacity-50'
              }`}>
                {selectedCustomer.isInvalid === true && <CheckCircle2 size={16} />}
                否
              </div>
            </div>
            {selectedCustomer.isInvalid === true && (
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex items-start gap-3 mt-2">
                <AlertCircle size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-amber-700 leading-relaxed font-medium">
                  该卡片为无效卡片
                </p>
              </div>
            )}
          </section>

          {selectedCustomer.isInvalid !== true && (
            <>
              {/* Basic Info Section */}
              <section className="space-y-6">
                <div className="flex items-center gap-2 text-purple-600 font-semibold mb-2">
                  <Layers size={18} />
                  <span>基础信息</span>
                </div>
                
                <div className="space-y-4">
                  {/* Name Display */}
                  <div className="relative group">
                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1 block ml-1">客户姓名</label>
                    <div className="flex items-center bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3">
                      <User size={18} className="text-slate-300 mr-3" />
                      <span className="text-slate-700 font-medium">{selectedCustomer.name}</span>
                    </div>
                  </div>

                  {/* Phone Suffix Display */}
                  <div className="relative group">
                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1 block ml-1">手机尾号</label>
                    <div className="flex items-center bg-slate-50 border border-slate-100 rounded-2xl px-4 py-3">
                      <Phone size={18} className="text-slate-300 mr-3" />
                      <span className="text-slate-700 font-medium">{selectedCustomer.phoneSuffix || '----'}</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Intended Model Section */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-purple-600 font-semibold mb-2">
                  <Car size={18} />
                  <span>意向车型</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {currentModels.map((model) => (
                    <div
                      key={model}
                      className={`py-3 px-4 rounded-2xl font-medium flex items-center justify-center gap-2 border-2 ${
                        selectedCustomer.model === model 
                        ? 'bg-purple-50 text-purple-600 border-purple-200 shadow-sm' 
                        : 'bg-white text-slate-300 border-slate-50 opacity-50'
                      }`}
                    >
                      {selectedCustomer.model === model && <CheckCircle2 size={16} />}
                      <span className="truncate">{model}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Visit Type Section */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-purple-600 font-semibold mb-2">
                  <Users size={18} />
                  <span>客户类型</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {VISIT_TYPES.map((type) => (
                    <div
                      key={type}
                      className={`py-3 px-2 rounded-2xl text-sm font-medium flex items-center justify-center gap-1 border-2 ${
                        selectedCustomer.visitType === type 
                        ? 'bg-purple-50 text-purple-600 border-purple-200 shadow-sm' 
                        : 'bg-white text-slate-300 border-slate-50 opacity-50'
                      }`}
                    >
                      {selectedCustomer.visitType === type && <CheckCircle2 size={14} />}
                      {type}
                    </div>
                  ))}
                </div>
              </section>

              {/* Stages Section */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-purple-600 font-semibold mb-2">
                  <Layers size={18} />
                  <span>跟进环节</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {STAGES.map((stage) => {
                    const isSelected = selectedCustomer.selectedStages?.includes(stage);
                    return (
                      <div
                        key={stage}
                        className={`py-2.5 px-4 rounded-full text-sm font-medium border ${
                          isSelected 
                          ? 'bg-purple-50 text-purple-700 border-purple-200' 
                          : 'bg-slate-50 text-slate-300 border-slate-100 opacity-50'
                        }`}
                      >
                        {stage}
                      </div>
                    );
                  })}
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    );
  };

  const renderDailyReportView = () => {
    return (
      <DailyCustomerReportView 
        onNavigateToCustomer={() => setView('list')} 
        role={userRole}
        onRoleChange={handleRoleChange}
      />
    );
  };

  const renderDataCollectionView = () => {
    return (
      <DataInsightView 
        onNavigateToCustomer={() => setView('list')} 
        role={userRole}
        onRoleChange={handleRoleChange}
      />
    );
  };

  const renderProfileView = () => {
    return (
      <div className="flex-1 flex flex-col min-h-0 bg-slate-50 relative overflow-y-auto pb-24">
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-3.5 py-2.5 flex items-center justify-between border-b border-slate-100 shadow-2xs">
          <div className="w-[140px] flex-none"></div>
          <h1 className="text-base font-bold text-slate-800 text-center flex-1">我的</h1>
          <div className="w-[140px] flex-none flex justify-end">
            <RoleSwitcher currentRole={userRole} onRoleChange={handleRoleChange} />
          </div>
        </header>

        <div className="p-4 space-y-4">
          {/* User Profile Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xl font-black shadow-md shadow-blue-100">
              {userRole === 'store_manager' ? '店长' : '浩峰'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-slate-900">
                  {userRole === 'store_manager' ? '张逸凡' : '徐浩峰'}
                </h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">极氪空间 · 杭州万象城店</p>
            </div>
          </div>

          {/* Logout Action Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowLogoutConfirm(true)}
              className="w-full py-3.5 bg-white hover:bg-rose-50 text-rose-600 rounded-2xl font-bold text-sm border border-rose-200 shadow-xs flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
            >
              <LogOut size={16} className="text-rose-500" />
              <span>退出登录</span>
            </button>
          </div>
        </div>

        {/* Logout Confirmation Modal */}
        <AnimatePresence>
          {showLogoutConfirm && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowLogoutConfirm(false)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 16 }}
                className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl z-10 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4">
                  <LogOut size={28} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1.5">确认退出登录？</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-6">
                  退出登录后将返回登录界面，您可随时重新登录系统。
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowLogoutConfirm(false)}
                    className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors"
                  >
                    取消
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowLogoutConfirm(false);
                      setIsLoggedIn(false);
                    }}
                    className="flex-1 py-3 bg-rose-600 text-white rounded-xl font-bold text-sm shadow-md shadow-rose-200 hover:bg-rose-700 transition-colors"
                  >
                    确认退出
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderCheckInView = () => {
    const handleCheckInAction = (status: 'on-duty' | 'off-duty') => {
      setPendingCheckInStatus(status);
    };

    const confirmCheckIn = () => {
      if (!pendingCheckInStatus) return;
      
      const now = new Date();
      const timeStr = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const dateStr = getTodayDateStr();
      
      setCheckInHistory([{ 
        time: timeStr, 
        date: dateStr, 
        status: pendingCheckInStatus, 
        method: 'manual' 
      }, ...checkInHistory]);
      
      setPendingCheckInStatus(null);
    };

    const isActionTaken = !!todayRecord;
    const currentStatus = isActionTaken ? todayRecord.status : null;
    const currentMethod = isActionTaken ? todayRecord.method : 'auto';

    return (
      <div className="flex-1 flex flex-col min-h-0 bg-slate-50 relative overflow-y-auto pb-24">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-4 py-4 flex justify-between items-center border-b border-slate-100">
          <div className="w-10"></div>
          <h1 className="text-lg font-bold text-slate-800">在岗签到</h1>
          <WeChatCapsule />
        </header>

        <div className="p-6 flex flex-col items-center justify-center space-y-8 mt-4">
          {/* Status Card */}
          <div className="w-full bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col items-center text-center relative overflow-hidden">
            {!isActionTaken ? (
              <>
                <div className="absolute top-0 right-0 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-bl-xl bg-purple-50 text-purple-400">
                  待确认
                </div>
                <div className="w-20 h-20 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 mb-4">
                  <MousePointerClick size={40} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">请确认今日状态</h2>
                <p className="text-slate-400 text-sm leading-relaxed max-w-[240px]">
                  请点击下方按钮确认您今日是在岗还是休息。
                </p>
                <div className="mt-6 px-4 py-2 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-2">
                  <Info size={14} className="text-rose-500 shrink-0" />
                  <p className="text-[11px] text-rose-600 font-bold text-left leading-tight">
                    今日23:59后若未确认，系统将自动设为“在岗”
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className={`absolute top-0 right-0 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-bl-xl ${currentMethod === 'manual' ? 'bg-purple-100 text-purple-600' : 'bg-slate-100 text-slate-400'}`}>
                  {currentMethod === 'manual' ? '手动记录' : '系统默认'}
                </div>
                
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${currentStatus === 'on-duty' ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-50 text-slate-400'}`}>
                  {currentStatus === 'on-duty' ? <ShieldCheck size={40} /> : <Coffee size={40} />}
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  {currentStatus === 'on-duty' ? '您今天是在岗状态' : '您今天在休息'}
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed max-w-[240px]">
                  {currentStatus === 'on-duty' 
                    ? '系统正在统计您的在岗数据，请保持在岗状态以确保数据准确。' 
                    : '您已标记为休息，今日将不计入在岗统计。'}
                </p>
              </>
            )}
          </div>

          {/* Action Buttons */}
          {!isActionTaken && (
            <div className="w-full mb-6 flex flex-col items-center gap-2">
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2 px-5 py-2 bg-purple-50 rounded-full border border-purple-100 shadow-sm">
                  <MousePointerClick size={14} className="text-purple-500" />
                  <span className="text-[12px] font-bold text-purple-600 tracking-wide">
                    请点击下方按钮确认今日状态
                  </span>
                </div>
              </div>
              <motion.div 
                animate={{ y: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-purple-300"
              >
                <ChevronDown size={16} />
              </motion.div>
            </div>
          )}
          <div className="w-full grid grid-cols-2 gap-4">
            <motion.button
              whileTap={!isActionTaken ? { scale: 0.95 } : {}}
              onClick={() => handleCheckInAction('on-duty')}
              disabled={isActionTaken}
              className={`flex flex-col items-center justify-center p-6 rounded-3xl shadow-lg transition-all border-2 ${
                isActionTaken && todayRecord?.status === 'on-duty'
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow-emerald-100'
                  : isActionTaken
                  ? 'bg-slate-50 text-slate-300 border-slate-100 shadow-none'
                  : 'bg-white text-slate-600 border-slate-100 hover:border-emerald-200'
              }`}
            >
              <LogIn size={32} className="mb-2" />
              <span className="text-lg font-bold">在岗</span>
              {isActionTaken && todayRecord?.status === 'on-duty' && (
                <span className="text-[10px] mt-1 opacity-80 font-mono">{todayRecord.time}</span>
              )}
            </motion.button>

            <motion.button
              whileTap={!isActionTaken ? { scale: 0.95 } : {}}
              onClick={() => handleCheckInAction('off-duty')}
              disabled={isActionTaken}
              className={`flex flex-col items-center justify-center p-6 rounded-3xl shadow-lg transition-all border-2 ${
                isActionTaken && todayRecord?.status === 'off-duty'
                  ? 'bg-slate-400 text-white border-slate-400 shadow-slate-100'
                  : isActionTaken
                  ? 'bg-slate-50 text-slate-300 border-slate-100 shadow-none'
                  : 'bg-white text-slate-600 border-slate-100 hover:border-slate-200'
              }`}
            >
              <LogOut size={32} className="mb-2" />
              <span className="text-lg font-bold">休息</span>
              {isActionTaken && todayRecord?.status === 'off-duty' && (
                <span className="text-[10px] mt-1 opacity-80 font-mono">{todayRecord.time}</span>
              )}
            </motion.button>
          </div>

          {/* History Section */}
          <div className="w-full space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-purple-600 rounded-full"></div>
                <h2 className="text-sm font-bold text-slate-800">今日状态详情</h2>
              </div>
              <button 
                onClick={() => setView('checkInHistory')}
                className="text-xs font-bold text-purple-600 flex items-center gap-1 hover:opacity-70 transition-all"
              >
                <History size={14} />
                <span>签到历史</span>
              </button>
            </div>
            
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${!isActionTaken ? 'bg-purple-50 text-purple-600' : currentStatus === 'on-duty' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                    {!isActionTaken ? <MousePointerClick size={20} /> : currentStatus === 'on-duty' ? <UserCheck size={20} /> : <Coffee size={20} />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {!isActionTaken ? '待确认状态' : currentStatus === 'on-duty' ? '在岗状态' : '休息状态'}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      {isActionTaken ? `操作时间: ${todayRecord.time}` : '请点击上方按钮确认状态'}
                    </p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded text-[10px] font-bold ${currentMethod === 'manual' ? 'bg-purple-50 text-purple-600' : 'bg-slate-50 text-slate-400'}`}>
                  {currentMethod === 'manual' ? '手动' : '默认'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        <AnimatePresence>
          {pendingCheckInStatus && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setPendingCheckInStatus(null)}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-sm bg-white rounded-[32px] shadow-2xl overflow-hidden"
              >
                <div className="p-8 flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
                    pendingCheckInStatus === 'on-duty' ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-50 text-slate-500'
                  }`}>
                    {pendingCheckInStatus === 'on-duty' ? <LogIn size={32} /> : <LogOut size={32} />}
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-2">确认标记为{pendingCheckInStatus === 'on-duty' ? '在岗' : '休息'}吗？</h3>
                  <p className="text-sm text-rose-400 font-bold mb-8">
                    状态确认后今日将不可更改，请谨慎选择
                  </p>
                  
                  <div className="w-full grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setPendingCheckInStatus(null)}
                      className="py-4 rounded-2xl bg-slate-50 text-slate-500 font-bold text-sm hover:bg-slate-100 transition-all"
                    >
                      取消
                    </button>
                    <button
                      onClick={confirmCheckIn}
                      className={`py-4 rounded-2xl font-bold text-sm text-white shadow-lg transition-all ${
                        pendingCheckInStatus === 'on-duty' 
                          ? 'bg-emerald-500 shadow-emerald-100 hover:bg-emerald-600' 
                          : 'bg-slate-800 shadow-slate-100 hover:bg-slate-900'
                      }`}
                    >
                      确认提交
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderCheckInHistoryView = () => {
    const onDutyCount = checkInHistory.filter(item => item.status === 'on-duty').length;
    const offDutyCount = checkInHistory.filter(item => item.status === 'off-duty').length;
    const totalCount = checkInHistory.length;

    return (
      <div className="flex-1 flex flex-col min-h-0 bg-slate-50 relative overflow-y-auto pb-24">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-4 py-4 flex justify-between items-center border-b border-slate-100">
          <button 
            onClick={() => setView('checkIn')}
            className="p-2 -ml-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-slate-800">签到历史</h1>
          <WeChatCapsule />
        </header>

        <div className="p-4 space-y-4">
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">在岗天数</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black text-emerald-500">{onDutyCount}</span>
                  <span className="text-[10px] text-slate-400 font-bold">天</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">休息天数</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black text-slate-400">{offDutyCount}</span>
                  <span className="text-[10px] text-slate-400 font-bold">天</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {checkInHistory.length > 0 ? (
              checkInHistory.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-4 border border-slate-50 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.status === 'on-duty' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                      {item.status === 'on-duty' ? <UserCheck size={20} /> : <Coffee size={20} />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">
                        {item.status === 'on-duty' ? '在岗签到' : '休息记录'}
                      </p>
                      <p className="text-[10px] text-slate-400">{item.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold font-mono text-purple-600">{item.time}</p>
                    <p className={`text-[10px] font-medium ${item.method === 'manual' ? 'text-purple-500' : 'text-slate-400'}`}>
                      {item.method === 'manual' ? '手动操作' : '系统默认'}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white/50 rounded-2xl p-12 border border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300">
                <History size={48} className="mb-4 opacity-20" />
                <p className="text-xs font-medium">暂无历史签到记录</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderReceptionView = () => {
    return (
      <div className="flex-1 flex flex-col min-h-0 bg-slate-50 relative overflow-y-auto">
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-3.5 py-2.5 flex items-center justify-between border-b border-slate-100 shadow-2xs">
          <div className="w-[140px] flex-none"></div>
          <h1 className="text-base font-bold text-slate-800 text-center flex-1">客户接待</h1>
          <div className="w-[140px] flex-none flex justify-end">
            <RoleSwitcher currentRole={userRole} onRoleChange={handleRoleChange} />
          </div>
        </header>

        <main className="flex-1 p-6 flex flex-col justify-start pt-10 gap-8">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                const now = new Date();
                setActiveReception({
                  startTime: now.toTimeString().split(' ')[0],
                  date: now.toISOString().split('T')[0]
                });
                setView('receptionInProgress');
              }}
              className="aspect-square bg-gradient-to-br from-purple-500 to-indigo-600 rounded-[32px] shadow-xl shadow-purple-100 flex flex-col items-center justify-center text-white group active:scale-95 transition-all p-4"
            >
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Play size={24} fill="currentColor" />
              </div>
              <span className="text-lg font-black tracking-tight">开始接待</span>
              <p className="text-purple-100 mt-2 text-[10px] text-center opacity-80 leading-tight">点击记录接待时长</p>
            </button>

            <button
              onClick={() => setView('receptionManual')}
              className="aspect-square bg-white border-2 border-slate-100 rounded-[32px] shadow-sm flex flex-col items-center justify-center text-slate-600 group active:scale-95 transition-all p-4"
            >
              <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center mb-4 text-purple-500 group-hover:scale-110 transition-transform">
                <UserPlus size={24} />
              </div>
              <span className="text-lg font-black tracking-tight">补录客户</span>
              <p className="text-slate-400 mt-2 text-[10px] text-center font-medium leading-tight">手动记录接待情况</p>
            </button>
          </div>

          <button 
            onClick={() => setView('receptionHistory')}
            className="w-full py-4 bg-white border border-slate-100 rounded-[24px] flex items-center justify-center gap-2 text-slate-500 font-bold text-sm active:bg-slate-50 transition-all"
          >
            <History size={18} className="text-purple-500" />
            查看全量接待历史
          </button>

          <div className="bg-purple-50/50 rounded-3xl p-6 border border-purple-100/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <ShieldCheck size={16} />
              </div>
              <h3 className="font-bold text-slate-800">接待辅助说明</h3>
            </div>
            <ul className="space-y-2 text-xs text-slate-500 font-medium">
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-purple-400 mt-1.5 shrink-0"></div>
                <span>自动接待可精准记录客户接待时间。</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1 h-1 rounded-full bg-purple-400 mt-1.5 shrink-0"></div>
                <span>补录记录可用于完善当日完整的客流统计。</span>
              </li>
            </ul>
          </div>
        </main>
      </div>
    );
  };

  const renderReceptionInProgressView = () => {
    if (!activeReception) return null;
    return (
      <div className="flex-1 flex flex-col bg-slate-900 text-white relative h-full">
        <header className="sticky top-0 z-30 bg-white px-6 py-4 flex justify-between items-center border-b border-slate-100 h-[64px]">
          <div className="flex items-center gap-4">
            <button onClick={() => setView('reception')} className="text-slate-800">
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-lg font-bold text-slate-800 tracking-tight">正在接待中</h1>
          </div>
          <WeChatCapsule />
        </header>

        <main className="flex-1 flex flex-col items-center justify-center px-8 text-center pt-8">
          <div className="flex flex-col items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
              <Users size={24} className="text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">正在实时记录您的接待时长</p>
            </div>
          </div>

          <div className="relative mb-12">
            <div className="absolute inset-0 bg-purple-500 blur-[80px] opacity-20 rounded-full animate-pulse"></div>
            <div className="relative w-48 h-48 rounded-full border-4 border-purple-500/20 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full border-4 border-purple-500 flex flex-col items-center justify-center bg-slate-800 shadow-2xl shadow-purple-500/20">
                <Clock size={32} className="text-purple-400 mb-2" />
                <span className="text-3xl font-black font-mono tracking-wider tabular-nums">00:15:24</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 mb-16">
            <p className="text-slate-400 text-sm font-medium uppercase tracking-[0.2em]">开始时间</p>
            <p className="text-2xl font-bold tracking-tight">{activeReception.startTime}</p>
          </div>

          <div className="w-full flex flex-col gap-4">
            <div className="bg-slate-800/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                <Activity size={24} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">实时接待</p>
                <div className="flex items-end gap-1 h-6">
                  {[...Array(12)].map((_, i) => (
                    <motion.div 
                      key={i}
                      animate={{ height: [8, 16, 12, 24, 10, 20, 14][i % 7] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                      className="w-1 bg-indigo-400 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowInvalidCustomerConfirm(true)}
                className="flex-1 py-5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-3xl font-bold flex items-center justify-center gap-2 border border-white/10 active:scale-95 transition-all"
              >
                <UserX size={20} />
                无效客户
              </button>
              <button
                onClick={() => setShowEndReceptionConfirm(true)}
                className="flex-[2] py-5 bg-rose-500 hover:bg-rose-600 text-white rounded-3xl font-black text-xl shadow-xl shadow-rose-900/20 active:scale-95 transition-all"
              >
                结束接待
              </button>
            </div>
          </div>
        </main>

        <AnimatePresence>
          {showInvalidCustomerConfirm && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowInvalidCustomerConfirm(false)}
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-sm bg-white rounded-[40px] shadow-2xl overflow-hidden"
              >
                <div className="p-8 flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-6 text-slate-400">
                    <UserX size={40} />
                  </div>
                  
                  <h3 className="text-2xl font-black text-slate-800 mb-2">标记为无效客户？</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8">
                    如本次接待客户为非看车客户（如送快递、路过等），点击确认将直接结束并不计入历史。
                  </p>
                  
                  <div className="w-full flex gap-3">
                    <button
                      onClick={() => setShowInvalidCustomerConfirm(false)}
                      className="flex-1 py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold active:bg-slate-100"
                    >
                      取消
                    </button>
                    <button
                      onClick={() => {
                        setActiveReception(null);
                        setShowInvalidCustomerConfirm(false);
                        setView('reception');
                      }}
                      className="flex-1 py-4 bg-slate-800 text-white rounded-2xl font-bold shadow-lg shadow-slate-200 active:bg-slate-900"
                    >
                      确认
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showEndReceptionConfirm && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowEndReceptionConfirm(false)}
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-sm bg-white rounded-[40px] shadow-2xl overflow-hidden"
              >
                <div className="p-8 flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center mb-6 text-rose-500">
                    <AlertCircle size={40} />
                  </div>
                  
                  <h3 className="text-2xl font-black text-slate-800 mb-2">确认结束接待吗？</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8">
                    结束后将自动生成接待报告，并同步至接待历史。
                  </p>
                  
                  <div className="w-full flex gap-3">
                    <button
                      onClick={() => setShowEndReceptionConfirm(false)}
                      className="flex-1 py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold active:bg-slate-100"
                    >
                      取消
                    </button>
                    <button
                      onClick={() => {
                        const now = new Date();
                        const endTime = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
                        
                        // Calculate duration
                        const startTimeArr = activeReception.startTime.split(':');
                        const start = new Date();
                        start.setHours(parseInt(startTimeArr[0]), parseInt(startTimeArr[1]), parseInt(startTimeArr[2]));
                        const totalSeconds = Math.max(1, Math.floor((now.getTime() - start.getTime()) / 1000));

                        setLastReceptionSummary({
                          startTime: activeReception.startTime,
                          endTime: endTime,
                          duration: totalSeconds.toString(),
                          date: activeReception.date,
                          carSelections: [],
                          dealStatus: '是',
                          customerName: ''
                        });
                        
                        setShowEndReceptionConfirm(false);
                        setView('receptionSummary');
                      }}
                      className="flex-1 py-4 bg-purple-600 text-white rounded-2xl font-bold shadow-lg shadow-purple-200 active:bg-purple-700"
                    >
                      确认结束
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderReceptionManualView = () => {
    return (
      <div className="flex-1 flex flex-col min-h-0 bg-slate-50 relative overflow-y-auto">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-slate-100">
          <button 
            onClick={() => setView('reception')}
            className="p-2 -ml-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">补录客户接待</h1>
          <WeChatCapsule />
        </header>

        <main className="flex-1 p-6 space-y-8 pb-32">
          {/* Time Selection */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-purple-600 font-semibold mb-2">
              <Calendar size={18} />
              <span>接待基础信息</span>
            </div>
            
            <div className="space-y-4">
              <div className="relative group">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1 block ml-1">接待日期</label>
                <div className="flex items-center bg-white border border-slate-200 rounded-2xl px-4 py-3 focus-within:border-purple-500 transition-all shadow-sm">
                  <Calendar size={18} className="text-slate-400 mr-3" />
                  <input 
                    type="date" 
                    value={manualReceptionData.date}
                    onChange={(e) => setManualReceptionData({...manualReceptionData, date: e.target.value})}
                    className="bg-transparent border-none outline-none w-full text-slate-700 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative group">
                  <label className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1 block ml-1">开始时间</label>
                  <div className="flex items-center bg-white border border-slate-200 rounded-2xl px-4 py-3 focus-within:border-purple-500 transition-all shadow-sm">
                    <Clock size={18} className="text-slate-400 mr-3" />
                    <input 
                      type="time" 
                      value={manualReceptionData.startTime}
                      onChange={(e) => setManualReceptionData({...manualReceptionData, startTime: e.target.value})}
                      className="bg-transparent border-none outline-none w-full text-slate-700 font-medium"
                    />
                  </div>
                </div>
                <div className="relative group">
                  <label className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1 block ml-1">结束时间</label>
                  <div className="flex items-center bg-white border border-slate-200 rounded-2xl px-4 py-3 focus-within:border-purple-500 transition-all shadow-sm">
                    <Clock size={18} className="text-slate-400 mr-3" />
                    <input 
                      type="time" 
                      value={manualReceptionData.endTime}
                      onChange={(e) => setManualReceptionData({...manualReceptionData, endTime: e.target.value})}
                      className="bg-transparent border-none outline-none w-full text-slate-700 font-medium"
                    />
                  </div>
                </div>
              </div>

              {receptionBrand !== 'suzhou_runyi' && (
                <div className="relative group">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block ml-1">客户类型</label>
                  <div className="grid grid-cols-2 gap-4">
                    {(['首次进店', '再次进店'] as const).map((type) => {
                      const isSelected = manualReceptionData.customerType === type;
                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setManualReceptionData({ ...manualReceptionData, customerType: type })}
                          className={`py-3.5 px-4 rounded-2xl text-xs font-black border-2 transition-all flex items-center justify-center ${
                            isSelected
                              ? 'bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-100'
                              : 'bg-white text-slate-500 border-slate-200 active:bg-slate-50'
                          }`}
                        >
                          {type}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* 是否成交模块 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-purple-600 font-semibold">
              <CheckCircle2 size={18} />
              <span>是否成交</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {(['是', '否'] as const).map((val) => {
                const isSelected = manualReceptionData.dealStatus === val;
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setManualReceptionData({ ...manualReceptionData, dealStatus: val })}
                    className={`py-3.5 px-4 rounded-2xl text-xs font-black border-2 transition-all flex items-center justify-center gap-2 ${
                      isSelected
                        ? 'bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-100'
                        : 'bg-white text-slate-500 border-slate-200 active:bg-slate-50'
                    }`}
                  >
                    {isSelected && <CheckCircle2 size={14} className="text-white" />}
                    {val}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Customer Name Section (Suzhou Runyi) */}
          {receptionBrand === 'suzhou_runyi' && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-purple-600 font-semibold">
                  <User size={18} />
                  <span>客户姓名</span>
                </div>
                <span className="text-[10px] font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">非必填</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={manualReceptionData.customerName || ''}
                  onChange={(e) => setManualReceptionData({ ...manualReceptionData, customerName: e.target.value })}
                  placeholder="请输入客户姓名（非必填）"
                  maxLength={20}
                  className="w-full bg-white border-2 border-slate-100 focus:border-purple-600 focus:outline-none rounded-2xl py-3 px-4 text-xs font-medium text-slate-800 placeholder:text-slate-300 transition-all shadow-sm"
                />
                {manualReceptionData.customerName && (
                  <button
                    type="button"
                    onClick={() => setManualReceptionData({ ...manualReceptionData, customerName: '' })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 p-1"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </section>
          )}

          {/* Model and Scene Selection */}
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 text-purple-600 font-semibold">
                <Car size={18} />
                <span>车型及对应场景</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              {MODELS.map((model) => {
                const isSelected = manualReceptionData.carSelections.some(s => s.model === model);
                return (
                  <button
                    key={model}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        setManualReceptionData({
                          ...manualReceptionData,
                          carSelections: []
                        });
                      } else {
                        const currentScene = manualReceptionData.carSelections[0]?.scene || '展厅';
                        setManualReceptionData({
                          ...manualReceptionData,
                          carSelections: [{ model, scene: currentScene }]
                        });
                      }
                    }}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border-2 flex items-center justify-between ${
                      isSelected
                        ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-100'
                        : 'bg-white text-slate-600 border-slate-100 hover:bg-slate-50 hover:border-slate-200'
                    }`}
                  >
                    <span>{model}</span>
                    {isSelected && <CheckCircle2 size={15} className="text-white" />}
                  </button>
                );
              })}
            </div>

            <div className="space-y-3">
              {manualReceptionData.carSelections.map((selection, idx) => (
                <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm animate-in fade-in slide-in-from-top-2">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800 text-sm">{selection.model}</span>
                      <span className="text-[10px] text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full font-medium">已选车型</span>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setManualReceptionData({
                        ...manualReceptionData,
                        carSelections: []
                      })}
                      className="text-slate-300 hover:text-rose-500"
                    >
                      <XCircle size={18} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div className="text-[11px] text-slate-500 font-medium">接待场景（可多选）</div>
                    <div className="grid grid-cols-2 gap-2">
                      {['展厅', '试驾'].map((sceneOption) => {
                        const isSceneActive = selection.scene.includes(sceneOption);
                        return (
                          <button
                            key={sceneOption}
                            type="button"
                            onClick={() => {
                              const hasZhanting = selection.scene.includes('展厅');
                              const hasShijia = selection.scene.includes('试驾');
                              let nextScene = selection.scene;
                              if (sceneOption === '展厅') {
                                if (hasZhanting) {
                                  if (hasShijia) nextScene = '试驾';
                                } else {
                                  nextScene = hasShijia ? '展厅、试驾' : '展厅';
                                }
                              } else {
                                if (hasShijia) {
                                  if (hasZhanting) nextScene = '展厅';
                                } else {
                                  nextScene = hasZhanting ? '展厅、试驾' : '试驾';
                                }
                              }
                              const newSelections = [...manualReceptionData.carSelections];
                              newSelections[idx].scene = nextScene;
                              setManualReceptionData({...manualReceptionData, carSelections: newSelections});
                            }}
                            className={`py-2.5 px-3 rounded-xl text-xs font-bold border-2 transition-all flex items-center justify-center gap-1.5 ${
                              isSceneActive
                                ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-100'
                                : 'bg-slate-50 text-slate-400 border-slate-100 hover:bg-slate-100'
                            }`}
                          >
                            {isSceneActive ? <Check size={14} /> : <span className="w-3.5 h-3.5 rounded-full border border-slate-300 inline-block" />}
                            <span>{sceneOption}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
              {manualReceptionData.carSelections.length === 0 && (
                <div className="py-8 text-center border-2 border-dashed border-slate-200 rounded-3xl">
                  <p className="text-slate-400 text-sm">请从上方选择车型</p>
                </div>
              )}
            </div>
          </section>

          <div className="pt-4">
            <button
              disabled={manualReceptionData.carSelections.length === 0}
              onClick={() => setShowSaveConfirm(true)}
              className="w-full py-4 bg-purple-600 text-white rounded-3xl font-black text-lg shadow-xl shadow-purple-200 active:bg-purple-700 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              保存补录记录
            </button>
          </div>
        </main>

        <AnimatePresence>
          {showSaveConfirm && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSaveConfirm(false)}
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-sm bg-white rounded-[40px] shadow-2xl overflow-hidden"
              >
                <div className="p-8 flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-purple-50 flex items-center justify-center mb-6 text-purple-600">
                    <CheckCircle2 size={40} />
                  </div>
                  
                  <h3 className="text-2xl font-black text-slate-800 mb-2">确认提交补录？</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8">
                    保存后记录将进入历史列表，您可以随时查看接待详情。
                  </p>
                  
                  <div className="w-full flex gap-3">
                    <button
                      onClick={() => setShowSaveConfirm(false)}
                      className="flex-1 py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold active:bg-slate-100"
                    >
                      取消
                    </button>
                    <button
                      onClick={() => {
                        const newRecord: ReceptionRecord = {
                          id: Math.random().toString(36).substr(2, 9),
                          startTime: manualReceptionData.startTime + ':00',
                          endTime: manualReceptionData.endTime + ':00',
                          date: manualReceptionData.date,
                          type: 'manual',
                          businessType: receptionBrand === 'suzhou_runyi' ? 'suzhou_runyi' : 'car',
                          carSelections: manualReceptionData.carSelections,
                          customerType: receptionBrand === 'suzhou_runyi' ? undefined : manualReceptionData.customerType,
                          dealStatus: manualReceptionData.dealStatus,
                          customerName: receptionBrand === 'suzhou_runyi' && manualReceptionData.customerName?.trim() ? manualReceptionData.customerName.trim() : undefined,
                          processName: receptionBrand === 'suzhou_runyi' ? '润益延保销售流程' : undefined,
                          store: receptionBrand === 'suzhou_runyi' ? manualReceptionData.carSelections[0]?.model : undefined
                        };
                        setReceptionHistory([newRecord, ...receptionHistory]);
                        setHistoryBusinessType(receptionBrand === 'suzhou_runyi' ? 'suzhou_runyi' : 'car');
                        setShowSaveConfirm(false);
                        setView('receptionHistory');
                      }}
                      className="flex-1 py-4 bg-purple-600 text-white rounded-2xl font-bold shadow-lg shadow-purple-200 active:bg-purple-700"
                    >
                      确认保存
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderReceptionHistoryView = () => {
    const filteredHistory = receptionHistory.filter(record => {
      const matchesDate = record.date >= historyDateRange.start && record.date <= historyDateRange.end;
      if (!matchesDate) return false;
      if (historyBusinessType === 'suzhou_runyi') {
        return record.businessType === 'suzhou_runyi';
      } else {
        return record.businessType !== 'suzhou_runyi';
      }
    });

    return (
      <div className="flex-1 flex flex-col min-h-0 bg-slate-50 relative overflow-y-auto pb-10">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-4 py-4 flex justify-between items-center border-b border-slate-100">
          <button 
            onClick={() => setView('reception')}
            className="p-2 -ml-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-slate-800">接待历史</h1>
          <WeChatCapsule />
        </header>

        <div className="p-4 space-y-3">
          {/* 行业Demo演示切换开关 */}
          <div className="bg-white rounded-2xl p-1.5 shadow-sm border border-slate-100 flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setHistoryBusinessType('car')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                historyBusinessType === 'car'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-200'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Car size={15} />
              <span>汽车业务</span>
            </button>
            <button
              type="button"
              onClick={() => setHistoryBusinessType('suzhou_runyi')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                historyBusinessType === 'suzhou_runyi'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-200'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Store size={15} />
              <span>苏州润益业务</span>
            </button>
          </div>

          {/* Compact Date Range Pill */}
          <div className="bg-white rounded-[20px] px-5 py-3 shadow-sm border border-slate-100/60 flex items-center justify-between mb-1">
            <div className="flex items-center gap-3 overflow-hidden">
              <Calendar size={18} className="text-purple-600 flex-shrink-0" />
              <div className="flex items-center gap-2 text-slate-700">
                <div className="relative">
                  <span className="text-sm font-black whitespace-nowrap">{historyDateRange.start}</span>
                  <input 
                    type="date" 
                    value={historyDateRange.start}
                    onChange={(e) => setHistoryDateRange(prev => ({ ...prev, start: e.target.value }))}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                <span className="text-xs text-slate-300 font-bold">至</span>
                <div className="relative">
                  <span className="text-sm font-black whitespace-nowrap">{historyDateRange.end}</span>
                  <input 
                    type="date" 
                    value={historyDateRange.end}
                    onChange={(e) => setHistoryDateRange(prev => ({ ...prev, end: e.target.value }))}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <ChevronDown size={16} className="text-slate-300" />
          </div>

          <div className="space-y-3">
            {filteredHistory.length > 0 ? (
              filteredHistory.map((record) => (
              <div key={record.id} className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    record.type === 'auto' ? 'bg-indigo-50 text-indigo-500' : 'bg-emerald-50 text-emerald-500'
                  }`}>
                    {record.type === 'auto' ? <MousePointerClick size={20} /> : <UserPlus size={20} />}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-slate-800 truncate">
                        {record.type === 'auto' ? '现场接待' : '补录接待'}
                      </span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold whitespace-nowrap ${
                        record.type === 'auto' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'
                      }`}>
                        {record.type === 'auto' ? '实时' : '补录'}
                      </span>
                      {historyBusinessType === 'suzhou_runyi' ? (
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold whitespace-nowrap flex items-center gap-0.5 ${
                          record.dealStatus === '是'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200/40'
                            : 'bg-rose-50 text-rose-600 border border-rose-200/40'
                        }`}>
                          {record.dealStatus === '是' ? '已成交' : '未成交'}
                        </span>
                      ) : (
                        record.customerType && (
                          <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold whitespace-nowrap ${
                            record.customerType === '首次进店' ? 'bg-amber-50 text-amber-600 border border-amber-200/30' : 'bg-blue-50 text-blue-600 border border-blue-200/30'
                          }`}>
                            {record.customerType}
                          </span>
                        )
                      )}
                    </div>
                    
                    {historyBusinessType === 'suzhou_runyi' ? (
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        {record.customerName && (
                          <div className="bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-md flex items-center gap-1 border border-amber-200/50">
                            <User size={10} className="text-amber-500" />
                            <span className="text-[9px] font-bold whitespace-nowrap">
                              {record.customerName}
                            </span>
                          </div>
                        )}
                        <div className="bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded-md flex items-center gap-1 border border-purple-100/60">
                          <span className="text-[9px] font-bold whitespace-nowrap">
                            {record.processName || '润益延保销售流程'}
                          </span>
                        </div>
                        {(record.store || (record.carSelections && record.carSelections[0]?.model)) && (
                          <div className="bg-slate-50 text-slate-600 px-1.5 py-0.5 rounded-md flex items-center gap-1 border border-slate-100">
                            <span className="text-[9px] font-medium whitespace-nowrap">
                              {record.store || record.carSelections![0].model}
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      record.carSelections && record.carSelections.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-1">
                          {record.carSelections.map((sel, sIdx) => (
                            <div key={sIdx} className="bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded-md flex items-center gap-1 border border-purple-100/50">
                              <span className="text-[9px] font-black whitespace-nowrap">{sel.model}</span>
                              <span className="text-[8px] opacity-40">|</span>
                              <span className="text-[9px] font-medium whitespace-nowrap">
                                {sel.scene.replace('接待', '').replace('试乘', '')}
                              </span>
                            </div>
                          ))}
                        </div>
                      )
                    )}
                    <p className="text-[10px] text-slate-400 font-medium">{record.date}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 border-l border-slate-50 pl-3">
                  <div className="flex flex-col items-end">
                    <p className="text-[10px] font-black text-slate-800 font-mono flex flex-col items-end mb-1">
                      <span>{record.startTime.substring(0, 5)}</span>
                      <span className="text-purple-600">{record.endTime?.substring(0, 5) || '--:--'}</span>
                    </p>
                    <div className="bg-slate-50 px-1.5 py-0.5 rounded-full flex items-center gap-1 border border-slate-100">
                      <Clock size={8} className="text-slate-400" />
                      <span className="text-[9px] font-black text-slate-500 whitespace-nowrap">
                        {(() => {
                          const [h1, m1, s1] = record.startTime.split(':').map(Number);
                          const [h2, m2, s2] = (record.endTime || record.startTime).split(':').map(Number);
                          const totalSeconds1 = (h1 || 0) * 3600 + (m1 || 0) * 60 + (s1 || 0);
                          const totalSeconds2 = (h2 || 0) * 3600 + (m2 || 0) * 60 + (s2 || 0);
                          const diff = totalSeconds2 - totalSeconds1;
                          
                          if (diff <= 0) return '0s';
                          const h = Math.floor(diff / 3600);
                          const m = Math.floor((diff % 3600) / 60);
                          const s = diff % 60;
                          
                          let display = '';
                          if (h > 0) display += `${h}h `;
                          if (m > 0 || h > 0) display += `${m}m `;
                          display += `${s}s`;
                          return display.trim();
                        })()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-4">
                <Search size={32} />
              </div>
              <p className="text-slate-400 font-bold text-sm">该时段内暂无接待记录</p>
              <p className="text-slate-300 text-xs mt-1">尝试调整日期范围试试看</p>
            </div>
          )}
          </div>
        </div>
      </div>
    );
  };

  const renderReceptionSummaryView = () => {
    if (!lastReceptionSummary) return null;
    
    return (
      <div className="flex-1 flex flex-col min-h-0 bg-slate-50 relative overflow-y-auto">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-slate-100">
          <button 
            onClick={() => setView('reception')}
            className="p-2 -ml-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">客户信息补充</h1>
          <WeChatCapsule />
        </header>

        <main className="flex-1 p-6 space-y-8 pb-32">
          {/* Read-only System Info */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 text-purple-600 font-semibold mb-2">
              <Clock size={18} />
              <span>系统记录信息</span>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">接待日期</p>
                  <p className="text-sm font-bold text-slate-700">{lastReceptionSummary.date}</p>
                </div>
                <Calendar size={20} className="text-slate-200" />
              </div>

              <div className="flex gap-4">
                <div className="flex-1 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">开始时间</p>
                  <p className="text-sm font-bold text-slate-700 font-mono">{lastReceptionSummary.startTime}</p>
                </div>
                <div className="flex-1 bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">结束时间</p>
                  <p className="text-sm font-bold text-slate-700 font-mono">{lastReceptionSummary.endTime}</p>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-100 rounded-2xl p-4 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-purple-400 font-bold uppercase tracking-wider mb-1">接待时长</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-purple-600">
                      {Math.floor(parseInt(lastReceptionSummary.duration) / 60)}
                    </span>
                    <span className="text-xs text-purple-400 font-medium">分</span>
                    <span className="text-xl font-black text-purple-600 ml-1">
                      {parseInt(lastReceptionSummary.duration) % 60}
                    </span>
                    <span className="text-xs text-purple-400 font-medium">秒</span>
                  </div>
                </div>
                <Activity size={24} className="text-purple-200" />
              </div>
            </div>
          </section>

          {/* 是否成交模块 */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-purple-600 font-semibold">
              <CheckCircle2 size={18} />
              <span>是否成交</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {(['是', '否'] as const).map((val) => {
                const isSelected = lastReceptionSummary.dealStatus === val;
                return (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setLastReceptionSummary({ ...lastReceptionSummary, dealStatus: val })}
                    className={`py-3.5 px-4 rounded-2xl text-xs font-black border-2 transition-all flex items-center justify-center gap-2 ${
                      isSelected
                        ? 'bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-100'
                        : 'bg-white text-slate-500 border-slate-200 active:bg-slate-50'
                    }`}
                  >
                    {isSelected && <CheckCircle2 size={14} className="text-white" />}
                    {val}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Customer Name Section (Suzhou Runyi) */}
          {receptionBrand === 'suzhou_runyi' && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-purple-600 font-semibold">
                  <User size={18} />
                  <span>客户姓名</span>
                </div>
                <span className="text-[10px] font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">非必填</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={lastReceptionSummary.customerName || ''}
                  onChange={(e) => setLastReceptionSummary({ ...lastReceptionSummary, customerName: e.target.value })}
                  placeholder="请输入客户姓名（非必填）"
                  maxLength={20}
                  className="w-full bg-white border-2 border-slate-100 focus:border-purple-600 focus:outline-none rounded-2xl py-3 px-4 text-xs font-medium text-slate-800 placeholder:text-slate-300 transition-all shadow-sm"
                />
                {lastReceptionSummary.customerName && (
                  <button
                    type="button"
                    onClick={() => setLastReceptionSummary({ ...lastReceptionSummary, customerName: '' })}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 p-1"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </section>
          )}

          {/* Model and Scene Selection */}
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 text-purple-600 font-semibold">
                <Car size={18} />
                <span>车型及对应场景</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              {MODELS.map((model) => {
                const isSelected = lastReceptionSummary.carSelections.some(s => s.model === model);
                return (
                  <button
                    key={model}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        setLastReceptionSummary({
                          ...lastReceptionSummary,
                          carSelections: []
                        });
                      } else {
                        const currentScene = lastReceptionSummary.carSelections[0]?.scene || '展厅';
                        setLastReceptionSummary({
                          ...lastReceptionSummary,
                          carSelections: [{ model, scene: currentScene }]
                        });
                      }
                    }}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border-2 flex items-center justify-between ${
                      isSelected
                        ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-100'
                        : 'bg-white text-slate-600 border-slate-100 hover:bg-slate-50 hover:border-slate-200'
                    }`}
                  >
                    <span>{model}</span>
                    {isSelected && <CheckCircle2 size={15} className="text-white" />}
                  </button>
                );
              })}
            </div>

            <div className="space-y-3">
              {lastReceptionSummary.carSelections.map((selection, idx) => (
                <div key={idx} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm animate-in fade-in slide-in-from-top-2">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800 text-sm">{selection.model}</span>
                      <span className="text-[10px] text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full font-medium">已选车型</span>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setLastReceptionSummary({
                        ...lastReceptionSummary,
                        carSelections: []
                      })}
                      className="text-slate-300 hover:text-rose-500"
                    >
                      <XCircle size={18} />
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div className="text-[11px] text-slate-500 font-medium">接待场景（可多选）</div>
                    <div className="grid grid-cols-2 gap-2">
                      {['展厅', '试驾'].map((sceneOption) => {
                        const isSceneActive = selection.scene.includes(sceneOption);
                        return (
                          <button
                            key={sceneOption}
                            type="button"
                            onClick={() => {
                              const hasZhanting = selection.scene.includes('展厅');
                              const hasShijia = selection.scene.includes('试驾');
                              let nextScene = selection.scene;
                              if (sceneOption === '展厅') {
                                if (hasZhanting) {
                                  if (hasShijia) nextScene = '试驾';
                                } else {
                                  nextScene = hasShijia ? '展厅、试驾' : '展厅';
                                }
                              } else {
                                if (hasShijia) {
                                  if (hasZhanting) nextScene = '展厅';
                                } else {
                                  nextScene = hasZhanting ? '展厅、试驾' : '试驾';
                                }
                              }
                              const newSelections = [...lastReceptionSummary.carSelections];
                              newSelections[idx].scene = nextScene;
                              setLastReceptionSummary({...lastReceptionSummary, carSelections: newSelections});
                            }}
                            className={`py-2.5 px-3 rounded-xl text-xs font-bold border-2 transition-all flex items-center justify-center gap-1.5 ${
                              isSceneActive
                                ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-100'
                                : 'bg-slate-50 text-slate-400 border-slate-100 hover:bg-slate-100'
                            }`}
                          >
                            {isSceneActive ? <Check size={14} /> : <span className="w-3.5 h-3.5 rounded-full border border-slate-300 inline-block" />}
                            <span>{sceneOption}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
              {lastReceptionSummary.carSelections.length === 0 && (
                <div className="py-8 text-center border-2 border-dashed border-slate-200 rounded-3xl">
                  <p className="text-slate-400 text-sm">请从上方选择车型</p>
                </div>
              )}
            </div>
          </section>

          <div className="pt-4">
            <button
              disabled={lastReceptionSummary.carSelections.length === 0}
              onClick={() => setShowSaveConfirm(true)}
              className="w-full py-4 bg-purple-600 text-white rounded-3xl font-black text-lg shadow-xl shadow-purple-200 active:bg-purple-700 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              完成信息补充
            </button>
          </div>
        </main>

        <AnimatePresence>
          {showSaveConfirm && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowSaveConfirm(false)}
                className="absolute inset-x-0 bg-slate-900/80 backdrop-blur-md"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-sm bg-white rounded-[40px] shadow-2xl overflow-hidden"
              >
                <div className="p-8 flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-purple-50 flex items-center justify-center mb-6 text-purple-600">
                    <CheckCircle2 size={40} />
                  </div>
                  
                  <h3 className="text-2xl font-black text-slate-800 mb-2">确认提交补充信息？</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8">
                    提交后接待记录将正式归档，您可以随时在历史中查看本次接待的详细情况。
                  </p>
                  
                  <div className="w-full flex gap-3">
                    <button
                      onClick={() => setShowSaveConfirm(false)}
                      className="flex-1 py-4 bg-slate-50 text-slate-600 rounded-2xl font-bold active:bg-slate-100"
                    >
                      取消
                    </button>
                    <button
                      onClick={() => {
                        const newRecord: ReceptionRecord = {
                          id: Math.random().toString(36).substr(2, 9),
                          startTime: lastReceptionSummary.startTime,
                          endTime: lastReceptionSummary.endTime,
                          date: lastReceptionSummary.date,
                          type: 'auto',
                          businessType: receptionBrand === 'suzhou_runyi' ? 'suzhou_runyi' : 'car',
                          carSelections: lastReceptionSummary.carSelections,
                          dealStatus: lastReceptionSummary.dealStatus,
                          customerName: receptionBrand === 'suzhou_runyi' && lastReceptionSummary.customerName?.trim() ? lastReceptionSummary.customerName.trim() : undefined,
                          processName: receptionBrand === 'suzhou_runyi' ? '润益延保销售流程' : undefined,
                          store: receptionBrand === 'suzhou_runyi' ? lastReceptionSummary.carSelections[0]?.model : undefined
                        };
                        setReceptionHistory([newRecord, ...receptionHistory]);
                        setHistoryBusinessType(receptionBrand === 'suzhou_runyi' ? 'suzhou_runyi' : 'car');
                        setActiveReception(null);
                        setShowSaveConfirm(false);
                        setView('receptionHistory');
                      }}
                      className="flex-1 py-4 bg-purple-600 text-white rounded-2xl font-bold shadow-lg shadow-purple-200 active:bg-purple-700"
                    >
                      确认提交
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const renderBottomNav = () => {
    if (view === 'edit' || view === 'details' || view === 'checkInHistory' || view === 'receptionInProgress' || view === 'receptionManual' || view === 'receptionSummary' || view === 'receptionHistory') return null;

    if (userRole === 'store_manager') {
      return (
        <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-slate-100 px-2 py-1.5 flex justify-around items-center z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
          {/* 1. 数据洞察 */}
          <button 
            onClick={() => setView('dataCollection')}
            className={`flex flex-col items-center gap-0.5 flex-1 py-1 transition-all ${view === 'dataCollection' ? 'text-blue-600' : 'text-slate-400'}`}
          >
            <BarChart3 size={20} className={view === 'dataCollection' ? 'animate-in zoom-in-90' : ''} />
            <span className="text-[10px] font-bold">数据洞察</span>
          </button>

          {/* 2. 客户列表 */}
          <button 
            onClick={() => setView('list')}
            className={`flex flex-col items-center gap-0.5 flex-1 py-1 transition-all ${view === 'list' ? 'text-blue-600' : 'text-slate-400'}`}
          >
            <Users size={20} className={view === 'list' ? 'animate-in zoom-in-90' : ''} />
            <span className="text-[10px] font-bold">客户列表</span>
          </button>

          {/* 3. 设备状态 */}
          <button 
            onClick={() => setView('deviceStatus')}
            className={`flex flex-col items-center gap-0.5 flex-1 py-1 transition-all ${view === 'deviceStatus' ? 'text-blue-600' : 'text-slate-400'}`}
          >
            <Radio size={20} className={view === 'deviceStatus' ? 'animate-in zoom-in-90' : ''} />
            <span className="text-[10px] font-bold">设备状态</span>
          </button>

          {/* 4. 我的 */}
          <button 
            onClick={() => setView('profile')}
            className={`flex flex-col items-center gap-0.5 flex-1 py-1 transition-all ${view === 'profile' ? 'text-blue-600' : 'text-slate-400'}`}
          >
            <UserCircle size={20} className={view === 'profile' ? 'animate-in zoom-in-90' : ''} />
            <span className="text-[10px] font-bold">我的</span>
          </button>
        </div>
      );
    }

    // 销售顾问底菜单：客户列表、客户接待、设备状态、我的
    return (
      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-slate-100 px-4 py-1.5 flex justify-around items-center z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
        {/* 1. 客户列表 */}
        <button 
          onClick={() => setView('list')}
          className={`flex flex-col items-center gap-0.5 flex-1 py-1 transition-all ${view === 'list' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <Users size={20} className={view === 'list' ? 'animate-in zoom-in-90' : ''} />
          <span className="text-[10px] font-bold">客户列表</span>
        </button>

        {/* 2. 客户接待 */}
        <button 
          onClick={() => setView('reception')}
          className={`flex flex-col items-center gap-0.5 flex-1 py-1 transition-all ${view === 'reception' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <MousePointerClick size={20} className={view === 'reception' ? 'animate-in zoom-in-90' : ''} />
          <span className="text-[10px] font-bold">客户接待</span>
        </button>

        {/* 3. 设备状态 */}
        <button 
          onClick={() => setView('deviceStatus')}
          className={`flex flex-col items-center gap-0.5 flex-1 py-1 transition-all ${view === 'deviceStatus' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <Radio size={20} className={view === 'deviceStatus' ? 'animate-in zoom-in-90' : ''} />
          <span className="text-[10px] font-bold">设备状态</span>
        </button>

        {/* 4. 我的 */}
        <button 
          onClick={() => setView('profile')}
          className={`flex flex-col items-center gap-0.5 flex-1 py-1 transition-all ${view === 'profile' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <UserCircle size={20} className={view === 'profile' ? 'animate-in zoom-in-90' : ''} />
          <span className="text-[10px] font-bold">我的</span>
        </button>
      </div>
    );
  };

  const renderQualityDataView = () => {
    const models = MODELS;
    
    // Mock data generation based on selected model and range
    // In a real app, this would be fetched from an API
    const getStats = (itemLabel: string) => {
      // Deterministic "random" stats based on itemLabel
      const hash = itemLabel.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const mentionRate = 60 + (hash % 35); // 60-95%
      return { mention: mentionRate, miss: 100 - mentionRate };
    };

    const handleQuickRange = (range: '昨天' | '近3天' | '近7天') => {
      setQualityQuickRange(range);
      const end = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      let start = end;
      if (range === '近3天') {
        start = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      } else if (range === '近7天') {
        start = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      }
      setQualityDateRange({ start, end });
    };

    const qualityCheckItems = [
      { category: '需求分析', items: ['购车用途', '驾驶习惯', '关注竞品', '预算区间'] },
      { category: '外观介绍', items: ['前脸设计', '灯光系统', '车身轮廓', '轮毂尺寸'] },
      { category: '内饰空间', items: ['座舱氛围', '储物空间', '后排体验', '座椅调节'] },
      { category: '驾控性能', items: ['动力表现', '底盘悬挂', '智能驾驶', '静谧性'] },
    ];

    return (
      <div className="flex-1 flex flex-col min-h-0 bg-slate-50 relative overflow-y-auto pb-24">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md px-4 py-4 flex justify-between items-center border-b border-slate-100">
          <div className="w-10"></div>
          <h1 className="text-lg font-black text-slate-800 tracking-tight">质检数据</h1>
          <WeChatCapsule />
        </header>

        <div className="p-4 space-y-5">
          {/* Date Selector Section */}
          <div className="space-y-3">
            {/* Date Range Pill */}
            <div className="bg-white rounded-[20px] px-5 py-3 shadow-sm border border-slate-100/60 flex items-center justify-between">
              <div className="flex items-center gap-3 overflow-hidden">
                <Calendar size={18} className="text-purple-600 flex-shrink-0" />
                <div className="flex items-center gap-2 text-slate-700">
                  <div className="relative">
                    <span className="text-sm font-black whitespace-nowrap">{qualityDateRange.start}</span>
                    <input 
                      type="date" 
                      value={qualityDateRange.start}
                      onChange={(e) => setQualityDateRange(prev => ({ ...prev, start: e.target.value }))}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                  <span className="text-xs text-slate-300 font-bold">至</span>
                  <div className="relative">
                    <span className="text-sm font-black whitespace-nowrap">{qualityDateRange.end}</span>
                    <input 
                      type="date" 
                      value={qualityDateRange.end}
                      onChange={(e) => setQualityDateRange(prev => ({ ...prev, end: e.target.value }))}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
              <ChevronDown size={16} className="text-slate-300" />
            </div>

            {/* Quick Range Shortcuts */}
            <div className="bg-slate-100/50 p-1 rounded-2xl flex gap-1">
              {(['昨天', '近3天', '近7天'] as const).map(range => (
                <button
                  key={range}
                  onClick={() => handleQuickRange(range)}
                  className={`flex-1 py-2 text-xs font-black rounded-xl transition-all ${
                    qualityQuickRange === range 
                    ? 'bg-white text-purple-600 shadow-sm' 
                    : 'text-slate-400'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {models.map(m => (
              <button
                key={m}
                onClick={() => setQualityFilterModel(m)}
                className={`flex-none px-5 py-2 rounded-full text-xs font-black transition-all border ${
                  qualityFilterModel === m
                  ? 'bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-100'
                  : 'bg-white text-slate-500 border-slate-100 hover:border-purple-200 shadow-sm'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Inspection Items List */}
          <div className="space-y-6 pt-2">
            {qualityCheckItems.map((group) => (
              <div key={group.category} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-1.5 h-6 bg-purple-500 rounded-full" />
                  <h3 className="text-base font-black text-slate-800">{group.category}</h3>
                </div>
                
                <div className="space-y-6">
                  {group.items.map((item) => {
                    const stats = getStats(item);
                    return (
                      <div key={item} className="space-y-2">
                        <div className="flex justify-between items-center text-xs font-bold">
                          <span className="text-slate-600">{item}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-purple-600">说过 {stats.mention}%</span>
                            <span className="text-slate-300">未说 {stats.miss}%</span>
                          </div>
                        </div>
                        <div className="h-2.5 w-full bg-slate-50 rounded-full overflow-hidden flex gap-0.5">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${stats.mention}%` }}
                            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-l-full"
                          />
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${stats.miss}%` }}
                            className="h-full bg-slate-200/50 rounded-r-full"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderDetailsView = () => {
    if (!selectedCustomer) return null;

    const tabs = ['AI分析纪要', '质检详情', '原始对话'];

    return (
      <div className="flex-1 flex flex-col min-h-0 bg-slate-50 relative overflow-y-auto pb-20">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between">
          <button 
            onClick={() => setView('list')}
            className="p-2 -ml-2 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-slate-800 tracking-tight">客户详情</h1>
          <div className="flex items-center">
            <WeChatCapsule />
          </div>
        </header>

        {/* Customer Summary Card */}
        <div className="p-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-purple-200">
                {selectedCustomer.name[0]}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">{selectedCustomer.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-purple-50 text-purple-600 text-[10px] font-bold rounded-full border border-purple-100">
                    {selectedCustomer.visitType}
                  </span>
                  <span className="text-slate-400 text-xs flex items-center gap-1">
                    <Car size={12} /> {selectedCustomer.model}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <div className="flex items-center gap-2 text-purple-600 font-bold text-sm mb-1">
                <FileText size={16} />
                核心摘要
              </div>
              {selectedCustomer.summary ? (
                <p className="text-slate-600 text-sm leading-relaxed">
                  {selectedCustomer.summary.core}
                </p>
              ) : (
                <div className="flex items-center gap-2 py-1">
                  <Clock size={14} className="text-amber-500 animate-spin" />
                  <span className="text-amber-600 text-xs font-medium">核心摘要生成中...</span>
                </div>
              )}
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="grid grid-cols-3 gap-1 bg-slate-200/50 p-1 rounded-xl mb-4">
            {tabs.map((tab, idx) => {
              const isProcessing = (idx === 0 && !selectedCustomer.summary) || 
                                   (idx === 1 && !selectedCustomer.qualityInfo);
              
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(idx)}
                  className={`py-2 px-2 rounded-lg text-sm font-medium transition-all relative flex items-center justify-center ${
                    activeTab === idx 
                      ? 'bg-white text-purple-600 shadow-sm font-bold' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-center gap-1.5 w-full">
                    <span className="truncate">{tab}</span>
                    {isProcessing && (
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 0 && (
                <div className="space-y-4">
                  {!selectedCustomer.summary ? (
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
                      <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 mb-4 animate-spin duration-[3000ms]">
                        <Clock size={24} />
                      </div>
                      <h4 className="text-slate-800 font-bold mb-1">智能分析生成中</h4>
                      <p className="text-slate-400 text-xs">AI正在深度解析对话内容，请稍后...</p>
                    </div>
                  ) : (() => {
                    const feishuData = getFeishuSummary(selectedCustomer);
                    const renderTextWithBold = (text: string) => {
                      const parts = text.split('**');
                      return parts.map((part, index) => {
                        if (index % 2 === 1) {
                          return <strong key={index} className="font-extrabold text-slate-900">{part}</strong>;
                        }
                        return part;
                      });
                    };
                    return (
                      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
                        {/* 备注信息单独拎出来显示 */}
                        <div className="text-[11px] text-amber-600 font-bold bg-amber-50/80 border border-amber-100/70 p-4 rounded-2xl flex items-start gap-2 leading-relaxed shadow-sm animate-in fade-in duration-300">
                          <span className="text-xs pt-[1px] flex-shrink-0">⚠️</span>
                          <span>备注：本次录音为环境嘈杂，由 AI 生成，可能不准确，请谨慎甄别后使用</span>
                        </div>

                        {/* 模块1：基本信息 已根据用户需求移除 */}


                        {/* 模块2：核心结论 (Core Conclusions bullets) */}
                        {feishuData.module2 && (
                          <div className={`bg-white rounded-3xl p-6 border border-slate-100 shadow-sm transition-all ${collapsedSections.module2 ? '' : 'space-y-4'}`}>
                            <button
                              onClick={() => toggleSection('module2')}
                              className={`w-full flex items-center justify-between hover:opacity-80 transition-opacity text-left cursor-pointer select-none ${
                                collapsedSections.module2 ? '' : 'border-b border-slate-50 pb-2.5'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-1 h-4 bg-purple-600 rounded-full"></div>
                                <h3 className="text-sm font-black text-slate-800 tracking-wide">核心结论</h3>
                              </div>
                              <div className={`p-1 rounded-full @hover:bg-slate-100 transition-colors ${collapsedSections.module2 ? 'text-slate-400' : 'text-slate-600'}`}>
                                <ChevronDown size={18} className={`transform transition-transform duration-200 ${collapsedSections.module2 ? '-rotate-90' : 'rotate-0'}`} />
                              </div>
                            </button>

                            <AnimatePresence initial={false}>
                              {!collapsedSections.module2 && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden space-y-3 pt-1"
                                >
                                  {feishuData.module2.map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-3 bg-indigo-50/30 hover:bg-indigo-50/50 border border-indigo-50/50 p-3.5 rounded-2xl transition-all">
                                      <span className="w-5 h-5 rounded-full bg-indigo-100 text-[#4338CA] text-xs font-black flex items-center justify-center flex-shrink-0">
                                        {idx + 1}
                                      </span>
                                      <p className="text-xs font-extrabold text-slate-700 leading-relaxed self-center">
                                        {item}
                                      </p>
                                    </div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}

                        {/* 模块3：车辆配置介绍 */}
                        {feishuData.module3 && (
                          <div className={`bg-white rounded-3xl p-6 border border-slate-100 shadow-sm transition-all ${collapsedSections.module3 ? '' : 'space-y-5'}`}>
                            <button
                              onClick={() => toggleSection('module3')}
                              className={`w-full flex items-center justify-between hover:opacity-80 transition-opacity text-left cursor-pointer select-none ${
                                collapsedSections.module3 ? '' : 'border-b border-slate-50 pb-3.5'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-1 h-4 bg-purple-600 rounded-full"></div>
                                <h3 className="text-base font-black text-slate-800 tracking-wide">车辆配置介绍</h3>
                              </div>
                              <div className={`p-1 rounded-full @hover:bg-slate-100 transition-colors ${collapsedSections.module3 ? 'text-slate-400' : 'text-slate-600'}`}>
                                <ChevronDown size={18} className={`transform transition-transform duration-200 ${collapsedSections.module3 ? '-rotate-90' : 'rotate-0'}`} />
                              </div>
                            </button>

                            <AnimatePresence initial={false}>
                              {!collapsedSections.module3 && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden space-y-5 pt-3"
                                >
                                  {feishuData.module3.cardA && (
                                    <div className="bg-[#f4f7fc]/50 border border-[#e2eafc]/65 rounded-2xl p-5 space-y-3.5">
                                      <div className="flex items-center gap-1.5 border-b border-indigo-100/40 pb-2">
                                        <span className="text-[#312E81] text-xs font-black flex items-center gap-1">
                                          <span>★</span> {feishuData.module3.cardA.title}
                                        </span>
                                      </div>
                                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-xs text-slate-600 leading-relaxed">
                                        {feishuData.module3.cardA.items.map((item, iIdx) => (
                                          <li key={iIdx} className="flex items-start gap-2.5 bg-white border border-[#e2eafc]/30 rounded-xl p-3 shadow-none">
                                            <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-500 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                                              {iIdx + 1}
                                            </span>
                                            <span className="text-slate-600 font-bold text-xs pt-0.5">{renderTextWithBold(item)}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}

                        {/* 模块4：需求挖掘与客户画像 */}
                        {feishuData.module4 && (
                          <div className={`bg-white rounded-3xl p-6 border border-slate-100 shadow-sm transition-all ${collapsedSections.module4 ? '' : 'space-y-5'}`}>
                            <button
                              onClick={() => toggleSection('module4')}
                              className={`w-full flex items-center justify-between hover:opacity-80 transition-opacity text-left cursor-pointer select-none ${
                                collapsedSections.module4 ? '' : 'border-b border-slate-50 pb-3.5'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-1 h-4 bg-purple-600 rounded-full"></div>
                                <h3 className="text-base font-black text-slate-800 tracking-wide">需求挖掘与客户画像</h3>
                              </div>
                              <div className={`p-1 rounded-full @hover:bg-slate-100 transition-colors ${collapsedSections.module4 ? 'text-slate-400' : 'text-slate-600'}`}>
                                <ChevronDown size={18} className={`transform transition-transform duration-200 ${collapsedSections.module4 ? '-rotate-90' : 'rotate-0'}`} />
                              </div>
                            </button>

                            <AnimatePresence initial={false}>
                              {!collapsedSections.module4 && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden space-y-5 pt-3 w-full"
                                >
                                  <div>

                              
                              {/* Segmented Switcher */}
                              <div className="bg-slate-100/70 p-1 rounded-2xl flex gap-1 w-full">
                                {[
                                  { id: 'cardA', title: '客户画像', icon: '👤' },
                                  { id: 'cardB', title: '关注点与顾虑', icon: '🎯' },
                                  { id: 'cardC', title: '竞品对比', icon: '🆚' }
                                ].map(tab => {
                                  const isActive = activeModule4Tab === tab.id;
                                  return (
                                    <button
                                      key={tab.id}
                                      onClick={() => setActiveModule4Tab(tab.id as 'cardA' | 'cardB' | 'cardC')}
                                      className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center select-none whitespace-nowrap ${
                                        isActive 
                                        ? 'bg-white text-slate-800 shadow-sm border border-slate-200/40' 
                                        : 'text-slate-400 hover:text-slate-600'
                                      }`}
                                    >
                                      <span className="truncate max-w-[80px] xs:max-w-none">{tab.title}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Active Tab View */}
                            <div className="animate-in fade-in duration-200">
                              {activeModule4Tab === 'cardA' && feishuData.module4.cardA && (
                                <div className="bg-[#fffbf4]/50 border border-[#fdecd1]/65 rounded-2xl p-5 space-y-3.5">
                                  <div className="flex items-center gap-1.5 border-b border-amber-100/40 pb-2">
                                    <span className="text-[#92400E] text-xs font-black flex items-center gap-1">
                                      <span>👤</span> 客户画像
                                    </span>
                                  </div>
                                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-xs text-slate-600 leading-relaxed">
                                    {feishuData.module4.cardA.items.map((item, iIdx) => (
                                      <li key={iIdx} className="flex items-start gap-2.5 bg-white border border-[#fdecd1]/30 rounded-xl p-3 shadow-none">
                                        <span className="w-5 h-5 rounded-full bg-amber-50 text-amber-600 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                                          {iIdx + 1}
                                        </span>
                                        <span className="text-slate-600 font-bold text-xs pt-0.5">{renderTextWithBold(item)}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {activeModule4Tab === 'cardB' && feishuData.module4.cardB && (
                                <div className="bg-[#faf5fc]/50 border border-[#f2dff6]/65 rounded-2xl p-5 space-y-3.5">
                                  <div className="flex items-center gap-1.5 border-b border-purple-100 pb-2">
                                    <span className="text-[#6B21A8] text-xs font-black flex items-center gap-1">
                                      <span>🎯</span> 关注点与顾虑
                                    </span>
                                  </div>
                                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-xs text-slate-600 leading-relaxed">
                                    {feishuData.module4.cardB.items.map((item, iIdx) => (
                                      <li key={iIdx} className="flex items-start gap-2.5 bg-white border border-[#f2dff6]/30 rounded-xl p-3 shadow-none">
                                        <span className="w-5 h-5 rounded-full bg-purple-50 text-purple-600 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                                          {iIdx + 1}
                                        </span>
                                        <span className="text-slate-600 font-bold text-xs pt-0.5">{renderTextWithBold(item)}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {activeModule4Tab === 'cardC' && feishuData.module4.cardC && (
                                <div className="bg-[#f0f6ff]/50 border border-[#dbeafe]/65 rounded-2xl p-5 space-y-3.5">
                                  <div className="flex items-center gap-1.5 border-b border-blue-100 pb-2">
                                    <span className="text-[#1E40AF] text-xs font-black flex items-center gap-1">
                                      <span>🆚</span> 竞品对比
                                    </span>
                                  </div>
                                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-xs text-slate-600 leading-relaxed">
                                    {feishuData.module4.cardC.items.map((item, iIdx) => (
                                      <li key={iIdx} className="flex items-start gap-2.5 bg-white border border-[#dbeafe]/30 rounded-xl p-3 shadow-none">
                                        <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                                          {iIdx + 1}
                                        </span>
                                        <span className="text-slate-600 font-bold text-xs pt-0.5">{renderTextWithBold(item)}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                        {/* 试驾过程与体验反馈 */}
                        {feishuData.testDriveFeedback && (
                          <div className={`bg-white rounded-3xl p-6 border border-slate-100 shadow-sm transition-all ${collapsedSections.testDriveFeedback ? '' : 'space-y-5'}`}>
                            <button
                              onClick={() => toggleSection('testDriveFeedback')}
                              className={`w-full flex items-center justify-between hover:opacity-80 transition-opacity text-left cursor-pointer select-none ${
                                collapsedSections.testDriveFeedback ? '' : 'border-b border-slate-50 pb-3.5'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-1 h-4 bg-purple-600 rounded-full"></div>
                                <h3 className="text-base font-black text-slate-800 tracking-wide">试驾过程与体验反馈</h3>
                              </div>
                              <div className={`p-1 rounded-full @hover:bg-slate-100 transition-colors ${collapsedSections.testDriveFeedback ? 'text-slate-400' : 'text-slate-600'}`}>
                                <ChevronDown size={18} className={`transform transition-transform duration-200 ${collapsedSections.testDriveFeedback ? '-rotate-90' : 'rotate-0'}`} />
                              </div>
                            </button>

                            <AnimatePresence initial={false}>
                              {!collapsedSections.testDriveFeedback && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden space-y-5 pt-3 w-full"
                                >
                                  <div>

                               
                               {/* Segmented Switcher */}
                               <div className="bg-slate-100/70 p-1 rounded-2xl flex gap-1 w-full">
                                 {[
                                   { id: 'cardA', title: '试驾安排与讲解', icon: '📝' },
                                   { id: 'cardB', title: '客户驾驶反馈', icon: '⚡' },
                                   { id: 'cardC', title: '客户顾虑与异议', icon: '❓' }
                                 ].map(tab => {
                                   const isActive = activeTestDriveTab === tab.id;
                                   return (
                                     <button
                                       key={tab.id}
                                       onClick={() => setActiveTestDriveTab(tab.id as 'cardA' | 'cardB' | 'cardC')}
                                       className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center select-none whitespace-nowrap ${
                                         isActive 
                                         ? 'bg-white text-slate-800 shadow-sm border border-slate-200/40' 
                                         : 'text-slate-400 hover:text-slate-600'
                                       }`}
                                     >
                                       <span className="truncate max-w-[90px] xs:max-w-none">{tab.title}</span>
                                     </button>
                                   );
                                 })}
                               </div>
                             </div>

                             {/* Active Tab View */}
                             <div className="animate-in fade-in duration-200">
                               {activeTestDriveTab === 'cardA' && feishuData.testDriveFeedback.cardA && (
                                 <div className="bg-[#f0fdf4]/50 border border-[#bbf7d0]/65 rounded-2xl p-5 space-y-3.5">
                                   <div className="flex items-center gap-1.5 border-b border-green-100/40 pb-2">
                                     <span className="text-[#166534] text-xs font-black flex items-center gap-1">
                                       <span>📝</span> 试驾安排与讲解
                                     </span>
                                   </div>
                                   <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-xs text-slate-600 leading-relaxed">
                                     {feishuData.testDriveFeedback.cardA.items.map((item, iIdx) => (
                                       <li key={iIdx} className="flex items-start gap-2.5 bg-white border border-[#bbf7d0]/30 rounded-xl p-3 shadow-none">
                                         <span className="w-5 h-5 rounded-full bg-green-50 text-green-600 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                                           {iIdx + 1}
                                         </span>
                                         <span className="text-slate-600 font-bold text-xs pt-0.5">{renderTextWithBold(item)}</span>
                                       </li>
                                     ))}
                                   </ul>
                                 </div>
                               )}

                               {activeTestDriveTab === 'cardB' && feishuData.testDriveFeedback.cardB && (
                                 <div className="bg-[#f0f9ff]/50 border border-[#bae6fd]/65 rounded-2xl p-5 space-y-3.5">
                                   <div className="flex items-center gap-1.5 border-b border-sky-100 pb-2">
                                     <span className="text-[#075985] text-xs font-black flex items-center gap-1">
                                       <span>⚡</span> 客户驾驶反馈
                                     </span>
                                   </div>
                                   <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-xs text-slate-600 leading-relaxed">
                                     {feishuData.testDriveFeedback.cardB.items.map((item, iIdx) => (
                                       <li key={iIdx} className="flex items-start gap-2.5 bg-white border border-[#bae6fd]/30 rounded-xl p-3 shadow-none">
                                         <span className="w-5 h-5 rounded-full bg-sky-50 text-sky-600 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                                           {iIdx + 1}
                                         </span>
                                         <span className="text-slate-600 font-bold text-xs pt-0.5">{renderTextWithBold(item)}</span>
                                       </li>
                                     ))}
                                   </ul>
                                 </div>
                               )}

                               {activeTestDriveTab === 'cardC' && feishuData.testDriveFeedback.cardC && (
                                 <div className="bg-[#fff1f2]/50 border border-[#fecdd3]/65 rounded-2xl p-5 space-y-3.5">
                                   <div className="flex items-center gap-1.5 border-b border-rose-100 pb-2">
                                     <span className="text-[#9f1239] text-xs font-black flex items-center gap-1">
                                       <span>❓</span> 客户顾虑与异议
                                     </span>
                                   </div>
                                   <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-xs text-slate-600 leading-relaxed">
                                     {feishuData.testDriveFeedback.cardC.items.map((item, iIdx) => {
                                       const isResponse = item.startsWith('销售应对');
                                       return (
                                         <li key={iIdx} className={`flex items-start gap-2.5 border rounded-xl p-3 shadow-none ${
                                           isResponse 
                                           ? 'bg-[#fffbeb] border-[#fde68a]/50 text-[#92400e]' 
                                           : 'bg-white border-[#fecdd3]/30 text-slate-600'
                                         }`}>
                                           <span className={`w-5 h-5 rounded-full font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                             isResponse 
                                             ? 'bg-[#fef3c7] text-[#b45309]' 
                                             : 'bg-rose-50 text-rose-600'
                                           }`}>
                                             {iIdx + 1}
                                           </span>
                                           <span className={`font-bold text-xs pt-0.5 ${isResponse ? 'text-[#92400e]' : 'text-slate-600'}`}>
                                             {renderTextWithBold(item)}
                                           </span>
                                         </li>
                                       );
                                     })}
                                   </ul>
                                 </div>
                               )}
                             </div>
                           </motion.div>
                         )}
                       </AnimatePresence>
                     </div>
                   )}

                        {/* 价格洽谈与金融方案 */}
                        {feishuData.priceAndFinance && (
                          <div className={`bg-white rounded-3xl p-6 border border-slate-100 shadow-sm transition-all ${collapsedSections.priceAndFinance ? "" : "space-y-5"}`}>
                            <button
                              onClick={() => toggleSection("priceAndFinance")}
                              className={`w-full flex items-center justify-between hover:opacity-80 transition-opacity text-left cursor-pointer select-none ${
                                collapsedSections.priceAndFinance ? "" : "border-b border-slate-50 pb-3.5"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-1 h-4 bg-purple-600 rounded-full"></div>
                                <h3 className="text-base font-black text-slate-800 tracking-wide">价格洽谈与金融方案</h3>
                              </div>
                              <div className={`p-1 rounded-full @hover:bg-slate-100 transition-colors ${collapsedSections.priceAndFinance ? "text-slate-400" : "text-slate-600"}`}>
                                <ChevronDown size={18} className={`transform transition-transform duration-200 ${collapsedSections.priceAndFinance ? "-rotate-90" : "rotate-0"}`} />
                              </div>
                            </button>

                            <AnimatePresence initial={false}>
                              {!collapsedSections.priceAndFinance && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden space-y-5 pt-3 w-full"
                                >
                                  {feishuData.priceAndFinance.cardA && (
                                    <div className="bg-[#fffbeb]/50 border border-[#fde68a]/65 rounded-2xl p-5 space-y-3.5">
                                      <div className="flex items-center gap-1.5 border-b border-amber-100/40 pb-2">
                                        <span className="text-[#b45309] text-xs font-black flex items-center gap-1">
                                          <span>💬</span> {feishuData.priceAndFinance.cardA.title}
                                        </span>
                                      </div>
                                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-xs text-slate-600 leading-relaxed font-sans">
                                        {feishuData.priceAndFinance.cardA.items.map((item, iIdx) => {
                                          const isFinal = item.startsWith("最终达成");
                                          const isClient = item.startsWith("客户");
                                          return (
                                            <li key={iIdx} className={`flex items-start gap-2.5 border rounded-xl p-3 shadow-none ${
                                              isFinal 
                                              ? "bg-[#ecfdf5] border-[#a7f3d0]/50 text-[#065f46]" 
                                              : isClient 
                                              ? "bg-white border-[#fde68a]/30 text-[#92400e]" 
                                              : "bg-white border-[#fde68a]/30 text-slate-600"
                                            }`}>
                                              <span className={`w-5 h-5 rounded-full font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                                isFinal 
                                                ? "bg-[#d1fae5] text-[#047857]" 
                                                : "bg-amber-50 text-amber-600"
                                              }`}>
                                                {iIdx + 1}
                                              </span>
                                              <span className={`font-bold text-xs pt-0.5 ${
                                                isFinal ? "text-[#065f46]" : isClient ? "text-[#92400e]" : "text-slate-600"
                                              }`}>
                                                {renderTextWithBold(item)}
                                              </span>
                                            </li>
                                          );
                                        })}
                                      </ul>
                                    </div>
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}

                        {/* 后续工作安排 */}
                        {feishuData.followUpWork && (
                          <div className={`bg-white rounded-3xl p-6 border border-slate-100 shadow-sm transition-all ${collapsedSections.followUpWork ? '' : 'space-y-4'}`}>
                            <button
                              onClick={() => toggleSection('followUpWork')}
                              className={`w-full flex items-center justify-between hover:opacity-80 transition-opacity text-left cursor-pointer select-none ${
                                collapsedSections.followUpWork ? '' : 'border-b border-slate-50 pb-2.5'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-1 h-4 bg-purple-600 rounded-full"></div>
                                <h3 className="text-sm font-black text-slate-800 tracking-wide">后续工作安排</h3>
                              </div>
                              <div className={`p-1 rounded-full @hover:bg-slate-100 transition-colors ${collapsedSections.followUpWork ? 'text-slate-400' : 'text-slate-600'}`}>
                                <ChevronDown size={18} className={`transform transition-transform duration-200 ${collapsedSections.followUpWork ? '-rotate-90' : 'rotate-0'}`} />
                              </div>
                            </button>

                            <AnimatePresence initial={false}>
                              {!collapsedSections.followUpWork && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden space-y-3.5 pt-1 w-full"
                                >
                                  <div className="space-y-3.5">
                              {feishuData.followUpWork.map((item, idx) => {
                                const match = item.match(/^【([^】]+)】\s*([^：]+)：\s*(.*)$/);
                                if (match) {
                                  const [_, tag, target, body] = match;
                                  return (
                                    <div key={idx} className="bg-slate-50/50 border border-slate-100/60 p-4 rounded-2xl flex items-start gap-3 hover:bg-slate-50 transition-all select-none">
                                      <div className="w-5.5 h-5.5 rounded-full bg-indigo-50 border border-indigo-100/40 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-black text-[#5046e6]">
                                        {idx + 1}
                                      </div>
                                      <div className="text-xs leading-relaxed flex-1">
                                        <span className="text-[#3b82f6] font-black mr-2">【{tag}】</span>
                                        <span className="text-slate-800 font-extrabold mr-1.5">{target}：</span>
                                        <span className="text-slate-600 font-medium">{renderTextWithBold(body)}</span>
                                      </div>
                                    </div>
                                  );
                                }
                                return (
                                  <div key={idx} className="bg-slate-50/50 border border-slate-100/60 p-4 rounded-2xl flex items-start gap-3 hover:bg-slate-50 transition-all select-none">
                                    <div className="w-5.5 h-5.5 rounded-full bg-indigo-50 border border-indigo-100/40 flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-black text-[#5046e6]">
                                      {idx + 1}
                                    </div>
                                    <div className="text-xs font-medium text-slate-600 leading-relaxed flex-1 pt-0.5">
                                      {renderTextWithBold(item)}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                        {/* 关键决策 */}
                        {feishuData.keyDecision && (
                          <div className={`bg-white rounded-3xl p-6 border border-slate-100 shadow-sm transition-all ${collapsedSections.keyDecision ? '' : 'space-y-4'}`}>
                            <button
                              onClick={() => toggleSection('keyDecision')}
                              className={`w-full flex items-center justify-between hover:opacity-80 transition-opacity text-left cursor-pointer select-none ${
                                collapsedSections.keyDecision ? '' : 'border-b border-slate-50 pb-2.5'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-1 h-4 bg-purple-600 rounded-full"></div>
                                <h3 className="text-sm font-black text-slate-800 tracking-wide">关键决策</h3>
                              </div>
                              <div className={`p-1 rounded-full @hover:bg-slate-100 transition-colors ${collapsedSections.keyDecision ? 'text-slate-400' : 'text-slate-600'}`}>
                                <ChevronDown size={18} className={`transform transition-transform duration-200 ${collapsedSections.keyDecision ? '-rotate-90' : 'rotate-0'}`} />
                              </div>
                            </button>

                            <AnimatePresence initial={false}>
                              {!collapsedSections.keyDecision && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden space-y-4 pt-1 w-full"
                                >
                                  <div className="bg-[#fffdfa]/60 border border-amber-100/55 p-5 rounded-2xl w-full mt-1">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {feishuData.keyDecision.items.map((item, idx) => {
                                  let icon = "📝";
                                  let labelBg = "bg-slate-100 text-slate-700";
                                  let borderStyle = "border-slate-100 bg-white";
                                  
                                  if (item.label.includes("决策内容")) {
                                    icon = "🎯";
                                    labelBg = "bg-indigo-50 text-indigo-700 border border-indigo-100/20";
                                    borderStyle = "border-indigo-100/30 bg-indigo-50/10";
                                  } else if (item.label.includes("问题")) {
                                    icon = "⚠️";
                                    labelBg = "bg-rose-50 text-rose-700 border border-[#fecdd3]/20";
                                    borderStyle = "border-rose-100/30 bg-rose-50/10";
                                  } else if (item.label.includes("讨论方案")) {
                                    icon = "💡";
                                    labelBg = "bg-amber-50 text-amber-700 border border-amber-100/20";
                                    borderStyle = "border-amber-100/30 bg-amber-50/10";
                                  } else if (item.label.includes("依据")) {
                                    icon = "🛡️";
                                    labelBg = "bg-teal-50 text-teal-700 border border-teal-100/20";
                                    borderStyle = "border-teal-100/30 bg-teal-50/10";
                                  }
                                  
                                  return (
                                    <div key={idx} className={`p-4 rounded-xl border ${borderStyle} flex flex-col gap-2 transition-all hover:shadow-sm`}>
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-sm">{icon}</span>
                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded ${labelBg}`}>
                                          {item.label}
                                        </span>
                                      </div>
                                      <p className="text-xs font-bold text-slate-700 leading-relaxed font-sans">
                                        {renderTextWithBold(item.value)}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}



                        {/* 模块7：金句时刻 (Voice Quotes) */}
                        {feishuData.module7 && (
                          <div className={`bg-white rounded-3xl p-6 border border-slate-100 shadow-sm transition-all ${collapsedSections.module7 ? '' : 'space-y-4'}`}>
                            <button
                              onClick={() => toggleSection('module7')}
                              className={`w-full flex items-center justify-between hover:opacity-80 transition-opacity text-left cursor-pointer select-none ${
                                collapsedSections.module7 ? '' : 'border-b border-slate-50 pb-2.5'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-1 h-4 bg-purple-600 rounded-full"></div>
                                <h3 className="text-sm font-black text-slate-800 tracking-wide">金句时刻</h3>
                              </div>
                              <div className={`p-1 rounded-full @hover:bg-slate-100 transition-colors ${collapsedSections.module7 ? 'text-slate-400' : 'text-slate-600'}`}>
                                <ChevronDown size={18} className={`transform transition-transform duration-200 ${collapsedSections.module7 ? '-rotate-90' : 'rotate-0'}`} />
                              </div>
                            </button>

                            <AnimatePresence initial={false}>
                              {!collapsedSections.module7 && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden pt-1 w-full"
                                >
                                  <div className="border border-slate-100 rounded-2xl bg-white divide-y divide-slate-150/70 overflow-hidden shadow-sm">
                                    {[
                                      {
                                        quote: "「三吨的车，开起来的感觉比宝马5系更灵活，这不是吹，是底盘调教和后轮转向系统给你的。」",
                                        commentary: "— 以客户熟悉的竞品为参照，用具体功能点解释性能优势，说服力更强"
                                      },
                                      {
                                        quote: "「您担心保养不方便，我理解，但您去上海、成都出差，凯迪拉克4S在那边随便找都有，这不是问题。」",
                                        commentary: "— 提前预判客户顾虑，用具体场景消除异议，减少客户后顾之忧"
                                      },
                                      {
                                        quote: "「这个价格我已经把能给您的都给上了，再往下我真的没办法，但我可以帮您申请一个贴膜，让您感觉值了。」",
                                        commentary: "— 坦诚亮明价格底线，以赠品替代降价，既保住价格体系又给客户台阶"
                                      },
                                      {
                                        quote: "「您买车是要开个五六年的，这五六年里保值、舒适、面子三件事，凯迪拉克都能给您。」",
                                        commentary: "— 拉长客户决策维度，将短期价格对比转化为长期价值判断，有效化解价格敏感"
                                      },
                                      {
                                        quote: "「这个月底之前的活动，我真不确定下个月还有没有，毕竟库存就这几台。」",
                                        commentary: "— 制造真实的时间紧迫感，利用库存稀缺性温和施压，加速客户决策"
                                      }
                                    ].map((qt, qIdx) => (
                                      <div key={qIdx} className="p-5 md:p-6 hover:bg-slate-50/55 transition-colors space-y-2 text-left">
                                        <p className="text-xs md:text-sm font-bold italic text-slate-800 leading-relaxed font-sans">
                                          {qt.quote}
                                        </p>
                                        <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                          {qt.commentary}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}




                      </div>
                    );
                  })()}
                </div>
              )}

              {activeTab === 1 && (
                <div className="space-y-4">
                  {!selectedCustomer.qualityInfo ? (
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
                      <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 mb-4 animate-spin duration-[3000ms]">
                        <Clock size={24} />
                      </div>
                      <h4 className="text-slate-800 font-bold mb-1">质检详情生成中</h4>
                      <p className="text-slate-400 text-xs">AI正在评估服务流程执行情况...</p>
                    </div>
                  ) : (
                    <>
                      {/* Score Section */}
                      <div className="mt-1">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-slate-800 font-bold">质检评估明细</h3>
                          <div className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-bold border border-purple-100">
                            得分: {selectedCustomer.qualityInfo.score}
                          </div>
                        </div>
                        <div className="space-y-3">
                          {selectedCustomer.qualityInfo.sections.map((section) => {
                            const isExpanded = expandedQualityItems.includes(section.title);
                            return (
                              <div key={section.title} className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                                <button
                                  onClick={() => {
                                    setExpandedQualityItems(prev => 
                                      isExpanded ? prev.filter(i => i !== section.title) : [...prev, section.title]
                                    );
                                  }}
                                  className={`w-full p-4 flex justify-between items-center transition-colors ${isExpanded ? 'bg-slate-50/50' : 'bg-white'}`}
                                >
                                  <span className="text-slate-700 font-bold">{section.title}</span>
                                  <ChevronDown 
                                    size={20} 
                                    className={`text-slate-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                                  />
                                </button>
                                
                                <AnimatePresence>
                                  {isExpanded && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    >
                                      <div className="px-4 pb-4 space-y-4 pt-2">
                                        {section.items.map((item, idx) => (
                                          <div key={idx} className="flex justify-between items-center group">
                                            <span className={`text-sm ${item.status === 'pass' ? 'text-emerald-600 font-medium' : 'text-slate-400'}`}>
                                              {item.label}
                                            </span>
                                            {item.status === 'pass' ? (
                                              <CheckCircle2 size={18} className="text-emerald-500" />
                                            ) : (
                                              <XCircle size={18} className="text-rose-400" />
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {activeTab === 2 && (
                <div className="space-y-6">
                  {/* Audio Player Mock */}
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center gap-4">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-200"
                    >
                      {isPlaying ? <Pause size={24} /> : <Play size={24} fill="currentColor" />}
                    </button>
                    <div className="flex-1">
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-purple-500"
                          initial={{ width: "0%" }}
                          animate={{ width: isPlaying ? "100%" : "30%" }}
                          transition={{ duration: isPlaying ? 30 : 0.5 }}
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-mono">
                        <span>01:24</span>
                        <span>05:42</span>
                      </div>
                    </div>
                  </div>

                  {/* Chat Bubbles */}
                  <div className="space-y-6 pb-8">
                    {(selectedCustomer.chatHistory || [
                      { time: '2026-03-16 15:45:49', sender: '员工', text: '您好，张先生，欢迎来到凯迪拉克。', stage: '展厅接待' },
                      { time: '2026-03-16 15:45:52', sender: '客户', text: '你好，我想了解一下全新XT5。', stage: '展厅接待' },
                      { time: '2026-03-16 15:46:11', sender: '员工', text: '好的，这款车目前有现车，您可以先看看展车。', stage: '展厅接待' },
                      { time: '2026-03-16 16:10:22', sender: '员工', text: '客户对价格比较敏感，已经申请了置换补贴。', stage: '成交谈判' },
                      { time: '2026-03-16 16:15:45', sender: '员工', text: '预计下周三可以提车。', stage: '成交谈判' }
                    ])
                    .map((msg, i) => {
                      const isAI = ['展厅接待', '试乘试驾', '产品介绍'].includes(msg.stage);
                      return (
                        <div key={i} className={`flex flex-col ${msg.sender === '员工' ? 'items-start' : 'items-end'}`}>
                          <div className="flex items-center gap-2 mb-1 px-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                              {msg.sender}
                            </span>
                            <span className="text-[10px] text-slate-300 font-mono">
                              {msg.time.split(' ')[1]}
                            </span>
                          </div>
                          <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                            msg.sender === '员工' 
                              ? 'bg-white text-slate-700 rounded-tl-none border border-slate-100' 
                              : 'bg-purple-600 text-white rounded-tr-none'
                          }`}>
                            {msg.text}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex justify-center items-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-7 flex flex-col items-center text-center relative overflow-hidden border border-slate-100">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white mb-5 shadow-lg shadow-blue-200">
            <Car size={32} />
          </div>

          <h1 className="text-xl font-black text-slate-900 mb-1">极氪空间智慧接待系统</h1>
          <p className="text-xs text-slate-400 mb-6">极氪空间 · 杭州万象城店</p>

          <div className="w-full bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6 text-left space-y-3">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">请选择登录身份</p>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setUserRole('store_manager')}
                className={`py-3 px-3 rounded-xl text-xs font-bold transition-all border text-center ${
                  userRole === 'store_manager'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div>张逸凡</div>
                <div className={`text-[10px] mt-0.5 ${userRole === 'store_manager' ? 'text-blue-100' : 'text-slate-400'}`}>门店店长</div>
              </button>
              <button
                type="button"
                onClick={() => setUserRole('sales_advisor')}
                className={`py-3 px-3 rounded-xl text-xs font-bold transition-all border text-center ${
                  userRole === 'sales_advisor'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div>徐浩峰</div>
                <div className={`text-[10px] mt-0.5 ${userRole === 'sales_advisor' ? 'text-blue-100' : 'text-slate-400'}`}>极氪伙伴</div>
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsLoggedIn(true);
              setView(userRole === 'store_manager' ? 'dataCollection' : 'list');
            }}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold text-base shadow-lg shadow-blue-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <LogIn size={18} />
            <span>进入系统</span>
          </button>
          <p className="text-[11px] text-slate-400 mt-4">录音工牌设备自动握手同步中 · v2.8.4</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex justify-center">
      {/* Mobile Container */}
      <div className="w-full max-w-md bg-white min-h-screen shadow-2xl flex flex-col relative overflow-hidden">
        {view === 'dailyReport' ? renderDailyReportView() : view === 'edit' ? renderEditView() : view === 'list' ? renderListView() : view === 'confirmation' ? renderConfirmationView() : view === 'dataCollection' ? renderDataCollectionView() : view === 'qualityData' ? renderQualityDataView() : view === 'profile' ? renderProfileView() : view === 'deviceStatus' ? <DeviceStatusView onNavigateToReception={() => setView('reception')} role={userRole} onRoleChange={handleRoleChange} /> : view === 'customerDetails' ? renderCustomerDetailsView() : view === 'checkIn' ? renderCheckInView() : view === 'checkInHistory' ? renderCheckInHistoryView() : view === 'reception' ? renderReceptionView() : view === 'receptionInProgress' ? renderReceptionInProgressView() : view === 'receptionHistory' ? renderReceptionHistoryView() : view === 'receptionManual' ? renderReceptionManualView() : view === 'receptionSummary' ? renderReceptionSummaryView() : renderDetailsView()}
        {renderBottomNav()}

        {/* Decorative elements - subtle */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-40 pointer-events-none -z-10"></div>
        <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-30 pointer-events-none -z-10"></div>
      </div>
    </div>
  );
}
