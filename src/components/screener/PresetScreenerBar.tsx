'use client';

import React, { useState } from 'react';
import { GLOBAL_PRESET_SCREENERS } from '@/data/mockGlobalPresets';
import { PresetTemplate } from '@/lib/globalTypes';
import { Sparkles, Check, Info, Compass, HelpCircle } from 'lucide-react';

interface PresetScreenerBarProps {
  activePresetId: string | null;
  onSelectPreset: (preset: PresetTemplate) => void;
}

export function PresetScreenerBar({ activePresetId, onSelectPreset }: PresetScreenerBarProps) {
  const [hoveredPreset, setHoveredPreset] = useState<PresetTemplate | null>(null);

  const activePreset = GLOBAL_PRESET_SCREENERS.find((p) => p.id === activePresetId);

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl backdrop-blur-md space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            What are you trying to find? (Strategi Preset Penelitian)
          </span>
        </div>
        <span className="text-[11px] text-slate-400">
          Setiap preset transparan menampilkan rumus filter
        </span>
      </div>

      {/* Preset Buttons Scroll Container */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 no-scrollbar">
        {GLOBAL_PRESET_SCREENERS.map((preset) => {
          const isActive = activePresetId === preset.id;

          return (
            <div key={preset.id} className="relative shrink-0">
              <button
                type="button"
                onClick={() => onSelectPreset(preset)}
                onMouseEnter={() => setHoveredPreset(preset)}
                onMouseLeave={() => setHoveredPreset(null)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white border-cyan-400/50 shadow-md shadow-cyan-950/40'
                    : 'bg-slate-950/70 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                {isActive && <Check className="w-3.5 h-3.5 text-white" />}
                <span>{preset.name}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                    isActive ? 'bg-black/30 text-cyan-200' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {preset.badge}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Active Preset Explainer Banner */}
      {activePreset && (
        <div className="rounded-xl border border-cyan-500/20 bg-cyan-950/20 p-3 text-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-cyan-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Strategi Aktif: {activePreset.name} ({activePreset.badge})</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              Logika: {activePreset.logic}
            </span>
          </div>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            {activePreset.description}
          </p>
          <div className="flex flex-wrap gap-2 pt-1 font-mono text-[10px]">
            {activePreset.rules.map((r, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300"
              >
                {r.label} <strong className="text-cyan-400">{r.operator}</strong>{' '}
                {Array.isArray(r.value) ? r.value.join(' - ') : r.value} {r.unit || ''}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
