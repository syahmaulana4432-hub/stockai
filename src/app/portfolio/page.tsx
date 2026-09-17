'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_STOCKS } from '@/data/mockStocks';
import { DisclaimerBanner } from '@/components/common/DisclaimerBanner';
import { BadgeTag } from '@/components/common/BadgeTag';
import { formatIDR, formatPercent, formatVolume } from '@/lib/utils';
import {
  Briefcase,
  TrendingUp,
  TrendingDown,
  Plus,
  ArrowUpRight,
  Shield,
  Coins,
  History,
} from 'lucide-react';

interface PaperPosition {
  ticker: string;
  name: string;
  shares: number; // in lembar
  avgBuyPrice: number;
  currentPrice: number;
}

export default function PortfolioPage() {
  const [cashBalance, setCashBalance] = useState<number>(50000000); // 50 Jt cash
  const [positions, setPositions] = useState<PaperPosition[]>([
    {
      ticker: 'BBCA',
      name: 'PT Bank Central Asia Tbk',
      shares: 2000, // 20 lot
      avgBuyPrice: 9800,
      currentPrice: 10250,
    },
    {
      ticker: 'BMRI',
      name: 'PT Bank Mandiri (Persero) Tbk',
      shares: 3000, // 30 lot
      avgBuyPrice: 6300,
      currentPrice: 6650,
    },
    {
      ticker: 'ADRO',
      name: 'PT Adaro Energy Indonesia Tbk',
      shares: 5000, // 50 lot
      avgBuyPrice: 3500,
      currentPrice: 3720,
    },
  ]);

  // Calculate portfolio totals
  const totalStockValue = positions.reduce(
    (sum, pos) => sum + pos.shares * pos.currentPrice,
    0
  );
  const totalCost = positions.reduce(
    (sum, pos) => sum + pos.shares * pos.avgBuyPrice,
    0
  );
  const totalGainLoss = totalStockValue - totalCost;
  const totalGainLossPercent = totalCost > 0 ? (totalGainLoss / totalCost) * 100 : 0;
  const netAssetValue = cashBalance + totalStockValue;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20 mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Simulasi Portofolio Tanpa Risiko Riil</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Paper Trading & Portofolio Simulator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Latih strategi trading dan manajemen portofolio saham dengan uang virtual simulasi sebelum menggunakan modal riil.
          </p>
        </div>

        <BadgeTag label="FACT" size="md" />
      </div>

      <DisclaimerBanner mode="compact" />

      {/* Portfolio Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 font-mono space-y-1">
          <span className="text-xs text-slate-400 font-sans block">Total Nilai Portofolio (NAV)</span>
          <div className="text-2xl font-bold text-white">{formatIDR(netAssetValue)}</div>
          <span className="text-[10px] text-slate-500 font-sans block">Kas Virtual + Saham</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 font-mono space-y-1">
          <span className="text-xs text-slate-400 font-sans block">Total Unrealized P&L</span>
          <div
            className={`text-2xl font-bold ${
              totalGainLoss >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {totalGainLoss >= 0 ? '+' : ''}{formatIDR(totalGainLoss)}
          </div>
          <span
            className={`text-xs font-semibold ${
              totalGainLoss >= 0 ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {formatPercent(totalGainLossPercent)}
          </span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 font-mono space-y-1">
          <span className="text-xs text-slate-400 font-sans block">Nilai Saham di Pasar</span>
          <div className="text-2xl font-bold text-cyan-400">{formatIDR(totalStockValue)}</div>
          <span className="text-[10px] text-slate-500 font-sans block">{positions.length} Posisi Terbuka</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 font-mono space-y-1">
          <span className="text-xs text-slate-400 font-sans block">Sisa Saldo Kas (Cash RDN)</span>
          <div className="text-2xl font-bold text-teal-300">{formatIDR(cashBalance)}</div>
          <span className="text-[10px] text-slate-500 font-sans block">Siap Dibelanjakan</span>
        </div>
      </div>

      {/* Positions Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-cyan-400" /> Posisi Saham Terbuka
          </h2>
          <span className="text-xs text-slate-400">{positions.length} Emiten</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left font-mono">
            <thead className="text-slate-400 font-sans font-semibold border-b border-slate-800 bg-slate-950/40">
              <tr>
                <th className="p-3">Ticker</th>
                <th className="p-3">Nama Emiten</th>
                <th className="p-3 text-right">Jumlah Lot</th>
                <th className="p-3 text-right">Avg Beli</th>
                <th className="p-3 text-right">Harga Pasar</th>
                <th className="p-3 text-right">Nilai Total</th>
                <th className="p-3 text-right">Floating P&L</th>
                <th className="p-3 text-right font-sans">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {positions.map((pos) => {
                const stockVal = pos.shares * pos.currentPrice;
                const costVal = pos.shares * pos.avgBuyPrice;
                const pnl = stockVal - costVal;
                const pnlPct = (pnl / costVal) * 100;
                const isProfit = pnl >= 0;

                return (
                  <tr key={pos.ticker} className="hover:bg-slate-800/30 transition-colors">
                    <td className="p-3 font-bold text-white">{pos.ticker}</td>
                    <td className="p-3 font-sans text-slate-300 max-w-[180px] truncate">
                      {pos.name}
                    </td>
                    <td className="p-3 text-right text-slate-200">
                      {pos.shares / 100} Lot
                    </td>
                    <td className="p-3 text-right text-slate-300">
                      {formatIDR(pos.avgBuyPrice)}
                    </td>
                    <td className="p-3 text-right font-bold text-white">
                      {formatIDR(pos.currentPrice)}
                    </td>
                    <td className="p-3 text-right text-cyan-300">{formatIDR(stockVal)}</td>
                    <td className="p-3 text-right font-bold">
                      <span className={isProfit ? 'text-emerald-400' : 'text-rose-400'}>
                        {isProfit ? '+' : ''}{formatIDR(pnl)} ({formatPercent(pnlPct)})
                      </span>
                    </td>
                    <td className="p-3 text-right font-sans">
                      <Link
                        href={`/analysis/${pos.ticker}`}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 px-2.5 py-1 rounded-md"
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
    </div>
  );
}
