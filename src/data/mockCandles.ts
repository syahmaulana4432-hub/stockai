import { Candle } from '@/lib/types';

/**
 * Deterministic pseudo-random candle generator for realistic historical chart data
 */
export function generateCandles(
  basePrice: number,
  volatility = 0.015,
  drift = 0.0003,
  count = 120,
  seed = 42
): Candle[] {
  const candles: Candle[] = [];
  let currentPrice = basePrice;
  let randomSeed = seed;

  const nextRandom = () => {
    randomSeed = (randomSeed * 9301 + 49297) % 233280;
    return randomSeed / 233280;
  };

  const startDate = new Date('2026-03-01');

  for (let i = 0; i < count; i++) {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);

    // Skip weekends
    if (d.getDay() === 0 || d.getDay() === 6) continue;

    const r1 = nextRandom();
    const r2 = nextRandom();
    const r3 = nextRandom();
    const r4 = nextRandom();

    const changePercent = (r1 - 0.49) * volatility + drift;
    const open = Math.round(currentPrice);
    const close = Math.round(currentPrice * (1 + changePercent));
    const high = Math.round(Math.max(open, close) * (1 + r2 * (volatility * 0.8)));
    const low = Math.round(Math.min(open, close) * (1 - r3 * (volatility * 0.8)));
    const volume = Math.round(15000000 + r4 * 35000000);

    candles.push({
      time: d.toISOString().split('T')[0],
      open,
      high,
      low,
      close,
      volume,
    });

    currentPrice = close;
  }

  return candles;
}

// Pre-generated candles for major tickers
export const MOCK_CANDLES_BY_TICKER: Record<string, Candle[]> = {
  BBCA: generateCandles(9400, 0.012, 0.0004, 130, 101),
  BBRI: generateCandles(4700, 0.018, 0.0002, 130, 202),
  BMRI: generateCandles(6300, 0.015, 0.0003, 130, 303),
  TLKM: generateCandles(3100, 0.016, -0.0001, 130, 404),
  ASII: generateCandles(5100, 0.017, 0.0001, 130, 505),
  ICBP: generateCandles(11200, 0.014, 0.0005, 130, 606),
  UNVR: generateCandles(2600, 0.022, -0.0003, 130, 707),
  GOTO: generateCandles(68, 0.035, 0.001, 130, 808),
  ADRO: generateCandles(3600, 0.025, 0.0008, 130, 909),
  BBNI: generateCandles(5200, 0.016, 0.0003, 130, 110),
  AMMN: generateCandles(9100, 0.028, 0.0012, 130, 120),
  KLBF: generateCandles(1650, 0.015, 0.0002, 130, 130),
};
