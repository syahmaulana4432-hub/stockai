import React from 'react';
import Link from 'next/link';
import { MOCK_NEWS_LIST, MOCK_CORPORATE_ACTIONS } from '@/data/mockNews';
import { BadgeTag } from '@/components/common/BadgeTag';
import { DisclaimerBanner } from '@/components/common/DisclaimerBanner';
import { formatDateID } from '@/lib/utils';
import { Newspaper, Calendar, ArrowUpRight, Sparkles, Filter } from 'lucide-react';

export default function NewsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-md bg-amber-500/10 px-2.5 py-1 text-xs font-semibold text-amber-400 border border-amber-500/20 mb-2">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Kabar Emiten & Aksi Korporasi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Berita Saham & Corporate Action BEI
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Informasi terkini pergerakan pasar, kebijakan moneter BI, laporan keuangan emiten, dan jadwal dividen.
          </p>
        </div>

        <BadgeTag label="FACT" size="md" />
      </div>

      <DisclaimerBanner mode="compact" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* News Feed - 2 Columns */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Newspaper className="w-4 h-4 text-cyan-400" /> Berita Terkini Pasar Modal
            </h2>
            <span className="text-xs text-slate-400">{MOCK_NEWS_LIST.length} Berita Terverifikasi</span>
          </div>

          <div className="space-y-4">
            {MOCK_NEWS_LIST.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg backdrop-blur-sm space-y-3 hover:border-slate-700 transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-cyan-400">{item.source}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-slate-400">
                      {new Date(item.publishedAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })} WIB
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-semibold">
                      {item.category}
                    </span>
                  </div>

                  <BadgeTag label={item.impact} size="sm" />
                </div>

                <h3 className="font-bold text-base text-white hover:text-cyan-300 transition-colors cursor-pointer">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.summary}
                </p>

                {/* Related Ticker Tags */}
                {item.relatedTickers.length > 0 && (
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                    <span className="text-[11px] text-slate-500">Emiten Terkait:</span>
                    <div className="flex items-center gap-1.5">
                      {item.relatedTickers.map((t) => (
                        <Link
                          key={t}
                          href={`/analysis/${t}`}
                          className="font-mono text-xs font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 px-2 py-0.5 rounded"
                        >
                          {t}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>

        {/* Corporate Actions Calendar - 1 Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-400" /> Kalender Aksi Korporasi
            </h2>
            <span className="text-xs text-slate-400">Jadwal Dividen</span>
          </div>

          <div className="space-y-3">
            {MOCK_CORPORATE_ACTIONS.map((ca) => (
              <div
                key={ca.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 space-y-2.5 shadow-md backdrop-blur-sm"
              >
                <div className="flex items-center justify-between">
                  <Link
                    href={`/analysis/${ca.ticker}`}
                    className="font-mono font-bold text-sm text-white hover:text-cyan-400 flex items-center gap-1"
                  >
                    <span>{ca.ticker}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
                  </Link>
                  <BadgeTag label={ca.type} size="sm" />
                </div>

                <div className="font-semibold text-xs text-slate-200">{ca.title}</div>
                <p className="text-xs text-slate-400">{ca.description}</p>

                {ca.cumDate && (
                  <div className="rounded-lg bg-slate-950 p-2 border border-slate-800/80 text-[11px] font-mono flex justify-between">
                    <span className="text-slate-400 font-sans">Cum Date:</span>
                    <span className="font-bold text-amber-300">{formatDateID(ca.cumDate)}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
