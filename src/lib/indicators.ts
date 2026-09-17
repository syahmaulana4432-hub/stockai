import { Candle, TechnicalIndicators } from './types';

/**
 * Calculates Simple Moving Average (SMA)
 */
export function calculateSMA(candles: Candle[], period: number): number[] {
  const result: number[] = [];
  for (let i = 0; i < candles.length; i++) {
    if (i < period - 1) {
      result.push(NaN);
    } else {
      let sum = 0;
      for (let j = 0; j < period; j++) {
        sum += candles[i - j].close;
      }
      result.push(Number((sum / period).toFixed(2)));
    }
  }
  return result;
}

/**
 * Calculates Exponential Moving Average (EMA)
 */
export function calculateEMA(candles: Candle[], period: number): number[] {
  const result: number[] = [];
  const multiplier = 2 / (period + 1);

  let initialSMA = 0;
  for (let i = 0; i < candles.length; i++) {
    if (i < period - 1) {
      initialSMA += candles[i].close;
      result.push(NaN);
    } else if (i === period - 1) {
      initialSMA += candles[i].close;
      const sma = initialSMA / period;
      result.push(Number(sma.toFixed(2)));
    } else {
      const prevEMA = result[i - 1];
      const currentEMA = (candles[i].close - prevEMA) * multiplier + prevEMA;
      result.push(Number(currentEMA.toFixed(2)));
    }
  }
  return result;
}

/**
 * Calculates Relative Strength Index (RSI 14)
 */
export function calculateRSI(candles: Candle[], period = 14): number[] {
  const result: number[] = [];
  if (candles.length <= period) {
    return candles.map(() => 50);
  }

  let gains = 0;
  let losses = 0;

  for (let i = 1; i <= period; i++) {
    const change = candles[i].close - candles[i - 1].close;
    if (change > 0) gains += change;
    else losses += Math.abs(change);
  }

  let avgGain = gains / period;
  let avgLoss = losses / period;

  for (let i = 0; i < period; i++) {
    result.push(NaN);
  }

  const initialRS = avgLoss === 0 ? 100 : avgGain / avgLoss;
  const initialRSI = 100 - 100 / (1 + initialRS);
  result.push(Number(initialRSI.toFixed(2)));

  for (let i = period + 1; i < candles.length; i++) {
    const change = candles[i].close - candles[i - 1].close;
    const gain = change > 0 ? change : 0;
    const loss = change < 0 ? Math.abs(change) : 0;

    avgGain = (avgGain * (period - 1) + gain) / period;
    avgLoss = (avgLoss * (period - 1) + loss) / period;

    if (avgLoss === 0) {
      result.push(100);
    } else {
      const rs = avgGain / avgLoss;
      const rsi = 100 - 100 / (1 + rs);
      result.push(Number(rsi.toFixed(2)));
    }
  }

  return result;
}

/**
 * Calculates MACD (12, 26, 9)
 */
export function calculateMACD(
  candles: Candle[],
  fastPeriod = 12,
  slowPeriod = 26,
  signalPeriod = 9
): { macdLine: number[]; signalLine: number[]; histogram: number[] } {
  const fastEMA = calculateEMA(candles, fastPeriod);
  const slowEMA = calculateEMA(candles, slowPeriod);

  const macdLine: number[] = [];
  for (let i = 0; i < candles.length; i++) {
    if (isNaN(fastEMA[i]) || isNaN(slowEMA[i])) {
      macdLine.push(NaN);
    } else {
      macdLine.push(Number((fastEMA[i] - slowEMA[i]).toFixed(2)));
    }
  }

  // Calculate Signal line (EMA of MACD line)
  const validMacdStartIndex = macdLine.findIndex((v) => !isNaN(v));
  const signalLine: number[] = Array(candles.length).fill(NaN);
  const histogram: number[] = Array(candles.length).fill(NaN);

  if (validMacdStartIndex !== -1 && candles.length - validMacdStartIndex >= signalPeriod) {
    const validMacdCandles: Candle[] = [];
    for (let i = validMacdStartIndex; i < candles.length; i++) {
      validMacdCandles.push({
        time: candles[i].time,
        open: macdLine[i],
        high: macdLine[i],
        low: macdLine[i],
        close: macdLine[i],
        volume: 0,
      });
    }

    const macdEma = calculateEMA(validMacdCandles, signalPeriod);
    for (let j = 0; j < macdEma.length; j++) {
      const originalIndex = validMacdStartIndex + j;
      signalLine[originalIndex] = macdEma[j];
      if (!isNaN(macdLine[originalIndex]) && !isNaN(signalLine[originalIndex])) {
        histogram[originalIndex] = Number((macdLine[originalIndex] - signalLine[originalIndex]).toFixed(2));
      }
    }
  }

  return { macdLine, signalLine, histogram };
}

