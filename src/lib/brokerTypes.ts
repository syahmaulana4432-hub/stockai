import { CurrencyCode } from './globalTypes';

export type BrokerProviderId =
  | 'interactive_brokers'
  | 'alpaca'
  | 'saxo'
  | 'charles_schwab'
  | 'mandiri_sekuritas'
  | 'indo_premier'
  | 'mirae_asset'
  | 'stockbit'
  | 'ajaib'
  | 'tiger_brokers';

export type BrokerConnectionStatus =
  | 'CONNECTED'
  | 'DISCONNECTED'
  | 'REQUIRES_AUTHENTICATION'
  | 'READ_ONLY'
  | 'ERROR';

export interface BrokerCapabilities {
  supportsPortfolioSync: boolean;
  supportsTradingAPI: boolean;
  supportsPaperTrading: boolean;
  supportsMarketData: boolean;
}

export interface BrokerProviderMeta {
  id: BrokerProviderId;
  name: string;
  country: string; // 'ID', 'US', 'GLOBAL'
  region: 'Americas' | 'Europe' | 'Asia-Pacific' | 'Global';
  authType: 'OAUTH2' | 'API_KEY' | 'TOKEN';
  description: string;
  supportedExchanges: string[];
  capabilities: BrokerCapabilities;
}

export interface BrokerAccount {
  accountId: string;
  accountName: string;
  brokerId: BrokerProviderId;
  brokerName: string;
  currency: CurrencyCode;
  totalEquity: number;
  cashBalance: number;
  buyingPower: number;
  status: BrokerConnectionStatus;
  isPaperTrading: boolean;
  lastSyncedAt: string;
}

export interface BrokerPosition {
  positionId: string;
  accountId: string;
  brokerId: BrokerProviderId;
  instrumentId: string; // e.g. "US:NASDAQ:AAPL"
  symbol: string;
  companyName: string;
  quantity: number;
  averageEntryPrice: number;
  currentPrice: number;
  marketValue: number;
  unrealizedPnL: number;
  unrealizedPnLPercent: number;
  currency: CurrencyCode;
  assetType: string;
}

export interface BrokerOrderPreview {
  instrumentId: string;
  symbol: string;
  brokerId: BrokerProviderId;
  accountId: string;
  side: 'BUY' | 'SELL';
  orderType: 'MARKET' | 'LIMIT' | 'STOP_LOSS' | 'STOP_LIMIT';
  quantity: number;
  limitPrice?: number;
  stopPrice?: number;
  currency: CurrencyCode;
  estimatedTotal: number;
  estimatedFees: number;
  riskWarning: string;
}

/**
 * Standard Broker Adapter Interface for extensibility
 */
export interface BrokerAdapter {
  getBrokerInfo(): BrokerProviderMeta;
  connect(credentials: Record<string, string>): Promise<boolean>;
  disconnect(): Promise<boolean>;
  getAccounts(): Promise<BrokerAccount[]>;
  getPositions(accountId: string): Promise<BrokerPosition[]>;
  previewOrder(order: Partial<BrokerOrderPreview>): Promise<BrokerOrderPreview>;
}

