'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { MOCK_NEWS_LIST, MOCK_CORPORATE_ACTIONS } from '@/data/mockNews';
import { NewsCategory, NewsSentiment, NewsImpactLevel } from '@/lib/types';
import { BadgeTag } from '@/components/common/BadgeTag';
import { DisclaimerBanner } from '@/components/common/DisclaimerBanner';
import { formatDateID } from '@/lib/utils';
import {
  Newspaper,
  Calendar,
  ArrowUpRight,
  Sparkles,
  Search,
  ExternalLink,
  Filter,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Minus,
  Globe2,
  Building2,
  PieChart,
  Landmark,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';

const CATEGORIES: { label: string; value: NewsCategory | 'ALL'; icon: React.ElementType }[] = [
  { label: 'Semua Kategori', value: 'ALL', icon: Newspaper },
  { label: 'Ekonomi Domestik', value: 'Ekonomi Domestik', icon: Landmark },
  { label: 'Ekonomi Global', value: 'Ekonomi Global', icon: Globe2 },
  { label: 'Sektor', value: 'Sektor', icon: PieChart },
  { label: 'Emiten', value: 'Emiten', icon: Building2 },
];

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSentiment, setSelectedSentiment] = useState<NewsSentiment | 'ALL'>('ALL');
  const [selectedImpact, setSelectedImpact] = useState<NewsImpactLevel | 'ALL'>('ALL');

  const filteredNews = useMemo(() => {
    return MOCK_NEWS_LIST.filter((item) => {
      // Category filter
      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) {
        return false;
      }

      // Sentiment filter
      if (selectedSentiment !== 'ALL' && item.sentiment !== selectedSentiment) {
        return false;
      }

      // Impact filter
      if (selectedImpact !== 'ALL' && item.impactLevel !== selectedImpact) {
        return false;
      }

      // Search query (matches title, factContent, aiInterpretation, related tickers, sector, source)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesFact = item.factContent.toLowerCase().includes(query);
        const matchesAi = item.aiInterpretation.toLowerCase().includes(query);
        const matchesTickers = item.relatedTickers.some((t) => t.toLowerCase().includes(query));
        const matchesSector = item.sector ? item.sector.toLowerCase().includes(query) : false;
        const matchesSource = item.source.toLowerCase().includes(query);

        if (
          !matchesTitle &&
          !matchesFact &&
          !matchesAi &&
          !matchesTickers &&
          !matchesSector &&
          !matchesSource
        ) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, selectedSentiment, selectedImpact, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory('ALL');
    setSearchQuery('');
    setSelectedSentiment('ALL');
    setSelectedImpact('ALL');
  };

  const getSentimentBadge = (sentiment: NewsSentiment) => {
    switch (sentiment) {
      case 'Positif':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-500/40">
            <TrendingUp className="w-3 h-3 text-emerald-400" />
            <span>Tone Positif</span>
          </span>
        );
      case 'Negatif':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-950/60 text-rose-300 border border-rose-500/40">
            <TrendingDown className="w-3 h-3 text-rose-400" />
            <span>Tone Negatif</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            <Minus className="w-3 h-3 text-slate-400" />
            <span>Tone Netral</span>
          </span>
        );
    }
  };

  const getImpactBadge = (impact: NewsImpactLevel) => {
    switch (impact) {
      case 'Tinggi':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
            Dampak Tinggi
          </span>
        );
      case 'Sedang':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 uppercase tracking-wider">
            Dampak Sedang
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 uppercase tracking-wider">
            Dampak Rendah
          </span>
        );
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-md bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold text-cyan-400 border border-cyan-500/20 mb-2">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Market Intelligence & News Stream</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            News & Market Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Arus berita multi-kategori dengan pemisahan tegas antara fakta rilis sumber resmi (FACT) dan sintesis analisis AI (AI INTERPRETATION).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Data Transparency: Active</span>
          </span>
        </div>
      </div>

      <DisclaimerBanner mode="compact" />

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800/80">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-950/40'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                }`}
              >
                {cat.value === 'ALL'
                  ? MOCK_NEWS_LIST.length
                  : MOCK_NEWS_LIST.filter((n) => n.category === cat.value).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Filter & Search Bar */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg backdrop-blur-sm space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari berita berdasarkan ticker (BBCA), headline, sektor, atau kata kunci..."
              className="w-full rounded-xl bg-slate-950 border border-slate-700/80 pl-9 pr-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          {/* Sentiment Filter */}
          <div className="relative">
            <select
              value={selectedSentiment}
              onChange={(e) => setSelectedSentiment(e.target.value as NewsSentiment | 'ALL')}
              className="w-full rounded-xl bg-slate-950 border border-slate-700/80 px-3 py-2 text-xs sm:text-sm text-white focus:border-cyan-500 focus:outline-none"
            >
              <option value="ALL">Semua Sentimen</option>
              <option value="Positif">Sentimen: Positif</option>
              <option value="Netral">Sentimen: Netral</option>
              <option value="Negatif">Sentimen: Negatif</option>
            </select>
          </div>

          {/* Impact Level Filter */}
          <div className="flex items-center gap-2">
            <select
              value={selectedImpact}
              onChange={(e) => setSelectedImpact(e.target.value as NewsImpactLevel | 'ALL')}
              className="w-full rounded-xl bg-slate-950 border border-slate-700/80 px-3 py-2 text-xs sm:text-sm text-white focus:border-cyan-500 focus:outline-none"
            >
              <option value="ALL">Semua Dampak</option>
              <option value="Tinggi">Dampak: Tinggi</option>
              <option value="Sedang">Dampak: Sedang</option>
              <option value="Rendah">Dampak: Rendah</option>
            </select>

            {(selectedCategory !== 'ALL' ||
              searchQuery !== '' ||
              selectedSentiment !== 'ALL' ||
              selectedImpact !== 'ALL') && (
              <button
                onClick={resetFilters}
                title="Reset semua filter"
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors shrink-0"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Summary */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 pt-1 border-t border-slate-800/60 font-mono">
          <span>Menampilkan {filteredNews.length} dari {MOCK_NEWS_LIST.length} Berita Terverifikasi</span>
          <span className="text-[11px] text-slate-500">Simulated News & AI Intelligence Feed — Phase 1</span>
        </div>
      </div>

      {/* Main Grid: News Feed + Corporate Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* News Feed - 2 Columns */}
        <div className="lg:col-span-2 space-y-4">
          {filteredNews.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-12 text-center space-y-3">
              <Newspaper className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">Tidak ada berita yang cocok</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Coba sesuaikan kata kunci pencarian atau reset filter sentimen dan kategori.
              </p>
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 text-cyan-400 hover:bg-slate-700 text-xs font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filter</span>
              </button>
            </div>
          ) : (
            filteredNews.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl backdrop-blur-sm space-y-4 hover:border-slate-700/90 transition-all"
              >
                {/* News Header Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    {/* Source with External Link */}
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Buka sumber rilis resmi (Simulated URL)"
                      className="inline-flex items-center gap-1 font-semibold text-cyan-400 hover:text-cyan-300 hover:underline"
                    >
                      <span>{item.source}</span>
                      <ExternalLink className="w-3 h-3 opacity-80" />
                    </a>

                    <span className="text-slate-600">•</span>

                    {/* Timestamp */}
                    <span className="text-slate-400 font-mono text-[11px]">
                      {new Date(item.publishedAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}{' '}
                      WIB
                    </span>

                    <span className="text-slate-600">•</span>

                    {/* Category */}
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-semibold">
                      {item.category}
                    </span>

                    {item.sector && (
                      <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 text-[10px] font-mono">
                        {item.sector}
                      </span>
                    )}
                  </div>

                  {/* Badges: Impact & Sentiment */}
                  <div className="flex items-center gap-2">
                    {getImpactBadge(item.impactLevel)}
                    {getSentimentBadge(item.sentiment)}
                  </div>
                </div>

                {/* News Headline */}
                <h3 className="font-bold text-base sm:text-lg text-white leading-snug">
                  {item.title}
                </h3>

                {/* Section 1: FACT (Fakta Berita Terverifikasi) */}
                <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Fakta Rilis Sumber (Fact)</span>
                    </span>
                    <BadgeTag label="FACT" size="sm" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {item.factContent}
                  </p>
                </div>

                {/* Section 2: AI INTERPRETATION (Analisis Relevansi & Implikasi) */}
                <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                      <span>AI Interpretation & Contextual Impact</span>
                    </span>
                    <BadgeTag label="AI ANALYSIS" size="sm" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                    {item.aiInterpretation}
                  </p>
                </div>

                {/* Related Ticker Tags */}
                {item.relatedTickers.length > 0 && (
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-500 font-medium">Saham Terkait:</span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {item.relatedTickers.map((t) => (
                          <Link
                            key={t}
                            href={`/analysis/${t}`}
                            className="inline-flex items-center gap-1 font-mono text-xs font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 px-2 py-0.5 rounded hover:bg-cyan-900/40 transition-colors"
                          >
                            <span>{t}</span>
                            <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                          </Link>
                        ))}
                      </div>
                    </div>

                    <span className="text-[10px] text-slate-500 font-mono">
                      Simulated Source: demo-source.stockai.local
                    </span>
                  </div>
                )}
              </article>
            ))
          )}
        </div>

        {/* Corporate Actions Calendar - 1 Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-400" /> Kalender Aksi Korporasi
            </h2>
            <BadgeTag label="FACT" size="sm" />
          </div>

          <div className="space-y-3">
            {MOCK_CORPORATE_ACTIONS.map((ca) => (
              <div
                key={ca.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 space-y-2.5 shadow-md backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <Link
                    href={`/analysis/${ca.ticker}`}
                    className="font-mono font-bold text-sm text-white hover:text-cyan-400 flex items-center gap-1"
                  >
                    <span>{ca.ticker}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
                  </Link>
                  <BadgeTag label={ca.type} size="sm" />
                </div>

                <div className="font-semibold text-xs text-slate-200">{ca.title}</div>
                <p className="text-xs text-slate-400">{ca.description}</p>

                {ca.cumDate && (
                  <div className="rounded-lg bg-slate-950 p-2 border border-slate-800/80 text-[11px] font-mono flex justify-between">
                    <span className="text-slate-400 font-sans">Cum Date:</span>
                    <span className="font-bold text-amber-300">{formatDateID(ca.cumDate)}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick Intelligence Summary Box */}
          <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-indigo-950/20 to-slate-900 p-4 space-y-3 shadow-lg">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Prinsip AI News Intelligence</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Model StockAI memisahkan fakta mentah rilis berita dari kesimpulan analitis. AI tidak mengarang angka finansial dan hanya mengkaji implikasi rasio serta sentimen terhadap setup harga saham terkait.
            </p>
            <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between font-mono">
              <span>Status: Deterministic Parser</span>
              <span className="text-emerald-400 font-semibold">100% Verifiable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

