import React, { useState } from 'react';
import { RoleSwitcher, UserRole } from './RoleSwitcher';
import { 
  ArrowLeft, 
  ChevronLeft,
  Calendar, 
  Store, 
  Users, 
  User,
  Check,
  Mic, 
  Clock, 
  ChevronRight, 
  TrendingUp, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  SlidersHorizontal,
  ChevronDown,
  Building2,
  FileSpreadsheet,
  Layers
} from 'lucide-react';

export interface DailyReportItem {
  id: string;
  date: string; // e.g. '2026-09-22'
  displayDate: string; // '2026年09月22日'
  weekday: string; // '星期二'
  storeName: string;
  totalFlow: number;
  recordingRate: number; // percentage
  totalRecordings: number;
  avgDuration: number; // minutes
  overallExecutionRate: number;
  weeklyFlow: { date: string; day: string; flow: number }[];
  employees: {
    id: string;
    name: string;
    role: string;
    flow: number;
    recordings: number;
    coverage: number; // percentage
    avgDuration: number; // minutes
    execution: {
      welcome: number;    // 迎宾接待
      features: number;   // 品牌介绍
      demand: number;     // 需求挖掘
      testdrive: number;  // 试驾邀约
      safety: number;     // 安全讲解
      objection: number;  // 异议化解
      finance: number;    // 金融方案
      followup: number;   // 留资建档
    };
  }[];
  insights: {
    competitors: {
      rank: number;
      brand: string;
      percentage: number;
      count: number;
      quotes: string[];
    }[];
    resistances: {
      rank: number;
      point: string;
      percentage: number;
      count: number;
      quotes: string[];
    }[];
    attractions: {
      rank: number;
      point: string;
      percentage: number;
      count: number;
      quotes: string[];
    }[];
  };
}

const ZEEKR_STORES = [
  '极氪空间·上海静安大悦城店',
  '极氪中心·上海前滩太古里店',
  '极氪交付中心·上海南翔印象城店',
  '极氪空间·杭州西湖文化广场店',
];

