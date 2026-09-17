export type AssetType = 'Stock' | 'ETF' | 'REIT' | 'ADR' | 'Index' | 'Crypto' | 'Forex' | 'Commodity' | 'Bond';

export type CountryCode = 'US' | 'ID' | 'JP' | 'HK' | 'GB' | 'AU' | 'SG' | 'CA' | 'EU';

export type ExchangeCode =
  | 'NASDAQ'
  | 'NYSE'
  | 'AMEX'
  | 'IDX'
  | 'TSE'
  | 'HKEX'
  | 'LSE'
  | 'ASX'
  | 'SGX'
  | 'TSX'
  | 'EURONEXT';

export type CurrencyCode = 'USD' | 'IDR' | 'JPY' | 'HKD' | 'GBP' | 'AUD' | 'SGD' | 'CAD' | 'EUR';

export type RegionCode = 'Americas' | 'Asia-Pacific' | 'Europe' | 'Global';

export interface GlobalInstrument {
  instrumentId: string; // e.g. "US:NASDAQ:AAPL", "ID:IDX:BBCA", "JP:TSE:7203", "HK:HKEX:0700"
  symbol: string;       // "AAPL", "BBCA", "7203", "0700", "VOD", "BHP", "SPY", "VNQ"
  companyName: string;  // "Apple Inc.", "Bank Central Asia Tbk", "Toyota Motor Corp"
  assetType: AssetType; // 'Stock' | 'ETF' | 'REIT' | 'ADR' | 'Index'
  country: string;      // "United States", "Indonesia", "Japan", "Hong Kong", "United Kingdom", "Singapore", "Australia", "Canada", "Europe"
  countryCode: CountryCode;
  region: RegionCode;
  exchange: ExchangeCode;
  currency: CurrencyCode;
  sector: string;
  industry: string;
  index: string[];      // ['S&P 500', 'NASDAQ 100', 'IHSG', 'LQ45', 'Nikkei 225', 'Hang Seng', 'FTSE 100', 'STI', 'ASX 200', 'TSX 60', 'AEX']

  // Market Metrics
  price: number;
  changePercent: number;
  volume: number;
  averageVolume: number;
  turnover: number;     // in native currency
  marketCap: number;    // in native currency
  marketCapUSD: number; // normalized USD for cross-border comparison

  // Fundamental & Valuation
  revenueGrowth: number;  // % YoY
  profitGrowth: number;   // % YoY
  fcfGrowth?: number;     // % YoY
  eps: number;
  per: number;
  forwardPER?: number;
  peg?: number;
  pbv: number;
  ps?: number;
  evEbitda?: number;
  roe: number;
  roa: number;
  roic?: number;
  der: number;
  debt: number;           // in native currency
  cash: number;           // in native currency
  fcf: number;            // in native currency
  dividendYield: number;  // %
  dividendPayout: number; // %
  dividendGrowth?: number;// %

  // Technical
  rsi: number;
  ma20: number;
  ma50: number;
  ma100?: number;
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

export type FilterOperator = '>' | '<' | '=' | '>=' | '<=' | 'BETWEEN' | 'IN' | 'IS';

export type FilterCategory =
  | 'MARKET'
  | 'FUNDAMENTAL'
  | 'VALUATION'
  | 'GROWTH'
  | 'DIVIDEND'
  | 'TECHNICAL'
  | 'PRICE_ACTION';

export type LogicOperator = 'AND' | 'OR' | 'NOT';

export interface ScreenerRule {
  id: string;
  field: string;
  label: string;
  category: FilterCategory;
  operator: FilterOperator;
  value: number | string | [number, number] | string[];
  unit?: string;
  fieldCompare?: string;
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
  instrumentId: string;
  symbol: string;
  companyName: string;
  currency: CurrencyCode;
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

export interface WatchlistGroup {
  id: string;
  name: string;
  symbols: string[];
}
