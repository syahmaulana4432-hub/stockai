'use client';

import React, { useRef, useEffect } from 'react';
import { Candle } from '@/lib/types';
import { calculateRSI, calculateMACD } from '@/lib/indicators';

interface IndicatorChartProps {
  candles: Candle[];
  type: 'RSI' | 'MACD';
  height?: number;
}

export function IndicatorChart({ candles, type, height = 150 }: IndicatorChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

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

    const padding = { top: 15, right: 65, bottom: 20, left: 15 };
    const chartWidth = containerWidth - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;
    const candleSpacing = chartWidth / candles.length;

    if (type === 'RSI') {
      const rsiData = calculateRSI(candles, 14);

      const getY = (val: number) => {
        return padding.top + chartHeight * (1 - Math.max(0, Math.min(100, val)) / 100);
      };

      // Draw 70 Overbought and 30 Oversold reference lines & colored zone
      const y70 = getY(70);
      const y30 = getY(30);

      ctx.fillStyle = 'rgba(99, 102, 241, 0.05)';
      ctx.fillRect(padding.left, y70, chartWidth, y30 - y70);

      // Line 70 (Overbought)
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(padding.left, y70);
      ctx.lineTo(padding.left + chartWidth, y70);
      ctx.stroke();

      ctx.fillStyle = '#ef4444';
      ctx.font = '10px monospace';
      ctx.fillText('70 (OB)', padding.left + chartWidth + 6, y70 + 3);

      // Line 30 (Oversold)
      ctx.strokeStyle = '#10b981';
      ctx.beginPath();
      ctx.moveTo(padding.left, y30);
      ctx.lineTo(padding.left + chartWidth, y30);
      ctx.stroke();

      ctx.fillStyle = '#10b981';
      ctx.fillText('30 (OS)', padding.left + chartWidth + 6, y30 + 3);
      ctx.setLineDash([]);

      // Draw RSI line
      ctx.strokeStyle = '#a855f7'; // Purple
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      let started = false;

      rsiData.forEach((val, i) => {
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

      // Current RSI badge
      const latestRSI = rsiData[rsiData.length - 1];
      if (!isNaN(latestRSI)) {
        ctx.fillStyle = latestRSI >= 70 ? '#ef4444' : latestRSI <= 30 ? '#10b981' : '#a855f7';
        ctx.font = 'bold 11px monospace';
        ctx.fillText(`RSI 14: ${latestRSI.toFixed(1)}`, padding.left, padding.top - 3);
      }
    } else if (type === 'MACD') {
      const { macdLine, signalLine, histogram } = calculateMACD(candles, 12, 26, 9);

      let maxVal = -Infinity;
      let minVal = Infinity;

      for (let i = 0; i < candles.length; i++) {
        if (!isNaN(macdLine[i])) {
          maxVal = Math.max(maxVal, macdLine[i], signalLine[i] || 0, histogram[i] || 0);
          minVal = Math.min(minVal, macdLine[i], signalLine[i] || 0, histogram[i] || 0);
        }
      }

      const bound = Math.max(Math.abs(maxVal), Math.abs(minVal)) * 1.2 || 10;
      const getY = (val: number) => {
        return padding.top + chartHeight * (0.5 - (val / (2 * bound)));
      };

      const yZero = getY(0);

      // Draw Zero baseline
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padding.left, yZero);
      ctx.lineTo(padding.left + chartWidth, yZero);
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = '10px monospace';
      ctx.fillText('0.00', padding.left + chartWidth + 6, yZero + 3);

      // Draw Histogram Bars
      const barWidth = Math.max(1.5, candleSpacing * 0.6);
      histogram.forEach((h, i) => {
        if (!isNaN(h)) {
          const x = padding.left + i * candleSpacing + candleSpacing / 2;
          const y = getY(h);
          const barHeight = Math.abs(y - yZero);
          const isPos = h >= 0;

          ctx.fillStyle = isPos ? 'rgba(16, 185, 129, 0.6)' : 'rgba(239, 68, 68, 0.6)';
          ctx.fillRect(
            x - barWidth / 2,
            isPos ? y : yZero,
            barWidth,
            barHeight || 1
          );
        }
      });

      // Draw MACD Line (Blue)
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      let started = false;
      macdLine.forEach((val, i) => {
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

      // Draw Signal Line (Amber)
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      started = false;
      signalLine.forEach((val, i) => {
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

      // Header label
      const latestMacd = macdLine[macdLine.length - 1];
      const latestSig = signalLine[signalLine.length - 1];
      const latestHist = histogram[histogram.length - 1];
      ctx.font = 'bold 10px monospace';
      ctx.fillStyle = '#38bdf8';
      ctx.fillText(`MACD: ${isNaN(latestMacd) ? '-' : latestMacd.toFixed(1)}`, padding.left, padding.top - 2);
      ctx.fillStyle = '#f59e0b';
      ctx.fillText(`Signal: ${isNaN(latestSig) ? '-' : latestSig.toFixed(1)}`, padding.left + 90, padding.top - 2);
      ctx.fillStyle = latestHist >= 0 ? '#10b981' : '#ef4444';
      ctx.fillText(`Hist: ${isNaN(latestHist) ? '-' : latestHist.toFixed(1)}`, padding.left + 180, padding.top - 2);
    }
  }, [candles, type, height]);

  return (
    <div className="w-full rounded-xl border border-slate-800 bg-slate-900/80 p-3 shadow-md backdrop-blur-sm">
      <div ref={containerRef} className="w-full">
        <canvas ref={canvasRef} className="w-full block" />
      </div>
    </div>
  );
}
