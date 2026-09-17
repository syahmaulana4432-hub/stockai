'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { GlobalInstrument } from '@/lib/globalTypes';
import { IndicatorTooltip } from './IndicatorTooltip';
import { COUNTRY_FLAGS, formatCurrencyPrice, formatGlobalMarketCap } from '@/lib/currency';
import { formatPercent, formatVolume } from '@/lib/utils';
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ArrowUpRight,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  AlertCircle,
  Globe,
  Zap,
  Info,
  Layers,
  Building2,
} from 'lucide-react';

interface ScreenerResultTableProps {
  instruments: GlobalInstrument[];
  totalUniverse: number;
  totalScanned: number;
  activeFilterCount: number;
  lastScanTime: string;
  isLoading: boolean;
  onOpenWhyMatch: (instrument: GlobalInstrument) => void;
  onOpenWatchlistModal: (instrument: GlobalInstrument) => void;
  onOpenTradeModal: (instrument: GlobalInstrument) => void;
}

type SortField =
  | 'symbol'
  | 'companyName'
  | 'country'
  | 'exchange'
  | 'assetType'
  | 'sector'
  | 'price'
  | 'changePercent'
  | 'volume'
  | 'marketCapUSD'
  | 'per'
  | 'pbv'
  | 'roe'
  | 'eps'
  | 'rsi'
  | 'ma20'
  | 'ma50'
  | 'ma200'
  | 'dividendYield'
  | 'trend';

