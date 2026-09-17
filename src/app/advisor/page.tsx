'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Compass,
  Target,
  ShieldAlert,
  Clock,
  Globe,
  SlidersHorizontal,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Building2,
  TrendingUp,
  Layers,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { DisclaimerBanner } from '@/components/common/DisclaimerBanner';
import { BadgeTag } from '@/components/common/BadgeTag';
import { INSTRUMENT_MASTER } from '@/data/instrumentMaster';
import { formatPercent, formatIDR } from '@/lib/utils';

interface GoalOption {
  id: string;
  label: string;
  desc: string;
  icon: string;
}

interface RiskOption {
  id: string;
  label: string;
  desc: string;
}

interface HorizonOption {
  id: string;
  label: string;
  desc: string;
}

interface MarketOption {
  id: string;
  label: string;
  desc: string;
}

export default function AdvisorPage() {
  const [goal, setGoal] = useState<string>('growth');
  const [risk, setRisk] = useState<string>('moderate');
  const [horizon, setHorizon] = useState<string>('medium');
  const [market, setMarket] = useState<string>('all');
  const [isCalculated, setIsCalculated] = useState<boolean>(true);

  const goalOptions: GoalOption[] = [
    { id: 'growth', label: 'Pertumbuhan Modal (Capital Growth)', desc: 'Fokus pada emiten dengan pertumbuhan laba tinggi & ekspansi pasar.', icon: '🚀' },
    { id: 'dividend', label: 'Pendapatan Dividen Rutin (Income)', desc: 'Fokus pada perusahaan mature dengan free cash flow solid & yield dividen tinggi.', icon: '💰' },
    { id: 'value', label: 'Nilai Terdiskon (Deep Value)', desc: 'Mencari emiten berkualitas yang diperdagangkan di bawah valuasi wajar historis.', icon: '💎' },
    { id: 'momentum', label: 'Momentum & Trend Following', desc: 'Memanfaatkan kekuatan tren teknikal jangka pendek-menengah dengan volume konfirmasi.', icon: '⚡' }
  ];

  const riskOptions: RiskOption[] = [
    { id: 'conservative', label: 'Konservatif', desc: 'Prioritas menjaga modal pokok, toleransi drawdown rendah (< 5-8%).' },
    { id: 'moderate', label: 'Moderat', desc: 'Keseimbangan antara potensi return dan risiko terukur (drawdown 10-15%).' },
    { id: 'aggressive', label: 'Agresif', desc: 'Siap menerima volatilitas tinggi untuk mengejar potensi pertumbuhan maksimal.' }
  ];

  const horizonOptions: HorizonOption[] = [
    { id: 'short', label: 'Jangka Pendek (1 - 4 Minggu)', desc: 'Trading swing memanfaatkan momentum siklikal dan katalis peristiwa.' },
    { id: 'medium', label: 'Jangka Menengah (1 - 6 Bulan)', desc: 'Riset berbasis laporan keuangan kuartalan dan rotasi sektoral.' },
    { id: 'long', label: 'Jangka Panjang (> 1 Tahun)', desc: 'Investasi struktural berorientasi keunggulan kompetitif jangka panjang.' }
  ];

  const marketOptions: MarketOption[] = [
    { id: 'all', label: '🌍 Multi-Market Global', desc: 'Kombinasi saham Indonesia (IDX), US Tech, dan Bursa Asia.' },
    { id: 'id', label: '🇮🇩 Indonesia (IDX / BEI)', desc: 'Fokus pada emiten domestik likuid berkapitalisasi besar (LQ45/IDX30).' },
    { id: 'us', label: '🇺🇸 United States (NYSE/NASDAQ)', desc: 'Fokus pada raksasa teknologi global dan pemimpin industri dunia.' }
  ];

  // Deterministic mapping engine
  const recommendation = useMemo(() => {
    let presetName = 'Global High-ROE Compounders';
    let presetId = 'global-quality';
    let filterRules = [
      'ROE ≥ 15%',
      'Net Profit Margin ≥ 18%',
      'Debt-to-Equity ≤ 1.0x',
      'Volume di atas rata-rata 20 hari'
    ];
    let rationale = 'Kombinasi tujuan pertumbuhan modal dengan profil risiko moderat cocok dipetakan ke emiten berkualitas tinggi (High ROE Compounders) yang memiliki keunggulan kompetitif struktural dan neraca keuangan sehat.';
    let riskNote = 'Waspadai potensi volatilitas valuasi jangka pendek saat rilis data makro suku bunga acuan.';
    let sampleSymbols = ['BBCA', 'AAPL', 'NVDA'];

    if (goal === 'dividend') {
      presetName = 'High Dividend & Cash Flow Yield';
      presetId = 'dividend-yield';
      filterRules = [
        'Dividend Yield ≥ 5.0%',
        'Free Cash Flow Positif 3 Tahun Beruntun',
        'Dividend Payout Ratio 30% - 70%',
        'Debt-to-Equity ≤ 0.8x'
      ];
      rationale = 'Untuk sasaran pendapatan pasif dividen, strategi difokuskan pada emiten berekuitas tebal dengan rekam jejak dividen stabil dan yield di atas suku bunga deposito.';
      riskNote = 'Perhatikan risiko dividend trap bila laba bersih emiten mengalami kontraksi tajam.';
      sampleSymbols = ['ASII', 'BBRI', 'D05'];
    } else if (goal === 'value') {
      presetName = 'Deep Value & Undervalued Moat';
      presetId = 'deep-value';
      filterRules = [
        'PER ≤ 15x',
        'PBV ≤ 1.5x',
        'Current Ratio ≥ 1.2x',
        'Kondisi Keuangan Bebas Risiko Solvabilitas'
      ];
      rationale = 'Pendekatan nilai intrinsik menyaring emiten yang dihargai murah oleh pasar tetapi memiliki aset produktif dan arus kas operasional positif.';
      riskNote = 'Nilai diskon dapat memerlukan waktu lama (value trap) sebelum pasar melakukan repricing.';
      sampleSymbols = ['ASII', '7203', 'TLKM'];
    } else if (goal === 'momentum') {
      presetName = 'Technical Breakout & Trend Momentum';
      presetId = 'momentum-breakout';
      filterRules = [
        'Harga di atas MA20 & MA50',
        'RSI (14) berada di rentang 55 - 68 (Momentum Sehat)',
        'Volume Breakout ≥ 1.3x 20-Day Average',
        'Support Kunci Terkonfirmasi'
      ];
      rationale = 'Strategi momentum teknikal menyaring saham yang berada dalam fase ekspansi tren naik dengan konfirmasi volume likuid.';
      riskNote = 'Wajib disiplin menerapkan stop loss ketat karena pembalikan tren mendadak dapat terjadi.';
      sampleSymbols = ['NVDA', 'AAPL', 'BBCA'];
    }

    // Filter candidate instruments by selected market
    let filteredCandidates = INSTRUMENT_MASTER.filter(inst => {
      if (market === 'id') return inst.countryCode === 'ID';
      if (market === 'us') return inst.countryCode === 'US';
      return sampleSymbols.includes(inst.symbol);
    });

    if (filteredCandidates.length === 0) {
      filteredCandidates = INSTRUMENT_MASTER.slice(0, 3);
    }

    return {
      presetName,
      presetId,
      filterRules,
      rationale,
      riskNote,
      candidates: filteredCandidates
    };
  }, [goal, risk, horizon, market]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-md bg-indigo-500/10 px-2.5 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Deterministic Strategy Mapper • Phase 1 Simulation</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            AI Market Advisor &amp; Strategy Mapper
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Jawab 4 preferensi investasi Anda untuk dipetakan secara matematis dan transparan ke preset screener &amp; strategi riset yang relevan tanpa rekayasa rekomendasi.
          </p>
        </div>

        <BadgeTag label="EVIDENCE-BASED ENGINE" size="md" />
      </div>

      <DisclaimerBanner mode="compact" />

      {/* 2-Column Workspace: Questionnaire vs Strategy Result */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Questionnaire (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: User Goal */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider">
              <Target className="w-4 h-4" />
              <span>1. Tujuan Utama Riset (Investment Goal)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {goalOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setGoal(opt.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    goal === opt.id
                      ? 'border-cyan-500 bg-cyan-950/40 ring-1 ring-cyan-500/50 shadow-md'
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-950/90'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{opt.icon}</span>
                    <span className="font-bold text-xs sm:text-sm text-white">{opt.label}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Risk Tolerance */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4" />
              <span>2. Toleransi Risiko (Risk Tolerance)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {riskOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setRisk(opt.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    risk === opt.id
                      ? 'border-indigo-500 bg-indigo-950/40 ring-1 ring-indigo-500/50 shadow-md'
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-950/90'
                  }`}
                >
                  <span className="font-bold text-xs sm:text-sm text-white block">{opt.label}</span>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Time Horizon */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Clock className="w-4 h-4" />
              <span>3. Horizon Waktu Rencana (Time Horizon)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {horizonOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setHorizon(opt.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    horizon === opt.id
                      ? 'border-amber-500 bg-amber-950/40 ring-1 ring-amber-500/50 shadow-md'
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-950/90'
                  }`}
                >
                  <span className="font-bold text-xs sm:text-sm text-white block">{opt.label}</span>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 4: Market Preference */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <Globe className="w-4 h-4" />
              <span>4. Cakupan Bursa Acuan (Market Preference)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {marketOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setMarket(opt.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    market === opt.id
                      ? 'border-emerald-500 bg-emerald-950/40 ring-1 ring-emerald-500/50 shadow-md'
                      : 'border-slate-800 bg-slate-950/60 hover:border-slate-700 hover:bg-slate-950/90'
                  }`}
                >
                  <span className="font-bold text-xs sm:text-sm text-white block">{opt.label}</span>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Matched Strategy & Preset Screener (5 Cols Sticky) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="sticky top-20 rounded-3xl border border-cyan-500/40 bg-gradient-to-br from-slate-900 via-slate-900/95 to-indigo-950/40 p-6 space-y-6 shadow-2xl backdrop-blur-md">
            {/* Header Result */}
            <div className="space-y-2 pb-4 border-b border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Matched Strategy Mapping
                </span>
                <BadgeTag label="HASIL SINKRON" size="sm" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {recommendation.presetName}
              </h2>
            </div>

            {/* Research Rationale */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                💡 Rasional Riset Matematis
              </span>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80">
                {recommendation.rationale}
              </p>
            </div>

            {/* Filter Rules Applied */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                ✓ Parameter Filter Screener
              </span>
              <ul className="space-y-1.5">
                {recommendation.filterRules.map((rule, idx) => (
                  <li key={idx} className="text-xs text-slate-200 flex items-center gap-2 bg-slate-950/40 p-2 rounded-xl border border-slate-800/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Matched Candidate Stocks */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                📊 Contoh Emiten Sesuai Kriteria
              </span>
              <div className="space-y-2">
                {recommendation.candidates.map((inst) => {
                  const isUp = inst.changePercent >= 0;
                  return (
                    <div
                      key={inst.symbol}
                      className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-slate-700">
                          {inst.symbol.slice(0, 4)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-xs text-white font-mono">{inst.symbol}</div>
                          <div className="text-[11px] text-slate-400 truncate max-w-[140px]">{inst.companyName}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 font-mono text-xs">
                        <div className="text-right">
                          <div className="font-bold text-white">
                            {inst.currency === 'IDR' ? formatIDR(inst.price) : `${inst.currency} ${inst.price.toFixed(2)}`}
                          </div>
                          <div className={`text-[10px] font-semibold ${isUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {isUp ? '+' : ''}{formatPercent(inst.changePercent)}
                          </div>
                        </div>
                        <Link
                          href={`/analysis/${inst.symbol}`}
                          className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 hover:bg-cyan-900 border border-cyan-500/30"
                          title="Buka Analisis"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Risk Warnings */}
            <div className="p-3.5 rounded-2xl border border-rose-500/20 bg-rose-950/10 space-y-1 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-rose-300">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>Peringatan Risiko Strategi</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">{recommendation.riskNote}</p>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2">
              <Link
                href="/screener"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-95 text-white text-xs sm:text-sm font-bold shadow-lg shadow-cyan-950/50 transition-opacity"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Terapkan Preset ke Global Screener</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
