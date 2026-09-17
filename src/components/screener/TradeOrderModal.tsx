'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { GlobalInstrument } from '@/lib/globalTypes';
import { formatCurrencyPrice, COUNTRY_FLAGS } from '@/lib/currency';
import {
  Zap,
  X,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Layers,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';

interface TradeOrderModalProps {
  instrument: GlobalInstrument | null;
  onClose: () => void;
}

const AVAILABLE_TRADING_BROKERS = [
  {
    id: 'ibkr',
    name: 'Interactive Brokers (IBKR)',
    status: 'Connected (Demo Sandbox)',
    supportsMarket: true,
    currency: 'USD',
  },
  {
    id: 'alpaca',
    name: 'Alpaca Markets',
    status: 'Connected (Paper Trading)',
    supportsMarket: true,
    currency: 'USD',
  },
  {
    id: 'most',
    name: 'Mandiri Sekuritas (MOST)',
    status: 'Connected (Token Sandbox)',
    supportsMarket: true,
    currency: 'IDR',
  },
  {
    id: 'saxo',
    name: 'Saxo Bank',
    status: 'Available to Connect',
    supportsMarket: false,
    currency: 'USD',
  },
];

export function TradeOrderModal({ instrument, onClose }: TradeOrderModalProps) {
  const [selectedBroker, setSelectedBroker] = useState(AVAILABLE_TRADING_BROKERS[0].id);
  const [orderSide, setOrderSide] = useState<'BUY' | 'SELL'>('BUY');
  const [orderType, setOrderType] = useState<'LIMIT' | 'MARKET'>('LIMIT');
  const [quantity, setQuantity] = useState(10);
  const [orderPreviewSuccess, setOrderPreviewSuccess] = useState(false);

  if (!instrument) return null;

  const currentBroker = AVAILABLE_TRADING_BROKERS.find((b) => b.id === selectedBroker);
  const isConnected = currentBroker?.status.includes('Connected');

  const estimatedTotal = (instrument.price * quantity);

  const handleSimulateOrderPreview = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPreviewSuccess(true);
    setTimeout(() => {
      setOrderPreviewSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl p-6 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <h3 className="font-bold text-sm text-white">
              Order Routing Preview (Mock): {instrument.symbol}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Instrument Summary */}
        <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-800 bg-slate-950/70 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">{COUNTRY_FLAGS[instrument.countryCode] || '🌐'}</span>
            <div>
              <div className="font-bold text-white font-mono">{instrument.symbol}</div>
              <div className="text-[11px] text-slate-400 truncate max-w-[200px]">{instrument.companyName}</div>
            </div>
          </div>
          <div className="text-right font-mono">
            <div className="font-bold text-white text-sm">
              {formatCurrencyPrice(instrument.price, instrument.currency)}
            </div>
            <div className="text-[10px] text-slate-400 font-sans">{instrument.exchange} • {instrument.assetType}</div>
          </div>
        </div>

        {/* Broker Selection Panel */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300 block">
            Pilih Trading Broker:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {AVAILABLE_TRADING_BROKERS.map((broker) => {
              const isSelected = selectedBroker === broker.id;
              return (
                <button
                  key={broker.id}
                  type="button"
                  onClick={() => setSelectedBroker(broker.id)}
                  className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                    isSelected
                      ? 'border-cyan-500/60 bg-cyan-950/30 text-white font-bold'
                      : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="truncate font-sans">{broker.name}</div>
                  <div className="text-[10px] text-slate-400 font-mono font-normal">
                    {broker.status}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Order Form or Connect Warning */}
        {isConnected ? (
          <form onSubmit={handleSimulateOrderPreview} className="space-y-3 pt-1 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 text-[11px] block mb-1">Aksi Order:</label>
                <div className="grid grid-cols-2 gap-1 rounded-lg bg-slate-950 p-1 border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setOrderSide('BUY')}
                    className={`py-1 rounded font-bold transition-colors ${
                      orderSide === 'BUY' ? 'bg-emerald-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    Beli (BUY)
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderSide('SELL')}
                    className={`py-1 rounded font-bold transition-colors ${
                      orderSide === 'SELL' ? 'bg-rose-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    Jual (SELL)
                  </button>
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-[11px] block mb-1">Tipe Order:</label>
                <select
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value as 'LIMIT' | 'MARKET')}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs text-white focus:outline-none"
                >
                  <option value="LIMIT">Limit Order</option>
                  <option value="MARKET">Market Order</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-slate-400 text-[11px] block mb-1">
                  Jumlah ({instrument.countryCode === 'ID' ? 'Lot' : 'Lembar / Shares'}):
                </label>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-slate-400 text-[11px] block mb-1">Estimasi Nilai:</label>
                <div className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1.5 font-bold font-mono text-cyan-300">
                  {formatCurrencyPrice(estimatedTotal, instrument.currency)}
                </div>
              </div>
            </div>

            {/* Architecture Warning */}
            <div className="flex items-start gap-2 rounded-xl bg-slate-950/80 border border-slate-800 p-2.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                <strong>Zero-Custody Simulation:</strong> Order preview ini adalah simulasi arsitektur routing broker. Tidak ada transaksi live yang dikirim pada mode MVP ini.
              </span>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 font-medium hover:text-white"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={orderPreviewSuccess}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 text-white font-bold hover:bg-cyan-500 transition-colors disabled:opacity-75"
              >
                {orderPreviewSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>Order Preview Valid!</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Validasi Order Routing</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="p-4 rounded-xl border border-dashed border-slate-800 bg-slate-950/40 text-center space-y-3">
            <AlertTriangle className="w-6 h-6 text-amber-400 mx-auto" />
            <div className="space-y-1">
              <div className="text-xs font-bold text-white">Broker Belum Terhubung</div>
              <p className="text-[11px] text-slate-400">
                Akun {currentBroker?.name} belum terautentikasi. Silakan hubungkan akun Anda di Connection Center.
              </p>
            </div>
            <Link
              href="/brokers"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 text-xs font-bold text-white hover:bg-indigo-500"
            >
              <span>Hubungkan Broker</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
