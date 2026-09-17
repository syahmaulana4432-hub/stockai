'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { DisclaimerBanner } from '@/components/common/DisclaimerBanner';
import { MOCK_LEARNING_TOPICS } from '@/data/mockLearning';
import {
  BROKER_COMPARISON_LIST,
  MOCK_BROKER_TUTORIALS,
  BrokerTutorial,
} from '@/data/mockCurriculum';
import {
  BookOpen,
  CheckCircle2,
  Lock,
  Unlock,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Layers,
  Search,
  ExternalLink,
  HelpCircle,
  Clock,
  ShieldAlert,
  Calculator,
  Compass,
  Briefcase,
  TrendingUp,
  TrendingDown,
  Info,
  ChevronDown,
  ChevronUp,
  FileText,
  UserCheck,
  Building2,
  Check,
  RotateCcw,
  ShieldCheck,
  Zap,
} from 'lucide-react';

const STORAGE_KEY = 'stockai_curriculum_progress_v1';
const LOCK_KEY = 'stockai_curriculum_lock_mode_v1';

export default function LearnCurriculumPage() {
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [isLockMode, setIsLockMode] = useState<boolean>(true);
  const [openStages, setOpenStages] = useState<Record<number, boolean>>({ 0: true, 1: true });
  const [activeBrokerTab, setActiveBrokerTab] = useState<string>('stockbit');
  const [isLoaded, setIsLoaded] = useState(false);

  // Intraday BEP Calculator state
  const [intradayBuyPrice, setIntradayBuyPrice] = useState<number>(1000);
  const [intradayBuyFeePercent, setIntradayBuyFeePercent] = useState<number>(0.15);
  const [intradaySellFeePercent, setIntradaySellFeePercent] = useState<number>(0.25);
  const [intradayLotCount, setIntradayLotCount] = useState<number>(100);

  // Load progress from localStorage
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(STORAGE_KEY);
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress);
        if (Array.isArray(parsed)) {
          setCompletedStages(parsed);
        }
      }

      const savedLock = localStorage.getItem(LOCK_KEY);
      if (savedLock !== null) {
        setIsLockMode(savedLock === 'true');
      }
    } catch (e) {
      console.warn('Could not read curriculum progress from localStorage', e);
    }
    setIsLoaded(true);
  }, []);

  // Save progress
  const toggleStageCompletion = (stageNumber: number) => {
    setCompletedStages((prev) => {
      let next: number[];
      if (prev.includes(stageNumber)) {
        next = prev.filter((s) => s !== stageNumber);
      } else {
        next = [...prev, stageNumber].sort((a, b) => a - b);
        // Automatically open the next stage if available
        if (stageNumber + 1 <= 8) {
          setOpenStages((os) => ({ ...os, [stageNumber + 1]: true }));
        }
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.warn('Could not save progress to localStorage', e);
      }
      return next;
    });
  };

  const toggleLockMode = () => {
    setIsLockMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(LOCK_KEY, String(next));
      } catch (e) {
        console.warn('Could not save lock mode to localStorage', e);
      }
      return next;
    });
  };

  const toggleStageOpen = (stageNumber: number) => {
    setOpenStages((prev) => ({
      ...prev,
      [stageNumber]: !prev[stageNumber],
    }));
  };

  const isStageLocked = (stageNumber: number) => {
    if (!isLockMode) return false;
    if (stageNumber === 0) return false;
    // Locked if previous stage is not completed
    return !completedStages.includes(stageNumber - 1);
  };

  const progressPercentage = Math.round((completedStages.length / 9) * 100);

  // Intraday calculation
  const intradayCalculation = useMemo(() => {
    const grossCost = intradayBuyPrice * intradayLotCount * 100;
    const buyFee = grossCost * (intradayBuyFeePercent / 100);
    const totalCapital = grossCost + buyFee;

    // Minimum sell price where: (sellPrice * lot * 100) * (1 - sellFeePercent/100) >= totalCapital
    // sellPrice >= totalCapital / (lot * 100 * (1 - sellFeePercent/100))
    const minSellPrice = totalCapital / (intradayLotCount * 100 * (1 - intradaySellFeePercent / 100));
    const breakEvenPriceCeil = Math.ceil(minSellPrice);
    const feeSpreadCost = buyFee + (breakEvenPriceCeil * intradayLotCount * 100 * (intradaySellFeePercent / 100));
    const breakEvenGainPercent = ((breakEvenPriceCeil - intradayBuyPrice) / intradayBuyPrice) * 100;

    return {
      grossCost,
      buyFee,
      totalCapital,
      breakEvenPriceCeil,
      feeSpreadCost,
      breakEvenGainPercent: breakEvenGainPercent.toFixed(2),
    };
  }, [intradayBuyPrice, intradayBuyFeePercent, intradaySellFeePercent, intradayLotCount]);

  const activeBroker: BrokerTutorial = MOCK_BROKER_TUTORIALS[activeBrokerTab] || MOCK_BROKER_TUTORIALS.stockbit;

  // Filter topics for Stage 1, 3, 4
  const stage1Topics = MOCK_LEARNING_TOPICS.filter((t) =>
    ['saham', 'lot', 'bid-offer', 'spread', 'market-cap', 'ihsg'].includes(t.id)
  );

  const stage3Topics = MOCK_LEARNING_TOPICS.filter((t) =>
    ['laporan-keuangan', 'per', 'pbv', 'roe', 'dividen', 'der', 'npm'].includes(t.id)
  );

  const stage4Topics = MOCK_LEARNING_TOPICS.filter((t) =>
    ['candlestick', 'support-resistance', 'trendline', 'sma', 'ema', 'rsi', 'macd', 'volume-breakout'].includes(t.id)
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-md bg-indigo-500/10 px-2.5 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20 mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Kurikulum Trading Terstruktur (Tahap 0–8)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Kurikulum Trading & Belajar Saham Berurutan
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
            Panduan komprehensif 9 tahap dari persiapan awal, mekanika order aplikasi broker, analisis fundamental & teknikal, penyusunan trading plan, hingga manajemen risiko dan strategi jangka pendek.
          </p>
        </div>

        {/* Global Transparency Badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Educational Sandbox</span>
          </span>
        </div>
      </div>

      <DisclaimerBanner mode="compact" />

      {/* Progress & Lock Controller Bar */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl backdrop-blur-md space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white uppercase tracking-wider">
                Progress Kurikulum:
              </span>
              <span className="text-sm font-mono font-black text-cyan-400">
                {completedStages.length} / 9 Tahap Selesai
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30 font-bold">
                {progressPercentage}%
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Selesaikan setiap tahap secara berurutan untuk membangun pondasi trading yang disiplin dan teruji.
            </p>
          </div>

          {/* Toggle Lock Mode Switch */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleLockMode}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isLockMode
                  ? 'bg-indigo-950/60 border-indigo-500/40 text-indigo-300 shadow-inner'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              {isLockMode ? (
                <>
                  <Lock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Mode Terkunci: <strong>AKTIF</strong></span>
                </>
              ) : (
                <>
                  <Unlock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Mode Bebas (Buka Semua)</span>
                </>
              )}
            </button>

            {completedStages.length > 0 && (
              <button
                onClick={() => {
                  if (confirm('Reset seluruh progress belajar?')) {
                    setCompletedStages([]);
                    localStorage.removeItem(STORAGE_KEY);
                  }
                }}
                title="Reset progress"
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800/80 p-0.5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400 transition-all duration-500 shadow-md"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* ========================================================
          STAGE 0: PERSIAPAN
      ======================================================== */}
      <div
        className={`rounded-2xl border transition-all ${
          isStageLocked(0)
            ? 'border-slate-800/60 bg-slate-950/40 opacity-70'
            : completedStages.includes(0)
            ? 'border-emerald-500/30 bg-slate-900/90 shadow-lg'
            : 'border-slate-800 bg-slate-900/90 shadow-xl'
        }`}
      >
        <div
          onClick={() => toggleStageOpen(0)}
          className="p-5 flex items-center justify-between cursor-pointer select-none hover:bg-slate-800/30 rounded-2xl transition-colors"
        >
          <div className="flex items-center gap-3.5">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold font-mono text-sm border ${
                completedStages.includes(0)
                  ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400 shadow-md'
                  : 'bg-cyan-950/60 border-cyan-500/30 text-cyan-300'
              }`}
            >
              {completedStages.includes(0) ? <Check className="w-5 h-5" /> : '00'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
                  Tahap 0
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Pemula
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Persiapan Awal: Apa Itu Saham, Cara Buka RDN & Memilih Sekuritas
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {completedStages.includes(0) && (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
              </span>
            )}
            {openStages[0] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </div>
        </div>

        {openStages[0] && (
          <div className="p-5 pt-0 border-t border-slate-800/80 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {/* Concept Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
                  <Building2 className="w-4 h-4" />
                  <span>1. Apa Sebenarnya Saham Itu?</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Saham adalah <strong>bukti kepemilikan modal</strong> pada suatu Perseroan Terbatas (PT) yang tercatat di Bursa Efek Indonesia (BEI). Dengan membeli 1 lot saham BBCA, Anda bukan sekadar menebak angka naik-turun, melainkan menjadi pemilik resmi sebagian kecil dari aset dan laba Bank BCA.
                </p>
                <div className="text-[11px] text-slate-400 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  💡 <strong>Keuntungan Pemegang Saham:</strong> (a) <em>Capital Gain</em> (kenaikan harga jual di atas harga beli) dan (b) <em>Dividen</em> (bagian keuntungan bersih perusahaan yang dibagikan ke investor).
                </div>
              </div>

              {/* RDN Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
                  <Briefcase className="w-4 h-4" />
                  <span>2. Apa Itu RDN (Rekening Dana Nasabah)?</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  RDN adalah rekening bank khusus <strong>atas nama Anda sendiri</strong> yang dibuka oleh perusahaan sekuritas di bank administrator (seperti Bank BCA, Mandiri, BRI, Permata). Uang kas Anda tidak dipegang oleh sekuritas, melainkan tersimpan aman di RDN atas nama pribadi Anda.
                </p>
                <div className="text-[11px] text-slate-400 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                  🔒 <strong>Segregasi Dana:</strong> Jika suatu sekuritas mengalami kendala operasional, dana kas Anda di RDN tetap utuh dan terlindungi oleh KSEI & OJK.
                </div>
              </div>
            </div>

            {/* Checklist & Document Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-3">
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Dokumen Wajib Pendaftaran (e-KYC)
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>e-KTP Fisik Asli:</strong> Foto jelas tanpa pantulan cahaya (wajib untuk verifikasi NIK Dukcapil).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Rekening Bank Pribadi:</strong> Buku tabungan / mutasi mobile banking dengan nama persis sesuai KTP untuk penarikan dana.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>NPWP (Opsional / Dianjurkan):</strong> Diperlukan untuk potongan pajak dividen yang lebih rendah (10%).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Email & Nomor HP Aktif:</strong> Untuk menerima SID (Single Investor Identification) dari KSEI.</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-3">
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                  <UserCheck className="w-4 h-4" /> 4 Kriteria Memilih Perusahaan Sekuritas
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold font-mono">1.</span>
                    <span><strong>Izin Resmi OJK & Anggota BEI:</strong> Pastikan sekuritas memiliki izin Perantara Pedagang Efek (PPE) resmi OJK.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold font-mono">2.</span>
                    <span><strong>Struktur Fee Transaksi:</strong> Fee beli online berkisar antara 0.15% - 0.19% dan fee jual berkisar 0.25% - 0.29%.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold font-mono">3.</span>
                    <span><strong>Kestabilan Aplikasi & Fitur Charting:</strong> Kecepatan eksekusi order pada jam pembukaan pasar (09:00 WIB).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-400 font-bold font-mono">4.</span>
                    <span><strong>Minimum Deposit Awal:</strong> Banyak sekuritas modern kini menetapkan deposit awal Rp 0 bebas hambatan.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Stage Action Button */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <span className="text-xs text-slate-400">
                Langkah berikutnya: Memahami istilah dan mekanisme bursa.
              </span>
              <button
                onClick={() => toggleStageCompletion(0)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  completedStages.includes(0)
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-950/40 hover:opacity-95'
                }`}
              >
                {completedStages.includes(0) ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Batalkan Selesai</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Tandai Tahap 0 Selesai</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          STAGE 1: DASAR PASAR MODAL
      ======================================================== */}
      <div
        className={`rounded-2xl border transition-all ${
          isStageLocked(1)
            ? 'border-slate-800/60 bg-slate-950/40 opacity-70'
            : completedStages.includes(1)
            ? 'border-emerald-500/30 bg-slate-900/90 shadow-lg'
            : 'border-slate-800 bg-slate-900/90 shadow-xl'
        }`}
      >
        <div
          onClick={() => (!isStageLocked(1) ? toggleStageOpen(1) : null)}
          className="p-5 flex items-center justify-between cursor-pointer select-none hover:bg-slate-800/30 rounded-2xl transition-colors"
        >
          <div className="flex items-center gap-3.5">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold font-mono text-sm border ${
                isStageLocked(1)
                  ? 'bg-slate-900 border-slate-800 text-slate-600'
                  : completedStages.includes(1)
                  ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400 shadow-md'
                  : 'bg-indigo-950/60 border-indigo-500/30 text-indigo-300'
              }`}
            >
              {isStageLocked(1) ? <Lock className="w-4 h-4" /> : completedStages.includes(1) ? <Check className="w-5 h-5" /> : '01'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider font-mono">
                  Tahap 1
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Dasar Bursa
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Istilah Dasar Pasar Modal: Saham, Lot, Bid/Offer, Spread, Market Cap & IHSG
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isStageLocked(1) ? (
              <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                <Lock className="w-3.5 h-3.5" /> Terkunci (Selesaikan Tahap 0)
              </span>
            ) : completedStages.includes(1) ? (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
              </span>
            ) : null}
            {openStages[1] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </div>
        </div>

        {openStages[1] && !isStageLocked(1) && (
          <div className="p-5 pt-0 border-t border-slate-800/80 space-y-6">
            <p className="text-xs text-slate-300 pt-4 leading-relaxed">
              Di bawah ini adalah 6 modul konsep inti pasar modal yang wajib dikuasai sebelum Anda memasang order riil di aplikasi broker. Klik salah satu modul untuk membaca penjelasan matematis dan mengerjakan kuis interaktif:
            </p>

            {/* Grid of existing Stage 1 topics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {stage1Topics.map((topic) => (
                <Link
                  key={topic.id}
                  href={`/learn/${topic.id}`}
                  className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-2 hover:border-indigo-500/50 hover:bg-slate-900/90 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-400 font-mono group-hover:text-cyan-300">
                      {topic.title}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {topic.whatIsIt}
                  </p>
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>Bacaan {topic.readTime}</span>
                    <span className="text-indigo-400 font-semibold">Buka Modul & Kuis &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Fraksi Harga BEI Quick Table */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" /> Aturan Fraksi Harga (Tick Size) Bursa Efek Indonesia
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] font-mono pt-1">
                <div className="rounded bg-slate-900 p-2 border border-slate-800">
                  <span className="text-slate-400 block font-sans">Harga &lt; Rp 200</span>
                  <strong className="text-white">Fraksi: Rp 1</strong>
                </div>
                <div className="rounded bg-slate-900 p-2 border border-slate-800">
                  <span className="text-slate-400 block font-sans">Rp 200 - Rp 500</span>
                  <strong className="text-white">Fraksi: Rp 2</strong>
                </div>
                <div className="rounded bg-slate-900 p-2 border border-slate-800">
                  <span className="text-slate-400 block font-sans">Rp 500 - Rp 2.000</span>
                  <strong className="text-white">Fraksi: Rp 5</strong>
                </div>
                <div className="rounded bg-slate-900 p-2 border border-slate-800">
                  <span className="text-slate-400 block font-sans">Rp 2.000 - Rp 5.000</span>
                  <strong className="text-white">Fraksi: Rp 10</strong>
                </div>
                <div className="rounded bg-slate-900 p-2 border border-slate-800">
                  <span className="text-slate-400 block font-sans">Harga &ge; Rp 5.000</span>
                  <strong className="text-white">Fraksi: Rp 25</strong>
                </div>
              </div>
            </div>

            {/* Stage Action Button */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <span className="text-xs text-slate-400">
                Langkah berikutnya: Tutorial langkah-demi-langkah pada aplikasi broker sekuritas.
              </span>
              <button
                onClick={() => toggleStageCompletion(1)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  completedStages.includes(1)
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-md shadow-indigo-950/40 hover:opacity-95'
                }`}
              >
                {completedStages.includes(1) ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Batalkan Selesai</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Tandai Tahap 1 Selesai</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          STAGE 2: CARA TRADING PER APLIKASI SEKURITAS
      ======================================================== */}
      <div
        className={`rounded-2xl border transition-all ${
          isStageLocked(2)
            ? 'border-slate-800/60 bg-slate-950/40 opacity-70'
            : completedStages.includes(2)
            ? 'border-emerald-500/30 bg-slate-900/90 shadow-lg'
            : 'border-slate-800 bg-slate-900/90 shadow-xl'
        }`}
      >
        <div
          onClick={() => (!isStageLocked(2) ? toggleStageOpen(2) : null)}
          className="p-5 flex items-center justify-between cursor-pointer select-none hover:bg-slate-800/30 rounded-2xl transition-colors"
        >
          <div className="flex items-center gap-3.5">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold font-mono text-sm border ${
                isStageLocked(2)
                  ? 'bg-slate-900 border-slate-800 text-slate-600'
                  : completedStages.includes(2)
                  ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400 shadow-md'
                  : 'bg-cyan-950/60 border-cyan-500/30 text-cyan-300'
              }`}
            >
              {isStageLocked(2) ? <Lock className="w-4 h-4" /> : completedStages.includes(2) ? <Check className="w-5 h-5" /> : '02'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
                  Tahap 2
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Praktik Aplikasi
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Cara Trading per Aplikasi Sekuritas (Stockbit, Ajaib, IPOT, BIONS, MOST)
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isStageLocked(2) ? (
              <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                <Lock className="w-3.5 h-3.5" /> Terkunci (Selesaikan Tahap 1)
              </span>
            ) : completedStages.includes(2) ? (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
              </span>
            ) : null}
            {openStages[2] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </div>
        </div>

        {openStages[2] && !isStageLocked(2) && (
          <div className="p-5 pt-0 border-t border-slate-800/80 space-y-6">
            {/* Mandatory General Disclaimer Badge */}
            <div className="flex items-center gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-300">
              <Info className="w-4 h-4 shrink-0 text-amber-400" />
              <div>
                <strong>Panduan Umum — Menu & Fitur Dapat Berbeda:</strong> Tutorial ini merupakan panduan edukasi umum berbasis simulasi alur kerja tipikal aplikasi broker. Tampilan UI dan penamaan menu aktual dapat diperbarui sewaktu-waktu oleh masing-masing penyedia sekuritas.
              </div>
            </div>

            {/* Broker Switcher Tabs */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {Object.keys(MOCK_BROKER_TUTORIALS).map((brokerKey) => {
                  const b = MOCK_BROKER_TUTORIALS[brokerKey];
                  const isActive = activeBrokerTab === brokerKey;
                  return (
                    <button
                      key={brokerKey}
                      onClick={() => setActiveBrokerTab(brokerKey)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-950/40'
                          : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      <span>{b.brokerName}</span>
                    </button>
                  );
                })}
              </div>

              {/* Active Broker 9-Step Tutorial Container */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>Panduan Lengkap 9-Langkah: {activeBroker.brokerName}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                        Tutorial Step-by-Step
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">{activeBroker.tagline}</p>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">9 Langkah Transaksi</span>
                </div>

                {/* 9 Steps List */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {activeBroker.steps.map((s) => (
                    <div
                      key={s.stepNumber}
                      className="rounded-xl border border-slate-800/90 bg-slate-900/80 p-3.5 space-y-2 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-indigo-500/20 text-indigo-300 font-mono font-bold text-[11px]">
                          {s.stepNumber}
                        </span>
                        <h4 className="font-bold text-white">{s.title}</h4>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed">{s.description}</p>
                      {s.subSteps && (
                        <ul className="space-y-1 pt-1.5 border-t border-slate-800/60 text-[10px] text-slate-400">
                          {s.subSteps.map((sub, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-cyan-400 mt-0.5">•</span>
                              <span>{sub}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>

                {/* Concrete Numerical Example Card */}
                <div className="rounded-xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 via-cyan-950/20 to-slate-900 p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <span>{activeBroker.concreteExample.title}</span>
                    </span>
                    <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">
                      Target: Rp 10.250 / Lembar
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1.5 text-xs text-slate-300">
                      <h5 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        Alur Eksekusi Nyata:
                      </h5>
                      {activeBroker.concreteExample.stepsWalkthrough.map((stepText, idx) => (
                        <div key={idx} className="text-[11px] bg-slate-950/50 p-1.5 rounded border border-slate-800/80">
                          {stepText}
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 rounded-xl bg-slate-950/80 p-3 border border-slate-800 font-mono text-xs">
                      <h5 className="text-[11px] font-semibold text-slate-400 font-sans uppercase tracking-wider">
                        Rincian Biaya Transaksi:
                      </h5>
                      <div className="flex justify-between text-slate-300">
                        <span>Nilai Saham Pokok:</span>
                        <span className="font-bold text-white">{activeBroker.concreteExample.calculation.grossBuy}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Fee Broker Beli:</span>
                        <span className="font-bold text-amber-300">{activeBroker.concreteExample.calculation.brokerFee}</span>
                      </div>
                      <div className="pt-2 border-t border-slate-800 flex justify-between text-sm">
                        <span className="font-bold text-cyan-400 font-sans">Total Dana Kas Terpotong:</span>
                        <span className="font-black text-emerald-400">{activeBroker.concreteExample.calculation.totalCost}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 font-sans italic pt-1">
                        {activeBroker.concreteExample.calculation.note}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Broker Comparison Table */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-indigo-400" />
                  <span>Tabel Perbandingan Fee & Deposit Sekuritas Populer</span>
                </h3>
                <span className="text-[10px] text-slate-500 italic">
                  Estimasi umum, cek langsung ke masing-masing sekuritas untuk info terbaru
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-mono text-[11px]">
                    <tr>
                      <th className="p-3">Nama Sekuritas</th>
                      <th className="p-3">Fee Beli</th>
                      <th className="p-3">Fee Jual (incl. PPh 0.1%)</th>
                      <th className="p-3">Min. Deposit</th>
                      <th className="p-3">Platform</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {BROKER_COMPARISON_LIST.map((b, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-3 font-semibold text-white">{b.name}</td>
                        <td className="p-3 font-mono text-cyan-300">{b.buyFee}</td>
                        <td className="p-3 font-mono text-amber-300">{b.sellFee}</td>
                        <td className="p-3 font-mono text-emerald-300">{b.minDeposit}</td>
                        <td className="p-3 text-slate-400 text-[11px]">{b.platformType}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Stage Action Button */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <span className="text-xs text-slate-400">
                Langkah berikutnya: Mempelajari Analisis Fundamental emiten.
              </span>
              <button
                onClick={() => toggleStageCompletion(2)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  completedStages.includes(2)
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-950/40 hover:opacity-95'
                }`}
              >
                {completedStages.includes(2) ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Batalkan Selesai</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Tandai Tahap 2 Selesai</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          STAGE 3: FUNDAMENTAL ANALYSIS
      ======================================================== */}
      <div
        className={`rounded-2xl border transition-all ${
          isStageLocked(3)
            ? 'border-slate-800/60 bg-slate-950/40 opacity-70'
            : completedStages.includes(3)
            ? 'border-emerald-500/30 bg-slate-900/90 shadow-lg'
            : 'border-slate-800 bg-slate-900/90 shadow-xl'
        }`}
      >
        <div
          onClick={() => (!isStageLocked(3) ? toggleStageOpen(3) : null)}
          className="p-5 flex items-center justify-between cursor-pointer select-none hover:bg-slate-800/30 rounded-2xl transition-colors"
        >
          <div className="flex items-center gap-3.5">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold font-mono text-sm border ${
                isStageLocked(3)
                  ? 'bg-slate-900 border-slate-800 text-slate-600'
                  : completedStages.includes(3)
                  ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400 shadow-md'
                  : 'bg-indigo-950/60 border-indigo-500/30 text-indigo-300'
              }`}
            >
              {isStageLocked(3) ? <Lock className="w-4 h-4" /> : completedStages.includes(3) ? <Check className="w-5 h-5" /> : '03'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider font-mono">
                  Tahap 3
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Fundamental
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Fundamental Analysis: Laporan Keuangan, PER, PBV, ROE, Dividen & Valuasi
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isStageLocked(3) ? (
              <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                <Lock className="w-3.5 h-3.5" /> Terkunci (Selesaikan Tahap 2)
              </span>
            ) : completedStages.includes(3) ? (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
              </span>
            ) : null}
            {openStages[3] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </div>
        </div>

        {openStages[3] && !isStageLocked(3) && (
          <div className="p-5 pt-0 border-t border-slate-800/80 space-y-6">
            <p className="text-xs text-slate-300 pt-4 leading-relaxed">
              Analisis fundamental menjawab pertanyaan: <em>"Saham perusahaan apa yang layak dibeli karena memiliki bisnis sehat, laba bertumbuh, dan valuasi wajar?"</em> Pelajari modul interaktif berikut:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {stage3Topics.map((topic) => (
                <Link
                  key={topic.id}
                  href={`/learn/${topic.id}`}
                  className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-2 hover:border-indigo-500/50 hover:bg-slate-900/90 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-400 font-mono group-hover:text-cyan-300">
                      {topic.title}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {topic.whatIsIt}
                  </p>
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>Bacaan {topic.readTime}</span>
                    <span className="text-indigo-400 font-semibold">Buka Modul &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Stage Action Button */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <span className="text-xs text-slate-400">
                Langkah berikutnya: Mempelajari Analisis Teknikal dan Indikator Grafik.
              </span>
              <button
                onClick={() => toggleStageCompletion(3)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  completedStages.includes(3)
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-md shadow-indigo-950/40 hover:opacity-95'
                }`}
              >
                {completedStages.includes(3) ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Batalkan Selesai</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Tandai Tahap 3 Selesai</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          STAGE 4: TECHNICAL ANALYSIS
      ======================================================== */}
      <div
        className={`rounded-2xl border transition-all ${
          isStageLocked(4)
            ? 'border-slate-800/60 bg-slate-950/40 opacity-70'
            : completedStages.includes(4)
            ? 'border-emerald-500/30 bg-slate-900/90 shadow-lg'
            : 'border-slate-800 bg-slate-900/90 shadow-xl'
        }`}
      >
        <div
          onClick={() => (!isStageLocked(4) ? toggleStageOpen(4) : null)}
          className="p-5 flex items-center justify-between cursor-pointer select-none hover:bg-slate-800/30 rounded-2xl transition-colors"
        >
          <div className="flex items-center gap-3.5">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold font-mono text-sm border ${
                isStageLocked(4)
                  ? 'bg-slate-900 border-slate-800 text-slate-600'
                  : completedStages.includes(4)
                  ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400 shadow-md'
                  : 'bg-cyan-950/60 border-cyan-500/30 text-cyan-300'
              }`}
            >
              {isStageLocked(4) ? <Lock className="w-4 h-4" /> : completedStages.includes(4) ? <Check className="w-5 h-5" /> : '04'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
                  Tahap 4
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Teknikal
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Technical Analysis: Candlestick, Support/Resistance, Trendline, SMA, RSI & MACD
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isStageLocked(4) ? (
              <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                <Lock className="w-3.5 h-3.5" /> Terkunci (Selesaikan Tahap 3)
              </span>
            ) : completedStages.includes(4) ? (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
              </span>
            ) : null}
            {openStages[4] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </div>
        </div>

        {openStages[4] && !isStageLocked(4) && (
          <div className="p-5 pt-0 border-t border-slate-800/80 space-y-6">
            <p className="text-xs text-slate-300 pt-4 leading-relaxed">
              Analisis teknikal menjawab pertanyaan: <em>"Kapan waktu terbaik (timing) untuk masuk membeli dan kapan waktu keluar menjual berdasarkan probabilitas grafik harga?"</em>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {stage4Topics.map((topic) => (
                <Link
                  key={topic.id}
                  href={`/learn/${topic.id}`}
                  className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 space-y-2 hover:border-cyan-500/50 hover:bg-slate-900/90 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400 font-mono group-hover:text-indigo-300">
                      {topic.title}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {topic.whatIsIt}
                  </p>
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>{topic.readTime}</span>
                    <span className="text-cyan-400 font-semibold">Buka &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Stage Action Button */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <span className="text-xs text-slate-400">
                Langkah berikutnya: Menyusun Trading Plan berbasis fakta (Evidence-Based).
              </span>
              <button
                onClick={() => toggleStageCompletion(4)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  completedStages.includes(4)
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-950/40 hover:opacity-95'
                }`}
              >
                {completedStages.includes(4) ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Batalkan Selesai</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Tandai Tahap 4 Selesai</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          STAGE 5: MENYUSUN TRADING PLAN
      ======================================================== */}
      <div
        className={`rounded-2xl border transition-all ${
          isStageLocked(5)
            ? 'border-slate-800/60 bg-slate-950/40 opacity-70'
            : completedStages.includes(5)
            ? 'border-emerald-500/30 bg-slate-900/90 shadow-lg'
            : 'border-slate-800 bg-slate-900/90 shadow-xl'
        }`}
      >
        <div
          onClick={() => (!isStageLocked(5) ? toggleStageOpen(5) : null)}
          className="p-5 flex items-center justify-between cursor-pointer select-none hover:bg-slate-800/30 rounded-2xl transition-colors"
        >
          <div className="flex items-center gap-3.5">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold font-mono text-sm border ${
                isStageLocked(5)
                  ? 'bg-slate-900 border-slate-800 text-slate-600'
                  : completedStages.includes(5)
                  ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400 shadow-md'
                  : 'bg-indigo-950/60 border-indigo-500/30 text-indigo-300'
              }`}
            >
              {isStageLocked(5) ? <Lock className="w-4 h-4" /> : completedStages.includes(5) ? <Check className="w-5 h-5" /> : '05'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider font-mono">
                  Tahap 5
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Trading Plan
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Menyusun Trading Plan: Sintesis Fundamental + Teknikal + News (Evidence-Based Research)
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isStageLocked(5) ? (
              <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                <Lock className="w-3.5 h-3.5" /> Terkunci (Selesaikan Tahap 4)
              </span>
            ) : completedStages.includes(5) ? (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
              </span>
            ) : null}
            {openStages[5] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </div>
        </div>

        {openStages[5] && !isStageLocked(5) && (
          <div className="p-5 pt-0 border-t border-slate-800/80 space-y-6">
            <p className="text-xs text-slate-300 pt-4 leading-relaxed">
              Trading plan profesional tidak mengandalkan firasat atau tebak-tebakan. Seluruh keputusan dirumuskan melalui sintesis 3 pilar: <strong>Data Fundamental</strong>, <strong>Struktur Teknikal</strong>, dan <strong>Katalis Berita Terverifikasi</strong> menggunakan framework <em>Evidence-Based Research</em> yang identik dengan sistem analisis StockAI.
            </p>

            {/* Framework Visual Box */}
            <div className="rounded-2xl border border-indigo-500/30 bg-indigo-950/20 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                  <Compass className="w-4 h-4 text-indigo-400" />
                  <span>Struktur Standar Evidence-Based Trading Plan</span>
                </h3>
                <Link
                  href="/analysis/BBCA"
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
                >
                  <span>Lihat Contoh Nyata di /analysis/BBCA</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                    1. Research State
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Klasifikasikan apakah setup saat ini berstatus <strong>Bullish Setup</strong>, <strong>Neutral Setup</strong>, atau <strong>Bearish Setup</strong> tanpa probabilitas semu.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 space-y-1">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                    2. Evidence (Fakta Pendukung)
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Tulis minimal 3 fakta terkonfirmasi: (a) Posisi SMA 20/50, (b) Rasio ROE/NIM, (c) Rilis laporan keuangan audited.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 space-y-1">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                    3. Trigger & Invalidation
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Tentukan batas pasti konfirmasi beli (Trigger breakout) dan batas cut loss tegas (Invalidation breakdown support).
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 space-y-1">
                  <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block">
                    4. Missing Data & Risiko
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Catat informasi yang belum diketahui (misal tanggal rilis laporan triwulan berikutnya atau keputusan suku bunga BI).
                  </p>
                </div>
              </div>
            </div>

            {/* Stage Action Button */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <span className="text-xs text-slate-400">
                Langkah berikutnya: Manajemen Risiko & Kalkulator Position Sizing.
              </span>
              <button
                onClick={() => toggleStageCompletion(5)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  completedStages.includes(5)
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-md shadow-indigo-950/40 hover:opacity-95'
                }`}
              >
                {completedStages.includes(5) ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Batalkan Selesai</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Tandai Tahap 5 Selesai</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          STAGE 6: RISK MANAGEMENT & POSITION SIZING
      ======================================================== */}
      <div
        className={`rounded-2xl border transition-all ${
          isStageLocked(6)
            ? 'border-slate-800/60 bg-slate-950/40 opacity-70'
            : completedStages.includes(6)
            ? 'border-emerald-500/30 bg-slate-900/90 shadow-lg'
            : 'border-slate-800 bg-slate-900/90 shadow-xl'
        }`}
      >
        <div
          onClick={() => (!isStageLocked(6) ? toggleStageOpen(6) : null)}
          className="p-5 flex items-center justify-between cursor-pointer select-none hover:bg-slate-800/30 rounded-2xl transition-colors"
        >
          <div className="flex items-center gap-3.5">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold font-mono text-sm border ${
                isStageLocked(6)
                  ? 'bg-slate-900 border-slate-800 text-slate-600'
                  : completedStages.includes(6)
                  ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400 shadow-md'
                  : 'bg-cyan-950/60 border-cyan-500/30 text-cyan-300'
              }`}
            >
              {isStageLocked(6) ? <Lock className="w-4 h-4" /> : completedStages.includes(6) ? <Check className="w-5 h-5" /> : '06'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">
                  Tahap 6
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Manajemen Risiko
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Risk Management: Position Sizing, Risk/Reward Ratio & Kalkulator Proteksi Modal
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isStageLocked(6) ? (
              <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                <Lock className="w-3.5 h-3.5" /> Terkunci (Selesaikan Tahap 5)
              </span>
            ) : completedStages.includes(6) ? (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
              </span>
            ) : null}
            {openStages[6] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </div>
        </div>

        {openStages[6] && !isStageLocked(6) && (
          <div className="p-5 pt-0 border-t border-slate-800/80 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {/* Position Sizing Rule */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-2.5">
                <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                  <Calculator className="w-4 h-4" /> Rumus Baku Position Sizing
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Jangan pernah mempertaruhkan lebih dari <strong>1% s.d. 2% total portofolio</strong> pada satu transaksi. Hitung kuantitas lot menggunakan rumus:
                </p>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-cyan-300">
                  Jumlah Lembar = Toleransi Risiko (Rp) / (Harga Beli - Harga Stop Loss)
                </div>
                <p className="text-[11px] text-slate-400">
                  Contoh: Modal Rp 50.000.000, toleransi risiko 1% = Rp 500.000. Beli BBCA di Rp 10.250 dengan Stop Loss di Rp 9.950 (Jarak risiko = Rp 300/lembar). Kuantitas maksimal = 500.000 / 300 = 1.666 lembar (~16 Lot).
                </p>
              </div>

              {/* R:R Ratio Card */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-2.5">
                <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> Minimum Risk/Reward Ratio (1:2 atau 1:3)
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Hanya ambil transaksi jika potensi keuntungan (Reward) minimal 2 hingga 3 kali lipat lebih besar dibanding potensi kerugian (Risk).
                </p>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Target Potensi Profit (Reward):</span>
                    <strong className="text-emerald-400">+Rp 600 s.d. +Rp 900 / lembar</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Maksimum Toleransi Stop Loss (Risk):</span>
                    <strong className="text-rose-400">-Rp 300 / lembar</strong>
                  </div>
                </div>
                <Link
                  href="/tools"
                  className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold pt-1"
                >
                  <span>Buka Interactive Calculator di /tools</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Stage Action Button */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <span className="text-xs text-slate-400">
                Langkah berikutnya: Modul Strategi Jangka Sangat Pendek (High-Risk).
              </span>
              <button
                onClick={() => toggleStageCompletion(6)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  completedStages.includes(6)
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-950/40 hover:opacity-95'
                }`}
              >
                {completedStages.includes(6) ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Batalkan Selesai</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Tandai Tahap 6 Selesai</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          STAGE 7: TRADING JANGKA SANGAT PENDEK (HIGH-RISK)
      ======================================================== */}
      <div
        className={`rounded-2xl border transition-all ${
          isStageLocked(7)
            ? 'border-slate-800/60 bg-slate-950/40 opacity-70'
            : completedStages.includes(7)
            ? 'border-emerald-500/30 bg-slate-900/90 shadow-lg'
            : 'border-rose-500/30 bg-slate-900/90 shadow-2xl'
        }`}
      >
        <div
          onClick={() => (!isStageLocked(7) ? toggleStageOpen(7) : null)}
          className="p-5 flex items-center justify-between cursor-pointer select-none hover:bg-slate-800/30 rounded-2xl transition-colors"
        >
          <div className="flex items-center gap-3.5">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold font-mono text-sm border ${
                isStageLocked(7)
                  ? 'bg-slate-900 border-slate-800 text-slate-600'
                  : completedStages.includes(7)
                  ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400 shadow-md'
                  : 'bg-rose-950/60 border-rose-500/40 text-rose-300'
              }`}
            >
              {isStageLocked(7) ? <Lock className="w-4 h-4" /> : completedStages.includes(7) ? <Check className="w-5 h-5" /> : '07'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider font-mono">
                  Tahap 7
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-500/40 uppercase">
                  Tinggi Risiko (High-Risk)
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Trading Jangka Sangat Pendek: Beli Pagi Jual Sore (Intraday) & Beli Sore Jual Pagi (BSJP)
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isStageLocked(7) ? (
              <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                <Lock className="w-3.5 h-3.5" /> Terkunci (Selesaikan Tahap 6)
              </span>
            ) : completedStages.includes(7) ? (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
              </span>
            ) : null}
            {openStages[7] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </div>
        </div>

        {openStages[7] && !isStageLocked(7) && (
          <div className="p-5 pt-0 border-t border-slate-800/80 space-y-6">
            {/* Dedicated High-Risk Warning Banner */}
            <div className="rounded-2xl border-2 border-rose-500/40 bg-gradient-to-br from-rose-950/40 via-slate-900 to-slate-900 p-4 space-y-2 mt-4 shadow-xl">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                <ShieldAlert className="w-5 h-5 shrink-0" />
                <span>Peringatan Risiko Tinggi Ekstrem — Khusus Praktisi Berpengalaman</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                Perdagangan saham jangka sangat pendek (Intraday & Overnight) memiliki risiko kerugian modal yang jauh lebih tinggi dibanding investasi reguler karena kecepatan fluktuasi harga, risiko slippage, dan beban biaya komisi broker yang berulang.
              </p>
              <div className="text-[11px] font-semibold text-rose-300 bg-rose-950/60 p-2.5 rounded-lg border border-rose-500/30">
                ⚠️ <strong>Syarat Prasyarat:</strong> Modul ini hanya disarankan untuk dipelajari jika Anda telah memahami tuntas Tahap 0 sampai Tahap 6 dan disiplin menerapkan cut loss tanpa kompromi.
              </div>
            </div>

            {/* Sub-Module A: Beli Pagi Jual Sore (Intraday) */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 font-bold text-xs font-mono">
                    7A
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Modul 1: "Beli Pagi Jual Sore" (Day Trading / Intraday)
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Durasi &lt; 7 Jam
                </span>
              </div>

              {/* Trading Sessions BEI */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3 space-y-1">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                    Sesi 1 (Pagi)
                  </span>
                  <div className="font-mono font-bold text-white">09:00 — 11:30 WIB</div>
                  <p className="text-[11px] text-slate-400">
                    Volatilitas tertinggi berada di menit 09:00 - 09:30 saat order matching pembukaan bursa.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3 space-y-1">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">
                    Sesi 2 (Siang)
                  </span>
                  <div className="font-mono font-bold text-white">13:30 — 15:49 WIB</div>
                  <p className="text-[11px] text-slate-400">
                    Sesi penentuan tren lanjutan dan persiapan penutupan harian bursa.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-3 space-y-1">
                  <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider block">
                    Pre-Closing & Post-Trading
                  </span>
                  <div className="font-mono font-bold text-white">15:50 — 16:15 WIB</div>
                  <p className="text-[11px] text-slate-400">
                    Pembentukan harga penutupan resmi (Closing Price) dan transaksi negosiasi/tunai.
                  </p>
                </div>
              </div>

              {/* Interactive Break-Even Calculator for Intraday */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/90 p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Calculator className="w-4 h-4" /> Kalkulator Break-Even Point (BEP) Setelah Fee Broker
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono">
                    Fee Beli: {intradayBuyFeePercent}% | Fee Jual: {intradaySellFeePercent}%
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Harga Beli (Rp):</label>
                    <input
                      type="number"
                      value={intradayBuyPrice}
                      onChange={(e) => setIntradayBuyPrice(Number(e.target.value) || 1)}
                      className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-1.5 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Jumlah Lot:</label>
                    <input
                      type="number"
                      value={intradayLotCount}
                      onChange={(e) => setIntradayLotCount(Number(e.target.value) || 1)}
                      className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-1.5 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Fee Beli (%):</label>
                    <input
                      type="number"
                      step="0.01"
                      value={intradayBuyFeePercent}
                      onChange={(e) => setIntradayBuyFeePercent(Number(e.target.value) || 0)}
                      className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-1.5 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Fee Jual (%):</label>
                    <input
                      type="number"
                      step="0.01"
                      value={intradaySellFeePercent}
                      onChange={(e) => setIntradaySellFeePercent(Number(e.target.value) || 0)}
                      className="w-full rounded-lg bg-slate-950 border border-slate-700 px-3 py-1.5 text-white font-mono"
                    />
                  </div>
                </div>

                <div className="rounded-lg bg-slate-950 p-3 border border-slate-800 font-mono text-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 font-sans block">Total Modal Pembelian:</span>
                    <strong className="text-white">Rp {intradayCalculation.totalCapital.toLocaleString('id-ID')}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-sans block">Harga Jual Minimal (BEP):</span>
                    <strong className="text-emerald-400 text-sm">
                      Rp {intradayCalculation.breakEvenPriceCeil.toLocaleString('id-ID')} (+{intradayCalculation.breakEvenGainPercent}%)
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-sans block">Biaya Gesekan Fee Total:</span>
                    <strong className="text-rose-400">Rp {Math.round(intradayCalculation.feeSpreadCost).toLocaleString('id-ID')}</strong>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 italic">
                  💡 Untuk saham berharga Rp 1.000 (fraksi Rp 5/tick), Anda butuh minimal naik 2 tick (ke Rp 1.010) hanya untuk impas biaya transaksi tanpa untung.
                </p>
              </div>
            </div>

            {/* Sub-Module B: Beli Sore Jual Pagi (BSJP) */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 font-bold text-xs font-mono">
                    7B
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Modul 2: "Beli Sore Jual Pagi" (Overnight Swing / BSJP)
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                  Durasi ~17 Jam (Overnight)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
                <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 space-y-2.5">
                  <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-cyan-400" /> Mekanisme Eksekusi BSJP
                  </h4>
                  <p className="leading-relaxed">
                    1. <strong>Identifikasi Sore (15:40 - 15:49 WIB):</strong> Cari saham dengan volume spike di atas rata-rata harian, ditutup di dekat High harian, dan didukung net buy broker asing/institusi.
                  </p>
                  <p className="leading-relaxed">
                    2. <strong>Eksekusi Beli:</strong> Pasang order beli pada sesi pra-penutupan.
                  </p>
                  <p className="leading-relaxed">
                    3. <strong>Penjualan Pagi (09:00 - 09:15 WIB):</strong> Manfaatkan lonjakan harga pre-opening untuk merealisasikan profit (1% - 3%) dan langsung pasang Stop Loss otomatis jika harga berbalik.
                  </p>
                </div>

                <div className="rounded-xl border border-rose-500/20 bg-rose-950/20 p-4 space-y-2.5">
                  <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-rose-400" /> Risiko Gap-Down Semalam (Overnight Risk)
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    Risiko utama strategi BSJP adalah <strong>Gap-Down Pembukaan</strong> akibat kejadian semalam yang berada di luar kendali trader domestik:
                  </p>
                  <ul className="space-y-1.5 text-[11px] text-slate-300">
                    <li className="flex items-start gap-1.5">
                      <span className="text-rose-400">•</span>
                      <span>Anjloknya indeks Wall Street (Dow Jones, S&P 500, NASDAQ) di malam hari.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-rose-400">•</span>
                      <span>Kejutan rilis inflasi AS / keputusan suku bunga The Fed (FOMC).</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-rose-400">•</span>
                      <span>Berita insidental buruk emiten yang dirilis setelah bursa tutup pukul 16:00 WIB.</span>
                    </li>
                  </ul>
                  <div className="text-[10px] font-mono text-amber-300 pt-1">
                    🛡️ Proteksi Wajib: Jangan alokasikan lebih dari 10% portofolio pada satu posisi BSJP.
                  </div>
                </div>
              </div>
            </div>

            {/* Stage Action Button */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <span className="text-xs text-slate-400">
                Langkah terakhir: Praktik tanpa risiko di Sandbox Paper Trading.
              </span>
              <button
                onClick={() => toggleStageCompletion(7)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  completedStages.includes(7)
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md shadow-rose-950/40 hover:opacity-95'
                }`}
              >
                {completedStages.includes(7) ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Batalkan Selesai</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Tandai Tahap 7 Selesai</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          STAGE 8: PRAKTIK DI SANDBOX
      ======================================================== */}
      <div
        className={`rounded-2xl border transition-all ${
          isStageLocked(8)
            ? 'border-slate-800/60 bg-slate-950/40 opacity-70'
            : completedStages.includes(8)
            ? 'border-emerald-500/30 bg-slate-900/90 shadow-lg'
            : 'border-emerald-500/40 bg-slate-900/90 shadow-2xl'
        }`}
      >
        <div
          onClick={() => (!isStageLocked(8) ? toggleStageOpen(8) : null)}
          className="p-5 flex items-center justify-between cursor-pointer select-none hover:bg-slate-800/30 rounded-2xl transition-colors"
        >
          <div className="flex items-center gap-3.5">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold font-mono text-sm border ${
                isStageLocked(8)
                  ? 'bg-slate-900 border-slate-800 text-slate-600'
                  : completedStages.includes(8)
                  ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400 shadow-md'
                  : 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300'
              }`}
            >
              {isStageLocked(8) ? <Lock className="w-4 h-4" /> : completedStages.includes(8) ? <Check className="w-5 h-5" /> : '08'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
                  Tahap 8
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/40 uppercase">
                  Uji Praktik
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Praktik Nyata: Uji Seluruh Ilmu di Multi-Broker Paper Trading Sandbox
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isStageLocked(8) ? (
              <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-900 px-2.5 py-1 rounded-lg border border-slate-800">
                <Lock className="w-3.5 h-3.5" /> Terkunci (Selesaikan Tahap 7)
              </span>
            ) : completedStages.includes(8) ? (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" /> Kurikulum Selesai 100%
              </span>
            ) : null}
            {openStages[8] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </div>
        </div>

        {openStages[8] && !isStageLocked(8) && (
          <div className="p-5 pt-0 border-t border-slate-800/80 space-y-6">
            <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-slate-900 via-emerald-950/20 to-slate-900 p-5 space-y-4 pt-4 mt-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-400" />
                    <span>Selamat! Anda Telah Menyelesaikan Fondasi Teori Lengkap</span>
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                    Kini saatnya melatih disiplin eksekusi tanpa risiko uang riil. Gunakan fasilitas <strong>Multi-Broker Portfolio Sandbox</strong> StockAI untuk mensimulasikan order beli/jual, memantau floating P/L, dan mengevaluasi trading plan Anda.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                    1. Paper Trading Tanpa Risiko
                  </span>
                  <p className="text-[11px] text-slate-300">
                    Modal virtual simulasi untuk mencoba setup teknikal & fundamental.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 space-y-1">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
                    2. Multi-Broker Switcher
                  </span>
                  <p className="text-[11px] text-slate-300">
                    Beralih antara akun simulasi Stockbit, Ajaib, IPOT, BIONS, atau MOST.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3 space-y-1">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">
                    3. Evaluasi Disiplin Plan
                  </span>
                  <p className="text-[11px] text-slate-300">
                    Uji apakah rasio Risk/Reward dan batas Invalidation dipatuhi.
                  </p>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <Link
                  href="/portfolio"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold shadow-lg shadow-emerald-950/50 hover:opacity-95 flex items-center gap-2"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Buka Portfolio Sandbox Sekarang &rarr;</span>
                </Link>

                <Link
                  href="/screener"
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
                >
                  <Search className="w-4 h-4 text-cyan-400" />
                  <span>Cari Saham Potensial di Screener</span>
                </Link>
              </div>
            </div>

            {/* Stage Action Button */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <span className="text-xs text-slate-400">
                Tandai kelulusan kurikulum lengkap StockAI.
              </span>
              <button
                onClick={() => toggleStageCompletion(8)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  completedStages.includes(8)
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-950/40 hover:opacity-95'
                }`}
              >
                {completedStages.includes(8) ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Batalkan Selesai</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Tandai Tahap 8 Selesai (100%)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
