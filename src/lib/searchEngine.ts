import { INSTRUMENT_MASTER, getAllInstruments } from '@/data/instrumentMaster';
import { InstrumentMasterItem } from './instrumentMasterTypes';
import { MOCK_LEARNING_TOPICS } from '@/data/mockLearning';
import { MOCK_DICTIONARY_TERMS } from '@/data/mockDictionary';

export interface SearchResultItem {
  id: string;
  type: 'stock' | 'learning' | 'dictionary';
  title: string;
  subtitle: string;
  badge?: string;
  url: string;
  score: number;
  data?: InstrumentMasterItem | any;
}

export interface UniversalSearchResult {
  query: string;
  hasResults: boolean;
  isUncoveredInstrument: boolean;
  uncoveredNotice?: string;
  stocks: SearchResultItem[];
  learning: SearchResultItem[];
  dictionary: SearchResultItem[];
}

export function searchUniversal(query: string): UniversalSearchResult {
  const cleanQuery = query.trim().toLowerCase();
  
  if (!cleanQuery) {
    // Return top popular instruments and topics as default suggestions
    const defaultStocks = getAllInstruments().slice(0, 6).map(inst => ({
      id: inst.instrumentId,
      type: 'stock' as const,
      title: inst.symbol,
      subtitle: `${inst.companyName} • ${inst.exchange} (${inst.country})`,
      badge: inst.exchange,
      url: `/analysis/${inst.symbol}`,
      score: 100,
      data: inst
    }));

    const defaultLearning = MOCK_LEARNING_TOPICS.slice(0, 3).map(top => ({
      id: top.id,
      type: 'learning' as const,
      title: top.title,
      subtitle: top.whatIsIt,
      badge: top.difficulty,
      url: `/learn/${top.id}`,
      score: 100
    }));

    return {
      query: '',
      hasResults: true,
      isUncoveredInstrument: false,
      stocks: defaultStocks,
      learning: defaultLearning,
      dictionary: []
    };
  }

  // 1. Search Instruments
  const scoredStocks: SearchResultItem[] = [];

  for (const inst of getAllInstruments()) {
    let score = 0;
    const symbolLower = inst.symbol.toLowerCase();
    const companyLower = inst.companyName.toLowerCase();
    const legalLower = inst.legalName.toLowerCase();
    const isinLower = inst.isin.toLowerCase();
    const sectorLower = inst.sector.toLowerCase();
    const exchangeLower = inst.exchange.toLowerCase();
    const countryLower = inst.country.toLowerCase();

    // Exact symbol match
    if (symbolLower === cleanQuery) {
      score += 100;
    } else if (symbolLower.startsWith(cleanQuery)) {
      score += 70;
    } else if (symbolLower.includes(cleanQuery)) {
      score += 50;
    }

    // Aliases match (e.g. BCA for BBCA, Apple for AAPL)
    for (const alias of inst.aliases) {
      const aliasLower = alias.toLowerCase();
      if (aliasLower === cleanQuery) {
        score += 90;
      } else if (aliasLower.includes(cleanQuery)) {
        score += 45;
      }
    }

    // Company & Legal Name match
    if (companyLower === cleanQuery || legalLower === cleanQuery) {
      score += 85;
    } else if (companyLower.startsWith(cleanQuery) || legalLower.startsWith(cleanQuery)) {
      score += 65;
    } else if (companyLower.includes(cleanQuery) || legalLower.includes(cleanQuery)) {
      score += 40;
    }

    // ISIN / Exchange / Sector / Country match
    if (isinLower === cleanQuery) {
      score += 80;
    }
    if (exchangeLower === cleanQuery || countryLower === cleanQuery) {
      score += 30;
    } else if (sectorLower.includes(cleanQuery)) {
      score += 25;
    }

    if (score > 0) {
      scoredStocks.push({
        id: inst.instrumentId,
        type: 'stock',
        title: inst.symbol,
        subtitle: `${inst.companyName} • ${inst.sector} • ${inst.exchange} (${inst.country})`,
        badge: `${inst.exchange} • ${inst.currency}`,
        url: `/analysis/${inst.symbol}`,
        score,
        data: inst
      });
    }
  }

  scoredStocks.sort((a, b) => b.score - a.score);

  // 2. Search Learning Topics
  const scoredLearning: SearchResultItem[] = [];
  for (const topic of MOCK_LEARNING_TOPICS) {
    let score = 0;
    const titleLower = topic.title.toLowerCase();
    const descLower = topic.whatIsIt.toLowerCase();
    const terms = (topic.relatedTerms || []).map((t: string) => t.toLowerCase());

    if (titleLower.includes(cleanQuery)) score += 60;
    if (descLower.includes(cleanQuery)) score += 30;
    if (terms.some((t: string) => t.includes(cleanQuery))) score += 40;

    if (score > 0) {
      scoredLearning.push({
        id: topic.id,
        type: 'learning',
        title: topic.title,
        subtitle: topic.whatIsIt,
        badge: topic.difficulty,
        url: `/learn/${topic.id}`,
        score
      });
    }
  }
  scoredLearning.sort((a, b) => b.score - a.score);

  // 3. Search Dictionary
  const scoredDictionary: SearchResultItem[] = [];
  for (const term of MOCK_DICTIONARY_TERMS) {
    let score = 0;
    const termLower = term.term.toLowerCase();
    const defLower = term.definition.toLowerCase();

    if (termLower === cleanQuery) score += 90;
    else if (termLower.startsWith(cleanQuery)) score += 60;
    else if (termLower.includes(cleanQuery)) score += 40;
    if (defLower.includes(cleanQuery)) score += 20;

    if (score > 0) {
      scoredDictionary.push({
        id: term.id,
        type: 'dictionary',
        title: term.term,
        subtitle: term.definition,
        badge: term.category,
        url: `/dictionary?search=${encodeURIComponent(term.term)}`,
        score
      });
    }
  }
  scoredDictionary.sort((a, b) => b.score - a.score);

  // Check if query looks like an instrument but is not covered
  const isPossibleTicker = /^[A-Za-z0-9.]{1,10}$/.test(cleanQuery);
  const isUncovered = scoredStocks.length === 0 && (
    isPossibleTicker ||
    cleanQuery.includes('crypto') ||
    cleanQuery.includes('forex') ||
    cleanQuery.includes('gold') ||
    cleanQuery.includes('saham')
  );

  const hasAnyResults = scoredStocks.length > 0 || scoredLearning.length > 0 || scoredDictionary.length > 0;

  return {
    query,
    hasResults: hasAnyResults,
    isUncoveredInstrument: isUncovered && !hasAnyResults,
    uncoveredNotice: isUncovered
      ? `Instrumen "${query.toUpperCase()}" saat ini belum terdaftar di provider data mock StockAI Phase 1. Database saat ini meng-cover emiten IDX pilihan (BBCA, BBRI, TLKM, ASII) dan Global Equities (AAPL, NVDA, 7203 Toyota, D05 DBS).`
      : undefined,
    stocks: scoredStocks.slice(0, 8),
    learning: scoredLearning.slice(0, 4),
    dictionary: scoredDictionary.slice(0, 4)
  };
}