/**
 * Calculates Bollinger Bands (20, 2)
 */
export function calculateBollingerBands(
  candles: Candle[],
  period = 20,
  multiplier = 2
): { upper: number[]; middle: number[]; lower: number[] } {
  const middle = calculateSMA(candles, period);
  const upper: number[] = [];
  const lower: number[] = [];

  for (let i = 0; i < candles.length; i++) {
    if (i < period - 1) {
      upper.push(NaN);
      lower.push(NaN);
    } else {
      let varianceSum = 0;
      const mean = middle[i];
      for (let j = 0; j < period; j++) {
        varianceSum += Math.pow(candles[i - j].close - mean, 2);
      }
      const stdDev = Math.sqrt(varianceSum / period);
      upper.push(Number((mean + multiplier * stdDev).toFixed(2)));
      lower.push(Number((mean - multiplier * stdDev).toFixed(2)));
    }
  }

  return { upper, middle, lower };
}

/**
 * Calculates Stochastic Oscillator (%K, %D)
 */
export function calculateStochastic(
  candles: Candle[],
  kPeriod = 14,
  dPeriod = 3
): { k: number[]; d: number[] } {
  const kLine: number[] = [];
  for (let i = 0; i < candles.length; i++) {
    if (i < kPeriod - 1) {
      kLine.push(NaN);
    } else {
      let highestHigh = -Infinity;
      let lowestLow = Infinity;
      for (let j = 0; j < kPeriod; j++) {
        const c = candles[i - j];
        if (c.high > highestHigh) highestHigh = c.high;
        if (c.low < lowestLow) lowestLow = c.low;
      }
      const currentClose = candles[i].close;
      const range = highestHigh - lowestLow;
      const k = range === 0 ? 50 : ((currentClose - lowestLow) / range) * 100;
      kLine.push(Number(k.toFixed(2)));
    }
  }

  const dLine: number[] = [];
  for (let i = 0; i < candles.length; i++) {
    if (i < kPeriod - 1 + dPeriod - 1) {
      dLine.push(NaN);
    } else {
      let sum = 0;
      for (let j = 0; j < dPeriod; j++) {
        sum += kLine[i - j];
      }
      dLine.push(Number((sum / dPeriod).toFixed(2)));
    }
  }

  return { k: kLine, d: dLine };
}

/**
 * Calculates Average True Range (ATR 14)
 */
export function calculateATR(candles: Candle[], period = 14): number[] {
  const tr: number[] = [candles[0].high - candles[0].low];
  for (let i = 1; i < candles.length; i++) {
    const current = candles[i];
    const prev = candles[i - 1];
    const highLow = current.high - current.low;
    const highClose = Math.abs(current.high - prev.close);
    const lowClose = Math.abs(current.low - prev.close);
    tr.push(Math.max(highLow, highClose, lowClose));
  }

  const atr: number[] = [];
  let trSum = 0;
  for (let i = 0; i < candles.length; i++) {
    if (i < period - 1) {
      trSum += tr[i];
      atr.push(NaN);
    } else if (i === period - 1) {
      trSum += tr[i];
      atr.push(Number((trSum / period).toFixed(2)));
    } else {
      const prevATR = atr[i - 1];
      const currentATR = (prevATR * (period - 1) + tr[i]) / period;
      atr.push(Number(currentATR.toFixed(2)));
    }
  }
  return atr;
}

