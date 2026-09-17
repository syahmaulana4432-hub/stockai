'use client';

import React, { useState, useMemo } from 'react';
import { GLOBAL_INDICES_DETAILED, GlobalIndexDetail } from '@/data/mockIndicesHistory';
import { formatPercent } from '@/lib/utils';
import { BadgeTag } from '@/components/common/BadgeTag';
import { Activity, Clock, Globe, TrendingUp, Info } from 'lucide-react';

export function MainIndexChart() {
  const [selectedIndexId, setSelectedIndexId] = useState<string>('IHSG');
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | '6M' | '1Y'>('1M');
  const [hoveredPoint, setHoveredPoint] = useState<{ time: string; value: number } | null>(null);

  const currentIndex: GlobalIndexDetail = useMemo(() => {
    return GLOBAL_INDICES_DETAILED.find(idx => idx.id === selectedIndexId) || GLOBAL_INDICES_DETAILED[0];
  }, [selectedIndexId]);

  const historyPoints = useMemo(() => {
    return currentIndex.history[timeframe] || currentIndex.history['1M'];
  }, [currentIndex, timeframe]);

  const isUp = currentIndex.changePercent >= 0;

  // Chart coordinate mapping
  const width = 800;
  const height = 260;
  const padding = { top: 20, right: 20, bottom: 30, left: 60 };

  const values = historyPoints.map(p => p.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const valRange = maxVal - minVal || 1;

  const pointsString = useMemo(() => {
    return historyPoints.map((pt, idx) => {
      const x = padding.left + (idx / Math.max(1, historyPoints.length - 1)) * (width - padding.left - padding.right);
      const y = height - padding.bottom - ((pt.value - minVal) / valRange) * (height - padding.top - padding.bottom);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
  }, [historyPoints, minVal, valRange, width, height, padding]);

  const areaPointsString = useMemo(() => {
    const firstX = padding.left;
    const lastX = width - padding.right;
    const bottomY = height - padding.bottom;
    return `${firstX},${bottomY} ${pointsString} ${lastX},${bottomY}`;
  }, [pointsString, padding, width, height]);

  const firstVal = historyPoints[0]?.value || currentIndex.prevClose;
  const lastVal = historyPoints[historyPoints.length - 1]?.value || currentIndex.value;
  const periodChangePercent = firstVal > 0 ? ((lastVal - firstVal) / firstVal) * 100 : 0;
  const isPeriodUp = periodChangePercent >= 0;

  const strokeColor = isPeriodUp ? '#10b981' : '#f43f5e';
  const fillGradientId = `grad-${currentIndex.id}-${timeframe}`;

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 shadow-2xl backdrop-blur-md space-y-5">
      {/* Header with Index Switcher & Metric Snapshot */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 font-mono">
              {currentIndex.exchange} • {currentIndex.currency}
            </span>
            <span className="text-xs font-medium text-slate-400">{currentIndex.country}</span>
            <BadgeTag label="SIMULATED - PHASE 1" size="sm" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 font-mono">
            {currentIndex.name}
          </h2>
        </div>

        {/* Index Price & Change */}
        <div className="text-left md:text-right">
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">
            {hoveredPoint ? hoveredPoint.value.toLocaleString(undefined, { minimumFractionDigits: 2 }) : currentIndex.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className={`text-xs sm:text-sm font-bold font-mono mt-0.5 ${isPeriodUp ? 'text-emerald-400' : 'text-rose-400'}`}>
            <span>{isPeriodUp ? '+' : ''}{formatPercent(hoveredPoint ? ((hoveredPoint.value - firstVal) / firstVal) * 100 : periodChangePercent)}</span>
            <span className="text-[11px] text-slate-400 ml-1.5 font-normal">
              ({timeframe} Periode)
            </span>
          </div>
        </div>
      </div>

      {/* Index Selector Buttons Ribbon */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {GLOBAL_INDICES_DETAILED.map(idx => (
            <button
              key={idx.id}
              onClick={() => {
                setSelectedIndexId(idx.id);
                setHoveredPoint(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all whitespace-nowrap ${
                selectedIndexId === idx.id
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-950/40'
                  : 'bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {idx.id}
            </button>
          ))}
        </div>

        {/* Timeframe Selector */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
          {(['1D', '1W', '1M', '3M', '6M', '1Y'] as const).map(tf => (
            <button
              key={tf}
              onClick={() => {
                setTimeframe(tf);
                setHoveredPoint(null);
              }}
              className={`px-2.5 py-1 text-[11px] font-mono font-semibold rounded-lg transition-all ${
                timeframe === tf
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Canvas Area (SVG Responsive) */}
      <div className="relative w-full h-64 bg-slate-950/40 rounded-2xl border border-slate-800/80 overflow-hidden flex flex-col justify-end p-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full"
          preserveAspectRatio="none"
          onMouseLeave={() => setHoveredPoint(null)}
        >
          <defs>
            <linearGradient id={fillGradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity={0.25} />
              <stop offset="100%" stopColor={strokeColor} stopOpacity={0.0} />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1={padding.left} y1={padding.top} x2={width - padding.right} y2={padding.top} stroke="#334155" strokeDasharray="3 3" strokeOpacity="0.4" />
          <line x1={padding.left} y1={(height - padding.bottom + padding.top) / 2} x2={width - padding.right} y2={(height - padding.bottom + padding.top) / 2} stroke="#334155" strokeDasharray="3 3" strokeOpacity="0.4" />
          <line x1={padding.left} y1={height - padding.bottom} x2={width - padding.right} y2={height - padding.bottom} stroke="#334155" strokeDasharray="3 3" strokeOpacity="0.6" />

          {/* Area Fill */}
          <polygon points={areaPointsString} fill={`url(#${fillGradientId})`} />

          {/* Main Price Line */}
          <polyline
            fill="none"
            stroke={strokeColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={pointsString}
          />

          {/* Value Labels along Y axis */}
          <text x={padding.left - 8} y={padding.top + 4} fill="#64748b" fontSize="10" textAnchor="end" fontFamily="monospace">
            {maxVal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </text>
          <text x={padding.left - 8} y={(height - padding.bottom + padding.top) / 2 + 3} fill="#64748b" fontSize="10" textAnchor="end" fontFamily="monospace">
            {((maxVal + minVal) / 2).toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </text>
          <text x={padding.left - 8} y={height - padding.bottom} fill="#64748b" fontSize="10" textAnchor="end" fontFamily="monospace">
            {minVal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </text>
        </svg>

        {/* Hover point readout */}
        {hoveredPoint && (
          <div className="absolute top-4 left-16 bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-xl shadow-lg text-xs font-mono text-white">
            <span className="text-slate-400 mr-2">{hoveredPoint.time}</span>
            <span className="font-bold text-cyan-400">{hoveredPoint.value.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
        )}
      </div>

      {/* Index Metadata & Trading Hours Footer */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-mono">
        <div className="rounded-xl bg-slate-950/60 p-2.5 border border-slate-800/80">
          <span className="text-[10px] font-sans text-slate-400 block">Rentang Sesi (Low - High)</span>
          <span className="font-bold text-slate-200">
            {currentIndex.low.toLocaleString()} - {currentIndex.high.toLocaleString()}
          </span>
        </div>
        <div className="rounded-xl bg-slate-950/60 p-2.5 border border-slate-800/80">
          <span className="text-[10px] font-sans text-slate-400 block">Volume Pasar</span>
          <span className="font-bold text-slate-200">{currentIndex.volume}</span>
        </div>
        <div className="rounded-xl bg-slate-950/60 p-2.5 border border-slate-800/80">
          <span className="text-[10px] font-sans text-slate-400 block">Jam Perdagangan</span>
          <span className="font-bold text-cyan-300">{currentIndex.tradingHours}</span>
        </div>
        <div className="rounded-xl bg-slate-950/60 p-2.5 border border-slate-800/80">
          <span className="text-[10px] font-sans text-slate-400 block">Sumber Data Feed</span>
          <span className="font-semibold text-slate-400 truncate block">{currentIndex.source}</span>
        </div>
      </div>
    </div>
  );
}
