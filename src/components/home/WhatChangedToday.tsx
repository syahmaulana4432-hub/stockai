'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  FileText,
  Zap,
  Globe,
  Layers,
  ChevronRight
} from 'lucide-react';
import { BadgeTag } from '@/components/common/BadgeTag';

interface MaterialDeltaItem {
  id: string;
  ticker: string;
  companyName: string;
  category: 'Price & Volume' | 'Corporate & Filing' | 'Macro & Sector' | 'Technical Trigger';
  type: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  headline: string;
  detail: string;
  timestamp: string;
}

export function WhatChangedToday() {
  const [filter, setFilter] = useState<string>('ALL');

  const deltas: MaterialDeltaItem[] = [
    {
      id: 'd-1',
      ticker: 'BBCA',
      companyName: 'Bank Central Asia',
      category: 'Price & Volume',
      type: 'BULLISH',
      headline: 'Breakout Resisten Rp 10.200 dengan Volume 1.3x Rata-Rata 20D',
      detail: 'Inflow transaksi institusi tercatat net buy Rp 142 Miliar di pasar reguler.',
      timestamp: '15:45 WIB'
    },
    {
      id: 'd-2',
      ticker: 'AAPL',
      companyName: 'Apple Inc.',
      category: 'Corporate & Filing',
      type: 'BULLISH',
      headline: 'Ekspansi Peluncuran Apple Intelligence Bahasa Regional',
      detail: 'Konfirmasi ketersediaan model on-device di iOS untuk pasar Asia & Eropa.',
      timestamp: '09:15 EDT'
    },
    {
      id: 'd-3',
      ticker: 'NVDA',
      companyName: 'NVIDIA Corp',
      category: 'Technical Trigger',
      type: 'BULLISH',
      headline: 'Golden Cross EMA20 melintasi SMA50 pada grafik 4-Jam',
      detail: 'Momentum RSI 14-hari menguat ke 64.5 mengindikasikan kelanjutan tren naik.',
      timestamp: '10:30 EDT'
    },
    {
      id: 'd-4',
      ticker: 'ASII',
      companyName: 'Astra International',
      category: 'Price & Volume',
      type: 'NEUTRAL',
      headline: 'Koreksi Sehat -1.39% Menuju Support Kuat Rp 4.950',
      detail: 'Tekanan jual mereda saat harga menyentuh batas bawah kanal sideways 3 bulan.',
      timestamp: '14:20 WIB'
    },
    {
      id: 'd-5',
      ticker: 'IHSG',
      companyName: 'Indeks Sektoral Keuangan',
      category: 'Macro & Sector',
      type: 'BULLISH',
      headline: 'Sektor Finansial Menguat +0.85% Didorong Rebound Big Banks',
      detail: 'Kredit industri perbankan nasional tumbuh 11.4% YoY per data Bank Indonesia.',
      timestamp: '13:00 WIB'
    }
  ];

  const filteredDeltas = filter === 'ALL' ? deltas : deltas.filter(d => d.category === filter);

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 shadow-2xl backdrop-blur-md space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wider">
              <Activity className="w-4 h-4" /> What Changed Today?
            </span>
            <BadgeTag label="MATERIAL DELTA TRACKER" size="sm" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
            Perubahan Material &amp; Peristiwa Penggerak Hari Ini
          </h3>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          {['ALL', 'Price & Volume', 'Technical Trigger', 'Corporate & Filing', 'Macro & Sector'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                filter === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat === 'ALL' ? 'Semua Kategori' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Deltas List */}
      <div className="space-y-2.5">
        {filteredDeltas.map(item => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-2xl border border-slate-800/80 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-950/70 transition-all gap-3"
          >
            <div className="flex items-start gap-3 min-w-0">
              <div className={`p-2 rounded-xl shrink-0 font-mono font-bold text-xs ${
                item.type === 'BULLISH'
                  ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                  : item.type === 'BEARISH'
                  ? 'bg-rose-950/60 text-rose-400 border border-rose-500/30'
                  : 'bg-slate-800 text-slate-300 border border-slate-700'
              }`}>
                {item.ticker}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-xs sm:text-sm text-white">{item.headline}</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{item.detail}</p>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 text-xs">
              <span className="text-[11px] text-slate-500 font-mono">{item.timestamp}</span>
              {item.ticker !== 'IHSG' && (
                <Link
                  href={`/analysis/${item.ticker}`}
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold py-1 px-2.5 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs"
                >
                  <span>Cek Saham</span>
                  <ChevronRight className="w-3 h-3" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