const MOCK_REPORTS: DailyReportItem[] = [
  {
    id: '2026-09-22',
    date: '2026-09-22',
    displayDate: '2026年09月22日',
    weekday: '星期二 (今日)',
    storeName: '极氪空间·上海静安大悦城店',
    totalFlow: 128,
    recordingRate: 93.8,
    totalRecordings: 120,
    avgDuration: 32.5,
    overallExecutionRate: 94.2,
    weeklyFlow: [
      { date: '09-16', day: '周三', flow: 94 },
      { date: '09-17', day: '周四', flow: 98 },
      { date: '09-18', day: '周五', flow: 106 },
      { date: '09-19', day: '周六', flow: 152 },
      { date: '09-20', day: '周日', flow: 146 },
      { date: '09-21', day: '周一', flow: 115 },
      { date: '09-22', day: '周二', flow: 128 }
    ],
    employees: [
      {
        id: 'e1',
        name: '张伟',
        role: '资深产品专家',
        flow: 28,
        recordings: 27,
        coverage: 96.4,
        avgDuration: 34.2,
        execution: {
          welcome: 98.2,
          features: 96.5,
          demand: 94.0,
          testdrive: 95.8,
          safety: 97.0,
          objection: 92.5,
          finance: 95.0,
          followup: 98.0
        }
      },
      {
        id: 'e2',
        name: '李强',
        role: '高级体验顾问',
        flow: 25,
        recordings: 24,
        coverage: 96.0,
        avgDuration: 33.5,
        execution: {
          welcome: 97.5,
          features: 95.0,
          demand: 92.8,
          testdrive: 96.2,
          safety: 95.5,
          objection: 91.0,
          finance: 94.5,
          followup: 97.2
        }
      },
      {
        id: 'e3',
        name: '王丽',
        role: '产品专家',
        flow: 22,
        recordings: 21,
        coverage: 95.5,
        avgDuration: 32.0,
        execution: {
          welcome: 96.8,
          features: 94.5,
          demand: 91.5,
          testdrive: 93.0,
          safety: 94.8,
          objection: 89.5,
          finance: 92.0,
          followup: 96.5
        }
      },
      {
        id: 'e4',
        name: '刘洋',
        role: '体验顾问',
        flow: 20,
        recordings: 18,
        coverage: 90.0,
        avgDuration: 31.2,
        execution: {
          welcome: 95.0,
          features: 92.0,
          demand: 88.5,
          testdrive: 90.5,
          safety: 93.2,
          objection: 87.0,
          finance: 90.5,
          followup: 94.0
        }
      },
      {
        id: 'e5',
        name: '赵磊',
        role: '体验顾问',
        flow: 18,
        recordings: 16,
        coverage: 88.9,
        avgDuration: 30.1,
        execution: {
          welcome: 94.2,
          features: 91.0,
          demand: 86.0,
          testdrive: 88.5,
          safety: 91.5,
          objection: 85.2,
          finance: 88.0,
          followup: 93.5
        }
      },
      {
        id: 'e6',
        name: '孙萌',
        role: '见习顾问',
        flow: 15,
        recordings: 14,
        coverage: 93.3,
        avgDuration: 28.5,
        execution: {
          welcome: 96.0,
          features: 93.5,
          demand: 85.0,
          testdrive: 87.0,
          safety: 90.0,
          objection: 83.5,
          finance: 86.5,
          followup: 95.0
        }
      }
    ],
    insights: {
      competitors: [
        {
          rank: 1,
          brand: '特斯拉 (Model Y / Model 3)',
          percentage: 42.5,
          count: 51,
          quotes: [
            '客户开特斯拉Model 3到店，重点对比极氪001的底盘滤震与无框车门双层夹胶隔音静谧性',
            '客户认为特斯拉内饰用料过于极简，非常喜欢极氪的NAPPA全粒面真皮与Alcantara翻毛皮豪华包裹',
            '客户仔细询问了极氪全系800V高压超充与特斯拉超充网络的补能速度差异'
          ]
        },
        {
          rank: 2,
          brand: '小米 (Xiaomi SU7)',
          percentage: 27.5,
          count: 33,
          quotes: [
            '年轻客户在小米SU7与极氪007/001间深度对比，认可极氪深厚的机械底盘硬件底蕴',
            '客户家庭日常需后排载客，对比后确认极氪后排腿部与头部开阔空间明显胜出',
            '关注极氪车机流畅度与手车互联更新，对即将推送的最新OS系统充满期待'
          ]
        },
        {
          rank: 3,
          brand: '蔚来 (ET5T / ES6)',
          percentage: 18.3,
          count: 22,
          quotes: [
            '客户特别喜欢猎装轿跑瓦罐车身造型，重点对比蔚来ET5T与极氪001的后备箱进深与装载空间',
            '客户测算了BaaS租电总支出与极氪买断金融免息方案，认为极氪长远用车性价比更优'
          ]
        },
        {
          rank: 4,
          brand: '理想 (Li Auto L6/L7)',
          percentage: 11.7,
          count: 14,
          quotes: [
            '二胎家庭客户对比增程SUV与纯电猎装车，极氪超长续航与超快充消除了其纯电里程焦虑',
            '客户试驾后表示极氪的双腔空悬魔毯底盘驾控质感比理想更紧凑扎实，没有开船晃动感'
          ]
        }
      ],
      resistances: [
        {
          rank: 1,
          point: '交付周期与提车时效',
          percentage: 33.3,
          count: 40,
          quotes: [
            '客户询问特定车漆与22寸多辐运动轮毂选装后的预计交付时间，希望能在国庆长假前提车',
            '客户需要处理现有旧车指标置换过户，希望门店能锁定排产周期的精确窗口期'
          ]
        },
        {
          rank: 2,
          point: '城区高阶智驾NZP推送进度',
          percentage: 28.3,
          count: 34,
          quotes: [
            '客户特别关注上海城区无图NZP上下匝道与红绿灯路口自动博弈的实测通行表现',
            '询问双OrinX芯片与激光雷达在未来2-3年持续端到端算法OTA升级的保障能力'
          ]
        },
        {
          rank: 3,
          point: '限时权益补贴与选装包价格',
          percentage: 22.5,
          count: 27,
          quotes: [
            '客户纠结是否选装雅马哈高级音响和空气悬架，询问本月订车是否有专属选装减免基金',
            '咨询地方新能源报废换新补贴与品牌置换补贴能否同时叠加申报'
          ]
        },
        {
          rank: 4,
          point: '车身接近2米老旧小区地库停泊',
          percentage: 15.9,
          count: 19,
          quotes: [
            '市中心老小区车位较紧凑，客户担心双向会车与狭小车位倒车，顾问现场展示了全景遥控泊车功能'
          ]
        }
      ],
      attractions: [
        {
          rank: 1,
          point: '全栈800V高压超充与扎实续航',
          percentage: 43.3,
          count: 52,
          quotes: [
            '客户现场观摩了极充站充电效率，对充电15分钟续航增加500km的高压技术高度认可',
            '多位客户提及在各大汽车垂直媒体的续航实测中，极氪001续航达成率名列前茅'
          ]
        },
        {
          rank: 2,
          point: '原创纯正猎装造型与掀背大空间',
          percentage: 35.8,
          count: 43,
          quotes: [
            '客户盛赞极氪001的瓦罐猎装车身姿态，既有跑车帅气又有SUV实用装载力',
            '掀背式超大电动后备箱开口方便放置婴儿推车、高尔夫球包与户外露营装备'
          ]
        },
        {
          rank: 3,
          point: '双腔空悬+CCD电磁减振驾控品质',
          percentage: 30.8,
          count: 37,
          quotes: [
            '试驾走过颠簸减速带和快速匝道转弯，客户一致评价底盘韧性高级，侧倾抑制极佳',
            '加速推背感澎湃顺滑，动能回收平顺线性无眩晕感，获试乘试驾客户高度好评'
          ]
        },
        {
          rank: 4,
          point: '全铝架构高强度车身被动安全',
          percentage: 25.0,
          count: 30,
          quotes: [
            '极氪“公路坦氪”碰撞安全口碑在客户圈层深入人心，多位家庭用户因此决定进店选购',
            '客户看重三电毫秒级碰撞断电保护与不起火不起烟的高安全电池标准'
          ]
        }
      ]
    }
  },
  {
    id: '2026-09-21',
    date: '2026-09-21',
    displayDate: '2026年09月21日',
    weekday: '星期一 (昨日)',
    storeName: '极氪空间·上海静安大悦城店',
    totalFlow: 115,
    recordingRate: 93.9,
    totalRecordings: 108,
    avgDuration: 31.8,
    overallExecutionRate: 93.6,
    weeklyFlow: [
      { date: '09-15', day: '周二', flow: 91 },
      { date: '09-16', day: '周三', flow: 94 },
      { date: '09-17', day: '周四', flow: 98 },
      { date: '09-18', day: '周五', flow: 106 },
      { date: '09-19', day: '周六', flow: 152 },
      { date: '09-20', day: '周日', flow: 146 },
      { date: '09-21', day: '周一', flow: 115 }
    ],
    employees: [
      {
        id: 'e1',
        name: '张伟',
        role: '资深产品专家',
        flow: 25,
        recordings: 24,
        coverage: 96.0,
        avgDuration: 33.8,
        execution: {
          welcome: 98.0,
          features: 96.0,
          demand: 93.5,
          testdrive: 95.0,
          safety: 96.5,
          objection: 92.0,
          finance: 94.0,
          followup: 97.5
        }
      },
      {
        id: 'e2',
        name: '李强',
        role: '高级体验顾问',
        flow: 23,
        recordings: 22,
        coverage: 95.6,
        avgDuration: 32.9,
        execution: {
          welcome: 97.0,
          features: 94.5,
          demand: 92.0,
          testdrive: 95.5,
          safety: 95.0,
          objection: 90.5,
          finance: 94.0,
          followup: 96.8
        }
      },
      {
        id: 'e3',
        name: '王丽',
        role: '产品专家',
        flow: 20,
        recordings: 19,
        coverage: 95.0,
        avgDuration: 31.5,
        execution: {
          welcome: 96.5,
          features: 94.0,
          demand: 91.0,
          testdrive: 92.5,
          safety: 94.0,
          objection: 89.0,
          finance: 91.5,
          followup: 96.0
        }
      },
      {
        id: 'e4',
        name: '刘洋',
        role: '体验顾问',
        flow: 18,
        recordings: 16,
        coverage: 88.9,
        avgDuration: 30.5,
        execution: {
          welcome: 94.5,
          features: 91.5,
          demand: 88.0,
          testdrive: 90.0,
          safety: 92.5,
          objection: 86.5,
          finance: 90.0,
          followup: 93.5
        }
      },
      {
        id: 'e5',
        name: '赵磊',
        role: '体验顾问',
        flow: 16,
        recordings: 14,
        coverage: 87.5,
        avgDuration: 29.8,
        execution: {
          welcome: 93.8,
          features: 90.5,
          demand: 85.5,
          testdrive: 88.0,
          safety: 91.0,
          objection: 84.8,
          finance: 87.5,
          followup: 93.0
        }
      },
      {
        id: 'e6',
        name: '孙萌',
        role: '见习顾问',
        flow: 13,
        recordings: 12,
        coverage: 92.3,
        avgDuration: 28.0,
        execution: {
          welcome: 95.5,
          features: 93.0,
          demand: 84.5,
          testdrive: 86.5,
          safety: 89.5,
          objection: 83.0,
          finance: 86.0,
          followup: 94.5
        }
      }
    ],
    insights: {
      competitors: [
        {
          rank: 1,
          brand: '特斯拉 (Model Y / Model 3)',
          percentage: 41.2,
          count: 45,
          quotes: [
            '客户对比Model Y后排空间与极氪001后排舒适度，认可极氪座椅靠背电动调节与加热通风按摩功能',
            '客户赞许极氪的HUD抬头显示面积巨大且信息清晰，比特斯拉无仪表盘体验好得多'
          ]
        },
        {
          rank: 2,
          brand: '小米 (Xiaomi SU7)',
          percentage: 28.0,
          count: 30,
          quotes: [
            '客户在外观吸睛度和驾驶稳健度上权衡，试驾后认为极氪的悬挂滤震更为沉稳'
          ]
        },
        {
          rank: 3,
          brand: '蔚来 (ET5T / ES6)',
          percentage: 19.5,
          count: 21,
          quotes: [
            '瓦罐旅行车意向客户，对比极氪的电池续航标称和实测表现，极氪大电池版本更受青睐'
          ]
        },
        {
          rank: 4,
          brand: '理想 (Li Auto L6)',
          percentage: 11.3,
          count: 12,
          quotes: [
            '纯电与增程之争，极氪销售讲解了日常家用谷电0.3元/度的超低每公里使用成本'
          ]
        }
      ],
      resistances: [
        {
          rank: 1,
          point: '交付周期与提车时效',
          percentage: 32.1,
          count: 35,
          quotes: [
            '意向客户希望能在国庆前拿到现车，顾问及时协调区域物流在途车辆'
          ]
        },
        {
          rank: 2,
          point: '城区高阶智驾NZP推送进度',
          percentage: 29.0,
          count: 31,
          quotes: [
            '关注无图NZP全国公测进度，期待端到端版本全面推送'
          ]
        },
        {
          rank: 3,
          point: '限时权益补贴与选装包价格',
          percentage: 23.2,
          count: 25,
          quotes: [
            '客户关注置换权益补贴与金融三年免息的落地政策'
          ]
        },
        {
          rank: 4,
          point: '车身尺寸较大停车便利性',
          percentage: 15.7,
          count: 17,
          quotes: [
            '女客户提出车身较宽，试乘试驾体验了自动泊车入位'
          ]
        }
      ],
      attractions: [
        {
          rank: 1,
          point: '全栈800V高压超充与扎实续航',
          percentage: 44.0,
          count: 48,
          quotes: [
            '800V架构让补能速度与燃油车进站加油体验逐步拉近，客户信心显著提升'
          ]
        },
        {
          rank: 2,
          point: '原创纯正猎装造型与掀背大空间',
          percentage: 36.2,
          count: 39,
          quotes: [
            '掀背尾门空间装载力满分，家庭出游露营装备随心装载'
          ]
        },
        {
          rank: 3,
          point: '双腔空悬+CCD电磁减振驾控品质',
          percentage: 31.0,
          count: 33,
          quotes: [
            '加速性能强悍同时底盘不飘不颠，静音工程堪比百万级豪华车'
          ]
        },
        {
          rank: 4,
          point: '全铝架构高强度车身被动安全',
          percentage: 24.5,
          count: 26,
          quotes: [
            '极氪全方位碰撞吸能设计和高安全电池包技术令客户极其放心'
          ]
        }
      ]
    }
  },
  {
    id: '2026-09-20',
    date: '2026-09-20',
    displayDate: '2026年09月20日',
    weekday: '星期日',
    storeName: '极氪空间·上海静安大悦城店',
    totalFlow: 146,
    recordingRate: 94.5,
    totalRecordings: 138,
    avgDuration: 35.2,
    overallExecutionRate: 94.8,
    weeklyFlow: [
      { date: '09-14', day: '周一', flow: 88 },
      { date: '09-15', day: '周二', flow: 91 },
      { date: '09-16', day: '周三', flow: 94 },
      { date: '09-17', day: '周四', flow: 98 },
      { date: '09-18', day: '周五', flow: 106 },
      { date: '09-19', day: '周六', flow: 152 },
      { date: '09-20', day: '周日', flow: 146 }
    ],
    employees: [
      {
        id: 'e1',
        name: '张伟',
        role: '资深产品专家',
        flow: 32,
        recordings: 31,
        coverage: 96.9,
        avgDuration: 36.5,
        execution: {
          welcome: 98.5,
          features: 97.0,
          demand: 94.5,
          testdrive: 96.5,
          safety: 97.5,
          objection: 93.0,
          finance: 95.5,
          followup: 98.5
        }
      },
      {
        id: 'e2',
        name: '李强',
        role: '高级体验顾问',
        flow: 29,
        recordings: 28,
        coverage: 96.6,
        avgDuration: 35.8,
        execution: {
          welcome: 97.8,
          features: 95.5,
          demand: 93.2,
          testdrive: 96.8,
          safety: 96.0,
          objection: 91.5,
          finance: 95.0,
          followup: 97.5
        }
      },
      {
        id: 'e3',
        name: '王丽',
        role: '产品专家',
        flow: 26,
        recordings: 25,
        coverage: 96.2,
        avgDuration: 34.5,
        execution: {
          welcome: 97.0,
          features: 95.0,
          demand: 92.0,
          testdrive: 93.5,
          safety: 95.0,
          objection: 90.0,
          finance: 92.5,
          followup: 97.0
        }
      },
      {
        id: 'e4',
        name: '刘洋',
        role: '体验顾问',
        flow: 23,
        recordings: 21,
        coverage: 91.3,
        avgDuration: 33.5,
        execution: {
          welcome: 95.5,
          features: 92.5,
          demand: 89.0,
          testdrive: 91.0,
          safety: 93.8,
          objection: 87.5,
          finance: 91.0,
          followup: 94.5
        }
      },
      {
        id: 'e5',
        name: '赵磊',
        role: '体验顾问',
        flow: 20,
        recordings: 18,
        coverage: 90.0,
        avgDuration: 32.2,
        execution: {
          welcome: 94.8,
          features: 91.5,
          demand: 86.5,
          testdrive: 89.0,
          safety: 92.0,
          objection: 85.5,
          finance: 88.5,
          followup: 94.0
        }
      },
      {
        id: 'e6',
        name: '孙萌',
        role: '见习顾问',
        flow: 16,
        recordings: 15,
        coverage: 93.8,
        avgDuration: 30.0,
        execution: {
          welcome: 96.2,
          features: 94.0,
          demand: 85.5,
          testdrive: 87.5,
          safety: 90.5,
          objection: 84.0,
          finance: 87.0,
          followup: 95.5
        }
      }
    ],
    insights: {
      competitors: [
        {
          rank: 1,
          brand: '特斯拉 (Model Y / Model 3)',
          percentage: 43.0,
          count: 59,
          quotes: [
            '周末试驾客流爆满，多位对比特斯拉的客户深度体验了极氪的智能座舱语音交互与舒适座椅'
          ]
        },
        {
          rank: 2,
          brand: '小米 (Xiaomi SU7)',
          percentage: 26.5,
          count: 37,
          quotes: [
            '客户带着全家老小试乘，老人们表示极氪后排大沙发很舒服，不压抑'
          ]
        },
        {
          rank: 3,
          brand: '蔚来 (ET5T)',
          percentage: 18.0,
          count: 25,
          quotes: [
            '猎装双雄对比，极氪001的机械素质和空悬通过性赢得更多户外露营爱好者的喜爱'
          ]
        },
        {
          rank: 4,
          brand: '理想 (L6/L7)',
          percentage: 12.5,
          count: 17,
          quotes: [
            '客户认可极氪纯电更纯粹的驾驶乐趣与长久保值权益'
          ]
        }
      ],
      resistances: [
        {
          rank: 1,
          point: '交付周期与提车时效',
          percentage: 34.0,
          count: 47,
          quotes: [
            '周末下定客户普遍关心最快何时能提车，顾问协助协调锁单流程'
          ]
        },
        {
          rank: 2,
          point: '城区高阶智驾NZP推送进度',
          percentage: 28.0,
          count: 39,
          quotes: [
            '客户询问城区NZP公测体验和泊车辅助体验'
          ]
        },
        {
          rank: 3,
          point: '限时权益补贴与选装包价格',
          percentage: 22.0,
          count: 30,
          quotes: [
            '周末订车客户积极咨询免息金融政策和选装抵扣券'
          ]
        },
        {
          rank: 4,
          point: '车身尺寸较大停车便利性',
          percentage: 16.0,
          count: 22,
          quotes: [
            '顾问引导客户实车试用遥控直进直出功能，打消停车顾虑'
          ]
        }
      ],
      attractions: [
        {
          rank: 1,
          point: '全栈800V高压超充与扎实续航',
          percentage: 43.5,
          count: 60,
          quotes: [
            '超快充与长续航消除里程焦虑，深受长途出行爱好者喜爱'
          ]
        },
        {
          rank: 2,
          point: '原创纯正猎装造型与掀背大空间',
          percentage: 35.5,
          count: 49,
          quotes: [
            '猎装外观颜值极其吸睛，回头率极高'
          ]
        },
        {
          rank: 3,
          point: '双腔空悬+CCD电磁减振驾控品质',
          percentage: 31.0,
          count: 43,
          quotes: [
            '底盘质感卓越，兼顾驾驶乐趣与家人舒适'
          ]
        },
        {
          rank: 4,
          point: '全铝架构高强度车身被动安全',
          percentage: 25.0,
          count: 35,
          quotes: [
            '公路坦氪安全美名在外，赢得家庭用户的坚定信赖'
          ]
        }
      ]
    }
  },
  {
    id: '2026-09-19',
    date: '2026-09-19',
    displayDate: '2026年09月19日',
    weekday: '星期六',
    storeName: '极氪空间·上海静安大悦城店',
    totalFlow: 152,
    recordingRate: 93.4,
    totalRecordings: 142,
    avgDuration: 36.0,
    overallExecutionRate: 94.0,
    weeklyFlow: [
      { date: '09-13', day: '周日', flow: 142 },
      { date: '09-14', day: '周一', flow: 88 },
      { date: '09-15', day: '周二', flow: 91 },
      { date: '09-16', day: '周三', flow: 94 },
      { date: '09-17', day: '周四', flow: 98 },
      { date: '09-18', day: '周五', flow: 106 },
      { date: '09-19', day: '周六', flow: 152 }
    ],
    employees: [
      {
        id: 'e1',
        name: '张伟',
        role: '资深产品专家',
        flow: 34,
        recordings: 32,
        coverage: 94.1,
        avgDuration: 37.0,
        execution: {
          welcome: 98.0,
          features: 96.5,
          demand: 94.0,
          testdrive: 96.0,
          safety: 97.0,
          objection: 92.5,
          finance: 95.0,
          followup: 98.0
        }
      },
      {
        id: 'e2',
        name: '李强',
        role: '高级体验顾问',
        flow: 30,
        recordings: 29,
        coverage: 96.7,
        avgDuration: 36.2,
        execution: {
          welcome: 97.5,
          features: 95.0,
          demand: 93.0,
          testdrive: 96.5,
          safety: 95.5,
          objection: 91.0,
          finance: 94.5,
          followup: 97.0
        }
      },
      {
        id: 'e3',
        name: '王丽',
        role: '产品专家',
        flow: 27,
        recordings: 25,
        coverage: 92.6,
        avgDuration: 35.0,
        execution: {
          welcome: 96.5,
          features: 94.5,
          demand: 91.5,
          testdrive: 93.0,
          safety: 94.5,
          objection: 89.5,
          finance: 92.0,
          followup: 96.5
        }
      },
      {
        id: 'e4',
        name: '刘洋',
        role: '体验顾问',
        flow: 24,
        recordings: 22,
        coverage: 91.7,
        avgDuration: 34.0,
        execution: {
          welcome: 95.0,
          features: 92.0,
          demand: 88.5,
          testdrive: 90.5,
          safety: 93.5,
          objection: 87.0,
          finance: 90.5,
          followup: 94.0
        }
      },
      {
        id: 'e5',
        name: '赵磊',
        role: '体验顾问',
        flow: 21,
        recordings: 19,
        coverage: 90.5,
        avgDuration: 33.0,
        execution: {
          welcome: 94.5,
          features: 91.0,
          demand: 86.0,
          testdrive: 88.5,
          safety: 91.5,
          objection: 85.0,
          finance: 88.0,
          followup: 93.5
        }
      },
      {
        id: 'e6',
        name: '孙萌',
        role: '见习顾问',
        flow: 16,
        recordings: 15,
        coverage: 93.8,
        avgDuration: 31.0,
        execution: {
          welcome: 96.0,
          features: 93.5,
          demand: 85.0,
          testdrive: 87.0,
          safety: 90.0,
          objection: 83.5,
          finance: 86.5,
          followup: 95.0
        }
      }
    ],
    insights: {
      competitors: [
        {
          rank: 1,
          brand: '特斯拉 (Model Y)',
          percentage: 44.0,
          count: 62,
          quotes: ['周六进店客流高峰，多组客户直接把Model Y与极氪001在商场地下车库并排对比']
        },
        {
          rank: 2,
          brand: '小米 (Xiaomi SU7)',
          percentage: 26.0,
          count: 37,
          quotes: ['客户对极氪操控手感和转向精准度赞不绝口']
        },
        {
          rank: 3,
          brand: '蔚来 (ES6)',
          percentage: 17.5,
          count: 25,
          quotes: ['对比换电与高压超充便利度']
        },
        {
          rank: 4,
          brand: '理想 (L7)',
          percentage: 12.5,
          count: 18,
          quotes: ['家庭长途自驾与市区代步综合使用成本对比']
        }
      ],
      resistances: [
        {
          rank: 1,
          point: '交付周期与提车时效',
          percentage: 33.5,
          count: 48,
          quotes: ['客户催促排产交车节奏']
        },
        {
          rank: 2,
          point: '城区高阶智驾NZP推送进度',
          percentage: 28.5,
          count: 41,
          quotes: ['询问高阶智驾开城与泊车体验']
        },
        {
          rank: 3,
          point: '限时权益补贴与选装包价格',
          percentage: 22.5,
          count: 32,
          quotes: ['询问限时金融置换补贴优惠政策']
        },
        {
          rank: 4,
          point: '车身尺寸较大停车便利性',
          percentage: 15.5,
          count: 22,
          quotes: ['狭窄车位停车体验与遥控泊车功能演示']
        }
      ],
      attractions: [
        {
          rank: 1,
          point: '全栈800V高压超充与扎实续航',
          percentage: 43.0,
          count: 61,
          quotes: ['补能快、续航长是进店客户最核心认可指标']
        },
        {
          rank: 2,
          point: '原创纯正猎装造型与掀背大空间',
          percentage: 36.0,
          count: 51,
          quotes: ['帅气外观与掀背大后备箱深受家庭用户青睐']
        },
        {
          rank: 3,
          point: '双腔空悬+CCD电磁减振驾控品质',
          percentage: 31.0,
          count: 44,
          quotes: ['底盘魔毯悬挂质感优越']
        },
        {
          rank: 4,
          point: '全铝架构高强度车身被动安全',
          percentage: 25.0,
          count: 36,
          quotes: ['公路坦氪高安全性成为家庭安全感保障']
        }
      ]
    }
  },
  {
    id: '2026-09-18',
    date: '2026-09-18',
    displayDate: '2026年09月18日',
    weekday: '星期五',
    storeName: '极氪空间·上海静安大悦城店',
    totalFlow: 106,
    recordingRate: 93.1,
    totalRecordings: 99,
    avgDuration: 30.5,
    overallExecutionRate: 93.2,
    weeklyFlow: [
      { date: '09-12', day: '周六', flow: 148 },
      { date: '09-13', day: '周日', flow: 142 },
      { date: '09-14', day: '周一', flow: 88 },
      { date: '09-15', day: '周二', flow: 91 },
      { date: '09-16', day: '周三', flow: 94 },
      { date: '09-17', day: '周四', flow: 98 },
      { date: '09-18', day: '周五', flow: 106 }
    ],
    employees: [
      {
        id: 'e1',
        name: '张伟',
        role: '资深产品专家',
        flow: 24,
        recordings: 23,
        coverage: 95.8,
        avgDuration: 32.5,
        execution: {
          welcome: 97.8,
          features: 95.8,
          demand: 93.0,
          testdrive: 94.8,
          safety: 96.2,
          objection: 91.8,
          finance: 94.0,
          followup: 97.2
        }
      },
      {
        id: 'e2',
        name: '李强',
        role: '高级体验顾问',
        flow: 22,
        recordings: 21,
        coverage: 95.5,
        avgDuration: 31.8,
        execution: {
          welcome: 96.8,
          features: 94.2,
          demand: 91.8,
          testdrive: 95.0,
          safety: 94.8,
          objection: 90.0,
          finance: 93.8,
          followup: 96.5
        }
      },
      {
        id: 'e3',
        name: '王丽',
        role: '产品专家',
        flow: 19,
        recordings: 18,
        coverage: 94.7,
        avgDuration: 30.5,
        execution: {
          welcome: 96.0,
          features: 93.8,
          demand: 90.5,
          testdrive: 92.0,
          safety: 93.8,
          objection: 88.5,
          finance: 91.0,
          followup: 95.8
        }
      },
      {
        id: 'e4',
        name: '刘洋',
        role: '体验顾问',
        flow: 16,
        recordings: 14,
        coverage: 87.5,
        avgDuration: 29.5,
        execution: {
          welcome: 94.0,
          features: 91.0,
          demand: 87.5,
          testdrive: 89.5,
          safety: 92.0,
          objection: 86.0,
          finance: 89.5,
          followup: 93.0
        }
      },
      {
        id: 'e5',
        name: '赵磊',
        role: '体验顾问',
        flow: 14,
        recordings: 12,
        coverage: 85.7,
        avgDuration: 28.8,
        execution: {
          welcome: 93.5,
          features: 90.0,
          demand: 85.0,
          testdrive: 87.5,
          safety: 90.5,
          objection: 84.0,
          finance: 87.0,
          followup: 92.5
        }
      },
      {
        id: 'e6',
        name: '孙萌',
        role: '见习顾问',
        flow: 11,
        recordings: 11,
        coverage: 100.0,
        avgDuration: 27.2,
        execution: {
          welcome: 95.0,
          features: 92.5,
          demand: 84.0,
          testdrive: 86.0,
          safety: 89.0,
          objection: 82.5,
          finance: 85.5,
          followup: 94.0
        }
      }
    ],
    insights: {
      competitors: [
        {
          rank: 1,
          brand: '特斯拉 (Model Y)',
          percentage: 42.0,
          count: 42,
          quotes: ['周五下班后年轻白领客户结伴进店看车对比Model Y']
        },
        {
          rank: 2,
          brand: '小米 (Xiaomi SU7)',
          percentage: 27.0,
          count: 27,
          quotes: ['关注极氪底盘质感与三电质保承诺']
        },
        {
          rank: 3,
          brand: '蔚来 (ET5T)',
          percentage: 19.0,
          count: 19,
          quotes: ['对比猎装后备箱空间与露营放倒床车功能']
        },
        {
          rank: 4,
          brand: '理想 (L6)',
          percentage: 12.0,
          count: 12,
          quotes: ['对比市区纯电用车成本与保养周期']
        }
      ],
      resistances: [
        {
          rank: 1,
          point: '交付周期与提车时效',
          percentage: 33.0,
          count: 33,
          quotes: ['期望能尽快交车赶上假期出游']
        },
        {
          rank: 2,
          point: '城区高阶智驾NZP推送进度',
          percentage: 28.0,
          count: 28,
          quotes: ['关注后续高阶智驾推送时间节点']
        },
        {
          rank: 3,
          point: '限时权益补贴与选装包价格',
          percentage: 23.0,
          count: 23,
          quotes: ['咨询是否有置换增购专属权益']
        },
        {
          rank: 4,
          point: '车身尺寸较大停车便利性',
          percentage: 16.0,
          count: 16,
          quotes: ['询问老小区车位自动泊车可靠性']
        }
      ],
      attractions: [
        {
          rank: 1,
          point: '全栈800V高压超充与扎实续航',
          percentage: 43.0,
          count: 43,
          quotes: ['超充补能速度极具吸引力']
        },
        {
          rank: 2,
          point: '原创纯正猎装造型与掀背大空间',
          percentage: 36.0,
          count: 36,
          quotes: ['掀背造型与空间实用性完美统一']
        },
        {
          rank: 3,
          point: '双腔空悬+CCD电磁减振驾控品质',
          percentage: 30.5,
          count: 31,
          quotes: ['试驾驾控感优异']
        },
        {
          rank: 4,
          point: '全铝架构高强度车身被动安全',
          percentage: 24.5,
          count: 25,
          quotes: ['被动安全口碑极佳']
        }
      ]
    }
  }
];

