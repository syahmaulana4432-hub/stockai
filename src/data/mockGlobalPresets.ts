import { PresetTemplate } from '@/lib/globalTypes';

export const GLOBAL_PRESET_SCREENERS: PresetTemplate[] = [
  {
    id: 'global-value',
    name: 'Global Value',
    description: 'Valuasi rendah (PER < 18x, PBV < 2.5x) dengan ROE positif dan neraca utang konservatif.',
    badge: 'Fundamental',
    logic: 'AND',
    rules: [
      { id: 'gv1', field: 'per', label: 'PER', category: 'VALUATION', operator: '<', value: 18, unit: 'x' },
      { id: 'gv2', field: 'pbv', label: 'PBV', category: 'VALUATION', operator: '<', value: 2.5, unit: 'x' },
      { id: 'gv3', field: 'der', label: 'DER', category: 'FUNDAMENTAL', operator: '<=', value: 1.0, unit: 'x' },
      { id: 'gv4', field: 'roe', label: 'ROE', category: 'FUNDAMENTAL', operator: '>=', value: 10, unit: '%' },
    ],
  },
  {
    id: 'global-growth',
    name: 'Global Growth',
    description: 'Perusahaan dengan pertumbuhan pendapatan dan laba dua digit (> 10%) serta ROE tinggi.',
    badge: 'Growth',
    logic: 'AND',
    rules: [
      { id: 'gg1', field: 'revenueGrowth', label: 'Revenue Growth', category: 'GROWTH', operator: '>=', value: 10, unit: '%' },
      { id: 'gg2', field: 'profitGrowth', label: 'Profit Growth', category: 'GROWTH', operator: '>=', value: 10, unit: '%' },
      { id: 'gg3', field: 'roe', label: 'ROE', category: 'FUNDAMENTAL', operator: '>=', value: 15, unit: '%' },
    ],
  },
  {
    id: 'dividend',
    name: 'High Dividend',
    description: 'Emiten dengan Dividend Yield >= 4% dan rasio pembayaran dividen berkelanjutan.',
    badge: 'Income',
    logic: 'AND',
    rules: [
      { id: 'div1', field: 'dividendYield', label: 'Dividend Yield', category: 'DIVIDEND', operator: '>=', value: 4.0, unit: '%' },
      { id: 'div2', field: 'roe', label: 'ROE', category: 'FUNDAMENTAL', operator: '>=', value: 8.0, unit: '%' },
    ],
  },
  {
    id: 'quality',
    name: 'Quality Compounder',
    description: 'Perusahaan berkualitas superior dengan ROE >= 18% dan ROIC >= 12% serta neraca bersih.',
    badge: 'Quality',
    logic: 'AND',
    rules: [
      { id: 'q1', field: 'roe', label: 'ROE', category: 'FUNDAMENTAL', operator: '>=', value: 18.0, unit: '%' },
      { id: 'q2', field: 'roa', label: 'ROA', category: 'FUNDAMENTAL', operator: '>=', value: 5.0, unit: '%' },
      { id: 'q3', field: 'der', label: 'DER', category: 'FUNDAMENTAL', operator: '<=', value: 0.8, unit: 'x' },
    ],
  },
  {
    id: 'momentum',
    name: 'Momentum Trading',
    description: 'Harga di atas MA20, RSI di zona dorongan (50 - 70), dan volume > rata-rata volume.',
    badge: 'Technical',
    logic: 'AND',
    rules: [
      { id: 'm1', field: 'price', label: 'Price > MA20', category: 'TECHNICAL', operator: '>', value: 0, fieldCompare: 'ma20' },
      { id: 'm2', field: 'rsi', label: 'RSI (14)', category: 'TECHNICAL', operator: 'BETWEEN', value: [50, 70] },
      { id: 'm3', field: 'volume', label: 'Volume > Avg Vol', category: 'MARKET', operator: '>', value: 0, fieldCompare: 'averageVolume' },
    ],
  },
  {
    id: 'breakout',
    name: 'Breakout Candidate',
    description: 'Pola breakout terdeteksi dengan momentum MACD histogram positif dan volume ekspansi.',
    badge: 'Price Action',
    logic: 'AND',
    rules: [
      { id: 'bo1', field: 'pattern', label: 'Pola Breakout', category: 'PRICE_ACTION', operator: '=', value: 'Breakout' },
      { id: 'bo2', field: 'macdHist', label: 'MACD Histogram', category: 'TECHNICAL', operator: '>', value: 0 },
    ],
  },
  {
    id: 'oversold',
    name: 'Oversold Rebound',
    description: 'RSI jenuh jual (<= 45) atau posisi harga berada di dekat area support kunci.',
    badge: 'Technical',
    logic: 'OR',
    rules: [
      { id: 'os1', field: 'rsi', label: 'RSI Oversold', category: 'TECHNICAL', operator: '<=', value: 45 },
      { id: 'os2', field: 'pattern', label: 'Pola Near Support', category: 'PRICE_ACTION', operator: '=', value: 'Near Support' },
    ],
  },
  {
    id: 'trend-following',
    name: 'Trend Following',
    description: 'Struktur tren naik: Trend = Uptrend dan Harga berada di atas MA50 dan MA200.',
    badge: 'Trend',
    logic: 'AND',
    rules: [
      { id: 'tf1', field: 'trend', label: 'Trend Uptrend', category: 'PRICE_ACTION', operator: '=', value: 'Uptrend' },
      { id: 'tf2', field: 'price', label: 'Price > MA50', category: 'TECHNICAL', operator: '>', value: 0, fieldCompare: 'ma50' },
      { id: 'tf3', field: 'price', label: 'Price > MA200', category: 'TECHNICAL', operator: '>', value: 0, fieldCompare: 'ma200' },
    ],
  },
  {
    id: 'swing',
    name: 'Swing Trading',
    description: 'Setup swing pada fase pullback dalam tren naik dengan RSI sehat (45 - 65).',
    badge: 'Swing',
    logic: 'AND',
    rules: [
      { id: 'sw1', field: 'trend', label: 'Trend Uptrend', category: 'PRICE_ACTION', operator: '=', value: 'Uptrend' },
      { id: 'sw2', field: 'rsi', label: 'RSI Sehat', category: 'TECHNICAL', operator: 'BETWEEN', value: [45, 65] },
    ],
  },
  {
    id: 'long-term',
    name: 'Long-Term Compounder',
    description: 'Kapitalisasi pasar > $50B, ROE >= 15%, dan pertumbuhan laba positif.',
    badge: 'Investing',
    logic: 'AND',
    rules: [
      { id: 'lt1', field: 'marketCapUSD', label: 'Market Cap (USD) >= $50B', category: 'MARKET', operator: '>=', value: 50000000000, unit: 'USD' },
      { id: 'lt2', field: 'roe', label: 'ROE', category: 'FUNDAMENTAL', operator: '>=', value: 15.0, unit: '%' },
      { id: 'lt3', field: 'profitGrowth', label: 'Profit Growth', category: 'GROWTH', operator: '>=', value: 5.0, unit: '%' },
    ],
  },
  {
    id: 'large-cap',
    name: 'Large Cap Titans',
    description: 'Emiten raksasa global dengan kapitalisasi pasar di atas $100 Miliar USD.',
    badge: 'Market Cap',
    logic: 'AND',
    rules: [
      { id: 'lc1', field: 'marketCapUSD', label: 'Market Cap (USD) >= $100B', category: 'MARKET', operator: '>=', value: 100000000000, unit: 'USD' },
    ],
  },
  {
    id: 'small-cap',
    name: 'Mid & Small Cap',
    description: 'Emiten berkembang dengan kapitalisasi pasar di bawah $30 Miliar USD.',
    badge: 'Market Cap',
    logic: 'AND',
    rules: [
      { id: 'sc1', field: 'marketCapUSD', label: 'Market Cap (USD) <= $30B', category: 'MARKET', operator: '<=', value: 30000000000, unit: 'USD' },
    ],
  },
  {
    id: 'etf',
    name: 'ETFs (Exchange Traded Funds)',
    description: 'Instrumen reksa dana indeks yang diperdagangkan di bursa saham.',
    badge: 'Asset Type',
    logic: 'AND',
    rules: [
      { id: 'etf1', field: 'assetType', label: 'Asset Type = ETF', category: 'MARKET', operator: '=', value: 'ETF' },
    ],
  },
  {
    id: 'reit',
    name: 'REITs (Real Estate Trusts)',
    description: 'Dana Investasi Real Estat (DIRE / REITs) dengan imbal hasil sewa dan dividen.',
    badge: 'Asset Type',
    logic: 'AND',
    rules: [
      { id: 'reit1', field: 'assetType', label: 'Asset Type = REIT', category: 'MARKET', operator: '=', value: 'REIT' },
    ],
  },
];
