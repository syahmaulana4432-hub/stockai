'use client';

import React, { useState } from 'react';
import { Database, ShieldCheck, ChevronDown, ChevronUp, AlertCircle, RefreshCw } from 'lucide-react';

interface DataSourceItem {
  id: string;
  name: string;
  provider: string;
  marketCoverage: string;
  dataType: string;
  lastUpdated: string;
  status: 'Connected (Demo/Mock)' | 'Live API Connected' | 'Not Connected' | 'Development';
  statusColor: 'amber' | 'emerald' | 'slate' | 'cyan';
  note: string;
}

const DATA_SOURCES: DataSourceItem[] = [
  {
    id: 'market_data',
    name: 'Market Price & Volume Feed',
    provider: 'StockAI Mock Data Engine',
    marketCoverage: 'US, IDX, TSE, HKEX, LSE, SGX, ASX, TSX, EURONEXT',
    dataType: 'OHLCV, Bid/Ask, Realtime Mock Simulation',
    lastUpdated: '16 Sep 2026, 16:00 UTC+7',
    status: 'Connected (Demo/Mock)',
    statusColor: 'amber',
    note: 'Dataset demo statis untuk pengembangan antarmuka kuantitatif tanpa latensi broker eksternal.',
  },
  {
    id: 'fundamental_data',
    name: 'Financial Statements & Valuation',
    provider: 'StockAI Fundamental Mock Engine',
    marketCoverage: 'Global (9 Regions)',
    dataType: 'Income Statement, Balance Sheet, Cash Flow, PER, PBV, ROE',
    lastUpdated: 'Q2 2026 Reports (Mock)',
    status: 'Connected (Demo/Mock)',
    statusColor: 'amber',
    note: 'Metrik fundamental disinkronkan dengan laporan keuangan sampel emiten global.',
  },
  {
    id: 'news_data',
    name: 'Financial News & Macro Feed',
    provider: 'Global News Aggregator API',
    marketCoverage: 'Global Wire Services',
    dataType: 'Market News, Corporate Releases, Sentiment Feeds',
    lastUpdated: 'Pending API Setup',
    status: 'Not Connected',
    statusColor: 'slate',
    note: 'Integrasi backend RSS/API berita global belum terhubung pada tahap UI MVP ini.',
  },
  {
    id: 'corporate_actions',
    name: 'Corporate Actions & Dividends',
    provider: 'StockAI Corporate Action Registry',
    marketCoverage: 'US, IDX, TSE, SGX',
    dataType: 'Dividends, Stock Splits, Rights Issues',
    lastUpdated: '16 Sep 2026',
    status: 'Connected (Demo/Mock)',
    statusColor: 'amber',
    note: 'Jadwal dividen dan yield dihitung berdasarkan data historis sampel.',
  },
];

export function DataSourcesPanel() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl backdrop-blur-md overflow-hidden transition-all">
      {/* Panel Header */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-800/40 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/30">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <span>Data Sources & Provider Architecture</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-950/60 text-amber-300 border border-amber-500/30">
                Mode: Demo / Mock Data
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">
              Transparansi status data: Membedakan data aktual, data simulasi/mock, dan koneksi API eksternal.
            </p>
          </div>
        </div>

        <button
          type="button"
          className="flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300"
        >
          <span>{isExpanded ? 'Sembunyikan' : 'Cek Status Provider'}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expanded Table Grid */}
      {isExpanded && (
        <div className="p-4 pt-0 border-t border-slate-800/80 bg-slate-950/50 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
            {DATA_SOURCES.map((source) => (
              <div
                key={source.id}
                className="rounded-xl border border-slate-800 bg-slate-900/70 p-3.5 space-y-2 hover:border-slate-700 transition-colors text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-white text-xs">{source.name}</h4>
                    <span className="text-[10px] font-mono text-slate-400">{source.provider}</span>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border whitespace-nowrap ${
                      source.statusColor === 'amber'
                        ? 'bg-amber-950/40 text-amber-300 border-amber-500/30'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    {source.status}
                  </span>
                </div>

                <div className="space-y-1 text-[11px] text-slate-400 font-mono">
                  <div>
                    <span className="text-slate-500 font-sans">Market: </span>
                    <span className="text-slate-300">{source.marketCoverage}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-sans">Data Type: </span>
                    <span className="text-slate-300">{source.dataType}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-sans">Last Updated: </span>
                    <span className="text-slate-400">{source.lastUpdated}</span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-500 pt-1 border-t border-slate-800/80 font-sans leading-relaxed">
                  {source.note}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-slate-900/40 border border-dashed border-slate-800 p-2.5 text-[11px] text-slate-400">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Transparansi Data:</strong> StockAI tidak pernah mengklaim feed live terhubung jika backend data provider belum aktif. Hasil pemindaian saat ini menggunakan dataset sampel terisolasi.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
