'use client';

import React, { useState } from 'react';
import { formatPercent } from '@/lib/utils';
import { Layers, TrendingUp, BarChart3, Globe } from 'lucide-react';
import { BadgeTag } from '@/components/common/BadgeTag';

interface SectorItem {
  name: string;
  code: string;
  changePercent: number;
  marketWeight: number; // in %
  topDriver: string;
  breadth: { advance: number; decline: number; unchanged: number };
}

export function GlobalSectorHeatmap() {
  const [region, setRegion] = useState<'ID' | 'US' | 'GLOBAL'>('GLOBAL');

  const sectors: Record<'ID' | 'US' | 'GLOBAL', SectorItem[]> = {
    GLOBAL: [
      { name: 'Technology & AI', code: 'TECH', changePercent: 1.62, marketWeight: 31, topDriver: 'NVDA (+2.2%), AAPL (+1.4%)', breadth: { advance: 48, decline: 12, unchanged: 4 } },
      { name: 'Financials & Banking', code: 'FIN', changePercent: 0.84, marketWeight: 18, topDriver: 'BBCA (+1.2%), JPM (+0.9%)', breadth: { advance: 36, decline: 18, unchanged: 6 } },
      { name: 'Consumer Discretionary', code: 'COND', changePercent: 0.35, marketWeight: 12, topDriver: '7203 (+1.5%), AMZN (+0.8%)', breadth: { advance: 24, decline: 20, unchanged: 5 } },
      { name: 'Communication Services', code: 'COMM', changePercent: 0.65, marketWeight: 9, topDriver: 'TLKM (+0.6%), GOOGL (+1.1%)', breadth: { advance: 18, decline: 10, unchanged: 2 } },
      { name: 'Healthcare & Pharma', code: 'HLTH', changePercent: -0.28, marketWeight: 10, topDriver: 'KLBF (-0.5%), LLY (+0.3%)', breadth: { advance: 14, decline: 22, unchanged: 4 } },
      { name: 'Energy & Commodities', code: 'ENGY', changePercent: -0.92, marketWeight: 8, topDriver: 'ADRO (-1.2%), XOM (-0.8%)', breadth: { advance: 9, decline: 28, unchanged: 3 } },
      { name: 'Basic Materials', code: 'MATR', changePercent: 0.15, marketWeight: 6, topDriver: 'BRPT (+0.8%), LIN (+0.2%)', breadth: { advance: 12, decline: 14, unchanged: 4 } },
      { name: 'Industrials & Heavy Eq', code: 'INDU', changePercent: -0.45, marketWeight: 6, topDriver: 'ASII (-1.3%), CAT (+0.4%)', breadth: { advance: 16, decline: 21, unchanged: 3 } }
    ],
    ID: [
      { name: 'Financials (Keuangan)', code: 'IDXFIN', changePercent: 0.78, marketWeight: 38, topDriver: 'BBCA (+1.2%), BBRI (-0.4%)', breadth: { advance: 28, decline: 14, unchanged: 5 } },
      { name: 'Infrastruktur & Telco', code: 'IDXINFRA', changePercent: 0.52, marketWeight: 14, topDriver: 'TLKM (+0.6%), ISAT (+1.8%)', breadth: { advance: 16, decline: 8, unchanged: 4 } },
      { name: 'Energy (Energi & Tambang)', code: 'IDXENERGY', changePercent: -0.84, marketWeight: 16, topDriver: 'ADRO (-1.2%), PTBA (-0.8%)', breadth: { advance: 8, decline: 22, unchanged: 3 } },
      { name: 'Consumer Cyclical', code: 'IDXCYCLIC', changePercent: -0.65, marketWeight: 11, topDriver: 'ASII (-1.3%), AUTO (+0.5%)', breadth: { advance: 12, decline: 19, unchanged: 4 } },
      { name: 'Consumer Non-Cyclical', code: 'IDXNONCYC', changePercent: 0.22, marketWeight: 12, topDriver: 'ICBP (+0.9%), UNVR (+0.2%)', breadth: { advance: 15, decline: 11, unchanged: 6 } },
      { name: 'Basic Materials', code: 'IDXBASIC', changePercent: 0.18, marketWeight: 9, topDriver: 'BRPT (+0.8%), INCO (+0.4%)', breadth: { advance: 10, decline: 12, unchanged: 3 } }
    ],
    US: [
      { name: 'Technology (XLK)', code: 'XLK', changePercent: 1.74, marketWeight: 32, topDriver: 'NVDA (+2.2%), AAPL (+1.4%)', breadth: { advance: 54, decline: 11, unchanged: 2 } },
      { name: 'Financials (XLF)', code: 'XLF', changePercent: 0.92, marketWeight: 13, topDriver: 'JPM (+0.9%), BAC (+1.1%)', breadth: { advance: 48, decline: 18, unchanged: 4 } },
      { name: 'Communication (XLC)', code: 'XLC', changePercent: 1.15, marketWeight: 9, topDriver: 'GOOGL (+1.1%), META (+1.4%)', breadth: { advance: 19, decline: 4, unchanged: 1 } },
      { name: 'Consumer Discret. (XLY)', code: 'XLY', changePercent: 0.48, marketWeight: 11, topDriver: 'AMZN (+0.8%), TSLA (+0.4%)', breadth: { advance: 32, decline: 21, unchanged: 3 } },
      { name: 'Energy (XLE)', code: 'XLE', changePercent: -1.10, marketWeight: 4, topDriver: 'XOM (-0.8%), CVX (-1.3%)', breadth: { advance: 5, decline: 20, unchanged: 1 } },
      { name: 'Healthcare (XLV)', code: 'XLV', changePercent: -0.32, marketWeight: 12, topDriver: 'UNH (-0.9%), LLY (+0.3%)', breadth: { advance: 22, decline: 38, unchanged: 5 } }
    ]
  };

  const activeSectors = sectors[region];

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 shadow-2xl backdrop-blur-md space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 uppercase tracking-wider">
              <BarChart3 className="w-4 h-4 text-cyan-400" /> Sektor &amp; Market Breadth Heatmap
            </span>
            <BadgeTag label="MULTI-EXCHANGE" size="sm" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
            Rotasi Arus Modal Sektoral
          </h3>
        </div>

        {/* Region Switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setRegion('GLOBAL')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              region === 'GLOBAL' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            🌍 Global
          </button>
          <button
            onClick={() => setRegion('ID')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              region === 'ID' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            🇮🇩 IDX BEI
          </button>
          <button
            onClick={() => setRegion('US')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              region === 'US' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            🇺🇸 US Market
          </button>
        </div>
      </div>

      {/* Sektor Heatmap Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {activeSectors.map(sec => {
          const isUp = sec.changePercent >= 0;
          return (
            <div
              key={sec.code}
              className={`p-3.5 rounded-2xl border transition-all ${
                isUp
                  ? 'border-emerald-500/30 bg-emerald-950/20 hover:border-emerald-500/50'
                  : 'border-rose-500/30 bg-rose-950/20 hover:border-rose-500/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-white truncate max-w-[140px]">{sec.name}</span>
                <span className={`text-xs font-mono font-bold ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isUp ? '+' : ''}{formatPercent(sec.changePercent)}
                </span>
              </div>

              {/* Progress bar representing weight / strength */}
              <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden my-2">
                <div
                  className={`h-full rounded-full ${isUp ? 'bg-emerald-400' : 'bg-rose-400'}`}
                  style={{ width: `${Math.min(100, Math.max(15, Math.abs(sec.changePercent) * 35))}%` }}
                />
              </div>

              <div className="text-[11px] text-slate-300 truncate">
                <span className="text-slate-500">Top: </span>{sec.topDriver}
              </div>

              {/* Breadth pills */}
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60 text-[10px] text-slate-400 font-mono">
                <span className="text-emerald-400">▲ {sec.breadth.advance} Naik</span>
                <span className="text-rose-400">▼ {sec.breadth.decline} Turun</span>
                <span className="text-slate-400">● {sec.breadth.unchanged}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
