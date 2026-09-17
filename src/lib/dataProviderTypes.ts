import { GlobalInstrument, CurrencyCode } from './globalTypes';
import { Candle, NewsItem, CorporateAction } from './types';

export interface MarketDataProvider {
  getQuote(instrumentId: string): Promise<{ price: number; change: number; changePercent: number; volume: number }>;
  getCandles(instrumentId: string, timeframe: '1D' | '1W' | '1M', count: number): Promise<Candle[]>;
  searchInstruments(query: string, filter?: { country?: string; exchange?: string; assetType?: string }): Promise<GlobalInstrument[]>;
}

export interface FundamentalDataProvider {
  getFinancials(instrumentId: string): Promise<Record<string, unknown>>;
  getKeyRatios(instrumentId: string): Promise<Record<string, number>>;
}

export interface NewsDataProvider {
  getNewsByInstrument(instrumentId: string, limit?: number): Promise<NewsItem[]>;
  getGlobalMarketNews(category?: string, country?: string): Promise<NewsItem[]>;
}

export interface CorporateActionDataProvider {
  getCorporateActions(instrumentId: string): Promise<CorporateAction[]>;
  getUpcomingDividends(country?: string): Promise<CorporateAction[]>;
}
