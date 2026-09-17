'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  GlobalInstrument,
  CountryCode,
  ExchangeCode,
  AssetType,
  CurrencyCode,
  ScreenerRule,
  LogicOperator,
  PresetTemplate,
  WhyMatchReport,
  SavedScreen,
} from '@/lib/globalTypes';
import { MOCK_GLOBAL_INSTRUMENTS } from '@/data/mockGlobalStocks';
import { GLOBAL_PRESET_SCREENERS } from '@/data/mockGlobalPresets';
import {
  evaluateInstrument,
  generateWhyMatchReport,
  calculatePipeline,
} from '@/lib/screenerEngine';

// Section Components
import { ScreenerHeader } from '@/components/screener/ScreenerHeader';
import { ScreenerHeroExplainer } from '@/components/screener/ScreenerHeroExplainer';
import { MarketCoveragePanel } from '@/components/screener/MarketCoveragePanel';
import { DataSourcesPanel } from '@/components/screener/DataSourcesPanel';
import { BrokerConnectionsPanel } from '@/components/screener/BrokerConnectionsPanel';
import { GlobalMarketBar } from '@/components/screener/GlobalMarketBar';
import { ScreenerSearch } from '@/components/screener/ScreenerSearch';
import { PresetScreenerBar } from '@/components/screener/PresetScreenerBar';
import { FilterBuilder } from '@/components/screener/FilterBuilder';
import { ActiveFilterChips } from '@/components/screener/ActiveFilterChips';
import { ScreeningPipeline } from '@/components/screener/ScreeningPipeline';
import { ScreenerResultTable } from '@/components/screener/ScreenerResultTable';
import { WhyMatchModal } from '@/components/screener/WhyMatchModal';
import { WatchlistModal } from '@/components/screener/WatchlistModal';
import { TradeOrderModal } from '@/components/screener/TradeOrderModal';
import { SaveScreenModal } from '@/components/screener/SaveScreenModal';
import { DisclaimerBanner } from '@/components/common/DisclaimerBanner';

