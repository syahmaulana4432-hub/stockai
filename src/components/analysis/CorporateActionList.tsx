import React from 'react';
import { CorporateAction } from '@/lib/types';
import { BadgeTag } from '../common/BadgeTag';
import { Calendar, Layers, Users, Sparkles, AlertCircle } from 'lucide-react';
import { formatDateID } from '@/lib/utils';

interface CorporateActionListProps {
  corporateActions: CorporateAction[];
}

export function CorporateActionList({ corporateActions }: CorporateActionListProps) {
  if (!corporateActions || corporateActions.length === 0) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 text-center text-slate-500 text-xs">
        <AlertCircle className="w-5 h-5 mx-auto mb-2 text-slate-600" />
        Belum ada jadwal aksi korporasi terdekat untuk emiten ini.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-cyan-400" /> Kalender Aksi Korporasi Terdekat
        </h3>
        <BadgeTag label="FACT" size="sm" />
      </div>

      <div className="space-y-3">
        {corporateActions.map((ca) => (
          <div
            key={ca.id}
            className="rounded-xl border border-slate-800 bg-slate-900/80 p-4 hover:border-slate-700 transition-colors space-y-2.5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <BadgeTag label={ca.type} size="sm" />
                <h4 className="font-bold text-sm text-white">{ca.title}</h4>
              </div>
              {ca.amount && (
                <span className="font-bold text-sm text-emerald-400 font-mono bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-0.5 rounded-lg">
                  {ca.amount}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-300">{ca.description}</p>

            {/* Date Milestone timeline */}
            {(ca.cumDate || ca.exDate || ca.paymentDate) && (
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-[11px] font-mono">
                {ca.cumDate && (
                  <div className="rounded bg-slate-950/60 p-2 border border-slate-800/60">
                    <span className="text-[10px] text-slate-500 font-sans block">Cum Date</span>
                    <span className="font-semibold text-white">{formatDateID(ca.cumDate)}</span>
                  </div>
                )}
                {ca.exDate && (
                  <div className="rounded bg-slate-950/60 p-2 border border-slate-800/60">
                    <span className="text-[10px] text-slate-500 font-sans block">Ex Date</span>
                    <span className="font-semibold text-amber-300">{formatDateID(ca.exDate)}</span>
                  </div>
                )}
                {ca.paymentDate && (
                  <div className="rounded bg-slate-950/60 p-2 border border-slate-800/60">
                    <span className="text-[10px] text-slate-500 font-sans block">Payment Date</span>
                    <span className="font-semibold text-emerald-400">{formatDateID(ca.paymentDate)}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
