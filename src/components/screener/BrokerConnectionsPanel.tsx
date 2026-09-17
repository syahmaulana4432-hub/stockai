'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Layers, ShieldCheck, ChevronDown, ChevronUp, ArrowRight, CheckCircle2, Lock, Workflow } from 'lucide-react';
import { COUNTRY_FLAGS } from '@/lib/currency';

interface BrokerMetaSimple {
  id: string;
  name: string;
  country: string;
  flag: string;
  exchanges: string[];
  status: 'Connected' | 'Available' | 'Coming Soon' | 'Not Connected';
  statusColor: 'emerald' | 'cyan' | 'slate' | 'purple';
  type: string;
}

const BROKERS_CATALOG: BrokerMetaSimple[] = [
  {
    id: 'ibkr',
    name: 'Interactive Brokers (IBKR)',
    country: 'Global / US',
    flag: '🌐',
    exchanges: ['NYSE', 'NASDAQ', 'LSE', 'TSE', 'HKEX', 'ASX', 'SGX'],
    status: 'Connected',
    statusColor: 'emerald',
    type: 'Multi-Market Global Broker',
  },
  {
    id: 'alpaca',
    name: 'Alpaca Markets',
    country: 'United States',
    flag: '🇺🇸',
    exchanges: ['NASDAQ', 'NYSE', 'AMEX'],
    status: 'Connected',
    statusColor: 'emerald',
    type: 'Algorithmic & Fractional US Broker',
  },
  {
    id: 'mandiri',
    name: 'Mandiri Sekuritas (MOST)',
    country: 'Indonesia',
    flag: '🇮🇩',
    exchanges: ['IDX'],
    status: 'Connected',
    statusColor: 'emerald',
    type: 'BUMN Domestic Broker',
  },
  {
    id: 'saxo',
    name: 'Saxo Bank',
    country: 'Global / Europe',
    flag: '🇪🇺',
    exchanges: ['EURONEXT', 'LSE', 'NASDAQ', 'SGX'],
    status: 'Available',
    statusColor: 'cyan',
    type: 'Multi-Asset Prime Broker',
  },
  {
    id: 'schwab',
    name: 'Charles Schwab',
    country: 'United States',
    flag: '🇺🇸',
    exchanges: ['NYSE', 'NASDAQ', 'AMEX'],
    status: 'Available',
    statusColor: 'cyan',
    type: 'Retail & Institutional US Broker',
  },
  {
    id: 't212',
    name: 'Trading 212',
    country: 'United Kingdom / Europe',
    flag: '🇬🇧',
    exchanges: ['LSE', 'EURONEXT', 'NASDAQ'],
    status: 'Coming Soon',
    statusColor: 'purple',
    type: 'Commission-free Retail Broker',
  },
  {
    id: 'ipot',
    name: 'Indo Premier (IPOT)',
    country: 'Indonesia',
    flag: '🇮🇩',
    exchanges: ['IDX'],
    status: 'Available',
    statusColor: 'cyan',
    type: 'Retail Investment Platform',
  },
  {
    id: 'stockbit',
    name: 'Stockbit Sekuritas',
    country: 'Indonesia',
    flag: '🇮🇩',
    exchanges: ['IDX'],
    status: 'Available',
    statusColor: 'cyan',
    type: 'Social Investing Broker',
  },
];

export function BrokerConnectionsPanel() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl backdrop-blur-md overflow-hidden transition-all">
      {/* Panel Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-800/40 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <span>Broker & Trading Connections</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-950/60 text-indigo-300 border border-indigo-500/30">
                Multi-Broker Ready
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Pemisahan arsitektur antara data provider pasar dan eksekusi broker resmi.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
        >
          <span>{isExpanded ? 'Sembunyikan' : 'Kelola Koneksi Broker'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="p-4 pt-0 border-t border-slate-800/80 bg-slate-950/50 space-y-4">
          {/* How Broker Connection Works Flow */}
          <div className="pt-3">
            <div className="text-xs font-bold text-slate-200 mb-2 flex items-center gap-1.5">
              <Workflow className="w-4 h-4 text-indigo-400" />
              <span>How Broker Connection Works:</span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl border border-slate-800 bg-slate-900/60 font-mono text-[11px] text-slate-300">
              <span className="px-2.5 py-1 rounded bg-slate-800 text-white font-bold">1. Broker Selection</span>
              <span className="text-slate-600">→</span>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-white font-bold">2. Secure Auth (OAuth/Token)</span>
              <span className="text-slate-600">→</span>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-white font-bold">3. Account Sync</span>
              <span className="text-slate-600">→</span>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-white font-bold">4. Portfolio & Positions</span>
              <span className="text-slate-600">→</span>
              <span className="px-2.5 py-1 rounded bg-indigo-950 text-indigo-300 font-bold border border-indigo-500/30">5. Unified Trading Interface</span>
            </div>
          </div>

          {/* Broker Independence Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-400">
            <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/80">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>Independensi Screener:</strong> Screener tidak terikat pada satu broker tertentu. Hasil analisis dapat diterapkan ke broker pilihan Anda.
              </span>
            </div>
            <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-900/40 border border-slate-800/80">
              <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Zero Custody:</strong> StockAI tidak pernah memegang dana kas Anda. Eksekusi order diarahkan melalui API resmi sekuritas terlisensi.
              </span>
            </div>
          </div>

          {/* Brokers Catalog Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
            {BROKERS_CATALOG.map((b) => (
              <div
                key={b.id}
                className="p-3 rounded-xl border border-slate-800 bg-slate-900/80 space-y-1.5 hover:border-slate-700 transition-colors text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-base">{b.flag}</span>
                  <span
                    className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border ${
                      b.status === 'Connected'
                        ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
                        : b.status === 'Available'
                        ? 'bg-cyan-950/40 text-cyan-300 border-cyan-500/30'
                        : 'bg-purple-950/40 text-purple-300 border-purple-500/30'
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
                <div className="font-bold text-white text-xs truncate">{b.name}</div>
                <div className="text-[10px] text-slate-400 font-mono truncate">{b.exchanges.join(', ')}</div>
              </div>
            ))}
          </div>

          {/* Action Link to Full Broker Hub */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
            <span className="text-slate-400 text-[11px]">
              Kelola kredensial API dan sinkronisasi portofolio broker di Connection Hub.
            </span>
            <Link
              href="/brokers"
              className="flex items-center gap-1 font-semibold text-indigo-400 hover:text-indigo-300"
            >
              <span>Buka Broker Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
