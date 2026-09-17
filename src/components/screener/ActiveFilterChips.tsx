'use client';

import React from 'react';
import { ScreenerRule, LogicOperator } from '@/lib/globalTypes';
import { X, RotateCcw, Bookmark, Trash2, Filter } from 'lucide-react';
import { formatGlobalMarketCap } from '@/lib/currency';

interface ActiveFilterChipsProps {
  rules: ScreenerRule[];
  logic: LogicOperator;
  onRemoveRule: (id: string) => void;
  onClearAll: () => void;
  onOpenSaveModal: () => void;
}

export function ActiveFilterChips({
  rules,
  logic,
  onRemoveRule,
  onClearAll,
  onOpenSaveModal,
}: ActiveFilterChipsProps) {
  if (rules.length === 0) {
    return (
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 p-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <span>Belum ada filter aktif. Pilih preset di atas atau tambahkan aturan filter multi-market baru.</span>
        </div>
      </div>
    );
  }

  const getCategoryColor = (cat: ScreenerRule['category']) => {
    switch (cat) {
      case 'MARKET':
        return 'border-cyan-500/30 bg-cyan-950/20 text-cyan-300';
      case 'VALUATION':
        return 'border-emerald-500/30 bg-emerald-950/20 text-emerald-300';
      case 'FUNDAMENTAL':
        return 'border-indigo-500/30 bg-indigo-950/20 text-indigo-300';
      case 'GROWTH':
        return 'border-teal-500/30 bg-teal-950/20 text-teal-300';
      case 'DIVIDEND':
        return 'border-amber-500/30 bg-amber-950/20 text-amber-300';
      case 'TECHNICAL':
        return 'border-purple-500/30 bg-purple-950/20 text-purple-300';
      case 'PRICE_ACTION':
        return 'border-rose-500/30 bg-rose-950/20 text-rose-300';
      default:
        return 'border-slate-700 bg-slate-800 text-slate-300';
    }
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl backdrop-blur-md space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Filter Aktif ({rules.length})
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono font-bold">
            Kombinasi: {logic}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenSaveModal}
            className="flex items-center gap-1.5 rounded-xl border border-indigo-500/40 bg-indigo-950/30 px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-900/40 transition-colors"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Simpan Setup (Save Screen)</span>
          </button>

          <button
            type="button"
            onClick={onClearAll}
            className="flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-rose-400 hover:border-rose-500/40 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Hapus Semua</span>
          </button>
        </div>
      </div>

      {/* Filter Chips List */}
      <div className="flex flex-wrap items-center gap-2">
        {rules.map((rule, idx) => {
          let displayVal = String(rule.value);
          if (Array.isArray(rule.value)) {
            displayVal = `${rule.value[0]} - ${rule.value[1]}`;
          } else if (rule.fieldCompare) {
            displayVal = rule.fieldCompare.toUpperCase();
          } else if (typeof rule.value === 'number' && rule.value >= 1000000) {
            displayVal = formatGlobalMarketCap(rule.value, 'USD');
          }

          return (
            <span
              key={rule.id}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1 text-xs font-mono font-medium shadow-sm transition-all ${getCategoryColor(
                rule.category
              )}`}
            >
              <span className="font-sans font-semibold text-slate-200">{rule.label}</span>
              <span className="font-bold text-white">{rule.operator}</span>
              <span>{displayVal}</span>
              {rule.unit && <span className="text-[10px] text-slate-400">{rule.unit}</span>}
              <button
                type="button"
                onClick={() => onRemoveRule(rule.id)}
                className="ml-1 p-0.5 rounded-md hover:bg-black/40 text-slate-400 hover:text-white transition-colors"
                title="Hapus filter ini"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
}
