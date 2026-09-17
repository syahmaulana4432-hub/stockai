'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Candle, TechnicalIndicators } from '@/lib/types';
import {
  calculateSMA,
  calculateEMA,
  calculateBollingerBands,
  calculateVWAP,
  findSupportResistance,
} from '@/lib/indicators';
import { formatIDR, formatVolume, formatDateID } from '@/lib/utils';
import { Layers, Eye, EyeOff, Maximize2, Settings2 } from 'lucide-react';

interface CandleStickChartProps {
  candles: Candle[];
  ticker: string;
  height?: number;
}

export function CandleStickChart({ candles, ticker, height = 440 }: CandleStickChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Indicators toggle state
  const [showSMA20, setShowSMA20] = useState(true);
  const [showSMA50, setShowSMA50] = useState(true);
  const [showSMA200, setShowSMA200] = useState(false);
  const [showEMA20, setShowEMA20] = useState(false);
  const [showBollinger, setShowBollinger] = useState(false);
  const [showVWAP, setShowVWAP] = useState(false);
  const [showSupportResistance, setShowSupportResistance] = useState(true);
  const [showVolume, setShowVolume] = useState(true);

  // Hover state
  const [hoverData, setHoverData] = useState<{
    candle: Candle;
    sma20?: number;
    sma50?: number;
    sma200?: number;
    ema20?: number;
    vwap?: number;
    bbUpper?: number;
    bbLower?: number;
    x: number;
    y: number;
  } | null>(null);

  // Calculated indicator series
  const sma20 = useMemo(() => calculateSMA(candles, 20), [candles]);
  const sma50 = useMemo(() => calculateSMA(candles, 50), [candles]);
  const sma200 = useMemo(() => calculateSMA(candles, 200), [candles]);
  const ema20 = useMemo(() => calculateEMA(candles, 20), [candles]);
  const bb = useMemo(() => calculateBollingerBands(candles, 20, 2), [candles]);
  const vwap = useMemo(() => calculateVWAP(candles), [candles]);
  const { supports, resistances } = useMemo(() => findSupportResistance(candles), [candles]);

  // Render Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current || candles.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const containerWidth = containerRef.current.clientWidth;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = containerWidth * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, containerWidth, height);

    // Padding
    const padding = { top: 25, right: 65, bottom: 35, left: 15 };
    const chartWidth = containerWidth - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Price scaling
    let minPrice = Infinity;
    let maxPrice = -Infinity;
    let maxVolume = 0;

    candles.forEach((c, idx) => {
      if (c.low < minPrice) minPrice = c.low;
      if (c.high > maxPrice) maxPrice = c.high;
      if (c.volume > maxVolume) maxVolume = c.volume;

      if (showBollinger) {
        if (!isNaN(bb.lower[idx]) && bb.lower[idx] < minPrice) minPrice = bb.lower[idx];
        if (!isNaN(bb.upper[idx]) && bb.upper[idx] > maxPrice) maxPrice = bb.upper[idx];
      }
    });

    const priceMargin = (maxPrice - minPrice) * 0.08 || 10;
    minPrice = Math.max(0, minPrice - priceMargin);
    maxPrice += priceMargin;
    const priceRange = maxPrice - minPrice || 1;

    const getY = (price: number) => {
      return padding.top + chartHeight * (1 - (price - minPrice) / priceRange);
    };

    const candleWidth = Math.max(2, (chartWidth / candles.length) * 0.7);
    const candleSpacing = chartWidth / candles.length;

    // Draw Grid Lines
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);

    const gridRows = 5;
    for (let i = 0; i <= gridRows; i++) {
      const y = padding.top + (chartHeight / gridRows) * i;
      const priceVal = maxPrice - (priceRange / gridRows) * i;

      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartWidth, y);
      ctx.stroke();

      // Right axis price label
      ctx.fillStyle = '#64748b';
      ctx.font = '10px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(formatIDR(Math.round(priceVal), false), padding.left + chartWidth + 6, y + 3);
    }
    ctx.setLineDash([]);

    // Draw Support & Resistance horizontal zones
    if (showSupportResistance) {
      supports.forEach((sup, idx) => {
        const y = getY(sup);
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([6, 3]);
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(padding.left + chartWidth, y);
        ctx.stroke();
        ctx.fillStyle = '#10b981';
        ctx.font = '9px sans-serif';
        ctx.fillText(`S${idx + 1} (${formatIDR(sup, false)})`, padding.left + chartWidth + 6, y + 3);
      });

      resistances.forEach((res, idx) => {
        const y = getY(res);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([6, 3]);
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(padding.left + chartWidth, y);
        ctx.stroke();
        ctx.fillStyle = '#ef4444';
        ctx.font = '9px sans-serif';
        ctx.fillText(`R${idx + 1} (${formatIDR(res, false)})`, padding.left + chartWidth + 6, y + 3);
      });
      ctx.setLineDash([]);
    }

    // Draw Volume Bars (at bottom 22% of chart)
    if (showVolume && maxVolume > 0) {
      const volAreaHeight = chartHeight * 0.22;
      const volBaseline = padding.top + chartHeight;

      candles.forEach((c, i) => {
        const x = padding.left + i * candleSpacing + candleSpacing / 2;
        const barHeight = (c.volume / maxVolume) * volAreaHeight;
        const isUp = c.close >= c.open;

        ctx.fillStyle = isUp ? 'rgba(16, 185, 129, 0.25)' : 'rgba(239, 68, 68, 0.25)';
        ctx.fillRect(x - candleWidth / 2, volBaseline - barHeight, candleWidth, barHeight);
      });
    }

    // Helper to draw indicator line
    const drawLine = (data: number[], color: string, lineWidth = 1.5) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      let started = false;

      data.forEach((val, i) => {
        if (!isNaN(val)) {
          const x = padding.left + i * candleSpacing + candleSpacing / 2;
          const y = getY(val);
          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else {
            ctx.lineTo(x, y);
          }
        }
      });
      ctx.stroke();
    };

    // Draw Bollinger Bands (Area and lines)
    if (showBollinger) {
      drawLine(bb.upper, 'rgba(56, 189, 248, 0.6)', 1.2);
      drawLine(bb.middle, 'rgba(251, 191, 36, 0.8)', 1.2);
      drawLine(bb.lower, 'rgba(56, 189, 248, 0.6)', 1.2);
    }

    // Draw Moving Averages
    if (showSMA20) drawLine(sma20, '#38bdf8', 1.8); // Sky Blue
    if (showSMA50) drawLine(sma50, '#fbbf24', 1.8); // Amber
    if (showSMA200) drawLine(sma200, '#a855f7', 2.0); // Purple
    if (showEMA20) drawLine(ema20, '#ec4899', 1.8); // Pink
    if (showVWAP) drawLine(vwap, '#14b8a6', 1.5); // Teal

    // Draw Candlesticks
    candles.forEach((c, i) => {
      const x = padding.left + i * candleSpacing + candleSpacing / 2;
      const openY = getY(c.open);
      const closeY = getY(c.close);
      const highY = getY(c.high);
      const lowY = getY(c.low);

      const isUp = c.close >= c.open;
      const color = isUp ? '#10b981' : '#ef4444'; // Emerald / Rose

      // Draw Wick
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(x, highY);
      ctx.lineTo(x, lowY);
      ctx.stroke();

      // Draw Candle Body
      const bodyTop = Math.min(openY, closeY);
      const bodyHeight = Math.max(1.5, Math.abs(closeY - openY));

      ctx.fillStyle = color;
      ctx.fillRect(x - candleWidth / 2, bodyTop, candleWidth, bodyHeight);
    });

    // Draw Date labels on bottom axis
    ctx.fillStyle = '#64748b';
    ctx.font = '9px sans-serif';
    ctx.textAlign = 'center';
    const dateStep = Math.max(1, Math.floor(candles.length / 6));
    for (let i = 0; i < candles.length; i += dateStep) {
      const x = padding.left + i * candleSpacing + candleSpacing / 2;
      const dateStr = candles[i].time.slice(5); // MM-DD
      ctx.fillText(dateStr, x, height - 12);
    }
  }, [
    candles,
    height,
    showSMA20,
    showSMA50,
    showSMA200,
    showEMA20,
    showBollinger,
    showVWAP,
    showSupportResistance,
    showVolume,
    sma20,
    sma50,
    sma200,
    ema20,
    bb,
    vwap,
    supports,
    resistances,
  ]);

  // Mouse Move Handler for Tooltip
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || candles.length === 0) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const padding = { left: 15, right: 65 };
    const chartWidth = rect.width - padding.left - padding.right;
    const candleSpacing = chartWidth / candles.length;

    const index = Math.floor((x - padding.left) / candleSpacing);
    if (index >= 0 && index < candles.length) {
      setHoverData({
        candle: candles[index],
        sma20: isNaN(sma20[index]) ? undefined : sma20[index],
        sma50: isNaN(sma50[index]) ? undefined : sma50[index],
        sma200: isNaN(sma200[index]) ? undefined : sma200[index],
        ema20: isNaN(ema20[index]) ? undefined : ema20[index],
        vwap: isNaN(vwap[index]) ? undefined : vwap[index],
        bbUpper: isNaN(bb.upper[index]) ? undefined : bb.upper[index],
        bbLower: isNaN(bb.lower[index]) ? undefined : bb.lower[index],
        x,
        y,
      });
    }
  };

  const handleMouseLeave = () => {
    setHoverData(null);
  };

  const latestCandle = candles[candles.length - 1];
  const activeCandle = hoverData ? hoverData.candle : latestCandle;

  return (
    <div className="w-full rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl backdrop-blur-md">
      {/* Top Header & Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-base font-bold text-white">{ticker}</span>
            <span className="text-xs text-slate-400">Daily Chart</span>
          </div>

          {/* Candle Data Bar */}
          {activeCandle && (
            <div className="hidden sm:flex items-center gap-3 text-xs font-mono">
              <span className="text-slate-400">
                T: <strong className="text-slate-200">{activeCandle.time}</strong>
              </span>
              <span className="text-slate-400">
                O: <strong className="text-white">{formatIDR(activeCandle.open, false)}</strong>
              </span>
              <span className="text-slate-400">
                H: <strong className="text-emerald-400">{formatIDR(activeCandle.high, false)}</strong>
              </span>
              <span className="text-slate-400">
                L: <strong className="text-rose-400">{formatIDR(activeCandle.low, false)}</strong>
              </span>
              <span className="text-slate-400">
                C:{' '}
                <strong
                  className={activeCandle.close >= activeCandle.open ? 'text-emerald-400' : 'text-rose-400'}
                >
                  {formatIDR(activeCandle.close, false)}
                </strong>
              </span>
              <span className="text-slate-400">
                Vol: <strong className="text-cyan-400">{formatVolume(activeCandle.volume)}</strong>
              </span>
            </div>
          )}
        </div>

        {/* Indicator Toggles */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            onClick={() => setShowSMA20(!showSMA20)}
            className={`px-2 py-0.5 rounded border transition-colors ${
              showSMA20
                ? 'bg-sky-500/20 border-sky-400 text-sky-300 font-semibold'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            SMA 20
          </button>
          <button
            onClick={() => setShowSMA50(!showSMA50)}
            className={`px-2 py-0.5 rounded border transition-colors ${
              showSMA50
                ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-semibold'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            SMA 50
          </button>
          <button
            onClick={() => setShowSMA200(!showSMA200)}
            className={`px-2 py-0.5 rounded border transition-colors ${
              showSMA200
                ? 'bg-purple-500/20 border-purple-400 text-purple-300 font-semibold'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            SMA 200
          </button>
          <button
            onClick={() => setShowBollinger(!showBollinger)}
            className={`px-2 py-0.5 rounded border transition-colors ${
              showBollinger
                ? 'bg-blue-500/20 border-blue-400 text-blue-300 font-semibold'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            BB (20,2)
          </button>
          <button
            onClick={() => setShowSupportResistance(!showSupportResistance)}
            className={`px-2 py-0.5 rounded border transition-colors ${
              showSupportResistance
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-semibold'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            S/R Zones
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div ref={containerRef} className="relative w-full mt-2 cursor-crosshair">
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full block"
        />
      </div>

      {/* Active Legend Indicator Values */}
      <div className="mt-2 flex flex-wrap items-center gap-4 text-[11px] text-slate-400 border-t border-slate-800/80 pt-2 font-mono">
        {showSMA20 && (
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
            SMA20: <strong className="text-white">{formatIDR(hoverData?.sma20 || sma20[sma20.length - 1], false)}</strong>
          </span>
        )}
        {showSMA50 && (
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            SMA50: <strong className="text-white">{formatIDR(hoverData?.sma50 || sma50[sma50.length - 1], false)}</strong>
          </span>
        )}
        {showSMA200 && (
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
            SMA200: <strong className="text-white">{formatIDR(hoverData?.sma200 || sma200[sma200.length - 1], false)}</strong>
          </span>
        )}
        {showBollinger && (
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
            BB Upper: <strong className="text-white">{formatIDR(hoverData?.bbUpper || bb.upper[bb.upper.length - 1], false)}</strong> | Lower: <strong className="text-white">{formatIDR(hoverData?.bbLower || bb.lower[bb.lower.length - 1], false)}</strong>
          </span>
        )}
      </div>
    </div>
  );
}
