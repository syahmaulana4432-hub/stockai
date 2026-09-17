import React from 'react';
import Link from 'next/link';
import { MOCK_STOCKS } from '@/data/mockStocks';
import { formatIDR, formatPercent, formatMarketCap } from '@/lib/utils';
import { Sparkles, ArrowRight, Search, BarChart2 } from 'lucide-react';
import { BadgeTag } from '@/components/common/BadgeTag';

export default function AnalysisIndexPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-cyan-400" /> Analisis Saham & AI Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Pilih emiten di bawah ini untuk melihat analisis teknikal komputasional, laporan fundamental, dan skenario AI.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_STOCKS.map((stock) => (
          <Link
            key={stock.ticker}
            href={`/analysis/${stock.ticker}`}
            className="group rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg backdrop-blur-sm transition-all hover:border-cyan-500/40 hover:bg-slate-900 hover:shadow-cyan-950/20 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 text-cyan-400 font-black text-sm flex items-center justify-center border border-slate-700">
                    {stock.ticker}
                  </div>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {stock.ticker}
                    </h3>
                    <span className="text-[11px] text-slate-400">{stock.sector}</span>
                  </div>
                </div>

                <BadgeTag
                  label={stock.changePercent >= 0 ? 'BULLISH' : 'BEARISH'}
                  size="sm"
                />
              </div>

              <p className="text-xs text-slate-300 line-clamp-2">{stock.name}</p>

              <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-mono border-t border-slate-800/80">
                <div>
                  <span className="text-[10px] text-slate-500 font-sans block">Harga Terkini</span>
                  <span className="font-bold text-white">{formatIDR(stock.price)}</span>
                  <span
                    className={`text-[10px] ml-1.5 ${
                      stock.changePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {formatPercent(stock.changePercent)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 font-sans block">PER / PBV</span>
                  <span className="text-slate-300">
                    {stock.pe}x / {stock.pbv}x
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-800/60 text-xs font-semibold text-cyan-400">
              <span>Buka Analisis Lengkap</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
