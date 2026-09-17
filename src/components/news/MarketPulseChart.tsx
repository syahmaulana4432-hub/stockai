'use client';

import React, { useState, useMemo } from 'react';
import { MOCK_NEWS_LIST } from '@/data/mockNews';
import { BadgeTag } from '@/components/common/BadgeTag';
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Activity,
  Info,
  Sparkles,
} from 'lucide-react';

interface PulsePoint {
  time: string; // "09:00", "10:00", ... or date
  price: number;
  dateKey: string; // YYYY-MM-DD
}

// 7-day intraday/daily index trend data ending at 2026-09-16
const MOCK_INDEX_DATA: PulsePoint[] = [
  { time: '10 Sep', price: 7710.4, dateKey: '2026-09-10' },
  { time: '11 Sep', price: 7745.2, dateKey: '2026-09-11' },
  { time: '12 Sep', price: 7730.8, dateKey: '2026-09-12' },
  { time: '13 Sep', price: 7762.5, dateKey: '2026-09-13' },
  { time: '14 Sep', price: 7780.1, dateKey: '2026-09-14' },
  { time: '15 Sep', price: 7795.6, dateKey: '2026-09-15' },
  { time: '16 Sep 09:30', price: 7802.4, dateKey: '2026-09-16' },
  { time: '16 Sep 11:30', price: 7818.9, dateKey: '2026-09-16' },
  { time: '16 Sep 14:00', price: 7810.2, dateKey: '2026-09-16' },
  { time: '16 Sep 15:49', price: 7815.35, dateKey: '2026-09-16' },
];

const PREV_CLOSE = 7766.45;
const CURRENT_PRICE = 7815.35;
const CHANGE_PTS = +(CURRENT_PRICE - PREV_CLOSE).toFixed(2);
const CHANGE_PCT = +((CHANGE_PTS / PREV_CLOSE) * 100).toFixed(2);

