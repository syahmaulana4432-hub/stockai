'use client';

import React, { useState } from 'react';
import { Globe, ChevronDown, ChevronUp, Layers, Building2 } from 'lucide-react';

interface MarketCoverageItem {
  country: string;
  code: string;
  flag: string;
  exchanges: string[];
  assetClasses: string[];
  sampleTickers: string[];
  status: 'Available (Demo)' | 'Full Live Feed' | 'Delayed';
}

const MARKET_COVERAGE: MarketCoverageItem[] = [
  {
    country: 'United States',
    code: 'US',
    flag: '🇺🇸',
    exchanges: ['NASDAQ', 'NYSE', 'AMEX'],
    assetClasses: ['Stocks', 'ETFs', 'REITs', 'ADRs'],
    sampleTickers: ['AAPL', 'MSFT', 'NVDA', 'AMZN', 'SPY', 'VNQ', 'TSM'],
    status: 'Available (Demo)',
  },
  {
    country: 'Indonesia',
    code: 'ID',
    flag: '🇮🇩',
    exchanges: ['IDX (Bursa Efek Indonesia)'],
    assetClasses: ['Stocks'],
    sampleTickers: ['BBCA', 'BBRI', 'BMRI', 'TLKM'],
    status: 'Available (Demo)',
  },
  {
    country: 'Japan',
    code: 'JP',
    flag: '🇯🇵',
    exchanges: ['TSE (Tokyo Stock Exchange)'],
    assetClasses: ['Stocks', 'ETFs'],
    sampleTickers: ['7203 (Toyota)', '6758 (Sony)'],
    status: 'Available (Demo)',
  },
  {
    country: 'Hong Kong',
    code: 'HK',
    flag: '🇭🇰',
    exchanges: ['HKEX (Hong Kong Exchanges)'],
    assetClasses: ['Stocks', 'REITs'],
    sampleTickers: ['0700 (Tencent)', '9988 (Alibaba)'],
    status: 'Available (Demo)',
  },
  {
    country: 'United Kingdom',
    code: 'GB',
    flag: '🇬🇧',
    exchanges: ['LSE (London Stock Exchange)'],
    assetClasses: ['Stocks', 'ETFs'],
    sampleTickers: ['VOD (Vodafone)', 'AZN (AstraZeneca)'],
    status: 'Available (Demo)',
  },
  {
    country: 'Singapore',
    code: 'SG',
    flag: '🇸🇬',
    exchanges: ['SGX (Singapore Exchange)'],
    assetClasses: ['Stocks', 'REITs'],
    sampleTickers: ['D05 (DBS Group)', 'Z74 (Singtel)'],
    status: 'Available (Demo)',
  },
  {
    country: 'Australia',
    code: 'AU',
    flag: '🇦🇺',
    exchanges: ['ASX (Australian Securities Exchange)'],
    assetClasses: ['Stocks', 'REITs'],
    sampleTickers: ['BHP (BHP Group)', 'CBA (CommBank)'],
    status: 'Available (Demo)',
  },
  {
    country: 'Canada',
    code: 'CA',
    flag: '🇨🇦',
    exchanges: ['TSX (Toronto Stock Exchange)'],
    assetClasses: ['Stocks', 'ETFs'],
    sampleTickers: ['SHOP (Shopify)', 'RY (Royal Bank)'],
    status: 'Available (Demo)',
  },
  {
    country: 'Europe',
    code: 'EU',
    flag: '🇪🇺',
    exchanges: ['EURONEXT (Amsterdam, Paris, Brussels)'],
    assetClasses: ['Stocks', 'ETFs'],
    sampleTickers: ['ASML', 'MC (LVMH)'],
    status: 'Available (Demo)',
  },
];

export function MarketCoveragePanel() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl backdrop-blur-md overflow-hidden transition-all">
      {/* Panel Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-800/40 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <span>Market Universe & Global Coverage</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                9 Pasar Global • 11 Bursa
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Cakupan bursa Amerika, Asia-Pasifik, dan Eropa dalam arsitektur multi-market terbuka.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
        >
          <span>{isExpanded ? 'Sembunyikan' : 'Lihat Detail Bursa'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expanded Details Grid */}
      {isExpanded && (
        <div className="p-4 pt-0 border-t border-slate-800/80 bg-slate-950/50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-3">
            {MARKET_COVERAGE.map((item) => (
              <div
                key={item.code}
                className="rounded-xl border border-slate-800 bg-slate-900/70 p-3.5 space-y-2 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-xs text-white">
                    <span className="text-base">{item.flag}</span>
                    <span>{item.country}</span>
                  </div>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                    {item.code}
                  </span>
                </div>

                <div className="text-[11px] space-y-1 text-slate-400">
                  <div className="flex items-center gap-1 text-slate-300">
                    <Building2 className="w-3 h-3 text-indigo-400 shrink-0" />
                    <span className="truncate">{item.exchanges.join(', ')}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400 text-[10px]">
                    <Layers className="w-3 h-3 text-teal-400 shrink-0" />
                    <span>Aset: {item.assetClasses.join(', ')}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    Contoh: <strong className="text-slate-400">{item.sampleTickers.join(', ')}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
