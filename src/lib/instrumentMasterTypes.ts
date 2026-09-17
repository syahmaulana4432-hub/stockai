import { Candle, FinancialStatementItem, KeyRatios, CorporateAction, NewsItem, AiStockAnalysis } from './types';

export type FeedStatus = 'LIVE' | 'DELAYED' | 'END_OF_DAY' | 'HISTORICAL' | 'DEMO' | 'UNAVAILABLE';

export interface RevenueDriver {
  segment: string;
  sharePercent: number;
  description: string;
}

export interface KeyExecutive {
  name: string;
  role: string;
  since?: string;
}

export interface CompanyRisk {
  category: string;
  title: string;
  impact: 'TINGGI' | 'SEDANG' | 'RENDAH';
  description: string;
}

export interface CompanyCatalyst {
  title: string;
  timeframe: string;
  expectedImpact: string;
  description: string;
}

export interface CompanyProfileIntelligence {
  overview: string;
  whatTheyDo: string;
  businessModel: string;
  revenueDrivers: RevenueDriver[];
  productsAndServices: {
    category: string;
    items: string[];
  }[];
  targetMarkets: string[];
  catalysts: CompanyCatalyst[];
  risks: CompanyRisk[];
  management: {
    boardOfDirectors: KeyExecutive[];
    boardOfCommissioners?: KeyExecutive[];
    majorShareholders: {
      name: string;
      percentage: number;
    }[];
  };
  peers: string[]; // List of peer symbols
}

export interface InstrumentMasterItem {
  instrumentId: string; // e.g. "IDX:BBCA" or "US:NASDAQ:AAPL"
  symbol: string; // e.g. "BBCA", "AAPL"
  companyName: string; // e.g. "Bank Central Asia"
  legalName: string; // e.g. "PT Bank Central Asia Tbk"
  assetType: 'Stock' | 'ETF' | 'Index' | 'Crypto' | 'Bond';
  country: string; // e.g. "Indonesia", "United States", "Japan"
  countryCode: string; // e.g. "ID", "US", "JP", "HK", "SG", "GB"
  region: 'Asia Pacific' | 'Americas' | 'Europe' | 'Global';
  exchange: string; // e.g. "IDX", "NASDAQ", "NYSE", "TSE", "HKEX", "SGX", "LSE"
  currency: string; // e.g. "IDR", "USD", "JPY", "HKD", "SGD", "GBP"
  sector: string;
  industry: string;
  isin: string;
  aliases: string[]; // Alternate search terms, e.g. ["BCA", "Bank BCA", "Central Asia"]
  providerSymbols?: Record<string, string>; // e.g. { yahoo: 'BBCA.JK', bloomberg: 'BBCA:IJ' }
  
  // Market data snapshot
  price: number;
  prevClose: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  turnover: number;
  marketCap: number;
  marketCapUSD?: number;

  // Technical & valuation quick metrics
  pe?: number;
  pbv?: number;
  roe?: number;
  dividendYield?: number;
  rsi?: number;

  // Feeds & provenance
  feedStatus: FeedStatus;
  dataSourceLabel: string;
  cutoffTimestamp: string;
  marketStatusText: string;

  // Deep intelligence and historical datasets
  profile: CompanyProfileIntelligence;
  candles: Candle[];
  financials?: FinancialStatementItem[];
  ratios?: KeyRatios;
  corporateActions?: CorporateAction[];
  news?: NewsItem[];
  aiAnalysis?: AiStockAnalysis;
}
