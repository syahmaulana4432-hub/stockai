import React from 'react';
import Link from 'next/link';
import { MOCK_INDICES, MOCK_MACRO, SECTOR_PERFORMANCE } from '@/data/mockMarket';
import { MOCK_STOCKS } from '@/data/mockStocks';
import { IndicesTicker } from '@/components/market/IndicesTicker';
import { MoversTable } from '@/components/market/MoversTable';
import { MarketSentimentGauge } from '@/components/market/MarketSentimentGauge';
import { DisclaimerBanner } from '@/components/common/DisclaimerBanner';
import { BadgeTag } from '@/components/common/BadgeTag';
import { formatIDR, formatPercent, formatVolume, formatMarketCap } from '@/lib/utils';
import {
  TrendingUp,
  Activity,
  Layers,
  ArrowUpRight,
  Sparkles,
  PieChart,
  BarChart3,
} from 'lucide-react';

export default function MarketPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-md bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold text-cyan-400 border border-cyan-500/20 mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>IDX Live Dashboard (Simulasi Phase 1)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Market Overview & Sektoral BEI
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Pantauan komprehensif indeks komposit, kinerja sektoral, dan likuiditas pasar modal Indonesia.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <BadgeTag label="FACT" size="md" />
        </div>
      </div>

      <DisclaimerBanner mode="compact" />

      {/* Primary Indices & Macro */}
      <IndicesTicker />

      {/* Sector Performance Grid */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-cyan-400" /> Performa Sektor Industri (IDX Sectors)
          </h2>
          <span className="text-xs text-slate-400">9 Sektor Utama</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {SECTOR_PERFORMANCE.map((sec) => (
            <div
              key={sec.name}
              className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3 hover:border-slate-700 transition-colors"
            >
              <div className="text-xs font-semibold text-slate-300 truncate">{sec.name}</div>
              <div
                className={`text-base font-bold font-mono mt-1 ${
                  sec.isPositive ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {formatPercent(sec.changePercent)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Movers + Sentiment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MoversTable />
        </div>
        <div>
          <MarketSentimentGauge />
        </div>
      </div>

      {/* Complete Stock List Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl backdrop-blur-md space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" /> Daftar Emiten Terpantau (Mock Watchlist)
            </h2>
            <p className="text-xs text-slate-400">
              12 emiten berkapitalisasi besar dan likuid dengan data lengkap
            </p>
          </div>
          <Link
            href="/screener"
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 px-3 py-1.5 rounded-lg"
          >
            Buka Screener Lanjutan →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-slate-400 font-semibold border-b border-slate-800 bg-slate-950/40">
              <tr>
                <th className="p-3">Ticker</th>
                <th className="p-3">Nama Emiten</th>
                <th className="p-3">Sektor</th>
                <th className="p-3 text-right">Harga</th>
                <th className="p-3 text-right">Perubahan</th>
                <th className="p-3 text-right">PER</th>
                <th className="p-3 text-right">PBV</th>
                <th className="p-3 text-right">Market Cap</th>
                <th className="p-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {MOCK_STOCKS.map((s) => (
                <tr key={s.ticker} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="p-3 font-bold text-white group-hover:text-cyan-400">
                    {s.ticker}
                  </td>
                  <td className="p-3 font-sans text-slate-300 max-w-[180px] truncate">
                    {s.name}
                  </td>
                  <td className="p-3 font-sans text-slate-400">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                      {s.sector}
                    </span>
                  </td>
                  <td className="p-3 text-right font-bold text-white">
                    {formatIDR(s.price)}
                  </td>
                  <td
                    className={`p-3 text-right font-bold ${
                      s.changePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {formatPercent(s.changePercent)}
                  </td>
                  <td className="p-3 text-right text-slate-300">{s.pe}x</td>
                  <td className="p-3 text-right text-slate-300">{s.pbv}x</td>
                  <td className="p-3 text-right text-slate-400">{formatMarketCap(s.marketCap)}</td>
                  <td className="p-3 text-right font-sans">
                    <Link
                      href={`/analysis/${s.ticker}`}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 px-2.5 py-1 rounded-md"
                    >
                      <span>Analisis</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