/**
 * Calculates Volume Weighted Average Price (VWAP)
 */
export function calculateVWAP(candles: Candle[]): number[] {
  const result: number[] = [];
  let cumTypicalVolume = 0;
  let cumVolume = 0;

  for (let i = 0; i < candles.length; i++) {
    const c = candles[i];
    const typicalPrice = (c.high + c.low + c.close) / 3;
    cumTypicalVolume += typicalPrice * c.volume;
    cumVolume += c.volume;

    if (cumVolume === 0) {
      result.push(c.close);
    } else {
      result.push(Number((cumTypicalVolume / cumVolume).toFixed(2)));
    }
  }
  return result;
}

/**
 * Identifies key Support and Resistance levels from pivot points
 */
export function findSupportResistance(candles: Candle[]): {
  supports: number[];
  resistances: number[];
} {
  if (candles.length < 10) return { supports: [], resistances: [] };

  const pivotLows: number[] = [];
  const pivotHighs: number[] = [];

  for (let i = 2; i < candles.length - 2; i++) {
    const c = candles[i];
    // Pivot Low
    if (
      c.low <= candles[i - 1].low &&
      c.low <= candles[i - 2].low &&
      c.low <= candles[i + 1].low &&
      c.low <= candles[i + 2].low
    ) {
      pivotLows.push(c.low);
    }
    // Pivot High
    if (
      c.high >= candles[i - 1].high &&
      c.high >= candles[i - 2].high &&
      c.high >= candles[i + 1].high &&
      c.high >= candles[i + 2].high
    ) {
      pivotHighs.push(c.high);
    }
  }

  const currentPrice = candles[candles.length - 1].close;

  // Filter supports below currentPrice and resistances above currentPrice
  const supports = Array.from(new Set(pivotLows.filter((p) => p <= currentPrice)))
    .sort((a, b) => b - a)
    .slice(0, 3);

  const resistances = Array.from(new Set(pivotHighs.filter((p) => p >= currentPrice)))
    .sort((a, b) => a - b)
    .slice(0, 3);

  return {
    supports: supports.length > 0 ? supports : [Math.round(currentPrice * 0.95), Math.round(currentPrice * 0.9)],
    resistances: resistances.length > 0 ? resistances : [Math.round(currentPrice * 1.05), Math.round(currentPrice * 1.1)],
  };
}

/**
 * Computes all technical indicators for the latest candle in the dataset
 */
