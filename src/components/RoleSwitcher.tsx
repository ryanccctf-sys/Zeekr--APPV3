import React from 'react';

export type UserRole = 'store_manager' | 'sales_advisor';

interface RoleSwitcherProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  className?: string;
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({
  currentRole,
  onRoleChange,
  className = ''
}) => {
  return (
    <div className={`inline-flex items-center bg-slate-100/90 p-0.5 rounded-full border border-slate-200/90 shadow-2xs ${className}`}>
      <button
        type="button"
        onClick={() => onRoleChange('store_manager')}
        className={`px-2.5 py-1 text-[11px] font-bold rounded-full transition-all whitespace-nowrap cursor-pointer ${
          currentRole === 'store_manager'
            ? 'bg-[#2563eb] text-white shadow-xs'
            : 'text-slate-500 hover:text-slate-800'
        }`}
        title="切换至门店店长视角"
      >
        门店店长
      </button>
      <button
        type="button"
        onClick={() => onRoleChange('sales_advisor')}
        className={`px-2.5 py-1 text-[11px] font-bold rounded-full transition-all whitespace-nowrap cursor-pointer ${
          currentRole === 'sales_advisor'
            ? 'bg-[#2563eb] text-white shadow-xs'
            : 'text-slate-500 hover:text-slate-800'
        }`}
        title="切换至销售顾问视角"
      >
        销售顾问
      </button>
    </div>
  );
};
