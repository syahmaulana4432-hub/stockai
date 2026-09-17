import React from 'react';
import Link from 'next/link';
import { MOCK_INDICES, MOCK_MACRO } from '@/data/mockMarket';
import { MOCK_STOCKS } from '@/data/mockStocks';
import { MOCK_NEWS_LIST } from '@/data/mockNews';
import { MOCK_LEARNING_TOPICS } from '@/data/mockLearning';
import { IndicesTicker } from '@/components/market/IndicesTicker';
import { MoversTable } from '@/components/market/MoversTable';
import { MarketSentimentGauge } from '@/components/market/MarketSentimentGauge';
import { DisclaimerBanner } from '@/components/common/DisclaimerBanner';
import { BadgeTag } from '@/components/common/BadgeTag';
import { formatIDR, formatPercent, formatVolume } from '@/lib/utils';
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
} from 'lucide-react';

export default function HomePage() {
  const featuredStock = MOCK_STOCKS[0]; // BBCA

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-8">
      {/* Top Banner Alert */}
      <DisclaimerBanner mode="compact" />

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/90 to-indigo-950/40 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Platform Cerdas Saham Indonesia • Phase 1 MVP</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Analisis Saham Komprehensif & Edukasi Berbasis{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
              AI Scenario
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Kombinasi data teknikal matematis, laporan fundamental terstruktur, 24 modul belajar interaktif 8-langkah, dan model skenario probabilitas pasar tanpa janji muluk.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/analysis/BBCA"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-cyan-950/40 hover:opacity-95 transition-opacity"
            >
              <Sparkles className="w-4 h-4" />
              <span>Mulai Analisis BBCA</span>
            </Link>

            <Link
              href="/learn"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>24 Modul Belajar Saham</span>
            </Link>

            <Link
              href="/screener"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-900/60 px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              <span>Stock Screener</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Indices & Macro Ticker Grid */}
      <IndicesTicker />

      {/* Main Grid Layout: Movers + Sentiment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <MoversTable />

          {/* Featured Stock Spotlight */}
          <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/90 p-5 shadow-xl backdrop-blur-md space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30 text-sm">
                  {featuredStock.ticker}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">{featuredStock.name}</h3>
                  <span className="text-xs text-slate-400">{featuredStock.sector} • {featuredStock.subSector}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <BadgeTag label="AI ANALYSIS" size="sm" />
                <Link
                  href={`/analysis/${featuredStock.ticker}`}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  Detail Lengkap <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800">
                <span className="text-[11px] font-sans text-slate-400 block">Harga Terkini</span>
                <span className="text-sm font-bold text-white">{formatIDR(featuredStock.price)}</span>
                <span className="text-[10px] text-emerald-400 block">{formatPercent(featuredStock.changePercent)}</span>
              </div>
              <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800">
                <span className="text-[11px] font-sans text-slate-400 block">Valuasi PER</span>
                <span className="text-sm font-bold text-white">{featuredStock.pe}x</span>
                <span className="text-[10px] text-slate-400 block">PBV {featuredStock.pbv}x</span>
              </div>
              <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800">
                <span className="text-[11px] font-sans text-slate-400 block">ROE</span>
                <span className="text-sm font-bold text-emerald-400">{featuredStock.roe}%</span>
                <span className="text-[10px] text-slate-400 block">High Quality</span>
              </div>
              <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800">
                <span className="text-[11px] font-sans text-slate-400 block">AI Setup</span>
                <span className="text-xs font-bold text-emerald-400 block mt-0.5">
                  Bullish Setup
                </span>
                <span className="text-[10px] text-slate-400 block font-mono mt-0.5">
                  TP {formatIDR(featuredStock.aiAnalysis.scenarios.bullish.priceTarget, false)}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-3 rounded-xl border border-slate-800/80">
              💡 <strong>AI Summary:</strong> {featuredStock.aiAnalysis.technicalSummary.summary}
            </p>
          </div>
        </div>

        {/* Right Sidebar: Sentiment + Fast Learn + News */}
        <div className="space-y-6">
          <MarketSentimentGauge />

          {/* Quick Learning Path */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl backdrop-blur-md space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> Modul Belajar Populer
              </h3>
              <Link href="/learn" className="text-[11px] text-indigo-400 hover:text-indigo-300 font-semibold">
                Lihat 24 Modul
              </Link>
            </div>

            <div className="space-y-2">
              {MOCK_LEARNING_TOPICS.slice(0, 4).map((topic, i) => (
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

          {/* Market News Widget */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl backdrop-blur-md space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Kabar Pasar & Emiten
              </h3>
              <Link href="/news" className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold">
                Semua Berita
              </Link>
            </div>

            <div className="space-y-2.5">
              {MOCK_NEWS_LIST.slice(0, 3).map((news) => (
                <div key={news.id} className="p-2.5 rounded-xl border border-slate-800/60 bg-slate-950/30 space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-500 font-semibold">{news.source}</span>
                    <BadgeTag label={news.impact} size="sm" />
                  </div>
                  <h4 className="text-xs font-medium text-slate-200 line-clamp-2 hover:text-cyan-300 cursor-pointer">
                    {news.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full Disclaimer Banner at Bottom */}
      <DisclaimerBanner mode="full" />
    </div>
  );
}
