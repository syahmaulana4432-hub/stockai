'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Stock } from '@/lib/types';
import { TOP_GAINERS, TOP_LOSERS, VOLUME_LEADERS } from '@/data/mockMarket';
import { formatIDR, formatPercent, formatVolume } from '@/lib/utils';
import { TrendingUp, TrendingDown, Flame, ArrowUpRight } from 'lucide-react';

export function MoversTable() {
  const [activeTab, setActiveTab] = useState<'gainers' | 'losers' | 'volume'>('gainers');

  const stocks: Stock[] =
    activeTab === 'gainers'
      ? TOP_GAINERS
      : activeTab === 'losers'
      ? TOP_LOSERS
      : VOLUME_LEADERS;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl backdrop-blur-md">
      {/* Header & Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-amber-400" /> Penggerak Pasar Terkini (Market Movers)
        </h3>

        <div className="flex items-center gap-1 text-xs bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab('gainers')}
            className={`px-3 py-1 rounded-md transition-all font-medium flex items-center gap-1 ${
              activeTab === 'gainers'
                ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" /> Top Gainers
          </button>
          <button
            onClick={() => setActiveTab('losers')}
            className={`px-3 py-1 rounded-md transition-all font-medium flex items-center gap-1 ${
              activeTab === 'losers'
                ? 'bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingDown className="w-3.5 h-3.5" /> Top Losers
          </button>
          <button
            onClick={() => setActiveTab('volume')}
            className={`px-3 py-1 rounded-md transition-all font-medium flex items-center gap-1 ${
              activeTab === 'volume'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Flame className="w-3.5 h-3.5" /> Volume Leaders
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-2">
        <table className="w-full text-xs text-left">
          <thead className="text-slate-400 font-semibold border-b border-slate-800/80">
            <tr>
              <th className="py-2.5 px-3">Ticker</th>
              <th className="py-2.5 px-3">Nama Perusahaan</th>
              <th className="py-2.5 px-3 text-right">Harga</th>
              <th className="py-2.5 px-3 text-right">Perubahan</th>
              <th className="py-2.5 px-3 text-right">Volume (Lot)</th>
              <th className="py-2.5 px-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {stocks.map((stock) => {
              const isUp = stock.changePercent >= 0;
              return (
                <tr key={stock.ticker} className="hover:bg-slate-800/40 transition-colors group">
                  <td className="py-2.5 px-3 font-mono font-bold text-white group-hover:text-cyan-400">
                    {stock.ticker}
                  </td>
                  <td className="py-2.5 px-3 text-slate-300 truncate max-w-[180px]">
                    {stock.name}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-semibold text-white">
                    {formatIDR(stock.price)}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono">
                    <span
                      className={`inline-flex items-center gap-1 font-semibold ${
                        isUp ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {isUp ? '+' : ''}
                      {stock.changePercent.toFixed(2)}%
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-400">
                    {formatVolume(stock.volume, 'lot')}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <Link
                      href={`/analysis/${stock.ticker}`}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 px-2 py-1 rounded-md"
                    >
                      <span>Analisis</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
