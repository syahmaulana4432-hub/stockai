import React from 'react';
import { MOCK_INDICES, MOCK_MACRO } from '@/data/mockMarket';
import { StatCard } from '../common/StatCard';
import { TrendingUp, Coins, DollarSign, Activity, Globe } from 'lucide-react';
import { formatIDR } from '@/lib/utils';

export function IndicesTicker() {
  return (
    <div className="space-y-4">
      {/* Primary Indices: IHSG, LQ45, IDX30 */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-cyan-400" /> Indeks Pasar Saham Utama
          </h2>
          <span className="text-[11px] font-mono text-cyan-400 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">Simulated Market Data (Phase 1)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {MOCK_INDICES.map((idx) => (
            <StatCard
              key={idx.symbol}
              title={idx.symbol}
              value={idx.value.toLocaleString('id-ID', { minimumFractionDigits: 2 })}
              change={idx.change}
              changePercent={idx.changePercent}
              subtitle={idx.name}
              source={idx.source}
              timestamp={idx.updatedAt}
              icon={<TrendingUp className="w-4 h-4 text-cyan-400" />}
              highlight={idx.symbol === 'IHSG'}
            />
          ))}
        </div>
      </div>

      {/* Macro & Commodities: USD/IDR, Gold, Bitcoin */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-indigo-400" /> Kurs Makro & Komoditas Acuan
          </h2>
          <span className="text-[11px] text-slate-500">Bank Indonesia / Antam / Crypto</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {MOCK_MACRO.map((macro) => (
            <StatCard
              key={macro.symbol}
              title={macro.name}
              value={
                macro.symbol === 'USD/IDR'
                  ? `Rp ${macro.value.toLocaleString('id-ID')}`
                  : macro.symbol === 'XAU/IDR'
                  ? `Rp ${macro.value.toLocaleString('id-ID')}/gr`
                  : `Rp ${(macro.value / 1_000_000).toFixed(0)} Jt`
              }
              change={macro.change}
              changePercent={macro.changePercent}
              source={macro.source}
              timestamp={macro.updatedAt}
              icon={
                macro.symbol === 'USD/IDR' ? (
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Coins className="w-4 h-4 text-amber-400" />
                )
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
