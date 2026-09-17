'use client';

import React, { useState, useMemo } from 'react';
import { MOCK_LEARNING_TOPICS } from '@/data/mockLearning';
import { LearningCard } from '@/components/learn/LearningCard';
import { DisclaimerBanner } from '@/components/common/DisclaimerBanner';
import { BookOpen, Search, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

export default function LearnIndexPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');

  const categories = ['ALL', 'Dasar', 'Teknikal', 'Fundamental', 'Psikologi & Manajemen Risiko'];

  const filteredTopics = useMemo(() => {
    return MOCK_LEARNING_TOPICS.filter((t) => {
      if (search) {
        const q = search.toLowerCase();
        const match =
          t.title.toLowerCase().includes(q) ||
          t.whatIsIt.toLowerCase().includes(q) ||
          t.simpleExplanation.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (selectedCategory !== 'ALL' && t.category !== selectedCategory) return false;
      if (selectedDifficulty !== 'ALL' && t.difficulty !== selectedDifficulty) return false;
      return true;
    });
  }, [search, selectedCategory, selectedDifficulty]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-md bg-indigo-500/10 px-2.5 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20 mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Sistem Edukasi Saham 8-Tahap Interaktif</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Pusat Belajar Saham StockAI (24 Modul)
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Format pembelajaran terstruktur: <em>Apa itu &rarr; Penjelasan Sederhana &rarr; Contoh Angka &rarr; Visual &rarr; Latihan &rarr; Kuis &rarr; Kesalahan Umum &rarr; Istilah Terkait</em>.
          </p>
        </div>
      </div>

      <DisclaimerBanner mode="compact" />

      {/* Filter Bar */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-lg backdrop-blur-md">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari topik (PER, Support, Dividen, RSI)..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Category Filter */}
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

          {/* Difficulty Filter */}
          <div>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="ALL">Semua Tingkat Kesulitan</option>
              <option value="Pemula">Pemula</option>
              <option value="Menengah">Menengah</option>
              <option value="Lanjutan">Lanjutan</option>
            </select>
          </div>
        </div>
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTopics.map((topic, index) => (
          <LearningCard key={topic.id} topic={topic} index={index} />
        ))}
      </div>
    </div>
  );
}
