'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Zap,
  SlidersHorizontal,
  Building2,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { getTodayResearchCandidates, ResearchCandidateItem } from '@/lib/candidateEngine';
import { formatIDR, formatPercent } from '@/lib/utils';
import { BadgeTag } from '@/components/common/BadgeTag';

export function AiResearchCandidates() {
  const candidates = getTodayResearchCandidates();
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const activeCandidate = candidates[selectedIdx];

  const inst = activeCandidate.instrument;
  const isUp = inst.changePercent >= 0;

  return (
    <div className="rounded-3xl border border-indigo-500/30 bg-slate-900/90 p-5 sm:p-6 shadow-2xl backdrop-blur-md space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-cyan-400" /> Today&apos;s AI Research Candidates
            </span>
            <BadgeTag label="DETERMINISTIC ENGINE" size="sm" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Kandidat Riset Berbasis Bukti &amp; Konteks Pasar
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl">
            Emiten dipilih melalui filter matematis (teknikal, valuasi, volume, fundamental) dan disajikan dengan analisis transparansi &quot;Mengapa Saham Ini Muncul&quot; tanpa rekomendasi sepihak.
          </p>
        </div>

        <Link
          href="/screener"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors shrink-0 self-start sm:self-auto border border-slate-700"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
          <span>Buka Full Screener</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Candidate Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {candidates.map((cand, idx) => {
          const isSelected = selectedIdx === idx;
          const cInst = cand.instrument;
          const cUp = cInst.changePercent >= 0;

          return (
            <button
              key={cInst.symbol}
              onClick={() => setSelectedIdx(idx)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'border-cyan-500 bg-cyan-950/40 ring-1 ring-cyan-500/50 shadow-lg'
                  : 'border-slate-800 bg-slate-950/50 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-sm text-white">{cInst.symbol}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
                  {cInst.exchange}
                </span>
              </div>
              <div className="text-xs text-slate-400 truncate mt-0.5">{cInst.companyName}</div>
              <div className="flex items-center justify-between mt-2 text-xs font-mono">
                <span className="font-bold text-white">
                  {cInst.currency === 'IDR' ? formatIDR(cInst.price) : `${cInst.currency} ${cInst.price.toFixed(2)}`}
                </span>
                <span className={`font-semibold ${cUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {cUp ? '+' : ''}{formatPercent(cInst.changePercent)}
                </span>
              </div>
              <div className="mt-2 text-[10px] font-medium text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded-md border border-cyan-500/30 truncate">
                {cand.badge}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Candidate Deep Intelligence Box */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5 sm:p-6 space-y-5">
        {/* Candidate Title Ribbon */}
        <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-2xl font-black text-white font-mono">{inst.symbol}</h3>
              <span className="text-sm font-bold text-slate-300">{inst.companyName}</span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {inst.sector}
              </span>
              <BadgeTag label={activeCandidate.badge} size="sm" />
            </div>
            <p className="text-xs font-medium text-indigo-300 mt-1">
              Tema Riset: &ldquo;{activeCandidate.theme}&rdquo;
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`/company/${inst.symbol}`}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              <Building2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Profil Bisnis</span>
            </Link>

            <Link
              href={`/analysis/${inst.symbol}`}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-95 text-white text-xs font-bold transition-all shadow-md"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Analisis Lengkap</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* 2-Column Intelligence Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left: Why This Appeared (Evidence Criteria) */}
          <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <h4>Mengapa Saham Ini Muncul (Kriteria Terpenuhi)</h4>
            </div>
            <ul className="space-y-2">
              {activeCandidate.whyItAppeared.map((reason, idx) => (
                <li key={idx} className="text-xs text-slate-200 flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Key Catalyst & Main Risks */}
          <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
            {/* Catalyst */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <Zap className="w-4 h-4" />
                <h4>Katalis Utama ({activeCandidate.keyCatalyst.timeframe})</h4>
              </div>
              <p className="text-xs font-semibold text-white">{activeCandidate.keyCatalyst.title}</p>
              <p className="text-[11px] text-slate-300">{activeCandidate.keyCatalyst.impact}</p>
            </div>

            {/* Risks */}
            <div className="pt-2 border-t border-slate-800/80 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <h4>Faktor Risiko Kunci</h4>
              </div>
              <ul className="space-y-1">
                {activeCandidate.keyRisks.map((risk, idx) => (
                  <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5">
                    <span className="text-rose-400 font-bold shrink-0">!</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Delta Banner: What Changed Today & Invalidation Trigger */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
          <div className="bg-indigo-950/30 border border-indigo-500/20 p-3 rounded-xl space-y-1">
            <span className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider block">
              ⚡ Perubahan Signifikan Hari Ini (Delta)
            </span>
            <p className="text-slate-200">{activeCandidate.whatChangedToday}</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-3 rounded-xl space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              🛡️ Syarat Monitoring &amp; Level Invalidation
            </span>
            <p className="text-slate-300">
              <strong className="text-slate-200">Monitor: </strong>{activeCandidate.conditionsToMonitor} • <strong className="text-rose-300">Batal jika: </strong>{activeCandidate.invalidationTrigger}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
