export interface BrokerTutorialStep {
  stepNumber: number;
  title: string;
  description: string;
  subSteps?: string[];
  tip?: string;
}

export interface BrokerComparison {
  name: string;
  buyFee: string;
  sellFee: string;
  minDeposit: string;
  advantages: string[];
  platformType: string;
}

export interface BrokerTutorial {
  id: string;
  brokerName: string;
  tagline: string;
  logoColor: string;
  steps: BrokerTutorialStep[];
  concreteExample: {
    title: string;
    ticker: string;
    action: string;
    targetLot: number;
    targetPrice: number;
    stepsWalkthrough: string[];
    calculation: {
      grossBuy: string;
      brokerFee: string;
      levyPph: string;
      totalCost: string;
      note: string;
    };
  };
}

export const BROKER_COMPARISON_LIST: BrokerComparison[] = [
  {
    name: 'Stockbit (Sinarmas Sekuritas / PT Stockbit Sekuritas Digital)',
    buyFee: '0.15% (Online)',
    sellFee: '0.25% (Online, incl. PPh 0.1%)',
    minDeposit: 'Rp 0 (Bebas Deposit Awal)',
    advantages: ['Social Feed & Community', 'Chartbit TradingView Pro', 'Fitur Screener & Keuangan Komprehensif'],
    platformType: 'Mobile App & Web Pro',
  },
  {
    name: 'Ajaib (PT Ajaib Sekuritas Asia)',
    buyFee: '0.15% (Tiering s.d. 0.10%)',
    sellFee: '0.25% (Tiering s.d. 0.20%)',
    minDeposit: 'Rp 0 (Bebas Deposit Awal)',
    advantages: ['UI Modern & Simpel untuk Pemula', 'Ajaib Prime Service', 'Notifikasi Berita & Analisis Real-time'],
    platformType: 'Mobile App & Web',
  },
  {
    name: 'IPOT (PT Indo Premier Sekuritas)',
    buyFee: '0.19% (Online)',
    sellFee: '0.29% (Online, incl. PPh 0.1%)',
    minDeposit: 'Rp 0 (Bebas Deposit Awal)',
    advantages: ['Fitur Robo Trading Otomatis Lengkap', 'IPOT Fund Supermarket Reksadana', 'Data Finansial Komprehensif'],
    platformType: 'Mobile App (IPOT) & Desktop (IPOT Windows)',
  },
  {
    name: 'BIONS (PT BNI Sekuritas)',
    buyFee: '0.17% (Online)',
    sellFee: '0.27% (Online, incl. PPh 0.1%)',
    minDeposit: 'Rp 100.000 (Reguler)',
    advantages: ['Integrasi Ekosistem BNI', 'Fitur BIONS Multi-Asset (Saham, Obligasi, Reksadana)', 'Riset Berkala BNI Sekuritas'],
    platformType: 'Mobile App & Web',
  },
  {
    name: 'MOST (PT Mandiri Sekuritas)',
    buyFee: '0.18% (Online)',
    sellFee: '0.28% (Online, incl. PPh 0.1%)',
    minDeposit: 'Rp 2.000.000 (Umum) / Rp 100.000 (Mahasiswa)',
    advantages: ['Reputasi Broker BUMN Terbesar', 'Riset Makro & Sektor Institusional Mandiri', 'Akses MOST Syariah & Global'],
    platformType: 'Mobile App, Web & Desktop MOST',
  },
];

