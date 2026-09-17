import React from 'react';
import Link from 'next/link';
import { MOCK_INDICES, MOCK_MACRO } from '@/data/mockMarket';
import { MOCK_NEWS_LIST } from '@/data/mockNews';
import { MOCK_LEARNING_TOPICS } from '@/data/mockLearning';
import { IndicesTicker } from '@/components/market/IndicesTicker';
import { MainIndexChart } from '@/components/market/MainIndexChart';
import { GlobalSectorHeatmap } from '@/components/market/GlobalSectorHeatmap';
import { MacroAssetCockpit } from '@/components/home/MacroAssetCockpit';
import { AiResearchCandidates } from '@/components/home/AiResearchCandidates';
import { WhatChangedToday } from '@/components/home/WhatChangedToday';
import { EconomicCalendarWidget } from '@/components/home/EconomicCalendarWidget';
import { MoversTable } from '@/components/market/MoversTable';
import { MarketSentimentGauge } from '@/components/market/MarketSentimentGauge';
import { DisclaimerBanner } from '@/components/common/DisclaimerBanner';
import { BadgeTag } from '@/components/common/BadgeTag';
import {
  Sparkles,
  TrendingUp,
  BookOpen,
  Layers,
  ArrowRight,
  Shield,
  Activity,
  SlidersHorizontal,
  Compass,
  Zap,
  Globe,
  Search
} from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-8">
      {/* Top Banner Disclaimer */}
      <DisclaimerBanner mode="compact" />

      {/* Hero Header & Global Search Pitch */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/40 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Global Market Cockpit &amp; Evidence-Based AI Intelligence • Phase 1 MVP</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Global Stock Research, Screener &amp;{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
              Market Intelligence
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Platform riset multi-pasar terpadu (Indonesia, US, Jepang, Hong Kong, Singapura). Dilengkapi visualisasi grafik indeks interaktif, model skenario AI berbasis bukti, kandidat riset harian deterministik, dan kurikulum trading 9-tahap.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/screener"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-cyan-950/40 hover:opacity-95 transition-opacity"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Buka Global Screener</span>
            </Link>

            <Link
              href="/market"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
            >
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>Multi-Market Cockpit</span>
            </Link>

            <Link
              href="/learn"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-900/60 px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>Kurikulum 9-Tahap</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Indices Ticker with Sparklines */}
      <IndicesTicker />

      {/* Main Interactive Index Chart */}
      <MainIndexChart />

      {/* Today's AI Research Candidates */}
      <AiResearchCandidates />

      {/* What Changed Today? Delta Tracker */}
      <WhatChangedToday />

      {/* Sector Heatmap & Breadth */}
      <GlobalSectorHeatmap />

      {/* Macro & Cross-Asset Cockpit */}
      <MacroAssetCockpit />

      {/* Movers Table + Sentiment Gauge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MoversTable />
        </div>
        <div className="space-y-6">
          <MarketSentimentGauge />

          {/* Quick Learning Path */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl backdrop-blur-md space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> Modul Belajar Populer
              </h3>
              <Link href="/learn" className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold">
                Kurikulum 9-Tahap
              </Link>
            </div>

            <div className="space-y-2">
              {MOCK_LEARNING_TOPICS.slice(0, 4).map((topic) => (
                <Link
                  key={topic.id}
                  href={`/learn/${topic.id}`}
                  className="group flex items-center justify-between p-2.5 rounded-xl border border-slate-800/80 bg-slate-950/40 hover:border-indigo-500/40 hover:bg-indigo-950/20 transition-all"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white group-hover:text-indigo-300 truncate">
                      {topic.title}
                    </div>
                    <span className="text-[10px] text-slate-400">{topic.difficulty} • {topic.readTime}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Global Economic Calendar */}
      <EconomicCalendarWidget />

      {/* Full Disclaimer Banner at Bottom */}
      <DisclaimerBanner mode="full" />
    </div>
  );
}
