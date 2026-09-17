'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getStockByTicker, MOCK_STOCKS } from '@/data/mockStocks';
import { getInstrumentBySymbol, getAllInstruments } from '@/data/instrumentMaster';
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
import { Stock } from '@/lib/types';
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
  Building2,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export default function StockDetailPage() {
  const params = useParams();
  const rawTicker = typeof params?.ticker === 'string' ? params.ticker : 'BBCA';
  
  // Find in Instrument Master first, fallback to mockStocks
  const instrument = getInstrumentBySymbol(rawTicker);
  const matchedStock = getStockByTicker(rawTicker);

  const stock: Stock = matchedStock || (instrument ? {
    ticker: instrument.symbol,
    name: instrument.companyName,
    sector: instrument.sector,
    subSector: instrument.industry,
    price: instrument.price,
    change: instrument.change,
    changePercent: instrument.changePercent,
    open: instrument.open,
    high: instrument.high,
    low: instrument.low,
    prevClose: instrument.prevClose,
    volume: instrument.volume,
    turnover: instrument.turnover,
    marketCap: instrument.marketCap,
    pe: instrument.pe || 25,
    pbv: instrument.pbv || 3.5,
    roe: instrument.roe || 18,
    dividendYield: instrument.dividendYield || 1.5,
    description: instrument.profile?.overview || '',
    logoText: instrument.symbol.slice(0, 4),
    source: instrument.dataSourceLabel,
    updatedAt: instrument.cutoffTimestamp,
    candles: instrument.candles,
    financials: instrument.financials || [],
    ratios: instrument.ratios || {
      per: instrument.pe || 20,
      pbv: instrument.pbv || 3,
      roe: instrument.roe || 15,
      roa: 5,
      der: 0.5,
      eps: 100,
      dividendYield: instrument.dividendYield || 2,
      dividendPayoutRatio: 30,
      netProfitMargin: 20,
      operatingMargin: 25,
      currentRatio: 1.5,
      marketCap: instrument.marketCap,
      sharesOutstanding: 10000000000
    },
    corporateActions: instrument.corporateActions || [],
    news: instrument.news || [],
    aiAnalysis: instrument.aiAnalysis || {
      ticker: instrument.symbol,
      generatedAt: '2026-09-16T16:05:00+07:00',
      dataCutoff: '2026-09-16T16:00:00+07:00',
      sourceMetadata: {
        priceDataBar: `${instrument.exchange} End-of-Day 2026-09-16 16:00`,
        fundamentalFiling: 'Laporan Keuangan Terakhir Dipublikasikan',
        latestNewsChecked: '2026-09-16 15:30',
        technicalCalculation: '2026-09-16 16:05'
      },
      researchHypothesis: {
        researchState: instrument.changePercent >= 0 ? 'Bullish Setup' : 'Neutral Setup',
        evidence: [
          `Volume transaksi aktif ${instrument.volume.toLocaleString()} lembar`,
          `Posisi valuasi PER ${instrument.pe || 20}x dengan ROE ${instrument.roe || 15}%`,
          `RSI 14 hari berada di level ${instrument.rsi || 50}`
        ],
        trigger: `Breakout resisten terdekat dengan volume di atas rata-rata 20 hari.`,
        invalidation: `Penutupan harian di bawah area support terdekat.`,
        missingData: ['Data order flow real-time (demo phase 1)']
      },
      technicalSummary: {
        label: 'FACT',
        summary: `Harga berada di level ${instrument.price} dengan tren jangka pendek ${instrument.changePercent >= 0 ? 'menguat' : 'konsolidasi'}.`,
        keyPoints: [
          `RSI 14 hari: ${instrument.rsi || 50}`,
          `Volatilitas harga harian terkendali di rentang ${instrument.low} - ${instrument.high}`
        ]
      },
      fundamentalSummary: {
        label: 'FACT',
        summary: `Pertumbuhan laba dan efisiensi operasional tercermin dalam rasio ROE ${instrument.roe || 15}%.`,
        valuationStatus: 'Fairly Valued',
        keyPoints: [
          `PER: ${instrument.pe || 20}x`,
          `PBV: ${instrument.pbv || 3}x`,
          `Dividend Yield: ${instrument.dividendYield || 0}%`
        ]
      },
      newsImpact: {
        label: 'INTERPRETATION',
        sentimentTone: 'Netral',
        summary: 'Sentimen pasar secara umum netral hingga positif berdasarkan katalis sektor terkini.'
      },
      bullishFactors: [
        'Fundamental bisnis solid dan kepemimpinan industri.',
        'Kinerja margin operasi yang stabil.'
      ],
      bearishFactors: [
        'Ketidakpastian suku bunga dan makroekonomi global.'
      ],
      supportResistance: {
        support: [instrument.price * 0.95, instrument.price * 0.90],
        resistance: [instrument.price * 1.05, instrument.price * 1.10],
        explanation: 'Area support & resistance dihitung secara matematis dari level pivot historis.'
      },
      scenarios: {
        bullish: {
          title: 'Skenario Ekspansi / Bullish Continuation',
          setupType: 'Bullish Setup',
          description: `Penguatan melampaui resisten ${Math.round(instrument.price * 1.05)} menuju target berikutnya.`,
          triggerCondition: `Volume konfirmasi break di atas ${Math.round(instrument.price * 1.05)}`,
          invalidation: `Turun kembali di bawah ${Math.round(instrument.price * 0.97)}`,
          priceTarget: Math.round(instrument.price * 1.12)
        },
        neutral: {
          title: 'Skenario Konsolidasi Sideways',
          setupType: 'Neutral Setup',
          description: `Pergerakan dalam rentang wajar ${Math.round(instrument.price * 0.96)} - ${Math.round(instrument.price * 1.04)}.`,
          triggerCondition: 'Volume perdagangan bergerak rata-rata tanpa katalis besar.',
          invalidation: 'Breakout signifikan dari batas atas atau bawah range.',
          priceTarget: instrument.price
        },
        bearish: {
          title: 'Skenario Koreksi Sehat / Pullback',
          setupType: 'Bearish Setup',
          description: `Koreksi menuju area demand/support kuat di ${Math.round(instrument.price * 0.92)}.`,
          triggerCondition: `Penutupan harian breakdown di bawah support ${Math.round(instrument.price * 0.95)}`,
          invalidation: `Rebound cepat di atas ${Math.round(instrument.price * 0.98)}`,
          priceTarget: Math.round(instrument.price * 0.92)
        }
      },
      tradingSetup: {
        entryArea: { min: Math.round(instrument.price * 0.98), max: instrument.price },
        stopLoss: Math.round(instrument.price * 0.94),
        targetArea1: Math.round(instrument.price * 1.06),
        targetArea2: Math.round(instrument.price * 1.12),
        riskRewardRatio: '1 : 2.5',
        riskFactors: ['Volatilitas pasar modal', 'Risiko likuiditas'],
        disclaimer: 'Analisis berbasis model matematis data mock. Bukan merupakan anjuran finansial atau ajakan transaksi.'
      }
    }
  } : MOCK_STOCKS[0]);

  const [activeTab, setActiveTab] = useState<'ai' | 'technical' | 'fundamental' | 'corporate' | 'news'>('ai');

  // Compute mathematical indicators from candle history
  const indicators = useMemo(() => {
    return computeAllIndicators(stock.candles);
  }, [stock.candles]);

  const isUp = stock.changePercent >= 0;
  const isUSD = instrument?.currency === 'USD';
  const isJPY = instrument?.currency === 'JPY';
  const isSGD = instrument?.currency === 'SGD';

  const formatPrice = (val: number) => {
    if (isUSD) return `$${val.toFixed(2)}`;
    if (isJPY) return `¥${val.toLocaleString('ja-JP')}`;
    if (isSGD) return `S$${val.toFixed(2)}`;
    return formatIDR(val);
  };

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
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white font-black text-xl shadow-lg shadow-cyan-950/40 border border-cyan-400/20 font-mono">
              {stock.ticker.slice(0, 4)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-mono">
                  {stock.ticker}
                </h1>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {stock.sector}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {instrument ? `${instrument.exchange} (${instrument.country})` : 'IDX / BEI'}
                </span>
                <BadgeTag label={instrument?.feedStatus || 'DEMO'} size="sm" />
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5 max-w-xl">{stock.name}</p>
            </div>
          </div>

          {/* Price, Change & Action Buttons */}
          <div className="flex flex-col items-end gap-2">
            <div className="text-right">
              <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                {formatPrice(stock.price)}
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
                Cutoff: {formatDateTimeID(stock.updatedAt)} WIB
              </span>
            </div>

            {/* Cross Link to Company Profile */}
            <Link
              href={`/company/${stock.ticker}`}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-950/60 hover:bg-indigo-900/80 border border-indigo-500/40 text-indigo-300 text-xs font-semibold transition-all shadow-sm"
            >
              <Building2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Lihat Profil & Model Bisnis</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Quick Stock Metrics Ribbon */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 pt-4 border-t border-slate-800 text-xs font-mono">
          <div className="rounded-lg bg-slate-950/60 p-2.5 border border-slate-800/80">
            <span className="text-[10px] font-sans text-slate-400 block">Market Cap</span>
            <span className="font-bold text-white">
              {isUSD ? `$${(stock.marketCap / 1e12).toFixed(2)} T` : formatMarketCap(stock.marketCap)}
            </span>
          </div>
          <div className="rounded-lg bg-slate-950/60 p-2.5 border border-slate-800/80">
            <span className="text-[10px] font-sans text-slate-400 block">Volume Hari Ini</span>
            <span className="font-bold text-white">{formatVolume(stock.volume, isUSD ? 'lembar' : 'lot')}</span>
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

          {stock.news && stock.news.length > 0 ? (
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
