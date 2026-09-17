// Type definitions for StockAI Indonesia platform

export type MarketSentimentType = 'BULLISH' | 'NEUTRAL' | 'BEARISH' | 'STRONG_BULLISH' | 'STRONG_BEARISH';

export type AnalysisLabel = 'FACT' | 'INTERPRETATION' | 'AI ANALYSIS';

export interface IndexData {
  symbol: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: number;
  source: string;
  updatedAt: string;
}

export interface MacroIndicator {
  symbol: string;
  name: string;
  value: number;
  unit: string;
  change: number;
  changePercent: number;
  source: string;
  updatedAt: string;
}

export interface Candle {
  time: string; // YYYY-MM-DD
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface TechnicalIndicators {
  sma20: number;
  sma50: number;
  sma200: number;
  ema20: number;
  rsi14: number;
  macd: {
    macd: number;
    signal: number;
    histogram: number;
  };
  bollingerBands: {
    upper: number;
    middle: number;
    lower: number;
  };
  stochastic: {
    k: number;
    d: number;
  };
  vwap: number;
  atr14: number;
  supportLevels: number[];
  resistanceLevels: number[];
  signals: {
    pattern: 'Breakout' | 'Breakdown' | 'Pullback' | 'Retest' | 'Consolidation' | 'Ranging';
    trend: 'Uptrend' | 'Downtrend' | 'Sideways';
    maCross: 'Golden Cross' | 'Death Cross' | 'Neutral';
    rsiStatus: 'Overbought' | 'Oversold' | 'Neutral';
    overallSignal: 'Strong Buy' | 'Buy' | 'Neutral' | 'Sell' | 'Strong Sell';
  };
}

export interface FinancialStatementItem {
  year: number;
  quarter?: string;
  revenue: number;
  grossProfit: number;
  operatingProfit: number;
  netIncome: number;
  totalAssets: number;
  totalLiabilities: number;
  totalEquity: number;
  cashAndEquivalents: number;
  totalDebt: number;
  freeCashFlow: number;
  operatingCashFlow: number;
}

export interface KeyRatios {
  per: number; // Price to Earnings Ratio
  pbv: number; // Price to Book Value
  roe: number; // Return on Equity (%)
  roa: number; // Return on Assets (%)
  der: number; // Debt to Equity Ratio
  eps: number; // Earnings Per Share (IDR)
  dividendYield: number; // (%)
  dividendPayoutRatio: number; // (%)
  netProfitMargin: number; // (%)
  operatingMargin: number; // (%)
  currentRatio: number;
  marketCap: number; // IDR Trillion / Billion
  sharesOutstanding: number;
}

export interface CorporateAction {
  id: string;
  ticker: string;
  type: 'DIVIDEN' | 'RUPS' | 'RIGHTS_ISSUE' | 'STOCK_SPLIT' | 'PUBLIC_EXPOSE';
  title: string;
  date: string;
  cumDate?: string;
  exDate?: string;
  paymentDate?: string;
  amount?: string;
  description: string;
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  publishedAt: string;
  summary: string;
  impact: 'POSITIF' | 'NEGATIF' | 'NETRAL';
  relatedTickers: string[];
  category: 'Market' | 'Emiten' | 'Makro' | 'Komoditas' | 'Regulasi';
  url?: string;
}

export interface AiScenario {
  title: string;
  probability: number; // e.g. 55%
  description: string;
  triggerCondition: string;
  priceTarget: number;
}

export interface AiStockAnalysis {
  ticker: string;
  generatedAt: string;
  dataCutoff: string;
  technicalSummary: {
    label: AnalysisLabel;
    summary: string;
    keyPoints: string[];
  };
  fundamentalSummary: {
    label: AnalysisLabel;
    summary: string;
    healthScore: number; // 1-100
    valuationStatus: 'Undervalued' | 'Fairly Valued' | 'Overvalued';
    keyPoints: string[];
  };
  newsImpact: {
    label: AnalysisLabel;
    sentimentScore: number; // -100 to +100
    summary: string;
  };
  bullishFactors: string[];
  bearishFactors: string[];
  supportResistance: {
    support: number[];
    resistance: number[];
    explanation: string;
  };
  scenarios: {
    bullish: AiScenario;
    neutral: AiScenario;
    bearish: AiScenario;
  };
  tradingSetup: {
    entryArea: { min: number; max: number };
    stopLoss: number;
    targetArea1: number;
    targetArea2: number;
    riskRewardRatio: string; // e.g. "1 : 2.5"
    riskFactors: string[];
    disclaimer: string;
  };
}

export interface Stock {
  ticker: string;
  name: string;
  sector: string;
  subSector: string;
  price: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  prevClose: number;
  volume: number;
  turnover: number; // IDR
  marketCap: number; // in IDR
  pe: number;
  pbv: number;
  roe: number;
  dividendYield: number;
  description: string;
  logoText?: string;
  source: string;
  updatedAt: string;
  candles: Candle[];
  financials: FinancialStatementItem[];
  ratios: KeyRatios;
  corporateActions: CorporateAction[];
  news: NewsItem[];
  aiAnalysis: AiStockAnalysis;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LearningTopic {
  id: string;
  title: string;
  category: 'Dasar' | 'Teknikal' | 'Fundamental' | 'Psikologi & Manajemen Risiko';
  icon: string;
  difficulty: 'Pemula' | 'Menengah' | 'Lanjutan';
  readTime: string;
  whatIsIt: string;
  simpleExplanation: string;
  numberExample: string;
  visualDescription: string;
  visualType: 'bid_offer' | 'support_resistance' | 'candlestick' | 'per_ratio' | 'risk_reward' | 'dividend' | 'general';
  practiceTask: string;
  quiz: QuizQuestion[];
  commonMistakes: string[];
  relatedTerms: string[];
}

export interface DictionaryTerm {
  id: string;
  term: string;
  category: 'Dasar Saham' | 'Analisis Teknikal' | 'Analisis Fundamental' | 'Transaksi & Order' | 'Makro & Regulasi';
  difficulty: 'Pemula' | 'Menengah' | 'Lanjutan';
  definition: string;
  simpleExplanation: string;
  realWorldExample: string;
  relatedLearningTopicId?: string;
}

export interface ScreenerFilterState {
  search: string;
  sector: string;
  minMarketCap: number;
  maxPER: number;
  maxPBV: number;
  minROE: number;
  minDividendYield: number;
  signalFilter: string;
}
