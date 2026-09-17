import React from 'react';
import { MOCK_MARKET_SENTIMENT } from '@/data/mockMarket';
import { BadgeTag } from '../common/BadgeTag';
import { Activity, Gauge, CheckCircle2, TrendingUp, Compass } from 'lucide-react';

export function MarketSentimentGauge() {
  const { sentiment, score, title, summary, factors } = MOCK_MARKET_SENTIMENT;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl backdrop-blur-md space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Gauge className="w-4 h-4 text-cyan-400" /> Indikator Sentimen Pasar (IHSG Sentiment)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Kombinasi analisis foreign flow, market breadth, dan stabilitas makroekonomi
          </p>
        </div>
        <BadgeTag label="AI ANALYSIS" size="sm" />
      </div>

      {/* Meter Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-rose-400">Extreme Fear (0)</span>
          <span className="font-bold text-sm text-cyan-300 font-mono">Score: {score} / 100</span>
          <span className="font-semibold text-emerald-400">Extreme Greed (100)</span>
        </div>

        {/* Progress Bar with Color Gradient */}
        <div className="relative h-4 w-full rounded-full bg-slate-950 p-0.5 border border-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 transition-all duration-500"
            style={{ width: `${score}%` }}
          />
        </div>

        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>Bearish (0-40)</span>
          <span>Netral (40-60)</span>
          <span>Bullish (60-100)</span>
        </div>
      </div>

      {/* Summary Box */}
      <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-2">
        <div className="font-semibold text-xs text-white flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          {title}
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">{summary}</p>
      </div>

      {/* Contributing Factors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-2 rounded-lg bg-slate-950/40 p-2 border border-slate-800/80">
          <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="text-slate-300">{factors.foreignFlow}</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-slate-950/40 p-2 border border-slate-800/80">
          <Activity className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="text-slate-300">{factors.advancingDecliningRatio}</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-slate-950/40 p-2 border border-slate-800/80">
          <Compass className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span className="text-slate-300">{factors.marketBreadth}</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-slate-950/40 p-2 border border-slate-800/80">
          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-slate-300">{factors.macroVibe}</span>
        </div>
      </div>
    </div>
  );
}
