'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { MOCK_DICTIONARY_TERMS } from '@/data/mockDictionary';
import { DisclaimerBanner } from '@/components/common/DisclaimerBanner';
import { BadgeTag } from '@/components/common/BadgeTag';
import {
  Layers,
  Search,
  BookOpen,
  ArrowUpRight,
  Filter,
  Lightbulb,
  CheckCircle,
} from 'lucide-react';

function DictionaryContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams ? searchParams.get('search') || '' : '';

  const [search, setSearch] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedLetter, setSelectedLetter] = useState('ALL');

  useEffect(() => {
    if (initialQuery) {
      setSearch(initialQuery);
    }
  }, [initialQuery]);

  const categories = [
    'ALL',
    'Dasar Saham',
    'Analisis Teknikal',
    'Analisis Fundamental',
    'Transaksi & Order',
    'Makro & Regulasi',
  ];

  const alphabet = ['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

  const filteredTerms = useMemo(() => {
    return MOCK_DICTIONARY_TERMS.filter((item) => {
      if (search) {
        const q = search.toLowerCase();
        const match =
          item.term.toLowerCase().includes(q) ||
          item.definition.toLowerCase().includes(q) ||
          item.simpleExplanation.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (selectedCategory !== 'ALL' && item.category !== selectedCategory) return false;
      if (selectedLetter !== 'ALL' && !item.term.toUpperCase().startsWith(selectedLetter)) {
        return false;
      }
      return true;
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [search, selectedCategory, selectedLetter]);

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 sm:p-5 shadow-xl backdrop-blur-md space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari istilah saham (ARA, ARB, CASA, PER, HAKA)..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'ALL' ? 'Semua Kategori' : c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Alphabet Jump Bar */}
        <div className="flex flex-wrap items-center gap-1 pt-2 border-t border-slate-800/80">
          <span className="text-xs text-slate-500 mr-2 font-semibold">Huruf:</span>
          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`h-7 min-w-7 px-1.5 rounded-lg text-xs font-mono font-semibold transition-colors ${
                selectedLetter === letter
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
        <span>Ditemukan <strong>{filteredTerms.length}</strong> istilah</span>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTerms.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg backdrop-blur-sm space-y-3 hover:border-indigo-500/40 transition-colors"
          >
            {/* Term Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span className="text-indigo-400">#</span>
                <span>{item.term}</span>
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {item.category}
              </span>
            </div>

            {/* Definition */}
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {item.definition}
            </p>

            {/* Simple Explanation */}
            <div className="rounded-xl border border-indigo-500/20 bg-indigo-950/20 p-3 text-xs text-indigo-200 flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <strong>Penjelasan Sederhana:</strong> {item.simpleExplanation}
              </div>
            </div>

            {/* Real World Example */}
            {item.realWorldExample && (
              <div className="rounded-lg bg-slate-950/60 p-2.5 border border-slate-800/80 text-xs text-slate-300 font-mono">
                <span className="text-[10px] text-slate-500 font-sans block">Contoh Nyata di BEI:</span>
                <span>{item.realWorldExample}</span>
              </div>
            )}

            {/* Link to module if available */}
            {item.relatedLearningTopicId && (
              <div className="pt-2 border-t border-slate-800/60 flex justify-end">
                <Link
                  href={`/learn/${item.relatedLearningTopicId}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Pelajari di Modul Terkait</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DictionaryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-md bg-indigo-500/10 px-2.5 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20 mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Kamus Pasar Modal & Finansial Indonesia</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Kamus Istilah Saham (A-Z)
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Glosarium lengkap kosakata saham, istilah teknikal, rasio fundamental, hingga bahasa gaul bursa (HAKA, HAKI, ARA, ARB).
          </p>
        </div>
      </div>

      <DisclaimerBanner mode="compact" />

      <Suspense fallback={<div className="p-8 text-center text-slate-400 text-xs">Memuat kamus saham...</div>}>
        <DictionaryContent />
      </Suspense>
    </div>
  );
}
