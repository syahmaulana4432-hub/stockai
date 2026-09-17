'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getLearningTopicById, MOCK_LEARNING_TOPICS } from '@/data/mockLearning';
import { ConceptVisualizer } from '@/components/learn/ConceptVisualizer';
import { InteractiveQuiz } from '@/components/learn/InteractiveQuiz';
import { DisclaimerBanner } from '@/components/common/DisclaimerBanner';
import { BadgeTag } from '@/components/common/BadgeTag';
import {
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Sparkles,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  Layers,
  CheckCircle,
  Calculator,
} from 'lucide-react';

export default function LearningTopicPage() {
  const params = useParams();
  const rawId = typeof params?.topicId === 'string' ? params.topicId : 'saham';
  const topic = getLearningTopicById(rawId) || MOCK_LEARNING_TOPICS[0];

  const currentIndex = MOCK_LEARNING_TOPICS.findIndex((t) => t.id === topic.id);
  const prevTopic = currentIndex > 0 ? MOCK_LEARNING_TOPICS[currentIndex - 1] : null;
  const nextTopic =
    currentIndex < MOCK_LEARNING_TOPICS.length - 1 ? MOCK_LEARNING_TOPICS[currentIndex + 1] : null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8 space-y-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/learn" className="hover:text-white transition-colors">
          Learn Hub
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-indigo-400 font-semibold">{topic.title}</span>
      </div>

      <DisclaimerBanner mode="compact" />

      {/* Header Box */}
      <div className="rounded-3xl border border-indigo-500/30 bg-gradient-to-br from-slate-900 via-indigo-950/20 to-slate-900 p-6 sm:p-8 shadow-2xl space-y-3">
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
            {topic.category}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-medium">
            Tingkat: {topic.difficulty}
          </span>
          <span className="text-slate-500">• Waktu Baca: {topic.readTime}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
          {topic.title}
        </h1>
      </div>

      {/* 8-Step Structured Learning Content */}
      <div className="space-y-8">
        {/* Step 1: Apa itu? */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm uppercase tracking-wider">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/20 text-xs text-indigo-300">
              1
            </span>
            <span>Apa Itu {topic.title}?</span>
          </div>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed pl-8">
            {topic.whatIsIt}
          </p>
        </section>

        {/* Step 2: Penjelasan Sederhana */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase tracking-wider">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500/20 text-xs text-cyan-300">
              2
            </span>
            <span>Penjelasan Sederhana (Analogi Nyata)</span>
          </div>
          <div className="pl-8">
            <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-4 text-sm text-cyan-100 leading-relaxed flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <span>{topic.simpleExplanation}</span>
            </div>
          </div>
        </section>

        {/* Step 3: Contoh Angka Nyata */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wider">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-xs text-emerald-300">
              3
            </span>
            <span>Contoh Angka & Perhitungan Nyata di BEI</span>
          </div>
          <div className="pl-8">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-4 text-sm font-mono text-emerald-200 leading-relaxed flex items-start gap-3">
              <Calculator className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span>{topic.numberExample}</span>
            </div>
          </div>
        </section>

        {/* Step 4: Visualisasi Interaktif */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm uppercase tracking-wider">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/20 text-xs text-amber-300">
              4
            </span>
            <span>Visualisasi & Simulasi Konsep</span>
          </div>
          <div className="pl-8 space-y-3">
            <p className="text-xs text-slate-400">{topic.visualDescription}</p>
            <ConceptVisualizer type={topic.visualType} />
          </div>
        </section>

        {/* Step 5: Latihan Mandiri */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-teal-400 font-bold text-sm uppercase tracking-wider">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-500/20 text-xs text-teal-300">
              5
            </span>
            <span>Latihan Mandiri (Action Step)</span>
          </div>
          <div className="pl-8">
            <div className="rounded-xl border border-slate-700 bg-slate-950 p-4 text-xs sm:text-sm text-slate-300 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <span>{topic.practiceTask}</span>
            </div>
          </div>
        </section>

        {/* Step 6: Kuis Interaktif & Feedback */}
        <section className="rounded-2xl border border-indigo-500/30 bg-slate-900/90 p-6 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-purple-400 font-bold text-sm uppercase tracking-wider">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/20 text-xs text-purple-300">
              6
            </span>
            <span>Kuis Pemahaman (Langkah 6 & 7)</span>
          </div>
          <div className="pl-8">
            <InteractiveQuiz questions={topic.quiz} topicTitle={topic.title} />
          </div>
        </section>

        {/* Step 7: Kesalahan Umum Pemula */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-sm uppercase tracking-wider">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/20 text-xs text-rose-300">
              7
            </span>
            <span>Kesalahan Umum Pemula (Pitfalls to Avoid)</span>
          </div>
          <div className="pl-8 space-y-2">
            {topic.commonMistakes.map((mistake, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 rounded-xl border border-rose-500/20 bg-rose-950/20 p-3 text-xs sm:text-sm text-rose-200"
              >
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{mistake}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Step 8: Istilah Terkait */}
        <section className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm uppercase tracking-wider">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500/20 text-xs text-indigo-300">
              8
            </span>
            <span>Istilah Terkait (Knowledge Graph)</span>
          </div>
          <div className="pl-8 flex flex-wrap gap-2">
            {topic.relatedTerms.map((term, idx) => (
              <Link
                key={idx}
                href={`/dictionary?search=${encodeURIComponent(term)}`}
                className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-950 text-slate-300 hover:border-indigo-500/50 hover:text-indigo-300 transition-colors"
              >
                <Layers className="w-3 h-3 text-indigo-400" />
                <span>{term}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Prev / Next Topic Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
        {prevTopic ? (
          <Link
            href={`/learn/${prevTopic.id}`}
            className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Sebelumnya: {prevTopic.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {nextTopic && (
          <Link
            href={`/learn/${nextTopic.id}`}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-950/40 hover:opacity-95 transition-opacity"
          >
            <span>Selanjutnya: {nextTopic.title}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
