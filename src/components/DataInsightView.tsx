import React, { useState } from 'react';
import { 
  Users, 
  Mic, 
  Clock, 
  ChevronDown, 
  TrendingUp, 
  RefreshCw, 
  MoreHorizontal, 
  Check, 
  CheckSquare, 
  Square, 
  Award, 
  Target, 
  UserCheck, 
  BarChart2, 
  Info,
  Calendar,
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
  X
} from 'lucide-react';
import { WeChatCapsule } from './DeviceStatusView.tsx';
import { RoleSwitcher, UserRole } from './RoleSwitcher.tsx';

interface DataInsightViewProps {
  onNavigateToCustomer?: () => void;
  role?: UserRole;
  onRoleChange?: (role: UserRole) => void;
}

export const DataInsightView: React.FC<DataInsightViewProps> = ({
  role = 'store_manager',
  onRoleChange,
}) => {
  // Sales Execution States
  const [salesTimeRange, setSalesTimeRange] = useState<'today' | 'week' | 'month'>('today');
  
  // Trend Dimension Toggles
  const [visibleDimensions, setVisibleDimensions] = useState<{
    totalVisits: boolean;
    audioVisits: boolean;
    coverageRate: boolean;
  }>({
    totalVisits: true,
    audioVisits: true,
    coverageRate: true
  });

  const [activeTrendTooltipIndex, setActiveTrendTooltipIndex] = useState<number | null>(null);

  // Quality Inspection States
  const [qualityScope, setQualityScope] = useState<'team' | 'employee'>('team');
  const [selectedEmployee, setSelectedEmployee] = useState<string>('all');
  const [showOverallOnly, setShowOverallOnly] = useState<boolean>(false);
  const [activeBarItemIndex, setActiveBarItemIndex] = useState<string | null>(null);

  // Quality inspection individual items selection with enriched metrics
  const allQualityItems = [
    { 
      id: 'welcome', 
      label: '进店迎宾接待与礼仪规范', 
      shortLabel: '迎宾接待', 
      teamScore: 96.8, 
      staffScore: 97.2,
      samples: 136,
      passCount: 132,
      tip: '迎宾主动度高，微笑服务与工牌佩戴符合五星标准'
    },
    { 
      id: 'features', 
      label: '品牌介绍与核心亮点深度讲解', 
      shortLabel: '品牌介绍', 
      teamScore: 94.2, 
      staffScore: 95.5,
      samples: 136,
      passCount: 128,
      tip: '三电安全与智驾辅助亮点讲解生动，客户认可度高'
    },
    { 
      id: 'demand', 
      label: '客户购车预算与核心需求挖掘', 
      shortLabel: '需求挖掘', 
      teamScore: 88.5, 
      staffScore: 91.0,
      samples: 136,
      passCount: 120,
      tip: '预算挖掘偏弱，建议重点探询置换旧车残值预期与首付区间'
    },
    { 
      id: 'testdrive', 
      label: '主动发起试乘试驾体验邀约', 
      shortLabel: '试驾邀约', 
      teamScore: 91.0, 
      staffScore: 89.2,
      samples: 136,
      passCount: 124,
      tip: '静态讲解后应于15分钟内主动发起动态试驾动线邀约'
    },
    { 
      id: 'safety', 
      label: '试驾动态体验与安全路线规范', 
      shortLabel: '安全路线', 
      teamScore: 97.5, 
      staffScore: 98.0,
      samples: 48,
      passCount: 47,
      tip: '试驾协议签署及全员安全带提醒100%覆盖，急加减速演示规范'
    },
    { 
      id: 'objection', 
      label: '竞品差异化对比与异议化解', 
      shortLabel: '异议化解', 
      teamScore: 86.3, 
      staffScore: 84.5,
      samples: 110,
      passCount: 95,
      tip: '遇竞品降价异议时需强化保值权益与全生命周期使用成本对比'
    },
    { 
      id: 'finance', 
      label: '专属金融方案及限时权益宣贯', 
      shortLabel: '金融方案', 
      teamScore: 93.8, 
      staffScore: 96.0,
      samples: 130,
      passCount: 122,
      tip: '2年免息方案及大客户置换置顶补贴宣讲准确到位'
    },
    { 
      id: 'followup', 
      label: '留资建档与回访闭环达成', 
      shortLabel: '留资建档', 
      teamScore: 95.0, 
      staffScore: 93.5,
      samples: 136,
      passCount: 129,
      tip: '企微添加率高，建议预约48小时内二次到店邀约'
    },
  ];

  // Employee details and comparative scores
  const employeesData: Record<string, {
    name: string;
    title: string;
    composite: number;
    scores: Record<string, number>;
  }> = {
    zhang: {
      name: '张建国',
      title: '金牌顾问',
      composite: 96.2,
      scores: { welcome: 98.5, demand: 93.0, features: 97.5, testdrive: 94.0, safety: 99.0, objection: 91.2, finance: 97.8, followup: 98.6 }
    },
    li: {
      name: '李欣',
      title: '资深顾问',
      composite: 94.0,
      scores: { welcome: 97.2, demand: 91.0, features: 95.5, testdrive: 89.2, safety: 98.0, objection: 84.5, finance: 96.0, followup: 93.5 }
    },
    wang: {
      name: '王晓晨',
      title: '销售顾问',
      composite: 91.5,
      scores: { welcome: 95.0, demand: 87.5, features: 93.2, testdrive: 92.0, safety: 96.5, objection: 86.0, finance: 92.5, followup: 89.3 }
    },
    chen: {
      name: '陈思远',
      title: '销售顾问',
      composite: 88.2,
      scores: { welcome: 94.2, demand: 84.0, features: 90.5, testdrive: 88.0, safety: 95.0, objection: 81.5, finance: 90.0, followup: 82.4 }
    },
    zhao: {
      name: '赵丽华',
      title: '新晋顾问',
      composite: 86.5,
      scores: { welcome: 92.0, demand: 82.5, features: 88.0, testdrive: 85.5, safety: 93.0, objection: 79.0, finance: 88.2, followup: 83.8 }
    }
  };

  const allSalesComparisonList = [
    { id: 'zhang', name: '张建国', score: 96.2, title: '金牌顾问', tag: 'TOP 1' },
    { id: 'li', name: '李欣', score: 94.0, title: '资深顾问', tag: 'TOP 2' },
    { id: 'team_avg', name: '团队均值', score: 92.5, title: '参考线', tag: '基准', isBenchmark: true },
    { id: 'wang', name: '王晓晨', score: 91.5, title: '销售顾问', tag: '达标' },
    { id: 'chen', name: '陈思远', score: 88.2, title: '销售顾问', tag: '需辅导' },
    { id: 'zhao', name: '赵丽华', score: 86.5, title: '新晋顾问', tag: '需辅导' }
  ];

  // Quality Checkboxes Filter (matches screenshot 2)
  const [isAllSelected, setIsAllSelected] = useState<boolean>(true);
  const [selectedQualityItemIds, setSelectedQualityItemIds] = useState<string[]>([]);
  const [showOtherDropdown, setShowOtherDropdown] = useState<boolean>(false);

  const handleToggleAll = () => {
    setIsAllSelected(true);
    setSelectedQualityItemIds([]);
  };

  const handleToggleItem = (id: string) => {
    if (isAllSelected) {
      setIsAllSelected(false);
      setSelectedQualityItemIds([id]);
    } else {
      if (selectedQualityItemIds.includes(id)) {
        const next = selectedQualityItemIds.filter(item => item !== id);
        if (next.length === 0) {
          setIsAllSelected(true);
          setSelectedQualityItemIds([]);
        } else {
          setSelectedQualityItemIds(next);
        }
      } else {
        const next = [...selectedQualityItemIds, id];
        if (next.length === allQualityItems.length) {
          setIsAllSelected(true);
          setSelectedQualityItemIds([]);
        } else {
          setSelectedQualityItemIds(next);
        }
      }
    }
  };

  const otherQualityItems = allQualityItems.filter(item => item.id !== 'welcome' && item.id !== 'features');
  const otherSelectedCount = isAllSelected 
    ? 0 
    : otherQualityItems.filter(item => selectedQualityItemIds.includes(item.id)).length;

  // Customer Insight States
  const [customerDateRange, setCustomerDateRange] = useState('0601 - 0910');
  const [activeProfileDimension] = useState('all');

  // Customer Insight quotes batch index
  const [quoteBatch, setQuoteBatch] = useState<Record<string, number>>({
    channel: 0,
    job: 0,
    purpose: 0,
    budget: 0
  });

  const toggleDimension = (dim: 'totalVisits' | 'audioVisits' | 'coverageRate') => {
    setVisibleDimensions(prev => ({ ...prev, [dim]: !prev[dim] }));
  };

  const handleRotateQuote = (category: string) => {
    setQuoteBatch(prev => ({
      ...prev,
      [category]: ((prev[category] || 0) + 1) % 2
    }));
  };

  // Overview metrics based on global salesTimeRange
  const overviewMetrics = {
    today: {
      visitors: 148,
      recordings: 136,
      rate: '91.9%',
      avgDuration: '28.5'
    },
    week: {
      visitors: 910,
      recordings: 846,
      rate: '93.0%',
      avgDuration: '30.2'
    },
    month: {
      visitors: 3560,
      recordings: 3310,
      rate: '93.0%',
      avgDuration: '29.8'
    }
  }[salesTimeRange];

  // Trend Data Sets based on global salesTimeRange (横坐标为天)
  const trendDataToday = [
    { label: '09-23', total: 148, audio: 136, rate: 91.9 }
  ];

  const trendDataWeek = [
    { label: '09-17', total: 122, audio: 110, rate: 90.2 },
    { label: '09-18', total: 130, audio: 119, rate: 91.5 },
    { label: '09-19', total: 138, audio: 127, rate: 92.0 },
    { label: '09-20', total: 145, audio: 134, rate: 92.4 },
    { label: '09-21', total: 136, audio: 126, rate: 92.6 },
    { label: '09-22', total: 142, audio: 132, rate: 93.0 },
    { label: '09-23', total: 148, audio: 136, rate: 91.9 }
  ];

  const trendDataMonth = [
    { label: '09-01', total: 128, audio: 115, rate: 89.8 },
    { label: '09-05', total: 135, audio: 124, rate: 91.8 },
    { label: '09-09', total: 142, audio: 132, rate: 93.0 },
    { label: '09-13', total: 146, audio: 135, rate: 92.5 },
    { label: '09-17', total: 152, audio: 143, rate: 94.1 },
    { label: '09-20', total: 145, audio: 134, rate: 92.4 },
    { label: '09-23', total: 148, audio: 136, rate: 91.9 }
  ];

  const currentTrendData = 
    salesTimeRange === 'today' ? trendDataToday :
    salesTimeRange === 'week' ? trendDataWeek : trendDataMonth;

  const getEmployeeItemScore = (empId: string, itemId: string, fallbackScore: number) => {
    if (empId === 'all') return fallbackScore;
    return employeesData[empId]?.scores[itemId] ?? fallbackScore;
  };

  // Calculate composite quality execution rate based on selected items
  const activeSelectedItems = isAllSelected 
    ? allQualityItems 
    : allQualityItems.filter(item => selectedQualityItemIds.includes(item.id));
  const compositeRate = activeSelectedItems.length > 0
    ? (activeSelectedItems.reduce((sum, item) => {
        const score = qualityScope === 'team' 
          ? item.teamScore 
          : getEmployeeItemScore(selectedEmployee, item.id, item.staffScore);
        return sum + score;
      }, 0) / activeSelectedItems.length).toFixed(1)
    : '0.0';

  // Customer Feedback Quotes Pools
  const feedbackData = {
    channel: [
      {
        top1: {
          tag: 'TOP 1',
          name: '抖音',
          percent: '85.71%',
          count: '6',
          quotes: [
            '客户表示在抖音上看到相关内容并留下电话，从而了解到该品牌',
            '客户表示看到抖音上该品牌车辆宣传广告后来咨询购车'
          ]
        },
        top2: {
          tag: 'TOP 2',
          name: '网上',
          percent: '14.29%',
          count: '1',
          quotes: [
            '客户表示昨天在网上了解到该品牌汽车',
            '客户表示在网上看了很久这款车'
          ]
        }
      },
      {
        top1: {
          tag: 'TOP 1',
          name: '抖音',
          percent: '85.71%',
          count: '6',
          quotes: [
            '客户刷到本地4S店直播间的主持人试驾解说，被内饰静音吸引',
            '看到短视频推荐的限时置换置顶券，直接预约周末进店'
          ]
        },
        top2: {
          tag: 'TOP 2',
          name: '网上',
          percent: '14.29%',
          count: '1',
          quotes: [
            '汽车之家对比竞品参数后，专程来店体验真车空间',
            '微信朋友圈广告看到新车首发测评，想了解落地分期政策'
          ]
        }
      }
    ],
    job: [
      {
        top1: {
          tag: 'TOP 1',
          name: '网约车司机',
          percent: '27.78%',
          count: '5',
          quotes: [
            '客户表示自己没有车，打算换网约车，因为杭州不限行，只要买车就能上牌',
            '关注日常百公里综合耗电量与快充速度，希望座椅腰部支撑舒适'
          ]
        },
        top2: {
          tag: 'TOP 2',
          name: '私企职员/白领',
          percent: '22.22%',
          count: '4',
          quotes: [
            '主要用于上下班日常通勤与周末家庭周边自驾',
            '看重智能语音交互与全速域自适应巡航系统'
          ]
        }
      },
      {
        top1: {
          tag: 'TOP 1',
          name: '私营个体户/企业主',
          percent: '31.25%',
          count: '6',
          quotes: [
            '用于商务宴请与厂区往返，注重外观沉稳大气与豪华隔音',
            '希望通过企业名义购车抵扣增值税与企业所得税'
          ]
        },
        top2: {
          tag: 'TOP 2',
          name: '自由职业/设计师',
          percent: '18.75%',
          count: '3',
          quotes: [
            '被外观极简线条与撞色轮毂设计所吸引',
            '对音响系统和氛围灯质感有较高要求'
          ]
        }
      }
    ],
    purpose: [
      {
        top1: {
          tag: 'TOP 1',
          name: '家用通勤',
          percent: '53.33%',
          count: '8',
          quotes: [
            '接送孩子和日常上下班，重点关注车机安全和舒适静音',
            '二胎家庭对后排横向乘坐空间及婴儿推车容纳度有较高要求'
          ]
        },
        top2: {
          tag: 'TOP 2',
          name: '商务接待',
          percent: '33.33%',
          count: '5',
          quotes: [
            '经常需要接待外地合作方客户，需要外观大气有面子，后排空间宽敞'
          ]
        }
      },
      {
        top1: {
          tag: 'TOP 1',
          name: '自驾旅行 & 露营',
          percent: '46.67%',
          count: '7',
          quotes: [
            '热爱周末户外露营，希望具备外放电功能与超大后备箱纯平空间',
            '关注底盘离地间隙与复杂路况通过能力'
          ]
        },
        top2: {
          tag: 'TOP 2',
          name: '增购/代步升级',
          percent: '40.00%',
          count: '6',
          quotes: [
            '已有燃油大车，专门想购置一台品质纯电SUV供夫人日常代步',
            '对停车便利性与360全景影像有强烈需求'
          ]
        }
      }
    ],
    budget: [
      {
        top1: {
          tag: 'TOP 1',
          name: '25 - 35万',
          percent: '47.62%',
          count: '10',
          quotes: [
            '客户普遍关注中高配车型落地价及是否有免息金融政策',
            '希望旧车置换补贴能抵扣首付，按揭月供控制在3500元以内'
          ]
        },
        top2: {
          tag: 'TOP 2',
          name: '35 - 45万',
          percent: '33.33%',
          count: '7',
          quotes: [
            '意向直接选高配四驱版，关注全景天窗、座椅按摩和选装权益'
          ]
        }
      },
      {
        top1: {
          tag: 'TOP 1',
          name: '25 - 35万',
          percent: '47.62%',
          count: '10',
          quotes: [
            '反复核算全款提车与5年低息综合成本，倾向于办理厂家免息分期',
            '询问是否有现车以及赠送充电桩与终身质保权益'
          ]
        },
        top2: {
          tag: 'TOP 2',
          name: '35 - 45万',
          percent: '33.33%',
          count: '7',
          quotes: [
            '对顶配智能豪华版最感兴趣，愿意为更好的智驾硬件买单'
          ]
        }
      }
    ]
  };

  // Render SVG Chart for Trend
  const renderTrendChart = () => {
    const height = 160;
    const width = 340;
    const paddingX = 35;
    const paddingY = 24;
    const chartW = width - paddingX * 2;
    const chartH = height - paddingY * 2;

    const maxTotal = Math.max(...currentTrendData.map(d => d.total)) * 1.15;
    const minTotal = 0;
    const maxRate = 100;
    const minRate = 75;

    const getX = (i: number) => currentTrendData.length <= 1 ? (width / 2) : paddingX + (i / (currentTrendData.length - 1)) * chartW;
    const getYTotal = (val: number) => height - paddingY - ((val - minTotal) / (maxTotal - minTotal)) * chartH;
    const getYRate = (val: number) => height - paddingY - ((val - minRate) / (maxRate - minRate)) * chartH;

    const totalPoints = currentTrendData.map((d, i) => `${getX(i)},${getYTotal(d.total)}`).join(' ');
    const audioPoints = currentTrendData.map((d, i) => `${getX(i)},${getYTotal(d.audio)}`).join(' ');
    const ratePoints = currentTrendData.map((d, i) => `${getX(i)},${getYRate(d.rate)}`).join(' ');

    return (
      <div className="relative">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-44 overflow-visible">
          <defs>
            <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="audioGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines */}
          {[0, 0.33, 0.66, 1].map((ratio, idx) => {
            const y = paddingY + chartH * ratio;
            return (
              <line 
                key={idx} 
                x1={paddingX - 5} 
                y1={y} 
                x2={width - paddingX + 5} 
                y2={y} 
                stroke="#f1f5f9" 
                strokeDasharray="3 3" 
                strokeWidth="1" 
              />
            );
          })}

          {/* Single point vertical guide line */}
          {currentTrendData.length === 1 && (
            <line
              x1={width / 2}
              y1={paddingY}
              x2={width / 2}
              y2={height - paddingY}
              stroke="#e2e8f0"
              strokeDasharray="3 3"
              strokeWidth="1.5"
            />
          )}

          {/* Area Fill for Total Visits */}
          {visibleDimensions.totalVisits && currentTrendData.length > 1 && (
            <polygon
              points={`${getX(0)},${height - paddingY} ${totalPoints} ${getX(currentTrendData.length - 1)},${height - paddingY}`}
              fill="url(#totalGradient)"
            />
          )}

          {/* Line 1: 总到访数 (Purple) */}
          {visibleDimensions.totalVisits && currentTrendData.length > 1 && (
            <polyline
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={totalPoints}
            />
          )}

          {/* Line 2: 有录音到访数 (Emerald) */}
          {visibleDimensions.audioVisits && currentTrendData.length > 1 && (
            <polyline
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={audioPoints}
            />
          )}

          {/* Line 3: 录音覆盖率 (Amber / Cyan) */}
          {visibleDimensions.coverageRate && currentTrendData.length > 1 && (
            <polyline
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeDasharray="4 3"
              strokeLinecap="round"
              points={ratePoints}
            />
          )}

          {/* Data Points */}
          {currentTrendData.map((d, i) => {
            const x = getX(i);
            const yTotal = getYTotal(d.total);
            const yAudio = getYTotal(d.audio);
            const yRate = getYRate(d.rate);
            const isHovered = activeTrendTooltipIndex === i;

            return (
              <g key={i} className="cursor-pointer" onClick={() => setActiveTrendTooltipIndex(i)}>
                {/* Click target column */}
                <rect 
                  x={x - 24} 
                  y={paddingY} 
                  width={48} 
                  height={chartH} 
                  fill="transparent" 
                />

                {/* Total dot */}
                {visibleDimensions.totalVisits && (
                  <g>
                    <circle
                      cx={x}
                      cy={yTotal}
                      r={currentTrendData.length === 1 ? 5.5 : isHovered ? 5 : 3.5}
                      fill="#ffffff"
                      stroke="#8b5cf6"
                      strokeWidth="2.5"
                    />
                    {currentTrendData.length === 1 && (
                      <text
                        x={x + 10}
                        y={yTotal + 3.5}
                        fontSize="10"
                        fontWeight="bold"
                        fill="#8b5cf6"
                      >
                        {d.total}人
                      </text>
                    )}
                  </g>
                )}

                {/* Audio dot */}
                {visibleDimensions.audioVisits && (
                  <g>
                    <circle
                      cx={x}
                      cy={yAudio}
                      r={currentTrendData.length === 1 ? 5.5 : isHovered ? 5 : 3.5}
                      fill="#ffffff"
                      stroke="#10b981"
                      strokeWidth="2.5"
                    />
                    {currentTrendData.length === 1 && (
                      <text
                        x={x + 10}
                        y={yAudio + 3.5}
                        fontSize="10"
                        fontWeight="bold"
                        fill="#10b981"
                      >
                        {d.audio}条
                      </text>
                    )}
                  </g>
                )}

                {/* Rate dot */}
                {visibleDimensions.coverageRate && (
                  <g>
                    <circle
                      cx={x}
                      cy={yRate}
                      r={currentTrendData.length === 1 ? 5 : isHovered ? 4.5 : 3}
                      fill="#f59e0b"
                    />
                    {currentTrendData.length === 1 && (
                      <text
                        x={x + 10}
                        y={yRate + 3.5}
                        fontSize="10"
                        fontWeight="bold"
                        fill="#f59e0b"
                      >
                        {d.rate}%
                      </text>
                    )}
                  </g>
                )}

                {/* X-axis label */}
                <text
                  x={x}
                  y={height - 6}
                  textAnchor="middle"
                  fontSize={currentTrendData.length === 1 ? '11' : '9'}
                  fontWeight="bold"
                  fill={isHovered || currentTrendData.length === 1 ? '#475569' : '#94a3b8'}
                >
                  {d.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selected Data Tooltip Card */}
        {activeTrendTooltipIndex !== null && (
          <div className="mt-2 bg-slate-900 text-white p-3 rounded-xl shadow-lg text-xs flex items-center justify-between animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-2">
              <Calendar size={13} className="text-purple-400" />
              <span className="font-bold font-mono">{currentTrendData[activeTrendTooltipIndex].label}</span>
            </div>
            <div className="flex items-center gap-3">
              {visibleDimensions.totalVisits && (
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  <span className="text-slate-400">总到访:</span>
                  <span className="font-bold font-mono">{currentTrendData[activeTrendTooltipIndex].total}</span>
                </div>
              )}
              {visibleDimensions.audioVisits && (
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="text-slate-400">录音数:</span>
                  <span className="font-bold font-mono">{currentTrendData[activeTrendTooltipIndex].audio}</span>
                </div>
              )}
              {visibleDimensions.coverageRate && (
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span className="text-slate-400">覆盖率:</span>
                  <span className="font-bold font-mono text-amber-300">{currentTrendData[activeTrendTooltipIndex].rate}%</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render Execution Rate Analysis Bar Chart (质检执行率分析柱状图)
  const renderExecutionRateBarChart = () => {
    const svgWidth = 340;
    const svgHeight = 185;
    const paddingLeft = 32;
    const paddingRight = 14;
    const paddingTop = 24;
    const paddingBottom = 28;
    const chartW = svgWidth - paddingLeft - paddingRight;
    const chartH = svgHeight - paddingTop - paddingBottom;

    const getY = (val: number) => paddingTop + chartH * (1 - Math.max(0, Math.min(100, val)) / 100);
    const benchmark90Y = getY(90);

    // MODE A: 仅看综合执行率柱状图
    if (showOverallOnly) {
      if (qualityScope === 'employee') {
        const barCount = allSalesComparisonList.length;
        const slotW = chartW / barCount;
        const barW = Math.min(22, slotW * 0.55);

        return (
          <div className="relative">
            <div className="flex items-center justify-between text-[11px] mb-2 px-1">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-purple-600 inline-block"></span>
                  顾问综合执行率
                </span>
                <span className="flex items-center gap-1 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-sky-500 inline-block"></span>
                  团队均值
                </span>
              </div>
            </div>

            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-48 overflow-visible select-none">
              <defs>
                <linearGradient id="barGradPurple" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#6d28d9" />
                </linearGradient>
                <linearGradient id="barGradEmerald" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#047857" />
                </linearGradient>
                <linearGradient id="barGradAmber" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
                <linearGradient id="barGradSky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
              </defs>

              {/* Y Gridlines */}
              {[100, 80, 60, 40, 20, 0].map(val => {
                const y = getY(val);
                return (
                  <g key={val}>
                    <line
                      x1={paddingLeft}
                      y1={y}
                      x2={paddingLeft + chartW}
                      y2={y}
                      stroke={val === 0 ? '#cbd5e1' : '#f1f5f9'}
                      strokeWidth={val === 0 ? '1.5' : '1'}
                    />
                    <text
                      x={paddingLeft - 4}
                      y={y + 3}
                      textAnchor="end"
                      fontSize="8"
                      fill="#94a3b8"
                      fontFamily="monospace"
                    >
                      {val}%
                    </text>
                  </g>
                );
              })}

              {/* Bars */}
              {allSalesComparisonList.map((emp, i) => {
                const barX = paddingLeft + i * slotW + (slotW - barW) / 2;
                const barH = (emp.score / 100) * chartH;
                const barY = paddingTop + chartH - barH;
                const isSelected = activeBarItemIndex === emp.id;

                let fillId = 'url(#barGradPurple)';
                if (emp.isBenchmark) fillId = 'url(#barGradSky)';
                else if (emp.score >= 95) fillId = 'url(#barGradEmerald)';
                else if (emp.score < 90) fillId = 'url(#barGradAmber)';

                return (
                  <g
                    key={emp.id}
                    className="cursor-pointer group"
                    onClick={() => {
                      setActiveBarItemIndex(activeBarItemIndex === emp.id ? null : emp.id);
                      if (emp.id !== 'team_avg') setSelectedEmployee(emp.id);
                    }}
                  >
                    {/* Top Tag or Rank */}
                    {emp.tag && (
                      <text
                        x={barX + barW / 2}
                        y={barY - 13}
                        textAnchor="middle"
                        fontSize="7"
                        fill={emp.score >= 95 ? '#059669' : emp.score >= 90 ? '#7c3aed' : '#d97706'}
                        fontWeight="bold"
                      >
                        {emp.tag}
                      </text>
                    )}

                    {/* Score value on top */}
                    <text
                      x={barX + barW / 2}
                      y={barY - 3}
                      textAnchor="middle"
                      fontSize="8.5"
                      fill={emp.isBenchmark ? '#0284c7' : emp.score >= 95 ? '#059669' : emp.score >= 90 ? '#6d28d9' : '#ea580c'}
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {emp.score}%
                    </text>

                    {/* Bar rectangle */}
                    <rect
                      x={barX}
                      y={barY}
                      width={barW}
                      height={Math.max(4, barH)}
                      rx="3.5"
                      fill={fillId}
                      className="transition-all duration-300 group-hover:opacity-90"
                      stroke={isSelected ? '#1e1b4b' : 'none'}
                      strokeWidth={isSelected ? '2' : '0'}
                    />

                    {/* X-axis label */}
                    <text
                      x={barX + barW / 2}
                      y={paddingTop + chartH + 15}
                      textAnchor="middle"
                      fontSize="8.5"
                      fill={isSelected ? '#6d28d9' : '#475569'}
                      fontWeight={isSelected ? 'bold' : 'normal'}
                    >
                      {emp.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        );
      } else {
        // Team Overall Comparison Bars (今日 vs 近7天 vs 本月 vs 集团标杆)
        const teamPeriodBars = [
          { id: 'today', label: '今日接待', score: 92.8, tag: '当前' },
          { id: 'week', label: '近7天均值', score: 91.6, tag: '环比+1.2%' },
          { id: 'month', label: '本月均值', score: 90.8, tag: '月度累积' },
          { id: 'benchmark', label: '集团标杆', score: 95.0, tag: '行业优秀', isTarget: true }
        ];

        const barCount = teamPeriodBars.length;
        const slotW = chartW / barCount;
        const barW = 32;

        return (
          <div className="relative">
            <div className="flex items-center justify-between text-[11px] mb-2 px-1">
              <span className="text-slate-600 font-medium">团队综合执行率走势柱状图</span>
              <div className="flex items-center gap-1 text-amber-600 font-bold">
                <span className="w-3 border-t-2 border-dashed border-amber-500 inline-block"></span>
                <span>90% 考核基准线</span>
              </div>
            </div>

            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-48 overflow-visible select-none">
              <defs>
                <linearGradient id="barTeamGradPurple" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#6d28d9" />
                </linearGradient>
                <linearGradient id="barTeamGradTarget" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#047857" />
                </linearGradient>
              </defs>

              {/* Y Gridlines */}
              {[100, 80, 60, 40, 20, 0].map(val => {
                const y = getY(val);
                return (
                  <g key={val}>
                    <line
                      x1={paddingLeft}
                      y1={y}
                      x2={paddingLeft + chartW}
                      y2={y}
                      stroke={val === 0 ? '#cbd5e1' : '#f1f5f9'}
                      strokeWidth={val === 0 ? '1.5' : '1'}
                    />
                    <text
                      x={paddingLeft - 4}
                      y={y + 3}
                      textAnchor="end"
                      fontSize="8"
                      fill="#94a3b8"
                      fontFamily="monospace"
                    >
                      {val}%
                    </text>
                  </g>
                );
              })}

              <line
                x1={paddingLeft}
                y1={benchmark90Y}
                x2={paddingLeft + chartW}
                y2={benchmark90Y}
                stroke="#f59e0b"
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />
              <text
                x={paddingLeft + chartW}
                y={benchmark90Y - 3}
                textAnchor="end"
                fontSize="8"
                fill="#d97706"
                fontWeight="bold"
              >
                90% 考核线
              </text>

              {teamPeriodBars.map((item, i) => {
                const barX = paddingLeft + i * slotW + (slotW - barW) / 2;
                const barH = (item.score / 100) * chartH;
                const barY = paddingTop + chartH - barH;

                return (
                  <g key={item.id} className="cursor-pointer group">
                    <text
                      x={barX + barW / 2}
                      y={barY - 13}
                      textAnchor="middle"
                      fontSize="7"
                      fill="#64748b"
                      fontWeight="bold"
                    >
                      {item.tag}
                    </text>

                    <text
                      x={barX + barW / 2}
                      y={barY - 3}
                      textAnchor="middle"
                      fontSize="9.5"
                      fill={item.isTarget ? '#059669' : '#6d28d9'}
                      fontWeight="bold"
                      fontFamily="monospace"
                    >
                      {item.score}%
                    </text>

                    <rect
                      x={barX}
                      y={barY}
                      width={barW}
                      height={Math.max(4, barH)}
                      rx="4"
                      fill={item.isTarget ? 'url(#barTeamGradTarget)' : 'url(#barTeamGradPurple)'}
                      className="transition-all duration-300 group-hover:opacity-90"
                    />

                    <text
                      x={barX + barW / 2}
                      y={paddingTop + chartH + 15}
                      textAnchor="middle"
                      fontSize="9"
                      fill="#475569"
                      fontWeight="medium"
                    >
                      {item.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        );
      }
    }

    // MODE B: 各项细化执行率柱状图 (勾选每一项看)
    if (activeSelectedItems.length === 0) {
      return (
        <div className="py-10 flex flex-col items-center justify-center text-slate-400 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
          <SlidersHorizontal size={22} className="mb-1.5 text-slate-300" />
          <p className="text-xs font-medium">请在上方勾选质检考核项目生成对应柱状图</p>
          <button
            onClick={handleToggleAll}
            className="mt-2 px-3 py-1 bg-[#6366f1] text-white rounded-lg text-xs font-bold shadow-xs hover:bg-indigo-600 transition-colors"
          >
            一键勾选全部 (8项)
          </button>
        </div>
      );
    }

    const isDualBar = qualityScope === 'employee' && selectedEmployee !== 'all';
    const currentEmpObj = employeesData[selectedEmployee] || null;
    const barCount = activeSelectedItems.length;
    const slotW = chartW / barCount;

    return (
      <div className="relative">
        {/* Chart Top Toolbar & Legend */}
        <div className="flex items-center justify-between text-[11px] mb-2 px-1">
          <div className="flex items-center gap-2">
            {isDualBar ? (
              <>
                <span className="flex items-center gap-1 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-purple-600 inline-block"></span>
                  {currentEmpObj ? currentEmpObj.name : '该顾问'}
                </span>
                <span className="flex items-center gap-1 text-slate-600 font-medium">
                  <span className="w-2.5 h-2.5 rounded-xs bg-slate-400 inline-block"></span>
                  团队均值
                </span>
              </>
            ) : (
              <span className="flex items-center gap-1 text-slate-600 font-medium">
                <span className="w-2.5 h-2.5 rounded-xs bg-purple-600 inline-block"></span>
                质检执行率柱状图（已勾选 {activeSelectedItems.length} 项）
              </span>
            )}
          </div>
        </div>

        {/* SVG Bar Chart */}
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-52 overflow-visible select-none">
          <defs>
            <linearGradient id="barGradItemEmerald" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="barGradItemPurple" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#6d28d9" />
            </linearGradient>
            <linearGradient id="barGradItemAmber" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="barGradTeamGray" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
          </defs>

          {/* Y-axis Gridlines */}
          {[100, 80, 60, 40, 20, 0].map(val => {
            const y = getY(val);
            return (
              <g key={val}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={paddingLeft + chartW}
                  y2={y}
                  stroke={val === 0 ? '#cbd5e1' : '#f1f5f9'}
                  strokeWidth={val === 0 ? '1.5' : '1'}
                />
                <text
                  x={paddingLeft - 4}
                  y={y + 3}
                  textAnchor="end"
                  fontSize="8"
                  fill="#94a3b8"
                  fontFamily="monospace"
                >
                  {val}%
                </text>
              </g>
            );
          })}

          {/* Bar Items */}
          {activeSelectedItems.map((item, i) => {
            const isSelected = activeBarItemIndex === item.id;
            const slotCenterX = paddingLeft + i * slotW + slotW / 2;

            if (isDualBar) {
              const empScore = currentEmpObj?.scores[item.id] ?? item.staffScore;
              const teamScore = item.teamScore;
              const barW = Math.min(13, (slotW - 5) / 2);

              const empBarH = (empScore / 100) * chartH;
              const empBarY = paddingTop + chartH - empBarH;
              const empBarX = slotCenterX - barW - 1;

              const teamBarH = (teamScore / 100) * chartH;
              const teamBarY = paddingTop + chartH - teamBarH;
              const teamBarX = slotCenterX + 1;

              return (
                <g
                  key={item.id}
                  className="cursor-pointer group"
                  onClick={() => setActiveBarItemIndex(activeBarItemIndex === item.id ? null : item.id)}
                >
                  {/* Emp Score Label */}
                  <text
                    x={empBarX + barW / 2}
                    y={empBarY - 3}
                    textAnchor="middle"
                    fontSize="7.5"
                    fill={empScore >= 95 ? '#059669' : empScore >= 90 ? '#6d28d9' : '#ea580c'}
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {empScore}%
                  </text>

                  {/* Emp Bar */}
                  <rect
                    x={empBarX}
                    y={empBarY}
                    width={barW}
                    height={Math.max(3, empBarH)}
                    rx="3"
                    fill={empScore >= 95 ? 'url(#barGradItemEmerald)' : empScore >= 90 ? 'url(#barGradItemPurple)' : 'url(#barGradItemAmber)'}
                    stroke={isSelected ? '#1e1b4b' : 'none'}
                    strokeWidth={isSelected ? '1.5' : '0'}
                  />

                  {/* Team Bar */}
                  <rect
                    x={teamBarX}
                    y={teamBarY}
                    width={barW}
                    height={Math.max(3, teamBarH)}
                    rx="3"
                    fill="url(#barGradTeamGray)"
                    opacity="0.8"
                  />

                  {/* X-axis label */}
                  <text
                    x={slotCenterX}
                    y={paddingTop + chartH + 16}
                    textAnchor="middle"
                    fontSize={barCount > 6 ? "7.5" : "8.5"}
                    fill={isSelected ? '#6d28d9' : '#475569'}
                    fontWeight={isSelected ? 'bold' : 'normal'}
                  >
                    {item.shortLabel}
                  </text>
                </g>
              );
            } else {
              const score = qualityScope === 'team' 
                ? item.teamScore 
                : getEmployeeItemScore(selectedEmployee, item.id, item.staffScore);
              const barW = Math.min(22, Math.max(12, slotW * 0.6));
              const barH = (score / 100) * chartH;
              const barY = paddingTop + chartH - barH;
              const barX = slotCenterX - barW / 2;

              let fillId = 'url(#barGradItemPurple)';
              if (score >= 95) fillId = 'url(#barGradItemEmerald)';
              else if (score < 90) fillId = 'url(#barGradItemAmber)';

              return (
                <g
                  key={item.id}
                  className="cursor-pointer group"
                  onClick={() => setActiveBarItemIndex(activeBarItemIndex === item.id ? null : item.id)}
                >
                  {/* Score Label on Top */}
                  <text
                    x={slotCenterX}
                    y={barY - 3}
                    textAnchor="middle"
                    fontSize={barCount > 6 ? "7.5" : "8.5"}
                    fill={score >= 95 ? '#059669' : score >= 90 ? '#6d28d9' : '#ea580c'}
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {score}%
                  </text>

                  {/* Bar */}
                  <rect
                    x={barX}
                    y={barY}
                    width={barW}
                    height={Math.max(4, barH)}
                    rx="3.5"
                    fill={fillId}
                    className="transition-all duration-300 group-hover:opacity-90"
                    stroke={isSelected ? '#1e1b4b' : 'none'}
                    strokeWidth={isSelected ? '2' : '0'}
                  />

                  {/* X-axis Label */}
                  <text
                    x={slotCenterX}
                    y={paddingTop + chartH + 16}
                    textAnchor="middle"
                    fontSize={barCount > 6 ? "7.5" : "8.5"}
                    fill={isSelected ? '#6d28d9' : '#475569'}
                    fontWeight={isSelected ? 'bold' : 'normal'}
                  >
                    {item.shortLabel}
                  </text>
                </g>
              );
            }
          })}
        </svg>
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50 relative overflow-y-auto pb-24">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-3.5 py-2.5 flex items-center justify-between border-b border-slate-100 shadow-2xs">
        <div className="w-[140px] flex-none"></div>
        <h1 className="text-base font-bold text-slate-800 text-center flex-1">数据洞察</h1>
        <div className="w-[140px] flex-none flex justify-end">
          {onRoleChange ? (
            <RoleSwitcher currentRole={role} onRoleChange={onRoleChange} />
          ) : (
            <WeChatCapsule />
          )}
        </div>
      </header>

      {/* 页面全局时间筛选栏：控制整个数据洞察页面的统计维度 */}
      <div className="sticky top-[45px] z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 flex items-center justify-between border-b border-slate-200/70 shadow-2xs">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
          <Calendar size={14} className="text-purple-600" />
          <span>时间维度</span>
        </div>
        <div className="flex bg-slate-100/90 p-0.5 rounded-xl border border-slate-200/60 text-xs font-bold">
          {(['today', 'week', 'month'] as const).map(range => (
            <button
              key={range}
              onClick={() => {
                setSalesTimeRange(range);
                setActiveTrendTooltipIndex(null);
              }}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                salesTimeRange === range
                  ? 'bg-white text-purple-600 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {range === 'today' ? '今日' : range === 'week' ? '近7天' : '本月'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 space-y-4">
        <div className="space-y-4 animate-in fade-in-50 duration-200">
          {/* 1. 数据概览 */}
            <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-3.5">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-purple-600 rounded-full"></div>
                  <h3 className="text-sm font-bold text-slate-800">数据概览</h3>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">
                  {salesTimeRange === 'today' ? '今日数据' : salesTimeRange === 'week' ? '近7天累计' : '本月累计'}
                </span>
              </div>

              {/* 4 Overview Metric Cards */}
              <div className="grid grid-cols-2 gap-2.5">
                {/* 1. 客流数 */}
                <div className="bg-gradient-to-br from-purple-50/50 to-white p-3 rounded-xl border border-purple-100/70">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-xs font-medium text-slate-600">客流数</span>
                    <Users size={16} className="text-purple-600" />
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black font-mono text-slate-800">{overviewMetrics.visitors}</span>
                    <span className="text-[10px] text-slate-400">人</span>
                  </div>
                </div>

                {/* 2. 接待录音数 */}
                <div className="bg-gradient-to-br from-emerald-50/50 to-white p-3 rounded-xl border border-emerald-100/70">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-xs font-medium text-slate-600">接待录音数</span>
                    <Mic size={16} className="text-emerald-600" />
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black font-mono text-slate-800">{overviewMetrics.recordings}</span>
                    <span className="text-[10px] text-slate-400">条</span>
                  </div>
                </div>

                {/* 3. 接待录音率 */}
                <div className="bg-gradient-to-br from-blue-50/50 to-white p-3 rounded-xl border border-blue-100/70">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-xs font-medium text-slate-600">接待录音率</span>
                    <Target size={16} className="text-blue-600" />
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black font-mono text-slate-800">{overviewMetrics.rate}</span>
                  </div>
                </div>

                {/* 4. 平均接待录音时长 */}
                <div className="bg-gradient-to-br from-amber-50/50 to-white p-3 rounded-xl border border-amber-100/70">
                  <div className="flex items-center justify-between text-slate-400 mb-1">
                    <span className="text-xs font-medium text-slate-600">平均接待时长</span>
                    <Clock size={16} className="text-amber-600" />
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black font-mono text-slate-800">{overviewMetrics.avgDuration}</span>
                    <span className="text-[10px] text-slate-400">分钟</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. 录音率趋势 */}
            <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-4 bg-purple-600 rounded-full"></div>
                  <h3 className="text-sm font-bold text-slate-800">录音率趋势</h3>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  {salesTimeRange === 'today' ? '今日走势' : salesTimeRange === 'week' ? '近7天每日走势' : '本月每日走势'}
                </span>
              </div>

              {/* 3 Dimensions Legend & Interactive Filters */}
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3 bg-slate-50 p-2 rounded-xl border border-slate-100">
                <button 
                  onClick={() => toggleDimension('totalVisits')}
                  className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-md transition-all ${
                    visibleDimensions.totalVisits ? 'bg-purple-100/80 text-purple-700 font-bold' : 'text-slate-400 opacity-60'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                  <span>总到访数</span>
                </button>

                <button 
                  onClick={() => toggleDimension('audioVisits')}
                  className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-md transition-all ${
                    visibleDimensions.audioVisits ? 'bg-emerald-100/80 text-emerald-700 font-bold' : 'text-slate-400 opacity-60'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                  <span>有录音到访数</span>
                </button>

                <button 
                  onClick={() => toggleDimension('coverageRate')}
                  className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-md transition-all ${
                    visibleDimensions.coverageRate ? 'bg-amber-100/80 text-amber-700 font-bold' : 'text-slate-400 opacity-60'
                  }`}
                >
                  <span className="w-2.5 h-1.5 bg-amber-500 rounded-xs"></span>
                  <span>录音覆盖率(%)</span>
                </button>
              </div>

              {/* SVG Trend Line Chart */}
              {renderTrendChart()}
            </section>

            {/* 3. 执行率分析 (柱状图图表) */}
            <section className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
              {/* 模块标题 */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-4 bg-purple-600 rounded-full"></div>
                <h3 className="text-sm font-bold text-slate-800">执行率分析</h3>
              </div>

              {/* 团队 / 员工 Tab Bar */}
              <div className="flex items-center gap-7 border-b border-slate-200/80 mb-3">
                <button
                  onClick={() => {
                    setQualityScope('team');
                    setActiveBarItemIndex(null);
                  }}
                  className={`pb-2.5 text-base font-bold transition-all relative ${
                    qualityScope === 'team'
                      ? 'text-blue-600'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  团队
                  {qualityScope === 'team' && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-blue-600 rounded-full" />
                  )}
                </button>
                <button
                  onClick={() => {
                    setQualityScope('employee');
                    setActiveBarItemIndex(null);
                  }}
                  className={`pb-2.5 text-base font-bold transition-all relative ${
                    qualityScope === 'employee'
                      ? 'text-blue-600'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  员工
                  {qualityScope === 'employee' && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-blue-600 rounded-full" />
                  )}
                </button>
              </div>

              {/* Checkboxes Row (Exact match to screenshot 2) */}
              <div className="flex items-center gap-6 pb-3 pt-0.5 relative text-sm select-none">
                {/* 1. 全部 */}
                <div
                  onClick={handleToggleAll}
                  className="flex items-center gap-1.5 cursor-pointer group"
                >
                  <div
                    className={`w-4 h-4 rounded-[3px] flex items-center justify-center transition-colors ${
                      isAllSelected
                        ? 'bg-[#6366f1] text-white shadow-2xs'
                        : 'border-2 border-slate-300 bg-white group-hover:border-slate-400'
                    }`}
                  >
                    {isAllSelected && <Check size={12} strokeWidth={3.5} />}
                  </div>
                  <span className={`${isAllSelected ? 'font-bold text-slate-800' : 'text-slate-600'}`}>
                    全部
                  </span>
                </div>

                {/* 2. 迎宾接待 */}
                <div
                  onClick={() => handleToggleItem('welcome')}
                  className="flex items-center gap-1.5 cursor-pointer group"
                >
                  <div
                    className={`w-4 h-4 rounded-[3px] flex items-center justify-center transition-colors ${
                      !isAllSelected && selectedQualityItemIds.includes('welcome')
                        ? 'bg-[#6366f1] text-white shadow-2xs'
                        : 'border-2 border-slate-300 bg-white group-hover:border-slate-400'
                    }`}
                  >
                    {!isAllSelected && selectedQualityItemIds.includes('welcome') && (
                      <Check size={12} strokeWidth={3.5} />
                    )}
                  </div>
                  <span
                    className={`${
                      !isAllSelected && selectedQualityItemIds.includes('welcome')
                        ? 'font-bold text-slate-800'
                        : 'text-slate-600'
                    }`}
                  >
                    迎宾接待
                  </span>
                </div>

                {/* 3. 品牌介绍 */}
                <div
                  onClick={() => handleToggleItem('features')}
                  className="flex items-center gap-1.5 cursor-pointer group"
                >
                  <div
                    className={`w-4 h-4 rounded-[3px] flex items-center justify-center transition-colors ${
                      !isAllSelected && selectedQualityItemIds.includes('features')
                        ? 'bg-[#6366f1] text-white shadow-2xs'
                        : 'border-2 border-slate-300 bg-white group-hover:border-slate-400'
                    }`}
                  >
                    {!isAllSelected && selectedQualityItemIds.includes('features') && (
                      <Check size={12} strokeWidth={3.5} />
                    )}
                  </div>
                  <span
                    className={`${
                      !isAllSelected && selectedQualityItemIds.includes('features')
                        ? 'font-bold text-slate-800'
                        : 'text-slate-600'
                    }`}
                  >
                    品牌介绍
                  </span>
                </div>

                {/* 4. 其他 ▾ */}
                <div className="relative">
                  <button
                    onClick={() => setShowOtherDropdown(!showOtherDropdown)}
                    className={`flex items-center gap-1 transition-colors py-0.5 ${
                      otherSelectedCount > 0
                        ? 'text-[#6366f1] font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <span>其他{otherSelectedCount > 0 ? ` (${otherSelectedCount})` : ''}</span>
                    <ChevronDown size={14} className={`transition-transform duration-200 ${showOtherDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Popover */}
                  {showOtherDropdown && (
                    <>
                      <div
                        className="fixed inset-0 z-30"
                        onClick={() => setShowOtherDropdown(false)}
                      />
                      <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200/90 p-2.5 z-40 animate-in fade-in-50 zoom-in-95 duration-150">
                        <div className="flex items-center justify-between px-2 pb-2 mb-1.5 border-b border-slate-100 text-xs text-slate-500 font-medium">
                          <span>其他考核指标</span>
                          <button
                            onClick={() => setShowOtherDropdown(false)}
                            className="text-[#6366f1] font-bold text-[11px]"
                          >
                            完成
                          </button>
                        </div>
                        <div className="space-y-1">
                          {otherQualityItems.map(item => {
                            const isChecked = !isAllSelected && selectedQualityItemIds.includes(item.id);
                            return (
                              <div
                                key={item.id}
                                onClick={() => handleToggleItem(item.id)}
                                className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-slate-50 cursor-pointer select-none transition-colors"
                              >
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`w-3.5 h-3.5 rounded-[3px] flex items-center justify-center transition-colors ${
                                      isChecked
                                        ? 'bg-[#6366f1] text-white'
                                        : 'border-2 border-slate-300 bg-white'
                                    }`}
                                  >
                                    {isChecked && <Check size={10} strokeWidth={3.5} />}
                                  </div>
                                  <span className={`text-xs ${isChecked ? 'font-bold text-slate-800' : 'text-slate-600'}`}>
                                    {item.shortLabel}
                                  </span>
                                </div>
                                <span className="text-[11px] font-mono text-slate-400">
                                  {qualityScope === 'team' ? `${item.teamScore}%` : `${item.staffScore}%`}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Employee Selection Chips if in employee mode */}
              {qualityScope === 'employee' && (
                <div className="mb-3.5 flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                  {[
                    { id: 'all', name: '全部销售' },
                    { id: 'zhang', name: '张建国 (金牌)' },
                    { id: 'li', name: '李欣' },
                    { id: 'wang', name: '王晓晨' },
                    { id: 'chen', name: '陈思远' },
                    { id: 'zhao', name: '赵丽华' }
                  ].map(emp => (
                    <button
                      key={emp.id}
                      onClick={() => {
                        setSelectedEmployee(emp.id);
                        setActiveBarItemIndex(null);
                      }}
                      className={`flex-none px-3 py-1 rounded-full text-xs font-bold transition-all border ${
                        selectedEmployee === emp.id
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-slate-50 text-slate-600 border-slate-200/70 hover:bg-slate-100'
                      }`}
                    >
                      {emp.name}
                    </button>
                  ))}
                </div>
              )}

              {/* Composite Execution Rate Highlight Banner */}
              <div className="bg-gradient-to-r from-purple-50 via-indigo-50/50 to-white rounded-xl p-3 mb-3 border border-purple-100/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-600/10 text-purple-600 flex items-center justify-center font-bold">
                    <Award size={18} />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      {qualityScope === 'team' 
                        ? '团队质检综合执行率' 
                        : selectedEmployee === 'all' 
                          ? '顾问团队整体均值' 
                          : `${employeesData[selectedEmployee]?.name || '该销售'} 综合执行率`}
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black font-mono text-slate-800">{compositeRate}%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* The SVG Bar Chart Component */}
              <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-200/60 mb-3">
                {renderExecutionRateBarChart()}
              </div>

              {/* Active Bar Item Drill-down Inspection Card */}
              {activeBarItemIndex && (() => {
                const targetItem = allQualityItems.find(item => item.id === activeBarItemIndex);
                if (targetItem) {
                  const score = qualityScope === 'team'
                    ? targetItem.teamScore
                    : getEmployeeItemScore(selectedEmployee, targetItem.id, targetItem.staffScore);
                  const isPass = score >= 90;

                  return (
                    <div className="bg-white rounded-xl p-3.5 mb-3 border border-purple-200 shadow-sm animate-in fade-in zoom-in-95">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${isPass ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                          <span className="text-xs font-bold text-slate-800">{targetItem.label}</span>
                        </div>
                        <button
                          onClick={() => setActiveBarItemIndex(null)}
                          className="text-slate-400 hover:text-slate-600 p-0.5"
                        >
                          <X size={14} />
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2 rounded-lg text-center mb-2 text-xs">
                        <div>
                          <div className="text-[10px] text-slate-400">当前执行率</div>
                          <div className="font-mono font-bold text-slate-800">{score}%</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400">考核达标基准</div>
                          <div className="font-mono font-bold text-amber-600">≥ 90.0%</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-400">抽检合格/样本</div>
                          <div className="font-mono font-bold text-slate-800">{targetItem.passCount}/{targetItem.samples}</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-1.5 text-[11px] text-slate-600 bg-purple-50/50 p-2 rounded-lg border border-purple-100">
                        <Sparkles size={13} className="text-purple-600 flex-none mt-0.5" />
                        <div>
                          <span className="font-bold text-purple-800">AI质检提升建议：</span>
                          <span>{targetItem.tip}</span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })()}
            </section>
          </div>
      </div>
    </div>
  );
};
