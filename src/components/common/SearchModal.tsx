'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search,
  X,
  TrendingUp,
  BookOpen,
  Layers,
  ArrowRight,
  Building2,
  AlertCircle,
  Globe,
  ExternalLink
} from 'lucide-react';
import { searchUniversal, SearchResultItem } from '@/lib/searchEngine';
import { formatIDR, formatPercent } from '@/lib/utils';
import { InstrumentMasterItem } from '@/lib/instrumentMasterTypes';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const searchResult = useMemo(() => {
    return searchUniversal(query);
  }, [query]);

  // Flatten all navigable results for keyboard navigation
  const allNavigableItems = useMemo(() => {
    return [...searchResult.stocks, ...searchResult.learning, ...searchResult.dictionary];
  }, [searchResult]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, allNavigableItems.length));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + allNavigableItems.length) % Math.max(1, allNavigableItems.length));
      }
      if (e.key === 'Enter' && allNavigableItems.length > 0) {
        e.preventDefault();
        const selected = allNavigableItems[selectedIndex];
        if (selected) {
          router.push(selected.url);
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, selectedIndex, allNavigableItems, router]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl rounded-2xl border border-slate-700/80 bg-slate-900/95 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-950/80">
          <Search className="w-5 h-5 text-cyan-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Cari simbol, emiten, ISIN, topik (BBCA, AAPL, Toyota, NIM, EPS)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="mr-2 p-1 text-slate-400 hover:text-white text-xs bg-slate-800 rounded px-1.5"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results */}
        <div className="overflow-y-auto p-4 space-y-5 flex-1 divide-y divide-slate-800/60">
          {/* Uncovered / Not Covered State */}
          {searchResult.isUncoveredInstrument && (
            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/20 text-amber-200 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-300">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Instrumen Belum Tercakup Provider Mock</span>
              </div>
              <p className="text-slate-300 font-sans leading-relaxed">
                {searchResult.uncoveredNotice}
              </p>
            </div>
          )}

          {/* No Results at all */}
          {!searchResult.hasResults && !searchResult.isUncoveredInstrument && (
            <div className="py-12 text-center space-y-2 text-slate-400">
              <p className="text-sm font-medium text-slate-300">Tidak ada hasil yang cocok dengan &quot;{query}&quot;</p>
              <p className="text-xs text-slate-500">Coba kata kunci lain seperti BBCA, AAPL, Toyota, Dividen, atau IHSG.</p>
            </div>
          )}

          {/* Stocks Section */}
          {searchResult.stocks.length > 0 && (
            <div className="space-y-2 pt-1 first:pt-0">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-cyan-400" /> Instrumen Pasar (Global & IDX)
                </span>
                <span className="text-[10px] text-slate-500">{searchResult.stocks.length} Hasil</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {searchResult.stocks.map((item, idx) => {
                  const inst = item.data as InstrumentMasterItem;
                  const isSelected = selectedIndex === idx;
                  const isUp = inst ? inst.changePercent >= 0 : true;

                  return (
                    <div
                      key={item.id}
                      className={`group relative flex flex-col justify-between p-3 rounded-xl border transition-all ${
                        isSelected
                          ? 'border-cyan-500 bg-cyan-950/30 ring-1 ring-cyan-500/50'
                          : 'border-slate-800/90 bg-slate-950/50 hover:border-slate-700 hover:bg-slate-850'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-9 h-9 rounded-lg bg-slate-800 text-cyan-300 font-bold text-xs flex items-center justify-center border border-slate-700/80 shrink-0 font-mono">
                            {inst ? inst.symbol : item.title}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-sm text-white font-mono">{item.title}</span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                                {inst?.exchange || item.badge}
                              </span>
                            </div>
                            <div className="text-xs text-slate-400 truncate max-w-[180px]">
                              {inst ? inst.companyName : item.subtitle}
                            </div>
                          </div>
                        </div>

                        {inst && (
                          <div className="text-right shrink-0 font-mono">
                            <div className="text-xs font-bold text-white">
                              {inst.currency === 'IDR' ? formatIDR(inst.price) : `${inst.currency} ${inst.price.toFixed(2)}`}
                            </div>
                            <div className={`text-[10px] font-semibold ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {isUp ? '+' : ''}{formatPercent(inst.changePercent)}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Quick Action Links */}
                      <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] gap-2">
                        <Link
                          href={`/company/${inst?.symbol || item.title}`}
                          onClick={onClose}
                          className="flex items-center gap-1 text-slate-400 hover:text-indigo-300 font-medium py-0.5 px-1.5 rounded hover:bg-indigo-950/40 transition-colors"
                        >
                          <Building2 className="w-3 h-3 text-indigo-400" />
                          <span>Profil Bisnis</span>
                        </Link>

                        <Link
                          href={item.url}
                          onClick={onClose}
                          className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-bold py-0.5 px-2 rounded bg-cyan-950/50 hover:bg-cyan-900/60 border border-cyan-500/30 transition-colors"
                        >
                          <span>Analisis Saham</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Learning Topics Section */}
          {searchResult.learning.length > 0 && (
            <div className="space-y-2 pt-4">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> Modul Edukasi Interaktif
                </span>
              </div>
              <div className="space-y-1.5">
                {searchResult.learning.map((topic) => (
                  <Link
                    key={topic.id}
                    href={topic.url}
                    onClick={onClose}
                    className="group flex items-center justify-between p-2.5 rounded-xl border border-slate-800 bg-slate-950/30 hover:border-indigo-500/40 hover:bg-indigo-950/20 transition-all"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-white group-hover:text-indigo-300">
                          {topic.title}
                        </span>
                        <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                          {topic.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{topic.subtitle}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 shrink-0 ml-2" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Dictionary Terms */}
          {searchResult.dictionary.length > 0 && (
            <div className="space-y-2 pt-4">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-400" /> Kamus Istilah Pasar
                </span>
              </div>
              <div className="space-y-1.5">
                {searchResult.dictionary.map((item) => (
                  <Link
                    key={item.id}
                    href={item.url}
                    onClick={onClose}
                    className="block p-2.5 rounded-xl border border-slate-800 bg-slate-950/30 hover:border-amber-500/40 hover:bg-amber-950/20 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-amber-300">{item.title}</span>
                      <span className="text-[10px] text-slate-400">{item.badge}</span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-1">{item.subtitle}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-800 bg-slate-950/90 text-[11px] text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span>Pilih: <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">↓</kbd></span>
            <span>Buka: <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">Enter</kbd></span>
            <span>Tutup: <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">ESC</kbd></span>
          </div>
          <span>StockAI Universal Master Search</span>
        </div>
      </div>
    </div>
  );
}