export const MOCK_BROKER_PROVIDERS: BrokerProviderMeta[] = [
  {
    id: 'interactive_brokers',
    name: 'Interactive Brokers (IBKR)',
    country: 'GLOBAL',
    region: 'Global',
    authType: 'OAUTH2',
    description: 'Akses ke 150+ bursa dunia di 33 negara (US, EU, JP, HK, AU, UK)',
    supportedExchanges: ['NYSE', 'NASDAQ', 'LSE', 'TSE', 'HKEX', 'ASX'],
    capabilities: {
      supportsPortfolioSync: true,
      supportsTradingAPI: true,
      supportsPaperTrading: true,
      supportsMarketData: true,
    },
  },
  {
    id: 'alpaca',
    name: 'Alpaca Markets',
    country: 'US',
    region: 'Americas',
    authType: 'API_KEY',
    description: 'Developer-first commission-free trading API untuk saham dan ETF bursa US',
    supportedExchanges: ['NYSE', 'NASDAQ', 'AMEX'],
    capabilities: {
      supportsPortfolioSync: true,
      supportsTradingAPI: true,
      supportsPaperTrading: true,
      supportsMarketData: true,
    },
  },
  {
    id: 'mandiri_sekuritas',
    name: 'Mandiri Sekuritas (MOST)',
    country: 'ID',
    region: 'Asia-Pacific',
    authType: 'TOKEN',
    description: 'Sekuritas BUMN terkemuka untuk transaksi saham dan obligasi Bursa Efek Indonesia (BEI/IDX)',
    supportedExchanges: ['IDX'],
    capabilities: {
      supportsPortfolioSync: true,
      supportsTradingAPI: true,
      supportsPaperTrading: false,
      supportsMarketData: true,
    },
  },
  {
    id: 'indo_premier',
    name: 'Indo Premier Sekuritas (IPOT)',
    country: 'ID',
    region: 'Asia-Pacific',
    authType: 'TOKEN',
    description: 'Platform investasi saham dan reksa dana terintegrasi pasar modal Indonesia',
    supportedExchanges: ['IDX'],
    capabilities: {
      supportsPortfolioSync: true,
      supportsTradingAPI: false,
      supportsPaperTrading: false,
      supportsMarketData: true,
    },
  },
  {
    id: 'stockbit',
    name: 'Stockbit Sekuritas',
    country: 'ID',
    region: 'Asia-Pacific',
    authType: 'OAUTH2',
    description: 'Social investing platform & sekuritas modern untuk investor ritel Indonesia',
    supportedExchanges: ['IDX'],
    capabilities: {
      supportsPortfolioSync: true,
      supportsTradingAPI: true,
      supportsPaperTrading: true,
      supportsMarketData: true,
    },
  },
  {
    id: 'ajaib',
    name: 'Ajaib Sekuritas',
    country: 'ID',
    region: 'Asia-Pacific',
    authType: 'TOKEN',
    description: 'Aplikasi investasi saham & reksa dana ramah pemula generasi muda Indonesia',
    supportedExchanges: ['IDX'],
    capabilities: {
      supportsPortfolioSync: true,
      supportsTradingAPI: false,
      supportsPaperTrading: false,
      supportsMarketData: true,
    },
  },
  {
    id: 'saxo',
    name: 'Saxo Bank',
    country: 'GLOBAL',
    region: 'Global',
    authType: 'OAUTH2',
    description: 'Multi-asset global broker untuk ekuitas, obligasi, FX, dan komoditas internasional',
    supportedExchanges: ['NYSE', 'NASDAQ', 'LSE', 'EURONEXT', 'SGX'],
    capabilities: {
      supportsPortfolioSync: true,
      supportsTradingAPI: true,
      supportsPaperTrading: true,
      supportsMarketData: true,
    },
  },
  {
    id: 'tiger_brokers',
    name: 'Tiger Brokers',
    country: 'GLOBAL',
    region: 'Asia-Pacific',
    authType: 'OAUTH2',
    description: 'Pialang saham terkemuka untuk pasar US, Hong Kong, Singapura, dan Australia',
    supportedExchanges: ['NASDAQ', 'NYSE', 'HKEX', 'SGX', 'ASX'],
    capabilities: {
      supportsPortfolioSync: true,
      supportsTradingAPI: true,
      supportsPaperTrading: true,
      supportsMarketData: true,
    },
  },
];

export const MOCK_BROKER_ACCOUNTS: BrokerAccount[] = [
  {
    accountId: 'acc-ibkr-01',
    accountName: 'IBKR Global Pro (US & HK)',
    brokerId: 'interactive_brokers',
    brokerName: 'Interactive Brokers',
    currency: 'USD',
    totalEquity: 68450.25,
    cashBalance: 14200.0,
    buyingPower: 28400.0,
    status: 'CONNECTED',
    isPaperTrading: false,
    lastSyncedAt: '2026-09-16T08:30:00Z',
  },
  {
    accountId: 'acc-most-02',
    accountName: 'MOST Equity Regular (IDX)',
    brokerId: 'mandiri_sekuritas',
    brokerName: 'Mandiri Sekuritas',
    currency: 'IDR',
    totalEquity: 485000000,
    cashBalance: 125000000,
    buyingPower: 125000000,
    status: 'CONNECTED',
    isPaperTrading: false,
    lastSyncedAt: '2026-09-16T08:45:00Z',
  },
  {
    accountId: 'acc-alpaca-paper',
    accountName: 'Alpaca Sandbox Algorithmic',
    brokerId: 'alpaca',
    brokerName: 'Alpaca Markets',
    currency: 'USD',
    totalEquity: 100000.0,
    cashBalance: 45000.0,
    buyingPower: 90000.0,
    status: 'CONNECTED',
    isPaperTrading: true,
    lastSyncedAt: '2026-09-16T08:55:00Z',
  },
];