export function computeAllIndicators(candles: Candle[]): TechnicalIndicators {
  if (!candles || candles.length === 0) {
    throw new Error('Candles data cannot be empty');
  }

  const n = candles.length - 1;
  const sma20Arr = calculateSMA(candles, 20);
  const sma50Arr = calculateSMA(candles, 50);
  const sma200Arr = calculateSMA(candles, 200);
  const ema20Arr = calculateEMA(candles, 20);
  const rsiArr = calculateRSI(candles, 14);
  const macdData = calculateMACD(candles, 12, 26, 9);
  const bbData = calculateBollingerBands(candles, 20, 2);
  const stochData = calculateStochastic(candles, 14, 3);
  const atrArr = calculateATR(candles, 14);
  const vwapArr = calculateVWAP(candles);
  const { supports, resistances } = findSupportResistance(candles);

  const currentPrice = candles[n].close;
  const currentRSI = isNaN(rsiArr[n]) ? 50 : rsiArr[n];
  const currentSMA20 = isNaN(sma20Arr[n]) ? currentPrice : sma20Arr[n];
  const currentSMA50 = isNaN(sma50Arr[n]) ? currentPrice : sma50Arr[n];
  const currentSMA200 = isNaN(sma200Arr[n]) ? currentPrice : sma200Arr[n];
  const currentEMA20 = isNaN(ema20Arr[n]) ? currentPrice : ema20Arr[n];

  const macdVal = isNaN(macdData.macdLine[n]) ? 0 : macdData.macdLine[n];
  const sigVal = isNaN(macdData.signalLine[n]) ? 0 : macdData.signalLine[n];
  const histVal = isNaN(macdData.histogram[n]) ? 0 : macdData.histogram[n];

  // Determine signals
  let trend: 'Uptrend' | 'Downtrend' | 'Sideways' = 'Sideways';
  if (currentPrice > currentSMA50 && currentSMA50 > currentSMA200) {
    trend = 'Uptrend';
  } else if (currentPrice < currentSMA50 && currentSMA50 < currentSMA200) {
    trend = 'Downtrend';
  }

  let maCross: 'Golden Cross' | 'Death Cross' | 'Neutral' = 'Neutral';
  if (currentSMA50 > currentSMA200) maCross = 'Golden Cross';
  else if (currentSMA50 < currentSMA200) maCross = 'Death Cross';

  let rsiStatus: 'Overbought' | 'Oversold' | 'Neutral' = 'Neutral';
  if (currentRSI >= 70) rsiStatus = 'Overbought';
  else if (currentRSI <= 30) rsiStatus = 'Oversold';

  // Pattern detection
  let pattern: 'Breakout' | 'Breakdown' | 'Pullback' | 'Retest' | 'Consolidation' | 'Ranging' = 'Consolidation';
  if (resistances[0] && currentPrice > resistances[0]) pattern = 'Breakout';
  else if (supports[0] && currentPrice < supports[0]) pattern = 'Breakdown';
  else if (trend === 'Uptrend' && currentPrice <= currentSMA20 * 1.01 && currentPrice >= currentSMA20 * 0.99) pattern = 'Pullback';
  else if (resistances[0] && Math.abs(currentPrice - resistances[0]) / resistances[0] < 0.015) pattern = 'Retest';

  // Overall consensus
  let score = 0;
  if (trend === 'Uptrend') score += 2;
  if (trend === 'Downtrend') score -= 2;
  if (currentPrice > currentEMA20) score += 1;
  else score -= 1;
  if (histVal > 0) score += 1;
  else score -= 1;
  if (currentRSI > 45 && currentRSI < 65) score += 1;
  if (currentRSI > 75) score -= 1; // overbought risk
  if (currentRSI < 25) score += 1; // oversold bounce chance

  let overallSignal: 'Strong Buy' | 'Buy' | 'Neutral' | 'Sell' | 'Strong Sell' = 'Neutral';
  if (score >= 3) overallSignal = 'Strong Buy';
  else if (score >= 1) overallSignal = 'Buy';
  else if (score <= -3) overallSignal = 'Strong Sell';
  else if (score <= -1) overallSignal = 'Sell';

  return {
    sma20: currentSMA20,
    sma50: currentSMA50,
    sma200: currentSMA200,
    ema20: currentEMA20,
    rsi14: currentRSI,
    macd: {
      macd: macdVal,
      signal: sigVal,
      histogram: histVal,
    },
    bollingerBands: {
      upper: isNaN(bbData.upper[n]) ? currentPrice * 1.05 : bbData.upper[n],
      middle: isNaN(bbData.middle[n]) ? currentPrice : bbData.middle[n],
      lower: isNaN(bbData.lower[n]) ? currentPrice * 0.95 : bbData.lower[n],
    },
    stochastic: {
      k: isNaN(stochData.k[n]) ? 50 : stochData.k[n],
      d: isNaN(stochData.d[n]) ? 50 : stochData.d[n],
    },
    vwap: isNaN(vwapArr[n]) ? currentPrice : vwapArr[n],
    atr14: isNaN(atrArr[n]) ? Math.round(currentPrice * 0.02) : atrArr[n],
    supportLevels: supports,
    resistanceLevels: resistances,
    signals: {
      pattern,
      trend,
      maCross,
      rsiStatus,
      overallSignal,
    },
  };
}
