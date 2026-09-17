'use client';

import React from 'react';
import { WhyMatchReport } from '@/lib/globalTypes';
import { X, CheckCircle2, XCircle, Sparkles, ArrowRight, ShieldCheck, Scale } from 'lucide-react';
import Link from 'next/link';

interface WhyMatchModalProps {
  report: WhyMatchReport | null;
  onClose: () => void;
}

export function WhyMatchModal({ report, onClose }: WhyMatchModalProps) {
  if (!report) return null;

  const totalRules = report.passedRules.length + report.failedRules.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-600/20 text-cyan-400 font-bold border border-cyan-500/30 text-xs font-mono">
              {report.symbol.slice(0, 4)}
            </div>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <span>Why Match Audit: {report.symbol}</span>
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">
                {report.isMatch ? (
                  <span className="text-emerald-400 font-semibold">✓ Memenuhi {report.passedRules.length} dari {totalRules} Kriteria Aktif</span>
                ) : (
                  <span className="text-rose-400 font-semibold">✕ Gagal pada {report.failedRules.length} Kriteria</span>
                )}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-5 space-y-5 flex-1">
          {/* Section V: Deterministic AI Explanation Box */}
          <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-3.5 space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-indigo-300">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Deterministic AI Reasoning Summary</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              &ldquo;Instrumen <strong className="text-white">{report.symbol}</strong> ({report.companyName}) memenuhi {report.passedRules.length} dari {totalRules} aturan screening aktif secara deterministik tanpa manipulasi probabilitas.&rdquo;
            </p>
          </div>

          {/* Passed Criteria */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Kriteria yang Lolos (Passed - {report.passedRules.length})
            </div>

            {report.passedRules.length > 0 ? (
              <div className="space-y-1.5">
                {report.passedRules.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-950/20 p-2.5 text-xs font-mono"
                  >
                    <div className="space-y-0.5">
                      <div className="font-sans font-semibold text-white">{item.rule.label}</div>
                      <div className="text-[10px] text-slate-400 font-sans">
                        Syarat: {item.rule.operator} {Array.isArray(item.rule.value) ? item.rule.value.join(' - ') : item.rule.value} {item.rule.unit || ''}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-emerald-400">{item.actualValue}</span>
                      <span className="text-[10px] text-emerald-500 block">✓ Valid</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-slate-500 italic p-2">Tidak ada kriteria yang lolos.</div>
            )}
          </div>

          {/* Failed Criteria */}
          {report.failedRules.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <XCircle className="w-4 h-4" /> Kriteria yang Tidak Lolos (Failed - {report.failedRules.length})
              </div>

              <div className="space-y-1.5">
                {report.failedRules.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-xl border border-rose-500/20 bg-rose-950/20 p-2.5 text-xs font-mono"
                  >
                    <div className="space-y-0.5">
                      <div className="font-sans font-semibold text-slate-200">{item.rule.label}</div>
                      <div className="text-[10px] text-slate-400 font-sans">
                        Syarat: {item.rule.operator} {Array.isArray(item.rule.value) ? item.rule.value.join(' - ') : item.rule.value} {item.rule.unit || ''}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-rose-400">{item.actualValue}</span>
                      <span className="text-[10px] text-rose-500 block">✕ Tidak Cocok</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-800 bg-slate-950 text-xs">
          <Link
            href={`/analysis/${report.symbol}`}
            className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            <span>Buka Analisis Mendalam {report.symbol}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-800 px-3 py-1.5 font-medium text-slate-300 hover:text-white"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
