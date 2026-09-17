import { NewsItem, CorporateAction } from '@/lib/types';

export const MOCK_NEWS_LIST: NewsItem[] = [
  {
    id: 'news-1',
    title: 'IHSG Menguat ke Level 7.815 Didukung Net Buy Asing di Saham Perbankan Big Cap',
    source: 'IDX Media',
    publishedAt: '2026-09-16T15:45:00+07:00',
    summary:
      'Indeks Harga Saham Gabungan (IHSG) ditutup menguat 0,63% ke level 7.815 didorong oleh apresiasi saham perbankan seperti BBCA, BMRI, dan TLKM seiring aliran dana investor global.',
    impact: 'POSITIF',
    relatedTickers: ['BBCA', 'BMRI', 'BBRI', 'TLKM'],
    category: 'Market',
  },
  {
    id: 'news-2',
    title: 'Bank Indonesia Pertahankan Suku Bunga Acuan BI-Rate di 6,00% untuk Menjaga Stabilitas Rupiah',
    source: 'Bisnis Keuangan',
    publishedAt: '2026-09-16T14:30:00+07:00',
    summary:
      'Gubernur Bank Indonesia menyatakan keputusan suku bunga konsisten dengan fokus kebijakan moneter yang pro-stabilitas nilai tukar Rupiah dan pengendalian inflasi dalam sasaran 2,5±1%.',
    impact: 'POSITIF',
    relatedTickers: ['BBCA', 'BBRI', 'BMRI', 'BBNI'],
    category: 'Makro',
  },
  {
    id: 'news-3',
    title: 'Adaro Energy (ADRO) Siapkan Dividen Jumbo Final dan Kaji Rencana Ekspansi EBT',
    source: 'Kontan Investasi',
    publishedAt: '2026-09-16T11:15:00+07:00',
    summary:
      'Manajemen ADRO mengindikasikan kelanjutan komitmen rasio pembayaran dividen yang kompetitif sambil mengalokasikan belanja modal untuk proyek smelter aluminium hijau.',
    impact: 'POSITIF',
    relatedTickers: ['ADRO'],
    category: 'Emiten',
  },
  {
    id: 'news-4',
    title: 'GoTo Catat Lonjakan Volume Transaksi Saham Usai Capai Titik Impas EBITDA',
    source: 'Tech In Asia Indonesia',
    publishedAt: '2026-09-16T10:00:00+07:00',
    summary:
      'Saham PT GoTo Gojek Tokopedia Tbk (GOTO) bergerak aktif dengan volume melampaui 1,2 miliar lembar seiring prospek pertumbuhan pinjaman digital.',
    impact: 'POSITIF',
    relatedTickers: ['GOTO'],
    category: 'Emiten',
  },
  {
    id: 'news-5',
    title: 'Astra International (ASII) Hadapi Dinamika Persaingan Pasar Kendaraan Elektrik (EV)',
    source: 'Investor Daily',
    publishedAt: '2026-09-15T16:20:00+07:00',
    summary:
      'Meskipun penjualan roda empat menghadapi penetrasi merek baru, diversifikasi bisnis jasa keuangan dan alat berat tetap menjaga kestabilan laba operasional konsolidasian.',
    impact: 'NETRAL',
    relatedTickers: ['ASII'],
    category: 'Emiten',
  },
  {
    id: 'news-6',
    title: 'Indofood CBP (ICBP) Perkuat Penetrasi Pasar Mi Instan Global dan Optimalkan Rantai Pasok',
    source: 'CNBC Indonesia',
    publishedAt: '2026-09-15T09:40:00+07:00',
    summary:
      'Stabilisasi harga komoditas gandum dan kemasan membantu ICBP menjaga efisiensi marjin kotor di atas 36%.',
    impact: 'POSITIF',
    relatedTickers: ['ICBP'],
    category: 'Emiten',
  },
  {
    id: 'news-7',
    title: 'Telkomsel dan NeutraDC Pacu Infrastruktur AI Data Center di Kawasan Regional',
    source: 'Warta Ekonomi',
    publishedAt: '2026-09-14T13:10:00+07:00',
    summary:
      'TLKM mempercepat komersialisasi hyperscale data center untuk menangkap lonjakan permintaan komputasi AI dari korporasi dan institusi finansial.',
    impact: 'POSITIF',
    relatedTickers: ['TLKM'],
    category: 'Emiten',
  },
];

export const MOCK_CORPORATE_ACTIONS: CorporateAction[] = [
  {
    id: 'ca-1',
    ticker: 'BBCA',
    type: 'DIVIDEN',
    title: 'Dividen Tunai Final Rp 275/saham',
    date: '2026-04-18',
    cumDate: '2026-04-12',
    exDate: '2026-04-13',
    paymentDate: '2026-05-04',
    amount: 'Rp 275 / lembar',
    description: 'Dividen tunai final tahun buku 2025 sesuai persetujuan RUPST.',
  },
  {
    id: 'ca-2',
    ticker: 'BBRI',
    type: 'DIVIDEN',
    title: 'Dividen Tunai Rp 310/saham',
    date: '2026-03-20',
    cumDate: '2026-03-15',
    exDate: '2026-03-16',
    paymentDate: '2026-04-08',
    amount: 'Rp 310 / lembar',
    description: 'Pembagian dividen total payout ratio 80%.',
  },
  {
    id: 'ca-3',
    ticker: 'ADRO',
    type: 'DIVIDEN',
    title: 'Dividen Tunai Final Rp 415/saham',
    date: '2026-05-20',
    cumDate: '2026-05-14',
    exDate: '2026-05-15',
    paymentDate: '2026-06-05',
    amount: 'Rp 415 / lembar',
    description: 'Dividen tunai dengan yield estimasi ~11.2%.',
  },
  {
    id: 'ca-4',
    ticker: 'BMRI',
    type: 'RUPS',
    title: 'Rapat Umum Pemegang Saham Tahunan (RUPST)',
    date: '2026-03-25',
    description: 'Persetujuan laporan keuangan tahunan 2025 dan penetapan dividen tunai.',
  },
];
