import React, { useState } from 'react';
import { METRIC_DEFINITIONS } from '@/data/mockScreenerData';
import { Info } from 'lucide-react';

interface IndicatorTooltipProps {
  field: string;
  label?: string;
  className?: string;
}

export function IndicatorTooltip({ field, label, className }: IndicatorTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const def = METRIC_DEFINITIONS[field];

  if (!def) return <span>{label || field}</span>;

  return (
    <span className="relative inline-flex items-center gap-1 group">
      <span>{label || def.title}</span>
      <button
        type="button"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="text-slate-400 hover:text-cyan-400 p-0.5 rounded transition-colors"
        title="Klik/Arahkan kursor untuk melihat edukasi indikator"
      >
        <Info className="w-3.5 h-3.5" />
      </button>

      {isOpen && (
        <div
          role="tooltip"
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 rounded-xl border border-slate-700 bg-slate-900 p-3 shadow-2xl text-left text-xs text-slate-200 pointer-events-none"
        >
          <div className="font-bold text-cyan-300 text-xs pb-1 border-b border-slate-800">
            {def.title}
          </div>
          <p className="text-[11px] text-slate-300 mt-1.5 leading-relaxed">{def.desc}</p>
          <div className="mt-2 rounded bg-slate-950/80 p-1.5 text-[10px] text-emerald-300 font-mono">
            💡 {def.interpretation}
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-700" />
        </div>
      )}
    </span>
  );
}
