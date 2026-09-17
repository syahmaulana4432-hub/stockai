import React from 'react';
import { FinancialStatementItem, KeyRatios } from '@/lib/types';
import { formatMarketCap, formatIDR, formatPercent } from '@/lib/utils';
import { BadgeTag } from '../common/BadgeTag';
import { Landmark, TrendingUp, DollarSign, PieChart, ShieldCheck } from 'lucide-react';

interface KeyRatiosGridProps {
  ratios: KeyRatios;
  sector: string;
}

export function KeyRatiosGrid({ ratios, sector }: KeyRatiosGridProps) {
  const items = [
    {
      label: 'PER (Price to Earnings)',
      value: `${ratios.per.toFixed(1)}x`,
      desc: 'Valuasi terhadap laba tahunan',
      status: ratios.per < 15 ? 'Atraktif' : 'Premium',
      isGood: ratios.per < 15,
    },
    {
      label: 'PBV (Price to Book)',
      value: `${ratios.pbv.toFixed(2)}x`,
      desc: 'Valuasi terhadap ekuitas bersih',
      status: ratios.pbv < 2.5 ? 'Wajar' : 'Tinggi',
      isGood: ratios.pbv < 2.5,
    },
    {
      label: 'ROE (Return on Equity)',
      value: `${ratios.roe.toFixed(1)}%`,
      desc: 'Profitabilitas modal sendiri',
      status: ratios.roe > 15 ? 'Sangat Kuat' : 'Standar',
      isGood: ratios.roe > 15,
    },
    {
      label: 'ROA (Return on Assets)',
      value: `${ratios.roa.toFixed(1)}%`,
      desc: 'Efisiensi total aset',
      status: ratios.roa > 3 ? 'Efisien' : 'Cukup',
      isGood: ratios.roa > 3,
    },
    {
      label: 'DER (Debt to Equity)',
      value: `${ratios.der.toFixed(2)}x`,
      desc: 'Tingkat utang berbunga',
      status: ratios.der < 1.0 ? 'Konservatif / Aman' : 'Tinggi',
      isGood: ratios.der < 1.0,
    },
    {
      label: 'Dividend Yield',
      value: `${ratios.dividendYield.toFixed(1)}%`,
      desc: 'Estimasi yield dividen tahunan',
      status: ratios.dividendYield > 4 ? 'Tinggi' : 'Moderat',
      isGood: ratios.dividendYield > 4,
    },
    {
      label: 'EPS (Laba per Saham)',
      value: formatIDR(ratios.eps),
      desc: 'Laba bersih per lembar saham',
      status: 'Annualized',
      isGood: true,
    },
    {
      label: 'Net Profit Margin (NPM)',
      value: `${ratios.netProfitMargin.toFixed(1)}%`,
      desc: 'Marjin keuntungan bersih',
      status: ratios.netProfitMargin > 15 ? 'Superior' : 'Standar',
      isGood: ratios.netProfitMargin > 15,
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
          <PieChart className="w-4 h-4 text-cyan-400" /> Rasio Finansial Utama
        </h3>
        <BadgeTag label="FACT" size="sm" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-slate-800 bg-slate-900/80 p-3 hover:border-slate-700 transition-colors"
          >
            <span className="text-[11px] text-slate-400 block font-medium truncate">{item.label}</span>
            <div className="text-lg font-bold text-white mt-1 font-mono">{item.value}</div>
            <div className="mt-1 flex items-center justify-between text-[10px]">
              <span className="text-slate-400 truncate">{item.desc}</span>
              <span
                className={`font-semibold shrink-0 ml-1 ${
                  item.isGood ? 'text-emerald-400' : 'text-slate-300'
                }`}
              >
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FundamentalTable({ financials }: { financials: FinancialStatementItem[] }) {
  if (!financials || financials.length === 0) return null;

  return (
    <div className="space-y-3 mt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
          <Landmark className="w-4 h-4 text-indigo-400" /> Ringkasan Laporan Keuangan (Audit)
        </h3>
        <BadgeTag label="FACT" size="sm" />
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/80">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-950/80 text-slate-400 font-semibold border-b border-slate-800">
            <tr>
              <th className="p-3">Pos Keuangan (Miliar / Triliun IDR)</th>
              {financials.map((f) => (
                <th key={f.year} className="p-3 text-right font-mono">
                  FY {f.year}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono">
            <tr className="hover:bg-slate-800/30">
              <td className="p-3 font-sans font-medium text-slate-200">Pendapatan Usaha (Revenue)</td>
              {financials.map((f) => (
                <td key={f.year} className="p-3 text-right text-white font-semibold">
                  {formatMarketCap(f.revenue)}
                </td>
              ))}
            </tr>
            <tr className="hover:bg-slate-800/30">
              <td className="p-3 font-sans font-medium text-slate-200">Laba Kotor (Gross Profit)</td>
              {financials.map((f) => (
                <td key={f.year} className="p-3 text-right text-slate-300">
                  {formatMarketCap(f.grossProfit)}
                </td>
              ))}
            </tr>
            <tr className="hover:bg-slate-800/30">
              <td className="p-3 font-sans font-medium text-slate-200">Laba Usaha (Operating Profit)</td>
              {financials.map((f) => (
                <td key={f.year} className="p-3 text-right text-slate-300">
                  {formatMarketCap(f.operatingProfit)}
                </td>
              ))}
            </tr>
            <tr className="hover:bg-slate-800/30 bg-emerald-950/10">
              <td className="p-3 font-sans font-bold text-emerald-300">Laba Bersih (Net Income)</td>
              {financials.map((f) => (
                <td key={f.year} className="p-3 text-right font-bold text-emerald-400">
                  {formatMarketCap(f.netIncome)}
                </td>
              ))}
            </tr>
            <tr className="hover:bg-slate-800/30">
              <td className="p-3 font-sans font-medium text-slate-200">Total Aset (Assets)</td>
              {financials.map((f) => (
                <td key={f.year} className="p-3 text-right text-slate-300">
                  {formatMarketCap(f.totalAssets)}
                </td>
              ))}
            </tr>
            <tr className="hover:bg-slate-800/30">
              <td className="p-3 font-sans font-medium text-slate-200">Total Liabilitas (Liabilities)</td>
              {financials.map((f) => (
                <td key={f.year} className="p-3 text-right text-slate-300">
                  {formatMarketCap(f.totalLiabilities)}
                </td>
              ))}
            </tr>
            <tr className="hover:bg-slate-800/30">
              <td className="p-3 font-sans font-medium text-slate-200">Total Ekuitas (Equity)</td>
              {financials.map((f) => (
                <td key={f.year} className="p-3 text-right text-slate-300">
                  {formatMarketCap(f.totalEquity)}
                </td>
              ))}
            </tr>
            <tr className="hover:bg-slate-800/30">
              <td className="p-3 font-sans font-medium text-slate-200">Kas & Setara Kas</td>
              {financials.map((f) => (
                <td key={f.year} className="p-3 text-right text-cyan-300">
                  {formatMarketCap(f.cashAndEquivalents)}
                </td>
              ))}
            </tr>
            <tr className="hover:bg-slate-800/30">
              <td className="p-3 font-sans font-medium text-slate-200">Arus Kas Bebas (FCF)</td>
              {financials.map((f) => (
                <td key={f.year} className="p-3 text-right text-emerald-400">
                  {formatMarketCap(f.freeCashFlow)}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