interface DailyCustomerReportViewProps {
  onNavigateToCustomer?: () => void;
  role?: UserRole;
  onRoleChange?: (role: UserRole) => void;
}

export const DailyCustomerReportView: React.FC<DailyCustomerReportViewProps> = ({
  onNavigateToCustomer,
  role = 'store_manager',
  onRoleChange
}) => {
  // State for active report and views
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'inventory' | 'insight' | 'execution'>('inventory');

  const selectedReport = MOCK_REPORTS.find(r => r.id === selectedReportId) || MOCK_REPORTS[0];

  // Helper to calculate team averages for execution
  const calculateTeamAverage = (field: keyof typeof selectedReport.employees[0]['execution']) => {
    const total = selectedReport.employees.reduce((sum, emp) => sum + emp.execution[field], 0);
    return (total / selectedReport.employees.length).toFixed(1);
  };

  const calculateEmployeeOverall = (exec: typeof selectedReport.employees[0]['execution']) => {
    const values = Object.values(exec);
    return (values.reduce((sum, val) => sum + val, 0) / values.length).toFixed(1);
  };

  // --- RENDER 1: 日报记录列表 (按时间倒序) ---
  if (!selectedReportId) {
    return (
      <div className="flex-1 flex flex-col min-h-0 bg-slate-50 relative overflow-y-auto pb-24">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-3.5 py-2.5 flex items-center justify-between border-b border-slate-100 shadow-2xs">
          <div className="w-[140px] flex-none"></div>
          <h1 className="text-base font-bold text-slate-800 text-center flex-1">盘客日报</h1>
          <div className="w-[140px] flex-none flex justify-end">
            {onRoleChange && (
              <RoleSwitcher currentRole={role} onRoleChange={onRoleChange} />
            )}
          </div>
        </header>

        <div className="p-4 space-y-4">
          {/* List Section Header */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-slate-500" />
              <span className="text-sm font-bold text-slate-800">历史日报记录</span>
              <span className="text-xs text-slate-400 font-medium">（按时间倒序）</span>
            </div>
            <span className="text-xs text-indigo-600 font-semibold">共 {MOCK_REPORTS.length} 篇归档</span>
          </div>

          {/* Daily Report Cards List */}
          <div className="space-y-3">
            {MOCK_REPORTS.map((report) => (
              <div
                key={report.id}
                onClick={() => setSelectedReportId(report.id)}
                className="bg-white rounded-2xl p-4 border border-slate-200/80 hover:border-indigo-300 transition-all shadow-xs hover:shadow-md cursor-pointer group active:scale-[0.99]"
              >
                {/* Card Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                        {report.displayDate}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {report.weekday}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                      <Building2 size={12} className="text-slate-400" />
                      <span>{report.storeName}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-indigo-600 font-bold group-hover:translate-x-0.5 transition-transform">
                    <span>查看详情</span>
                    <ChevronRight size={16} />
                  </div>
                </div>

                {/* Key Metrics Row */}
                <div className="grid grid-cols-4 gap-2 pt-3 text-center">
                  <div className="bg-slate-50/80 rounded-xl p-2 border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-medium">总客流数</div>
                    <div className="text-sm font-bold font-mono text-slate-800 mt-0.5">
                      {report.totalFlow}
                      <span className="text-[10px] font-normal text-slate-500 ml-0.5">人</span>
                    </div>
                  </div>
                  <div className="bg-slate-50/80 rounded-xl p-2 border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-medium">接待录音率</div>
                    <div className="text-sm font-bold font-mono text-emerald-600 mt-0.5">
                      {report.recordingRate}%
                    </div>
                  </div>
                  <div className="bg-slate-50/80 rounded-xl p-2 border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-medium">录音总数</div>
                    <div className="text-sm font-bold font-mono text-slate-800 mt-0.5">
                      {report.totalRecordings}
                      <span className="text-[10px] font-normal text-slate-500 ml-0.5">条</span>
                    </div>
                  </div>
                  <div className="bg-slate-50/80 rounded-xl p-2 border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-medium">平均时长</div>
                    <div className="text-sm font-bold font-mono text-indigo-600 mt-0.5">
                      {report.avgDuration}
                      <span className="text-[10px] font-normal text-slate-500 ml-0.5">分</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER 2: 日报详情页面 ---
  const maxWeeklyFlow = Math.max(...selectedReport.weeklyFlow.map(d => d.flow));

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50 relative overflow-y-auto pb-24">
      {/* Report Cover Hero Header (Matching screenshot report style) */}
      <div className="bg-gradient-to-br from-[#ebf3ff] via-[#e1eeff] to-[#d8e8fe] border-b border-blue-100/80 relative overflow-hidden">
        {/* Top bar with circular back button */}
        <div className="px-4 pt-3 pb-1">
          <button
            onClick={() => setSelectedReportId(null)}
            className="w-9 h-9 rounded-full bg-white shadow-sm border border-slate-200/80 flex items-center justify-center text-slate-800 hover:bg-slate-50 active:scale-95 transition-all"
            title="返回日报列表"
          >
            <ChevronLeft size={22} className="text-slate-700 -ml-0.5" />
          </button>
        </div>

        {/* Hero title & watermark */}
        <div className="px-4 pt-2 pb-4 relative">
          {/* Watermark Illustration Graphic (Right side, matching screenshot) */}
          <div className="absolute right-0 top-0 bottom-0 w-44 pointer-events-none overflow-hidden flex items-center justify-end pr-3 opacity-80">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 bg-blue-300/20 rounded-full blur-xl"></div>
              {/* User avatar circle */}
              <div className="absolute right-2 top-2 w-16 h-16 rounded-full bg-white/50 backdrop-blur-xs flex items-center justify-center border border-white/70 shadow-2xs">
                <User size={30} className="text-blue-300/90" />
              </div>
              {/* Check shield circle */}
              <div className="absolute right-12 bottom-3 w-10 h-10 rounded-full bg-blue-100/80 backdrop-blur-xs flex items-center justify-center border border-white/80 shadow-2xs">
                <Check size={20} className="text-blue-600" strokeWidth={3} />
              </div>
            </div>
          </div>

          {/* Pill Badge: [ 客户日报  2026/09/21 ] */}
          <div className="inline-flex items-center bg-white/95 backdrop-blur-xs rounded-full p-0.5 pr-3 shadow-xs border border-blue-100/80 mb-2.5">
            <span className="bg-[#2563eb] text-white text-[12px] font-bold px-2.5 py-0.5 rounded-full shadow-2xs">
              客户日报
            </span>
            <span className="text-[#2563eb] text-[12px] font-bold font-mono pl-2">
              {selectedReport.date.replace(/-/g, '/')}
            </span>
          </div>

          {/* Report Title */}
          <h1 className="text-[22px] font-black text-[#1d4ed8] tracking-tight leading-tight max-w-[78%]">
            {selectedReport.storeName.endsWith('盘客日报')
              ? selectedReport.storeName
              : `${selectedReport.storeName}盘客日报`}
          </h1>
        </div>

        {/* Tab Segmented Control (Matching screenshot) */}
        <div className="px-4 pb-3">
          <div className="bg-white/75 backdrop-blur-xs p-1 rounded-2xl flex items-center border border-white/80 shadow-xs">
            <button
              onClick={() => setActiveTab('inventory')}
              className={`flex-1 py-2 text-center text-sm font-bold transition-all rounded-xl ${
                activeTab === 'inventory'
                  ? 'bg-[#2563eb] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 font-medium'
              }`}
            >
              客户盘点
            </button>
            <button
              onClick={() => setActiveTab('insight')}
              className={`flex-1 py-2 text-center text-sm font-bold transition-all rounded-xl ${
                activeTab === 'insight'
                  ? 'bg-[#2563eb] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 font-medium'
              }`}
            >
              客户洞察
            </button>
            <button
              onClick={() => setActiveTab('execution')}
              className={`flex-1 py-2 text-center text-sm font-bold transition-all rounded-xl ${
                activeTab === 'execution'
                  ? 'bg-[#2563eb] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 font-medium'
              }`}
            >
              销售执行
            </button>
          </div>
        </div>
      </div>

      {/* TAB CONTENT CONTAINER */}
      <div className="p-4 space-y-4">
        {/* ======================= TAB 1: 客户盘点 ======================= */}
        {activeTab === 'inventory' && (
          <div className="space-y-4">
            {/* （1）接待概览 */}
            <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-blue-600 rounded-full"></div>
                  <h3 className="text-sm font-bold text-slate-800">接待概览</h3>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">全天客流及录音全貌</span>
              </div>

              {/* 核心数据卡片网格 */}
              <div className="grid grid-cols-2 gap-3">
                {/* 总客流数 */}
                <div className="bg-gradient-to-br from-blue-50/70 to-indigo-50/40 rounded-xl p-3 border border-blue-100/70">
                  <div className="text-slate-500 text-xs font-medium flex items-center gap-1">
                    <Users size={14} className="text-blue-600" />
                    <span>总客流数</span>
                  </div>
                  <div className="text-2xl font-black font-mono text-slate-900 mt-1">
                    {selectedReport.totalFlow}
                    <span className="text-xs font-normal text-slate-500 ml-1">人次</span>
                  </div>
                </div>

                {/* 接待录音率 */}
                <div className="bg-gradient-to-br from-emerald-50/70 to-teal-50/40 rounded-xl p-3 border border-emerald-100/70">
                  <div className="text-slate-500 text-xs font-medium flex items-center gap-1">
                    <Mic size={14} className="text-emerald-600" />
                    <span>接待录音率</span>
                  </div>
                  <div className="text-2xl font-black font-mono text-emerald-700 mt-1">
                    {selectedReport.recordingRate}%
                  </div>
                </div>

                {/* 总接待录音数 */}
                <div className="bg-slate-50/90 rounded-xl p-3 border border-slate-200/70">
                  <div className="text-slate-500 text-xs font-medium flex items-center gap-1">
                    <FileSpreadsheet size={14} className="text-indigo-600" />
                    总接待录音数
                  </div>
                  <div className="text-xl font-bold font-mono text-slate-800 mt-1">
                    {selectedReport.totalRecordings}
                    <span className="text-xs font-normal text-slate-500 ml-1">条</span>
                  </div>
                </div>

                {/* 平均接待录音时长 */}
                <div className="bg-slate-50/90 rounded-xl p-3 border border-slate-200/70">
                  <div className="text-slate-500 text-xs font-medium flex items-center gap-1">
                    <Clock size={14} className="text-purple-600" />
                    平均接待录音时长
                  </div>
                  <div className="text-xl font-bold font-mono text-purple-700 mt-1">
                    {selectedReport.avgDuration}
                    <span className="text-xs font-normal text-slate-500 ml-1">分钟</span>
                  </div>
                </div>
              </div>

              {/* 近7天每一天的柱状图 */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700">近7天每日客流趋势（人次）</span>
                  <span className="text-[10px] text-slate-400">蓝色为当日客流峰值</span>
                </div>

                {/* SVG 柱状图 */}
                <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-200/60">
                  <div className="h-36 w-full flex items-end justify-between gap-2 px-1 pt-6 pb-2">
                    {selectedReport.weeklyFlow.map((item, idx) => {
                      const heightPercent = Math.max(15, Math.round((item.flow / maxWeeklyFlow) * 100));
                      const isToday = idx === selectedReport.weeklyFlow.length - 1;
                      return (
                        <div key={item.date} className="flex-1 flex flex-col items-center h-full justify-end group">
                          {/* 柱顶数字 */}
                          <span className={`text-[10px] font-mono font-bold mb-1 transition-all ${
                            isToday ? 'text-blue-600 scale-110' : 'text-slate-500'
                          }`}>
                            {item.flow}
                          </span>

                          {/* 柱体 */}
                          <div className="w-full max-w-[28px] bg-slate-200 rounded-t-md relative overflow-hidden flex items-end" style={{ height: `${heightPercent}%` }}>
                            <div 
                              className={`w-full rounded-t-md transition-all duration-500 ${
                                isToday 
                                  ? 'bg-gradient-to-t from-blue-600 to-indigo-500 h-full shadow-xs' 
                                  : 'bg-slate-300 hover:bg-slate-400 h-full'
                              }`}
                            />
                          </div>

                          {/* X轴标签 */}
                          <div className="mt-2 text-center">
                            <span className={`block text-[10px] leading-tight ${isToday ? 'font-bold text-blue-600' : 'text-slate-500'}`}>
                              {item.date}
                            </span>
                            <span className={`block text-[9px] ${isToday ? 'font-bold text-blue-600' : 'text-slate-400'}`}>
                              {item.day}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* 员工数据概览 */}
            <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-indigo-600 rounded-full"></div>
                  <h3 className="text-sm font-bold text-slate-800">员工数据概览</h3>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  共 {selectedReport.employees.length} 位顾问
                </span>
              </div>

              {/* 员工列表 Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-200/80">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50/90 text-slate-500 font-semibold border-b border-slate-200">
                      <th className="py-2.5 px-3 min-w-[76px]">员工姓名</th>
                      <th className="py-2.5 px-2 text-center min-w-[64px]">总客流数</th>
                      <th className="py-2.5 px-2 text-center min-w-[70px]">总接待录音数</th>
                      <th className="py-2.5 px-2 text-center min-w-[80px]">录音覆盖率</th>
                      <th className="py-2.5 px-3 text-center min-w-[80px]">平均时长(分)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedReport.employees.map((emp) => (
                      <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-2.5 px-3">
                          <div className="font-bold text-slate-800">{emp.name}</div>
                        </td>
                        <td className="py-2.5 px-2 text-center font-mono font-bold text-slate-700">
                          {emp.flow}
                        </td>
                        <td className="py-2.5 px-2 text-center font-mono text-slate-700">
                          {emp.recordings}
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          <span className={`inline-block px-1.5 py-0.5 rounded-full font-mono text-[11px] font-bold ${
                            emp.coverage >= 95 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60' 
                              : emp.coverage >= 90
                              ? 'bg-blue-50 text-blue-700 border border-blue-200/60'
                              : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                          }`}>
                            {emp.coverage}%
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono font-semibold text-slate-700">
                          {emp.avgDuration}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}

        {/* ======================= TAB 2: 客户洞察 ======================= */}
        {activeTab === 'insight' && (
          <div className="space-y-4">
            {/* 模块1: 竞品品牌 (完全符合用户参考截图样式的优雅卡片) */}
            <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-purple-600 rounded-full"></div>
                  <h3 className="text-base font-bold text-slate-900">竞品品牌</h3>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  客户主动对比频次
                </span>
              </div>

              <div className="space-y-3">
                {selectedReport.insights.competitors.map((comp) => {
                  return (
                    <div key={comp.brand} className="bg-slate-50/60 rounded-xl p-3.5 border border-slate-200/70">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`italic font-black text-sm ${
                            comp.rank === 1 ? 'text-amber-500' : comp.rank === 2 ? 'text-indigo-600' : 'text-slate-500'
                          }`}>
                            TOP {comp.rank}
                          </span>
                          <span className="font-bold text-slate-800 text-sm">{comp.brand}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-base font-mono font-black text-slate-900">{comp.percentage}%</span>
                          <span className="block text-[10px] text-slate-400">客户数: {comp.count}</span>
                        </div>
                      </div>

                      {/* 客户心声原声卡片 */}
                      <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-2xs">
                        <div className="text-xs text-slate-500 font-medium mb-1.5">
                          客户心声反馈内容
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          <li className="flex items-start gap-2 leading-relaxed">
                            <span className="text-slate-400 mt-1 flex-none">•</span>
                            <span>{comp.quotes[0]}</span>
                          </li>
                          {comp.quotes.length > 1 && (
                            <li className="flex items-start gap-2 leading-relaxed text-slate-600">
                              <span className="text-slate-400 mt-1 flex-none">•</span>
                              <span>{comp.quotes[1]}</span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 模块2: 产品抗拒点 */}
            <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-amber-500 rounded-full"></div>
                  <h3 className="text-base font-bold text-slate-900">产品抗拒点</h3>
                </div>
                <span className="text-xs text-slate-400 font-medium">客户核心顾虑因素</span>
              </div>

              <div className="space-y-3">
                {selectedReport.insights.resistances.map((resist) => {
                  return (
                    <div key={resist.point} className="bg-slate-50/60 rounded-xl p-3.5 border border-slate-200/70">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`italic font-black text-sm ${
                            resist.rank === 1 ? 'text-rose-500' : resist.rank === 2 ? 'text-amber-500' : 'text-slate-500'
                          }`}>
                            TOP {resist.rank}
                          </span>
                          <span className="font-bold text-slate-800 text-sm">{resist.point}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-base font-mono font-black text-rose-600">{resist.percentage}%</span>
                          <span className="block text-[10px] text-slate-400">客户数: {resist.count}</span>
                        </div>
                      </div>

                      {/* 客户心声原声 */}
                      <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-2xs">
                        <div className="text-xs text-slate-500 font-medium mb-1.5">
                          客户心声反馈内容
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          <li className="flex items-start gap-2 leading-relaxed">
                            <span className="text-slate-400 mt-1 flex-none">•</span>
                            <span>{resist.quotes[0]}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 模块3: 产品关注点 */}
            <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-emerald-500 rounded-full"></div>
                  <h3 className="text-base font-bold text-slate-900">产品关注点</h3>
                </div>
                <span className="text-xs text-slate-400 font-medium">客户最具好感亮点</span>
              </div>

              <div className="space-y-3">
                {selectedReport.insights.attractions.map((attr) => {
                  return (
                    <div key={attr.point} className="bg-slate-50/60 rounded-xl p-3.5 border border-slate-200/70">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`italic font-black text-sm ${
                            attr.rank === 1 ? 'text-emerald-600' : 'text-indigo-600'
                          }`}>
                            TOP {attr.rank}
                          </span>
                          <span className="font-bold text-slate-800 text-sm">{attr.point}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-base font-mono font-black text-emerald-600">{attr.percentage}%</span>
                          <span className="block text-[10px] text-slate-400">客户数: {attr.count}</span>
                        </div>
                      </div>

                      {/* 客户心声原声 */}
                      <div className="bg-white rounded-xl p-3 border border-slate-100 shadow-2xs">
                        <div className="text-xs text-slate-500 font-medium mb-1.5">
                          客户心声反馈内容
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          <li className="flex items-start gap-2 leading-relaxed">
                            <span className="text-slate-400 mt-1 flex-none">•</span>
                            <span>{attr.quotes[0]}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* ======================= TAB 3: 销售执行 ======================= */}
        {activeTab === 'execution' && (
          <div className="space-y-4">
            {/* 执行率分析列表 */}
            <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-purple-600 rounded-full"></div>
                  <h3 className="text-sm font-bold text-slate-800">销售执行率分析列表</h3>
                </div>
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="flex items-center gap-1 text-emerald-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    ≥90% 达标
                  </span>
                  <span className="flex items-center gap-1 text-amber-700">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    &lt;90% 需辅导
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400">
                可左右滑动查看全部 8 项质检考核执行率：
              </div>

              {/* Responsive Execution Matrix Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                      <th className="py-2.5 px-3 text-left sticky left-0 bg-slate-50 z-10 min-w-[76px] shadow-[2px_0_4px_rgba(0,0,0,0.04)]">
                        员工姓名
                      </th>
                      <th className="py-2.5 px-2 text-center min-w-[68px]">迎宾接待</th>
                      <th className="py-2.5 px-2 text-center min-w-[68px]">品牌介绍</th>
                      <th className="py-2.5 px-2 text-center min-w-[68px]">需求挖掘</th>
                      <th className="py-2.5 px-2 text-center min-w-[68px]">试驾邀约</th>
                      <th className="py-2.5 px-2 text-center min-w-[68px]">安全讲解</th>
                      <th className="py-2.5 px-2 text-center min-w-[68px]">异议化解</th>
                      <th className="py-2.5 px-2 text-center min-w-[68px]">金融方案</th>
                      <th className="py-2.5 px-2 text-center min-w-[68px]">留资建档</th>
                      <th className="py-2.5 px-2 text-center min-w-[68px] bg-indigo-50/70 text-indigo-700 font-bold">综合达标</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedReport.employees.map((emp) => {
                      const overall = calculateEmployeeOverall(emp.execution);
                      return (
                        <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-2.5 px-3 text-left font-bold text-slate-800 sticky left-0 bg-white z-10 shadow-[2px_0_4px_rgba(0,0,0,0.04)]">
                            <div>{emp.name}</div>
                          </td>

                          {/* 各个执行项 */}
                          <td className="py-2.5 px-2 text-center font-mono">
                            <span className={emp.execution.welcome >= 90 ? 'text-emerald-700 font-semibold' : 'text-amber-600 font-bold'}>
                              {emp.execution.welcome}%
                            </span>
                          </td>
                          <td className="py-2.5 px-2 text-center font-mono">
                            <span className={emp.execution.features >= 90 ? 'text-emerald-700 font-semibold' : 'text-amber-600 font-bold'}>
                              {emp.execution.features}%
                            </span>
                          </td>
                          <td className="py-2.5 px-2 text-center font-mono">
                            <span className={emp.execution.demand >= 90 ? 'text-emerald-700 font-semibold' : 'text-amber-600 font-bold'}>
                              {emp.execution.demand}%
                            </span>
                          </td>
                          <td className="py-2.5 px-2 text-center font-mono">
                            <span className={emp.execution.testdrive >= 90 ? 'text-emerald-700 font-semibold' : 'text-amber-600 font-bold'}>
                              {emp.execution.testdrive}%
                            </span>
                          </td>
                          <td className="py-2.5 px-2 text-center font-mono">
                            <span className={emp.execution.safety >= 90 ? 'text-emerald-700 font-semibold' : 'text-amber-600 font-bold'}>
                              {emp.execution.safety}%
                            </span>
                          </td>
                          <td className="py-2.5 px-2 text-center font-mono">
                            <span className={emp.execution.objection >= 90 ? 'text-emerald-700 font-semibold' : 'text-amber-600 font-bold'}>
                              {emp.execution.objection}%
                            </span>
                          </td>
                          <td className="py-2.5 px-2 text-center font-mono">
                            <span className={emp.execution.finance >= 90 ? 'text-emerald-700 font-semibold' : 'text-amber-600 font-bold'}>
                              {emp.execution.finance}%
                            </span>
                          </td>
                          <td className="py-2.5 px-2 text-center font-mono">
                            <span className={emp.execution.followup >= 90 ? 'text-emerald-700 font-semibold' : 'text-amber-600 font-bold'}>
                              {emp.execution.followup}%
                            </span>
                          </td>

                          {/* 综合达标率 */}
                          <td className="py-2.5 px-2 text-center font-mono font-black text-indigo-600 bg-indigo-50/40">
                            {overall}%
                          </td>
                        </tr>
                      );
                    })}

                    {/* 门店团队平均行 */}
                    <tr className="bg-slate-100/90 font-bold border-t-2 border-slate-200">
                      <td className="py-2.5 px-3 text-left text-indigo-700 sticky left-0 bg-slate-100/90 z-10 shadow-[2px_0_4px_rgba(0,0,0,0.04)]">
                        门店平均
                      </td>
                      <td className="py-2.5 px-2 text-center font-mono text-slate-800">
                        {calculateTeamAverage('welcome')}%
                      </td>
                      <td className="py-2.5 px-2 text-center font-mono text-slate-800">
                        {calculateTeamAverage('features')}%
                      </td>
                      <td className="py-2.5 px-2 text-center font-mono text-slate-800">
                        {calculateTeamAverage('demand')}%
                      </td>
                      <td className="py-2.5 px-2 text-center font-mono text-slate-800">
                        {calculateTeamAverage('testdrive')}%
                      </td>
                      <td className="py-2.5 px-2 text-center font-mono text-slate-800">
                        {calculateTeamAverage('safety')}%
                      </td>
                      <td className="py-2.5 px-2 text-center font-mono text-slate-800">
                        {calculateTeamAverage('objection')}%
                      </td>
                      <td className="py-2.5 px-2 text-center font-mono text-slate-800">
                        {calculateTeamAverage('finance')}%
                      </td>
                      <td className="py-2.5 px-2 text-center font-mono text-slate-800">
                        {calculateTeamAverage('followup')}%
                      </td>
                      <td className="py-2.5 px-2 text-center font-mono text-indigo-700 font-black bg-indigo-100/60">
                        {selectedReport.overallExecutionRate}%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};
