import React from 'react';
import Link from 'next/link';
import { Sparkles, Shield, Heart, BookOpen, Layers, Activity } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs mt-16">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand & Mission */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-600 to-indigo-600 text-white font-bold text-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-white">StockAI Indonesia</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Platform analisis saham, edukasi interaktif, dan pemodelan AI skenario cerdas untuk pasar modal Indonesia (IDX/BEI).
            </p>
            <div className="text-[11px] text-slate-400">
              Arsitektur: Next.js + TypeScript + Tailwind
            </div>
          </div>

          {/* Col 2: Fitur Utama */}
          <div className="space-y-2">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Fitur Platform</h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/market" className="hover:text-cyan-400 transition-colors">
                  Market Dashboard & IHSG
                </Link>
              </li>
              <li>
                <Link href="/analysis/BBCA" className="hover:text-cyan-400 transition-colors">
                  Technical & Fundamental Analysis
                </Link>
              </li>
              <li>
                <Link href="/screener" className="hover:text-cyan-400 transition-colors">
                  Stock Screener & Filter
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-cyan-400 transition-colors">
                  Berita Pasar & Corporate Action
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Edukasi & Literasi */}
          <div className="space-y-2">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Edukasi & Kamus</h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/learn" className="hover:text-indigo-400 transition-colors">
                  24 Modul Belajar Saham (8-Step)
                </Link>
              </li>
              <li>
                <Link href="/dictionary" className="hover:text-indigo-400 transition-colors">
                  Kamus Istilah Saham (A-Z)
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-indigo-400 transition-colors">
                  Risk/Reward & Position Size Calculator
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-indigo-400 transition-colors">
                  Paper Trading Sandbox
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Standar Kepatuhan */}
          <div className="space-y-2">
            <h4 className="font-semibold text-white uppercase tracking-wider text-[11px]">Prinsip Analisis</h4>
            <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-3 space-y-1.5 text-[11px]">
              <div className="text-amber-400 font-semibold flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" /> Transparansi Analisis
              </div>
              <p className="text-slate-400 text-[11px] leading-normal">
                Setiap output diklasifikasikan dengan label <strong>FACT</strong>, <strong>INTERPRETATION</strong>, dan <strong>AI ANALYSIS</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Regulatory Disclaimer */}
        <div className="border-t border-slate-800/80 pt-6 text-[11px] text-slate-400 space-y-2 text-center sm:text-left">
          <p>
            <strong>Pemberitahuan Risiko Pasar Modal:</strong> Investasi saham mengandung risiko fluktuasi modal termasuk potensi kehilangan sebagian atau seluruh nilai pokok investasi. Informasi dan model skenario komputasi yang disediakan oleh StockAI Indonesia bukan merupakan ajakan membeli/menjual atau jaminan keuntungan dalam bentuk apa pun.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-2 text-slate-400">
            <span>© 2026 StockAI Indonesia. Phase 1 — UI & MVP (Simulated IDX Dataset).</span>
            <span className="flex items-center gap-1 mt-2 sm:mt-0">
              Built with precision for Indonesian Investors & Traders.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
