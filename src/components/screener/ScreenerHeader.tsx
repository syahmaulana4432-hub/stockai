'use client';

import React from 'react';
import { SlidersHorizontal, RefreshCw, Clock, Database, Globe, Activity } from 'lucide-react';

interface ScreenerHeaderProps {
  lastUpdated: string;
  isRefreshing: boolean;
  onRefresh: () => void;
  totalStocks: number;
}

export function ScreenerHeader({
  lastUpdated,
  isRefreshing,
  onRefresh,
  totalStocks,
}: ScreenerHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-950/40">
            <SlidersHorizontal className="h-4 w-4" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Global Stock Screener
          </h1>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
            MOCK DATA
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Screener kuantitatif deterministik untuk menyaring saham, ETF, REIT, dan ADR lintas bursa global secara objektif dan transparan.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex flex-col text-right text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5 justify-end font-mono">
            <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.2 rounded bg-slate-900 border border-slate-800 text-cyan-300 font-sans">
              <Activity className="w-3 h-3 text-cyan-400" /> Data Status: <strong>Demo / Mock Data</strong>
            </span>
          </div>
          <div className="flex items-center gap-1 justify-end font-mono text-slate-400 mt-1">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span suppressHydrationWarning>Last Updated: <strong className="text-slate-200">{lastUpdated}</strong></span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-500">TZ: UTC+7 (WIB)</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:border-cyan-500/50 hover:text-white transition-all disabled:opacity-50 shadow-sm"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{isRefreshing ? 'Memuat Data...' : 'Refresh Data'}</span>
        </button>
      </div>
    </div>
  );
}
