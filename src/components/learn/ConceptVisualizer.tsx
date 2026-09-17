'use client';

import React, { useState } from 'react';
import { formatIDR, formatPercent } from '@/lib/utils';
import { Shield, Target, TrendingUp, DollarSign, Layers, ArrowRight, ArrowLeft } from 'lucide-react';

interface ConceptVisualizerProps {
  type: 'bid_offer' | 'support_resistance' | 'candlestick' | 'per_ratio' | 'risk_reward' | 'dividend' | 'general';
}

export function ConceptVisualizer({ type }: ConceptVisualizerProps) {
  // Interactive state for Risk Reward
  const [entryPrice, setEntryPrice] = useState(10000);
  const [stopLossPrice, setStopLossPrice] = useState(9500);
  const [targetPrice, setTargetPrice] = useState(11250);

  // Interactive state for PER
  const [stockPrice, setStockPrice] = useState(6650);
  const [eps, setEps] = useState(593);

  // Interactive state for Dividend
  const [divSharePrice, setDivSharePrice] = useState(5000);
  const [dividendPerShare, setDividendPerShare] = useState(300);

  if (type === 'bid_offer') {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-3 font-mono">
        <div className="flex items-center justify-between font-sans text-xs font-semibold text-slate-400 border-b border-slate-800 pb-2">
          <span className="text-emerald-400">BID (Antrean Beli)</span>
          <span className="text-slate-400">SPREAD: Rp 25</span>
          <span className="text-rose-400">OFFER (Antrean Jual)</span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          {/* Bid Column */}
          <div className="space-y-1">
            <div className="flex justify-between p-1.5 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
              <span>Rp 10.225 (Best Bid)</span>
              <span className="font-bold">14.250 Lot</span>
            </div>
            <div className="flex justify-between p-1.5 rounded bg-emerald-950/20 text-slate-300">
              <span>Rp 10.200</span>
              <span>28.100 Lot</span>
            </div>
            <div className="flex justify-between p-1.5 rounded bg-emerald-950/10 text-slate-400">
              <span>Rp 10.175</span>
              <span>45.000 Lot</span>
            </div>
          </div>

          {/* Offer Column */}
          <div className="space-y-1">
            <div className="flex justify-between p-1.5 rounded bg-rose-950/40 border border-rose-500/30 text-rose-300">
              <span className="font-bold">8.420 Lot</span>
              <span>Rp 10.250 (Best Offer)</span>
            </div>
            <div className="flex justify-between p-1.5 rounded bg-rose-950/20 text-slate-300">
              <span>18.600 Lot</span>
              <span>Rp 10.275</span>
            </div>
            <div className="flex justify-between p-1.5 rounded bg-rose-950/10 text-slate-400">
              <span>32.400 Lot</span>
              <span>Rp 10.300</span>
            </div>
          </div>
        </div>

        <div className="text-[11px] font-sans text-slate-400 text-center pt-2 border-t border-slate-800/80">
          💡 Pembeli yang melakukan <strong>HAKA (Hajar Kanan)</strong> langsung membeli di Rp 10.250. Penjual yang <strong>HAKI</strong> langsung menjual di Rp 10.225.
        </div>
      </div>
    );
  }

  if (type === 'risk_reward') {
    const riskAmount = Math.max(0, entryPrice - stopLossPrice);
    const rewardAmount = Math.max(0, targetPrice - entryPrice);
    const riskPercent = (riskAmount / entryPrice) * 100;
    const rewardPercent = (rewardAmount / entryPrice) * 100;
    const rrrRatio = riskAmount > 0 ? (rewardAmount / riskAmount).toFixed(2) : '0';

    return (
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-4 font-mono">
        <div className="flex items-center justify-between font-sans text-xs font-semibold text-white border-b border-slate-800 pb-2">
          <span>Simulasi Interaktif Risk-to-Reward Ratio (RRR)</span>
          <span className="text-cyan-400">RRR = 1 : {rrrRatio}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans">
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Harga Beli (Entry):</label>
            <input
              type="number"
              value={entryPrice}
              onChange={(e) => setEntryPrice(Number(e.target.value))}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 p-2 text-white font-mono"
            />
          </div>
          <div>
            <label className="text-[11px] text-rose-400 block mb-1">Stop Loss (Batas Rugi):</label>
            <input
              type="number"
              value={stopLossPrice}
              onChange={(e) => setStopLossPrice(Number(e.target.value))}
              className="w-full rounded-lg bg-slate-900 border border-rose-500/40 p-2 text-rose-300 font-mono"
            />
          </div>
          <div>
            <label className="text-[11px] text-emerald-400 block mb-1">Target Profit (TP):</label>
            <input
              type="number"
              value={targetPrice}
              onChange={(e) => setTargetPrice(Number(e.target.value))}
              className="w-full rounded-lg bg-slate-900 border border-emerald-500/40 p-2 text-emerald-300 font-mono"
            />
          </div>
        </div>

        {/* Visual Box Comparison */}
        <div className="grid grid-cols-2 gap-3 pt-2 text-center text-xs">
          <div className="rounded-lg bg-rose-950/30 border border-rose-500/30 p-2.5">
            <span className="text-rose-400 font-sans block text-[11px]">Risiko Potensi Rugi (Risk)</span>
            <span className="font-bold text-rose-300">{formatIDR(riskAmount)} (-{riskPercent.toFixed(1)}%)</span>
          </div>
          <div className="rounded-lg bg-emerald-950/30 border border-emerald-500/30 p-2.5">
            <span className="text-emerald-400 font-sans block text-[11px]">Potensi Cuan (Reward)</span>
            <span className="font-bold text-emerald-300">{formatIDR(rewardAmount)} (+{rewardPercent.toFixed(1)}%)</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'per_ratio') {
    const computedPER = eps > 0 ? (stockPrice / eps).toFixed(1) : '-';

    return (
      <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-4 font-mono">
        <div className="flex items-center justify-between font-sans text-xs font-semibold text-white border-b border-slate-800 pb-2">
          <span>Kalkulator & Visualisasi PER (Price to Earnings)</span>
          <span className="text-cyan-400 font-bold">PER = {computedPER}x</span>
        </div>

        <div className="grid grid-cols-2 gap-3 font-sans text-xs">
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Harga Saham per Lembar (P):</label>
            <input
              type="number"
              value={stockPrice}
              onChange={(e) => setStockPrice(Number(e.target.value))}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 p-2 text-white font-mono"
            />
          </div>
          <div>
            <label className="text-[11px] text-slate-400 block mb-1">Laba Bersih per Lembar (EPS):</label>
            <input
              type="number"
              value={eps}
              onChange={(e) => setEps(Number(e.target.value))}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 p-2 text-white font-mono"
            />
          </div>
        </div>

        <div className="rounded-lg bg-slate-900 p-3 text-xs font-sans text-slate-300 space-y-1">
          <div>
            Rumus: <strong>PER = Harga Saham ÷ EPS = {formatIDR(stockPrice, false)} ÷ {formatIDR(eps, false)} = {computedPER}x</strong>
          </div>
          <div className="text-[11px] text-slate-400">
            Artinya: Kamu membayar Rp {computedPER} untuk setiap Rp 1 laba bersih yang dihasilkan emiten tersebut per tahun.
          </div>
        </div>
      </div>
    );
  }

  // Default general visualizer
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4 text-center text-xs text-slate-400 font-sans">
      <Layers className="w-6 h-6 mx-auto text-cyan-400 mb-2" />
      <span>Visualisasi konsep interaktif aktif untuk memperjelas pemahaman materi.</span>
    </div>
  );
}