export const MOCK_BROKER_TUTORIALS: Record<string, BrokerTutorial> = {
  stockbit: {
    id: 'stockbit',
    brokerName: 'Stockbit',
    tagline: 'Modern Social Investing & Chartbit Analysis',
    logoColor: 'from-emerald-500 to-teal-700',
    steps: [
      {
        stepNumber: 1,
        title: 'Buka Akun & Verifikasi Identitas (e-KYC)',
        description: 'Unduh aplikasi Stockbit di App Store / Play Store. Masuk menggunakan akun Google/Apple, pilih menu "Buka RDN", siapkan e-KTP fisik dan foto selfie biometrik.',
        subSteps: ['Isi form data diri, pekerjaan, dan informasi rekening bank penampung.', 'Lakukan video verification atau foto selfie dengan pencahayaan terang.', 'Tunggu email persetujuan SID (Single Investor Identification) dan nomor RDN BCA/Bank Jago (biasanya 1-2 hari kerja).'],
      },
      {
        stepNumber: 2,
        title: 'Deposit Dana ke RDN (Rekening Dana Nasabah)',
        description: 'Buka aplikasi mobile banking bank pribadi Anda (BCA, Mandiri, BRI, dll). Lakukan transfer ke nomor RDN Stockbit Anda.',
        subSteps: ['Pilih menu Transfer Antar Bank / Antar Rekening.', 'Masukkan nomor rekening RDN atas nama Anda sendiri.', 'Cek saldo di tab "Portfolio" -> "Cash Balance" di Stockbit.'],
      },
      {
        stepNumber: 3,
        title: 'Cari Saham di Aplikasi',
        description: 'Ketik kode ticker atau nama perusahaan pada bilah pencarian atas (Search Bar).',
        subSteps: ['Contoh: Ketik "BBCA" untuk PT Bank Central Asia Tbk.', 'Klik saham untuk masuk ke halaman detail instrumen (Chartbit, Keuangan, Stream, Orderbook).'],
      },
      {
        stepNumber: 4,
        title: 'Baca Order Book (Bid & Offer)',
        description: 'Perhatikan kolom kiri (Bid / Antrian Beli) dan kolom kanan (Offer / Antrian Jual).',
        subSteps: ['Best Bid: Harga antrean beli tertinggi saat ini.', 'Best Offer: Harga antrean jual terendah saat ini.', 'Angka di samping harga menunjukkan volume antrean dalam satuan lot.'],
      },
      {
        stepNumber: 5,
        title: 'Pasang Order Market (Beli Langsung)',
        description: 'Gunakan jika ingin pesanan langsung matched seketika tanpa mengantri.',
        subSteps: ['Klik tombol hijau "Buy".', 'Pilih tipe order: "Market" (atau klik harga pada baris Best Offer terendah).', 'Masukkan jumlah lot (misal 1 lot).', 'Klik "Confirm Order". Status order akan langsung menjadi MATCHED.'],
      },
      {
        stepNumber: 6,
        title: 'Pasang Order Limit (Antre di Harga Tertentu)',
        description: 'Gunakan jika ingin menawar harga lebih rendah dari harga pasar saat ini.',
        subSteps: ['Klik tombol "Buy".', 'Pilih tipe order: "Limit".', 'Tentukan harga beli yang diinginkan (misal di bawah Best Bid).', 'Masukkan jumlah lot dan klik "Send Order". Status order akan OPEN sampai ada penjual yang menyetujui harga tersebut.'],
      },
      {
        stepNumber: 7,
        title: 'Cek Status Order & Histori Transaksi',
        description: 'Masuk ke tab "Order" pada menu navigasi bawah.',
        subSteps: ['OPEN: Pesanan sedang mengantri di bursa.', 'MATCHED: Pesanan berhasil terlaksana sepenuhnya.', 'REJECTED: Pesanan ditolak (misal dana RDN tidak cukup atau harga di luar fraksi ARB/ARA).', 'CANCELLED: Pesanan yang dibatalkan oleh pengguna sebelum matched.'],
      },
      {
        stepNumber: 8,
        title: 'Cek Portofolio & Mutasi Dana',
        description: 'Buka menu "Portfolio" untuk melihat total valuasi aset saham Anda.',
        subSteps: ['Lihat Average Price (Harga Rata-rata Beli), Current Price, dan Floating Gain/Loss (+/- Rp dan %).', 'Buka submenu "History" untuk melihat catatan dividen masuk dan potongan fee transaksi.'],
      },
      {
        stepNumber: 9,
        title: 'Withdraw Dana (Penarikan ke Bank Pribadi)',
        description: 'Tarik dana hasil penjualan saham atau sisa cash balance ke rekening bank pribadi Anda.',
        subSteps: ['Klik menu "Withdraw" di halaman saldo kas.', 'Perhatikan waktu settlement T+2 (dana dari penjualan saham baru bisa ditarik 2 hari bursa setelah transaksi).', 'Masukkan nominal penarikan dan konfirmasi PIN transaksi.'],
      },
    ],
    concreteExample: {
      title: 'Contoh Nyata: Beli Saham BBCA 1 Lot di Stockbit',
      ticker: 'BBCA',
      action: 'BUY 1 LOT',
      targetLot: 1,
      targetPrice: 10250,
      stepsWalkthrough: [
        '1. Buka Stockbit -> Tekan ikon Search (Kaca Pembesar) di pojok kanan atas -> Ketik "BBCA".',
        '2. Masuk ke tab Orderbook. Terlihat Best Bid: Rp 10.225 (4.200 lot) dan Best Offer: Rp 10.250 (1.850 lot).',
        '3. Tekan tombol hijau "Buy" di bagian bawah layar.',
        '4. Pilih Order Type "Limit", masukkan Price: 10.250, dan Lot: 1.',
        '5. Tekan "Preview Order" -> Periksa rincian: Total Value Rp 1.025.000 + Fee Broker (0.15%) Rp 1.538 = Rp 1.026.538.',
        '6. Masukkan PIN Transaksi -> Tekan "Confirm Buy".',
        '7. Karena harga beli dipasang sama dengan Best Offer (Rp 10.250), notifikasi muncul: "Order #STK-8921 MATCHED".',
        '8. Buka tab "Portfolio" -> Saham BBCA sekarang muncul dengan kepemilikan 1 Lot (100 lembar), Avg Price Rp 10.265 (incl. fee).',
      ],
      calculation: {
        grossBuy: 'Rp 1.025.000 (100 lembar x Rp 10.250)',
        brokerFee: 'Rp 1.538 (0.15% dari nilai transaksi)',
        levyPph: 'Sudah termasuk dalam standar fee broker online',
        totalCost: 'Rp 1.026.538',
        note: 'Dana kas RDN otomatis berkurang sebesar Rp 1.026.538 saat order status Matched.',
      },
    },
  },
  ajaib: {
    id: 'ajaib',
    brokerName: 'Ajaib',
    tagline: 'Simple & Intuitive Mobile Stock Trading',
    logoColor: 'from-blue-500 to-indigo-700',
    steps: [
      {
        stepNumber: 1,
        title: 'Pendaftaran Akun & KYC Online',
        description: 'Buka aplikasi Ajaib, klik "Daftar", masukkan email dan no HP, lalu verifikasi KTP secara instan via pemindaian OCR.',
        subSteps: ['Lengkapi data profil risiko investor.', 'Pilih bank RDN mitra (BCA, Permata, atau CIMB Niaga).', 'Tanda tangan digital di layar HP dan tunggu persetujuan.'],
      },
      {
        stepNumber: 2,
        title: 'Top Up Dana RDN',
        description: 'Buka tab "Profil" -> pilih "Top Up RDN". Salin nomor Virtual Account atau nomor rekening RDN yang tertera.',
        subSteps: ['Transfer via Mobile Banking, ATM, atau e-Wallet mitra.', 'Saldo RDN bertambah secara instan dalam 1-3 menit.'],
      },
      {
        stepNumber: 3,
        title: 'Pencarian Saham',
        description: 'Gunakan kolom pencarian di tab "Cari" atau jelajahi kategori sektor dan Top Gainer/Loser.',
        subSteps: ['Ketik ticker seperti "BBRI" atau "BBCA".', 'Buka halaman profil emiten untuk melihat grafik harga, berita, dan laporan finansial ringkas.'],
      },
      {
        stepNumber: 4,
        title: 'Membaca Bid/Ask Matrix',
        description: 'Pahami kolom antrean harga hijau (Beli) dan merah (Jual).',
        subSteps: ['Angka kiri: Harga antrian beli (Bid) beserta jumlah lotnya.', 'Angka kanan: Harga antrian penawaran jual (Ask/Offer) beserta jumlah lotnya.'],
      },
      {
        stepNumber: 5,
        title: 'Eksekusi Order Beli (Haka / Market)',
        description: 'Tekan tombol "Beli", tentukan harga di posisi Ask terendah agar langsung terbeli.',
        subSteps: ['Masukkan jumlah lot yang diinginkan.', 'Gunakan slider persentase modal kas jika ingin mengalokasikan persentase dana tertentu.', 'Tekan "Beli Saham" dan masukkan PIN transaksi.'],
      },
      {
        stepNumber: 6,
        title: 'Memasang Antrian Beli (Bid / Limit Order)',
        description: 'Pilih harga di bawah harga pasar saat ini dan tunggu antrean tereksekusi.',
        subSteps: ['Tentukan harga limit sesuai analisis support.', 'Pilih masa berlaku order (Day Order).'],
      },
      {
        stepNumber: 7,
        title: 'Monitoring Order Aktif & Riwayat Transaksi',
        description: 'Masuk ke tab "Transaksi" untuk melihat status pesanan real-time (Antri, Berhasil, Batal).',
        subSteps: ['Gunakan opsi "Ubah Harga (Amend)" jika ingin menggeser harga antrian tanpa membatalkan order.', 'Gunakan opsi "Batal (Withdraw)" untuk menarik antrean.'],
      },
      {
        stepNumber: 8,
        title: 'Memantau Portofolio & Return Investasi',
        description: 'Buka tab "Portofolio" di bar navigasi utama.',
        subSteps: ['Pantau total nilai portofolio, persentase profit/loss harian, dan return keseluruhan (All-time gain).', 'Periksa rincian porsi alokasi tiap saham dalam grafik pie.'],
      },
      {
        stepNumber: 9,
        title: 'Tarik Dana ke Rekening Pribadi',
        description: 'Pilih menu "Tarik Dana" di halaman saldo kas.',
        subSteps: ['Pastikan dana sudah berstatus Settled (T+2 dari tanggal transaksi penjualan).', 'Ketik nominal penarikan dan dana akan ditransfer ke rekening bank terdaftar.'],
      },
    ],
    concreteExample: {
      title: 'Contoh Nyata: Beli Saham BBCA 1 Lot di Ajaib',
      ticker: 'BBCA',
      action: 'BUY 1 LOT',
      targetLot: 1,
      targetPrice: 10250,
      stepsWalkthrough: [
        '1. Masuk ke aplikasi Ajaib -> Ketik "BBCA" pada kolom Search tab Cari.',
        '2. Klik BBCA -> Tekan tombol biru besar "Beli" di bagian bawah layar.',
        '3. Pada kolom "Harga Beli", masukkan angka 10.250.',
        '4. Pada kolom "Jumlah Lot", masukkan 1 Lot.',
        '5. Estimasi biaya tertera: Rp 1.025.000 + Biaya Transaksi (0.15%) Rp 1.538.',
        '6. Tekan tombol "Konfirmasi Beli" -> Masukkan PIN keamanan 6 digit.',
        '7. Status order tercatat "Berhasil (Matched)" -> Saldo kas terpotong dan 1 lot BBCA masuk ke tab Portofolio.',
      ],
      calculation: {
        grossBuy: 'Rp 1.025.000',
        brokerFee: 'Rp 1.538 (0.15%)',
        levyPph: 'Termasuk dalam total rincian biaya Ajaib',
        totalCost: 'Rp 1.026.538',
        note: 'Biaya transaksi Ajaib dapat turun hingga 0.10% jika volume transaksi bulanan meningkat sesuai tiering.',
      },
    },
  },
  ipot: {
    id: 'ipot',
    brokerName: 'IPOT (Indo Premier)',
    tagline: 'Advanced Multi-Feature Platform & Robo Trading',
    logoColor: 'from-amber-600 to-red-700',
    steps: [
      {
        stepNumber: 1,
        title: 'Registrasi Akun IPOT & e-KYC',
        description: 'Buka aplikasi IPOT, pilih "Register Now". Isi formulir data diri lengkap dan unggah foto KTP.',
        subSteps: ['Verifikasi nomor HP via OTP dan email.', 'Pilih rekening RDN mitra (BCA atau Permata).', 'Persetujuan akun dan SID diterbitkan via email dalam 1 hari bursa.'],
      },
      {
        stepNumber: 2,
        title: 'Deposit Dana ke RDN IPOT',
        description: 'Kirim dana dari rekening bank Anda ke nomor RDN IPOT yang tercantum di profil akun.',
        subSteps: ['Bisa menggunakan transfer real-time antar bank atau BI-Fast.', 'Cek saldo di menu "Cash Info" / "Buying Power".'],
      },
      {
        stepNumber: 3,
        title: 'Cari Saham & Buka Live Trade',
        description: 'Masuk ke menu "Stock" -> pilih "Stock Search" atau "Live Trade".',
        subSteps: ['Ketik ticker seperti "BMRI" atau "BBCA".', 'Buka layar "Detailed Orderbook" untuk melihat antrian lengkap 10 baris bid/offer.'],
      },
      {
        stepNumber: 4,
        title: 'Analisis Kedalaman Pasar (Orderbook 10 Baris)',
        description: 'IPOT menampilkan hingga 10 baris kedalaman antrian beli dan jual lengkap dengan grafik frekuensi transaksi.',
        subSteps: ['Periksa total akumulasi lot di sisi Bid vs Offer.', 'Cek running trade untuk melihat transaksi yang sedang dieksekusi secara real-time.'],
      },
      {
        stepNumber: 5,
        title: 'Eksekusi Order Beli Reguler (Simple Buy)',
        description: 'Pilih menu "Buy", tentukan harga dan jumlah lot.',
        subSteps: ['Pilih Board "Regular (RG)".', 'Ketik harga dan lot, lalu tekan "Submit". Masukkan PIN trading IPOT.'],
      },
      {
        stepNumber: 6,
        title: 'Memasang Robo Trading Otomatis (Conditional Order)',
        description: 'Manfaatkan fitur Robo Trading IPOT untuk otomatis Take Profit atau Stop Loss.',
        subSteps: ['Pilih menu "Robo Trading" -> "Create New Rule".', 'Atur kondisi: "Jika harga BBCA <= Rp 9.950, pasang order Jual di harga Rp 9.925 (Stop Loss)".', 'Atur durasi order otomatis berlaku hingga 30 hari.'],
      },
      {
        stepNumber: 7,
        title: 'Cek Status di Order Status List',
        description: 'Buka menu "Order List" untuk memantau status antrian.',
        subSteps: ['Status O (Open), M (Matched), C (Cancelled), P (Partial Matched), R (Rejected).', 'Gunakan menu Withdraw / Amend langsung dari baris antrian.'],
      },
      {
        stepNumber: 8,
        title: 'Cek Portofolio & Valuasi Saham',
        description: 'Masuk ke menu "Portfolio" untuk melihat rincian saham, average price, market value, dan unrealized gain/loss.',
        subSteps: ['Periksa saldo kas yang bisa ditarik (Available for Withdrawal) vs saldo kas yang sedang dalam proses settlement.'],
      },
      {
        stepNumber: 9,
        title: 'Penarikan Dana dari IPOT',
        description: 'Pilih menu "Fund Transfer / Withdrawal".',
        subSteps: ['Pilih rekening bank tujuan yang telah terdaftar.', 'Tentukan nominal penarikan sebelum batas waktu cut-off harian.'],
      },
    ],
    concreteExample: {
      title: 'Contoh Nyata: Beli Saham BBCA 1 Lot di IPOT',
      ticker: 'BBCA',
      action: 'BUY 1 LOT',
      targetLot: 1,
      targetPrice: 10250,
      stepsWalkthrough: [
        '1. Masuk ke aplikasi IPOT -> Pilih menu "Stock" -> Ketik "BBCA" pada kolom pencarian.',
        '2. Pilih "Buy" -> Pilih Board "RG (Regular)".',
        '3. Masukkan Price: 10.250 dan Volume: 1 Lot.',
        '4. Periksa rincian kalkulasi: Nilai Saham Rp 1.025.000 + Fee Broker IPOT (0.19%) Rp 1.948 = Rp 1.026.948.',
        '5. Tekan "Submit" -> Masukkan Trading PIN IPOT.',
        '6. Cek menu "Order List" -> Status pesanan tercatat "M (Matched)".',
        '7. Buka menu "Portfolio" -> Saham BBCA 1 lot tercatat di akun portofolio.',
      ],
      calculation: {
        grossBuy: 'Rp 1.025.000',
        brokerFee: 'Rp 1.948 (0.19% online rate)',
        levyPph: 'Termasuk dalam potongan settlement IPOT',
        totalCost: 'Rp 1.026.948',
        note: 'Fee beli IPOT adalah 0.19% dan fee jual 0.29% (termasuk PPh 0.1% dan levy BEI).',
      },
    },
  },
  bions: {
    id: 'bions',
    brokerName: 'BIONS (BNI Sekuritas)',
    tagline: 'Reliable BUMN Ecosystem & Multi-Asset Investment',
    logoColor: 'from-orange-500 to-amber-700',
    steps: [
      {
        stepNumber: 1,
        title: 'Registrasi Online BIONS & e-KYC',
        description: 'Unduh BIONS Mobile, pilih "Buka Akun", isi form digital dengan melampirkan e-KTP dan NPWP (opsional).',
        subSteps: ['Pilih rekening RDN BNI untuk integrasi ekosistem perbankan BNI.', 'Tanda tangan digital dan verifikasi wajah.'],
      },
      {
        stepNumber: 2,
        title: 'Top Up Saldo RDN BNI',
        description: 'Lakukan transfer dari BNI Mobile Banking atau bank lain ke nomor RDN BNI Anda.',
        subSteps: ['Transfer bebas biaya admin jika menggunakan sesama rekening BNI.', 'Cek saldo di menu "Portfolio" BIONS.'],
      },
      {
        stepNumber: 3,
        title: 'Pencarian Saham di BIONS',
        description: 'Gunakan fitur pencarian atau menu "Watchlist" untuk memantau emiten pilihan.',
        subSteps: ['Ketik ticker seperti "BBCA" atau "TLKM".', 'Lihat summary harga pembukaan, tertinggi, terendah, dan grafik harian.'],
      },
      {
        stepNumber: 4,
        title: 'Membaca Order Book & Trade Summary',
        description: 'Pantau 5 kolom kedalaman harga beli dan jual.',
        subSteps: ['Periksa antrian lot di harga bid dan offer.', 'Gunakan Trade Summary untuk melihat sebaran harga transaksi yang terjadi hari ini.'],
      },
      {
        stepNumber: 5,
        title: 'Melakukan Order Beli',
        description: 'Pilih tombol "Buy", tentukan harga beli dan jumlah lot.',
        subSteps: ['Pilih tipe order Reguler.', 'Masukkan PIN Trading BIONS untuk otorisasi transaksi.'],
      },
      {
        stepNumber: 6,
        title: 'Memasang Fitur Automatic Order (Stop Loss / Take Profit)',
        description: 'Gunakan menu "Automatic Order" di BIONS untuk membatasi risiko secara otomatis.',
        subSteps: ['Tentukan trigger level harga.', 'Pilih aksi Beli/Jual otomatis saat trigger tercapai.'],
      },
      {
        stepNumber: 7,
        title: 'Mengecek Status Order',
        description: 'Buka menu "Order List" untuk melihat pesanan Open, Matched, atau Cancelled.',
        subSteps: ['Lakukan amend harga jika antrian belum tersentuh harga pasar.'],
      },
      {
        stepNumber: 8,
        title: 'Monitoring Portofolio Saham BIONS',
        description: 'Lihat ringkasan portofolio saham, obligasi, dan reksadana dalam satu layar.',
        subSteps: ['Periksa total modal, nilai pasar saat ini, dan persentase keuntungan belum terealisasi.'],
      },
      {
        stepNumber: 9,
        title: 'Penarikan Dana RDN BNI',
        description: 'Masuk ke menu "Withdrawal", ketik nominal dan konfirmasi transfer ke rekening bank induk BNI Anda.',
        subSteps: ['Settlement penjualan saham T+2 hari bursa.'],
      },
    ],
    concreteExample: {
      title: 'Contoh Nyata: Beli Saham BBCA 1 Lot di BIONS',
      ticker: 'BBCA',
      action: 'BUY 1 LOT',
      targetLot: 1,
      targetPrice: 10250,
      stepsWalkthrough: [
        '1. Buka BIONS -> Pilih menu Search -> Ketik "BBCA".',
        '2. Tekan tombol "Buy" di bagian bawah layar detail saham.',
        '3. Masukkan Price: 10.250 dan Lot: 1.',
        '4. Rincian biaya: Nilai Saham Rp 1.025.000 + Fee Beli BIONS (0.17%) Rp 1.743 = Rp 1.026.743.',
        '5. Masukkan PIN Trading BIONS -> Tekan "Confirm".',
        '6. Notifikasi status pesanan: "Order Matched".',
        '7. Saham BBCA 1 lot langsung tercatat di portofolio BIONS Anda.',
      ],
      calculation: {
        grossBuy: 'Rp 1.025.000',
        brokerFee: 'Rp 1.743 (0.17%)',
        levyPph: 'Sudah termasuk dalam standar fee',
        totalCost: 'Rp 1.026.743',
        note: 'Fee beli BIONS standar 0.17% dan fee jual 0.27% untuk transaksi online reguler.',
      },
    },
  },
  most: {
    id: 'most',
    brokerName: 'MOST (Mandiri Sekuritas)',
    tagline: 'Premier Institutional Grade Research & BUMN Security',
    logoColor: 'from-blue-700 to-yellow-600',
    steps: [
      {
        stepNumber: 1,
        title: 'Registrasi Mandiri Sekuritas Online',
        description: 'Kunjungi registrasi digital MOST, isi form data diri, upload e-KTP, dan lakukan liveness test.',
        subSteps: ['Pilih RDN Bank Mandiri untuk kemudahan auto-debit dan transfer instan.', 'Verifikasi nasabah diproses dalam 1-2 hari kerja.'],
      },
      {
        stepNumber: 2,
        title: 'Deposit ke RDN Bank Mandiri',
        description: 'Transfer dana dari Livin by Mandiri atau bank lain ke rekening RDN Mandiri Anda.',
        subSteps: ['Gratis biaya transfer antar sesama rekening Bank Mandiri.', 'Saldo kas terupdate di tab "Cash Position".'],
      },
      {
        stepNumber: 3,
        title: 'Cari Saham & Akses Riset Mandiri Sekuritas',
        description: 'Ketik ticker di menu pencarian atau buka menu "Research" untuk membaca laporan analis profesional.',
        subSteps: ['Ketik "BBCA" untuk melihat charting, bid/offer, dan valuasi target price analis MOST.'],
      },
      {
        stepNumber: 4,
        title: 'Membaca Order Book & Broker Summary',
        description: 'Periksa antrian bid/offer dan statistik pergerakan harga.',
        subSteps: ['Periksa antrian harga dan volume lot.', 'Gunakan fitur MOST Price Alert untuk mendapatkan notifikasi saat harga menyentuh target.'],
      },
      {
        stepNumber: 5,
        title: 'Memasang Order Beli (Normal Order)',
        description: 'Pilih "Buy", tentukan board RG, harga beli, dan kuantitas lot.',
        subSteps: ['Periksa kalkulasi total biaya pembelian.', 'Masukkan PIN Trading MOST untuk mengirim order ke JATS BEI.'],
      },
      {
        stepNumber: 6,
        title: 'Memasang GTC (Good Till Cancelled) & Stop Order',
        description: 'Pasang order yang aktif berhari-hari hingga matched atau otomatis dibatalkan.',
        subSteps: ['Pilih durasi GTC (misal 7 hari bursa).', 'Tentukan harga target tanpa perlu memasang ulang setiap pagi.'],
      },
      {
        stepNumber: 7,
        title: 'Mengecek Status Order & Trade Confirmation',
        description: 'Buka menu "Order Status" untuk melihat status Open, Done, Partial, atau Rejected.',
        subSteps: ['Trade Confirmation resmi dikirim ke email terdaftar di sore hari setelah bursa tutup.'],
      },
      {
        stepNumber: 8,
        title: 'Cek Portofolio & Mutasi Kas',
        description: 'Masuk ke menu "Portfolio" untuk melihat daftar saham, harga modal, harga pasar, dan gain/loss.',
        subSteps: ['Lihat rincian hak dividen yang akan masuk pada tanggal payment date.'],
      },
      {
        stepNumber: 9,
        title: 'Penarikan Dana ke Rekening Mandiri',
        description: 'Pilih menu "Fund Withdrawal", masukkan jumlah penarikan ke rekening Bank Mandiri pribadi Anda.',
        subSteps: ['Penarikan dana hasil penjualan saham mengikuti aturan settlement T+2.'],
      },
    ],
    concreteExample: {
      title: 'Contoh Nyata: Beli Saham BBCA 1 Lot di MOST',
      ticker: 'BBCA',
      action: 'BUY 1 LOT',
      targetLot: 1,
      targetPrice: 10250,
      stepsWalkthrough: [
        '1. Masuk ke aplikasi MOST Mobile -> Ketik "BBCA" pada kolom pencarian atas.',
        '2. Tekan menu "Buy" -> Pilih Board "Regular (RG)".',
        '3. Masukkan Price: 10.250 dan Volume: 1 Lot.',
        '4. Rincian biaya: Nilai Pembelian Rp 1.025.000 + Fee Broker MOST (0.18%) Rp 1.845 = Rp 1.026.845.',
        '5. Masukkan PIN Transaksi MOST -> Tekan "Confirm Buy".',
        '6. Order terkirim ke bursa dan langsung berstatus "Done (Matched)".',
        '7. Saham BBCA 1 lot tercatat di menu Portofolio dan laporan Trade Confirmation dikirim ke email.',
      ],
      calculation: {
        grossBuy: 'Rp 1.025.000',
        brokerFee: 'Rp 1.845 (0.18%)',
        levyPph: 'Sudah termasuk dalam standar fee',
        totalCost: 'Rp 1.026.845',
        note: 'Fee beli MOST online standar adalah 0.18% dan fee jual 0.28% (termasuk PPh 0.1% dan levy BEI).',
      },
    },
  },
};
