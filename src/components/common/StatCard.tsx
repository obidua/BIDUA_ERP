import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: number;
  changeLabel?: string;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'gray';
  onClick?: () => void;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  change,
  changeLabel,
  color = 'blue',
  onClick,
}: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    red: 'bg-red-50 text-red-600',
    purple: 'bg-purple-50 text-purple-600',
    gray: 'bg-gray-50 text-gray-600',
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${
        onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change !== undefined && (
            <div className="mt-2 flex items-center gap-1 text-sm">
              {change >= 0 ? (
                <>
                  <TrendingUp size={16} className="text-green-600" />
                  <span className="text-green-600 font-medium">+{change}%</span>
                </>
              ) : (
                <>
                  <TrendingDown size={16} className="text-red-600" />
                  <span className="text-red-600 font-medium">{change}%</span>
                </>
              )}
              {changeLabel && <span className="text-gray-500 ml-1">{changeLabel}</span>}
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}
