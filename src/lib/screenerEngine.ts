import {
  GlobalInstrument,
  ScreenerRule,
  LogicOperator,
  WhyMatchReport,
  PipelineStage,
} from './globalTypes';
import { formatCurrencyPrice, formatGlobalMarketCap } from './currency';

/**
 * Evaluates a single rule against a global instrument deterministically
 */
export function evaluateRule(stock: GlobalInstrument, rule: ScreenerRule): boolean {
  const actualVal = (stock as unknown as Record<string, unknown>)[rule.field];

  // Dynamic field comparison (e.g. Price > MA20)
  if (rule.fieldCompare) {
    const compareVal = (stock as unknown as Record<string, unknown>)[rule.fieldCompare];
    if (typeof actualVal === 'number' && typeof compareVal === 'number') {
      if (rule.operator === '>') return actualVal > compareVal;
      if (rule.operator === '<') return actualVal < compareVal;
      if (rule.operator === '>=') return actualVal >= compareVal;
      if (rule.operator === '<=') return actualVal <= compareVal;
      if (rule.operator === '=') return actualVal === compareVal;
    }
  }

  // Number comparison
  if (typeof actualVal === 'number' && typeof rule.value === 'number') {
    if (rule.operator === '>') return actualVal > rule.value;
    if (rule.operator === '<') return actualVal < rule.value;
    if (rule.operator === '>=') return actualVal >= rule.value;
    if (rule.operator === '<=') return actualVal <= rule.value;
    if (rule.operator === '=') return actualVal === rule.value;
  }

  // BETWEEN operator for number range [min, max]
  if (
    rule.operator === 'BETWEEN' &&
    Array.isArray(rule.value) &&
    rule.value.length === 2 &&
    typeof actualVal === 'number'
  ) {
    const [min, max] = rule.value as [number, number];
    return actualVal >= min && actualVal <= max;
  }

  // String / categorical comparison
  if (typeof actualVal === 'string' && typeof rule.value === 'string') {
    if (rule.operator === '=') return actualVal.toLowerCase() === rule.value.toLowerCase();
    if (rule.operator === 'IN') return rule.value.toLowerCase().includes(actualVal.toLowerCase());
  }

  // Array IN operator (e.g. index IN ['S&P 500', 'LQ45'])
  if (Array.isArray(actualVal) && typeof rule.value === 'string') {
    if (rule.operator === 'IN' || rule.operator === '=') {
      return actualVal.map((v) => String(v).toLowerCase()).includes(rule.value.toLowerCase());
    }
  }

  return false;
}

/**
 * Evaluates full rule set with logical operators: AND, OR, NOT
 */
export function evaluateStock(
  stock: GlobalInstrument,
  rules: ScreenerRule[],
  logic: LogicOperator = 'AND'
): boolean {
  if (!rules || rules.length === 0) return true;

  if (logic === 'AND') {
    return rules.every((r) => evaluateRule(stock, r));
  }

  if (logic === 'OR') {
    return rules.some((r) => evaluateRule(stock, r));
  }

  if (logic === 'NOT') {
    return !rules.some((r) => evaluateRule(stock, r));
  }

  return true;
}

export const evaluateInstrument = evaluateStock;

/**
 * Generates transparent "Why Match" audit report detailing passed and failed criteria
 */
