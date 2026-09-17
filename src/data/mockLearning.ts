import { LearningTopic } from '@/lib/types';

export const MOCK_LEARNING_TOPICS: LearningTopic[] = [
  {
    id: 'saham',
    title: 'Saham (Stock / Share)',
    category: 'Dasar',
    icon: 'PieChart',
    difficulty: 'Pemula',
    readTime: '4 min',
    whatIsIt:
      'Saham adalah bukti kepemilikan nilai sebuah perusahaan atau bukti penyertaan modal dalam suatu Perseroan Terbatas (PT). Pemilik saham berhak atas bagian dari keuntungan perusahaan (dividen) dan hak suara dalam Rapat Umum Pemegang Saham (RUPS).',
    simpleExplanation:
      'Bayangkan temanmu membuka kedai kopi dengan modal Rp 100 juta yang dibagi menjadi 100 lembar kertas kepemilikan seharga Rp 1 juta per lembar. Jika kamu membeli 10 lembar, berarti kamu memiliki 10% dari kedai kopi tersebut dan berhak atas 10% dari keuntungannya.',
    numberExample:
      'PT Bank Central Asia Tbk (BBCA) memiliki 123,27 miliar lembar saham yang beredar di bursa. Jika kamu membeli 1.000 lembar di harga Rp 10.000 per lembar, modal yang kamu investasikan adalah Rp 10.000.000, dan kamu resmi menjadi salah satu pemilik BCA.',
    visualDescription:
      'Sebuah kue pai yang dibagi menjadi potongan-potongan kecil proporsional yang mewakili persentase kepemilikan aset dan laba perusahaan.',
    visualType: 'general',
    practiceTask:
      'Pilih satu perusahaan favoritmu di bursa (misal BBCA, TLKM, atau ICBP), cari tahu berapa harga per lembar dan berapa modal minimal untuk menjadi pemiliknya.',
    quiz: [
      {
        id: 'q-saham-1',
        question: 'Ketika kamu membeli 1 lot saham di Bursa Efek Indonesia, apa hak utama yang kamu miliki?',
        options: [
          'Menjadi karyawan tetap di perusahaan tersebut',
          'Memiliki porsi kepemilikan dan berhak atas dividen jika dibagikan',
          'Mendapatkan pinjaman dana tanpa bunga dari perusahaan',
          'Menentukan harga barang dagangan perusahaan secara langsung',
        ],
        correctIndex: 1,
        explanation:
          'Membeli saham menjadikanmu pemilik proporsional atas perusahaan, berhak atas dividen dan suara dalam RUPS sesuai jumlah kepemilikan.',
      },
    ],
    commonMistakes: [
      'Menganggap saham adalah judi atau undian kilat tanpa dasar bisnis nyata.',
      'Lupa bahwa membeli saham berarti membeli sebagian dari bisnis riil yang memiliki operasional nyata.',
    ],
    relatedTerms: ['Lot', 'Market Cap', 'Dividend', 'Capital Gain', 'RUPS'],
  },
  {
    id: 'lot',
    title: 'Lot (Satuan Perdagangan Saham)',
    category: 'Dasar',
    icon: 'Layers',
    difficulty: 'Pemula',
    readTime: '3 min',
    whatIsIt:
      'Lot adalah satuan standar perdagangan saham di Bursa Efek Indonesia (BEI). 1 Lot setara dengan 100 lembar saham.',
    simpleExplanation:
      'Sama seperti membeli telur di supermarket yang dijual per kilogram atau per dus isi 10 butir, di bursa saham kamu tidak bisa membeli 1 atau 7 lembar secara reguler, melainkan minimal 1 lot (100 lembar).',
    numberExample:
      'Jika harga saham BBRI adalah Rp 5.000 per lembar, maka harga 1 lot BBRI = 100 lembar x Rp 5.000 = Rp 500.000 (belum termasuk fee broker sekitar 0.15% - 0.25%).',
    visualDescription:
      'Kotak berisi 100 keping koin emas, menunjukkan kelipatan 100 lembar per 1 transaksi lot.',
    visualType: 'general',
    practiceTask:
      'Hitung berapa uang yang dibutuhkan untuk membeli 3 lot saham GOTO jika harga pasarnya adalah Rp 74 per lembar.',
    quiz: [
      {
        id: 'q-lot-1',
        question: 'Jika harga saham TLKM adalah Rp 3.000 per lembar, berapa modal untuk membeli 2 lot?',
        options: ['Rp 300.000', 'Rp 600.000', 'Rp 3.000.000', 'Rp 60.000'],
        correctIndex: 1,
        explanation:
          '2 lot = 200 lembar. Total = 200 x Rp 3.000 = Rp 600.000.',
      },
    ],
    commonMistakes: [
      'Mengira harga di aplikasi trading (misal Rp 10.000) adalah harga per 1 lot, padahal itu harga per 1 lembar.',
    ],
    relatedTerms: ['Saham', 'Bid', 'Offer', 'Spread'],
  },
  {
    id: 'bid',
    title: 'Bid (Harga Antrean Beli)',
    category: 'Dasar',
    icon: 'ArrowDownLeft',
    difficulty: 'Pemula',
    readTime: '3 min',
    whatIsIt:
      'Bid adalah harga penawaran beli tertinggi yang bersedia dibayar oleh calon pembeli di order book pada suatu saat.',
    simpleExplanation:
      'Dalam pasar lelang, calon pembeli yang ingin menawar harga lebih murah akan mengantre di kolom Bid (Antrean Beli). Semakin tinggi tawaranmu, semakin di depan posisimu dalam antrean pembeli.',
    numberExample:
      'Pada saham BBCA, kolom Bid tertinggi ada di harga Rp 10.200 sebanyak 15.000 lot. Jika kamu memasang order beli di Rp 10.200, ordermu akan masuk dalam antrean tersebut.',
    visualDescription:
      'Tabel Order Book vertikal: sisi kiri berwarna hijau (Bid) menunjukkan volume antrean pembeli dari harga tertinggi ke terendah.',
    visualType: 'bid_offer',
    practiceTask:
      'Periksa Order Book saham BBCA. Amati 3 tingkat harga bid teratas beserta jumlah antrean lotnya.',
    quiz: [
      {
        id: 'q-bid-1',
        question: 'Di mana posisi penawaran beli (Bid) yang paling cepat dieksekusi?',
        options: [
          'Bid dengan harga paling rendah',
          'Bid dengan harga tertinggi (Best Bid)',
          'Bid di urutan terbawah',
          'Bid dengan jumlah lot terbesar',
        ],
        correctIndex: 1,
        explanation:
          'Best Bid (harga tawaran beli paling tinggi) mendapat prioritas pertama untuk dipasangkan dengan penjual.',
      },
    ],
    commonMistakes: [
      'Tertukar antara kolom Bid (antrean beli) dan Offer (antrean jual).',
    ],
    relatedTerms: ['Offer', 'Spread', 'Volume', 'Lot'],
  },
  {
    id: 'offer',
    title: 'Offer / Ask (Harga Antrean Jual)',
    category: 'Dasar',
    icon: 'ArrowUpRight',
    difficulty: 'Pemula',
    readTime: '3 min',
    whatIsIt:
      'Offer (atau Ask) adalah harga penawaran jual terendah yang bersedia diterima oleh pemilik saham di order book.',
    simpleExplanation:
      'Penjual yang ingin menjual sahamnya memasang harga di kolom Offer. Pembeli yang ingin langsung mendapatkan saham seketika (Haka / Hajar Kanan) akan membeli langsung di harga Offer terendah (Best Offer).',
    numberExample:
      'Jika Best Offer BBCA berada di Rp 10.250 sebanyak 8.000 lot, maka jika kamu memasukkan order beli di Rp 10.250, transaksi akan langsung match (tereksekusi) tanpa harus antre.',
    visualDescription:
      'Tabel Order Book: sisi kanan berwarna merah (Offer) menunjukkan kuotasi harga penjual dari terendah ke tertinggi.',
    visualType: 'bid_offer',
    practiceTask:
      'Bandingkan Best Bid dan Best Offer pada saham BMRI dan hitung berapa selisih harganya.',
    quiz: [
      {
        id: 'q-offer-1',
        question: 'Apa istilah bagi trader yang membeli langsung di harga Best Offer tanpa antre?',
        options: ['Hajar Kanan (HAKA)', 'Hajar Kiri (HAKI)', 'Cut Loss', 'Averaging Down'],
        correctIndex: 0,
        explanation:
          'HAKA (Hajar Kanan) mengacu pada aksi membeli langsung di kolom Offer (sisi kanan) untuk eksekusi instan.',
      },
    ],
    commonMistakes: [
      'Menjual dengan HAKI saat pasar sedang panik, menyebabkan harga eksekusi jauh di bawah harga wajar.',
    ],
    relatedTerms: ['Bid', 'Spread', 'Lot'],
  },
  {
    id: 'spread',
    title: 'Spread (Selisih Bid & Offer)',
    category: 'Dasar',
    icon: 'Split',
    difficulty: 'Pemula',
    readTime: '3 min',
    whatIsIt:
      'Spread adalah selisih antara harga penawaran jual terendah (Best Offer) dengan harga penawaran beli tertinggi (Best Bid).',
    simpleExplanation:
      'Spread mencerminkan likuiditas suatu saham. Saham yang sangat likuid seperti BBCA memiliki spread ketat (hanya 1 fraksi harga), sedangkan saham tidak likuid memiliki selisih spread yang lebar.',
    numberExample:
      'Jika Best Offer = Rp 10.250 dan Best Bid = Rp 10.225, maka Spread = Rp 10.250 - Rp 10.225 = Rp 25 (1 fraksi harga atau 0,24%).',
    visualDescription:
      'Grafik batang horizontal yang menunjukkan jarak antara garis hijau (Bid) dan garis merah (Offer).',
    visualType: 'bid_offer',
    practiceTask:
      'Hitung persentase spread dari saham yang memiliki Best Bid Rp 1.000 dan Best Offer Rp 1.020.',
    quiz: [
      {
        id: 'q-spread-1',
        question: 'Apa arti saham yang memiliki spread sangat tipis (hanya 1 tick fraksi)?',
        options: [
          'Saham tersebut tidak likuid',
          'Saham tersebut sangat likuid dan banyak ditransaksikan',
          'Saham tersebut sedang disuspensi oleh bursa',
          'Perusahaan sedang mengalami kebangkrutan',
        ],
        correctIndex: 1,
        explanation:
          'Spread tipis menandakan likuiditas tinggi dengan volume antrean pembeli dan penjual yang sangat padat.',
      },
    ],
    commonMistakes: [
      'Trading di saham dengan spread lebar tanpa memperhitungkan biaya slippage saat keluar masuk posisi.',
    ],
    relatedTerms: ['Bid', 'Offer', 'Volume'],
  },
  {
    id: 'volume',
    title: 'Volume Transaksi',
    category: 'Teknikal',
    icon: 'BarChart2',
    difficulty: 'Pemula',
    readTime: '4 min',
    whatIsIt:
      'Volume adalah jumlah lembar atau lot saham yang berhasil berpindah tangan (diperjualbelikan) antara pembeli dan penjual dalam rentang waktu tertentu.',
    simpleExplanation:
      'Volume seperti jumlah pengunjung yang bertransaksi di sebuah pasar. Kenaikan harga yang disertai volume besar membuktikan bahwa banyak pelaku pasar yang sepakat dan antusias mendorong harga naik.',
    numberExample:
      'Jika rata-rata volume harian BBCA adalah 40 juta lembar, lalu hari ini volume melonjak menjadi 120 juta lembar saat harga naik 2%, ini menandakan adanya akumulasi besar dari institusi.',
    visualDescription:
      'Diagram batang vertikal di bagian bawah grafik harga yang berwarna hijau saat hari penguatan dan merah saat pelemahan.',
    visualType: 'candlestick',
    practiceTask:
      'Amati indikator volume pada chart harian TLKM dan identifikasi lonjakan volume tertinggi dalam 3 bulan terakhir.',
    quiz: [
      {
        id: 'q-vol-1',
        question: 'Mengapa lonjakan volume penting saat terjadi Breakout harga?',
        options: [
          'Karena membuktikan Breakout didukung oleh partisipasi modal besar dan bukan pergerakan semu (fakeout)',
          'Karena bursa akan memberikan bonus dividen',
          'Karena harga saham pasti tidak bisa turun lagi',
          'Karena membuat perusahaan langsung untung',
        ],
        correctIndex: 0,
        explanation:
          'Konfirmasi volume tinggi membuktikan minat beli institusi nyata yang mengurangi risiko false breakout.',
      },
    ],
    commonMistakes: [
      'Mempercayai pola breakout tanpa memeriksa apakah volume transaksi mengonfirmasi pergerakan tersebut.',
    ],
    relatedTerms: ['Breakout', 'Breakdown', 'Candlestick', 'VWAP'],
  },
  {
    id: 'market-cap',
    title: 'Market Capitalization (Kapitalisasi Pasar)',
    category: 'Fundamental',
    icon: 'Globe',
    difficulty: 'Pemula',
    readTime: '4 min',
    whatIsIt:
      'Market Cap adalah total nilai pasar dari seluruh lembar saham yang beredar dari suatu emiten. Rumus: Harga Saham Saat Ini x Total Lembar Saham Beredar.',
    simpleExplanation:
      'Market Cap adalah banderol harga jika kamu ingin membeli 100% kepemilikan seluruh perusahaan tersebut di pasar bursa hari ini.',
    numberExample:
      'BBCA memiliki harga Rp 10.250 per lembar dengan 123,275 miliar lembar saham. Market Cap = Rp 10.250 x 123.275.000.000 = Rp 1.263,5 Triliun (Saham dengan kapitalisasi terbesar di IDX).',
    visualDescription:
      'Tiga lingkaran berukuran berbeda mewakili Big Cap (> Rp 100 T), Mid Cap (Rp 10 T - 100 T), dan Small Cap (< Rp 10 T).',
    visualType: 'general',
    practiceTask:
      'Cari tahu 3 emiten dengan Market Cap terbesar di Bursa Efek Indonesia saat ini.',
    quiz: [
      {
        id: 'q-mcap-1',
        question: 'Apakah saham dengan harga per lembar Rp 100 pasti bernilai lebih kecil dari saham Rp 5.000?',
        options: [
          'Ya, selalu',
          'Tidak, karena total nilai perusahaan ditentukan oleh Market Cap (Harga x Jumlah Lembar Beredar)',
          'Tergantung sektor industri',
          'Ya, karena nominalnya lebih rendah',
        ],
        correctIndex: 1,
        explanation:
          'Emiten dengan harga Rp 100 tapi memiliki 1 triliun lembar saham beredar (Market Cap Rp 100 T) jauh lebih besar dari emiten berharga Rp 5.000 dengan hanya 1 miliar lembar (Market Cap Rp 5 T).',
      },
    ],
    commonMistakes: [
      'Menilai murah atau mahalnya perusahaan hanya dari nominal harga per lembar tanpa melihat Market Cap.',
    ],
    relatedTerms: ['Saham', 'PER', 'PBV', 'Dividend'],
  },
  {
    id: 'dividend',
    title: 'Dividend (Dividen Saham)',
    category: 'Fundamental',
    icon: 'Coins',
    difficulty: 'Pemula',
    readTime: '4 min',
    whatIsIt:
      'Dividen adalah bagian dari laba bersih perusahaan yang dibagikan kepada para pemegang saham berdasarkan persetujuan RUPST proporsional dengan jumlah lembar saham yang dimiliki.',
    simpleExplanation:
      'Seperti bagi hasil keuntungan toko di akhir tahun. Jika bisnismu untung, kamu membagikan sebagian keuntungan dalam bentuk uang tunai ke rekening para pemiliknya.',
    numberExample:
      'Jika kamu memiliki 100 lot (10.000 lembar) saham BBRI dan perseroan mengumumkan dividen tunai Rp 310 per lembar, maka dividen yang kamu terima adalah 10.000 x Rp 310 = Rp 3.100.000 (sebelum/setelah ketentuan pajak dividen).',
    visualDescription:
      'Bagan alur dari laba bersih perusahaan yang dibagi menjadi Laba Ditahan (Retained Earnings) dan Dividen Tunai.',
    visualType: 'dividend',
    practiceTask:
      'Hitung Dividend Yield jika harga saham Rp 4.000 dan dividen tahunan Rp 200 per lembar.',
    quiz: [
      {
        id: 'q-div-1',
        question: 'Apa yang dimaksud dengan Cum Date (Cumulative Date) dividen?',
        options: [
          'Hari pertama investor tidak lagi berhak mendapat dividen',
          'Hari terakhir perdagangan saham di mana pembeli masih berhak menerima dividen',
          'Hari di mana uang dividen masuk ke rekening RDN',
          'Hari rapat direksi perusahaan',
        ],
        correctIndex: 1,
        explanation:
          'Cum Date adalah tanggal terakhir investor harus memegang saham untuk tercatat sebagai penerima dividen.',
      },
    ],
    commonMistakes: [
      'Membeli saham tepat di Cum Date hanya demi dividen tanpa menyadari risiko penurunan harga pada Ex Date (Dividend Trap).',
    ],
    relatedTerms: ['Capital Gain', 'Market Cap', 'PER', 'ROE'],
  },
  {
    id: 'capital-gain',
    title: 'Capital Gain (Keuntungan Modal)',
    category: 'Dasar',
    icon: 'TrendingUp',
    difficulty: 'Pemula',
    readTime: '3 min',
    whatIsIt:
      'Capital Gain adalah keuntungan yang diperoleh saat menjual saham dengan harga yang lebih tinggi daripada harga belinya.',
    simpleExplanation:
      'Membeli barang di harga murah dan menjualnya kembali di harga lebih mahal, selisih positifnya adalah keuntungan bersih modalmu.',
    numberExample:
      'Beli 10 lot BBCA di harga Rp 9.000 (Modal = Rp 9.000.000). Jual di harga Rp 10.250 (Total = Rp 10.250.000). Capital Gain = Rp 10.250.000 - Rp 9.000.000 = Rp 1.250.000 (+13,88%).',
    visualDescription:
      'Grafik harga naik dari titik A ke titik B dengan area arsir hijau bertuliskan profit.',
    visualType: 'general',
    practiceTask:
      'Hitung persentase capital gain jika membeli di Rp 2.500 dan menjual di Rp 3.000.',
    quiz: [
      {
        id: 'q-cg-1',
        question: 'Kapan Capital Gain resmi terealisasi (Realized Gain)?',
        options: [
          'Saat harga di layar monitor naik',
          'Saat posisi saham sudah berhasil dijual (tereksekusi) di pasar',
          'Saat perusahaan merilis laporan keuangan',
          'Saat pergantian tahun buku',
        ],
        correctIndex: 1,
        explanation:
          'Kenaikan harga di portofolio masih berupa Floating (Unrealized) Gain sampai saham tersebut benar-benar dijual.',
      },
    ],
    commonMistakes: [
      'Menganggap floating profit sudah pasti milik kita tanpa strategi take profit yang disiplin.',
    ],
    relatedTerms: ['Capital Loss', 'Dividend', 'Take Profit', 'Stop Loss'],
  },
  {
    id: 'capital-loss',
    title: 'Capital Loss (Kerugian Modal)',
    category: 'Dasar',
    icon: 'TrendingDown',
    difficulty: 'Pemula',
    readTime: '3 min',
    whatIsIt:
      'Capital Loss adalah kerugian modal yang terjadi ketika menjual aset saham di bawah harga beli awal.',
    simpleExplanation:
      'Ketika harga saham turun dan kamu memutuskan menjualnya untuk mengamankan sisa modal agar tidak tergerus lebih dalam.',
    numberExample:
      'Beli 20 lot di harga Rp 4.000 (Modal Rp 8.000.000). Karena prospek emiten memburuk, dijual di harga Rp 3.600 (Total Rp 7.200.000). Capital Loss = Rp 800.000 (-10%).',
    visualDescription:
      'Grafik garis menurun dari titik pembelian ke titik eksekusi cut loss.',
    visualType: 'general',
    practiceTask:
      'Tentukan batas maksimal toleransi kerugian modal dalam rencana trading pribadimu (misal 5% atau 7%).',
    quiz: [
      {
        id: 'q-cl-1',
        question: 'Mengapa trader profesional bersedia menerima Capital Loss terkontrol (Cut Loss)?',
        options: [
          'Untuk menjaga modal utama agar tidak mengalami kerugian fatal (drawdown besar)',
          'Karena ingin membuang uang',
          'Karena pasar pasti bangkrut',
          'Karena disuruh oleh broker',
        ],
        correctIndex: 0,
        explanation:
          'Cut loss terukur adalah pilar manajemen risiko utama untuk menjaga modal investasi jangka panjang.',
      },
    ],
    commonMistakes: [
      'Membiarkan kerugian kecil berubah menjadi kerugian 50%+ karena enggan mengakui analisa keliru (Holding Losers).',
    ],
    relatedTerms: ['Capital Gain', 'Stop Loss', 'Risk/Reward'],
  },
  {
    id: 'per',
    title: 'PER (Price to Earnings Ratio)',
    category: 'Fundamental',
    icon: 'Calculator',
    difficulty: 'Menengah',
    readTime: '5 min',
    whatIsIt:
      'PER adalah rasio valuasi fundamental yang membandingkan harga saham emiten saat ini dengan laba per lembar sahamnya (EPS). Rumus: Harga Saham / EPS.',
    simpleExplanation:
      'PER menunjukkan berapa tahun waktu yang dibutuhkan perusahaan untuk mengembalikan modal investasimu melalui laba bersih tahunannya jika labanya konstan.',
    numberExample:
      'Harga saham BMRI Rp 6.650 dan EPS tahunannya Rp 593. Maka PER BMRI = 6.650 / 593 = 11,2x. Artinya investor membayar Rp 11,2 untuk setiap Rp 1 laba bersih yang dihasilkan perusahaan.',
    visualDescription:
      'Timbangan komparasi antara Harga Pasar (Price) di sisi kiri dan Laba Bersih Tahunan (Earnings) di sisi kanan.',
    visualType: 'per_ratio',
    practiceTask:
      'Bandingkan PER dari dua bank besar di Indonesia (misal BBCA dan BMRI) dan amati perbedaannya.',
    quiz: [
      {
        id: 'q-per-1',
        question: 'Jika emiten A memiliki PER 8x dan emiten B sejenis memiliki PER 25x, apa indikasi umumnya?',
        options: [
          'Emiten A relatif lebih murah/undervalued dibanding emiten B (secara rasio laba)',
          'Emiten B pasti lebih bagus kinerjanya',
          'Emiten A tidak punya hutang',
          'Emiten B akan segera membagikan bonus',
        ],
        correctIndex: 0,
        explanation:
          'PER yang lebih rendah mengindikasikan harga saham yang lebih murah per rupiah laba yang dihasilkan.',
      },
    ],
    commonMistakes: [
      'Membandingkan PER antar industri yang berbeda (misal emiten teknologi dengan emiten perbankan).',
    ],
    relatedTerms: ['PBV', 'ROE', 'EPS', 'Market Cap'],
  },
  {
    id: 'pbv',
    title: 'PBV (Price to Book Value)',
    category: 'Fundamental',
    icon: 'BookOpen',
    difficulty: 'Menengah',
    readTime: '4 min',
    whatIsIt:
      'PBV adalah rasio valuasi yang membandingkan harga pasar saham dengan nilai buku ekuitas per lembar (Book Value per Share). Rumus: Harga Saham / (Total Ekuitas / Jumlah Lembar Saham).',
    simpleExplanation:
      'PBV mengukur berapa kali lipat harga saham diperdagangkan dibanding nilai bersih aset bersih (ekuitas) perusahaan jika seluruh aset dijual dan seluruh utang dilunasi.',
    numberExample:
      'ASII memiliki Book Value per share Rp 4.975 dan harga pasar Rp 5.225. Maka PBV ASII = 5.225 / 4.975 = 1,05x (sangat dekat dengan nilai buku asetnya).',
    visualDescription:
      'Diagram batang perbandingan antara Nilai Buku Ekuitas dan Harga Pasar di Bursa.',
    visualType: 'general',
    practiceTask:
      'Cari saham di indeks LQ45 yang memiliki PBV di bawah 1.0x (harga di bawah nilai buku).',
    quiz: [
      {
        id: 'q-pbv-1',
        question: 'Apa arti saham yang memiliki rasio PBV di bawah 1.0x?',
        options: [
          'Harga pasar saham lebih rendah daripada nilai buku ekuitas bersih per lembarnya',
          'Perusahaan sudah pasti bangkrut',
          'Perusahaan tidak boleh diperdagangkan di bursa',
          'Saham tersebut tidak memiliki pemegang saham',
        ],
        correctIndex: 0,
        explanation:
          'PBV < 1.0x berarti saham diperdagangkan dengan diskon terhadap nilai buku ekuitasnya.',
      },
    ],
    commonMistakes: [
      'Mengira semua saham dengan PBV di bawah 1x adalah saham bagus tanpa mengecek apakah ada masalah penurunan kualitas aset.',
    ],
    relatedTerms: ['PER', 'ROE', 'DER'],
  },
  {
    id: 'roe',
    title: 'ROE (Return on Equity)',
    category: 'Fundamental',
    icon: 'Award',
    difficulty: 'Menengah',
    readTime: '4 min',
    whatIsIt:
      'ROE adalah rasio profitabilitas yang mengukur kemampuan manajemen perusahaan dalam menghasilkan laba bersih dari modal ekuitas yang disetorkan pemegang saham. Rumus: (Laba Bersih / Total Ekuitas) x 100%.',
    simpleExplanation:
      'Berapa persen keuntungan bersih yang bisa dicetak perusahaan dari setiap modal Rp 100 yang dipercayakan oleh investor kepadanya.',
    numberExample:
      'BBCA memiliki laba bersih Rp 54,8 Triliun dan ekuitas Rp 260 Triliun. ROE = (54,8 / 260) x 100% = 21,08%. Ini menunjukkan kinerja profitabilitas yang sangat superior.',
    visualDescription:
      'Termometer efisiensi profitabilitas: di bawah 10% (Rendah), 10-15% (Cukup Baik), di atas 20% (Sangat Efisien/Berkualitas Tinggi).',
    visualType: 'general',
    practiceTask:
      'Hitung ROE sebuah perusahaan dengan Laba Bersih Rp 10 Miliar dan Total Ekuitas Rp 50 Miliar.',
    quiz: [
      {
        id: 'q-roe-1',
        question: 'Mengapa Warren Buffett sangat menyukai perusahaan dengan ROE konsisten di atas 15-20%?',
        options: [
          'Karena menandakan perusahaan memiliki keunggulan kompetitif (moat) dan alokasi modal efisien',
          'Karena perusahaan tersebut tidak membayar pajak',
          'Karena harga sahamnya dijamin naik setiap hari',
          'Karena perusahaan pasti tidak butuh karyawan',
        ],
        correctIndex: 0,
        explanation:
          'ROE tinggi dan konsisten mencerminkan keunggulan bersaing dan efisiensi manajemen modal.',
      },
    ],
    commonMistakes: [
      'Melihat ROE tinggi tanpa mengecek utang, karena utang besar (leverage tinggi) juga bisa mendongkrak ROE semu.',
    ],
    relatedTerms: ['ROA', 'PER', 'DER', 'Net Profit Margin'],
  },
  {
    id: 'roa',
    title: 'ROA (Return on Assets)',
    category: 'Fundamental',
    icon: 'Briefcase',
    difficulty: 'Menengah',
    readTime: '4 min',
    whatIsIt:
      'ROA adalah rasio profitabilitas yang mengukur seberapa efisien perusahaan mengonversi total aset yang dimilikinya menjadi laba bersih. Rumus: (Laba Bersih / Total Aset) x 100%.',
    simpleExplanation:
      'Mengukur kemampuan seluruh mesin, gedung, kas, dan aset perusahaan dalam mencetak rupiah keuntungan.',
    numberExample:
      'ICBP menghasilkan laba bersih Rp 9,2 Triliun dari total aset Rp 128 Triliun. ROA = (9,2 / 128) x 100% = 7,18%.',
    visualDescription:
      'Bagan perbandingan Total Aset (Utang + Modal) yang menghasilkan output Laba Bersih.',
    visualType: 'general',
    practiceTask:
      'Bandingkan ROA industri perbankan (biasanya 2-4%) dengan industri manufaktur/konsumer (biasanya 6-12%).',
    quiz: [
      {
        id: 'q-roa-1',
        question: 'Apa perbedaan mendasar antara ROE dan ROA?',
        options: [
          'ROE membandingkan laba terhadap modal ekuitas, sedangkan ROA membandingkan laba terhadap seluruh total aset (termasuk utang)',
          'ROA hanya untuk bank, ROE untuk ritel',
          'ROE dihitung bulanan, ROA dihitung harian',
          'Tidak ada perbedaan',
        ],
        correctIndex: 0,
        explanation:
          'ROE fokus pada pengembalian bagi pemilik ekuitas, sementara ROA mengukur efisiensi pemanfaatan total aset perusahaan.',
      },
    ],
    commonMistakes: [
      'Membandingkan ROA bank langsung dengan ROA perusahaan software karena struktur asetnya sangat berbeda.',
    ],
    relatedTerms: ['ROE', 'DER', 'PER'],
  },
  {
    id: 'der',
    title: 'DER (Debt to Equity Ratio)',
    category: 'Fundamental',
    icon: 'Scale',
    difficulty: 'Menengah',
    readTime: '4 min',
    whatIsIt:
      'DER adalah rasio solvabilitas yang membandingkan total utang (liabilitas berbunga) perusahaan terhadap total ekuitas pemegang saham. Rumus: Total Utang / Total Ekuitas.',
    simpleExplanation:
      'DER mengukur seberapa besar perusahaan beroperasi menggunakan uang pinjaman dibanding uang modal sendiri.',
    numberExample:
      'ADRO memiliki total utang berbunga Rp 18 Triliun dan ekuitas Rp 103 Triliun. DER = 18 / 103 = 0,17x. Angka ini sangat konservatif dan menunjukkan risiko kebangkrutan yang sangat minim.',
    visualDescription:
      'Timbangan neraca: Sisi Utang vs Sisi Ekuitas Modal Sendiri.',
    visualType: 'general',
    practiceTask:
      'Analisis emiten dengan DER > 2.0x dan nilai beban bunga yang harus dibayarkannya setiap tahun.',
    quiz: [
      {
        id: 'q-der-1',
        question: 'Apa risiko terbesar bagi perusahaan yang memiliki rasio DER sangat tinggi (> 3.0x)?',
        options: [
          'Beban bunga utang dapat menggerus laba dan memicu risiko gagal bayar saat suku bunga naik atau ekonomi melambat',
          'Perusahaan tidak boleh mencatat laba',
          'Bursa akan membatalkan status PT',
          'Harga saham langsung diturunkan ke Rp 1',
        ],
        correctIndex: 0,
        explanation:
          'Tingkat utang berlebih meningkatkan beban bunga dan kerentanan finansial saat kondisi makro memburuk.',
      },
    ],
    commonMistakes: [
      'Menyamakan formula DER pada perusahaan non-finansial dengan bank (di mana dana simpanan nasabah tercatat sebagai liabilitas resmi).',
    ],
    relatedTerms: ['ROE', 'PBV', 'Free Cash Flow'],
  },
  {
    id: 'support',
    title: 'Support (Tingkat Penyangga Harga)',
    category: 'Teknikal',
    icon: 'ShieldCheck',
    difficulty: 'Pemula',
    readTime: '4 min',
    whatIsIt:
      'Support adalah level harga tertentu di mana minat beli (demand) diperkirakan cukup terkonsentrasi untuk menahan penurunan harga lebih lanjut atau memicu pantulan ke atas.',
    simpleExplanation:
      'Bayangkan lantai karet di sebuah ruangan. Ketika bola jatuh ke lantai, lantai tersebut menahan bola agar tidak tembus ke bawah dan memantulkannya kembali ke atas.',
    numberExample:
      'BBCA berulang kali turun ke level Rp 10.000 namun selalu memantul kembali ke Rp 10.300. Level Rp 10.000 ini menjadi Support psikologis kuat.',
    visualDescription:
      'Garis horizontal hijau di bawah ayunan lembah harga (swing lows) pada candlestick chart.',
    visualType: 'support_resistance',
    practiceTask:
      'Buka chart harian BBRI dan tarik garis support horizontal pada titik terendah dalam 6 bulan terakhir.',
    quiz: [
      {
        id: 'q-sup-1',
        question: 'Apa yang biasanya dilakukan trader teknikal saat harga mendekati area Support kuat dengan konfirmasi candle pembalikan?',
        options: [
          'Mencari peluang beli (Buy on Weakness) dengan Stop Loss ketat di bawah support',
          'Menjual seluruh portofolio dalam keadaan panik',
          'Menutup aplikasi trading',
          'Menghapus indikator',
        ],
        correctIndex: 0,
        explanation:
          'Support menawarkan area entry dengan rasio Risk/Reward optimal karena jarak ke Stop Loss sangat terukur.',
      },
    ],
    commonMistakes: [
      'Menganggap support adalah angka kaku tunggal, bukan sebuah area / zona toleransi harga.',
    ],
    relatedTerms: ['Resistance', 'Breakdown', 'Breakout', 'Stop Loss'],
  },
  {
    id: 'resistance',
    title: 'Resistance (Tingkat Hambatan Harga)',
    category: 'Teknikal',
    icon: 'ShieldAlert',
    difficulty: 'Pemula',
    readTime: '4 min',
    whatIsIt:
      'Resistance adalah level harga di mana tekanan jual (supply) diperkirakan cukup besar untuk menghentikan laju kenaikan harga dan memicu koreksi kembali ke bawah.',
    simpleExplanation:
      'Seperti langit-langit atap ruangan. Ketika bola dilempar ke atas, bola akan membentur atap dan berbalik arah turun kembali.',
    numberExample:
      'Saham BMRI berulang kali naik mendekati Rp 7.000 namun selalu tertekan aksi profit taking penjual kembali ke Rp 6.700. Level Rp 7.000 adalah Resistance.',
    visualDescription:
      'Garis horizontal merah di atas puncak-puncak harga (swing highs).',
    visualType: 'support_resistance',
    practiceTask:
      'Identifikasi level resistance terdekat pada chart saham TLKM saat ini.',
    quiz: [
      {
        id: 'q-res-1',
        question: 'Apa yang terjadi pada level resistance lama setelah berhasil ditembus ke atas (Breakout)?',
        options: [
          'Resistance lama sering kali berubah peran menjadi Support baru (Role Reversal)',
          'Resistance lama menghilang selamanya',
          'Harga pasti langsung turun ke nol',
          'Bursa akan menutup perdagangan',
        ],
        correctIndex: 0,
        explanation:
          'Konsep Support becomes Resistance dan Resistance becomes Support (SBR / RBS) adalah prinsip dasar aksi harga.',
      },
    ],
    commonMistakes: [
      'Melakukan aksi beli FOMO tepat di bawah area resistance kuat tanpa menunggu konfirmasi breakout.',
    ],
    relatedTerms: ['Support', 'Breakout', 'Retest', 'Take Profit'],
  },
  {
    id: 'breakout',
    title: 'Breakout (Penembusan Resisten ke Atas)',
    category: 'Teknikal',
    icon: 'Zap',
    difficulty: 'Menengah',
    readTime: '4 min',
    whatIsIt:
      'Breakout terjadi ketika harga saham berhasil menembus level resisten penting atau garis tren atas dengan disertai lonjakan volume transaksi.',
    simpleExplanation:
      'Seperti menendang bola begitu keras hingga menjebol atap plafon dan terbang menuju ruang di atasnya.',
    numberExample:
      'GOTO konsolidasi selama 2 bulan di bawah Rp 70. Hari ini harga melonjak ke Rp 74 dengan volume 1,2 miliar lembar (3x lipat rata-rata). Ini adalah konfirmasi valid Breakout.',
    visualDescription:
      'Candlestick hijau panjang menembus garis merah horizontal resisten dengan batang volume tinggi di bawahnya.',
    visualType: 'candlestick',
    practiceTask:
      'Temukan contoh candle breakout dengan volume besar pada salah satu saham di StockAI screener.',
    quiz: [
      {
        id: 'q-bo-1',
        question: 'Apa indikator pelengkap paling krusial untuk membedakan True Breakout dari Fakeout (Breakout palsu)?',
        options: [
          'Lonjakan Volume Transaksi yang signifikan di atas rata-rata',
          'Warna logo emiten',
          'Jam makan siang bursa',
          'Jumlah karyawan emiten',
        ],
        correctIndex: 0,
        explanation:
          'Volume adalah bahan bakar pergerakan harga yang memvalidasi keaslian minat beli institusi saat breakout.',
      },
    ],
    commonMistakes: [
      'Membeli saham breakout tanpa konfirmasi volume, lalu terjebak penurunan saat terjadi false breakout.',
    ],
    relatedTerms: ['Breakdown', 'Retest', 'Resistance', 'Volume'],
  },
  {
    id: 'breakdown',
    title: 'Breakdown (Penembusan Support ke Bawah)',
    category: 'Teknikal',
    icon: 'ArrowDownCircle',
    difficulty: 'Menengah',
    readTime: '4 min',
    whatIsIt:
      'Breakdown terjadi ketika harga saham menembus ke bawah garis support kunci atau garis tren naik, mengindikasikan dominasi tekanan jual yang kuat.',
    simpleExplanation:
      'Seperti lantai yang jebol karena beban terlalu berat, menyebabkan barang jatuh ke lantai di bawahnya.',
    numberExample:
      'Saham bertahan di support Rp 5.000 selama berminggu-minggu, lalu ditutup di Rp 4.880 dengan candle merah pekat dan volume tinggi. Ini adalah sinyal Breakdown.',
    visualDescription:
      'Candlestick merah menembus ke bawah garis horizontal support.',
    visualType: 'candlestick',
    practiceTask:
      'Pelajari cara memasang Stop Loss tepat beberapa tick di bawah area support untuk mengantisipasi breakdown.',
    quiz: [
      {
        id: 'q-bd-1',
        question: 'Ketika saham yang kita miliki mengalami breakdown support dengan volume tinggi, langkah manajemen risiko terbaik adalah:',
        options: [
          'Mengeksekusi disiplin cut loss / stop loss sesuai trading plan awal',
          'Membeli lebih banyak tanpa batas dana',
          'Menyalahkan bursa',
          'Mendiamkan posisi berbulan-bulan',
        ],
        correctIndex: 0,
        explanation:
          'Disiplin memotong kerugian saat breakdown support menyelamatkan modal dari penurunan yang lebih dalam.',
      },
    ],
    commonMistakes: [
      'Menolak cut loss saat breakdown karena berharap harga akan berbalik secara ajaib.',
    ],
    relatedTerms: ['Breakout', 'Support', 'Stop Loss'],
  },
  {
    id: 'rsi',
    title: 'RSI (Relative Strength Index)',
    category: 'Teknikal',
    icon: 'Activity',
    difficulty: 'Menengah',
    readTime: '5 min',
    whatIsIt:
      'RSI adalah indikator momentum berbasis osilator yang mengukur kecepatan dan besaran perubahan harga saham dalam skala nilai 0 hingga 100.',
    simpleExplanation:
      'RSI seperti speedometer kecepatan mobil. Menunjukkan apakah saham sudah melaju terlalu kencang dan kelelahan (Overbought) atau sudah tertekan terlalu dalam (Oversold).',
    numberExample:
      'Periode standar adalah RSI 14 hari. Nilai di atas 70 menunjukkan kondisi Overbought (Jenuh Beli), sedangkan nilai di bawah 30 menunjukkan kondisi Oversold (Jenuh Jual).',
    visualDescription:
      'Grafik osilator garis meliuk antara 0 - 100 dengan batas zona merah di 70 dan batas zona hijau di 30.',
    visualType: 'general',
    practiceTask:
      'Amati nilai RSI 14 pada saham BBCA saat ini dan kategorikan apakah sedang Overbought, Oversold, atau Netral.',
    quiz: [
      {
        id: 'q-rsi-1',
        question: 'Jika RSI suatu saham berada di level 22, kondisi pasar saham tersebut disebut:',
        options: ['Oversold (Jenuh Jual)', 'Overbought (Jenuh Beli)', 'Golden Cross', 'Sideways'],
        correctIndex: 0,
        explanation:
          'Nilai RSI di bawah 30 menandakan saham berada di zona jenuh jual (oversold), berpotensi mengalami technical rebound.',
      },
    ],
    commonMistakes: [
      'Langsung membeli hanya karena RSI < 30 padahal saham sedang dalam strong downtrend berkelanjutan.',
    ],
    relatedTerms: ['MACD', 'Moving Average', 'Bollinger Bands'],
  },
  {
    id: 'macd',
    title: 'MACD (Moving Average Convergence Divergence)',
    category: 'Teknikal',
    icon: 'GitCommit',
    difficulty: 'Menengah',
    readTime: '5 min',
    whatIsIt:
      'MACD adalah indikator momentum pengikut tren (trend-following) yang menunjukkan hubungan antara dua rata-rata bergerak (EMA 12 dan EMA 26) beserta garis sinyalnya (EMA 9).',
    simpleExplanation:
      'MACD membantu trader mendeteksi awal mula perubahan arah tren dan seberapa kuat tenaga pergerakan harga tersebut.',
    numberExample:
      'Ketika Garis MACD (biru) memotong ke atas Garis Sinyal (oranye) dari bawah garis nol, tercipta sinyal Bullish MACD Crossover.',
    visualDescription:
      'Dua garis bergerak dinamis disertai histogram batang vertikal di atas dan di bawah garis zero baseline.',
    visualType: 'general',
    practiceTask:
      'Cek histogram MACD pada chart BMRI dan tentukan apakah momentum positif sedang menguat atau melemah.',
    quiz: [
      {
        id: 'q-macd-1',
        question: 'Apa yang diindikasikan oleh Bullish MACD Crossover?',
        options: [
          'Peluang pergeseran momentum jangka pendek ke arah kenaikan harga (sinyal beli awal)',
          'Saham pasti akan membagikan dividen',
          'Perusahaan tidak boleh berutang lagi',
          'Perdagangan saham akan dihentikan sementara',
        ],
        correctIndex: 0,
        explanation:
          'Perpotongan garis MACD ke atas garis sinyal menunjukkan percepatan momentum harga jangka pendek.',
      },
    ],
    commonMistakes: [
      'Mengabaikan tren besar pada timeframe lebih tinggi saat membaca sinyal MACD di timeframe kecil.',
    ],
    relatedTerms: ['RSI', 'Moving Average', 'Support'],
  },
  {
    id: 'moving-average',
    title: 'Moving Average (Rata-rata Bergerak / MA)',
    category: 'Teknikal',
    icon: 'GitBranch',
    difficulty: 'Pemula',
    readTime: '5 min',
    whatIsIt:
      'Moving Average (MA) adalah indikator teknikal yang menghaluskan fluktuasi pergerakan harga dengan menghitung rata-rata harga penutupan selama periode waktu tertentu (misal 20, 50, atau 200 hari).',
    simpleExplanation:
      'Seperti melihat nilai rata-rata ujian kelas selama satu semester untuk mengetahui apakah nilai murid cenderung membaik atau memburuk secara keseluruhan.',
    numberExample:
      'SMA 20 menghitung rata-rata harga 20 hari terakhir. Jika harga saat ini Rp 10.250 berada di atas SMA 20 (Rp 10.050) dan SMA 200 (Rp 9.500), ini mengonfirmasi struktur Uptrend jangka pendek dan panjang.',
    visualDescription:
      'Garis kurva halus meliuk mengikuti pergerakan candlestick di chart utama.',
    visualType: 'candlestick',
    practiceTask:
      'Tampilkan garis SMA 20, SMA 50, dan SMA 200 pada chart saham BBCA dan amati susunannya.',
    quiz: [
      {
        id: 'q-ma-1',
        question: 'Apa yang dimaksud dengan Golden Cross pada indikator Moving Average?',
        options: [
          'Ketika MA jangka pendek (misal MA 50) memotong ke atas MA jangka panjang (misal MA 200)',
          'Ketika harga saham menyentuh Rp 10.000',
          'Ketika perusahaan membeli kembali sahamnya',
          'Ketika dividen dibagikan',
        ],
        correctIndex: 0,
        explanation:
          'Golden Cross adalah pola klasik di mana MA50 melintas ke atas MA200, menandakan potensi konfirmasi tren bullish jangka panjang.',
      },
    ],
    commonMistakes: [
      'Menggunakan MA di kondisi pasar sideways/choppy, yang sering menghasilkan sinyal false whip-saw.',
    ],
    relatedTerms: ['RSI', 'MACD', 'Bollinger Bands'],
  },
  {
    id: 'stop-loss',
    title: 'Stop Loss (Batas Kerugian)',
    category: 'Psikologi & Manajemen Risiko',
    icon: 'Shield',
    difficulty: 'Pemula',
    readTime: '4 min',
    whatIsIt:
      'Stop Loss adalah instruksi atau rencana level harga yang telah ditentukan sebelumnya untuk menutup posisi trading secara otomatis demi membatasi kerugian maksimal yang dapat diterima.',
    simpleExplanation:
      'Seperti sabuk pengaman dan airbag di dalam mobil. Dibuat bukan karena kita ingin celaka, tetapi untuk melindungi nyawa jika sewaktu-waktu terjadi tabrakan mendadak.',
    numberExample:
      'Beli saham di Rp 5.000 dengan target profit di Rp 5.500 (+10%). Kamu memasang Stop Loss ketat di Rp 4.750 (-5%). Jika harga turun ke Rp 4.750, kamu langsung keluar sehingga kerugianmu terkunci hanya 5%.',
    visualDescription:
      'Garis batas horizontal merah di bawah titik entri trading yang menandai level keluar darurat.',
    visualType: 'risk_reward',
    practiceTask:
      'Gunakan Risk Calculator di tab Tools untuk menghitung posisi lot maksimal agar risiko per trade tidak melebihi 2% dari total modal.',
    quiz: [
      {
        id: 'q-sl-1',
        question: 'Kapan waktu terbaik untuk menentukan level Stop Loss?',
        options: [
          'Sebelum memasukkan order beli (saat menyusun trading plan)',
          'Setelah harga saham turun 30%',
          'Saat merasa cemas di tengah malam',
          'Tidak perlu menentukan stop loss',
        ],
        correctIndex: 0,
        explanation:
          'Level Stop Loss wajib ditentukan secara rasional dan objektif SEBELUM mengeksekusi order beli.',
      },
    ],
    commonMistakes: [
      'Menggeser atau menurunkan level stop loss ke bawah saat harga mendekatinya karena emosi tidak rela rugi.',
    ],
    relatedTerms: ['Capital Loss', 'Take Profit', 'Risk/Reward'],
  },
  {
    id: 'risk-reward',
    title: 'Risk to Reward Ratio (RRR) & Take Profit',
    category: 'Psikologi & Manajemen Risiko',
    icon: 'Target',
    difficulty: 'Pemula',
    readTime: '5 min',
    whatIsIt:
      'Risk to Reward Ratio (RRR) adalah perbandingan antara besaran risiko potensi kerugian (jarak ke Stop Loss) dengan potensi keuntungan (jarak ke Take Profit) pada suatu rencana transaksi.',
    simpleExplanation:
      'Prinsip berbisnis yang cerdas: Jangan pernah mempertaruhkan uang Rp 1.000 jika potensi keuntungannya hanya Rp 500. Selalu cari peluang di mana modal Rp 1.000 berpotensi menghasilkan Rp 2.000 atau Rp 3.000.',
    numberExample:
      'Harga Beli = Rp 10.000. Stop Loss = Rp 9.600 (Risiko Rp 400 atau 4%). Target Take Profit = Rp 11.000 (Reward Rp 1.000 atau 10%). Maka RRR = 400 : 1.000 = 1 : 2,5. Setup ini sangat ideal.',
    visualDescription:
      'Kotak dua warna: kotak merah bawah mewakili Risk (1 unit) dan kotak hijau atas mewakili Reward (2.5 unit).',
    visualType: 'risk_reward',
    practiceTask:
      'Hitung RRR untuk rencana trading dengan Entry Rp 3.000, Stop Loss Rp 2.850, dan Target Take Profit Rp 3.450.',
    quiz: [
      {
        id: 'q-rrr-1',
        question: 'Berapa rasio minimum Risk/Reward yang ideal direkomendasikan bagi trader disiplin?',
        options: ['Minimal 1 : 2 atau lebih tinggi', '1 : 0.5', '1 : 0.1', 'Tidak peduli rasio'],
        correctIndex: 0,
        explanation:
          'Dengan RRR minimal 1 : 2, seorang trader tetap bisa mencetak profit konsisten meskipun hanya memiliki win rate 40-50%.',
      },
    ],
    commonMistakes: [
      'Mengambil profit terlalu cepat (+1%) namun membiarkan kerugian membengkak (-15%), merusak rasio RRR akun.',
    ],
    relatedTerms: ['Stop Loss', 'Capital Gain', 'Capital Loss'],
  },
];

export function getLearningTopicById(id: string): LearningTopic | undefined {
  return MOCK_LEARNING_TOPICS.find((t) => t.id.toLowerCase() === id.toLowerCase());
}
