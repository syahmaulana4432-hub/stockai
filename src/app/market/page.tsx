'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { getAllInstruments } from '@/data/instrumentMaster';
import { InstrumentMasterItem } from '@/lib/instrumentMasterTypes';
import { GLOBAL_INDICES_DETAILED } from '@/data/mockIndicesHistory';
import { MainIndexChart } from '@/components/market/MainIndexChart';
import { GlobalSectorHeatmap } from '@/components/market/GlobalSectorHeatmap';
import { MacroAssetCockpit } from '@/components/home/MacroAssetCockpit';
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
  Globe,
  Building2,
  Clock,
  SlidersHorizontal,
  ArrowRight
} from 'lucide-react';

export default function MarketPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');
  const allInstruments = getAllInstruments();

  const regions = [
    { id: 'ALL', label: '🌍 Semua Pasar', country: 'Global' },
    { id: 'ID', label: '🇮🇩 Indonesia (IDX)', country: 'Indonesia' },
    { id: 'US', label: '🇺🇸 United States (NYSE/NASDAQ)', country: 'United States' },
    { id: 'JP', label: '🇯🇵 Jepang (TSE)', country: 'Japan' },
    { id: 'HK', label: '🇭🇰 Hong Kong (HKEX)', country: 'Hong Kong' },
    { id: 'SG', label: '🇸🇬 Singapura (SGX)', country: 'Singapore' },
    { id: 'GB', label: '🇬🇧 United Kingdom (LSE)', country: 'United Kingdom' }
  ];

  const filteredInstruments = selectedRegion === 'ALL'
    ? allInstruments
    : allInstruments.filter(inst => inst.countryCode === selectedRegion);

  const filteredIndices = selectedRegion === 'ALL'
    ? GLOBAL_INDICES_DETAILED
    : GLOBAL_INDICES_DETAILED.filter(idx => {
        const regObj = regions.find(r => r.id === selectedRegion);
        return regObj ? idx.country === regObj.country : true;
      });

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-md bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold text-cyan-400 border border-cyan-500/20 mb-2">
            <Globe className="w-3.5 h-3.5" />
            <span>Global Multi-Market Intelligence Engine • Phase 1 MVP</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Global Market Dashboard &amp; Multi-Exchange Cockpit
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
            Pantauan komprehensif bursa global (IDX, NYSE, NASDAQ, TSE, HKEX, SGX, LSE) dengan jam perdagangan, status likuiditas, rotasi sektoral, dan instrumen terpilih.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <BadgeTag label="SIMULATED - PHASE 1" size="md" />
        </div>
      </div>

      <DisclaimerBanner mode="compact" />

      {/* Region Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {regions.map(r => (
          <button
            key={r.id}
            onClick={() => setSelectedRegion(r.id)}
            className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedRegion === r.id
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-950/40 font-bold'
                : 'bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Regional Trading Sessions & Market Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {filteredIndices.slice(0, 4).map(idx => {
          const isUp = idx.changePercent >= 0;
          return (
            <div
              key={idx.id}
              className="p-4 rounded-2xl border border-slate-800 bg-slate-900/90 hover:border-slate-700 transition-all space-y-2 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-white">{idx.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                  {idx.currency}
                </span>
              </div>
              <div className="flex items-baseline justify-between font-mono">
                <span className="text-lg font-black text-white">
                  {idx.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
                <span className={`text-xs font-bold ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isUp ? '+' : ''}{formatPercent(idx.changePercent)}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80 font-mono">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" /> {idx.tradingHours}
                </span>
                <span className="text-slate-500">{idx.timezone}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Interactive Index Chart */}
      <MainIndexChart />

      {/* Sector Heatmap & Breadth */}
      <GlobalSectorHeatmap />

      {/* Macro & Cross-Asset Cockpit */}
      <MacroAssetCockpit />

      {/* Movers + Sentiment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MoversTable />
        </div>
        <div>
          <MarketSentimentGauge />
        </div>
      </div>

      {/* Multi-Market Instruments Watchlist Table */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 shadow-2xl backdrop-blur-md space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" /> Master Daftar Instrumen Terliput
            </h2>
            <p className="text-xs text-slate-400">
              Menampilkan {filteredInstruments.length} emiten pilihan dengan dukungan riset 360° dan data provenance lengkap
            </p>
          </div>
          <Link
            href="/screener"
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 px-3.5 py-1.5 rounded-xl flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Buka Screener Kustom</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-slate-400 font-semibold border-b border-slate-800 bg-slate-950/60 font-mono">
              <tr>
                <th className="p-3">Simbol</th>
                <th className="p-3">Perusahaan &amp; Negara</th>
                <th className="p-3">Bursa / Sektor</th>
                <th className="p-3 text-right">Harga</th>
                <th className="p-3 text-right">Perubahan</th>
                <th className="p-3 text-right">PER</th>
                <th className="p-3 text-right">PBV</th>
                <th className="p-3 text-right">ROE</th>
                <th className="p-3 text-right">Aksi Riset</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredInstruments.map((inst) => {
                const isUp = inst.changePercent >= 0;
                return (
                  <tr key={inst.symbol} className="hover:bg-slate-800/40 transition-colors group">
                    <td className="p-3 font-bold text-white group-hover:text-cyan-400">
                      {inst.symbol}
                    </td>
                    <td className="p-3 font-sans text-slate-300 max-w-[200px] truncate">
                      <div className="font-semibold text-slate-200">{inst.companyName}</div>
                      <div className="text-[10px] text-slate-400">{inst.country} • {inst.isin}</div>
                    </td>
                    <td className="p-3 font-sans text-slate-400">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 border border-slate-700">
                        {inst.exchange} • {inst.sector}
                      </span>
                    </td>
                    <td className="p-3 text-right font-bold text-white">
                      {inst.currency === 'IDR' ? formatIDR(inst.price) : `${inst.currency} ${inst.price.toFixed(2)}`}
                    </td>
                    <td
                      className={`p-3 text-right font-bold ${
                        isUp ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {isUp ? '+' : ''}{formatPercent(inst.changePercent)}
                    </td>
                    <td className="p-3 text-right text-slate-300">{inst.pe ? `${inst.pe}x` : '-'}</td>
                    <td className="p-3 text-right text-slate-300">{inst.pbv ? `${inst.pbv}x` : '-'}</td>
                    <td className="p-3 text-right text-emerald-400">{inst.roe ? `${inst.roe}%` : '-'}</td>
                    <td className="p-3 text-right font-sans">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/company/${inst.symbol}`}
                          className="text-[11px] font-medium text-slate-300 hover:text-indigo-300 bg-slate-800 px-2 py-1 rounded-md transition-colors"
                        >
                          Profil
                        </Link>
                        <Link
                          href={`/analysis/${inst.symbol}`}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-950/50 border border-cyan-500/30 px-2.5 py-1 rounded-md transition-colors"
                        >
                          <span>Analisis</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>
                      </div>
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