export function MarketPulseChart() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Group news by dateKey (YYYY-MM-DD)
  const newsByDate = useMemo(() => {
    const map: Record<string, typeof MOCK_NEWS_LIST> = {};
    MOCK_NEWS_LIST.forEach((item) => {
      const d = item.publishedAt.split('T')[0];
      if (!map[d]) map[d] = [];
      map[d].push(item);
    });
    return map;
  }, []);

  // SVG dimensions
  const width = 800;
  const height = 220;
  const padding = { top: 20, right: 30, bottom: 35, left: 55 };

  const minPrice = 7680;
  const maxPrice = 7840;

  const points = useMemo(() => {
    const usableWidth = width - padding.left - padding.right;
    const usableHeight = height - padding.top - padding.bottom;

    return MOCK_INDEX_DATA.map((d, i) => {
      const x = padding.left + (i / (MOCK_INDEX_DATA.length - 1)) * usableWidth;
      const y = padding.top + usableHeight - ((d.price - minPrice) / (maxPrice - minPrice)) * usableHeight;
      const newsForDay = newsByDate[d.dateKey] || [];
      return {
        ...d,
        x,
        y,
        news: newsForDay,
      };
    });
  }, [newsByDate]);

  // SVG path definitions
  const pathD = useMemo(() => {
    if (points.length === 0) return '';
    return points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`, '');
  }, [points]);

  const areaD = useMemo(() => {
    if (points.length === 0) return '';
    const usableHeight = height - padding.bottom;
    const first = points[0];
    const last = points[points.length - 1];
    return `${pathD} L ${last.x} ${usableHeight} L ${first.x} ${usableHeight} Z`;
  }, [points, pathD]);

  // Prev Close horizontal line Y
  const prevCloseY =
    padding.top +
    (height - padding.top - padding.bottom) -
    ((PREV_CLOSE - minPrice) / (maxPrice - minPrice)) * (height - padding.top - padding.bottom);

  const activePoint = hoveredIndex !== null ? points[hoveredIndex] : points[points.length - 1];

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-md overflow-hidden">
      {/* Header Bar */}
      <div className="p-5 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4 bg-slate-950/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Market Pulse: Pergerakan IHSG & Sentimen Berita</span>
              <BadgeTag label="FACT" size="sm" />
            </h3>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl">
            Korelasi visual antara pergerakan indeks dan tone pemberitaan pasar — bukan indikasi hubungan sebab-akibat.
          </p>
        </div>

        {/* Index Price & Change Summary */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="flex items-center justify-end gap-2">
              <span className="text-xs font-mono font-semibold text-slate-400">IHSG</span>
              <span className="text-xl font-black text-white font-mono">
                {activePoint.price.toLocaleString('id-ID', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex items-center justify-end gap-1.5 text-xs font-mono font-bold text-emerald-400">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+{CHANGE_PTS} (+{CHANGE_PCT}%)</span>
            </div>
          </div>

          {/* Date Picker / Navigation Controls */}
          <div className="flex items-center gap-1 border border-slate-800 bg-slate-950 p-1 rounded-xl">
            <button
              title="Hari Sebelumnya"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1 px-2 text-xs font-mono font-semibold text-slate-300">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>10 – 16 Sep 2026</span>
            </div>
            <button
              title="Hari Berikutnya"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* SVG Chart Area */}
      <div className="relative p-4 sm:p-6 bg-gradient-to-b from-slate-950/80 to-slate-900/60">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-48 sm:h-56 overflow-visible"
        >
          <defs>
            <linearGradient id="ihsgGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
              <stop offset="70%" stopColor="#10b981" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid lines */}
          {[7700, 7750, 7800].map((level) => {
            const y =
              padding.top +
              (height - padding.top - padding.bottom) -
              ((level - minPrice) / (maxPrice - minPrice)) * (height - padding.top - padding.bottom);
            return (
              <g key={level}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#334155"
                  strokeDasharray="3 3"
                  strokeOpacity="0.4"
                />
                <text
                  x={padding.left - 8}
                  y={y + 4}
                  fill="#64748b"
                  fontSize="10"
                  fontFamily="monospace"
                  textAnchor="end"
                >
                  {level}
                </text>
              </g>
            );
          })}

          {/* Dashed Previous Close Reference Line */}
          <line
            x1={padding.left}
            y1={prevCloseY}
            x2={width - padding.right}
            y2={prevCloseY}
            stroke="#94a3b8"
            strokeDasharray="4 4"
            strokeWidth="1.2"
            strokeOpacity="0.6"
          />
          <text
            x={width - padding.right}
            y={prevCloseY - 5}
            fill="#94a3b8"
            fontSize="9"
            fontFamily="monospace"
            textAnchor="end"
          >
            Prev Close: {PREV_CLOSE.toLocaleString('id-ID')}
          </text>

          {/* Area Fill */}
          <path d={areaD} fill="url(#ihsgGradient)" />

          {/* Solid Price Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Interactive News Overlay Markers */}
          {points.map((p, idx) => {
            const hasNews = p.news.length > 0;
            const hasNegative = p.news.some((n) => n.sentiment === 'Negatif');
            const hasPositive = p.news.some((n) => n.sentiment === 'Positif');
            const markerColor = hasNegative ? '#f43f5e' : hasPositive ? '#10b981' : '#94a3b8';

            return (
              <g
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="cursor-pointer"
              >
                {/* News Sentiment Circle Marker */}
                {hasNews && (
                  <>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="6"
                      fill={markerColor}
                      fillOpacity="0.3"
                      className="animate-pulse"
                    />
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r="3.5"
                      fill={markerColor}
                      stroke="#0f172a"
                      strokeWidth="1.5"
                    />
                  </>
                )}

                {/* X Axis Time Labels */}
                <text
                  x={p.x}
                  y={height - 8}
                  fill={hoveredIndex === idx ? '#38bdf8' : '#64748b'}
                  fontSize="9"
                  fontFamily="monospace"
                  textAnchor="middle"
                  fontWeight={hoveredIndex === idx ? 'bold' : 'normal'}
                >
                  {p.time}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover News Tooltip */}
        {hoveredIndex !== null && activePoint.news.length > 0 && (
          <div className="mt-3 p-3 rounded-xl border border-cyan-500/40 bg-slate-950/95 shadow-2xl space-y-1.5 backdrop-blur-md">
            <div className="flex items-center justify-between text-[11px] border-b border-slate-800 pb-1 font-mono">
              <span className="font-bold text-cyan-400">
                📅 Rilis Berita pada {activePoint.time} (IHSG: {activePoint.price.toLocaleString('id-ID')})
              </span>
              <span className="text-slate-400">{activePoint.news.length} Artikel Terkait</span>
            </div>
            <ul className="space-y-1">
              {activePoint.news.slice(0, 3).map((item) => (
                <li key={item.id} className="text-xs text-slate-200 flex items-start gap-1.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                      item.sentiment === 'Positif'
                        ? 'bg-emerald-400'
                        : item.sentiment === 'Negatif'
                        ? 'bg-rose-400'
                        : 'bg-amber-400'
                    }`}
                  />
                  <span className="line-clamp-1">{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 2-Column Statistics Grid */}
      <div className="p-4 sm:p-5 border-t border-slate-800/80 bg-slate-950/80 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
        {/* Left Column: Intraday Range */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5 space-y-2">
          <div className="flex items-center justify-between font-sans border-b border-slate-800/60 pb-1.5">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>Statistik Intraday (Price Range)</span>
            </span>
            <BadgeTag label="FACT" size="sm" />
          </div>
          <div className="grid grid-cols-3 gap-2 pt-1 text-center">
            <div>
              <span className="text-[10px] text-slate-400 block font-sans">Open</span>
              <strong className="text-white">7.790,20</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-sans">High (Tertinggi)</span>
              <strong className="text-emerald-400">7.828,45</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-sans">Low (Terendah)</span>
              <strong className="text-rose-400">7.785,10</strong>
            </div>
          </div>
        </div>

        {/* Right Column: Market Activity */}
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/60 p-3.5 space-y-2">
          <div className="flex items-center justify-between font-sans border-b border-slate-800/60 pb-1.5">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
              <span>Market Activity (Volume & Nilai)</span>
            </span>
            <BadgeTag label="FACT" size="sm" />
          </div>
          <div className="grid grid-cols-3 gap-2 pt-1 text-center">
            <div>
              <span className="text-[10px] text-slate-400 block font-sans">Total Volume</span>
              <strong className="text-white">22,4 Miliar Lembar</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-sans">Total Nilai Transaksi</span>
              <strong className="text-cyan-300">Rp 12,85 Triliun</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-sans">Frekuensi Transaksi</span>
              <strong className="text-indigo-300">1,24 Juta Kali</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
