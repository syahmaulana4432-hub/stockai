export interface IndexHistoryPoint {
  time: string;
  value: number;
}

export interface GlobalIndexDetail {
  id: string;
  symbol: string;
  name: string;
  country: string;
  region: 'Asia Pacific' | 'Americas' | 'Europe';
  exchange: string;
  currency: string;
  value: number;
  prevClose: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: string;
  marketStatus: 'Open' | 'Closed' | 'Pre-Market' | 'After-Hours';
  tradingHours: string;
  timezone: string;
  source: string;
  updatedAt: string;
  sparkline: number[];
  history: Record<'1D' | '1W' | '1M' | '3M' | '6M' | '1Y', IndexHistoryPoint[]>;
}

function generateHistory(base: number, volatility: number, trend: number, count: number): IndexHistoryPoint[] {
  const points: IndexHistoryPoint[] = [];
  let current = base * (1 - trend * 0.5);
  const now = new Date('2026-09-16T16:00:00Z');
  
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 86400000);
    const noise = (Math.sin(i * 0.5) * 0.6 + (Math.random() - 0.48)) * volatility;
    current = current * (1 + noise + trend / count);
    points.push({
      time: d.toISOString().split('T')[0],
      value: Math.round(current * 100) / 100
    });
  }
  return points;
}

