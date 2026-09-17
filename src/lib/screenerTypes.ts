export type FilterOperator = '>' | '<' | '=' | '>=' | '<=' | 'BETWEEN' | 'IN' | 'IS';

export type FilterCategory = 'MARKET' | 'FUNDAMENTAL' | 'TECHNICAL' | 'PRICE_ACTION';

export type LogicOperator = 'AND' | 'OR' | 'NOT';

export interface ScreenerRule {
  id: string;
  field: string; // e.g. "roe", "per", "rsi", "price"
  label: string;
  category: FilterCategory;
  operator: FilterOperator;
  value: number | string | [number, number] | string[];
  unit?: string;
  fieldCompare?: string; // e.g. for "Price > MA200", fieldCompare = "ma200"
}

export interface ScreenerStockData {
  ticker: string;
  company: string;
  sector: string;
  subSector: string;
  index: string[]; // e.g. ['IHSG', 'LQ45', 'IDX30']
  // Market
  price: number;
  changePercent: number;
  volume: number;
  averageVolume: number;
  turnover: number; // in IDR
  marketCap: number; // in IDR
  // Fundamental
  revenueGrowth: number; // % YoY
  profitGrowth: number; // % YoY
  eps: number;
  per: number;
  pbv: number;
  roe: number;
  roa: number;
  der: number;
  debt: number; // in IDR
  cash: number; // in IDR
  fcf: number; // in IDR
  dividendYield: number; // %
  dividendPayout: number; // %
  // Technical
  rsi: number;
  ma20: number;
  ma50: number;
  ma200: number;
  ema20: number;
  macd: number;
  macdSignal: number;
  macdHist: number;
  bbUpper: number;
  bbLower: number;
  stochK: number;
  stochD: number;
  vwap: number;
  atr: number;
  // Price Action
  support: number;
  resistance: number;
  trend: 'Uptrend' | 'Downtrend' | 'Sideways';
  pattern: 'Breakout' | 'Breakdown' | 'Pullback' | 'Retest' | 'Near Support' | 'Near Resistance' | 'Consolidation';
}

export interface PresetTemplate {
  id: string;
  name: string;
  description: string;
  badge: string;
  rules: ScreenerRule[];
  logic: LogicOperator;
}

export interface WhyMatchReport {
  ticker: string;
  isMatch: boolean;
  passedRules: Array<{ rule: ScreenerRule; actualValue: string | number; matched: boolean }>;
  failedRules: Array<{ rule: ScreenerRule; actualValue: string | number; matched: boolean }>;
}

export interface PipelineStage {
  id: string;
  name: string;
  count: number;
  dropped: number;
  description: string;
}

export interface SavedScreen {
  id: string;
  name: string;
  createdAt: string;
  rules: ScreenerRule[];
  logic: LogicOperator;
}

export interface MetricDefinition {
  field: string;
  label: string;
  category: FilterCategory;
  description: string;
  unit: string;
  defaultOperator: FilterOperator;
  defaultValue: number | string | [number, number];
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
}
