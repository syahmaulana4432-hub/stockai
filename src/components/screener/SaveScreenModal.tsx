'use client';

import React, { useState } from 'react';
import { ScreenerRule, LogicOperator, SavedScreen } from '@/lib/globalTypes';
import { X, Bookmark, Check } from 'lucide-react';

interface SaveScreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  rules: ScreenerRule[];
  logic: LogicOperator;
  onSaveSuccess: (saved: SavedScreen) => void;
}

export function SaveScreenModal({
  isOpen,
  onClose,
  rules,
  logic,
  onSaveSuccess,
}: SaveScreenModalProps) {
  const [screenName, setScreenName] = useState('');

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!screenName.trim()) return;

    const newSavedScreen: SavedScreen = {
      id: `saved-${Date.now()}`,
      name: screenName.trim(),
      createdAt: new Date().toISOString(),
      rules: [...rules],
      logic,
    };

    // Save to LocalStorage
    try {
      const existingStr = localStorage.getItem('stockai_saved_screens');
      const existing: SavedScreen[] = existingStr ? JSON.parse(existingStr) : [];
      const updated = [newSavedScreen, ...existing];
      localStorage.setItem('stockai_saved_screens', JSON.stringify(updated));
    } catch {
      // ignore
    }

    onSaveSuccess(newSavedScreen);
    setScreenName('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="font-bold text-base text-white flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-indigo-400" /> Simpan Setup Screener
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="text-slate-300 font-semibold block mb-1.5">
              Nama Setup Screener:
            </label>
            <input
              type="text"
              value={screenName}
              onChange={(e) => setScreenName(e.target.value)}
              placeholder="Contoh: My Swing Setup, Dividend Big Cap..."
              autoFocus
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3 space-y-1 text-[11px] text-slate-400 font-mono">
            <div>Jumlah Aturan: <strong className="text-white">{rules.length} Filter</strong></div>
            <div>Kombinasi Logika: <strong className="text-indigo-400">{logic}</strong></div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 font-medium hover:text-white"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={!screenName.trim()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              <span>Simpan Setup</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
