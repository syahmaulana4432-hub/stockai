import React from 'react';
import { GLOBAL_INDICES_DETAILED } from '@/data/mockIndicesHistory';
import { IndexSparkline } from './IndexSparkline';
import { TrendingUp, Activity, Globe, Clock } from 'lucide-react';
import { formatPercent } from '@/lib/utils';
import { BadgeTag } from '../common/BadgeTag';

export function IndicesTicker() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-cyan-400" /> Indeks Pasar Global &amp; Mini Sparkline
        </h2>
        <BadgeTag label="SIMULATED DATA - PHASE 1" size="sm" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {GLOBAL_INDICES_DETAILED.slice(0, 6).map((idx) => {
          const isUp = idx.changePercent >= 0;
          return (
            <div
              key={idx.id}
              className={`p-3 rounded-2xl border transition-all flex flex-col justify-between ${
                idx.id === 'IHSG'
                  ? 'border-cyan-500/50 bg-cyan-950/20 shadow-md ring-1 ring-cyan-500/30'
                  : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-white">{idx.id}</span>
                  <span className="text-[10px] text-slate-400">{idx.country.slice(0, 2).toUpperCase()}</span>
                </div>
                <div className="text-[11px] text-slate-400 truncate mt-0.5">{idx.name}</div>
              </div>

              <div className="mt-2 flex items-end justify-between gap-1">
                <div>
                  <div className="text-xs sm:text-sm font-black text-white font-mono">
                    {idx.value.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                  </div>
                  <div className={`text-[10px] font-bold font-mono ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {isUp ? '+' : ''}{formatPercent(idx.changePercent)}
                  </div>
                </div>

                <div className="shrink-0">
                  <IndexSparkline data={idx.sparkline} isPositive={isUp} width={65} height={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
