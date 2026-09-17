'use client';

import React, { useState } from 'react';
import { GlobalInstrument } from '@/lib/globalTypes';
import { Bookmark, X, Check, Plus, FolderHeart } from 'lucide-react';

interface WatchlistModalProps {
  instrument: GlobalInstrument | null;
  onClose: () => void;
  onSaveToWatchlist: (watchlistName: string, symbol: string) => void;
}

const DEFAULT_WATCHLISTS = [
  'US Growth Stocks',
  'Indonesia Dividend Compounders',
  'Japan Value Leaders',
  'Global Momentum Candidates',
  'Global REITs & Income',
  'General Watchlist',
];

export function WatchlistModal({
  instrument,
  onClose,
  onSaveToWatchlist,
}: WatchlistModalProps) {
  const [selectedList, setSelectedList] = useState(DEFAULT_WATCHLISTS[0]);
  const [customListName, setCustomListName] = useState('');
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!instrument) return null;

  const handleSave = () => {
    const listToUse = isCreatingNew && customListName.trim() ? customListName.trim() : selectedList;
    onSaveToWatchlist(listToUse, instrument.symbol);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-sm text-white">
              Tambah ke Watchlist: {instrument.symbol}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Emiten Info Pill */}
        <div className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-950/60 text-xs">
          <div>
            <div className="font-bold text-white font-mono">{instrument.symbol} • {instrument.exchange}</div>
            <div className="text-[11px] text-slate-400 truncate max-w-[220px]">{instrument.companyName}</div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
            {instrument.assetType}
          </span>
        </div>

        {/* Watchlist Selection List */}
        {!isCreatingNew ? (
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">
              Pilih Kategori Watchlist:
            </label>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {DEFAULT_WATCHLISTS.map((list) => {
                const isSelected = selectedList === list;
                return (
                  <button
                    key={list}
                    type="button"
                    onClick={() => setSelectedList(list)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs text-left transition-colors ${
                      isSelected
                        ? 'border-amber-500/50 bg-amber-950/30 text-amber-300 font-bold'
                        : 'border-slate-800 bg-slate-950/40 text-slate-300 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <FolderHeart className="w-3.5 h-3.5 text-amber-400" />
                      <span>{list}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setIsCreatingNew(true)}
              className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 pt-1 font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Buat Watchlist Baru...</span>
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">
              Nama Watchlist Baru:
            </label>
            <input
              type="text"
              value={customListName}
              onChange={(e) => setCustomListName(e.target.value)}
              placeholder="Contoh: Global AI Leaders, Tech Swing..."
              autoFocus
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
            <button
              type="button"
              onClick={() => setIsCreatingNew(false)}
              className="text-[11px] text-slate-400 hover:text-white"
            >
              ← Pilih dari daftar yang ada
            </button>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800 text-xs">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-700 bg-slate-800 text-slate-300 font-medium hover:text-white"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={savedSuccess}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 text-white font-bold hover:bg-amber-500 transition-colors disabled:opacity-75"
          >
            {savedSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Tersimpan!</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4" />
                <span>Simpan ke Watchlist</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
