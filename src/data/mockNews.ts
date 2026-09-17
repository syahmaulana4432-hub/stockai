import { NewsItem, CorporateAction } from '@/lib/types';

export const MOCK_NEWS_LIST: NewsItem[] = [
  {
    id: 'news-dom-1',
    title: 'Bank Indonesia Pertahankan BI-Rate di Level 6,00% untuk Menjaga Stabilitas Kurs Rupiah',
    source: 'Bank Indonesia Siaran Pers Sim',
    sourceUrl: 'https://demo-source.stockai.local/artikel/bi-rate-september-2026',
    publishedAt: '2026-09-16T14:30:00+07:00',
    category: 'Ekonomi Domestik',
    sector: 'Financials',
    sentiment: 'Positif',
    impactLevel: 'Tinggi',
    relatedTickers: ['BBCA', 'BMRI', 'BBRI', 'BBNI'],
    factContent:
      'Rapat Dewan Gubernur (RDG) Bank Indonesia pada 15-16 September 2026 memutuskan untuk mempertahankan BI-Rate sebesar 6,00%, suku bunga Deposit Facility 5,25%, dan suku bunga Lending Facility 6,75%. Inflasi IHK tercatat stabil di 2,1% (yoy).',
    aiInterpretation:
      'Keputusan ini mempertahankan stabilitas Net Interest Margin (NIM) perbankan tier-1 dengan rasio CASA tinggi seperti BBCA dan BMRI, sekaligus membatasi risiko lonjakan biaya dana (Cost of Funds). Namun, pertumbuhan kredit sektor konsumer berpotensi bergerak moderat.',
    summary:
      'Bank Indonesia mempertahankan BI-Rate di 6,00% untuk menjaga stabilitas nilai tukar Rupiah dan mengarahkan inflasi dalam sasaran.',
    impact: 'POSITIF',
  },
  {
    id: 'news-dom-2',
    title: 'BPS Laporkan Neraca Perdagangan Indonesia Surplus USD 2,8 Miliar pada Agustus 2026',
    source: 'BPS Rilis Data Sim',
    sourceUrl: 'https://demo-source.stockai.local/artikel/bps-neraca-perdagangan-aug2026',
    publishedAt: '2026-09-15T11:00:00+07:00',
    category: 'Ekonomi Domestik',
    sector: 'Macroeconomics',
    sentiment: 'Positif',
    impactLevel: 'Sedang',
    relatedTickers: ['ADRO', 'ASII'],
    factContent:
      'Badan Pusat Statistik (BPS) mencatat surplus neraca perdagangan Indonesia bulan Agustus 2026 sebesar USD 2,82 miliar, memperpanjang tren surplus selama 52 bulan berturut-turut. Ekspor non-migas tercatat USD 21,5 miliar.',
    aiInterpretation:
      'Surplus berkelanjutan menopang cadangan devisa dan ketahanan makroekonomi domestik. Namun, laju pertumbuhan ekspor komoditas batubara dan CPO mulai melambat secara tahunan (yoy), mengindikasikan katalis lebih terbatas untuk emiten eksportir komoditas murni.',
    summary:
      'Surplus neraca perdagangan Agustus 2026 mencapai USD 2,82 miliar didukung ekspor manufaktur dan komoditas.',
    impact: 'POSITIF',
  },
  {
    id: 'news-dom-3',
    title: 'Kementerian Keuangan Umumkan Realisasi Penerimaan Pajak Capai 68% dari Target APBN 2026',
    source: 'Kemenkeu Media Sim',
    sourceUrl: 'https://demo-source.stockai.local/artikel/apbn-kita-september-2026',
    publishedAt: '2026-09-14T10:15:00+07:00',
    category: 'Ekonomi Domestik',
    sector: 'Macroeconomics',
    sentiment: 'Netral',
    impactLevel: 'Rendah',
    relatedTickers: ['TLKM', 'ICBP'],
    factContent:
      'Realisasi penerimaan perpajakan hingga akhir Agustus 2026 tercatat sebesar Rp 1.340 triliun atau setara 68,2% dari target APBN 2026. Pertumbuhan penerimaan PPN dalam negeri melambat tipis 1,4% yoy.',
    aiInterpretation:
      'Indikasi perlambatan pertumbuhan PPN mengindikasikan normalisasi daya beli masyarakat kelas menengah, yang berpotensi menjadi perhatian bagi emiten fast-moving consumer goods (FMCG) dan operator telekomunikasi seluler.',
    summary:
      'Realisasi penerimaan pajak APBN mencapai 68,2% hingga Agustus 2026 dengan pertumbuhan PPN yang moderat.',
    impact: 'NETRAL',
  },
  {
    id: 'news-glob-1',
    title: 'Federal Reserve Pangkas Suku Bunga Fed Funds Sebesar 25 bps Menjadi 5,00%-5,25%',
    source: 'Federal Reserve Press Release Sim',
    sourceUrl: 'https://demo-source.stockai.local/artikel/fomc-rate-decision-sep2026',
    publishedAt: '2026-09-16T02:00:00+07:00',
    category: 'Ekonomi Global',
    sector: 'Global Macro',
    sentiment: 'Positif',
    impactLevel: 'Tinggi',
    relatedTickers: ['BBCA', 'BMRI', 'GOTO', 'TLKM'],
    factContent:
      'Komite Pasar Terbuka Federal (FOMC) menyetujui pemotongan suku bunga acuan Fed Funds Target Rate sebesar 25 basis poin ke rentang 5,00%–5,25%. Dot plot memproyeksikan potensi pemangkasan lanjutan 50 bps hingga akhir tahun.',
    aiInterpretation:
      'Pelonggaran moneter The Fed mempersempit disparitas yield US Treasury dengan SBN, membuka peluang arus modal masuk (foreign inflow) ke pasar saham emerging markets termasuk Indonesia. Emiten teknologi dan perbankan berkapitalisasi besar menjadi penerima manfaat utama aliran dana asing.',
    summary:
      'The Fed memulai siklus penurunan suku bunga sebesar 25 bps ke rentang 5,00%-5,25% dengan proyeksi pelonggaran lanjutan.',
    impact: 'POSITIF',
  },
  {
    id: 'news-glob-2',
    title: 'Pertumbuhan Sektor Manufaktur China Melambat di Bawah Ekspektasi (PMI 49,2)',
    source: 'National Bureau of Statistics China Sim',
    sourceUrl: 'https://demo-source.stockai.local/artikel/china-pmi-manufacturing-aug2026',
    publishedAt: '2026-09-13T09:00:00+07:00',
    category: 'Ekonomi Global',
    sector: 'Energy & Commodities',
    sentiment: 'Negatif',
    impactLevel: 'Tinggi',
    relatedTickers: ['ADRO', 'ASII'],
    factContent:
      'Indeks Manajer Pembelian (PMI) Manufaktur China berada di level 49,2 pada Agustus 2026, berada di zona kontraksi (<50) selama empat bulan berturut-turut. Permintaan impor bijih besi dan batubara termal melemah 3,8% mom.',
    aiInterpretation:
      'Kontraksi aktivitas pabrik China memberikan tekanan lanjutan terhadap harga acuan komoditas energi dan logam dasar global. Hal ini menjadi faktor pemberat (bearish risk) jangka pendek bagi emiten pertambangan batubara dan nikel di bursa domestik.',
    summary:
      'PMI manufaktur China terkontraksi ke 49,2 menekan ekspektasi permintaan komoditas energi global.',
    impact: 'NEGATIF',
  },
  {
    id: 'news-glob-3',
    title: 'Harga Minyak Mentah Brent Terkoreksi ke USD 73/Barel Akibat Kekhawatiran Permintaan Global',
    source: 'Energy Market Monitor Sim',
    sourceUrl: 'https://demo-source.stockai.local/artikel/brent-crude-oil-drop-2026',
    publishedAt: '2026-09-12T16:45:00+07:00',
    category: 'Ekonomi Global',
    sector: 'Energy',
    sentiment: 'Negatif',
    impactLevel: 'Sedang',
    relatedTickers: ['ADRO'],
    factContent:
      'Minyak mentah berjangka Brent turun 2,4% menjadi USD 73,15 per barel menyusul rencana OPEC+ meningkatkan pasokan secara bertahap mulai kuartal IV 2026 di tengah proyeksi konsumsi energi global yang lesu.',
    aiInterpretation:
      'Penurunan harga minyak global mengurangi beban biaya input logistik industri manufaktur dan transportasi, namun menekan sentimen keseluruhan sektor energi dan emiten komoditas fosil.',
    summary:
      'Brent melemah ke level USD 73/barel akibat potensi oversupply OPEC+ dan perlambatan konsumsi energi.',
    impact: 'NEGATIF',
  },
  {
    id: 'news-sekt-1',
    title: 'OJK Terbitkan POJK Baru Terkait Penguatan Permodalan dan Tata Kelola Digital Banking',
    source: 'Otoritas Jasa Keuangan Siaran Pers Sim',
    sourceUrl: 'https://demo-source.stockai.local/artikel/pojk-tata-kelola-digital-banking-2026',
    publishedAt: '2026-09-15T15:00:00+07:00',
    category: 'Sektor',
    sector: 'Financials',
    sentiment: 'Netral',
    impactLevel: 'Sedang',
    relatedTickers: ['BBCA', 'BBRI', 'BMRI', 'GOTO'],
    factContent:
      'Otoritas Jasa Keuangan (OJK) merilis peraturan nomor POJK 14/2026 yang mewajibkan bank umum dan platform fintech lending meningkatkan rasio ketahanan siber serta transparansi penetapan bunga kredit pinjaman daring.',
    aiInterpretation:
      'Regulasi ini mempertegas keunggulan kompetitif bank besar (KBMI 4) yang telah memiliki infrastruktur IT matang, namun menambah beban kepatuhan (compliance cost) bagi bank digital skala menengah-kecil dan ekosistem fintech.',
    summary:
      'OJK memperketat aturan ketahanan siber dan tata kelola transparansi produk perbankan digital.',
    impact: 'NETRAL',
  },
  {
    id: 'news-sekt-2',
    title: 'Asosiasi Industri Otomotif (Gaikindo) Catat Penjualan Mobil Listrik Naik 42% YoY',
    source: 'Gaikindo Press Release Sim',
    sourceUrl: 'https://demo-source.stockai.local/artikel/gaikindo-penjualan-ev-agustus-2026',
    publishedAt: '2026-09-14T14:20:00+07:00',
    category: 'Sektor',
    sector: 'Automotive',
    sentiment: 'Positif',
    impactLevel: 'Sedang',
    relatedTickers: ['ASII'],
    factContent:
      'Penjualan kendaraan bermotor listrik berbasis baterai (BEV) di pasar domestik mencapai 4.250 unit pada Agustus 2026, naik 42,3% dibandingkan periode yang sama tahun lalu. Total pangsa pasar EV mencapai 5,8% dari total wholesale.',
    aiInterpretation:
      'Meningkatnya adopsi EV mempercepat transformasi portofolio emiten otomotif konvensional. ASII terus menambah lini model hybrid dan BEV guna mengamankan pangsa pasar di tengah gempuran brand otomotif internasional baru.',
    summary:
      'Wholesale kendaraan listrik tumbuh 42% yoy di Indonesia dipicu insentif PPN DTP dan ragam pilihan model baru.',
    impact: 'POSITIF',
  },
  {
    id: 'news-sekt-3',
    title: 'Tarif Data Telekomunikasi Diproyeksikan Naik Bertahap Menuju Konsolidasi Industri Sehat',
    source: 'Telecom Industry Outlook Sim',
    sourceUrl: 'https://demo-source.stockai.local/artikel/telco-data-yield-consolidation-2026',
    publishedAt: '2026-09-11T13:30:00+07:00',
    category: 'Sektor',
    sector: 'Telecommunication',
    sentiment: 'Positif',
    impactLevel: 'Sedang',
    relatedTickers: ['TLKM'],
    factContent:
      'Rata-rata data yield operator telekomunikasi nasional menunjukkan tren perbaikan ke Rp 3.850 per GB pada Q3 2026, naik 3,5% mom menyusul berkurangnya perang tarif paket internet unlimited murah.',
    aiInterpretation:
      'Perbaikan yield data menjadi katalis pemulihan Average Revenue Per User (ARPU) bagi Telkomsel (TLKM). Disiplin harga kompetitor mendukung stabilitas margin profitabilitas segmen mobile.',
    summary:
      'Sektor telekomunikasi menikmati pemulihan ARPU seiring membaiknya disiplin tarif data antar operator.',
    impact: 'POSITIF',
  },
  {
    id: 'news-emt-1',
    title: 'BBCA Bukukan Laba Bersih Konsolidasian Rp 39,2 Triliun pada 8M2026 (+12,8% YoY)',
    source: 'Keterbukaan Informasi BEI Sim',
    sourceUrl: 'https://demo-source.stockai.local/artikel/bbca-laba-bersih-agustus-2026',
    publishedAt: '2026-09-16T08:30:00+07:00',
    category: 'Emiten',
    sector: 'Financials',
    sentiment: 'Positif',
    impactLevel: 'Tinggi',
    relatedTickers: ['BBCA'],
    factContent:
      'PT Bank Central Asia Tbk (BBCA) mengumumkan laba bersih bank-only hingga Agustus 2026 sebesar Rp 39,2 triliun, tumbuh 12,8% yoy. Kredit korporasi tumbuh 14,5% yoy dengan NPL gross bertahan rendah di 1,8%.',
    aiInterpretation:
      'Kinerja operasional solid mengonfirmasi ketahanan fundamental BBCA di tengah siklus suku bunga tinggi. Efisiensi Cost of Funds dari CASA 81% menjadi pendorong utama profitabilitas (ROE > 21%). Menopang tesis Bullish Setup jangka menengah.',
    summary:
      'Laba bersih BBCA tumbuh 12,8% yoy hingga Agustus 2026 ditopang pertumbuhan kredit korporasi dan CASA 81%.',
    impact: 'POSITIF',
  },
  {
    id: 'news-emt-2',
    title: 'BBRI Tingkatkan Pencadangan Kredit Mikro (CKPN Coverage) untuk Antisipasi NPL Segmen UMKM',
    source: 'Keterbukaan Informasi BEI Sim',
    sourceUrl: 'https://demo-source.stockai.local/artikel/bbri-pencadangan-ckpn-2026',
    publishedAt: '2026-09-14T17:00:00+07:00',
    category: 'Emiten',
    sector: 'Financials',
    sentiment: 'Netral',
    impactLevel: 'Tinggi',
    relatedTickers: ['BBRI'],
    factContent:
      'PT Bank Rakyat Indonesia (Persero) Tbk (BBRI) meningkatkan rasio coverage CKPN menjadi 215% per Agustus 2026 seiring strategi konservatif menyaring debitur segmen Kupedes dan KUR.',
    aiInterpretation:
      'Peningkatan CKPN menekan laba bersih jangka pendek akibat naiknya beban provisi (Credit Cost ~3,2%), namun memberikan bantalan proteksi aset yang lebih sehat untuk pemulihan kualitas aset pada tahun 2027.',
    summary:
      'BBRI mempertebal pencadangan risiko kredit mikro guna mengamankan kualitas neraca perbankan.',
    impact: 'NETRAL',
  },
  {
    id: 'news-emt-3',
    title: 'ADRO Rampungkan Kajian Spin-off Unit Bisnis Batubara Termal Menuju Portofolio Hijau',
    source: 'Keterbukaan Informasi BEI Sim',
    sourceUrl: 'https://demo-source.stockai.local/artikel/adro-spinoff-batubara-termal-2026',
    publishedAt: '2026-09-15T09:15:00+07:00',
    category: 'Emiten',
    sector: 'Energy',
    sentiment: 'Positif',
    impactLevel: 'Tinggi',
    relatedTickers: ['ADRO'],
    factContent:
      'PT Adaro Energy Indonesia Tbk (ADRO) mengumumkan rencana restrukturisasi korporasi untuk memisahkan pilar batubara termal (Adaro Energy) dari pilar mineral hijau dan energi terbarukan (Adaro Minerals & Green Energy).',
    aiInterpretation:
      'Rencana spin-off berpotensi membuka kunci valuasi (valuation unlocking) untuk bisnis smelter aluminium hijau dan EBT yang sebelumnya terdiskon oleh valuasi komoditas batubara termal kotor. Potensi pembagian dividen saham atau kas spesial menjadi perhatian investor.',
    summary:
      'ADRO mempersiapkan restrukturisasi portofolio untuk memisahkan lini batubara termal dan hilirisasi hijau.',
    impact: 'POSITIF',
  },
  {
    id: 'news-emt-4',
    title: 'GoTo Perluas Layanan Buy-Now-Pay-Later (GoPay Later) Bersama Mitra Finansial Strategis',
    source: 'Tech In Asia Demo Sim',
    sourceUrl: 'https://demo-source.stockai.local/artikel/goto-gopay-later-expansion-2026',
    publishedAt: '2026-09-13T11:45:00+07:00',
    category: 'Emiten',
    sector: 'Technology',
    sentiment: 'Positif',
    impactLevel: 'Sedang',
    relatedTickers: ['GOTO'],
    factContent:
      'PT GoTo Gojek Tokopedia Tbk (GOTO) mencatat total penyaluran pinjaman melalui GoPay Finansial melampaui Rp 4,5 triliun pada kuartal II 2026, dengan NPL 90 hari terjaga di level 1,3%.',
    aiInterpretation:
      'Pertumbuhan segmen fintech ber-margin tinggi menjadi pilar utama diversifikasi pendapatan pasca dekonsolidasi e-commerce Tokopedia. Membantu mempercepat pencapaian target Adjusted EBITDA positif berkelanjutan.',
    summary:
      'Penyaluran pembiayaan digital GoPay Finansial melonjak dengan kualitas kredit terjaga di 1,3% NPL.',
    impact: 'POSITIF',
  },
  {
    id: 'news-emt-5',
    title: 'ICBP Hadapi Tekanan Fluktuasi Nilai Tukar Terhadap Pembayaran Utang Valas Pinehill',
    source: 'Investor Daily Market Sim',
    sourceUrl: 'https://demo-source.stockai.local/artikel/icbp-valas-pinehill-liability-2026',
    publishedAt: '2026-09-11T09:20:00+07:00',
    category: 'Emiten',
    sector: 'Consumer Staples',
    sentiment: 'Negatif',
    impactLevel: 'Sedang',
    relatedTickers: ['ICBP'],
    factContent:
      'PT Indofood CBP Sukses Makmur Tbk (ICBP) mencatat potensi kerugian selisih kurs yang belum terealisasi (unrealized forex loss) atas obligasi valas berdenominasi USD senilai total USD 1,75 miliar.',
    aiInterpretation:
      'Meskipun kinerja penjualan mi instan di pasar Timur Tengah & Afrika tetap kuat dalam mata uang lokal, volatilitas kurs Rupiah terhadap Dollar AS sewaktu-waktu dapat mendistorsi laba bersih bottom-line akuntansi ICBP.',
    summary:
      'Liabilitas obligasi valas Pinehill mengekspos laba akuntansi ICBP terhadap fluktuasi kurs USD/IDR.',
    impact: 'NEGATIF',
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

