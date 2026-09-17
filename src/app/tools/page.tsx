'use client';

import React, { useState } from 'react';
import { formatIDR, formatPercent } from '@/lib/utils';
import { DisclaimerBanner } from '@/components/common/DisclaimerBanner';
import { Compass, Calculator, Target, Shield, Coins, TrendingUp } from 'lucide-react';

export default function ToolsPage() {
  // Position Sizing Calculator state
  const [totalCapital, setTotalCapital] = useState<number>(100000000); // 100 Jt
  const [maxRiskPercent, setMaxRiskPercent] = useState<number>(2); // 2% risk
  const [buyPrice, setBuyPrice] = useState<number>(5000);
  const [stopLoss, setStopLoss] = useState<number>(4750);
  const [takeProfit, setTakeProfit] = useState<number>(5600);

  // Calculations
  const maxRiskIDR = (totalCapital * maxRiskPercent) / 100;
  const riskPerShare = Math.max(1, buyPrice - stopLoss);
  const rewardPerShare = Math.max(0, takeProfit - buyPrice);
  const allowedShares = Math.floor(maxRiskIDR / riskPerShare);
  const allowedLots = Math.floor(allowedShares / 100);
  const totalPurchaseIDR = allowedLots * 100 * buyPrice;
  const totalPotentialLoss = allowedLots * 100 * riskPerShare;
  const totalPotentialProfit = allowedLots * 100 * rewardPerShare;
  const rrr = riskPerShare > 0 ? (rewardPerShare / riskPerShare).toFixed(2) : '0';

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 rounded-md bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold text-cyan-400 border border-cyan-500/20 mb-2">
          <Compass className="w-3.5 h-3.5" />
          <span>Kalkulator Finansial & Position Sizing</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
          Alat Manajemen Risiko & Trading Calculator
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Hitung alokasi lot maksimal dan rasio Risk/Reward agar modal trading terlindungi dari risiko kebangkrutan.
        </p>
      </div>

      <DisclaimerBanner mode="compact" />

      {/* Main Position Sizing Calculator */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-md space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h2 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Calculator className="w-5 h-5 text-cyan-400" /> Kalkulator Ukuran Posisi (Position Sizing)
          </h2>
          <span className="text-xs text-slate-400 font-mono">Formula: 2% Capital Rule</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Parameters */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Total Modal Akun (IDR):
              </label>
              <input
                type="number"
                value={totalCapital}
                onChange={(e) => setTotalCapital(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white font-mono"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                <span>Toleransi Risiko Maksimal per Transaksi:</span>
                <span className="text-rose-400 font-mono">{maxRiskPercent}% ({formatIDR(maxRiskIDR)})</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={maxRiskPercent}
                onChange={(e) => setMaxRiskPercent(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Harga Beli:
                </label>
                <input
                  type="number"
                  value={buyPrice}
                  onChange={(e) => setBuyPrice(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-rose-400 block mb-1">
                  Stop Loss:
                </label>
                <input
                  type="number"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(Number(e.target.value))}
                  className="w-full rounded-xl border border-rose-500/40 bg-slate-950 px-3 py-2 text-xs text-rose-300 font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-emerald-400 block mb-1">
                  Take Profit:
                </label>
                <input
                  type="number"
                  value={takeProfit}
                  onChange={(e) => setTakeProfit(Number(e.target.value))}
                  className="w-full rounded-xl border border-emerald-500/40 bg-slate-950 px-3 py-2 text-xs text-emerald-300 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Calculated Output Box */}
          <div className="rounded-2xl border border-indigo-500/30 bg-slate-950/80 p-5 space-y-4 font-mono">
            <span className="text-xs font-bold text-indigo-400 font-sans uppercase tracking-wider block">
              Hasil Rekomendasi Manajemen Risiko
            </span>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-3">
                <span className="text-slate-400 font-sans block text-[10px]">Alokasi Maksimal</span>
                <span className="text-xl font-bold text-cyan-400">{allowedLots} Lot</span>
                <span className="text-[10px] text-slate-500 font-sans block">({(allowedLots * 100).toLocaleString('id-ID')} Lembar)</span>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-900 p-3">
                <span className="text-slate-400 font-sans block text-[10px]">Total Modal Digunakan</span>
                <span className="text-base font-bold text-white">{formatIDR(totalPurchaseIDR)}</span>
                <span className="text-[10px] text-slate-400 font-sans block">
                  ({((totalPurchaseIDR / totalCapital) * 100).toFixed(1)}% dari portofolio)
                </span>
              </div>

              <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-3">
                <span className="text-rose-400 font-sans block text-[10px]">Potensi Risiko Rugi (Risk)</span>
                <span className="text-base font-bold text-rose-300">-{formatIDR(totalPotentialLoss)}</span>
                <span className="text-[10px] text-rose-400 font-sans block">
                  (-{(((buyPrice - stopLoss) / buyPrice) * 100).toFixed(1)}%)
                </span>
              </div>

              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3">
                <span className="text-emerald-400 font-sans block text-[10px]">Potensi Keuntungan (Reward)</span>
                <span className="text-base font-bold text-emerald-300">+{formatIDR(totalPotentialProfit)}</span>
                <span className="text-[10px] text-emerald-400 font-sans block">
                  (+{(((takeProfit - buyPrice) / buyPrice) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-indigo-500/20 bg-indigo-950/30 p-3 flex justify-between items-center text-xs font-sans">
              <span>Risk to Reward Ratio (RRR):</span>
              <span className="font-bold text-indigo-300 font-mono text-sm">1 : {rrr}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
