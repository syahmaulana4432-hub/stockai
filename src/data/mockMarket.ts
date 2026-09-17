import { IndexData, MacroIndicator, MarketSentimentType } from '@/lib/types';
import { MOCK_STOCKS } from './mockStocks';

export const MOCK_INDICES: IndexData[] = [
  {
    symbol: 'IHSG',
    name: 'Indeks Harga Saham Gabungan (Composite)',
    value: 7815.42,
    change: 48.65,
    changePercent: 0.63,
    high: 7835.1,
    low: 7780.25,
    volume: 21500000000,
    source: 'Bursa Efek Indonesia (IDX) - Mock Phase 1',
    updatedAt: '2026-09-16T16:00:00+07:00',
  },
  {
    symbol: 'LQ45',
    name: 'Indeks LQ45 (45 Saham Paling Likuid)',
    value: 968.85,
    change: 7.22,
    changePercent: 0.75,
    high: 972.4,
    low: 963.1,
    volume: 14200000000,
    source: 'Bursa Efek Indonesia (IDX) - Mock Phase 1',
    updatedAt: '2026-09-16T16:00:00+07:00',
  },
  {
    symbol: 'IDX30',
    name: 'Indeks IDX30 (30 Saham Unggulan)',
    value: 494.3,
    change: 3.88,
    changePercent: 0.79,
    high: 496.5,
    low: 491.2,
    volume: 9800000000,
    source: 'Bursa Efek Indonesia (IDX) - Mock Phase 1',
    updatedAt: '2026-09-16T16:00:00+07:00',
  },
];

export const MOCK_MACRO: MacroIndicator[] = [
  {
    symbol: 'USD/IDR',
    name: 'US Dollar / Indonesian Rupiah',
    value: 15420,
    unit: 'IDR',
    change: -35,
    changePercent: -0.23,
    source: 'Bank Indonesia Jisdor - Mock',
    updatedAt: '2026-09-16T16:00:00+07:00',
  },
  {
    symbol: 'XAU/IDR',
    name: 'Emas (Gold) / Gram IDR',
    value: 1425000,
    unit: 'IDR/gr',
    change: 8500,
    changePercent: 0.6,
    source: 'Antam Logam Mulia - Mock',
    updatedAt: '2026-09-16T16:00:00+07:00',
  },
  {
    symbol: 'BTC/IDR',
    name: 'Bitcoin / IDR',
    value: 1045000000,
    unit: 'IDR',
    change: 28000000,
    changePercent: 2.75,
    source: 'Indodax / Crypto Market - Mock',
    updatedAt: '2026-09-16T16:00:00+07:00',
  },
];

export interface MarketSentimentSummary {
  sentiment: MarketSentimentType;
  score: number; // 0 to 100 (50 is neutral, >60 greed/bullish, <40 fear/bearish)
  title: string;
  summary: string;
  factors: {
    foreignFlow: string;
    advancingDecliningRatio: string;
    marketBreadth: string;
    macroVibe: string;
  };
}

export const MOCK_MARKET_SENTIMENT: MarketSentimentSummary = {
  sentiment: 'BULLISH',
  score: 68,
  title: 'Sentimen Pasar: Bullish (Greed Terkendali)',
  summary:
    'Pasar saham domestik didorong oleh arus beli bersih investor asing (foreign net buy) pada saham perbankan big cap serta penguatan nilai tukar Rupiah.',
  factors: {
    foreignFlow: 'Net Buy Rp 842 Miliar di Seluruh Pasar',
    advancingDecliningRatio: '312 Saham Naik vs 218 Saham Turun',
    marketBreadth: '72% Saham di atas MA50',
    macroVibe: 'Suku Bunga Acuan Stabil & Inflasi Terkendali di 2.4%',
  },
};

export const TOP_GAINERS = [...MOCK_STOCKS]
  .sort((a, b) => b.changePercent - a.changePercent)
  .slice(0, 5);

export const TOP_LOSERS = [...MOCK_STOCKS]
  .sort((a, b) => a.changePercent - b.changePercent)
  .slice(0, 5);

export const VOLUME_LEADERS = [...MOCK_STOCKS]
  .sort((a, b) => b.volume - a.volume)
  .slice(0, 5);

export const SECTOR_PERFORMANCE = [
  { name: 'Financials', changePercent: 1.15, isPositive: true },
  { name: 'Energy', changePercent: 1.42, isPositive: true },
  { name: 'Technology', changePercent: 3.85, isPositive: true },
  { name: 'Consumer Non-Cyclicals', changePercent: 0.85, isPositive: true },
  { name: 'Basic Materials', changePercent: -0.42, isPositive: false },
  { name: 'Infrastructures', changePercent: 0.65, isPositive: true },
  { name: 'Consumer Cyclicals', changePercent: -0.78, isPositive: false },
  { name: 'Healthcare', changePercent: 0.22, isPositive: true },
  { name: 'Properties & Real Estate', changePercent: -0.15, isPositive: false },
];
