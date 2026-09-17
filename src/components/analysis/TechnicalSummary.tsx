import React from 'react';
import { TechnicalIndicators } from '@/lib/types';
import { BadgeTag } from '../common/BadgeTag';
import { formatIDR } from '@/lib/utils';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Compass,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  Zap,
} from 'lucide-react';

interface TechnicalSummaryProps {
  indicators: TechnicalIndicators;
  currentPrice: number;
}

export function TechnicalSummary({ indicators, currentPrice }: TechnicalSummaryProps) {
  const { signals, sma20, sma50, sma200, ema20, rsi14, macd, bollingerBands, supportLevels, resistanceLevels } =
    indicators;

  return (
    <div className="space-y-4">
      {/* Consensus Bar */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Technical Consensus (Kalkulasi Matematis)
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg font-bold text-white">{signals.overallSignal}</span>
              <BadgeTag label="FACT" size="sm" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Tren:</span>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded border ${
                signals.trend === 'Uptrend'
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : signals.trend === 'Downtrend'
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                  : 'bg-slate-800 border-slate-700 text-slate-300'
              }`}
            >
              {signals.trend}
            </span>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded border ${
                signals.pattern === 'Breakout'
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                  : signals.pattern === 'Breakdown'
                  ? 'bg-rose-500/20 border-rose-400 text-rose-300'
                  : 'bg-slate-800 border-slate-700 text-slate-300'
              }`}
            >
              {signals.pattern}
            </span>
          </div>
        </div>

        {/* Indicator Values Grid */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div className="rounded-lg bg-slate-950/60 p-2.5 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-sans block">SMA 20 / SMA 50</span>
            <span className="font-semibold text-white">
              {formatIDR(sma20, false)} / {formatIDR(sma50, false)}
            </span>
            <span
              className={`text-[10px] block mt-0.5 ${
                currentPrice > sma20 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {currentPrice > sma20 ? 'Di atas SMA20 (Bullish)' : 'Di bawah SMA20 (Bearish)'}
            </span>
          </div>

          <div className="rounded-lg bg-slate-950/60 p-2.5 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-sans block">SMA 200 (Long Term)</span>
            <span className="font-semibold text-white">{formatIDR(sma200, false)}</span>
            <span
              className={`text-[10px] block mt-0.5 ${
                signals.maCross === 'Golden Cross' ? 'text-emerald-400' : 'text-slate-400'
              }`}
            >
              {signals.maCross}
            </span>
          </div>

          <div className="rounded-lg bg-slate-950/60 p-2.5 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-sans block">RSI 14 (Momentum)</span>
            <span
              className={`font-semibold ${
                rsi14 >= 70 ? 'text-rose-400' : rsi14 <= 30 ? 'text-emerald-400' : 'text-white'
              }`}
            >
              {rsi14.toFixed(1)}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">{signals.rsiStatus}</span>
          </div>

          <div className="rounded-lg bg-slate-950/60 p-2.5 border border-slate-800">
            <span className="text-[11px] text-slate-400 font-sans block">MACD Histogram</span>
            <span
              className={`font-semibold ${
                macd.histogram >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {macd.histogram >= 0 ? `+${macd.histogram}` : macd.histogram}
            </span>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              {macd.histogram >= 0 ? 'Positive Momentum' : 'Negative Momentum'}
            </span>
          </div>
        </div>
      </div>

      {/* Support & Resistance Table */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-3.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            <Shield className="w-4 h-4" /> Support Levels (Demand Zones)
          </div>
          <div className="space-y-1.5 text-xs font-mono">
            {supportLevels.map((s, idx) => (
              <div key={idx} className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400 font-sans">Support S{idx + 1}:</span>
                <span className="font-bold text-emerald-400">{formatIDR(s)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-rose-500/20 bg-rose-950/10 p-3.5">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-wider mb-2">
            <Zap className="w-4 h-4" /> Resistance Levels (Supply Zones)
          </div>
          <div className="space-y-1.5 text-xs font-mono">
            {resistanceLevels.map((r, idx) => (
              <div key={idx} className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400 font-sans">Resistance R{idx + 1}:</span>
                <span className="font-bold text-rose-400">{formatIDR(r)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
