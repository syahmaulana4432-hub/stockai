'use client';

import React, { useState, useMemo } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { getStockByTicker, MOCK_STOCKS } from '@/data/mockStocks';
import { computeAllIndicators } from '@/lib/indicators';
import { CandleStickChart } from '@/components/charts/CandleStickChart';
import { IndicatorChart } from '@/components/charts/IndicatorChart';
import { TechnicalSummary } from '@/components/analysis/TechnicalSummary';
import { FundamentalTable, KeyRatiosGrid } from '@/components/analysis/FundamentalTable';
import { AiScenarioAnalysis } from '@/components/analysis/AiScenarioAnalysis';
import { CorporateActionList } from '@/components/analysis/CorporateActionList';
import { DisclaimerBanner } from '@/components/common/DisclaimerBanner';
import { BadgeTag } from '@/components/common/BadgeTag';
import { formatIDR, formatPercent, formatVolume, formatMarketCap, formatDateTimeID } from '@/lib/utils';
import {
  Sparkles,
  TrendingUp,
  Activity,
  Landmark,
  Layers,
  Calendar,
  Newspaper,
  ArrowLeft,
  Share2,
  Bookmark,
  ChevronRight,
  Info,
} from 'lucide-react';

export default function StockDetailPage() {
  const params = useParams();
  const rawTicker = typeof params?.ticker === 'string' ? params.ticker : 'BBCA';
  const stock = getStockByTicker(rawTicker) || MOCK_STOCKS[0];

  const [activeTab, setActiveTab] = useState<'technical' | 'fundamental' | 'ai' | 'corporate' | 'news'>('ai');

  // Compute mathematical indicators from candle history
  const indicators = useMemo(() => {
    return computeAllIndicators(stock.candles);
  }, [stock.candles]);

  const isUp = stock.changePercent >= 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/analysis" className="hover:text-white transition-colors">
          Analysis
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-cyan-400 font-bold font-mono">{stock.ticker}</span>
      </div>

      <DisclaimerBanner mode="compact" />

      {/* Stock Main Header Banner */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-md">
        <div className="flex flex-wrap items-start justify-between gap-4">
          {/* Ticker & Name */}
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white font-black text-xl shadow-lg shadow-cyan-950/40 border border-cyan-400/20">
              {stock.ticker}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-mono">
                  {stock.ticker}
                </h1>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {stock.sector}
                </span>
                <span className="text-xs text-slate-400 font-medium">IDX / BEI</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5 max-w-xl">{stock.name}</p>
            </div>
          </div>

          {/* Price & Change */}
          <div className="text-right">
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              {formatIDR(stock.price)}
            </div>
            <div
              className={`flex items-center justify-end gap-1.5 text-sm font-bold font-mono mt-0.5 ${
                isUp ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              <span>{isUp ? '+' : ''}{stock.change}</span>
              <span>({formatPercent(stock.changePercent)})</span>
            </div>
            <span className="text-[10px] text-slate-500 font-mono block mt-1">
              Data: {formatDateTimeID(stock.updatedAt)} WIB
            </span>
          </div>
        </div>

        {/* Quick Stock Metrics Ribbon */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 pt-4 border-t border-slate-800 text-xs font-mono">
          <div className="rounded-lg bg-slate-950/60 p-2.5 border border-slate-800/80">
            <span className="text-[10px] font-sans text-slate-400 block">Market Cap</span>
            <span className="font-bold text-white">{formatMarketCap(stock.marketCap)}</span>
          </div>
          <div className="rounded-lg bg-slate-950/60 p-2.5 border border-slate-800/80">
            <span className="text-[10px] font-sans text-slate-400 block">Volume Hari Ini</span>
            <span className="font-bold text-white">{formatVolume(stock.volume, 'lot')}</span>
          </div>
          <div className="rounded-lg bg-slate-950/60 p-2.5 border border-slate-800/80">
            <span className="text-[10px] font-sans text-slate-400 block">PER (TTM)</span>
            <span className="font-bold text-white">{stock.pe}x</span>
          </div>
          <div className="rounded-lg bg-slate-950/60 p-2.5 border border-slate-800/80">
            <span className="text-[10px] font-sans text-slate-400 block">PBV</span>
            <span className="font-bold text-white">{stock.pbv}x</span>
          </div>
          <div className="rounded-lg bg-slate-950/60 p-2.5 border border-slate-800/80">
            <span className="text-[10px] font-sans text-slate-400 block">ROE</span>
            <span className="font-bold text-emerald-400">{stock.roe}%</span>
          </div>
          <div className="rounded-lg bg-slate-950/60 p-2.5 border border-slate-800/80">
            <span className="text-[10px] font-sans text-slate-400 block">Div. Yield</span>
            <span className="font-bold text-teal-300">{stock.dividendYield}%</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        <button
          onClick={() => setActiveTab('ai')}
          className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all ${
            activeTab === 'ai'
              ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-950/50'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Stock Analysis</span>
          <BadgeTag label="AI ANALYSIS" size="sm" />
        </button>

        <button
          onClick={() => setActiveTab('technical')}
          className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
            activeTab === 'technical'
              ? 'bg-slate-800 text-cyan-400 font-bold border border-slate-700'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Technical & Charts</span>
        </button>

        <button
          onClick={() => setActiveTab('fundamental')}
          className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
            activeTab === 'fundamental'
              ? 'bg-slate-800 text-indigo-400 font-bold border border-slate-700'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Landmark className="w-4 h-4" />
          <span>Fundamental & Finansial</span>
        </button>

        <button
          onClick={() => setActiveTab('corporate')}
          className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
            activeTab === 'corporate'
              ? 'bg-slate-800 text-teal-400 font-bold border border-slate-700'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Corporate Action</span>
        </button>

        <button
          onClick={() => setActiveTab('news')}
          className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
            activeTab === 'news'
              ? 'bg-slate-800 text-amber-400 font-bold border border-slate-700'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <Newspaper className="w-4 h-4" />
          <span>Berita Terkait</span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'ai' && (
        <div className="space-y-6">
          <AiScenarioAnalysis stock={stock} />
          <div className="mt-8 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Grafik Harga & Indikator Pendukung
            </h3>
            <CandleStickChart candles={stock.candles} ticker={stock.ticker} height={380} />
          </div>
        </div>
      )}

      {activeTab === 'technical' && (
        <div className="space-y-6">
          <TechnicalSummary indicators={indicators} currentPrice={stock.price} />

          {/* Main Candlestick Chart */}
          <CandleStickChart candles={stock.candles} ticker={stock.ticker} height={440} />

          {/* Sub-charts: RSI & MACD */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                RSI (14) Oscillator
              </span>
              <IndicatorChart candles={stock.candles} type="RSI" height={150} />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                MACD (12, 26, 9) Histogram & Signal
              </span>
              <IndicatorChart candles={stock.candles} type="MACD" height={150} />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'fundamental' && (
        <div className="space-y-6">
          <KeyRatiosGrid ratios={stock.ratios} sector={stock.sector} />
          <FundamentalTable financials={stock.financials} />
        </div>
      )}

      {activeTab === 'corporate' && (
        <div className="space-y-6">
          <CorporateActionList corporateActions={stock.corporateActions} />
        </div>
      )}

      {activeTab === 'news' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Newspaper className="w-4 h-4 text-amber-400" /> Berita Terkait Emiten {stock.ticker}
            </h3>
            <BadgeTag label="FACT" size="sm" />
          </div>

          {stock.news.length > 0 ? (
            <div className="space-y-3">
              {stock.news.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 space-y-2 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-cyan-400">{item.source}</span>
                    <BadgeTag label={item.sentiment === 'Positif' ? 'POSITIF' : item.sentiment === 'Negatif' ? 'NEGATIF' : 'NETRAL'} size="sm" />
                  </div>
                  <h4 className="font-bold text-sm text-white">{item.title}</h4>
                  <div className="space-y-1.5 text-xs">
                    <p className="text-slate-300 font-sans">{item.factContent || item.summary}</p>
                    {item.aiInterpretation && (
                      <div className="rounded-lg bg-indigo-950/30 border border-indigo-500/20 p-2 text-slate-200">
                        <strong className="text-indigo-300 font-semibold">AI Context: </strong>
                        {item.aiInterpretation}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono block">
                    {new Date(item.publishedAt).toLocaleDateString('id-ID')}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-8 text-center text-slate-500 text-xs">
              Belum ada berita spesifik terbaru untuk emiten ini dalam arsip mock.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
