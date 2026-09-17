import { InstrumentMasterItem } from '@/lib/instrumentMasterTypes';
import { MOCK_STOCKS } from './mockStocks';
import { generateCandles, MOCK_CANDLES_BY_TICKER } from './mockCandles';

export const INSTRUMENT_MASTER: InstrumentMasterItem[] = [
  // ==================== 1. INDONESIA (IDX) ====================
  {
    instrumentId: 'IDX:BBCA',
    symbol: 'BBCA',
    companyName: 'Bank Central Asia',
    legalName: 'PT Bank Central Asia Tbk',
    assetType: 'Stock',
    country: 'Indonesia',
    countryCode: 'ID',
    region: 'Asia Pacific',
    exchange: 'IDX',
    currency: 'IDR',
    sector: 'Financials',
    industry: 'Commercial Banking',
    isin: 'ID1000106705',
    aliases: ['BCA', 'Bank BCA', 'Central Asia', 'Bank Central Asia'],
    providerSymbols: { yahoo: 'BBCA.JK', bloomberg: 'BBCA:IJ', reuters: 'BBCA.JK' },
    price: 10250,
    prevClose: 10125,
    change: 125,
    changePercent: 1.23,
    open: 10150,
    high: 10300,
    low: 10125,
    volume: 48520000,
    turnover: 497330000000,
    marketCap: 1263500000000000,
    pe: 23.4,
    pbv: 4.8,
    roe: 21.8,
    dividendYield: 2.8,
    rsi: 58.4,
    feedStatus: 'DEMO',
    dataSourceLabel: 'Bursa Efek Indonesia (IDX) - Simulated Feed Phase 1',
    cutoffTimestamp: '2026-09-16T16:00:00+07:00',
    marketStatusText: 'Closed (Regular Session)',
    profile: {
      overview: 'PT Bank Central Asia Tbk (BCA) adalah bank swasta terbesar di Indonesia yang berfokus pada layanan perbankan transaksi, kredit komersial, korporasi, serta pembiayaan konsumen dengan ekosistem digital terkuat di tanah air.',
      whatTheyDo: 'BCA menyediakan ekosistem transaksi perbankan ritel, kartu kredit, kredit korporasi, KPR, KKB, serta perbankan digital (myBCA, BCA mobile, KlikBCA) kepada lebih dari 37 juta rekening nasabah.',
      businessModel: 'Model bisnis berbasis Transaction Banking berbiaya dana murah (CASA > 80%), margin bunga bersih (NIM) stabil di kisaran 5.5% - 5.8%, serta pendapatan non-bunga (fee-based income) yang masif dari transaksi digital dan payment gateway.',
      revenueDrivers: [
        { segment: 'Pendapatan Bunga Bersih (NII)', sharePercent: 74, description: 'Bunga dari kredit korporasi, komersial, UKM, KPR, dan KKB setelah dikurangi beban bunga deposito/tabungan.' },
        { segment: 'Fee & Commission Income', sharePercent: 18, description: 'Biaya admin transaksi, payment transfer, kartu kredit, bancassurance, dan reksadana/wealth management.' },
        { segment: 'Treasury & Operasional Lainnya', sharePercent: 8, description: 'Pendapatan dari transaksi valuta asing, surat berharga negara, dan provisi lainnya.' }
      ],
      productsAndServices: [
        { category: 'Perbankan Ritel & Digital', items: ['Tahapan BCA', 'BCA Dollar', 'myBCA', 'BCA Mobile', 'QRIS Merchant', 'Sakuku'] },
        { category: 'Pinjaman & Pembiayaan', items: ['Kredit Pemilikan Rumah (KPR)', 'Kredit Kendaraan Bermotor (KKB)', 'Kredit Korporasi', 'Kredit Sindikasi', 'Kredit Usaha Rakyat (KUR)'] },
        { category: 'Wealth & Treasury', items: ['BCA Prioritas & Solitaire', 'Bancassurance', 'Reksadana & Obligasi Ritel', 'Valas & Hedging'] }
      ],
      targetMarkets: ['Nasabah Ritel & Segmen Menengah-Atas Indonesia', 'Korporasi Konglomerasi Nasional & Multinasional', 'Pelaku Bisnis UKM dan Rantai Pasok Nasional'],
      catalysts: [
        { title: 'Pertumbuhan Transaksi Digital myBCA', timeframe: '2026 - 2027', expectedImpact: 'Pertumbuhan fee-based income dua digit serta retensi CASA 81%+', description: 'Migrasi transaksi ke myBCA membuka peluang personalisasi produk dan cross-selling produk wealth.' },
        { title: 'Ekspansi Kredit Korporasi & Hilirisasi', timeframe: 'Q3-Q4 2026', expectedImpact: 'Penyaluran kredit tumbuh 10-12% YoY', description: 'Peningkatan pembiayaan sindikasi pada proyek infrastruktur energi baru dan rantai pasok industri.' }
      ],
      risks: [
        { category: 'Makroekonomi', title: 'Volatilitas Suku Bunga Global (Higher-for-Longer)', impact: 'SEDANG', description: 'Potensi kenaikan biaya dana perbankan secara umum bila suku bunga acuan bertahan tinggi.' },
        { category: 'Kredit', title: 'Peningkatan NPL Sektor Komersial', impact: 'RENDAH', description: 'Kenaikan rasio kredit bermasalah bila daya beli domestik melemah signifikan.' }
      ],
      management: {
        boardOfDirectors: [
          { name: 'Jahja Setiaatmadja', role: 'Presiden Direktur', since: '2011' },
          { name: 'Armand W. Hartono', role: 'Wakil Presiden Direktur', since: '2016' },
          { name: 'Gregory Hendra Lembong', role: 'Wakil Presiden Direktur', since: '2022' }
        ],
        boardOfCommissioners: [
          { name: 'Djohan Emir Setijoso', role: 'Presiden Komisaris', since: '2011' },
          { name: 'Tonny Kusnadi', role: 'Komisaris', since: '2009' }
        ],
        majorShareholders: [
          { name: 'PT Dwimuria Investama Andalan (Grup Djarum)', percentage: 54.94 },
          { name: 'Publik (Investor Domestik & Asing)', percentage: 45.06 }
        ]
      },
      peers: ['BBRI', 'BMRI', 'BBNI', 'D05']
    },
    candles: MOCK_CANDLES_BY_TICKER['BBCA'] || generateCandles(10000),
    financials: MOCK_STOCKS.find(s => s.ticker === 'BBCA')?.financials,
    ratios: MOCK_STOCKS.find(s => s.ticker === 'BBCA')?.ratios,
    corporateActions: MOCK_STOCKS.find(s => s.ticker === 'BBCA')?.corporateActions,
    news: MOCK_STOCKS.find(s => s.ticker === 'BBCA')?.news,
    aiAnalysis: MOCK_STOCKS.find(s => s.ticker === 'BBCA')?.aiAnalysis
  },

  {
    instrumentId: 'IDX:BBRI',
    symbol: 'BBRI',
    companyName: 'Bank Rakyat Indonesia',
    legalName: 'PT Bank Rakyat Indonesia (Persero) Tbk',
    assetType: 'Stock',
    country: 'Indonesia',
    countryCode: 'ID',
    region: 'Asia Pacific',
    exchange: 'IDX',
    currency: 'IDR',
    sector: 'Financials',
    industry: 'Commercial Banking',
    isin: 'ID1000118205',
    aliases: ['BRI', 'Bank BRI', 'Rakyat Indonesia'],
    providerSymbols: { yahoo: 'BBRI.JK', bloomberg: 'BBRI:IJ' },
    price: 5175,
    prevClose: 5200,
    change: -25,
    changePercent: -0.48,
    open: 5200,
    high: 5250,
    low: 5150,
    volume: 84200000,
    turnover: 437840000000,
    marketCap: 784300000000000,
    pe: 13.2,
    pbv: 2.4,
    roe: 19.5,
    dividendYield: 6.2,
    rsi: 46.8,
    feedStatus: 'DEMO',
    dataSourceLabel: 'Bursa Efek Indonesia (IDX) - Simulated Feed Phase 1',
    cutoffTimestamp: '2026-09-16T16:00:00+07:00',
    marketStatusText: 'Closed (Regular Session)',
    profile: {
      overview: 'PT Bank Rakyat Indonesia (Persero) Tbk adalah bank BUMN terbesar di Indonesia dengan fokus utama pada pembiayaan segmen usaha mikro, kecil, dan menengah (UMKM) melalui jaringan agen branchless BRILink dan Holding Ultra Mikro.',
      whatTheyDo: 'BRI menyalurkan pembiayaan mikro (Kupedes, KUR), pembiayaan ultra mikro (Pegadaian & PNM), serta menghimpun dana masyarakat melalui jaringan kantor fisik dan aplikasi BRImo.',
      businessModel: 'Model bisnis berbasis margin tinggi dari segmen mikro (yield pinjaman mikro > 12%), didukung oleh jaringan penetrasi branchless banking AgenBRILink yang menghasilkan fee masif dan struktur dana murah pedesaan.',
      revenueDrivers: [
        { segment: 'Pendapatan Bunga Kredit Mikro & Ultra Mikro', sharePercent: 68, description: 'Bunga dari pinjaman KUR, Kupedes, Pegadaian, dan PNM Mekaar.' },
        { segment: 'Kredit Korporasi & Konsumer', sharePercent: 18, description: 'Pinjaman korporasi BUMN dan non-BUMN serta payroll pinjaman pegawai.' },
        { segment: 'Fee Transaksi & AgenBRILink', sharePercent: 14, description: 'Biaya transaksi transfer, top-up BRImo, pembayaran tagihan, dan sharing fee agen.' }
      ],
      productsAndServices: [
        { category: 'Perbankan Mikro & Ultra Mikro', items: ['KUR BRI', 'Kupedes', 'Pegadaian Gadai Emas', 'PNM Mekaar', 'AgenBRILink'] },
        { category: 'Digital & Ritel', items: ['BRImo Super App', 'BritAma', 'Simpedes', 'Kartu Debit & Kredit BRI'] },
        { category: 'Korporasi & Institusi', items: ['Cash Management System', 'Sindikasi Infrastruktur', 'Trade Finance'] }
      ],
      targetMarkets: ['Pelaku Usaha Mikro & Ultra Mikro Indonesia', 'Masyarakat Semi-Urban dan Pedesaan', 'Segmen Korporasi Agribisnis dan BUMN'],
      catalysts: [
        { title: 'Sinergi Holding Ultra Mikro (BRI-Pegadaian-PNM)', timeframe: '2026 - 2027', expectedImpact: 'Efisiensi opex dan penurunan credit cost mikro', description: 'Cross-selling produk gadai dan investasi emas ke nasabah PNM dan BRImo.' },
        { title: 'Monetisasi Ekosistem AgenBRILink', timeframe: '2026', expectedImpact: 'Pertumbuhan CASA mikro dan fee-based income berkelanjutan', description: 'Peningkatan transaksi non-tunai di pelosok melalui QRIS AgenBRILink.' }
      ],
      risks: [
        { category: 'Kualitas Aset', title: 'Kenaikan Rasio Loan at Risk (LAR) Mikro', impact: 'TINGGI', description: 'Tekanan inflasi bahan pangan pada daya beli pelaku usaha ultra mikro.' }
      ],
      management: {
        boardOfDirectors: [
          { name: 'Sunarso', role: 'Direktur Utama', since: '2019' },
          { name: 'Catur Budi Harto', role: 'Wakil Direktur Utama', since: '2019' }
        ],
        majorShareholders: [
          { name: 'Negara Republik Indonesia (Kementerian BUMN)', percentage: 53.19 },
          { name: 'Publik (Investor Domestik & Internasional)', percentage: 46.81 }
        ]
      },
      peers: ['BBCA', 'BMRI', 'BBNI']
    },
    candles: MOCK_CANDLES_BY_TICKER['BBRI'] || generateCandles(5200),
    financials: MOCK_STOCKS.find(s => s.ticker === 'BBRI')?.financials,
    ratios: MOCK_STOCKS.find(s => s.ticker === 'BBRI')?.ratios,
    corporateActions: MOCK_STOCKS.find(s => s.ticker === 'BBRI')?.corporateActions,
    news: MOCK_STOCKS.find(s => s.ticker === 'BBRI')?.news,
    aiAnalysis: MOCK_STOCKS.find(s => s.ticker === 'BBRI')?.aiAnalysis
  },

  {
    instrumentId: 'IDX:TLKM',
    symbol: 'TLKM',
    companyName: 'Telkom Indonesia',
    legalName: 'PT Telkom Indonesia (Persero) Tbk',
    assetType: 'Stock',
    country: 'Indonesia',
    countryCode: 'ID',
    region: 'Asia Pacific',
    exchange: 'IDX',
    currency: 'IDR',
    sector: 'Telecommunication',
    industry: 'Telecommunications Services',
    isin: 'ID1000129004',
    aliases: ['Telkom', 'Telkomsel', 'IndiHome', 'PT Telkom'],
    providerSymbols: { yahoo: 'TLKM.JK', bloomberg: 'TLKM:IJ' },
    price: 3120,
    prevClose: 3100,
    change: 20,
    changePercent: 0.65,
    open: 3100,
    high: 3150,
    low: 3090,
    volume: 52300000,
    turnover: 163176000000,
    marketCap: 309090000000000,
    pe: 12.8,
    pbv: 2.1,
    roe: 17.2,
    dividendYield: 5.6,
    rsi: 49.2,
    feedStatus: 'DEMO',
    dataSourceLabel: 'Bursa Efek Indonesia (IDX) - Simulated Feed Phase 1',
    cutoffTimestamp: '2026-09-16T16:00:00+07:00',
    marketStatusText: 'Closed (Regular Session)',
    profile: {
      overview: 'PT Telkom Indonesia (Persero) Tbk adalah konglomerasi telekomunikasi dan digital network terbesar di Indonesia yang menguasai infrastruktur fiber optik, jaringan seluler (Telkomsel), tower, serta pusat data (Data Center).',
      whatTheyDo: 'Telkom menyediakan konektivitas seluler 4G/5G, broadband fixed IndiHome (FMC), layanan data center NeutraDC, kabel optik bawah laut, dan solusi IT enterprise B2B.',
      businessModel: 'Model bisnis berbasis Fixed Mobile Convergence (FMC) yang menggabungkan pelanggan IndiHome dan Telkomsel, didukung recurring revenue dari data center dan bisnis tower Mitratel.',
      revenueDrivers: [
        { segment: 'Konektivitas Mobile & Broadband (Telkomsel + IndiHome)', sharePercent: 72, description: 'Paket data seluler, voice/SMS, serta langganan internet fiber optik rumah tangga.' },
        { segment: 'Enterprise & B2B IT Solutions', sharePercent: 18, description: 'Cloud, IoT, cybersecurity, dan solusi jaringan untuk korporasi serta instansi pemerintah.' },
        { segment: 'Infrastruktur & Data Center (NeutraDC, Mitratel)', sharePercent: 10, description: 'Sewa menara telekomunikasi dan kapasitas hyperscale data center.' }
      ],
      productsAndServices: [
        { category: 'Layanan Seluler & Rumah Tangga', items: ['Telkomsel Halo & Prabayar', 'IndiHome by Telkomsel', 'Orbit Home Router'] },
        { category: 'Infrastruktur Digital & B2B', items: ['NeutraDC Hyperscale Data Center', 'Mitratel Tower Leasing', 'TelkomCloud', 'SATRIA Satellite Connectivity'] }
      ],
      targetMarkets: ['Masyarakat Indonesia (200+ juta pengguna mobile)', 'Rumah Tangga Ritel Berlangganan Fiber Optic', 'Korporasi Hyperscalers (AWS, Google Cloud, Microsoft)'],
      catalysts: [
        { title: 'Ekspansi Hyperscale Data Center NeutraDC', timeframe: '2026 - 2028', expectedImpact: 'Peningkatan kontribusi recurring income segmen B2B', description: 'Peningkatan kapasitas MW data center di Cikarang dan Batam untuk melayani AI workload regional.' },
        { title: 'Efisiensi Fixed Mobile Convergence (FMC)', timeframe: '2026', expectedImpact: 'Penurunan churn rate dan peningkatan ARPU', description: 'Integrasi operasional IndiHome ke dalam ekosistem Telkomsel menurunkan biaya akuisisi pelanggan.' }
      ],
      risks: [
        { category: 'Kompetisi', title: 'Perang Harga Paket Data Seluler', impact: 'SEDANG', description: 'Persaingan tarif data agresif dari operator kompetitor dapat menekan ARPU.' }
      ],
      management: {
        boardOfDirectors: [
          { name: 'Ririek Adriansyah', role: 'Direktur Utama', since: '2019' },
          { name: 'Heri Supriadi', role: 'Direktur Keuangan & Manajemen Risiko', since: '2020' }
        ],
        majorShareholders: [
          { name: 'Negara Republik Indonesia (Kementerian BUMN)', percentage: 52.09 },
          { name: 'Publik (Domestik & Global Nyse:TLK)', percentage: 47.91 }
        ]
      },
      peers: ['EXCL', 'ISAT', 'AAPL']
    },
    candles: MOCK_CANDLES_BY_TICKER['TLKM'] || generateCandles(3100),
    financials: MOCK_STOCKS.find(s => s.ticker === 'TLKM')?.financials,
    ratios: MOCK_STOCKS.find(s => s.ticker === 'TLKM')?.ratios,
    corporateActions: MOCK_STOCKS.find(s => s.ticker === 'TLKM')?.corporateActions,
    news: MOCK_STOCKS.find(s => s.ticker === 'TLKM')?.news,
    aiAnalysis: MOCK_STOCKS.find(s => s.ticker === 'TLKM')?.aiAnalysis
  },

  {
    instrumentId: 'IDX:ASII',
    symbol: 'ASII',
    companyName: 'Astra International',
    legalName: 'PT Astra International Tbk',
    assetType: 'Stock',
    country: 'Indonesia',
    countryCode: 'ID',
    region: 'Asia Pacific',
    exchange: 'IDX',
    currency: 'IDR',
    sector: 'Consumer Discretionary',
    industry: 'Automotive & Heavy Equipment',
    isin: 'ID1000058401',
    aliases: ['Astra', 'Astra Honda', 'Toyota Astra', 'United Tractors'],
    providerSymbols: { yahoo: 'ASII.JK', bloomberg: 'ASII:IJ' },
    price: 4980,
    prevClose: 5050,
    change: -70,
    changePercent: -1.39,
    open: 5050,
    high: 5075,
    low: 4950,
    volume: 38900000,
    turnover: 193722000000,
    marketCap: 201600000000000,
    pe: 6.8,
    pbv: 0.95,
    roe: 14.8,
    dividendYield: 8.5,
    rsi: 42.1,
    feedStatus: 'DEMO',
    dataSourceLabel: 'Bursa Efek Indonesia (IDX) - Simulated Feed Phase 1',
    cutoffTimestamp: '2026-09-16T16:00:00+07:00',
    marketStatusText: 'Closed (Regular Session)',
    profile: {
      overview: 'PT Astra International Tbk adalah salah satu konglomerasi terbesar di Indonesia yang memiliki 7 lini bisnis utama: Otomotif, Jasa Keuangan, Alat Berat & Pertambangan (United Tractors), Agribisnis (Astra Agro), Infrastruktur & Logistik, Teknologi Informasi, dan Properti.',
      whatTheyDo: 'Astra mendistribusikan kendaraan merek Toyota, Daihatsu, Isuzu, dan sepeda motor Honda, menyewakan alat berat Komatsu, pembiayaan kredit otomotif (ACC, FIFGROUP), serta mengoperasikan jalan tol trans-Jawa.',
      businessModel: 'Model bisnis konglomerasi terintegrasi dari hulu ke hilir: perakitan otomotif, distribusi ritel, pembiayaan konsumen, asuransi (Asuransi Astra), dan purna jual suku cadang (Astra Otoparts).',
      revenueDrivers: [
        { segment: 'Alat Berat, Pertambangan, Konstruksi, Energi (UNTR)', sharePercent: 42, description: 'Penjualan Komatsu, kontraktor tambang PAMA, penjualan batubara dan emas.' },
        { segment: 'Otomotif & Komponen', sharePercent: 39, description: 'Penjualan mobil Toyota/Daihatsu dan motor Honda serta suku cadang.' },
        { segment: 'Jasa Keuangan', sharePercent: 11, description: 'Pembiayaan kredit kendaraan melalui ACC, TAF, dan FIFGROUP.' },
        { segment: 'Agribisnis & Infrastruktur', sharePercent: 8, description: 'Kelapa sawit (AALI), konsesi jalan tol, dan properti.' }
      ],
      productsAndServices: [
        { category: 'Otomotif & Mobilitas', items: ['Toyota', 'Daihatsu', 'Honda Motor', 'Astra Otoparts', 'Auto2000'] },
        { category: 'Alat Berat & Energi', items: ['United Tractors', 'PAMA Persada Nusantara', 'Komatsu', 'Tambang Emas Martabe'] },
        { category: 'Jasa Keuangan', items: ['FIFGROUP', 'Astra Credit Companies (ACC)', 'Asuransi Astra (Garda Oto)', 'Bank Jasa Jakarta (Bank Saqu)'] }
      ],
      targetMarkets: ['Pasar Konsumen Otomotif Roda Dua dan Roda Empat Indonesia', 'Sektor Pertambangan Batubara dan Mineral', 'Pengguna Transportasi Jalan Tol dan Logistik'],
      catalysts: [
        { title: 'Peluncuran Portofolio Hybrid & EV Terjangkau', timeframe: '2026 - 2027', expectedImpact: 'Mempertahankan pangsa pasar mobil > 50%', description: 'Peluncuran varian hybrid lokal untuk menghadapi gempuran produsen EV Tiongkok.' },
        { title: 'Pengembangan Bank Saqu (Digital Banking)', timeframe: '2026', expectedImpact: 'Akuisisi jutaan solopreneur & peningkatan penetrasi CASA', description: 'Kolaborasi ekosistem Astra dengan WeLab memperluas jangkauan pembiayaan digital.' }
      ],
      risks: [
        { category: 'Kompetisi', title: 'Persaingan Produsen Mobil Listrik Global', impact: 'TINGGI', description: 'Masuknya pabrikan EV Tiongkok dengan harga agresif berpotensi menggerus market share konvensional.' }
      ],
      management: {
        boardOfDirectors: [
          { name: 'Djony Bunarto Tjondro', role: 'Presiden Direktur', since: '2020' },
          { name: 'Suparno Djasmin', role: 'Direktur', since: '2014' }
        ],
        majorShareholders: [
          { name: 'Jardine Cycle & Carriage Ltd', percentage: 50.11 },
          { name: 'Publik & Institusi', percentage: 49.89 }
        ]
      },
      peers: ['7203', 'TSLA', 'ADRO']
    },
    candles: MOCK_CANDLES_BY_TICKER['ASII'] || generateCandles(5000),
    financials: MOCK_STOCKS.find(s => s.ticker === 'ASII')?.financials,
    ratios: MOCK_STOCKS.find(s => s.ticker === 'ASII')?.ratios,
    corporateActions: MOCK_STOCKS.find(s => s.ticker === 'ASII')?.corporateActions,
    news: MOCK_STOCKS.find(s => s.ticker === 'ASII')?.news,
    aiAnalysis: MOCK_STOCKS.find(s => s.ticker === 'ASII')?.aiAnalysis
  },

  // ==================== 2. UNITED STATES (US) ====================
  {
    instrumentId: 'US:NASDAQ:AAPL',
    symbol: 'AAPL',
    companyName: 'Apple Inc.',
    legalName: 'Apple Incorporated',
    assetType: 'Stock',
    country: 'United States',
    countryCode: 'US',
    region: 'Americas',
    exchange: 'NASDAQ',
    currency: 'USD',
    sector: 'Technology',
    industry: 'Consumer Electronics',
    isin: 'US0378331005',
    aliases: ['Apple', 'iPhone', 'MacBook', 'Tim Cook', 'Apple Computer'],
    providerSymbols: { yahoo: 'AAPL', bloomberg: 'AAPL:US', reuters: 'AAPL.O' },
    price: 232.50,
    prevClose: 229.18,
    change: 3.32,
    changePercent: 1.45,
    open: 229.80,
    high: 233.40,
    low: 229.10,
    volume: 54200000,
    turnover: 12601500000,
    marketCap: 3540000000000,
    marketCapUSD: 3540000000000,
    pe: 33.9,
    pbv: 48.2,
    roe: 147.2,
    dividendYield: 0.45,
    rsi: 61.2,
    feedStatus: 'DEMO',
    dataSourceLabel: 'NASDAQ / Consolidated Tape Association - Simulated Feed Phase 1',
    cutoffTimestamp: '2026-09-16T16:00:00-04:00',
    marketStatusText: 'Closed (Regular Session)',
    profile: {
      overview: 'Apple Inc. adalah raksasa teknologi global asal Cupertino, California yang merancang, mengembangkan, dan memasarkan perangkat keras elektronik konsumen, sistem operasi perangkat lunak, dan layanan digital berlangganan dengan ekosistem perangkat aktif lebih dari 2,2 miliar unit di seluruh dunia.',
      whatTheyDo: 'Apple memproduksi iPhone, Mac, iPad, Apple Watch, Apple Vision Pro, serta menyediakan ekosistem layanan berulang (App Store, Apple Music, iCloud+, Apple Pay, AppleCare, Apple TV+).',
      businessModel: 'Model bisnis integrasi perangkat keras premium (hardware margins ~36%) dengan layanan langganan digital berekspansi tinggi (services margin ~74%) yang menghasilkan cash flow operasional masif dan program buyback saham berkelanjutan.',
      revenueDrivers: [
        { segment: 'iPhone', sharePercent: 52, description: 'Penjualan lini produk iPhone standar dan seri Pro secara global.' },
        { segment: 'Services (Layanan Digital)', sharePercent: 23, description: 'Pendapatan langganan dari App Store, iCloud+, Apple Music, Apple Pay, dan lisensi pencarian.' },
        { segment: 'Wearables, Home & Accessories', sharePercent: 10, description: 'Apple Watch, AirPods, HomePod, Beats, dan aksesori resmi.' },
        { segment: 'Mac & iPad', sharePercent: 15, description: 'Komputer MacBook, Mac Studio, iMac bertenaga chip Apple Silicon M-series dan tablet iPad.' }
      ],
      productsAndServices: [
        { category: 'Perangkat Keras (Hardware)', items: ['iPhone 16 / 16 Pro', 'MacBook Air / Pro (M-Series)', 'iPad Pro / Air', 'Apple Watch Ultra', 'Apple Vision Pro'] },
        { category: 'Layanan Digital (Services)', items: ['Apple Intelligence', 'App Store', 'iCloud+', 'Apple Pay & Apple Card', 'Apple Music', 'Apple TV+'] }
      ],
      targetMarkets: ['Konsumen Premium Ritel Global', 'Pekerja Kreatif & Pengembang Software', 'Korporasi dan Institusi Pendidikan'],
      catalysts: [
        { title: 'Integrasi Apple Intelligence & Supercycle iPhone', timeframe: '2026 - 2027', expectedImpact: 'Akselerasi siklus upgrade iPhone lebih dari 250 juta unit', description: 'Fitur kecerdasan buatan on-device privasi tinggi mendorong pengguna perangkat lama untuk memperbarui hardware.' },
        { title: 'Ekspansi Pendapatan Services Margin Tinggi', timeframe: '2026', expectedImpact: 'Pertumbuhan pendapatan layanan 12-14% YoY', description: 'Pertumbuhan basis instalasi aktif memperbesar aliran langganan iCloud dan transaksi Apple Pay.' }
      ],
      risks: [
        { category: 'Regulasi', title: 'Penyelidikan Antimonopoli App Store (DOJ & Uni Eropa)', impact: 'TINGGI', description: 'Kewajiban mengizinkan third-party sideloading berpotensi memotong komisi 30% App Store.' },
        { category: 'Geopolitik', title: 'Ketergantungan Rantai Pasok Manufaktur Asia', impact: 'SEDANG', description: 'Fluktuasi relasi dagang AS-Tiongkok serta biaya diversifikasi pabrik ke India & Vietnam.' }
      ],
      management: {
        boardOfDirectors: [
          { name: 'Tim Cook', role: 'Chief Executive Officer (CEO)', since: '2011' },
          { name: 'Luca Maestri / Kevan Parekh', role: 'Chief Financial Officer (CFO)', since: '2025' },
          { name: 'Jeff Williams', role: 'Chief Operating Officer (COO)', since: '2015' }
        ],
        majorShareholders: [
          { name: 'The Vanguard Group, Inc.', percentage: 8.42 },
          { name: 'BlackRock, Inc.', percentage: 6.78 },
          { name: 'Berkshire Hathaway Inc.', percentage: 2.95 }
        ]
      },
      peers: ['MSFT', 'GOOGL', 'NVDA', 'AMZN']
    },
    candles: generateCandles(230),
    financials: [
      {
        year: 2025,
        quarter: 'FY',
        revenue: 391000000000,
        grossProfit: 180000000000,
        operatingProfit: 123000000000,
        netIncome: 93700000000,
        totalAssets: 364000000000,
        totalLiabilities: 308000000000,
        totalEquity: 56000000000,
        cashAndEquivalents: 62000000000,
        totalDebt: 104000000000,
        freeCashFlow: 108000000000,
        operatingCashFlow: 118000000000
      }
    ],
    ratios: {
      per: 33.9,
      pbv: 48.2,
      roe: 147.2,
      roa: 28.5,
      der: 1.52,
      eps: 6.85,
      dividendYield: 0.45,
      dividendPayoutRatio: 14.8,
      netProfitMargin: 23.9,
      operatingMargin: 31.4,
      currentRatio: 0.98,
      marketCap: 3540000000000,
      sharesOutstanding: 15200000000
    },
    news: [
      {
        id: 'news-aapl-1',
        title: 'Apple Intelligence Ekspansi ke Bahasa Regional dan Pasar Global',
        summary: 'Apple mengumumkan peluncuran kapabilitas AI generatif on-device terbaru untuk sistem operasi iOS dan macOS.',
        source: 'Bloomberg Technology',
        sourceUrl: 'https://demo-source.stockai.local/news/aapl-intelligence',
        publishedAt: '2026-09-15T09:00:00Z',
        sentiment: 'Positif',
        category: 'Ekonomi Global',
        impactLevel: 'Tinggi',
        relatedTickers: ['AAPL'],
        factContent: 'Apple meluncurkan integrasi asisten berbasis model bahasa on-device di seluruh jajaran iPhone seri 16 dan Mac M-series.',
        aiInterpretation: 'Pengembangan ini memperkuat posisi Apple dalam memonetisasi ekosistem hardware premium tanpa mengorbankan privasi data nasabah.'
      }
    ]
  },

  {
    instrumentId: 'US:NASDAQ:NVDA',
    symbol: 'NVDA',
    companyName: 'NVIDIA Corporation',
    legalName: 'NVIDIA Corporation',
    assetType: 'Stock',
    country: 'United States',
    countryCode: 'US',
    region: 'Americas',
    exchange: 'NASDAQ',
    currency: 'USD',
    sector: 'Technology',
    industry: 'Semiconductors',
    isin: 'US67066G1040',
    aliases: ['Nvidia', 'Jensen Huang', 'GPU', 'Blackwell', 'CUDA', 'GeForce'],
    providerSymbols: { yahoo: 'NVDA', bloomberg: 'NVDA:US' },
    price: 118.40,
    prevClose: 115.85,
    change: 2.55,
    changePercent: 2.20,
    open: 116.20,
    high: 119.30,
    low: 115.90,
    volume: 68400000,
    turnover: 8098560000,
    marketCap: 2910000000000,
    marketCapUSD: 2910000000000,
    pe: 45.2,
    pbv: 38.6,
    roe: 115.0,
    dividendYield: 0.03,
    rsi: 64.5,
    feedStatus: 'DEMO',
    dataSourceLabel: 'NASDAQ - Simulated Feed Phase 1',
    cutoffTimestamp: '2026-09-16T16:00:00-04:00',
    marketStatusText: 'Closed (Regular Session)',
    profile: {
      overview: 'NVIDIA Corporation adalah pelopor komputasi akselerasi GPU dan arsitektur komputasi kecerdasan buatan (AI) terkemuka dunia. Platform perangkat keras dan software CUDA NVIDIA menjadi fondasi utama bagi komputasi generative AI di cloud hyperscaler modern.',
      whatTheyDo: 'NVIDIA mendesain unit pemroses grafis (GPU), chip AI data center (arsitektur Hopper, Blackwell, Rubin), platform jaringan berkecepatan tinggi Quantum InfiniBand, serta ekosistem software CUDA dan Omniverse.',
      businessModel: 'Model bisnis fabless semiconductor dengan gross margin spektakuler (>73%) didorong oleh dominasi perangkat keras AI Data Center dan ekosistem software CUDA berpemilik yang menciptakan switching cost sangat tinggi bagi developer AI.',
      revenueDrivers: [
        { segment: 'Data Center AI Computing & Networking', sharePercent: 87, description: 'Pengiriman chip GPU akselerasi AI H100/H200/B200 dan switch jaringan InfiniBand ke cloud hyperscaler.' },
        { segment: 'Gaming & PC Graphics', sharePercent: 9, description: 'Kartu grafis GeForce RTX untuk gamer, desainer 3D, dan workstation kreatif.' },
        { segment: 'Professional Visualization & Automotive', sharePercent: 4, description: 'Solusi simulasi digital twin Omniverse dan chip otonom NVIDIA DRIVE untuk industri otomotif.' }
      ],
      productsAndServices: [
        { category: 'Data Center & AI Systems', items: ['NVIDIA Blackwell B200 / GB200 NVL72', 'Hopper H100 / H200', 'Quantum-X800 InfiniBand', 'DGX SuperPOD'] },
        { category: 'Software & Platform', items: ['CUDA Toolkit', 'NVIDIA AI Enterprise (NIMs)', 'Omniverse Platform', 'NVIDIA DRIVE Orin/Thor'] }
      ],
      targetMarkets: ['Cloud Service Providers (Microsoft Azure, AWS, Google Cloud, OCI)', 'Lab Riset AI Global (OpenAI, Anthropic, Meta, xAI)', 'Industri Otomotif dan Robotika Cerdas'],
      catalysts: [
        { title: 'Volume Ramp Arsitektur Blackwell & Rubin', timeframe: '2026 - 2027', expectedImpact: 'Permintaan backlog data center melampaui pasokan', description: 'Adopsi arsitektur AI terbaru berpendingin cairan (liquid cooling) meningkatkan efisiensi daya komputasi AI.' },
        { title: 'Monetisasi Software NVIDIA AI Enterprise (NIMs)', timeframe: '2026', expectedImpact: 'Pertumbuhan recurring annual revenue software', description: 'Lisensi software tahunan per GPU ($4,500/socket) memberikan diversifikasi margin tinggi.' }
      ],
      risks: [
        { category: 'Konsentrasi Pelanggan', title: 'Pengeluaran Capex Hyperscaler Melambat', impact: 'TINGGI', description: 'Sekitar 40% pendapatan terkonsentrasi pada 4 penyedia cloud raksasa.' },
        { category: 'Kompetisi', title: 'Pengembangan Custom ASIC Internal Pelanggan', impact: 'SEDANG', description: 'Inisiatif chip kustom internal seperti Google TPU, AWS Trainium, dan Meta MTIA.' }
      ],
      management: {
        boardOfDirectors: [
          { name: 'Jensen Huang', role: 'President & CEO, Co-Founder', since: '1993' },
          { name: 'Colette Kress', role: 'Executive VP & CFO', since: '2013' }
        ],
        majorShareholders: [
          { name: 'The Vanguard Group, Inc.', percentage: 8.65 },
          { name: 'BlackRock, Inc.', percentage: 7.42 },
          { name: 'Jensen Huang (Founder)', percentage: 3.51 }
        ]
      },
      peers: ['AAPL', 'MSFT', 'GOOGL', 'AMZN']
    },
    candles: generateCandles(115),
    financials: [
      {
        year: 2025,
        quarter: 'FY',
        revenue: 126000000000,
        grossProfit: 95000000000,
        operatingProfit: 78000000000,
        netIncome: 65000000000,
        totalAssets: 85000000000,
        totalLiabilities: 28000000000,
        totalEquity: 57000000000,
        cashAndEquivalents: 31000000000,
        totalDebt: 11000000000,
        freeCashFlow: 58000000000,
        operatingCashFlow: 62000000000
      }
    ],
    ratios: {
      per: 45.2,
      pbv: 38.6,
      roe: 115.0,
      roa: 55.4,
      der: 0.19,
      eps: 2.62,
      dividendYield: 0.03,
      dividendPayoutRatio: 1.5,
      netProfitMargin: 51.6,
      operatingMargin: 61.9,
      currentRatio: 3.8,
      marketCap: 2910000000000,
      sharesOutstanding: 24500000000
    },
    news: [
      {
        id: 'news-nvda-1',
        title: 'NVIDIA Mengumumkan Arsitektur AI Generasi Berikutnya',
        summary: 'Efisiensi komputasi token AI meningkat hingga 30x lipat dengan konsumsi energi yang jauh lebih terkendali.',
        source: 'Reuters Financial',
        sourceUrl: 'https://demo-source.stockai.local/news/nvda-blackwell',
        publishedAt: '2026-09-14T14:30:00Z',
        sentiment: 'Positif',
        category: 'Ekonomi Global',
        impactLevel: 'Tinggi',
        relatedTickers: ['NVDA'],
        factContent: 'Pengiriman sistem rak server NVL72 mulai didistribusikan ke pusat data cloud utama.',
        aiInterpretation: 'Mempertegas keunggulan kompetitif NVIDIA dalam mempertahankan dominasi ekosistem AI enterprise.'
      }
    ]
  },

  // ==================== 3. JAPAN (TSE) ====================
  {
    instrumentId: 'JP:TSE:7203',
    symbol: '7203',
    companyName: 'Toyota Motor',
    legalName: 'Toyota Motor Corporation',
    assetType: 'Stock',
    country: 'Japan',
    countryCode: 'JP',
    region: 'Asia Pacific',
    exchange: 'TSE',
    currency: 'JPY',
    sector: 'Consumer Discretionary',
    industry: 'Automobile Manufacturers',
    isin: 'JP3633400001',
    aliases: ['Toyota', 'Lexus', 'Toyota Motor Corp', '7203.T'],
    providerSymbols: { yahoo: '7203.T', bloomberg: '7203:JP' },
    price: 3250,
    prevClose: 3200,
    change: 50,
    changePercent: 1.56,
    open: 3210,
    high: 3270,
    low: 3200,
    volume: 24500000,
    turnover: 79625000000,
    marketCap: 44200000000000,
    marketCapUSD: 298000000000,
    pe: 9.8,
    pbv: 1.15,
    roe: 14.5,
    dividendYield: 3.2,
    rsi: 54.2,
    feedStatus: 'DEMO',
    dataSourceLabel: 'Tokyo Stock Exchange (TSE) - Simulated Feed Phase 1',
    cutoffTimestamp: '2026-09-16T15:00:00+09:00',
    marketStatusText: 'Closed (Regular Session)',
    profile: {
      overview: 'Toyota Motor Corporation adalah produsen kendaraan bermotor terbesar di dunia berdasarkan volume penjualan, memproduksi kendaraan di bawah merek Toyota, Lexus, Daihatsu, dan Hino.',
      whatTheyDo: 'Toyota mendesain, memproduksi, dan mendistribusikan kendaraan penumpang bermesin Hybrid Electric (HEV), Plug-in Hybrid (PHEV), Fuel Cell Hydrogen (FCEV), dan Battery Electric (BEV).',
      businessModel: 'Model manufaktur efisiensi tinggi (Toyota Production System) berorientasi pendekatan multi-pathway (bukan hanya EV murni, tapi hybrid tangguh), memberikan margin operasi solid di seluruh benua.',
      revenueDrivers: [
        { segment: 'Penjualan Kendaraan Otomotif (Toyota & Lexus)', sharePercent: 88, description: 'Penjualan lebih dari 10 juta unit kendaraan per tahun di Amerika Utara, Asia, Eropa, dan Jepang.' },
        { segment: 'Jasa Keuangan Otomotif', sharePercent: 9, description: 'Leasing dan pembiayaan kredit retail serta dealer.' },
        { segment: 'Bisnis Lainnya', sharePercent: 3, description: 'Perumahan modular, solusi robotika mobilitas, dan material.' }
      ],
      productsAndServices: [
        { category: 'Kendaraan Penumpang', items: ['Toyota RAV4', 'Toyota Corolla', 'Toyota Camry', 'Toyota Land Cruiser', 'Lexus RX / NX / GX'] },
        { category: 'Teknologi Mobilitas', items: ['Toyota Hybrid System (THS)', 'Solid-State Battery Research', 'Woven City Smart Mobility'] }
      ],
      targetMarkets: ['Pasar Otomotif Global di Lebih dari 170 Negara', 'Konsumen Menengah Ritel dan Penggemar Segmen Mewah (Lexus)'],
      catalysts: [
        { title: 'Lonjakan Permintaan Global Mobil Hybrid (HEV)', timeframe: '2026 - 2027', expectedImpact: 'Peningkatan profitabilitas dan rekor laba operasional', description: 'Konsumen global memilih mobil hybrid yang praktis di tengah perlambatan adopsi EV murni di AS dan Eropa.' }
      ],
      risks: [
        { category: 'Valuta Asing', title: 'Penguatan Mata Uang Yen (JPY)', impact: 'SEDANG', description: 'Penguatan nilai tukar Yen terhadap USD dapat mengurangi laba repatriasi ekspor.' }
      ],
      management: {
        boardOfDirectors: [
          { name: 'Koji Sato', role: 'President & CEO', since: '2023' },
          { name: 'Akio Toyoda', role: 'Chairman of the Board', since: '2023' }
        ],
        majorShareholders: [
          { name: 'Master Trust Bank of Japan', percentage: 14.8 },
          { name: 'Toyota Industries Corporation', percentage: 8.5 }
        ]
      },
      peers: ['ASII', 'TSLA']
    },
    candles: generateCandles(3200)
  },

  // ==================== 4. SINGAPORE (SGX) ====================
  {
    instrumentId: 'SG:SGX:D05',
    symbol: 'D05',
    companyName: 'DBS Group Holdings',
    legalName: 'DBS Group Holdings Ltd',
    assetType: 'Stock',
    country: 'Singapore',
    countryCode: 'SG',
    region: 'Asia Pacific',
    exchange: 'SGX',
    currency: 'SGD',
    sector: 'Financials',
    industry: 'Diversified Banking',
    isin: 'SG1L01001701',
    aliases: ['DBS', 'DBS Bank', 'POSB', 'DBS Group'],
    providerSymbols: { yahoo: 'D05.SI', bloomberg: 'DBS:SP' },
    price: 38.60,
    prevClose: 38.20,
    change: 0.40,
    changePercent: 1.05,
    open: 38.30,
    high: 38.80,
    low: 38.20,
    volume: 8900000,
    turnover: 343540000,
    marketCap: 110200000000,
    marketCapUSD: 84500000000,
    pe: 10.4,
    pbv: 1.62,
    roe: 16.8,
    dividendYield: 5.8,
    rsi: 59.8,
    feedStatus: 'DEMO',
    dataSourceLabel: 'Singapore Exchange (SGX) - Simulated Feed Phase 1',
    cutoffTimestamp: '2026-09-16T17:00:00+08:00',
    marketStatusText: 'Closed (Regular Session)',
    profile: {
      overview: 'DBS Group Holdings Ltd adalah grup perbankan dan jasa keuangan terkemuka di Asia dengan kehadiran kuat di 19 pasar global, berpusat di Singapura dan memimpin transformasi digital perbankan regional.',
      whatTheyDo: 'DBS menyediakan perbankan komersial, perbankan korporasi, manajemen kekayaan (wealth management), treasury & pasar modal, serta solusi digital banking terdepan di Asia Tenggara dan Greater China.',
      businessModel: 'Model bisnis perbankan universal berefisiensi tinggi dengan cost-to-income ratio terbaik di kawasan (~39%), didukung volume wealth management dan perputaran arus modal perdagangan Asia.',
      revenueDrivers: [
        { segment: 'Consumer Banking & Wealth Management', sharePercent: 44, description: 'Pendapatan bunga KPR, kartu kredit, dan fee wealth management nasabah ultra-high-net-worth.' },
        { segment: 'Institutional Banking (Korporasi & UKM)', sharePercent: 46, description: 'Kredit korporasi regional, cash management, trade finance, dan sindikasi pinjaman.' },
        { segment: 'Global Financial Markets & Treasury', sharePercent: 10, description: 'Perdagangan instrumen valuta asing, derivatif suku bunga, dan penjaminan emisi obligasi.' }
      ],
      productsAndServices: [
        { category: 'Perbankan Konsumer & Wealth', items: ['DBS Treasures / Private Bank', 'POSB Banking Services', 'digibank by DBS', 'DBS PayLah!'] },
        { category: 'Perbankan Korporasi & Pasar', items: ['DBS IDEAL Corporate Portal', 'Green & Sustainable Financing', 'Cross-Border FX Hedging'] }
      ],
      targetMarkets: ['Nasabah Ritel & Wealth Singapura & Asia Tenggara', 'Korporasi Multinasional yang Beroperasi di Koridor Asia', 'Institusi Keuangan Global'],
      catalysts: [
        { title: 'Arus Masuk Wealth Management Regional ke Singapura', timeframe: '2026 - 2027', expectedImpact: 'Pertumbuhan Assets Under Management (AUM) di atas S$400 Miliar', description: 'Singapura menjadi pusat safe-haven pengelolaan aset keluarga kaya (family offices) Asia.' }
      ],
      risks: [
        { category: 'Suku Bunga', title: 'Normalisasi Suku Bunga SORA Singapura', impact: 'SEDANG', description: 'Potensi penyempitan margin bunga bersih (NIM) bila suku bunga acuan dipangkas cepat.' }
      ],
      management: {
        boardOfDirectors: [
          { name: 'Piyush Gupta / Tan Su Shan', role: 'Chief Executive Officer (CEO)', since: '2025' },
          { name: 'Peter Seah', role: 'Chairman of the Board', since: '2010' }
        ],
        majorShareholders: [
          { name: 'Temasek Holdings (Private) Limited', percentage: 29.0 },
          { name: 'Citibank Nominees Singapore', percentage: 18.5 }
        ]
      },
      peers: ['BBCA', 'BMRI', 'JPM']
    },
    candles: generateCandles(38)
  }
];

export function getInstrumentBySymbol(symbol: string): InstrumentMasterItem | undefined {
  if (!symbol) return undefined;
  const s = symbol.toUpperCase().trim();
  return INSTRUMENT_MASTER.find(
    item => item.symbol.toUpperCase() === s || item.instrumentId.toUpperCase() === s
  );
}

export function getAllInstruments(): InstrumentMasterItem[] {
  return INSTRUMENT_MASTER;
}
