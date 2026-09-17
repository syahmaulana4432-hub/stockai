'use client';

import React, { useState } from 'react';
import {
  ScreenerRule,
  FilterCategory,
  FilterOperator,
  LogicOperator,
  CountryCode,
  AssetType,
} from '@/lib/globalTypes';
import { Plus, Sliders, Play, CheckCircle2, SlidersHorizontal, Sparkles } from 'lucide-react';
import { formatGlobalMarketCap } from '@/lib/currency';

interface FilterBuilderProps {
  onAddRule: (rule: ScreenerRule) => void;
  currentLogic: LogicOperator;
  onChangeLogic: (logic: LogicOperator) => void;
  activeRules: ScreenerRule[];
  selectedCountry: CountryCode | 'ALL';
  selectedAssetType: AssetType | 'ALL';
  onRunScreener: () => void;
  isRunning?: boolean;
}

interface AvailableField {
  field: string;
  label: string;
  category: FilterCategory;
  type: 'number' | 'range' | 'select' | 'compare';
  defaultOp: FilterOperator;
  defaultVal: number | string | [number, number];
  unit?: string;
  options?: string[];
  fieldCompare?: string;
}

const AVAILABLE_FIELDS: AvailableField[] = [
  // MARKET
  { field: 'country', label: 'Country (Negara)', category: 'MARKET', type: 'select', defaultOp: '=', defaultVal: 'United States', options: ['United States', 'Indonesia', 'Japan', 'Hong Kong', 'United Kingdom', 'Singapore', 'Australia', 'Canada', 'Europe'] },
  { field: 'exchange', label: 'Exchange (Bursa)', category: 'MARKET', type: 'select', defaultOp: '=', defaultVal: 'NASDAQ', options: ['NASDAQ', 'NYSE', 'IDX', 'TSE', 'HKEX', 'LSE', 'SGX', 'ASX', 'TSX', 'EURONEXT'] },
  { field: 'assetType', label: 'Asset Type (Jenis Aset)', category: 'MARKET', type: 'select', defaultOp: '=', defaultVal: 'Stock', options: ['Stock', 'ETF', 'REIT', 'ADR', 'Index'] },
  { field: 'marketCapUSD', label: 'Market Cap (USD Normalized)', category: 'MARKET', type: 'number', defaultOp: '>=', defaultVal: 10000000000, unit: 'USD' },
  { field: 'volume', label: 'Volume Transaksi Harian', category: 'MARKET', type: 'number', defaultOp: '>=', defaultVal: 10000000 },
  { field: 'changePercent', label: 'Perubahan Harga Hari Ini (% 1D)', category: 'MARKET', type: 'number', defaultOp: '>=', defaultVal: 0, unit: '%' },
  { field: 'sector', label: 'Sektor Industri Global', category: 'MARKET', type: 'select', defaultOp: '=', defaultVal: 'Technology', options: ['Technology', 'Financials', 'Consumer Discretionary', 'Consumer Non-Cyclicals', 'Basic Materials', 'Telecommunication', 'Healthcare', 'Real Estate', 'Broad Market ETF'] },

  // VALUATION
  { field: 'per', label: 'Price to Earnings (PER)', category: 'VALUATION', type: 'number', defaultOp: '<', defaultVal: 25, unit: 'x' },
  { field: 'forwardPER', label: 'Forward PER', category: 'VALUATION', type: 'number', defaultOp: '<', defaultVal: 20, unit: 'x' },
  { field: 'pbv', label: 'Price to Book Value (PBV)', category: 'VALUATION', type: 'number', defaultOp: '<', defaultVal: 3.0, unit: 'x' },
  { field: 'peg', label: 'PEG Ratio (PER to Growth)', category: 'VALUATION', type: 'number', defaultOp: '<=', defaultVal: 1.5, unit: 'x' },
  { field: 'ps', label: 'Price to Sales (P/S)', category: 'VALUATION', type: 'number', defaultOp: '<=', defaultVal: 5.0, unit: 'x' },
  { field: 'evEbitda', label: 'EV / EBITDA', category: 'VALUATION', type: 'number', defaultOp: '<=', defaultVal: 15.0, unit: 'x' },

  // FUNDAMENTAL & QUALITY
  { field: 'roe', label: 'Return on Equity (ROE)', category: 'FUNDAMENTAL', type: 'number', defaultOp: '>=', defaultVal: 15, unit: '%' },
  { field: 'roa', label: 'Return on Assets (ROA)', category: 'FUNDAMENTAL', type: 'number', defaultOp: '>=', defaultVal: 5, unit: '%' },
  { field: 'roic', label: 'Return on Invested Capital (ROIC)', category: 'FUNDAMENTAL', type: 'number', defaultOp: '>=', defaultVal: 12, unit: '%' },
  { field: 'der', label: 'Debt to Equity (DER)', category: 'FUNDAMENTAL', type: 'number', defaultOp: '<=', defaultVal: 1.0, unit: 'x' },

  // GROWTH
  { field: 'revenueGrowth', label: 'Revenue Growth YoY', category: 'GROWTH', type: 'number', defaultOp: '>=', defaultVal: 10, unit: '%' },
  { field: 'profitGrowth', label: 'Net Profit Growth YoY', category: 'GROWTH', type: 'number', defaultOp: '>=', defaultVal: 10, unit: '%' },
  { field: 'fcfGrowth', label: 'Free Cash Flow Growth', category: 'GROWTH', type: 'number', defaultOp: '>=', defaultVal: 10, unit: '%' },

  // DIVIDEND
  { field: 'dividendYield', label: 'Dividend Yield', category: 'DIVIDEND', type: 'number', defaultOp: '>=', defaultVal: 3.0, unit: '%' },
  { field: 'dividendPayout', label: 'Dividend Payout Ratio', category: 'DIVIDEND', type: 'number', defaultOp: '<=', defaultVal: 75.0, unit: '%' },

  // TECHNICAL
  { field: 'rsi', label: 'RSI 14 Hari', category: 'TECHNICAL', type: 'range', defaultOp: 'BETWEEN', defaultVal: [40, 70] },
  { field: 'macdHist', label: 'MACD Histogram', category: 'TECHNICAL', type: 'number', defaultOp: '>', defaultVal: 0 },
  { field: 'stochK', label: 'Stochastic %K', category: 'TECHNICAL', type: 'number', defaultOp: '<=', defaultVal: 40 },
  { field: 'price_vs_ma20', label: 'Price > MA20', category: 'TECHNICAL', type: 'compare', defaultOp: '>', defaultVal: 0, fieldCompare: 'ma20' },
  { field: 'price_vs_ma50', label: 'Price > MA50', category: 'TECHNICAL', type: 'compare', defaultOp: '>', defaultVal: 0, fieldCompare: 'ma50' },
  { field: 'price_vs_ma200', label: 'Price > MA200 (Major Trend)', category: 'TECHNICAL', type: 'compare', defaultOp: '>', defaultVal: 0, fieldCompare: 'ma200' },

  // PRICE ACTION
  { field: 'trend', label: 'Trend Utama', category: 'PRICE_ACTION', type: 'select', defaultOp: '=', defaultVal: 'Uptrend', options: ['Uptrend', 'Downtrend', 'Sideways'] },
  { field: 'pattern', label: 'Pola Price Action', category: 'PRICE_ACTION', type: 'select', defaultOp: '=', defaultVal: 'Breakout', options: ['Breakout', 'Breakdown', 'Pullback', 'Retest', 'Near Support', 'Near Resistance', 'Consolidation'] },
];

