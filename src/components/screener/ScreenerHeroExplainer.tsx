'use client';

import React, { useState } from 'react';
import {
  SlidersHorizontal,
  Info,
  CheckCircle2,
  Workflow,
  X,
  ArrowRight,
  ShieldCheck,
  Search,
  Sliders,
  Sparkles,
  BarChart3,
  Scale,
  TrendingUp,
  Globe2,
} from 'lucide-react';

export function ScreenerHeroExplainer() {
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

  return (
    <>
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950 p-6 shadow-2xl backdrop-blur-md space-y-6">
        {/* Top Header */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
                <Globe2 className="w-3.5 h-3.5" /> Quantitative Global Engine
              </span>
              <span className="text-[11px] font-mono text-slate-400">Deterministic Logic • Zero-Hallucination</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Global Stock Screener
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Gunakan filter fundamental, technical, valuation, momentum, growth, dividend, dan market untuk menemukan saham yang memenuhi kriteria penelitian Anda.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsHowItWorksOpen(true)}
            className="flex items-center gap-2 rounded-xl border border-indigo-500/40 bg-indigo-950/40 px-4 py-2 text-xs font-semibold text-indigo-300 hover:bg-indigo-900/40 hover:text-white transition-all shadow-md"
          >
            <Workflow className="w-4 h-4 text-indigo-400" />
            <span>How It Works</span>
          </button>
        </div>

        {/* Section: Scanner ini digunakan untuk */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-1.5 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Kriteria Fundamental</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Mencari saham berdasarkan ROE, DER, net margin, dan kekuatan neraca keuangan.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-1.5 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <BarChart3 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Technical Setup</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Menyaring setup tren, RSI oversold/overbought, Moving Average crossover, dan breakout.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-1.5 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Scale className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Bandingkan Valuation</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Membandingkan PER, PBV, EV/EBITDA, dan PEG lintas emiten dan industri sejenis.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-1.5 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <TrendingUp className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Growth & Dividend</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Menemukan saham dengan pertumbuhan revenue/laba tinggi atau yield dividen konsisten.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-1.5 hover:border-slate-700 transition-colors">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Globe2 className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Universe & Exchange</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Menyaring instrumen berdasarkan bursa asal (US, IDX, TSE, HKEX, LSE, SGX, ASX, TSX).
            </p>
          </div>
        </div>

        {/* Explicit Non-Claim Disclaimer */}
        <div className="flex items-start gap-2.5 rounded-xl border border-slate-800 bg-slate-950/80 p-3 text-[11px] text-slate-400 leading-relaxed">
          <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <span>
            <strong className="text-slate-300">Catatan Metodologi:</strong> Scanner ini bekerja secara matematis sesuai parameter yang Anda tentukan. Scanner tidak menentukan saham mana yang &ldquo;terbaik&rdquo; dan tidak membuat klaim atau jaminan keuntungan. Gunakan hasil filter sebagai titik awal riset dan analisis mendalam Anda.
          </span>
        </div>
      </div>

      {/* "How It Works" Interactive Modal */}
      {isHowItWorksOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Workflow className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-base text-white">
                  How the Screening Engine Works
                </h3>
              </div>
              <button
                onClick={() => setIsHowItWorksOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Pipeline Flow Diagram */}
            <div className="space-y-3 font-mono text-xs">
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cyan-300 font-sans">1. Market Universe</span>
                  <span className="text-[10px] text-slate-400">Step 01</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans">
                  Katalog seluruh instrumen (Saham, ETF, REIT, ADR) dari bursa global yang terdaftar.
                </p>
              </div>

              <div className="flex justify-center text-slate-600">↓</div>

              <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-indigo-300 font-sans">2. Data Collection</span>
                  <span className="text-[10px] text-slate-400">Step 02</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans">
                  Agregasi data harga harian, laporan laba rugi, neraca, serta indikator teknikal dari data provider resmi.
                </p>
              </div>

              <div className="flex justify-center text-slate-600">↓</div>

              <div className="rounded-xl border border-purple-500/30 bg-purple-950/20 p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-purple-300 font-sans">3. Data Validation</span>
                  <span className="text-[10px] text-slate-400">Step 03</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans">
                  Normalisasi mata uang ke USD untuk perbandingan kapitalisasi pasar dan pembersihan data out-of-range.
                </p>
              </div>

              <div className="flex justify-center text-slate-600">↓</div>

              <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300 font-sans">4. Deterministic Filter Engine</span>
                  <span className="text-[10px] text-slate-400">Step 04</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans">
                  Evaluasi aturan logika Boolean (AND, OR, NOT) tanpa melibatkan estimasi atau halusinasi AI.
                </p>
              </div>

              <div className="flex justify-center text-slate-600">↓</div>

              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-emerald-300 font-sans">5. Matched Stocks & Why Match Audit</span>
                  <span className="text-[10px] text-slate-400">Step 05</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans">
                  Menyajikan emiten yang lolos secara transparan beserta rekap kriteria passed/failed.
                </p>
              </div>

              <div className="flex justify-center text-slate-600">↓</div>

              <div className="rounded-xl border border-teal-500/30 bg-teal-950/20 p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-teal-300 font-sans">6. Deep Research / Analysis</span>
                  <span className="text-[10px] text-slate-400">Step 06</span>
                </div>
                <p className="text-[11px] text-slate-300 font-sans">
                  Diteruskan ke halaman Analisis Interaktif, charting TradingView, atau persiapan order preview ke broker.
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsHowItWorksOpen(false)}
                className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700 transition-colors"
              >
                Mengerti & Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
