'use client';

import React from 'react';
import { Calendar, Clock, AlertCircle, Globe } from 'lucide-react';
import { BadgeTag } from '@/components/common/BadgeTag';

interface EconomicEvent {
  id: string;
  country: string;
  flag: string;
  date: string;
  time: string;
  event: string;
  impact: 'TINGGI' | 'SEDANG' | 'RENDAH';
  forecast: string;
  previous: string;
}

export function EconomicCalendarWidget() {
  const events: EconomicEvent[] = [
    {
      id: 'e-1',
      country: 'United States',
      flag: '🇺🇸',
      date: '18 Sep 2026',
      time: '01:00 WIB',
      event: 'FOMC Interest Rate Decision & Fed Economic Projections',
      impact: 'TINGGI',
      forecast: '5.00%',
      previous: '5.25%'
    },
    {
      id: 'e-2',
      country: 'Indonesia',
      flag: '🇮🇩',
      date: '18 Sep 2026',
      time: '14:00 WIB',
      event: 'Rapat Dewan Gubernur (RDG) Bank Indonesia - BI Rate',
      impact: 'TINGGI',
      forecast: '6.00%',
      previous: '6.00%'
    },
    {
      id: 'e-3',
      country: 'Japan',
      flag: '🇯🇵',
      date: '20 Sep 2026',
      time: '10:00 WIB',
      event: 'Bank of Japan (BOJ) Policy Rate & Outlook Report',
      impact: 'TINGGI',
      forecast: '0.25%',
      previous: '0.25%'
    },
    {
      id: 'e-4',
      country: 'Indonesia',
      flag: '🇮🇩',
      date: '22 Sep 2026',
      time: '11:00 WIB',
      event: 'Data Neraca Perdagangan & Ekspor/Impor BPS',
      impact: 'SEDANG',
      forecast: '+$2.8 B',
      previous: '+$3.1 B'
    }
  ];

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-5 sm:p-6 shadow-2xl backdrop-blur-md space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
            Global Economic Calendar
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
            Agenda Kebijakan Moneter &amp; Rilis Makro Utama
          </h3>
        </div>
        <BadgeTag label="HIGH IMPACT" size="sm" />
      </div>

      <div className="space-y-2.5">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-2xl border border-slate-800 bg-slate-950/40 hover:border-slate-700 transition-colors gap-3"
          >
            <div className="flex items-start gap-3 min-w-0">
              <span className="text-xl shrink-0 mt-0.5">{ev.flag}</span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-bold text-xs sm:text-sm text-white">{ev.event}</h4>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      ev.impact === 'TINGGI'
                        ? 'bg-rose-950/80 text-rose-300 border border-rose-500/30'
                        : 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {ev.impact}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1 font-mono">
                  <span>📅 {ev.date} ({ev.time})</span>
                  <span>•</span>
                  <span>Prediksi: <strong className="text-slate-200">{ev.forecast}</strong></span>
                  <span>•</span>
                  <span>Sebelumnya: <strong className="text-slate-400">{ev.previous}</strong></span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
