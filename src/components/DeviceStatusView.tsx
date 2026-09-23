import React, { useState } from 'react';
import { 
  Battery, 
  Signal, 
  HardDrive, 
  Power,
  User,
  Search,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { RoleSwitcher, UserRole } from './RoleSwitcher';

interface DeviceStatusViewProps {
  onNavigateToReception?: () => void;
  role?: UserRole;
  onRoleChange?: (role: UserRole) => void;
}

export const WeChatCapsule = () => (
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

// 门店店长视角：全店员工设备监控列表
interface EmployeeDevice {
  id: string;
  name: string;
  roleTitle: string;
  deviceSn: string;
  isPoweredOn: boolean; // 是否开机
  battery: number; // 电量 0-100
  signalOperator: string; // 4G网络与运营商
  signalLevel: number; // 1-4
  signalQuality: string;
  storageUsed: number; // 已用 GB
  storageTotal: number; // 总量 GB
  lastSync: string;
}

const MOCK_EMPLOYEE_DEVICES: EmployeeDevice[] = [
  {
    id: 'emp-1',
    name: '徐浩峰',
    roleTitle: '极氪伙伴 / 资深顾问',
    deviceSn: 'ZK-REC-081',
    isPoweredOn: true,
    battery: 92,
    signalOperator: '中国移动 4G',
    signalLevel: 4,
    signalQuality: '极佳 (-72dBm)',
    storageUsed: 10.6,
    storageTotal: 32,
    lastSync: '1分钟前'
  },
  {
    id: 'emp-2',
    name: '李明宇',
    roleTitle: '产品专家',
    deviceSn: 'ZK-REC-082',
    isPoweredOn: true,
    battery: 78,
    signalOperator: '中国联通 4G',
    signalLevel: 3,
    signalQuality: '良好 (-84dBm)',
    storageUsed: 15.2,
    storageTotal: 32,
    lastSync: '3分钟前'
  },
  {
    id: 'emp-3',
    name: '赵欣怡',
    roleTitle: '极氪伙伴',
    deviceSn: 'ZK-REC-083',
    isPoweredOn: true,
    battery: 45,
    signalOperator: '中国移动 4G',
    signalLevel: 4,
    signalQuality: '极佳 (-70dBm)',
    storageUsed: 20.8,
    storageTotal: 32,
    lastSync: '刚刚'
  },
  {
    id: 'emp-4',
    name: '周子墨',
    roleTitle: '销售顾问',
    deviceSn: 'ZK-REC-084',
    isPoweredOn: true,
    battery: 15, // 低电
    signalOperator: '中国电信 4G',
    signalLevel: 2,
    signalQuality: '中等 (-92dBm)',
    storageUsed: 23.5,
    storageTotal: 32,
    lastSync: '5分钟前'
  },
  {
    id: 'emp-5',
    name: '陈安琪',
    roleTitle: '客户体验官',
    deviceSn: 'ZK-REC-085',
    isPoweredOn: true,
    battery: 89,
    signalOperator: '中国移动 4G',
    signalLevel: 4,
    signalQuality: '极佳 (-75dBm)',
    storageUsed: 7.9,
    storageTotal: 32,
    lastSync: '刚刚'
  },
  {
    id: 'emp-6',
    name: '王浩然',
    roleTitle: '极氪伙伴 (调休)',
    deviceSn: 'ZK-REC-086',
    isPoweredOn: false, // 关机
    battery: 0,
    signalOperator: '无信号',
    signalLevel: 0,
    signalQuality: '离线',
    storageUsed: 12.5,
    storageTotal: 32,
    lastSync: '昨日 18:30'
  }
];

export const DeviceStatusView: React.FC<DeviceStatusViewProps> = ({
  role = 'store_manager',
  onRoleChange
}) => {
  const [filter, setFilter] = useState<'all' | 'on' | 'off' | 'lowBattery'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const filteredEmployees = MOCK_EMPLOYEE_DEVICES.filter(emp => {
    if (searchTerm && !emp.name.includes(searchTerm) && !emp.roleTitle.includes(searchTerm)) {
      return false;
    }
    if (filter === 'on') return emp.isPoweredOn;
    if (filter === 'off') return !emp.isPoweredOn;
    if (filter === 'lowBattery') return emp.battery <= 20 && emp.isPoweredOn;
    return true;
  });

  const onlineCount = MOCK_EMPLOYEE_DEVICES.filter(e => e.isPoweredOn).length;
  const offCount = MOCK_EMPLOYEE_DEVICES.filter(e => !e.isPoweredOn).length;
  const lowBatteryCount = MOCK_EMPLOYEE_DEVICES.filter(e => e.isPoweredOn && e.battery <= 20).length;

  // 1. 如果是销售顾问角色：呈现原有的4张卡片页面（顾问个人设备状态）
  if (role === 'sales_advisor') {
    return (
      <div className="flex-1 flex flex-col min-h-0 bg-slate-50 relative overflow-y-auto pb-24">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-3.5 py-2.5 flex items-center justify-between border-b border-slate-100 shadow-2xs">
          <div className="w-[140px] flex-none"></div>
          <h1 className="text-base font-bold text-slate-800 text-center flex-1">设备状态</h1>
          <div className="w-[140px] flex-none flex justify-end">
            {onRoleChange && (
              <RoleSwitcher currentRole={role} onRoleChange={onRoleChange} />
            )}
          </div>
        </header>

        {/* 销售顾问个人设备当前状态 */}
        <div className="p-4">
          <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-3 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                顾问
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">当前工牌录音设备</div>
                <div className="text-[11px] text-slate-500 font-mono">SN: ZK-REC-081 · 徐浩峰</div>
              </div>
            </div>
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              在线正常
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* 1. 设备电量 */}
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Battery size={16} />
                </div>
                <span className="text-xs font-bold text-slate-700">设备电量</span>
              </div>

              <div className="mt-3.5">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-800 tracking-tight">88</span>
                  <span className="text-xs font-bold text-slate-400">%</span>
                </div>
                {/* Battery Bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden p-0.5">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                    style={{ width: '88%' }}
                  ></div>
                </div>
              </div>
            </div>

            {/* 2. 4G信号 */}
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Signal size={16} />
                </div>
                <span className="text-xs font-bold text-slate-700">4G信号</span>
              </div>

              <div className="mt-3.5">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-800 tracking-tight">4</span>
                  <span className="text-xs font-bold text-slate-400">/ 4格</span>
                </div>
                {/* Signal Bars Graphic */}
                <div className="flex items-center gap-1 mt-2 h-2">
                  {[1, 2, 3, 4].map(bar => (
                    <div 
                      key={bar}
                      className="flex-1 h-full rounded-full bg-blue-500"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* 3. 存储空间 */}
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-7 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <HardDrive size={16} />
                </div>
                <span className="text-xs font-bold text-slate-700">存储空间</span>
              </div>

              <div className="mt-3.5">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-800 tracking-tight">18.6</span>
                  <span className="text-xs font-bold text-slate-400">/ 32 GB</span>
                </div>
                {/* Storage Bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden flex">
                  <div 
                    className="bg-amber-500 h-full rounded-full transition-all duration-500" 
                    style={{ width: '58%' }}
                  ></div>
                </div>
              </div>
            </div>

            {/* 4. 是否开机 */}
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-7 h-7 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Power size={16} />
                </div>
                <span className="text-xs font-bold text-slate-700">是否开机</span>
              </div>

              <div className="mt-3.5">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-emerald-600 tracking-tight">已开机</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden flex">
                  <div className="bg-emerald-500 h-full rounded-full w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. 门店店长视角：每一个员工的列表，列表中呈现出电量、4G信号、存储空间、是否开机
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50 relative overflow-y-auto pb-24">
      {/* Top Header with Role Switcher */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-3.5 py-2.5 flex items-center justify-between border-b border-slate-100 shadow-2xs">
        <div className="w-[140px] flex-none"></div>
        <h1 className="text-base font-bold text-slate-800 text-center flex-1">设备状态</h1>
        <div className="w-[140px] flex-none flex justify-end">
          {onRoleChange && (
            <RoleSwitcher currentRole={role} onRoleChange={onRoleChange} />
          )}
        </div>
      </header>

      <div className="p-4 space-y-3.5">
        {/* 店长设备监控总览卡片 */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-600"></div>
              <span className="text-sm font-bold text-slate-800">极氪门店员工设备状态</span>
              <span className="text-[11px] text-slate-400 font-medium">({MOCK_EMPLOYEE_DEVICES.length}人)</span>
            </div>
            <button 
              onClick={handleRefresh}
              className="text-slate-400 hover:text-blue-600 text-xs flex items-center gap-1 transition-colors p-1"
              title="刷新实时状态"
            >
              <RefreshCw size={13} className={isRefreshing ? 'animate-spin text-blue-600' : ''} />
              <span>刷新</span>
            </button>
          </div>

          {/* Quick status counters */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`p-2 rounded-xl text-left transition-all border ${
                filter === 'all' 
                  ? 'bg-blue-50/80 border-blue-200 text-blue-900 shadow-2xs' 
                  : 'bg-slate-50 border-slate-100 text-slate-700 hover:bg-slate-100/70'
              }`}
            >
              <div className="text-[11px] text-slate-500 font-medium">全部设备</div>
              <div className="text-lg font-black text-slate-900">{MOCK_EMPLOYEE_DEVICES.length} <span className="text-xs font-normal text-slate-500">台</span></div>
            </button>
            <button
              onClick={() => setFilter('on')}
              className={`p-2 rounded-xl text-left transition-all border ${
                filter === 'on' 
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900 shadow-2xs' 
                  : 'bg-slate-50 border-slate-100 text-slate-700 hover:bg-slate-100/70'
              }`}
            >
              <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>已开机
              </div>
              <div className="text-lg font-black text-emerald-700">{onlineCount} <span className="text-xs font-normal text-slate-500">台</span></div>
            </button>
            <button
              onClick={() => setFilter('lowBattery')}
              className={`p-2 rounded-xl text-left transition-all border ${
                filter === 'lowBattery' 
                  ? 'bg-amber-50/80 border-amber-200 text-amber-900 shadow-2xs' 
                  : 'bg-slate-50 border-slate-100 text-slate-700 hover:bg-slate-100/70'
              }`}
            >
              <div className="text-[11px] text-amber-600 font-medium flex items-center gap-1">
                <AlertTriangle size={11} />低电预警
              </div>
              <div className="text-lg font-black text-amber-600">{lowBatteryCount} <span className="text-xs font-normal text-slate-500">台</span></div>
            </button>
          </div>
        </div>

        {/* 员工列表 Header */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <User size={15} className="text-slate-500" />
            <span className="text-xs font-bold text-slate-700">员工设备明细列表</span>
          </div>
          <span className="text-[11px] text-slate-400">电量 · 4G信号 · 存储 · 是否开机</span>
        </div>

        {/* 员工设备卡片列表 */}
        <div className="space-y-3">
          {filteredEmployees.map((emp) => {
            const storagePercent = Math.round((emp.storageUsed / emp.storageTotal) * 100);
            const isLowBat = emp.battery <= 20 && emp.isPoweredOn;

            return (
              <div
                key={emp.id}
                className={`bg-white rounded-2xl p-4 border transition-all shadow-xs ${
                  isLowBat 
                    ? 'border-amber-200 bg-amber-50/10' 
                    : !emp.isPoweredOn 
                    ? 'border-slate-200 bg-slate-50/40 opacity-90' 
                    : 'border-slate-200/80 hover:border-blue-200'
                }`}
              >
                {/* 员工基本信息与开机状态 */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-2xs ${
                      emp.isPoweredOn 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-slate-200 text-slate-600'
                    }`}>
                      {emp.name[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-slate-900">{emp.name}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        设备SN: {emp.deviceSn}
                      </div>
                    </div>
                  </div>

                  {/* 是否开机 状态徽章 */}
                  <div>
                    {emp.isPoweredOn ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full shadow-2xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        已开机
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                        已关机
                      </span>
                    )}
                  </div>
                </div>

                {/* 4项核心设备状态指标：电量、4G信号、存储空间、是否开机 */}
                <div className="grid grid-cols-3 gap-2.5 pt-3">
                  {/* 1. 电量 */}
                  <div className={`p-2.5 rounded-xl border ${
                    !emp.isPoweredOn 
                      ? 'bg-slate-50/70 border-slate-100' 
                      : isLowBat 
                      ? 'bg-amber-50/80 border-amber-200' 
                      : 'bg-slate-50/70 border-slate-100'
                  }`}>
                    <div className="flex items-center text-slate-500 mb-1">
                      <span className="text-[10px] font-bold text-slate-600 flex items-center gap-1">
                        <Battery size={13} className={isLowBat ? 'text-amber-600' : emp.isPoweredOn ? 'text-emerald-600' : 'text-slate-400'} />
                        电量
                      </span>
                    </div>
                    <div className="flex items-baseline gap-0.5">
                      <span className={`text-base font-black tracking-tight ${
                        !emp.isPoweredOn ? 'text-slate-400' : isLowBat ? 'text-amber-600' : 'text-slate-800'
                      }`}>
                        {emp.isPoweredOn ? emp.battery : 0}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">%</span>
                    </div>
                    <div className="w-full bg-slate-200/80 h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          !emp.isPoweredOn 
                            ? 'bg-slate-300' 
                            : isLowBat 
                            ? 'bg-amber-500' 
                            : 'bg-emerald-500'
                        }`}
                        style={{ width: `${emp.isPoweredOn ? emp.battery : 0}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* 2. 4G信号 */}
                  <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-100">
                    <div className="flex items-center text-slate-500 mb-1">
                      <span className="text-[10px] font-bold text-slate-600 flex items-center gap-1">
                        <Signal size={13} className={emp.isPoweredOn ? 'text-blue-600' : 'text-slate-400'} />
                        4G信号
                      </span>
                    </div>
                    <div className="flex items-baseline gap-0.5">
                      <span className={`text-base font-black tracking-tight ${emp.isPoweredOn ? 'text-slate-800' : 'text-slate-400'}`}>
                        {emp.isPoweredOn ? emp.signalLevel : 0}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">/ 4格</span>
                    </div>
                    <div className="flex items-end gap-1 h-1.5 mt-1.5">
                      {[1, 2, 3, 4].map(bar => (
                        <div
                          key={bar}
                          className={`flex-1 h-full rounded-full ${
                            emp.isPoweredOn && bar <= emp.signalLevel ? 'bg-blue-500' : 'bg-slate-200/80'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* 3. 存储空间 */}
                  <div className="p-2.5 rounded-xl bg-slate-50/70 border border-slate-100">
                    <div className="flex items-center text-slate-500 mb-1">
                      <span className="text-[10px] font-bold text-slate-600 flex items-center gap-1">
                        <HardDrive size={13} className="text-indigo-600" />
                        存储空间
                      </span>
                    </div>
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-base font-black tracking-tight text-slate-800">
                        {emp.storageUsed}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">/ {emp.storageTotal}G</span>
                    </div>
                    <div className="w-full bg-slate-200/80 h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-indigo-500"
                        style={{ width: `${storagePercent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* 卡片底栏：同步状态与开关机指示 */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Power size={11} className={emp.isPoweredOn ? 'text-emerald-500' : 'text-slate-400'} />
                    <span>状态: {emp.isPoweredOn ? '已开机正常运行' : '已关机断电'}</span>
                  </div>
                  <span>上次同步: {emp.lastSync}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