export function generateWhyMatchReport(
  stock: GlobalInstrument,
  rules: ScreenerRule[],
  logic: LogicOperator = 'AND'
): WhyMatchReport {
  const passedRules: WhyMatchReport['passedRules'] = [];
  const failedRules: WhyMatchReport['failedRules'] = [];

  rules.forEach((rule) => {
    const isPass = evaluateRule(stock, rule);
    const rawVal = (stock as unknown as Record<string, unknown>)[rule.field];

    let actualDisplay = '-';
    if (typeof rawVal === 'number') {
      if (rule.field === 'price' || rule.field === 'ma20' || rule.field === 'ma50' || rule.field === 'ma200' || rule.field === 'support' || rule.field === 'resistance') {
        actualDisplay = formatCurrencyPrice(rawVal, stock.currency);
      } else if (rule.field === 'marketCap' || rule.field === 'debt' || rule.field === 'cash' || rule.field === 'fcf') {
        actualDisplay = formatGlobalMarketCap(rawVal, stock.currency);
      } else if (rule.field === 'marketCapUSD') {
        actualDisplay = formatGlobalMarketCap(rawVal, 'USD');
      } else {
        actualDisplay = rawVal.toLocaleString('en-US');
      }
    } else {
      actualDisplay = String(rawVal ?? '-');
    }

    const item = {
      rule,
      actualValue: actualDisplay,
      matched: isPass,
    };

    if (isPass) passedRules.push(item);
    else failedRules.push(item);
  });

  const isMatch = evaluateStock(stock, rules, logic);

  return {
    instrumentId: stock.instrumentId,
    symbol: stock.symbol,
    companyName: stock.companyName,
    currency: stock.currency,
    isMatch,
    passedRules,
    failedRules,
  };
}

/**
 * Computes multi-market screening pipeline stages funnels
 */
export function calculatePipeline(
  stocks: GlobalInstrument[],
  rules: ScreenerRule[]
): PipelineStage[] {
  const total = stocks.length;
  if (rules.length === 0) {
    return [
      { id: 'total', name: 'Total Instruments', count: total, dropped: 0, description: 'All global instruments in dataset' },
      { id: 'final', name: 'Matched', count: total, dropped: 0, description: 'Instruments matching criteria' },
    ];
  }

  const marketRules = rules.filter((r) => r.category === 'MARKET');
  const fundRules = rules.filter((r) => r.category === 'FUNDAMENTAL' || r.category === 'VALUATION' || r.category === 'GROWTH' || r.category === 'DIVIDEND');
  const techRules = rules.filter((r) => r.category === 'TECHNICAL');
  const priceActionRules = rules.filter((r) => r.category === 'PRICE_ACTION');

  let currentSet = [...stocks];
  const stages: PipelineStage[] = [
    {
      id: 'total',
      name: 'Total Global Universe',
      count: total,
      dropped: 0,
      description: 'Seluruh instrumen pasar global yang dianalisis',
    },
  ];

  // Stage 1: Market Filter
  if (marketRules.length > 0) {
    const afterMarket = currentSet.filter((s) => marketRules.every((r) => evaluateRule(s, r)));
    const dropped = currentSet.length - afterMarket.length;
    stages.push({
      id: 'market',
      name: 'Market & Asset Filter',
      count: afterMarket.length,
      dropped,
      description: `${dropped} tereliminasi pada filter negara, bursa, sektor, atau kapitalisasi`,
    });
    currentSet = afterMarket;
  }

  // Stage 2: Fundamental & Valuation Filter
  if (fundRules.length > 0) {
    const afterFund = currentSet.filter((s) => fundRules.every((r) => evaluateRule(s, r)));
    const dropped = currentSet.length - afterFund.length;
    stages.push({
      id: 'fundamental',
      name: 'Fundamental & Valuation',
      count: afterFund.length,
      dropped,
      description: `${dropped} tereliminasi pada filter PER, PBV, ROE, Growth, dividen`,
    });
    currentSet = afterFund;
  }

  // Stage 3: Technical Filter
  if (techRules.length > 0) {
    const afterTech = currentSet.filter((s) => techRules.every((r) => evaluateRule(s, r)));
    const dropped = currentSet.length - afterTech.length;
    stages.push({
      id: 'technical',
      name: 'Technical Indicators',
      count: afterTech.length,
      dropped,
      description: `${dropped} tereliminasi pada filter RSI, MA, MACD, Stochastic`,
    });
    currentSet = afterTech;
  }

  // Stage 4: Price Action Filter
  if (priceActionRules.length > 0) {
    const afterPA = currentSet.filter((s) => priceActionRules.every((r) => evaluateRule(s, r)));
    const dropped = currentSet.length - afterPA.length;
    stages.push({
      id: 'priceAction',
      name: 'Price Action & Trend',
      count: afterPA.length,
      dropped,
      description: `${dropped} tereliminasi pada pola breakout, support, atau trend`,
    });
    currentSet = afterPA;
  }

  return stages;
}