export function FilterBuilder({
  onAddRule,
  currentLogic,
  onChangeLogic,
  activeRules,
  selectedCountry,
  selectedAssetType,
  onRunScreener,
  isRunning = false,
}: FilterBuilderProps) {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('VALUATION');
  const [selectedFieldKey, setSelectedFieldKey] = useState<string>('per');
  const [operator, setOperator] = useState<FilterOperator>('<');
  const [numValue, setNumValue] = useState<number>(25);
  const [minVal, setMinVal] = useState<number>(40);
  const [maxVal, setMaxVal] = useState<number>(70);
  const [strValue, setStrValue] = useState<string>('Technology');

  const categoryFields = AVAILABLE_FIELDS.filter((f) => f.category === selectedCategory);
  const currentField = AVAILABLE_FIELDS.find((f) => f.field === selectedFieldKey) || categoryFields[0];

  const handleFieldChange = (fieldKey: string) => {
    setSelectedFieldKey(fieldKey);
    const fieldObj = AVAILABLE_FIELDS.find((f) => f.field === fieldKey);
    if (fieldObj) {
      setOperator(fieldObj.defaultOp);
      if (typeof fieldObj.defaultVal === 'number') {
        setNumValue(fieldObj.defaultVal);
      } else if (Array.isArray(fieldObj.defaultVal)) {
        setMinVal(fieldObj.defaultVal[0]);
        setMaxVal(fieldObj.defaultVal[1]);
      } else if (typeof fieldObj.defaultVal === 'string') {
        setStrValue(fieldObj.defaultVal);
      }
    }
  };

  const handleAddFilter = () => {
    if (!currentField) return;

    let finalValue: ScreenerRule['value'];
    let actualField = currentField.field;
    let fieldCompare = currentField.fieldCompare;

    if (currentField.type === 'compare') {
      actualField = 'price';
      finalValue = 0;
    } else if (operator === 'BETWEEN') {
      finalValue = [minVal, maxVal];
    } else if (currentField.type === 'select') {
      finalValue = strValue;
    } else {
      finalValue = numValue;
    }

    const newRule: ScreenerRule = {
      id: `rule-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      field: actualField,
      label: currentField.label,
      category: currentField.category,
      operator,
      value: finalValue,
      unit: currentField.unit,
      fieldCompare,
    };

    onAddRule(newRule);
  };

  const categories: FilterCategory[] = [
    'MARKET',
    'VALUATION',
    'FUNDAMENTAL',
    'GROWTH',
    'DIVIDEND',
    'TECHNICAL',
    'PRICE_ACTION',
  ];

  return (
    <div className="space-y-4">
      {/* 1. Main Filter Builder Box */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl backdrop-blur-md space-y-4">
        {/* Header & Logic Selector */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-indigo-400" /> Filter Builder & Multi-Condition Logic
            </h3>
            <p className="text-xs text-slate-400">
              Bangun kriteria komprehensif lintas pasar, valuasi, rasio pertumbuhan, dan teknikal
            </p>
          </div>

          {/* Boolean Logic Switcher: AND / OR / NOT */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-500 font-semibold px-2">LOGIC:</span>
            {(['AND', 'OR', 'NOT'] as LogicOperator[]).map((op) => (
              <button
                key={op}
                type="button"
                onClick={() => onChangeLogic(op)}
                className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                  currentLogic === op
                    ? op === 'AND'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : op === 'OR'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {op}
              </button>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setSelectedCategory(cat);
                const firstField = AVAILABLE_FIELDS.find((f) => f.category === cat);
                if (firstField) handleFieldChange(firstField.field);
              }}
              className={`py-2 px-2.5 rounded-xl font-bold transition-all border text-center text-[11px] truncate ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-cyan-400 border-cyan-500/40 shadow-inner'
                  : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Inputs Form Row */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-2 items-end">
          {/* Metric Selector (5 cols) */}
          <div className="sm:col-span-5 space-y-1">
            <label className="text-[11px] font-semibold text-slate-400">Parameter / Indikator Global:</label>
            <select
              value={selectedFieldKey}
              onChange={(e) => handleFieldChange(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
            >
              {categoryFields.map((f) => (
                <option key={f.field} value={f.field}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>

          {/* Operator Selector (3 cols) */}
          <div className="sm:col-span-3 space-y-1">
            <label className="text-[11px] font-semibold text-slate-400">Operator:</label>
            <select
              value={operator}
              onChange={(e) => setOperator(e.target.value as FilterOperator)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-xs text-cyan-300 font-mono font-bold focus:outline-none focus:border-cyan-500"
            >
              <option value=">">&gt; (Lebih dari)</option>
              <option value=">=">&gt;= (Minimal)</option>
              <option value="<">&lt; (Kurang dari)</option>
              <option value="<=">&lt;= (Maksimal)</option>
              <option value="=">= (Sama dengan)</option>
              <option value="BETWEEN">BETWEEN (Rentang)</option>
            </select>
          </div>

          {/* Value Input (4 cols) */}
          <div className="sm:col-span-4 space-y-1">
            <label className="text-[11px] font-semibold text-slate-400">Nilai / Batasan:</label>
            {operator === 'BETWEEN' ? (
              <div className="flex items-center gap-1.5 font-mono text-xs">
                <input
                  type="number"
                  value={minVal}
                  onChange={(e) => setMinVal(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-2.5 py-2 text-white font-mono"
                />
                <span className="text-slate-500">-</span>
                <input
                  type="number"
                  value={maxVal}
                  onChange={(e) => setMaxVal(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-2.5 py-2 text-white font-mono"
                />
              </div>
            ) : currentField?.type === 'select' && currentField.options ? (
              <select
                value={strValue}
                onChange={(e) => setStrValue(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-xs text-white focus:outline-none"
              >
                {currentField.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : currentField?.type === 'compare' ? (
              <div className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2.5 text-xs text-slate-400 font-mono">
                vs {currentField.fieldCompare?.toUpperCase()}
              </div>
            ) : (
              <div className="relative">
                <input
                  type="number"
                  value={numValue}
                  onChange={(e) => setNumValue(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                />
                {currentField?.unit && (
                  <span className="absolute right-3 top-2 text-[10px] text-slate-500 font-sans">
                    {currentField.unit}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Add Button Action */}
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={handleAddFilter}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-cyan-950/40 hover:opacity-95 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            <span>Tambahkan ke Filter Aktif</span>
          </button>
        </div>
      </div>

      {/* 2. Section L: "Your Screening Strategy" Summary Panel */}
      <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-slate-950 p-4 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-white">
              Your Screening Strategy (Ringkasan Strategi)
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-indigo-300 font-mono font-bold">
              Logic: {currentLogic}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-300">
            <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-cyan-300">
              Market: {selectedCountry === 'ALL' ? 'Global' : selectedCountry}
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-teal-300">
              Asset: {selectedAssetType === 'ALL' ? 'All Assets' : selectedAssetType}
            </span>
            {activeRules.map((rule) => (
              <span
                key={rule.id}
                className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300"
              >
                {rule.label}: <strong className="text-white">{rule.operator}</strong>{' '}
                {Array.isArray(rule.value) ? rule.value.join('-') : String(rule.value)} {rule.unit || ''}
              </span>
            ))}
            {activeRules.length === 0 && (
              <span className="text-slate-500 italic text-[11px]">
                (Belum ada filter tambahan — seluruh universe lolos)
              </span>
            )}
          </div>
        </div>

        {/* Run Screener Button */}
        <button
          type="button"
          onClick={onRunScreener}
          disabled={isRunning}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-emerald-950/50 hover:brightness-110 active:scale-95 transition-all disabled:opacity-50 shrink-0"
        >
          <Play className={`w-4 h-4 fill-white ${isRunning ? 'animate-spin' : ''}`} />
          <span>{isRunning ? 'Scanning...' : 'Run Screener'}</span>
        </button>
      </div>
    </div>
  );
}