export const GLOBAL_INDICES_DETAILED: GlobalIndexDetail[] = [
  {
    id: 'IHSG',
    symbol: '^JKSE',
    name: 'IHSG (Indeks Harga Saham Gabungan)',
    country: 'Indonesia',
    region: 'Asia Pacific',
    exchange: 'IDX',
    currency: 'IDR',
    value: 7812.13,
    prevClose: 7777.10,
    change: 35.03,
    changePercent: 0.45,
    high: 7835.40,
    low: 7780.20,
    volume: '18.4 B lembar',
    marketStatus: 'Closed',
    tradingHours: '09:00 - 16:00 WIB',
    timezone: 'UTC+7',
    source: 'Bursa Efek Indonesia (IDX) - Simulated Feed Phase 1',
    updatedAt: '2026-09-16T16:00:00+07:00',
    sparkline: [7720, 7745, 7760, 7750, 7780, 7795, 7812],
    history: {
      '1D': generateHistory(7812, 0.003, 0.0045, 24),
      '1W': generateHistory(7812, 0.006, 0.012, 7),
      '1M': generateHistory(7812, 0.009, 0.028, 30),
      '3M': generateHistory(7812, 0.012, 0.054, 90),
      '6M': generateHistory(7812, 0.015, 0.082, 180),
      '1Y': generateHistory(7812, 0.018, 0.125, 365)
    }
  },
  {
    id: 'LQ45',
    symbol: '^LQ45',
    name: 'LQ45 Index (45 Saham Paling Likuid)',
    country: 'Indonesia',
    region: 'Asia Pacific',
    exchange: 'IDX',
    currency: 'IDR',
    value: 964.80,
    prevClose: 960.20,
    change: 4.60,
    changePercent: 0.48,
    high: 968.10,
    low: 959.50,
    volume: '11.2 B lembar',
    marketStatus: 'Closed',
    tradingHours: '09:00 - 16:00 WIB',
    timezone: 'UTC+7',
    source: 'Bursa Efek Indonesia (IDX) - Simulated Feed Phase 1',
    updatedAt: '2026-09-16T16:00:00+07:00',
    sparkline: [950, 954, 958, 955, 960, 962, 964.8],
    history: {
      '1D': generateHistory(964.8, 0.003, 0.0048, 24),
      '1W': generateHistory(964.8, 0.006, 0.011, 7),
      '1M': generateHistory(964.8, 0.009, 0.024, 30),
      '3M': generateHistory(964.8, 0.012, 0.048, 90),
      '6M': generateHistory(964.8, 0.015, 0.075, 180),
      '1Y': generateHistory(964.8, 0.018, 0.110, 365)
    }
  },
  {
    id: 'SP500',
    symbol: '^GSPC',
    name: 'S&P 500 Index',
    country: 'United States',
    region: 'Americas',
    exchange: 'NYSE / NASDAQ',
    currency: 'USD',
    value: 5635.80,
    prevClose: 5595.50,
    change: 40.30,
    changePercent: 0.72,
    high: 5650.10,
    low: 5602.40,
    volume: '3.8 B shares',
    marketStatus: 'Closed',
    tradingHours: '09:30 - 16:00 EDT',
    timezone: 'UTC-4',
    source: 'Cboe / CTA - Simulated Feed Phase 1',
    updatedAt: '2026-09-16T16:00:00-04:00',
    sparkline: [5520, 5540, 5580, 5570, 5600, 5615, 5635.8],
    history: {
      '1D': generateHistory(5635.8, 0.004, 0.0072, 24),
      '1W': generateHistory(5635.8, 0.007, 0.018, 7),
      '1M': generateHistory(5635.8, 0.010, 0.035, 30),
      '3M': generateHistory(5635.8, 0.013, 0.078, 90),
      '6M': generateHistory(5635.8, 0.016, 0.142, 180),
      '1Y': generateHistory(5635.8, 0.020, 0.225, 365)
    }
  },
  {
    id: 'NASDAQ',
    symbol: '^IXIC',
    name: 'NASDAQ Composite',
    country: 'United States',
    region: 'Americas',
    exchange: 'NASDAQ',
    currency: 'USD',
    value: 17820.50,
    prevClose: 17618.00,
    change: 202.50,
    changePercent: 1.15,
    high: 17890.20,
    low: 17650.00,
    volume: '4.6 B shares',
    marketStatus: 'Closed',
    tradingHours: '09:30 - 16:00 EDT',
    timezone: 'UTC-4',
    source: 'NASDAQ - Simulated Feed Phase 1',
    updatedAt: '2026-09-16T16:00:00-04:00',
    sparkline: [17300, 17420, 17550, 17500, 17680, 17750, 17820.5],
    history: {
      '1D': generateHistory(17820.5, 0.005, 0.0115, 24),
      '1W': generateHistory(17820.5, 0.009, 0.026, 7),
      '1M': generateHistory(17820.5, 0.013, 0.052, 30),
      '3M': generateHistory(17820.5, 0.017, 0.115, 90),
      '6M': generateHistory(17820.5, 0.022, 0.185, 180),
      '1Y': generateHistory(17820.5, 0.028, 0.310, 365)
    }
  },
  {
    id: 'NIKKEI',
    symbol: '^N225',
    name: 'Nikkei 225',
    country: 'Japan',
    region: 'Asia Pacific',
    exchange: 'TSE',
    currency: 'JPY',
    value: 36581.76,
    prevClose: 36670.00,
    change: -88.24,
    changePercent: -0.24,
    high: 36820.00,
    low: 36490.50,
    volume: '1.4 B shares',
    marketStatus: 'Closed',
    tradingHours: '09:00 - 15:00 JST',
    timezone: 'UTC+9',
    source: 'Tokyo Stock Exchange (TSE) - Simulated Feed Phase 1',
    updatedAt: '2026-09-16T15:00:00+09:00',
    sparkline: [37100, 36900, 36800, 36750, 36620, 36670, 36581.76],
    history: {
      '1D': generateHistory(36581.76, 0.004, -0.0024, 24),
      '1W': generateHistory(36581.76, 0.008, -0.012, 7),
      '1M': generateHistory(36581.76, 0.012, 0.018, 30),
      '3M': generateHistory(36581.76, 0.016, 0.045, 90),
      '6M': generateHistory(36581.76, 0.020, 0.095, 180),
      '1Y': generateHistory(36581.76, 0.025, 0.160, 365)
    }
  },
  {
    id: 'HANGSENG',
    symbol: '^HSI',
    name: 'Hang Seng Index',
    country: 'Hong Kong',
    region: 'Asia Pacific',
    exchange: 'HKEX',
    currency: 'HKD',
    value: 17422.12,
    prevClose: 17187.00,
    change: 235.12,
    changePercent: 1.37,
    high: 17480.00,
    low: 17210.30,
    volume: '2.1 B shares',
    marketStatus: 'Closed',
    tradingHours: '09:30 - 16:00 HKT',
    timezone: 'UTC+8',
    source: 'Hong Kong Exchanges (HKEX) - Simulated Feed Phase 1',
    updatedAt: '2026-09-16T16:00:00+08:00',
    sparkline: [17050, 17120, 17200, 17180, 17310, 17380, 17422.12],
    history: {
      '1D': generateHistory(17422.12, 0.005, 0.0137, 24),
      '1W': generateHistory(17422.12, 0.009, 0.029, 7),
      '1M': generateHistory(17422.12, 0.014, 0.042, 30),
      '3M': generateHistory(17422.12, 0.018, 0.065, 90),
      '6M': generateHistory(17422.12, 0.022, 0.088, 180),
      '1Y': generateHistory(17422.12, 0.026, 0.115, 365)
    }
  },
  {
    id: 'FTSE100',
    symbol: '^FTSE',
    name: 'FTSE 100 Index',
    country: 'United Kingdom',
    region: 'Europe',
    exchange: 'LSE',
    currency: 'GBP',
    value: 8273.40,
    prevClose: 8245.10,
    change: 28.30,
    changePercent: 0.34,
    high: 8295.00,
    low: 8235.20,
    volume: '850 M shares',
    marketStatus: 'Closed',
    tradingHours: '08:00 - 16:30 BST',
    timezone: 'UTC+1',
    source: 'London Stock Exchange (LSE) - Simulated Feed Phase 1',
    updatedAt: '2026-09-16T16:30:00+01:00',
    sparkline: [8210, 8225, 8240, 8235, 8250, 8260, 8273.4],
    history: {
      '1D': generateHistory(8273.4, 0.003, 0.0034, 24),
      '1W': generateHistory(8273.4, 0.005, 0.008, 7),
      '1M': generateHistory(8273.4, 0.008, 0.019, 30),
      '3M': generateHistory(8273.4, 0.011, 0.038, 90),
      '6M': generateHistory(8273.4, 0.014, 0.055, 180),
      '1Y': generateHistory(8273.4, 0.017, 0.082, 365)
    }
  },
  {
    id: 'STI',
    symbol: '^STI',
    name: 'Straits Times Index',
    country: 'Singapore',
    region: 'Asia Pacific',
    exchange: 'SGX',
    currency: 'SGD',
    value: 3593.25,
    prevClose: 3572.10,
    change: 21.15,
    changePercent: 0.59,
    high: 3605.00,
    low: 3568.40,
    volume: '1.2 B shares',
    marketStatus: 'Closed',
    tradingHours: '09:00 - 17:00 SGT',
    timezone: 'UTC+8',
    source: 'Singapore Exchange (SGX) - Simulated Feed Phase 1',
    updatedAt: '2026-09-16T17:00:00+08:00',
    sparkline: [3540, 3555, 3568, 3560, 3575, 3585, 3593.25],
    history: {
      '1D': generateHistory(3593.25, 0.003, 0.0059, 24),
      '1W': generateHistory(3593.25, 0.006, 0.014, 7),
      '1M': generateHistory(3593.25, 0.009, 0.028, 30),
      '3M': generateHistory(3593.25, 0.012, 0.052, 90),
      '6M': generateHistory(3593.25, 0.015, 0.078, 180),
      '1Y': generateHistory(3593.25, 0.018, 0.105, 365)
    }
  }
];