import { Bookmark, Sparkles, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

export default function ScreenerPage() {
  // 1. Data State (Explicit 24 demo instruments)
  const [instruments] = useState<GlobalInstrument[]>(MOCK_GLOBAL_INSTRUMENTS);

  // 2. Market Scope States
  const [selectedCountry, setSelectedCountry] = useState<CountryCode | 'ALL'>('ALL');
  const [selectedExchange, setSelectedExchange] = useState<ExchangeCode | 'ALL'>('ALL');
  const [selectedAssetType, setSelectedAssetType] = useState<AssetType | 'ALL'>('ALL');
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode | 'ALL'>('ALL');

  // 3. Screener Filter Rules State
  const [activeRules, setActiveRules] = useState<ScreenerRule[]>(GLOBAL_PRESET_SCREENERS[0].rules); // default: Global Value
  const [activeLogic, setActiveLogic] = useState<LogicOperator>('AND');
  const [activePresetId, setActivePresetId] = useState<string | null>('global-value');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('16 Sep 2026, 16:00 UTC+7');
  const [lastScanTime, setLastScanTime] = useState('16 Sep 2026, 16:00:15 WIB');

  // 4. Modal States
  const [selectedWhyMatchReport, setSelectedWhyMatchReport] = useState<WhyMatchReport | null>(null);
  const [selectedWatchlistInstrument, setSelectedWatchlistInstrument] = useState<GlobalInstrument | null>(null);
  const [selectedTradeInstrument, setSelectedTradeInstrument] = useState<GlobalInstrument | null>(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [savedScreens, setSavedScreens] = useState<SavedScreen[]>([]);
  const [executionTimeMs, setExecutionTimeMs] = useState(1.2);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load saved screens from LocalStorage on mount
  useEffect(() => {
    try {
      const savedStr = localStorage.getItem('stockai_saved_screens');
      if (savedStr) {
        setSavedScreens(JSON.parse(savedStr));
      }
    } catch {
      // ignore
    }
  }, []);

  // Handle Refresh simulation
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      const nowStr = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }) + ' UTC+7 (Mock)';
      setLastUpdated(nowStr);
      setLastScanTime(nowStr);
      setToastMessage('✓ Data screener diperbarui (Mock Data Feed)');
      setTimeout(() => setToastMessage(null), 3000);
    }, 450);
  };

  // Run Screener trigger
  const handleRunScreener = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setLastScanTime(new Date().toLocaleTimeString('id-ID') + ' WIB');
      setToastMessage(`✓ Scanning selesai: ${filteredInstruments.length} instrumen cocok.`);
      setTimeout(() => setToastMessage(null), 3000);
    }, 300);
  };

  // Add rule from builder
  const handleAddRule = (newRule: ScreenerRule) => {
    setActiveRules((prev) => [...prev, newRule]);
    setActivePresetId(null);
  };

  // Remove individual rule
  const handleRemoveRule = (id: string) => {
    setActiveRules((prev) => prev.filter((r) => r.id !== id));
    setActivePresetId(null);
  };

  // Clear all rules
  const handleClearAll = () => {
    setActiveRules([]);
    setActivePresetId(null);
  };

  // Select Preset Screener
  const handleSelectPreset = (preset: PresetTemplate) => {
    setActivePresetId(preset.id);
    setActiveRules(preset.rules);
    setActiveLogic(preset.logic);
  };

  // Apply a saved screen
  const handleApplySavedScreen = (saved: SavedScreen) => {
    setActivePresetId(null);
    setActiveRules(saved.rules);
    setActiveLogic(saved.logic);
  };

  // Handle Save to Watchlist
  const handleSaveToWatchlist = (watchlistName: string, symbol: string) => {
    setToastMessage(`✓ ${symbol} berhasil ditambahkan ke watchlist "${watchlistName}"!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 1. Scoped Instruments (Market, Exchange, Asset Type, Currency, and Search)
  const scopedInstruments = useMemo(() => {
    return instruments.filter((inst) => {
      if (selectedCountry !== 'ALL' && inst.countryCode !== selectedCountry) {
        return false;
      }
      if (selectedExchange !== 'ALL' && inst.exchange !== selectedExchange) {
        return false;
      }
      if (selectedAssetType !== 'ALL' && inst.assetType !== selectedAssetType) {
        return false;
      }
      if (selectedCurrency !== 'ALL' && inst.currency !== selectedCurrency) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchSearch =
          inst.symbol.toLowerCase().includes(q) ||
          inst.companyName.toLowerCase().includes(q) ||
          inst.exchange.toLowerCase().includes(q) ||
          inst.country.toLowerCase().includes(q);
        if (!matchSearch) return false;
      }
      return true;
    });
  }, [instruments, selectedCountry, selectedExchange, selectedAssetType, selectedCurrency, searchQuery]);

  // 2. Deterministic Filtering with active rules
  const filteredInstruments = useMemo(() => {
    return scopedInstruments.filter((inst) => {
      return evaluateInstrument(inst, activeRules, activeLogic);
    });
  }, [scopedInstruments, activeRules, activeLogic]);

  // Track execution time on client
  useEffect(() => {
    const t0 = performance.now();
    scopedInstruments.filter((inst) => evaluateInstrument(inst, activeRules, activeLogic));
    const t1 = performance.now();
    setExecutionTimeMs(Number((t1 - t0).toFixed(2)));
  }, [scopedInstruments, activeRules, activeLogic]);

  // 3. Calculate Pipeline Funnel
  const pipelineStages = useMemo(() => {
    return calculatePipeline(scopedInstruments, activeRules);
  }, [scopedInstruments, activeRules]);

  // 4. Open Why Match Modal
  const handleOpenWhyMatch = (inst: GlobalInstrument) => {
    const report = generateWhyMatchReport(inst, activeRules, activeLogic);
    setSelectedWhyMatchReport(report);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      {/* 1. Header with Data Freshness, Timezone & Refresh */}
      <ScreenerHeader
        lastUpdated={lastUpdated}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
        totalStocks={instruments.length}
      />

      {/* Section T: Demo Mode Transparency Banner */}
      <div className="rounded-xl border border-amber-500/30 bg-amber-950/30 p-3.5 flex items-start gap-3 text-xs text-amber-200">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <div className="font-bold text-amber-300">
            Demo Mode — This screener currently uses sample data.
          </div>
          <p className="text-[11px] text-amber-300/80 leading-relaxed">
            Cakupan bursa dan hasil scanning saat ini menggunakan 24 instrumen demo terisolasi. Feed live real-time akan aktif saat koneksi data provider resmi diaktifkan.
          </p>
        </div>
      </div>

      {/* Toast message alert */}
      {toastMessage && (
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/90 p-3 text-xs font-semibold text-emerald-300 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* 2. Section A: What is this scanner for? (Hero explainer & How It Works) */}
      <ScreenerHeroExplainer />

      {/* 3. Section B: Market Coverage Panel */}
      <MarketCoveragePanel />

      {/* 4. Section F: Data Sources Panel */}
      <DataSourcesPanel />

      {/* 5. Section G & H: Broker & Trading Connections Panel */}
      <BrokerConnectionsPanel />

      {/* 6. Section E: Global Market Selector & Search Bar */}
      <GlobalMarketBar
        selectedCountry={selectedCountry}
        selectedExchange={selectedExchange}
        selectedAssetType={selectedAssetType}
        selectedCurrency={selectedCurrency}
        onSelectCountry={setSelectedCountry}
        onSelectExchange={setSelectedExchange}
        onSelectAssetType={setSelectedAssetType}
        onSelectCurrency={setSelectedCurrency}
        totalMatching={scopedInstruments.length}
        totalUniverse={instruments.length}
      />

      {/* Global Search & Saved Screens */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <ScreenerSearch
          search={searchQuery}
          onSearchChange={setSearchQuery}
          allInstruments={instruments}
          onSelectInstrument={(symbol) => setSearchQuery(symbol)}
        />

        {savedScreens.length > 0 && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold flex items-center gap-1">
              <Bookmark className="w-3.5 h-3.5 text-indigo-400" /> Setup Tersimpan:
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {savedScreens.slice(0, 4).map((saved) => (
                <button
                  key={saved.id}
                  onClick={() => handleApplySavedScreen(saved)}
                  className="rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1 text-slate-300 hover:border-indigo-500 hover:text-white transition-colors text-xs"
                >
                  {saved.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 7. Section K: "What are you trying to find?" Preset Screener Bar */}
      <PresetScreenerBar
        activePresetId={activePresetId}
        onSelectPreset={handleSelectPreset}
      />

      {/* 8. Section L: Filter Builder & "Your Screening Strategy" Panel */}
      <FilterBuilder
        onAddRule={handleAddRule}
        currentLogic={activeLogic}
        onChangeLogic={setActiveLogic}
        activeRules={activeRules}
        selectedCountry={selectedCountry}
        selectedAssetType={selectedAssetType}
        onRunScreener={handleRunScreener}
        isRunning={isScanning}
      />

      {/* 9. Active Filter Chips & Save Screen Trigger */}
      <ActiveFilterChips
        rules={activeRules}
        logic={activeLogic}
        onRemoveRule={handleRemoveRule}
        onClearAll={handleClearAll}
        onOpenSaveModal={() => setIsSaveModalOpen(true)}
      />

      {/* 10. Section M: Screening Pipeline (Honest count elimination funnel) */}
      <ScreeningPipeline stages={pipelineStages} />

      {/* 11. Section D, I, J, O, P: Results Table & Metadata */}
      <ScreenerResultTable
        instruments={filteredInstruments}
        totalUniverse={instruments.length}
        totalScanned={scopedInstruments.length}
        activeFilterCount={activeRules.length}
        lastScanTime={lastScanTime}
        isLoading={isRefreshing || isScanning}
        onOpenWhyMatch={handleOpenWhyMatch}
        onOpenWatchlistModal={(inst) => setSelectedWatchlistInstrument(inst)}
        onOpenTradeModal={(inst) => setSelectedTradeInstrument(inst)}
      />

      {/* 12. Modals */}
      {/* Why Match Modal */}
      <WhyMatchModal
        report={selectedWhyMatchReport}
        onClose={() => setSelectedWhyMatchReport(null)}
      />

      {/* Watchlist Modal */}
      <WatchlistModal
        instrument={selectedWatchlistInstrument}
        onClose={() => setSelectedWatchlistInstrument(null)}
        onSaveToWatchlist={handleSaveToWatchlist}
      />

      {/* Trade Order Preview Modal */}
      <TradeOrderModal
        instrument={selectedTradeInstrument}
        onClose={() => setSelectedTradeInstrument(null)}
      />

      {/* Save Screen Modal */}
      <SaveScreenModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        rules={activeRules}
        logic={activeLogic}
        onSaveSuccess={(saved) => {
          setSavedScreens((prev) => [saved, ...prev]);
        }}
      />
    </div>
  );
}
