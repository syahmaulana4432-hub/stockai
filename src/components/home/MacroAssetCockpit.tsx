'use client';

import React from 'react';
import { DollarSign, Flame, Fuel, Coins, Landmark, TrendingUp, TrendingDown } from 'lucide-react';
import { formatPercent } from '@/lib/utils';
import { BadgeTag } from '@/components/common/BadgeTag';

interface AssetQuote {
  name: string;
  category: 'Forex' | 'Commodity' | 'Bonds & Rates';
  symbol: string;
  value: string;
  changePercent: number;
  icon: string;
}

export function MacroAssetCockpit() {
  const assets: AssetQuote[] = [
    { name: 'USD / IDR', category: 'Forex', symbol: 'USDIDR', value: 'Rp 15.340', changePercent: -0.25, icon: '💵' },
    { name: 'EUR / USD', category: 'Forex', symbol: 'EURUSD', value: '$1.108', changePercent: 0.18, icon: '💶' },
    { name: 'USD / JPY', category: 'Forex', symbol: 'USDJPY', value: '¥141.20', changePercent: -0.42, icon: '💴' },
    { name: 'Emas (Gold Spot)', category: 'Commodity', symbol: 'XAUUSD', value: '$2,580/oz', changePercent: 0.65, icon: '🥇' },
    { name: 'Minyak Mentah Brent', category: 'Commodity', symbol: 'BRENT', value: '$73.20/bbl', changePercent: -1.15, icon: '🛢️' },
    { name: 'Minyak Sawit (CPO)', category: 'Commodity', symbol: 'FCPO', value: 'MYR 3,920/T', changePercent: 0.82, icon: '🌴' },
    { name: 'US 10-Year Treasury', category: 'Bonds & Rates', symbol: 'US10Y', value: '3.65%', changePercent: -0.05, icon: '🏛️' },
    { name: 'BI 7-Day Reverse Repo', category: 'Bonds & Rates', symbol: 'BI7DRR', value: '6.00%', changePercent: 0.00, icon: '🏦' }
  ];

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 shadow-2xl backdrop-blur-md space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
            Macro &amp; Global Cross-Asset Cockpit
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
            Mata Uang, Komoditas &amp; Suku Bunga Acuan
          </h3>
        </div>
        <BadgeTag label="CROSS-ASSET" size="sm" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {assets.map((item) => {
          const isUp = item.changePercent >= 0;
          return (
            <div
              key={item.symbol}
              className="p-3 rounded-2xl border border-slate-800 bg-slate-950/50 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span>{item.icon}</span>
                  <span className="font-semibold text-slate-300">{item.name}</span>
                </span>
                <span className="text-[10px] text-slate-500 font-mono">{item.category}</span>
              </div>
              <div className="mt-2 flex items-baseline justify-between font-mono">
                <span className="text-sm sm:text-base font-bold text-white">{item.value}</span>
                <span className={`text-xs font-semibold ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isUp ? '+' : ''}{formatPercent(item.changePercent)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
