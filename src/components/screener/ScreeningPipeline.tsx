'use client';

import React from 'react';
import { PipelineStage } from '@/lib/globalTypes';
import { Layers, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

interface ScreeningPipelineProps {
  stages: PipelineStage[];
}

export function ScreeningPipeline({ stages }: ScreeningPipelineProps) {
  if (stages.length <= 1) return null;

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl backdrop-blur-md space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-cyan-400" /> Screening Pipeline & Elimination Funnel
        </h3>
        <span className="text-[10px] text-slate-500">Transparansi Tahapan Filter</span>
      </div>

      {/* Funnel Steps */}
      <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-1">
        {stages.map((stage, idx) => {
          const isLast = idx === stages.length - 1;

          return (
            <React.Fragment key={stage.id}>
              <div
                className={`flex items-center gap-2.5 rounded-xl border p-2.5 text-xs transition-all ${
                  isLast
                    ? 'border-emerald-500/50 bg-emerald-950/30 text-emerald-300 shadow-md shadow-emerald-950/30'
                    : 'border-slate-800 bg-slate-950/60 text-slate-300'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="text-[10px] text-slate-400 font-medium">{stage.name}</div>
                  <div className="text-sm font-bold font-mono text-white">
                    {stage.count}{' '}
                    <span className="text-[10px] font-normal text-slate-400 font-sans">Emiten</span>
                  </div>
                </div>

                {stage.dropped > 0 && (
                  <span className="text-[10px] text-rose-400 font-mono bg-rose-950/40 border border-rose-500/20 px-1.5 py-0.5 rounded">
                    -{stage.dropped}
                  </span>
                )}
              </div>

              {!isLast && (
                <ChevronRight className="w-4 h-4 text-slate-600 shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
