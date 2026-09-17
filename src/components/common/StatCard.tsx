import React from 'react';
import { cn, formatPercent } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changePercent?: number;
  subtitle?: string;
  source?: string;
  timestamp?: string;
  icon?: React.ReactNode;
  className?: string;
  highlight?: boolean;
}

export function StatCard({
  title,
  value,
  change,
  changePercent,
  subtitle,
  source,
  timestamp,
  icon,
  className,
  highlight = false,
}: StatCardProps) {
  const isPositive = (changePercent !== undefined && changePercent > 0) || (change !== undefined && change > 0);
  const isNegative = (changePercent !== undefined && changePercent < 0) || (change !== undefined && change < 0);

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/80 p-4 backdrop-blur-sm transition-all hover:border-slate-700 hover:shadow-lg hover:shadow-cyan-950/20',
        highlight && 'border-indigo-500/40 bg-gradient-to-br from-slate-900 to-indigo-950/30',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
            {title}
          </span>
          <div className="text-xl font-bold tracking-tight text-white">{value}</div>
        </div>
        {icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/50">
            {icon}
          </div>
        )}
      </div>

      {(changePercent !== undefined || change !== undefined || subtitle) && (
        <div className="mt-3 flex items-center justify-between border-t border-slate-800/60 pt-2.5 text-xs">
          {changePercent !== undefined ? (
            <div
              className={cn(
                'flex items-center gap-1 font-semibold',
                isPositive && 'text-emerald-400',
                isNegative && 'text-rose-400',
                !isPositive && !isNegative && 'text-slate-400'
              )}
            >
              {isPositive && <TrendingUp className="h-3.5 w-3.5" />}
              {isNegative && <TrendingDown className="h-3.5 w-3.5" />}
              {!isPositive && !isNegative && <Minus className="h-3.5 w-3.5" />}
              <span>{formatPercent(changePercent)}</span>
              {change !== undefined && (
                <span className="text-slate-500 font-normal">
                  ({change > 0 ? `+${change}` : change})
                </span>
              )}
            </div>
          ) : (
            <span className="text-slate-400">{subtitle}</span>
          )}

          {source && (
            <span className="text-[10px] text-slate-500 truncate max-w-[120px]" title={source}>
              {source}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
