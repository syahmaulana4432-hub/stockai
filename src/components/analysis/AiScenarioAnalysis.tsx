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

  return (
    <div className="space-y-6">
      {/* Header with AI Badge & Metadata */}
      <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-slate-900 via-indigo-950/20 to-slate-900 p-5 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-indigo-500/20">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-950/50">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white">
                  StockAI Scenario Intelligence: {stock.ticker}
                </h2>
                <BadgeTag label="AI ANALYSIS" size="sm" />
              </div>
              <p className="text-xs text-slate-400">
                Pemodelan probabilistik terkomputasi berbasis data historis harga & laporan keuangan BEI
              </p>
            </div>
          </div>

          <div className="text-right text-[11px] text-slate-400">
            <div>Data Cutoff: <strong className="text-slate-300">{new Date(analysis.dataCutoff).toLocaleDateString('id-ID')} 16:00 WIB</strong></div>
            <div>Source: <span className="text-cyan-400">{stock.source}</span></div>
          </div>
        </div>

        {/* 3 Executive Pillars: Technical, Fundamental, News Sentiment */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Technical Pillar */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-cyan-400" /> Ringkasan Teknikal
              </span>
              <BadgeTag label={analysis.technicalSummary.label} size="sm" />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {analysis.technicalSummary.summary}
            </p>
            <ul className="space-y-1 text-[11px] text-slate-400">
              {analysis.technicalSummary.keyPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Fundamental Pillar */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-indigo-400" /> Ringkasan Fundamental
              </span>
              <BadgeTag label={analysis.fundamentalSummary.label} size="sm" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Health Score:</span>
              <span className="font-bold text-sm text-emerald-400 font-mono">
                {analysis.fundamentalSummary.healthScore}/100
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                {analysis.fundamentalSummary.valuationStatus}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {analysis.fundamentalSummary.summary}
            </p>
            <ul className="space-y-1 text-[11px] text-slate-400">
              {analysis.fundamentalSummary.keyPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-indigo-400 mt-0.5">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* News & Sentiment Pillar */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Sentimen & Berita
              </span>
              <BadgeTag label={analysis.newsImpact.label} size="sm" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Sentiment Score:</span>
              <span className="font-bold text-sm text-amber-400 font-mono">
                +{analysis.newsImpact.sentimentScore}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {analysis.newsImpact.summary}
            </p>
          </div>
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
              <span>Bullish Scenario</span>
              <span className="font-mono">{analysis.scenarios.bullish.probability}% Prob.</span>
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
              <span>Neutral / Sideways</span>
              <span className="font-mono">{analysis.scenarios.neutral.probability}% Prob.</span>
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
              <span>Bearish Scenario</span>
              <span className="font-mono">{analysis.scenarios.bearish.probability}% Prob.</span>
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
            <span className="text-xs font-semibold text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-2 py-0.5 rounded">
              Probabilitas Estimasi: {activeScenario.probability}%
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">{activeScenario.description}</p>
          <div className="rounded-lg bg-slate-900/90 p-2.5 border border-slate-800 text-xs">
            <span className="text-slate-400 font-semibold block mb-0.5">Kondisi Pemicu (Trigger Condition):</span>
            <span className="text-white font-mono">{activeScenario.triggerCondition}</span>
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
