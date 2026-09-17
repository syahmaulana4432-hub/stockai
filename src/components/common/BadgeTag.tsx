import React from 'react';
import { AnalysisLabel } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ShieldAlert, Sparkles, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

interface BadgeTagProps {
  label: AnalysisLabel | 'FACT' | 'INTERPRETATION' | 'AI ANALYSIS' | 'BULLISH' | 'NEUTRAL' | 'BEARISH' | 'DIVIDEN' | 'RUPS' | string;
  variant?: 'solid' | 'outline' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function BadgeTag({ label, variant = 'subtle', size = 'sm', className }: BadgeTagProps) {
  const normalized = label.toUpperCase();

  const getStyle = () => {
    switch (normalized) {
      case 'FACT':
        return {
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          icon: <CheckCircle2 className="w-3 h-3 text-emerald-400" />,
          title: 'Fakta Terverifikasi (Data Historis/Laporan Keuangan)',
        };
      case 'INTERPRETATION':
        return {
          bg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          icon: <AlertTriangle className="w-3 h-3 text-amber-400" />,
          title: 'Interpretasi Pasar & Sentimen',
        };
      case 'AI ANALYSIS':
        return {
          bg: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30 shadow-indigo-950/40',
          icon: <Sparkles className="w-3 h-3 text-indigo-400" />,
          title: 'Pemodelan Algoritma AI & Skenario Probabilitas',
        };
      case 'BULLISH':
      case 'POSITIF':
      case 'BUY':
      case 'STRONG BUY':
        return {
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          icon: <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />,
          title: 'Bullish / Positif',
        };
      case 'BEARISH':
      case 'NEGATIF':
      case 'SELL':
      case 'STRONG SELL':
        return {
          bg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
          icon: <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />,
          title: 'Bearish / Negatif',
        };
      case 'NEUTRAL':
      case 'NETRAL':
        return {
          bg: 'bg-slate-500/10 text-slate-300 border-slate-500/30',
          icon: <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />,
          title: 'Netral',
        };
      case 'DIVIDEN':
        return {
          bg: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
          icon: <Layers className="w-3 h-3 text-teal-400" />,
          title: 'Dividen',
        };
      default:
        return {
          bg: 'bg-slate-800 text-slate-300 border-slate-700',
          icon: null,
          title: label,
        };
    }
  };

  const style = getStyle();
  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 font-medium tracking-wider',
    md: 'text-xs px-2.5 py-1 font-medium',
    lg: 'text-sm px-3 py-1.5 font-semibold',
  };

  return (
    <span
      title={style.title}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border transition-colors select-none uppercase',
        sizeClasses[size],
        style.bg,
        className
      )}
    >
      {style.icon}
      <span>{label}</span>
    </span>
  );
}
