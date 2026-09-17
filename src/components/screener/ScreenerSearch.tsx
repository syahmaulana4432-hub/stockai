'use client';

import React, { useState, useRef, useEffect } from 'react';
import { GlobalInstrument } from '@/lib/globalTypes';
import { formatCurrencyPrice, COUNTRY_FLAGS } from '@/lib/currency';
import { Search, X } from 'lucide-react';

interface ScreenerSearchProps {
  search: string;
  onSearchChange: (val: string) => void;
  allInstruments: GlobalInstrument[];
  onSelectInstrument: (symbol: string) => void;
}

export function ScreenerSearch({
  search,
  onSearchChange,
  allInstruments,
  onSelectInstrument,
}: ScreenerSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const suggestions = React.useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return allInstruments
      .filter(
        (s) =>
          s.symbol.toLowerCase().includes(q) ||
          s.companyName.toLowerCase().includes(q) ||
          s.exchange.toLowerCase().includes(q) ||
          s.country.toLowerCase().includes(q)
      )
      .slice(0, 6);
  }, [search, allInstruments]);

  return (
    <div ref={containerRef} className="relative w-full max-w-lg">
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => {
            onSearchChange(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Cari emiten global (AAPL, BBCA, 7203, 0700, VOD, BHP, SPY, Toyota, Tencent)..."
          className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-9 pr-8 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 shadow-inner"
        />
        {search && (
          <button
            type="button"
            onClick={() => {
              onSearchChange('');
              setIsOpen(false);
            }}
            className="absolute right-2.5 top-2.5 p-0.5 rounded text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1.5 rounded-xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden divide-y divide-slate-800/80">
          {suggestions.map((s) => (
            <button
              key={s.instrumentId}
              type="button"
              onClick={() => {
                onSearchChange(s.symbol);
                onSelectInstrument(s.symbol);
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between p-3 text-left hover:bg-slate-800/70 transition-colors text-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-base">{COUNTRY_FLAGS[s.country] || '🌐'}</span>
                <div className="truncate">
                  <div className="flex items-center gap-1.5 font-bold text-white font-mono">
                    <span>{s.symbol}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-normal">
                      {s.exchange} • {s.assetType}
                    </span>
                  </div>
                  <div className="text-slate-400 text-[11px] truncate max-w-[220px]">
                    {s.companyName}
                  </div>
                </div>
              </div>

              <div className="text-right font-mono shrink-0 ml-2">
                <div className="text-slate-200 font-semibold">
                  {formatCurrencyPrice(s.price, s.currency)}
                </div>
                <div
                  className={`text-[10px] ${
                    s.changePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {s.changePercent >= 0 ? '+' : ''}
                  {s.changePercent.toFixed(2)}%
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
