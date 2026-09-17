'use client';

import React from 'react';
import { CountryCode, ExchangeCode, AssetType, CurrencyCode } from '@/lib/globalTypes';
import { Globe, Building2, Layers, Coins } from 'lucide-react';

interface GlobalMarketBarProps {
  selectedCountry: CountryCode | 'ALL';
  onSelectCountry: (c: CountryCode | 'ALL') => void;
  selectedExchange: ExchangeCode | 'ALL';
  onSelectExchange: (e: ExchangeCode | 'ALL') => void;
  selectedAssetType: AssetType | 'ALL';
  onSelectAssetType: (a: AssetType | 'ALL') => void;
  selectedCurrency?: CurrencyCode | 'ALL';
  onSelectCurrency?: (cur: CurrencyCode | 'ALL') => void;
  totalMatching?: number;
  totalUniverse?: number;
}

const COUNTRIES: { code: CountryCode | 'ALL'; label: string; flag: string }[] = [
  { code: 'ALL', label: 'Global Markets', flag: '🌐' },
  { code: 'US', label: 'United States', flag: '🇺🇸' },
  { code: 'ID', label: 'Indonesia', flag: '🇮🇩' },
  { code: 'JP', label: 'Japan', flag: '🇯🇵' },
  { code: 'HK', label: 'Hong Kong', flag: '🇭🇰' },
  { code: 'GB', label: 'United Kingdom', flag: '🇬🇧' },
  { code: 'SG', label: 'Singapore', flag: '🇸🇬' },
  { code: 'AU', label: 'Australia', flag: '🇦🇺' },
  { code: 'CA', label: 'Canada', flag: '🇨🇦' },
  { code: 'EU', label: 'Europe', flag: '🇪🇺' },
];

const EXCHANGES: { code: ExchangeCode | 'ALL'; label: string }[] = [
  { code: 'ALL', label: 'All Exchanges (Semua Bursa)' },
  { code: 'NASDAQ', label: 'NASDAQ (United States)' },
  { code: 'NYSE', label: 'NYSE (United States)' },
  { code: 'AMEX', label: 'AMEX (United States)' },
  { code: 'IDX', label: 'IDX (Bursa Efek Indonesia)' },
  { code: 'TSE', label: 'TSE (Tokyo Stock Exchange)' },
  { code: 'HKEX', label: 'HKEX (Hong Kong Exchanges)' },
  { code: 'LSE', label: 'LSE (London Stock Exchange)' },
  { code: 'SGX', label: 'SGX (Singapore Exchange)' },
  { code: 'ASX', label: 'ASX (Australian Securities Exchange)' },
  { code: 'TSX', label: 'TSX (Toronto Stock Exchange)' },
  { code: 'EURONEXT', label: 'EURONEXT (Amsterdam, Paris)' },
];

const ASSET_TYPES: { code: AssetType | 'ALL'; label: string }[] = [
  { code: 'ALL', label: 'All Assets (Semua Jenis Aset)' },
  { code: 'Stock', label: 'Stocks (Equities / Saham)' },
  { code: 'ETF', label: 'ETFs (Exchange-Traded Funds)' },
  { code: 'REIT', label: 'REITs (Real Estate Investment Trusts)' },
  { code: 'ADR', label: 'ADRs (American Depositary Receipts)' },
  { code: 'Index', label: 'Market Indices' },
];

const CURRENCIES: { code: CurrencyCode | 'ALL'; label: string }[] = [
  { code: 'ALL', label: 'All Currencies (Semua Mata Uang)' },
  { code: 'USD', label: 'USD ($) - US Dollar' },
  { code: 'IDR', label: 'IDR (Rp) - Indonesian Rupiah' },
  { code: 'JPY', label: 'JPY (¥) - Japanese Yen' },
  { code: 'HKD', label: 'HKD (HK$) - Hong Kong Dollar' },
  { code: 'GBP', label: 'GBP (£) - British Pound' },
  { code: 'SGD', label: 'SGD (S$) - Singapore Dollar' },
  { code: 'AUD', label: 'AUD (A$) - Australian Dollar' },
  { code: 'CAD', label: 'CAD (C$) - Canadian Dollar' },
  { code: 'EUR', label: 'EUR (€) - Euro' },
];

export function GlobalMarketBar({
  selectedCountry,
  onSelectCountry,
  selectedExchange,
  onSelectExchange,
  selectedAssetType,
  onSelectAssetType,
  selectedCurrency = 'ALL',
  onSelectCurrency,
  totalMatching,
  totalUniverse,
}: GlobalMarketBarProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl backdrop-blur-md space-y-4">
      {/* Header with scope count */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            Global Market & Asset Scope Selector
          </span>
          {typeof totalMatching === 'number' && (
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono font-bold">
              {totalMatching} {typeof totalUniverse === 'number' ? `/ ${totalUniverse}` : ''} instrumen dalam cakupan
            </span>
          )}
        </div>
        <span className="text-[11px] text-slate-400 font-mono">
          Multi-Currency Conversion Active
        </span>
      </div>

      {/* Country Selection Pill Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {COUNTRIES.map((c) => {
          const isSelected = selectedCountry === c.code;

          return (
            <button
              key={c.code}
              type="button"
              onClick={() => onSelectCountry(c.code)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white border-cyan-400/50 shadow-md shadow-cyan-950/40'
                  : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <span>{c.flag}</span>
              <span>{c.label}</span>
            </button>
          );
        })}
      </div>

      {/* Exchange, Asset Type, and Currency Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
        {/* Exchange Dropdown */}
        <div className="space-y-1">
          <label className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
            <Building2 className="w-3.5 h-3.5 text-indigo-400" /> Bursa (Exchange):
          </label>
          <select
            value={selectedExchange}
            onChange={(e) => onSelectExchange(e.target.value as ExchangeCode | 'ALL')}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            {EXCHANGES.map((ex) => (
              <option key={ex.code} value={ex.code}>
                {ex.label}
              </option>
            ))}
          </select>
        </div>

        {/* Asset Type Dropdown */}
        <div className="space-y-1">
          <label className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-teal-400" /> Jenis Aset (Asset Type):
          </label>
          <select
            value={selectedAssetType}
            onChange={(e) => onSelectAssetType(e.target.value as AssetType | 'ALL')}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            {ASSET_TYPES.map((a) => (
              <option key={a.code} value={a.code}>
                {a.label}
              </option>
            ))}
          </select>
        </div>

        {/* Currency Dropdown */}
        <div className="space-y-1">
          <label className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
            <Coins className="w-3.5 h-3.5 text-amber-400" /> Mata Uang (Currency):
          </label>
          <select
            value={selectedCurrency}
            onChange={(e) => onSelectCurrency && onSelectCurrency(e.target.value as CurrencyCode | 'ALL')}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            {CURRENCIES.map((cur) => (
              <option key={cur.code} value={cur.code}>
                {cur.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
