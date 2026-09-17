import { INSTRUMENT_MASTER, getAllInstruments } from '@/data/instrumentMaster';
import { InstrumentMasterItem } from './instrumentMasterTypes';

export interface ResearchCandidateItem {
  instrument: InstrumentMasterItem;
  badge: 'Top Fundamental' | 'Volume Momentum' | 'Breakout Setup' | 'High Quality Value';
  theme: string;
  whyItAppeared: string[];
  keyCatalyst: {
    title: string;
    timeframe: string;
    impact: string;
  };
  keyRisks: string[];
  whatChangedToday: string;
  conditionsToMonitor: string;
  invalidationTrigger: string;
}

export function getTodayResearchCandidates(): ResearchCandidateItem[] {
  return [
    {
      instrument: INSTRUMENT_MASTER.find(i => i.symbol === 'BBCA') || INSTRUMENT_MASTER[0],
      badge: 'Top Fundamental',
      theme: 'CASA Hegemony & High ROE Quality',
      whyItAppeared: [
        'Rasio ROE stabil di atas 21.8% dengan margin laba bersih tertinggi di industri',
        'Struktur dana murah (CASA) melampaui 80% menahan kenaikan cost of funds',
        'Volume transaksi harian aktif Rp 497 Miliar dengan inflow institusi konsisten',
        'Pertumbuhan kredit korporasi dan konsumer double-digit YoY'
      ],
      keyCatalyst: {
        title: 'Ekspansi Ekosistem myBCA & Transaksi QRIS Merchant',
        timeframe: '2026 - 2027',
        impact: 'Fee-based income tumbuh dua digit dengan retensi CASA 81%+'
      },
      keyRisks: [
        'Volatilitas suku bunga global (Higher-for-Longer) yang dapat menekan yield obligasi perbankan',
        'Valuasi PBV 4.8x berada di atas rata-rata historis perbankan regional'
      ],
      whatChangedToday: 'Harga menguat +1.23% ke Rp 10.250 dengan volume 48.5 juta lembar menembus pivot mingguan.',
      conditionsToMonitor: 'Pertahankan level di atas support Rp 10.125 dengan volume transaksi konsisten.',
      invalidationTrigger: 'Penutupan harian breakdown di bawah Rp 9.950.'
    },
    {
      instrument: INSTRUMENT_MASTER.find(i => i.symbol === 'NVDA') || INSTRUMENT_MASTER[4],
      badge: 'Volume Momentum',
      theme: 'Global AI Infrastructure & Hyperscaler Demand',
      whyItAppeared: [
        'Gross margin semikonduktor spektakuler >73% dengan dominasi GPU Data Center',
        'Volume perdagangan likuid $8.09 Miliar pada sesi reguler NASDAQ',
        'RSI 14 hari di level 64.5 mengindikasikan momentum penguatan berkelanjutan',
        'Ekosistem software CUDA menciptakan barrier-to-entry tinggi'
      ],
      keyCatalyst: {
        title: 'Ramp Komersial Arsitektur AI Generasi Baru Blackwell NVL72',
        timeframe: 'Q3 2026 - 2027',
        impact: 'Backlog pemesanan pusat data hyperscaler melampaui kapasitas produksi'
      },
      keyRisks: [
        'Konsentrasi pendapatan pada 4 hyperscaler raksasa AS',
        'Valuasi PER 45.2x memerlukan pertumbuhan laba berkelanjutan tanpa jeda'
      ],
      whatChangedToday: 'Saham menguat +2.20% ke $118.40 didorong rilis data efisiensi energi arsitektur server terbaru.',
      conditionsToMonitor: 'Volume konfirmasi penutupan harian di atas area resisten $120.00.',
      invalidationTrigger: 'Penutupan di bawah support kunci $112.50.'
    },
    {
      instrument: INSTRUMENT_MASTER.find(i => i.symbol === 'ASII') || INSTRUMENT_MASTER[3],
      badge: 'High Quality Value',
      theme: 'Undervalued Dividend Yield & Conglomerate Cash Flow',
      whyItAppeared: [
        'Valuasi atraktif PER 6.8x dan PBV 0.95x dengan dividen yield masif 8.5%',
        'Arus kas operasional kuat dari United Tractors (UNTR) dan jasa keuangan',
        'Pengembangan Bank Saqu memperluas segmen perbankan digital solopreneur'
      ],
      keyCatalyst: {
        title: 'Peluncuran Portofolio Kendaraan Hybrid Terjangkau',
        timeframe: '2026 - 2027',
        impact: 'Mempertahankan pangsa pasar roda empat domestik di atas 50%'
      },
      keyRisks: [
        'Persaingan agresif harga dari pabrikan mobil listrik Tiongkok',
        'Fluktuasi harga komoditas batubara yang mempengaruhi laba kontraktor UNTR'
      ],
      whatChangedToday: 'Koreksi wajar -1.39% ke Rp 4.980 mendekati area akumulasi support kuat historis Rp 4.950.',
      conditionsToMonitor: 'Aktivitas akumulasi institusi di rentang Rp 4.920 - Rp 4.980.',
      invalidationTrigger: 'Breakdown di bawah level Rp 4.800.'
    },
    {
      instrument: INSTRUMENT_MASTER.find(i => i.symbol === 'AAPL') || INSTRUMENT_MASTER[2],
      badge: 'Breakout Setup',
      theme: 'Apple Intelligence Supercycle & Services Expansion',
      whyItAppeared: [
        'Basis instalasi perangkat aktif 2.2+ Miliar unit memperkuat pertumbuhan pendapatan Services',
        'Margin layanan digital (Services Margin) mencapai rekor 74%',
        'Program pembelian kembali saham (buyback) berkesinambungan'
      ],
      keyCatalyst: {
        title: 'Integrasi Apple Intelligence Global ke Ekosistem iPhone 16 & Mac',
        timeframe: '2026 - 2027',
        impact: 'Akselerasi siklus pembaruan perangkat keras premium di lebih dari 50 negara'
      },
      keyRisks: [
        'Penyelidikan antimonopoli komisi App Store oleh regulator Uni Eropa dan DOJ',
        'Biaya diversifikasi fasilitas rantai pasok ke Asia Selatan'
      ],
      whatChangedToday: 'Saham naik +1.45% ke $232.50 diiringi perluasan peluncuran model bahasa on-device regional.',
      conditionsToMonitor: 'Konsolidasi sehat di atas $230.00 untuk menguji resisten $238.00.',
      invalidationTrigger: 'Penutupan di bawah support $224.00.'
    }
  ];
}
