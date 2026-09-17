'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, TrendingUp, BookOpen, Layers, ArrowRight } from 'lucide-react';
import { MOCK_STOCKS } from '@/data/mockStocks';
import { MOCK_DICTIONARY_TERMS } from '@/data/mockDictionary';
import { MOCK_LEARNING_TOPICS } from '@/data/mockLearning';
import { formatIDR, formatPercent } from '@/lib/utils';
import { BadgeTag } from './BadgeTag';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const filteredStocks = useMemo(() => {
    if (!query.trim()) return MOCK_STOCKS.slice(0, 4);
    const q = query.toLowerCase();
    return MOCK_STOCKS.filter(
      (s) => s.ticker.toLowerCase().includes(q) || s.name.toLowerCase().includes(q) || s.sector.toLowerCase().includes(q)
    );
  }, [query]);

  const filteredTopics = useMemo(() => {
    if (!query.trim()) return MOCK_LEARNING_TOPICS.slice(0, 3);
    const q = query.toLowerCase();
    return MOCK_LEARNING_TOPICS.filter(
      (t) => t.title.toLowerCase().includes(q) || t.whatIsIt.toLowerCase().includes(q)
    );
  }, [query]);

  const filteredDictionary = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return MOCK_DICTIONARY_TERMS.filter(
      (d) => d.term.toLowerCase().includes(q) || d.definition.toLowerCase().includes(q)
    ).slice(0, 4);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-800 bg-slate-950/60">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Cari saham (BBCA, BBRI, GOTO), topik edukasi, atau istilah saham..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results */}
        <div className="overflow-y-auto p-4 space-y-6 flex-1 divide-y divide-slate-800/60">
          {/* Stocks Section */}
          <div className="space-y-2 pt-1 first:pt-0">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-cyan-400" /> Saham & Analisis
              </span>
              <span className="text-[10px] text-slate-500">{filteredStocks.length} Hasil</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredStocks.map((stock) => (
                <Link
                  key={stock.ticker}
                  href={`/analysis/${stock.ticker}`}
                  onClick={onClose}
                  className="group flex items-center justify-between p-2.5 rounded-xl border border-slate-800 bg-slate-950/40 hover:border-cyan-500/40 hover:bg-cyan-950/20 transition-all"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-slate-800 text-cyan-400 font-bold text-xs flex items-center justify-center border border-slate-700">
                      {stock.ticker.slice(0, 4)}
                    </div>
                    <div className="truncate">
                      <div className="font-semibold text-sm text-white group-hover:text-cyan-300">
                        {stock.ticker}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">{stock.name}</div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-semibold text-white">{formatIDR(stock.price)}</div>
                    <div
                      className={`text-[10px] font-medium ${
                        stock.changePercent >= 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {formatPercent(stock.changePercent)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Learning Topics Section */}
          <div className="space-y-2 pt-4">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> Modul Edukasi Interaktif
              </span>
            </div>
            <div className="space-y-1.5">
              {filteredTopics.map((topic) => (
                <Link
                  key={topic.id}
                  href={`/learn/${topic.id}`}
                  onClick={onClose}
                  className="group flex items-center justify-between p-2.5 rounded-xl border border-slate-800/80 bg-slate-950/30 hover:border-indigo-500/40 hover:bg-indigo-950/20 transition-all"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-white group-hover:text-indigo-300">
                        {topic.title}
                      </span>
                      <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                        {topic.difficulty}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{topic.whatIsIt}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 shrink-0 ml-2" />
                </Link>
              ))}
            </div>
          </div>

          {/* Dictionary Terms */}
          {filteredDictionary.length > 0 && (
            <div className="space-y-2 pt-4">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-amber-400" /> Kamus Istilah Saham
                </span>
              </div>
              <div className="space-y-1.5">
                {filteredDictionary.map((item) => (
                  <Link
                    key={item.id}
                    href={`/dictionary?search=${encodeURIComponent(item.term)}`}
                    onClick={onClose}
                    className="block p-2.5 rounded-xl border border-slate-800 bg-slate-950/30 hover:border-amber-500/40 hover:bg-amber-950/20 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-amber-300">{item.term}</span>
                      <span className="text-[10px] text-slate-400">{item.category}</span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-1">{item.definition}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-800 bg-slate-950/80 text-[11px] text-slate-400">
          <span>Tekan <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-200">ESC</kbd> untuk menutup</span>
          <span>StockAI Global Knowledge Base</span>
        </div>
      </div>
    </div>
  );
}
