import { CurrencyCode } from './globalTypes';

// Reference exchange rates against USD (Mock / Central Bank reference)
export const EXCHANGE_RATES_TO_USD: Record<CurrencyCode, number> = {
  USD: 1.0,
  IDR: 0.0000648, // 1 USD = ~15,420 IDR
  JPY: 0.00695,   // 1 USD = ~143.8 JPY
  HKD: 0.1282,    // 1 USD = ~7.80 HKD
  GBP: 1.312,     // 1 GBP = ~1.312 USD
  EUR: 1.095,     // 1 EUR = ~1.095 USD
  AUD: 0.672,     // 1 AUD = ~0.672 USD
  SGD: 0.771,     // 1 SGD = ~0.771 USD
  CAD: 0.738,     // 1 CAD = ~0.738 USD
};

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: '$',
  IDR: 'Rp',
  JPY: '¥',
  HKD: 'HK$',
  GBP: '£',
  EUR: '€',
  AUD: 'A$',
  SGD: 'S$',
  CAD: 'C$',
};

export const COUNTRY_FLAGS: Record<string, string> = {
  US: '🇺🇸',
  ID: '🇮🇩',
  JP: '🇯🇵',
  HK: '🇭🇰',
  GB: '🇬🇧',
  AU: '🇦🇺',
  SG: '🇸🇬',
  CA: '🇨🇦',
  EU: '🇪🇺',
};

/**
 * Format price natively according to its currency
 */
export function formatCurrencyPrice(price: number, currency: CurrencyCode): string {
  if (price === undefined || price === null || isNaN(price)) return '-';

  switch (currency) {
    case 'IDR':
      return `Rp ${Math.round(price).toLocaleString('id-ID')}`;
    case 'JPY':
      return `¥${Math.round(price).toLocaleString('ja-JP')}`;
    case 'USD':
      return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    case 'HKD':
      return `HK$ ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    case 'GBP':
      return `£${price.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    case 'EUR':
      return `€${price.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    case 'AUD':
      return `A$ ${price.toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    case 'SGD':
      return `S$ ${price.toLocaleString('en-SG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    case 'CAD':
      return `C$ ${price.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    default:
      return `${price.toLocaleString()} ${currency}`;
  }
}

/**
 * Format large numbers (Market Cap, Volume, Debt) into Trillion/Billion with currency prefix
 */
export function formatGlobalMarketCap(amount: number, currency: CurrencyCode): string {
  if (amount === undefined || amount === null || isNaN(amount)) return '-';

  if (currency === 'IDR') {
    if (amount >= 1_000_000_000_000_000) {
      return `Rp ${(amount / 1_000_000_000_000_000).toFixed(2)} Ribu T`;
    }
    if (amount >= 1_000_000_000_000) {
      return `Rp ${(amount / 1_000_000_000_000).toFixed(1)} T`;
    }
    if (amount >= 1_000_000_000) {
      return `Rp ${(amount / 1_000_000_000).toFixed(1)} M`;
    }
    return `Rp ${amount.toLocaleString('id-ID')}`;
  }

  const symbol = CURRENCY_SYMBOLS[currency] || '';
  if (amount >= 1_000_000_000_000) {
    return `${symbol}${(amount / 1_000_000_000_000).toFixed(2)}T`;
  }
  if (amount >= 1_000_000_000) {
    return `${symbol}${(amount / 1_000_000_000).toFixed(1)}B`;
  }
  if (amount >= 1_000_000) {
    return `${symbol}${(amount / 1_000_000).toFixed(1)}M`;
  }
  return `${symbol}${amount.toLocaleString()}`;
}

/**
 * Convert any amount from source currency to target currency
 */
export function convertCurrency(
  amount: number,
  from: CurrencyCode,
  to: CurrencyCode = 'USD'
): number {
  if (from === to) return amount;
  const rateFrom = EXCHANGE_RATES_TO_USD[from] || 1;
  const rateTo = EXCHANGE_RATES_TO_USD[to] || 1;
  const amountInUSD = amount * rateFrom;
  return amountInUSD / rateTo;
}
