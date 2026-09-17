import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format number to Indonesian Rupiah currency format
 * e.g. 9850 -> "Rp 9.850"
 */
export function formatIDR(value: number, includePrefix = true): string {
  if (value === undefined || value === null || isNaN(value)) return '-';
  const formatted = new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 0,
  }).format(value);
  return includePrefix ? `Rp ${formatted}` : formatted;
}

/**
 * Format market cap or large numbers into Trillion (T) or Billion (M) IDR
 * e.g. 1200000000000000 -> "Rp 1.200,0 T"
 */
export function formatMarketCap(value: number): string {
  if (value === undefined || value === null || isNaN(value)) return '-';
  if (value >= 1_000_000_000_000_000) {
    return `Rp ${(value / 1_000_000_000_000_000).toFixed(2)} Ribu T`;
  }
  if (value >= 1_000_000_000_000) {
    return `Rp ${(value / 1_000_000_000_000).toFixed(1)} T`;
  }
  if (value >= 1_000_000_000) {
    return `Rp ${(value / 1_000_000_000).toFixed(1)} M`;
  }
  if (value >= 1_000_000) {
    return `Rp ${(value / 1_000_000).toFixed(1)} Jt`;
  }
  return `Rp ${value.toLocaleString('id-ID')}`;
}

/**
 * Format share volume into Lot or Lembar with K/M abbreviation
 */
export function formatVolume(shares: number, unit: 'lembar' | 'lot' = 'lot'): string {
  if (shares === undefined || shares === null || isNaN(shares)) return '-';
  const val = unit === 'lot' ? shares / 100 : shares;
  if (val >= 1_000_000_000) {
    return `${(val / 1_000_000_000).toFixed(2)}B ${unit}`;
  }
  if (val >= 1_000_000) {
    return `${(val / 1_000_000).toFixed(2)}M ${unit}`;
  }
  if (val >= 1_000) {
    return `${(val / 1_000).toFixed(1)}K ${unit}`;
  }
  return `${Math.round(val).toLocaleString('id-ID')} ${unit}`;
}

/**
 * Format percentage with + sign for positive values
 */
export function formatPercent(value: number, decimals = 2): string {
  if (value === undefined || value === null || isNaN(value)) return '-';
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(decimals)}%`;
}

/**
 * Format date to Indonesian standard string
 */
export function formatDateID(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}

/**
 * Format time to Indonesian format
 */
export function formatDateTimeID(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(date);
  } catch {
    return dateString;
  }
}
