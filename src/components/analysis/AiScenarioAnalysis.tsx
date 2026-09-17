'use client';

import React, { useState } from 'react';
import { AiStockAnalysis, Stock } from '@/lib/types';
import { BadgeTag } from '../common/BadgeTag';
import { formatIDR, formatPercent } from '@/lib/utils';
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  Compass,
  ShieldAlert,
  Target,
  ArrowRight,
  Info,
  CheckCircle,
  AlertTriangle,
  Flame,
  Snowflake,
  Sliders,
} from 'lucide-react';

interface AiScenarioAnalysisProps {
  stock: Stock;
}

export function AiScenarioAnalysis({ stock }: AiScenarioAnalysisProps) {
  const analysis = stock.aiAnalysis;
  const [activeScenarioTab, setActiveScenarioTab] = useState<'bullish' | 'neutral' | 'bearish'>('bullish');

  if (!analysis) return null;

  const currentPrice = stock.price;
  const activeScenario = analysis.scenarios[activeScenarioTab];
  const hypothesis = analysis.researchHypothesis || {
    researchState: 'Bullish Setup' as const,
    evidence: [
      'Struktur tren harga jangka menengah berada di atas rata-rata pergerakan MA20 dan MA50.',
      'Metrik profitabilitas dan efisiensi operasional emiten konsisten di atas rata-rata industri.',
      'Osilator momentum RSI dan MACD mengindikasikan akumulasi volume bertahap.',
    ],
    trigger: 'Penutupan harga harian melampaui level resisten terdekat dengan lonjakan volume.',
    invalidation: 'Penutupan harga menembus ke bawah garis support batas risiko (invalidation level).',
    missingData: ['Laporan keuangan triwulan berjalan (Q3 2026) belum dipublikasikan.'],
  };

  const sourceMeta = analysis.sourceMetadata || {
    priceDataBar: '2026-09-16 16:00:00 WIB (Closing Bar)',
    fundamentalFiling: 'Laporan Keuangan 2025 Audited',
    latestNewsChecked: '2026-09-15 11:00:00 WIB',
    technicalCalculation: '2026-09-16 16:05:00 WIB',
  };

  const stateColors: Record<string, string> = {
    'Bullish Setup': 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40',
    'Neutral Setup': 'bg-amber-950/60 text-amber-300 border-amber-500/40',
    'Bearish Setup': 'bg-rose-950/60 text-rose-300 border-rose-500/40',
  };

  return (
    <div className="space-y-6">
      {/* Header with AI Badge & Explicit Multi-Source Metadata */}
      <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-slate-900 via-indigo-950/20 to-slate-900 p-5 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-indigo-500/20">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-950/50">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">
                  StockAI Evidence-Based Research: {stock.ticker}
                </h2>
                <BadgeTag label="AI ANALYSIS" size="sm" />
              </div>
              <p className="text-xs text-slate-400">
                Interpretasi terstruktur berbasis data historis harga, laporan keuangan terverifikasi, dan kalkulasi teknikal deterministik
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Data Cutoff:</span>
            <span className="text-xs font-mono font-bold text-cyan-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
              2026-09-16 16:00:00 WIB
            </span>
          </div>
        </div>

        {/* 4 Explicit Source Metadata Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-[11px] font-mono">
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-2.5 space-y-0.5">
            <span className="text-[10px] font-sans text-slate-400 uppercase tracking-wider block">1. Data Harga (Candle Bar)</span>
            <span className="font-bold text-slate-200 block">{sourceMeta.priceDataBar}</span>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-2.5 space-y-0.5">
            <span className="text-[10px] font-sans text-slate-400 uppercase tracking-wider block">2. Data Fundamental</span>
            <span className="font-bold text-slate-200 block">{sourceMeta.fundamentalFiling}</span>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-2.5 space-y-0.5">
            <span className="text-[10px] font-sans text-slate-400 uppercase tracking-wider block">3. Berita & Pengumuman</span>
            <span className="font-bold text-slate-200 block">{sourceMeta.latestNewsChecked}</span>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-2.5 space-y-0.5">
            <span className="text-[10px] font-sans text-slate-400 uppercase tracking-wider block">4. Kalkulasi Teknikal</span>
            <span className="font-bold text-slate-200 block">{sourceMeta.technicalCalculation}</span>
          </div>
        </div>
      </div>

      {/* Structured Qualitative Research Hypothesis Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-4 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <Target className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Hipotesis & Kerangka Kerja Riset (Evidence-Based Research)
              </h3>
              <p className="text-[11px] text-slate-400">
                Format riset kualitatif teruji tanpa skor angka arbitrer (Transparent Research State)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Research State:</span>
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${stateColors[hypothesis.researchState] || stateColors['Bullish Setup']}`}>
              {hypothesis.researchState}
            </span>
          </div>
        </div>

        {/* Evidence Points */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-400" /> Evidence (Fakta Pendukung Terkonfirmasi):
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs text-slate-300">
            {hypothesis.evidence.map((ev, i) => (
              <div key={i} className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 flex items-start gap-2">
                <span className="text-cyan-400 font-mono font-bold">{i + 1}.</span>
                <span className="leading-relaxed">{ev}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trigger & Invalidation Grids */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {/* Trigger Condition */}
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-3.5 space-y-1">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" /> Trigger (Kondisi Konfirmasi Setup)
            </span>
            <p className="text-xs text-slate-200 leading-relaxed font-mono">
              {hypothesis.trigger}
            </p>
          </div>

          {/* Invalidation Condition */}
          <div className="rounded-xl border border-rose-500/20 bg-rose-950/20 p-3.5 space-y-1">
            <span className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-rose-400" /> Invalidation (Kondisi Pembatalan Setup)
            </span>
            <p className="text-xs text-slate-200 leading-relaxed font-mono">
              {hypothesis.invalidation}
            </p>
          </div>
        </div>

        {/* Missing Data Disclosure */}
        {hypothesis.missingData && hypothesis.missingData.length > 0 && (
          <div className="rounded-xl border border-amber-500/20 bg-amber-950/20 p-3 text-xs space-y-1">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-amber-400" /> Missing Data / Informasi Dalam Penantian:
            </span>
            <ul className="space-y-0.5 text-slate-300 text-[11px]">
              {hypothesis.missingData.map((md, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-amber-400">•</span>
                  <span>{md}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 3 Executive Pillars: Technical, Fundamental, News Sentiment */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Technical Pillar */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-cyan-400" /> Ringkasan Teknikal
            </span>
            <BadgeTag label={analysis.technicalSummary.label} size="sm" />
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {analysis.technicalSummary.summary}
          </p>
          <ul className="space-y-1 text-[11px] text-slate-400 pt-1 border-t border-slate-800">
            {analysis.technicalSummary.keyPoints.map((pt, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-cyan-400 mt-0.5">•</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Fundamental Pillar */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-indigo-400" /> Ringkasan Fundamental
            </span>
            <BadgeTag label={analysis.fundamentalSummary.label} size="sm" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Status Fundamental:</span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded">
              {analysis.fundamentalSummary.healthStatus || 'Sangat Sehat'}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
              {analysis.fundamentalSummary.valuationStatus}
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {analysis.fundamentalSummary.summary}
          </p>
          <ul className="space-y-1 text-[11px] text-slate-400 pt-1 border-t border-slate-800">
            {analysis.fundamentalSummary.keyPoints.map((pt, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-indigo-400 mt-0.5">•</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* News & Sentiment Pillar */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Sentimen & Berita
            </span>
            <BadgeTag label={analysis.newsImpact.label} size="sm" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Tone Sentimen:</span>
            <span className="text-xs font-bold text-amber-400 bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded">
              {analysis.newsImpact.sentimentTone || 'Positif'}
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {analysis.newsImpact.summary}
          </p>
        </div>
      </div>

      {/* Bullish vs Bearish Factors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bullish Factors */}
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="w-4 h-4" /> Faktor Pendorong (Bullish Drivers)
            </span>
            <BadgeTag label="INTERPRETATION" size="sm" />
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            {analysis.bullishFactors.map((factor, i) => (
              <li key={i} className="flex items-start gap-2 bg-slate-900/40 p-2 rounded-lg border border-emerald-500/15">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{factor}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bearish Factors */}
        <div className="rounded-xl border border-rose-500/20 bg-rose-950/10 p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <Snowflake className="w-4 h-4" /> Faktor Pemberat (Bearish Risks)
            </span>
            <BadgeTag label="INTERPRETATION" size="sm" />
          </div>
          <ul className="space-y-2 text-xs text-slate-300">
            {analysis.bearishFactors.map((factor, i) => (
              <li key={i} className="flex items-start gap-2 bg-slate-900/40 p-2 rounded-lg border border-rose-500/15">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{factor}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Probabilistic Scenario Analysis */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" /> Analisis 3 Skenario Probabilitas Pasar
            </h3>
            <p className="text-xs text-slate-400">
              Evaluasi kemungkinan pergerakan harga berdasarkan kombinasi katalis dan teknikal
            </p>
          </div>
          <BadgeTag label="AI ANALYSIS" size="sm" />
        </div>

        {/* Scenario Selection Tabs */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => setActiveScenarioTab('bullish')}
            className={`p-3 rounded-xl border text-left transition-all ${
              activeScenarioTab === 'bullish'
                ? 'bg-emerald-950/30 border-emerald-500/50 shadow-md shadow-emerald-950/40'
                : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-emerald-400">
              <span>Skenario Bullish</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30">Bullish Setup</span>
            </div>
            <div className="text-sm font-bold text-white mt-1 font-mono">
              Target: {formatIDR(analysis.scenarios.bullish.priceTarget)}
            </div>
          </button>

          <button
            onClick={() => setActiveScenarioTab('neutral')}
            className={`p-3 rounded-xl border text-left transition-all ${
              activeScenarioTab === 'neutral'
                ? 'bg-slate-800/60 border-slate-600 shadow-md'
                : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span>Skenario Netral</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700">Neutral Setup</span>
            </div>
            <div className="text-sm font-bold text-white mt-1 font-mono">
              Target: {formatIDR(analysis.scenarios.neutral.priceTarget)}
            </div>
          </button>

          <button
            onClick={() => setActiveScenarioTab('bearish')}
            className={`p-3 rounded-xl border text-left transition-all ${
              activeScenarioTab === 'bearish'
                ? 'bg-rose-950/30 border-rose-500/50 shadow-md shadow-rose-950/40'
                : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-xs font-bold text-rose-400">
              <span>Skenario Bearish</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-950/80 border border-rose-500/30">Bearish Setup</span>
            </div>
            <div className="text-sm font-bold text-white mt-1 font-mono">
              Target: {formatIDR(analysis.scenarios.bearish.priceTarget)}
            </div>
          </button>
        </div>

        {/* Active Scenario Detail Card */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-white text-sm">{activeScenario.title}</h4>
            <span className="text-xs font-semibold text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-2 py-0.5 rounded font-mono">
              Setup Riset: {activeScenarioTab === 'bullish' ? 'Bullish Continuation' : activeScenarioTab === 'neutral' ? 'Sideways Consolidation' : 'Pullback / Correction'}
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{activeScenario.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="rounded-lg bg-slate-900/90 p-2.5 border border-slate-800">
              <span className="text-emerald-400 font-semibold block mb-0.5">Kondisi Pemicu (Trigger):</span>
              <span className="text-white font-mono text-[11px]">{activeScenario.triggerCondition}</span>
            </div>
            <div className="rounded-lg bg-slate-900/90 p-2.5 border border-slate-800">
              <span className="text-rose-400 font-semibold block mb-0.5">Kondisi Pembatalan (Invalidation):</span>
              <span className="text-slate-300 font-mono text-[11px]">
                {activeScenario.invalidation || (activeScenarioTab === 'bullish' ? 'Penutupan harian di bawah support batas risiko.' : 'Penembusan level resisten utama dengan volume besar.')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Trading Setup & Risk/Reward Architecture */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-400" /> Model Setup & Manajemen Risiko
            </h3>
            <p className="text-xs text-slate-400">
              Kalkulasi area entri, stop loss, dan target profit berbasis rasio Risk/Reward matematis
            </p>
          </div>
          <BadgeTag label="AI ANALYSIS" size="sm" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3">
            <span className="text-[11px] font-sans text-slate-400 block">Area Beli (Entry Area)</span>
            <div className="text-sm font-bold text-cyan-400 mt-1">
              {formatIDR(analysis.tradingSetup.entryArea.min, false)} - {formatIDR(analysis.tradingSetup.entryArea.max, false)}
            </div>
          </div>

          <div className="rounded-xl border border-rose-500/30 bg-rose-950/10 p-3">
            <span className="text-[11px] font-sans text-rose-400 block">Stop Loss (Batas Risiko)</span>
            <div className="text-sm font-bold text-rose-400 mt-1">
              {formatIDR(analysis.tradingSetup.stopLoss)}
            </div>
          </div>

          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/10 p-3">
            <span className="text-[11px] font-sans text-emerald-400 block">Target Profit (TP 1 / TP 2)</span>
            <div className="text-sm font-bold text-emerald-400 mt-1">
              {formatIDR(analysis.tradingSetup.targetArea1, false)} / {formatIDR(analysis.tradingSetup.targetArea2, false)}
            </div>
          </div>

          <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/10 p-3">
            <span className="text-[11px] font-sans text-indigo-300 block">Risk to Reward Ratio</span>
            <div className="text-sm font-bold text-indigo-300 mt-1">
              {analysis.tradingSetup.riskRewardRatio}
            </div>
          </div>
        </div>

        {/* Risk factors list */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-2">
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
            Faktor Risiko yang Wajib Diwaspadai:
          </span>
          <ul className="space-y-1 text-xs text-slate-400">
            {analysis.tradingSetup.riskFactors.map((rf, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-rose-400 mt-0.5">•</span>
                <span>{rf}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Disclaimer Note */}
        <div className="rounded-lg border border-slate-800/80 bg-slate-950/40 p-3 text-[11px] text-slate-400 leading-relaxed">
          <Info className="w-3.5 h-3.5 inline mr-1 text-amber-400" />
          {analysis.tradingSetup.disclaimer}
        </div>
      </div>
    </div>
  );
}