export function ScreenerResultTable({
  instruments,
  totalUniverse,
  totalScanned,
  activeFilterCount,
  lastScanTime,
  isLoading,
  onOpenWhyMatch,
  onOpenWatchlistModal,
  onOpenTradeModal,
}: ScreenerResultTableProps) {
  const [sortField, setSortField] = useState<SortField>('marketCapUSD');
  const [sortAsc, setSortAsc] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25); // Default 25 as requested

  // Sorting
  const sortedInstruments = useMemo(() => {
    const list = [...instruments];
    list.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortAsc ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });
    return list;
  }, [instruments, sortField, sortAsc]);

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(sortedInstruments.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, sortedInstruments.length);
  const paginatedInstruments = useMemo(() => {
    return sortedInstruments.slice(startIndex, endIndex);
  }, [sortedInstruments, startIndex, endIndex]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3 h-3 text-slate-600 inline ml-1" />;
    }
    return sortAsc ? (
      <ArrowUp className="w-3 h-3 text-cyan-400 inline ml-1" />
    ) : (
      <ArrowDown className="w-3 h-3 text-cyan-400 inline ml-1" />
    );
  };

  const getAssetBadgeClass = (assetType: string) => {
    switch (assetType) {
      case 'ETF':
        return 'bg-purple-950/40 text-purple-300 border-purple-500/30';
      case 'REIT':
        return 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30';
      case 'ADR':
        return 'bg-amber-950/40 text-amber-300 border-amber-500/30';
      default:
        return 'bg-slate-800/60 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl overflow-hidden backdrop-blur-md space-y-4">
      {/* 1. Section I: Screening Results Metadata Header Card */}
      <div className="p-5 border-b border-slate-800 bg-slate-950/70 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                Screening Results
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Data status: <strong className="text-amber-300">DEMO DATASET</strong> (MOCK DATA)
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-white mt-1">
              {instruments.length} instrumen memenuhi kriteria penelitian Anda
            </h2>
          </div>

          {/* Quick Stats Grid */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <div className="px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300">
              <span className="text-slate-500 font-sans">Universe: </span>
              <strong className="text-white">{totalUniverse} Demo Instruments</strong>
            </div>
            <div className="px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300">
              <span className="text-slate-500 font-sans">Scanned: </span>
              <strong className="text-cyan-400">{totalScanned}</strong>
            </div>
            <div className="px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300">
              <span className="text-slate-500 font-sans">Matched: </span>
              <strong className="text-emerald-400">{instruments.length}</strong>
            </div>
            <div className="px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-300">
              <span className="text-slate-500 font-sans">Filtered: </span>
              <strong className="text-rose-400">{totalScanned - instruments.length}</strong>
            </div>
          </div>
        </div>

        {/* Demo Limitation Notice */}
        <div className="flex items-center justify-between gap-2 text-[11px] text-slate-400 pt-1">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Coverage is currently limited to demo instruments. Market coverage and live results will appear after a live market data provider is connected.</span>
          </div>
          <span className="font-mono text-slate-500 shrink-0">Scan Time: {lastScanTime}</span>
        </div>
      </div>

      {/* 2. Controls Bar: Showing count & Rows per page selector (Section D) */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5">
        <div className="text-xs text-slate-300 font-medium">
          {instruments.length > 0 ? (
            <span>
              Showing <strong className="text-white font-mono">{startIndex + 1}–{endIndex}</strong> of{' '}
              <strong className="text-white font-mono">{instruments.length}</strong> matched instruments
            </span>
          ) : (
            <span>0 instruments matched</span>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1 text-white text-xs focus:outline-none focus:border-cyan-500 font-mono"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      {/* 3. Skeleton Loading or Empty State */}
      {isLoading ? (
        <div className="p-6 space-y-4">
          <div className="h-6 w-48 rounded bg-slate-800 animate-pulse" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-12 w-full rounded-xl bg-slate-800/40 animate-pulse" />
            ))}
          </div>
        </div>
      ) : instruments.length === 0 ? (
        <div className="p-12 text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="text-base font-bold text-white">Tidak Ada Instrumen yang Memenuhi Kriteria</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Kombinasi aturan filter saat ini terlalu ketat untuk dataset demo yang tersedia. Coba kurangi beberapa filter, ubah operator logika ke OR, atau ganti pilihan bursa.
            </p>
          </div>
        </div>
      ) : (
        /* 4. Responsive Results Table */
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950/90 text-slate-400 font-semibold border-y border-slate-800 uppercase tracking-wider text-[10px]">
              <tr>
                {/* Market */}
                <th
                  onClick={() => handleSort('country')}
                  className="p-3.5 cursor-pointer hover:text-white transition-colors"
                >
                  Market {renderSortIcon('country')}
                </th>

                {/* Symbol */}
                <th
                  onClick={() => handleSort('symbol')}
                  className="p-3.5 cursor-pointer hover:text-white transition-colors"
                >
                  Simbol {renderSortIcon('symbol')}
                </th>

                {/* Company Name */}
                <th
                  onClick={() => handleSort('companyName')}
                  className="p-3.5 cursor-pointer hover:text-white transition-colors min-w-[170px]"
                >
                  Nama Entitas {renderSortIcon('companyName')}
                </th>

                {/* Asset Type */}
                <th
                  onClick={() => handleSort('assetType')}
                  className="p-3.5 cursor-pointer hover:text-white transition-colors text-center"
                >
                  Tipe {renderSortIcon('assetType')}
                </th>

                {/* Sector */}
                <th
                  onClick={() => handleSort('sector')}
                  className="p-3.5 cursor-pointer hover:text-white transition-colors"
                >
                  Sektor {renderSortIcon('sector')}
                </th>

                {/* Price (Native) */}
                <th
                  onClick={() => handleSort('price')}
                  className="p-3.5 text-right cursor-pointer hover:text-white transition-colors"
                >
                  Harga (Lokal) {renderSortIcon('price')}
                </th>

                {/* Change % */}
                <th
                  onClick={() => handleSort('changePercent')}
                  className="p-3.5 text-right cursor-pointer hover:text-white transition-colors"
                >
                  % 1D {renderSortIcon('changePercent')}
                </th>

                {/* Volume */}
                <th
                  onClick={() => handleSort('volume')}
                  className="p-3.5 text-right cursor-pointer hover:text-white transition-colors"
                >
                  <IndicatorTooltip field="volume" label="Volume" /> {renderSortIcon('volume')}
                </th>

                {/* Market Cap USD */}
                <th
                  onClick={() => handleSort('marketCapUSD')}
                  className="p-3.5 text-right cursor-pointer hover:text-white transition-colors min-w-[120px]"
                >
                  <IndicatorTooltip field="marketCap" label="Cap (USD)" /> {renderSortIcon('marketCapUSD')}
                </th>

                {/* PER */}
                <th
                  onClick={() => handleSort('per')}
                  className="p-3.5 text-right cursor-pointer hover:text-white transition-colors"
                >
                  <IndicatorTooltip field="per" label="PER" /> {renderSortIcon('per')}
                </th>

                {/* PBV */}
                <th
                  onClick={() => handleSort('pbv')}
                  className="p-3.5 text-right cursor-pointer hover:text-white transition-colors"
                >
                  <IndicatorTooltip field="pbv" label="PBV" /> {renderSortIcon('pbv')}
                </th>

                {/* Dividend Yield */}
                <th
                  onClick={() => handleSort('dividendYield')}
                  className="p-3.5 text-right cursor-pointer hover:text-white transition-colors"
                >
                  Div. Yield {renderSortIcon('dividendYield')}
                </th>

                {/* ROE */}
                <th
                  onClick={() => handleSort('roe')}
                  className="p-3.5 text-right cursor-pointer hover:text-white transition-colors"
                >
                  <IndicatorTooltip field="roe" label="ROE" /> {renderSortIcon('roe')}
                </th>

                {/* RSI */}
                <th
                  onClick={() => handleSort('rsi')}
                  className="p-3.5 text-right cursor-pointer hover:text-white transition-colors"
                >
                  <IndicatorTooltip field="rsi" label="RSI" /> {renderSortIcon('rsi')}
                </th>

                {/* Trend */}
                <th
                  onClick={() => handleSort('trend')}
                  className="p-3.5 text-center cursor-pointer hover:text-white transition-colors"
                >
                  Trend {renderSortIcon('trend')}
                </th>

                {/* Actions */}
                <th className="p-3.5 text-center min-w-[240px]">Aksi Terpadu</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/50 font-mono text-xs">
              {paginatedInstruments.map((item) => {
                const isUp = item.changePercent >= 0;
                const flag = COUNTRY_FLAGS[item.countryCode] || '🌐';

                return (
                  <tr key={item.instrumentId} className="hover:bg-slate-800/40 transition-colors group">
                    {/* Market */}
                    <td className="p-3.5 font-sans whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base" title={item.country}>{flag}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {item.exchange}
                        </span>
                      </div>
                    </td>

                    {/* Symbol */}
                    <td className="p-3.5 font-bold text-white group-hover:text-cyan-400 whitespace-nowrap">
                      <Link href={`/analysis/${item.symbol}`} className="hover:underline flex items-center gap-1">
                        <span>{item.symbol}</span>
                      </Link>
                    </td>

                    {/* Company Name */}
                    <td className="p-3.5 font-sans text-slate-300 truncate max-w-[190px]" title={item.companyName}>
                      {item.companyName}
                    </td>

                    {/* Asset Type */}
                    <td className="p-3.5 text-center font-sans">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold border ${getAssetBadgeClass(item.assetType)}`}>
                        {item.assetType}
                      </span>
                    </td>

                    {/* Sector */}
                    <td className="p-3.5 font-sans text-slate-400">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/80 whitespace-nowrap">
                        {item.sector}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="p-3.5 text-right font-bold text-white whitespace-nowrap">
                      {formatCurrencyPrice(item.price, item.currency)}
                    </td>

                    {/* Change % */}
                    <td
                      className={`p-3.5 text-right font-semibold whitespace-nowrap ${
                        isUp ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {formatPercent(item.changePercent)}
                    </td>

                    {/* Volume */}
                    <td className="p-3.5 text-right text-slate-400 whitespace-nowrap">
                      {formatVolume(item.volume, item.countryCode === 'ID' ? 'lot' : 'lembar')}
                    </td>

                    {/* Market Cap USD */}
                    <td className="p-3.5 text-right text-slate-300 whitespace-nowrap">
                      {formatGlobalMarketCap(item.marketCapUSD, 'USD')}
                    </td>

                    {/* PER */}
                    <td
                      className={`p-3.5 text-right whitespace-nowrap ${
                        item.per > 0 && item.per < 15 ? 'text-emerald-400 font-bold' : 'text-slate-300'
                      }`}
                    >
                      {item.per > 0 ? `${item.per}x` : 'N/A'}
                    </td>

                    {/* PBV */}
                    <td className="p-3.5 text-right text-slate-300 whitespace-nowrap">
                      {item.pbv > 0 ? `${item.pbv}x` : 'N/A'}
                    </td>

                    {/* Dividend Yield */}
                    <td
                      className={`p-3.5 text-right whitespace-nowrap ${
                        item.dividendYield > 3 ? 'text-emerald-400 font-bold' : 'text-slate-300'
                      }`}
                    >
                      {item.dividendYield.toFixed(2)}%
                    </td>

                    {/* ROE */}
                    <td
                      className={`p-3.5 text-right font-bold whitespace-nowrap ${
                        item.roe > 15 ? 'text-emerald-400' : 'text-slate-300'
                      }`}
                    >
                      {item.roe > 0 ? `${item.roe}%` : 'N/A'}
                    </td>

                    {/* RSI */}
                    <td
                      className={`p-3.5 text-right font-bold whitespace-nowrap ${
                        item.rsi >= 70
                          ? 'text-rose-400'
                          : item.rsi <= 35
                          ? 'text-emerald-400'
                          : 'text-slate-300'
                      }`}
                    >
                      {item.rsi}
                    </td>

                    {/* Trend */}
                    <td className="p-3.5 text-center font-sans whitespace-nowrap">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-medium border ${
                          item.trend === 'Uptrend'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : item.trend === 'Downtrend'
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {item.trend}
                      </span>
                    </td>

                    {/* Actions: Profil, Why Match, Analysis, Watchlist, Trade */}
                    <td className="p-3.5 font-sans">
                      <div className="flex items-center justify-center gap-1.5 whitespace-nowrap">
                        {/* 0. Company Profile */}
                        <Link
                          href={`/company/${item.symbol}`}
                          className="flex items-center gap-1 text-[10px] font-semibold text-slate-300 bg-slate-800 border border-slate-700 px-2 py-1 rounded-lg hover:text-indigo-300 hover:bg-slate-700 transition-colors"
                          title={`Buka profil & model bisnis ${item.symbol}`}
                        >
                          <Building2 className="w-3 h-3 text-indigo-400" />
                          <span>Profil</span>
                        </Link>

                        {/* 1. Why Match */}
                        <button
                          type="button"
                          onClick={() => onOpenWhyMatch(item)}
                          className="flex items-center gap-1 text-[10px] font-bold text-indigo-300 bg-indigo-950/50 border border-indigo-500/30 px-2 py-1 rounded-lg hover:bg-indigo-900/50 transition-colors"
                          title="Audit kriteria yang lolos dan tidak lolos"
                        >
                          <Sparkles className="w-3 h-3 text-indigo-400" />
                          <span>Why Match</span>
                        </button>

                        {/* 2. Analysis Link */}
                        <Link
                          href={`/analysis/${item.symbol}`}
                          className="flex items-center gap-0.5 text-[10px] font-bold text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-2 py-1 rounded-lg hover:bg-cyan-900/50 transition-colors"
                          title={`Buka analisis komprehensif ${item.symbol}`}
                        >
                          <span>Analisis</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </Link>

                        {/* 3. Watchlist Multi-Category */}
                        <button
                          type="button"
                          onClick={() => onOpenWatchlistModal(item)}
                          className="flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-amber-950/40 border border-amber-500/30 px-2 py-1 rounded-lg hover:bg-amber-900/50 transition-colors"
                          title="Tambahkan ke Watchlist"
                        >
                          <Bookmark className="w-3 h-3" />
                          <span>Watchlist</span>
                        </button>

                        {/* 4. Trade Order Preview */}
                        <button
                          type="button"
                          onClick={() => onOpenTradeModal(item)}
                          className="flex items-center gap-1 text-[10px] font-bold text-teal-300 bg-teal-950/40 border border-teal-500/30 px-2 py-1 rounded-lg hover:bg-teal-900/50 transition-colors"
                          title="Order Routing Preview"
                        >
                          <Zap className="w-3 h-3" />
                          <span>Trade</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* 5. Pagination Navigation Bar (Section D) */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-t border-slate-800 text-xs">
        <div className="text-slate-400">
          Halaman <strong className="text-white font-mono">{currentPage}</strong> dari{' '}
          <strong className="text-white font-mono">{totalPages}</strong> ({instruments.length} Total Instrumen Matched)
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-300 hover:text-white disabled:opacity-40"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Sebelumnya</span>
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
            <button
              key={pg}
              type="button"
              onClick={() => setCurrentPage(pg)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold transition-colors ${
                currentPage === pg
                  ? 'bg-cyan-600 text-white border-cyan-400/60 shadow-md'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              {pg}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-300 hover:text-white disabled:opacity-40"
          >
            <span>Selanjutnya</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
