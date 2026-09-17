'use client';

import React from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Building2,
  TrendingUp,
  Globe,
  PieChart,
  Target,
  Zap,
  AlertTriangle,
  Users,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Layers,
  Sparkles,
  ExternalLink,
  Activity,
  Award
} from 'lucide-react';
import { getInstrumentBySymbol, getAllInstruments } from '@/data/instrumentMaster';
import { DisclaimerBanner } from '@/components/common/DisclaimerBanner';
import { BadgeTag } from '@/components/common/BadgeTag';
import { formatIDR, formatMarketCap, formatPercent } from '@/lib/utils';

export default function CompanyProfilePage() {
  const params = useParams();
  const rawSymbol = typeof params?.symbol === 'string' ? params.symbol : 'BBCA';
  const instrument = getInstrumentBySymbol(rawSymbol) || getAllInstruments()[0];

  const profile = instrument.profile;
  const isUp = instrument.changePercent >= 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-400">Company Intelligence</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-indigo-400 font-bold font-mono">{instrument.symbol}</span>
      </div>

      <DisclaimerBanner mode="compact" />

      {/* Header Banner */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-md">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-black text-2xl shadow-lg shadow-indigo-950/50 border border-indigo-400/20 font-mono">
              {instrument.symbol.slice(0, 4)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-mono">
                  {instrument.symbol}
                </h1>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-500/30">
                  {instrument.exchange}
                </span>
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {instrument.country}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">ISIN: {instrument.isin}</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-200 mt-1">{instrument.legalName}</h2>
              <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                <span>Sektor: <strong className="text-slate-300">{instrument.sector}</strong></span>
                <span>•</span>
                <span>Industri: <strong className="text-slate-300">{instrument.industry}</strong></span>
              </div>
            </div>
          </div>

          {/* Quick Cross-Link to Stock Analysis */}
          <div className="flex flex-col items-end gap-2">
            <div className="text-right font-mono">
              <div className="text-xl sm:text-2xl font-black text-white">
                {instrument.currency === 'IDR' ? formatIDR(instrument.price) : `${instrument.currency} ${instrument.price.toFixed(2)}`}
              </div>
              <div className={`text-xs font-bold ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isUp ? '+' : ''}{instrument.change} ({formatPercent(instrument.changePercent)})
              </div>
            </div>

            <Link
              href={`/analysis/${instrument.symbol}`}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-all shadow-sm"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Buka Analisis Saham & Chart</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Data Provenance Metadata */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <BadgeTag label={instrument.feedStatus} size="sm" />
            <span>Sumber Profil: {instrument.dataSourceLabel}</span>
          </div>
          <span className="font-mono">Data Cutoff: {new Date(instrument.cutoffTimestamp).toLocaleString('id-ID')}</span>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Core Business Model & Products */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. What Does This Company Do? */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-indigo-400 uppercase tracking-wider">
              <Building2 className="w-4 h-4" />
              <h3>Profil & Kegiatan Bisnis Inti</h3>
            </div>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
              {profile.whatTheyDo}
            </p>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pt-2 border-t border-slate-800/80">
              {profile.overview}
            </p>
          </div>

          {/* 2. Business Model & Revenue Drivers */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-cyan-400 uppercase tracking-wider">
                <PieChart className="w-4 h-4" />
                <h3>Model Bisnis & Struktur Pendapatan (Revenue Drivers)</h3>
              </div>
              <BadgeTag label="SEGMENTASI" size="sm" />
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-3.5 rounded-xl border border-slate-800/80">
              {profile.businessModel}
            </p>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Komposisi Segmen Pendapatan
              </h4>
              <div className="space-y-3">
                {profile.revenueDrivers.map((rev, idx) => (
                  <div key={idx} className="space-y-1.5 bg-slate-950/40 p-3 rounded-xl border border-slate-800/60">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-white">{rev.segment}</span>
                      <span className="text-cyan-400 font-mono font-bold">{rev.sharePercent}%</span>
                    </div>
                    {/* Visual Progress Bar */}
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full rounded-full"
                        style={{ width: `${rev.sharePercent}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{rev.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Products and Services Catalog */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <h3>Produk & Layanan Utama</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.productsAndServices.map((cat, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 space-y-2">
                  <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                    {cat.category}
                  </h4>
                  <ul className="space-y-1.5">
                    {cat.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="text-xs text-slate-300 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Strategic Catalysts */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-amber-400 uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              <h3>Katalis Pertumbuhan Struktural</h3>
            </div>
            <div className="space-y-3">
              {profile.catalysts.map((cat, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-amber-500/20 bg-amber-950/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-amber-200">{cat.title}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-900/50 text-amber-300 font-mono">
                      {cat.timeframe}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{cat.description}</p>
                  <div className="text-[11px] text-amber-400/90 font-medium">
                    ⚡ Dampak Diharapkan: {cat.expectedImpact}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Column: Risks, Target Markets, Management, Peers */}
        <div className="space-y-6">
          {/* Target Markets */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <Target className="w-4 h-4 text-purple-400" />
              <h3>Target Pasar & Jangkauan</h3>
            </div>
            <ul className="space-y-2">
              {profile.targetMarkets.map((market, idx) => (
                <li key={idx} className="text-xs text-slate-300 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/80 flex items-start gap-2">
                  <Globe className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                  <span>{market}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Risks */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <h3>Faktor Risiko Utama</h3>
            </div>
            <div className="space-y-2.5">
              {profile.risks.map((risk, idx) => (
                <div key={idx} className="p-3 rounded-lg border border-rose-500/20 bg-rose-950/10 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-rose-200">{risk.title}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      risk.impact === 'TINGGI' ? 'bg-rose-900/60 text-rose-300' : 'bg-amber-900/60 text-amber-300'
                    }`}>
                      {risk.impact}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{risk.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership & Shareholders */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
              <Users className="w-4 h-4" />
              <h3>Manajemen & Kepemilikan Saham</h3>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase block">Direksi Kunci</span>
              {profile.management.boardOfDirectors.map((dir, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-800/60 last:border-0">
                  <span className="font-medium text-white">{dir.name}</span>
                  <span className="text-[11px] text-slate-400">{dir.role}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-[11px] font-semibold text-slate-400 uppercase block">Pemegang Saham Utama</span>
              {profile.management.majorShareholders.map((sh, idx) => (
                <div key={idx} className="space-y-0.5 text-xs py-1">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 truncate max-w-[180px]">{sh.name}</span>
                    <span className="font-mono font-bold text-cyan-400">{sh.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Peer Competitors */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <Award className="w-4 h-4 text-cyan-400" />
                <h3>Emiten Sejenis (Peers)</h3>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {profile.peers.map((peerSym) => (
                <Link
                  key={peerSym}
                  href={`/company/${peerSym}`}
                  className="p-2.5 rounded-xl border border-slate-800 bg-slate-950/40 hover:border-indigo-500/40 hover:bg-indigo-950/20 text-center transition-all group"
                >
                  <span className="font-mono font-bold text-xs text-white group-hover:text-indigo-300 block">
                    {peerSym}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Buka Profil</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
