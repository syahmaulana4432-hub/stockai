import React from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';

interface DisclaimerBannerProps {
  mode?: 'full' | 'compact';
}

export function DisclaimerBanner({ mode = 'compact' }: DisclaimerBannerProps) {
  if (mode === 'compact') {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-1.5 text-[11px] text-amber-300/90">
        <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-400" />
        <span>
          <strong>Edukasi & Simulasi (Phase 1):</strong> Seluruh data pasar menggunakan simulasi dataset terstruktur dengan kalkulasi indikator matematis deterministik. Bukan rekomendasi beli/jual saham.
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <ShieldAlert className="h-5 w-5" />
        </div>
        <div className="space-y-1 text-xs">
          <div className="font-semibold text-white uppercase tracking-wider">
            Disclaimer Pasar Modal & Ketentuan Analisis Algoritmik
          </div>
          <p className="text-slate-400 leading-relaxed">
            StockAI menyajikan analisis data pasar, indikator teknikal komputasional deterministik, dan pemodelan riset kualitatif berbasis bukti murni untuk keperluan edukasi dan literasi investasi. Kami tidak memberikan jaminan keuntungan, rekomendasi pasti, atau ajakan transaksi. Seluruh keputusan investasi dan risiko modal sepenuhnya berada di tangan masing-masing investor.
          </p>
        </div>
      </div>
    </div>
  );
}
