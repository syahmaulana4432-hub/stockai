'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MOCK_BROKER_PROVIDERS,
  MOCK_BROKER_ACCOUNTS,
  BrokerProviderMeta,
  BrokerAccount,
} from '@/lib/brokerTypes';
import { COUNTRY_FLAGS, formatCurrencyPrice } from '@/lib/currency';
import { DisclaimerBanner } from '@/components/common/DisclaimerBanner';
import {
  ShieldCheck,
  Zap,
  Layers,
  ArrowRight,
  CheckCircle2,
  Lock,
  RefreshCw,
  ExternalLink,
  PlusCircle,
  Database,
  SlidersHorizontal,
  Workflow,
  KeyRound,
  FileCheck2,
} from 'lucide-react';

export default function BrokersPage() {
  const [providers] = useState<BrokerProviderMeta[]>(MOCK_BROKER_PROVIDERS);
  const [accounts, setAccounts] = useState<BrokerAccount[]>(MOCK_BROKER_ACCOUNTS);
  const [selectedFilterCountry, setSelectedFilterCountry] = useState<string>('ALL');
  const [connectingBrokerId, setConnectingBrokerId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredProviders = providers.filter((p) => {
    if (selectedFilterCountry === 'ALL') return true;
    if (selectedFilterCountry === 'GLOBAL') return p.country === 'GLOBAL';
    return p.country === selectedFilterCountry;
  });

  const handleConnectSimulate = (provider: BrokerProviderMeta) => {
    setConnectingBrokerId(provider.id);
    setTimeout(() => {
      setConnectingBrokerId(null);
      // Toggle or connect
      const exists = accounts.find((a) => a.brokerId === provider.id);
      if (!exists) {
        const newAcc: BrokerAccount = {
          accountId: `acc-${provider.id}-demo`,
          accountName: `${provider.name} Live Sandbox`,
          brokerId: provider.id,
          brokerName: provider.name,
          currency: provider.country === 'ID' ? 'IDR' : 'USD',
          totalEquity: provider.country === 'ID' ? 150000000 : 25000,
          cashBalance: provider.country === 'ID' ? 45000000 : 8500,
          buyingPower: provider.country === 'ID' ? 45000000 : 17000,
          status: 'CONNECTED',
          isPaperTrading: false,
          lastSyncedAt: new Date().toISOString(),
        };
        setAccounts((prev) => [...prev, newAcc]);
        setToastMessage(`✓ Berhasil menghubungkan akun ${provider.name} (OAuth 2.0 Mock)!`);
      } else {
        setToastMessage(`Akun ${provider.name} sudah terhubung.`);
      }
      setTimeout(() => setToastMessage(null), 3500);
    }, 1000);
  };

  const handleDisconnect = (accountId: string, brokerName: string) => {
    setAccounts((prev) => prev.filter((a) => a.accountId !== accountId));
    setToastMessage(`Koneksi ${brokerName} berhasil diputus.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
              Multi-Broker Architecture
            </span>
            <span className="text-xs font-mono text-slate-400">Open Broker Adapter v1.0</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2.5">
            <Layers className="w-7 h-7 text-indigo-400" />
            <span>Broker Connection Center</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Hubungkan akun sekuritas dan broker global Anda untuk sinkronisasi portfolio, order routing terpadu, dan analisa multi-market tanpa berganti platform.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/screener"
            className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <span>Buka Screener</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/portfolio"
            className="flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
          >
            <span>Lihat Portfolio</span>
          </Link>
        </div>
      </div>

      <DisclaimerBanner mode="compact" />

      {/* Toast alert */}
      {toastMessage && (
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/80 p-3 text-xs font-semibold text-emerald-300 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* 1. Connected Accounts Overview */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Akun Terhubung ({accounts.length})
          </h2>
          <span className="text-xs text-slate-400">Sinkronisasi otomatis aktif</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {accounts.map((acc) => (
            <div
              key={acc.accountId}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 space-y-4 hover:border-slate-700 transition-all shadow-xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    {acc.isPaperTrading ? 'Paper Trading' : 'Connected Live'}
                  </span>
                  <h3 className="font-bold text-white text-sm mt-1.5">{acc.brokerName}</h3>
                  <div className="text-[11px] font-mono text-slate-400">{acc.accountName}</div>
                </div>
                <button
                  onClick={() => handleDisconnect(acc.accountId, acc.brokerName)}
                  className="text-[11px] text-slate-500 hover:text-rose-400 transition-colors"
                >
                  Putus
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-xs">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Total Equity</div>
                  <div className="font-bold text-white font-mono">
                    {formatCurrencyPrice(acc.totalEquity, acc.currency)}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Cash Balance</div>
                  <div className="font-bold text-emerald-400 font-mono">
                    {formatCurrencyPrice(acc.cashBalance, acc.currency)}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <RefreshCw className="w-3 h-3 text-cyan-400" /> Synced 2m ago
                </span>
                <Link
                  href="/portfolio"
                  className="text-cyan-400 hover:underline font-semibold flex items-center gap-0.5"
                >
                  Detail Portfolio →
                </Link>
              </div>
            </div>
          ))}

          {accounts.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-8 text-center text-xs text-slate-400">
              Belum ada broker terhubung. Pilih broker dari katalog di bawah untuk menghubungkan akun.
            </div>
          )}
        </div>
      </div>

      {/* 2. Supported Brokers Catalog */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-400" /> Katalog Integrasi Broker Global & Domestik
            </h2>
            <p className="text-xs text-slate-400">
              Arsitektur adapter multi-broker siap untuk OAuth 2.0, REST, & Webhook API
            </p>
          </div>

          {/* Country filter tabs */}
          <div className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-950 p-1 text-xs">
            <button
              onClick={() => setSelectedFilterCountry('ALL')}
              className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
                selectedFilterCountry === 'ALL' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Semua ({providers.length})
            </button>
            <button
              onClick={() => setSelectedFilterCountry('ID')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors font-medium ${
                selectedFilterCountry === 'ID' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🇮🇩 Indonesia</span>
            </button>
            <button
              onClick={() => setSelectedFilterCountry('US')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors font-medium ${
                selectedFilterCountry === 'US' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🇺🇸 United States</span>
            </button>
            <button
              onClick={() => setSelectedFilterCountry('GLOBAL')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors font-medium ${
                selectedFilterCountry === 'GLOBAL' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🌐 Global</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProviders.map((provider) => {
            const isConnected = accounts.some((a) => a.brokerId === provider.id);
            const isConnecting = connectingBrokerId === provider.id;

            return (
              <div
                key={provider.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-base">{COUNTRY_FLAGS[provider.country] || '🌐'}</span>
                        <h3 className="font-bold text-white text-sm">{provider.name}</h3>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">{provider.description}</div>
                    </div>
                  </div>

                  {/* Capabilities Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {provider.capabilities.supportsPortfolioSync && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-500/20">
                        Portfolio Sync
                      </span>
                    )}
                    {provider.capabilities.supportsTradingAPI && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/40 text-cyan-300 border border-cyan-500/20">
                        Trading API
                      </span>
                    )}
                    {provider.capabilities.supportsPaperTrading && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-purple-950/40 text-purple-300 border border-purple-500/20">
                        Paper Trading
                      </span>
                    )}
                    {provider.capabilities.supportsMarketData && (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        Market Data
                      </span>
                    )}
                  </div>

                  {/* Supported Exchanges */}
                  <div className="text-[11px] text-slate-400">
                    <span className="text-slate-500">Bursa: </span>
                    <span className="font-mono text-slate-300">{provider.supportedExchanges.join(', ')}</span>
                  </div>
                </div>

                {/* Connect Action Button */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-[10px] font-mono text-slate-500">
                    Auth: {provider.authType}
                  </span>

                  {isConnected ? (
                    <span className="flex items-center gap-1 font-semibold text-emerald-400 text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Terhubung
                    </span>
                  ) : (
                    <button
                      type="button"
                      disabled={isConnecting}
                      onClick={() => handleConnectSimulate(provider)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white font-semibold transition-colors disabled:opacity-50"
                    >
                      {isConnecting ? (
                        <>
                          <RefreshCw className="w-3 h-3 animate-spin" /> Menghubungkan...
                        </>
                      ) : (
                        <>
                          <PlusCircle className="w-3 h-3" /> Hubungkan
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Multi-Broker & Multi-Market Architectural Diagram & Highlights */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 space-y-6">
        <div className="flex items-center gap-2">
          <Workflow className="w-5 h-5 text-indigo-400" />
          <h2 className="text-base font-bold text-white">
            Arsitektur Open Broker & Multi-Market Engine
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-slate-300">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-2">
            <div className="flex items-center gap-2 font-bold text-white">
              <KeyRound className="w-4 h-4 text-cyan-400" />
              <span>1. Zero-Custody Security</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Kredensial API dienkripsi end-to-end secara terisolasi. StockAI tidak pernah memegang dana tunai Anda dan hanya mengakses data transaksi sesuai izin read-only atau order routing resmi.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-2">
            <div className="flex items-center gap-2 font-bold text-white">
              <Database className="w-4 h-4 text-indigo-400" />
              <span>2. Unified Normalized Portfolio</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Portofolio dari berbagai broker (misal MOST IDX + Interactive Brokers US) diagregasi ke dalam satu tampilan terpadu dengan konversi kurs mata uang otomatis ke USD atau IDR.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-2">
            <div className="flex items-center gap-2 font-bold text-white">
              <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
              <span>3. Seamless Screener-to-Order</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Hasil screening dari 14 strategi global dapat langsung ditautkan ke akun broker target untuk persiapan order preview yang aman dan deterministik.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
