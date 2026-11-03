export interface DuaItem {
  id: string;
  titleBn: string;
  arabic: string;
  pronunciationBn: string;
  meaningBn: string;
}

export interface FontOption {
  id: string;
  name: string;
  family: string;
  script: 'bn' | 'en' | 'ar' | 'display';
}

export type SceneType =
  | 'ref1_blue_dome_sunset'
  | 'ref_image'
  | 'mosque_silhouette_gold'
  | 'moroccan_arch_glow'
  | 'hanging_fanous_trio'
  | 'crescent_starry_dunes'
  | 'minimal_paper_cut'
  | 'emerald_royal_mihrab'
  | 'twilight_minaret_reflection'
  | 'quran_radiant_mandala'
  | 'candle_lantern_dates'
  | 'celestial_orbit_crescent'
  | 'ottoman_courtyard_arch';

export interface ThemePreset {
  id: number; // 1 to 97
  day: number; // 97 down to 1
  nameBn: string;
  category: 'reference' | 'mosque' | 'lantern' | 'arch' | 'crescent' | 'minimal' | 'royal';
  sceneType: SceneType;
  bgImageUrl?: string;
  skyColors: [string, string, string];
  accentColor: string;
  secondaryAccent: string;
  textColor: string;
  subTextColor: string;
  numberColor: string;
  duaColor: string;
  quoteColor: string;
  layoutAlign: 'center' | 'left' | 'right';
  numberX: number; // 0 to 100 percentage of canvas width
  numberY: number; // 0 to 100 percentage of canvas height
  headerX: number;
  headerY: number;
  quoteX: number;
  quoteY: number;
  duaX: number;
  duaY: number;
  patternSeed: number;
}

export const FONT_OPTIONS: FontOption[] = [
  // Bengali Fonts (বাংলা ফন্ট সম্ভার)
  { id: 'hind', name: 'হিন্দ শিলিগুড়ি — ক্লাসিক (Hind Siliguri)', family: "'Hind Siliguri', sans-serif", script: 'bn' },
  { id: 'noto-sans-bn', name: 'নোটো স্যান্স বাংলা — মডার্ন (Noto Sans Bengali)', family: "'Noto Sans Bengali', sans-serif", script: 'bn' },
  { id: 'anek-bn', name: 'অনেক বাংলা — বোল্ড হেডলাইন (Anek Bangla)', family: "'Anek Bangla', sans-serif", script: 'bn' },
  { id: 'baloo-da', name: 'বালু দা ২ — রাউন্ডেড ডিসপ্লে (Baloo Da 2)', family: "'Baloo Da 2', cursive", script: 'bn' },
  { id: 'alkatra', name: 'আলকাতরা — আর্টিস্টিক ব্রাশ (Alkatra)', family: "'Alkatra', system-ui", script: 'bn' },
  { id: 'noto-bn', name: 'নোটো সেরিফ বাংলা — সাহিত্যিক (Noto Serif)', family: "'Noto Serif Bengali', serif", script: 'bn' },
  { id: 'tiro-bn', name: 'তিরো বাংলা — ঐতিহ্যবাহী (Tiro Bangla)', family: "'Tiro Bangla', serif", script: 'bn' },
  { id: 'galada', name: 'গলাদা — ক্যালিগ্রাফি স্ক্রিপ্ট (Galada)', family: "'Galada', cursive", script: 'bn' },
  { id: 'atma', name: 'আত্মা — ক্রিয়েটিভ হ্যান্ড (Atma)', family: "'Atma', system-ui", script: 'bn' },
  { id: 'mina', name: 'মিনা — ক্লিন জিওমেট্রিক (Mina)', family: "'Mina', sans-serif", script: 'bn' },
  // English Display & Script Fonts
  { id: 'montserrat', name: 'মন্টসেরাট বোল্ড (Montserrat)', family: "'Montserrat', sans-serif", script: 'en' },
  { id: 'great-vibes', name: 'গ্রেট ভাইবস স্ক্রিপ্ট (Great Vibes)', family: "'Great Vibes', cursive", script: 'display' },
  { id: 'sacramento', name: 'স্যাক্রামেন্টো হ্যান্ড (Sacramento)', family: "'Sacramento', cursive", script: 'display' },
  { id: 'cinzel', name: 'সিনজেল রয়্যাল (Cinzel)', family: "'Cinzel', serif", script: 'en' },
  { id: 'playfair', name: 'প্লেফেয়ার এডিটোরিয়াল (Playfair)', family: "'Playfair Display', serif", script: 'en' },
  { id: 'oswald', name: 'অসওয়াল্ড টল (Oswald)', family: "'Oswald', sans-serif", script: 'en' },
  { id: 'jakarta', name: 'প্লাস জাকার্তা (Plus Jakarta)', family: "'Plus Jakarta Sans', sans-serif", script: 'en' },
  // Arabic Fonts
  { id: 'amiri', name: 'আমিরি কুরআনিক (Amiri)', family: "'Amiri', serif", script: 'ar' },
  { id: 'scheherazade', name: 'শেহেরজাদ নাসখ (Scheherazade)', family: "'Scheherazade New', serif", script: 'ar' },
  { id: 'reem-kufi', name: 'রিম কুফি (Reem Kufi)', family: "'Reem Kufi', sans-serif", script: 'ar' },
  { id: 'lateef', name: 'লতিফ ক্লাসিক (Lateef)', family: "'Lateef', serif", script: 'ar' },
  { id: 'noto-ar', name: 'নোটো নাসখ আরবি (Noto Naskh)', family: "'Noto Naskh Arabic', serif", script: 'ar' },
];

export const DEMO_DUAS: DuaItem[] = [
  {
    id: 'dua-1',
    titleBn: 'রমজান প্রাপ্তির দোয়া (রজব ও শাবান)',
    arabic: 'اللَّهُمَّ بَارِكْ لَنَا فِي رَجَبٍ وَشَعْبَانَ وَبَلِّغْنَا رَمَضَانَ',
    pronunciationBn: 'আল্লাহুম্মা বারিক লানা ফি রজাবা ওয়া শাবান, ওয়া বাল্লিগনা রমাদান।',
    meaningBn: 'হে আল্লাহ! রজব ও শাবান মাসে আমাদের বরকত দান করুন এবং আমাদেরকে রমজান পর্যন্ত পৌঁছে দিন।'
  },
  {
    id: 'dua-2',
    titleBn: 'নতুন চাঁদ দেখার ও শান্তির দোয়া',
    arabic: 'اللَّهُمَّ أَهِلَّهُ عَلَيْنَا بِالْأَمْنِ وَالْإِيمَانِ وَالسَّلَامَةِ وَالْإِسْلَامِ',
    pronunciationBn: 'আল্লাহুম্মা আহিল্লাহু আলাইনা বিল আমনি ওয়াল ঈমানি ওয়াস সালামাতি ওয়াল ইসলাম।',
    meaningBn: 'হে আল্লাহ! এই মাসকে আমাদের ওপর নিরাপত্তা, ঈমান, শান্তি ও ইসলামের সাথে উদিত করুন।'
  },
  {
    id: 'dua-3',
    titleBn: 'অন্তর পরিশুদ্ধ ও তাকওয়ার দোয়া',
    arabic: 'اللَّهُمَّ آتِ نَفْسِي تَقْوَاهَا وَزَكِّهَا أَنْتَ خَيْرُ مَنْ زَكَّاهَا',
    pronunciationBn: 'আল্লাহুম্মা আতি নাফসি তাকওয়াহা ওয়া যাক্কিহা আনতা খাইরু মান যাক্কাহা।',
    meaningBn: 'হে আল্লাহ! আমার অন্তরে তাকওয়া দান করুন এবং একে পবিত্র করুন, আপনিই তো সর্বোত্তম পবিত্রকারী।'
  },
  {
    id: 'dua-4',
    titleBn: 'ক্ষমা ও মাগফিরাতের দোয়া (শবে কদর ও রমজান)',
    arabic: 'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي',
    pronunciationBn: 'আল্লাহুম্মা ইন্নাকা আফুউন তুহিব্বুল আফওয়া ফা’ফু আন্নি।',
    meaningBn: 'হে আল্লাহ! নিশ্চয়ই আপনি ক্ষমাশীল, ক্ষমা করাকে ভালোবাসেন; অতএব আমাকে ক্ষমা করে দিন।'
  },
  {
    id: 'dua-5',
    titleBn: 'ইবাদতে সাহায্য পাওয়ার দোয়া',
    arabic: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
    pronunciationBn: 'আল্লাহুম্মা আইন্নি আলা যিকরিকা ওয়া শুকরিকা ওয়া হুসনি ইবাদাতিক।',
    meaningBn: 'হে আল্লাহ! আপনার জিকির, শুকরিয়া ও উত্তমরূপে আপনার ইবাদত করার ব্যাপারে আমাকে সাহায্য করুন।'
  },
  {
    id: 'dua-6',
    titleBn: 'হেদায়াত ও আত্মসংযমের দোয়া',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى',
    pronunciationBn: 'আল্লাহুম্মা ইন্নি আসআলুকাল হুদা ওয়াত তুকা ওয়াল আফাফা ওয়াল গিনা।',
    meaningBn: 'হে আল্লাহ! আমি আপনার কাছে হেদায়াত, তাকওয়া, চারিত্রিক পবিত্রতা এবং অভাবমুক্তি প্রার্থনা করছি।'
  },
  {
    id: 'dua-7',
    titleBn: 'নেক আমল কবুলের দোয়া',
    arabic: 'رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ',
    pronunciationBn: 'রব্বানা তাকাব্বাল মিন্না ইন্নাকা আনতাস সামিউল আলিম।',
    meaningBn: 'হে আমাদের রব! আমাদের পক্ষ থেকে কবুল করুন, নিশ্চয়ই আপনি সর্বশ্রোতা ও সর্বজ্ঞ।'
  },
  {
    id: 'dua-8',
    titleBn: 'অন্তরের স্থিরতা ও রহমতের দোয়া',
    arabic: 'رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِنْ لَدُنْكَ رَحْمَةً',
    pronunciationBn: 'রব্বানা লা তুযিগ কুলুবানা বা’দা ইয হাদাইতানা ওয়া হাব লানা মিল্লাদুনকা রহমাহ।',
    meaningBn: 'হে আমাদের রব! হেদায়াত দানের পর আমাদের অন্তরকে বক্র করবেন না এবং আপনার পক্ষ থেকে রহমত দান করুন।'
  },
  {
    id: 'dua-9',
    titleBn: 'দুনিয়া ও আখিরাতের কল্যাণের দোয়া',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    pronunciationBn: 'রব্বানা আতিনা ফিদ্দুনইয়া হাসানাতাও ওয়া ফিল আখিরাতি হাসানাতাও ওয়া ক্বিনা আযাবান্নার।',
    meaningBn: 'হে আমাদের রব! আমাদের দুনিয়াতে কল্যাণ দিন, আখিরাতেও কল্যাণ দিন এবং জাহান্নামের আজাব থেকে রক্ষা করুন।'
  },
  {
    id: 'dua-10',
    titleBn: 'কুরআনের নূর লাভের দোয়া',
    arabic: 'اللَّهُمَّ اجْعَلِ الْقُرْآنَ رَبِيعَ قَلْبِي وَنُورَ صَدْرِي',
    pronunciationBn: 'আল্লাহুম্মাজ আলিল কুরআনা রাবিআ কালবি ওয়া নূরা সদরি।',
    meaningBn: 'হে আল্লাহ! কুরআনকে আমার হৃদয়ের বসন্ত এবং আমার বক্ষের নূর বানিয়ে দিন।'
  },
  {
    id: 'dua-11',
    titleBn: 'গুনাহ মাফ ও রহমতের দোয়া',
    arabic: 'رَبِّ اغْفِرْ وَارْحَمْ وَأَنْتَ خَيْرُ الرَّاحِمِينَ',
    pronunciationBn: 'রব্বিগফির ওয়ারহাম ওয়া আনতা খাইরুর রাহিমিন।',
    meaningBn: 'হে আমার রব! ক্ষমা করুন ও দয়া করুন, আর আপনিই তো সর্বোত্তম দয়ালু।'
  },
  {
    id: 'dua-12',
    titleBn: 'ইফতারের দোয়া',
    arabic: 'ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ',
    pronunciationBn: 'যাহাবায যামাউ ওয়াবতাল্লাতিল উরুকু ওয়া সাবাতাল আজরু ইনশাআল্লাহ।',
    meaningBn: 'পিপাসা দূর হলো, শিরা-উপশিরা সিক্ত হলো এবং ইনশাআল্লাহ সওয়াব নির্ধারিত হলো।'
  }
];

export const DAILY_QUOTES_97: string[] = [
  'পবিত্র মাসকে স্বাগত জানাতে নিজেকে প্রস্তুত করুন, মনকে গুছিয়ে নিন', // Day 97 (exact ref 1)
  'রমজানের রহমতের বারিধারায় সিক্ত হতে আজ থেকেই হৃদয়কে পরিচ্ছন্ন করুন',
  'প্রতিটি দিন একেকটি সুযোগ—রমজানের আগে নিজের আমলগুলো সাজিয়ে নিন',
  'কুরআন তিলাওয়াতের অভ্যাস গড়ে তুলুন, সামনে আসছে কুরআন নাজিলের মাস',
  'অহংকার ও হিংসা দূর করে এক প্রশান্ত হৃদয় নিয়ে রমজানের পথে এগিয়ে চলুন',
  'নফল রোজা ও তাহাজ্জুদের মাধ্যমে আত্মাকে রমজানের জন্য প্রস্তুত করুন',
  'ক্ষমা প্রার্থনার শ্রেষ্ঠ সময় ঘনিয়ে আসছে, তওবার মাধ্যমে রবের কাছে ফিরে আসুন',
  'সময়ের অপচয় রোধ করে ইবাদতের সুন্দর রুটিন তৈরি করার এখনই সময়',
  'রমজান কেবল না খেয়ে থাকা নয়, বরং আত্মশুদ্ধির এক মহাসুযোগ',
  'দানের হাত প্রসারিত করুন, সাদাকাহ বিপদ দূর করে এবং অন্তর নরম করে',
  'জিহ্বাকে গীবত ও অপ্রয়োজনীয় কথা থেকে হেফাজত করার অনুশীলন শুরু করুন',
  'পাঁচ ওয়াক্ত নামাজ জামাতের সাথে আদায়ের মাধ্যমে রমজানের প্রস্তুতি নিন',
  'পরিবার ও প্রিয়জনদের সাথে মিলে দ্বীনি পরিবেশ গড়ে তুলুন',
  'রাতের নীরবতায় রবের দরবারে দুহাত তুলে নিজের আর্জি পেশ করুন',
  'প্রতিদিন অন্তত এক পৃষ্ঠা কুরআন অর্থসহ পড়ার অভ্যাস গড়ে তুলুন',
  'মানুষের প্রতি ক্ষমাশীল হোন, তবেই মহান আল্লাহ আপনার প্রতি দয়াশীল হবেন',
  'সকাল-সন্ধ্যার মাসনুন দোয়াগুলো নিয়মিত পাঠ করার অভ্যাস করুন',
  'রমজানের বরকতময় প্রহরগুলো যেন অবহেলায় হারিয়ে না যায়, আজই পরিকল্পনা করুন',
  'হালাল রিজিক ও পবিত্র জীবনযাপনের সংকল্পে নিজেকে বলীয়ান করুন',
  'অন্তরের অন্ধকার দূর করতে বেশি বেশি ইস্তিগফার ও দরুদ পাঠ করুন'
];

// Generate 97 distinct, carefully designed themes
const CATEGORY_LIST: ThemePreset['category'][] = [
  'mosque',
  'lantern',
  'arch',
  'crescent',
  'minimal',
  'royal'
];

const SCENE_ROTATION: SceneType[] = [
  'ref1_blue_dome_sunset',
  'mosque_silhouette_gold',
  'moroccan_arch_glow',
  'hanging_fanous_trio',
  'crescent_starry_dunes',
  'minimal_paper_cut',
  'emerald_royal_mihrab',
  'twilight_minaret_reflection',
  'quran_radiant_mandala',
  'candle_lantern_dates',
  'celestial_orbit_crescent',
  'ottoman_courtyard_arch'
];

const COLOR_PALETTES: Array<{
  namePrefixBn: string;
  sky: [string, string, string];
  accent: string;
  secondary: string;
  text: string;
  subText: string;
  num: string;
  dua: string;
  quote: string;
}> = [
  {
    namePrefixBn: 'গোধূলি নীল ও সুবর্ণ',
    sky: ['#051c2c', '#12496b', '#d97724'],
    accent: '#f59e0b',
    secondary: '#38bdf8',
    text: '#ffffff',
    subText: '#e2e8f0',
    num: '#ffffff',
    dua: '#fde68a',
    quote: '#ffffff'
  },
  {
    namePrefixBn: 'নূরানী ফিরোজা ও রৌপ্য',
    sky: ['#042f36', '#0e6973', '#67e8f9'],
    accent: '#22d3ee',
    secondary: '#a5f3fc',
    text: '#ffffff',
    subText: '#cffafe',
    num: '#ffffff',
    dua: '#a5f3fc',
    quote: '#f0fdfa'
  },
  {
    namePrefixBn: 'মরক্কান ভেলভেট ও রোজ গোল্ড',
    sky: ['#161124', '#261d3a', '#4a3254'],
    accent: '#f4b886',
    secondary: '#d8b4fe',
    text: '#faf5ff',
    subText: '#e9d5ff',
    num: '#fde68a',
    dua: '#f4b886',
    quote: '#f3e8ff'
  },
  {
    namePrefixBn: 'মধ্যরাতের নীল ও ফানুস',
    sky: ['#061621', '#0f3547', '#335c67'],
    accent: '#fbbf24',
    secondary: '#7dd3fc',
    text: '#ffffff',
    subText: '#bae6fd',
    num: '#fef08a',
    dua: '#fde047',
    quote: '#f8fafc'
  },
  {
    namePrefixBn: 'অ্যারাবিয়ান টিল ও সোনালী নূর',
    sky: ['#052430', '#0a3f52', '#125a70'],
    accent: '#facc15',
    secondary: '#fb923c',
    text: '#ffffff',
    subText: '#e0f2fe',
    num: '#ffffff',
    dua: '#fde047',
    quote: '#f1f5f9'
  },
  {
    namePrefixBn: 'শুভ্র পেপার-কাট ও নেভি ব্লু',
    sky: ['#f8fafc', '#f1f5f9', '#e2e8f0'],
    accent: '#0f3454',
    secondary: '#d97706',
    text: '#0f2942',
    subText: '#334155',
    num: '#0f2942',
    dua: '#b45309',
    quote: '#1e293b'
  },
  {
    namePrefixBn: 'কৃষ্ণ রজনী ও প্রদীপ্ত মোম',
    sky: ['#070a12', '#101929', '#1e293b'],
    accent: '#f97316',
    secondary: '#fbbf24',
    text: '#ffffff',
    subText: '#cbd5e1',
    num: '#ffedd5',
    dua: '#fdba74',
    quote: '#f8fafc'
  },
  {
    namePrefixBn: 'রাজকীয় পান্না ও খাঁটি সোনা',
    sky: ['#022c22', '#064e3b', '#065f46'],
    accent: '#fbbf24',
    secondary: '#34d399',
    text: '#ffffff',
    subText: '#d1fae5',
    num: '#fef3c7',
    dua: '#fde68a',
    quote: '#ecfdf5'
  },
  {
    namePrefixBn: 'মরুভূমির মাগরিব ও বেগুনি আকাশ',
    sky: ['#1e1b4b', '#4c1d95', '#c2410c'],
    accent: '#fbbf24',
    secondary: '#f472b6',
    text: '#ffffff',
    subText: '#e0e7ff',
    num: '#ffffff',
    dua: '#fde68a',
    quote: '#f5f3ff'
  },
  {
    namePrefixBn: 'মদিনা সবুজ ও শুভ্র মুক্তা',
    sky: ['#052e16', '#14532d', '#166534'],
    accent: '#fde047',
    secondary: '#86efac',
    text: '#ffffff',
    subText: '#dcfce7',
    num: '#ffffff',
    dua: '#fef08a',
    quote: '#f0fdf4'
  },
  {
    namePrefixBn: 'সুবহে সাদিক ও স্নিগ্ধ আকাশী',
    sky: ['#082f49', '#0369a1', '#7dd3fc'],
    accent: '#fde047',
    secondary: '#38bdf8',
    text: '#ffffff',
    subText: '#e0f2fe',
    num: '#ffffff',
    dua: '#fef9c3',
    quote: '#f0f9ff'
  },
  {
    namePrefixBn: 'অটোমান ব্রোঞ্জ ও ডার্ক কফি',
    sky: ['#1c1917', '#292524', '#44403c'],
    accent: '#f59e0b',
    secondary: '#d6d3d1',
    text: '#fafaf9',
    subText: '#e7e5e4',
    num: '#fde68a',
    dua: '#fcd34d',
    quote: '#f5f5f4'
  }
];

const SCENE_NAMES_BN: Record<SceneType, string> = {
  ref1_blue_dome_sunset: 'নীল গম্বুজ ও গোধূলি',
  ref_image: 'রেফারেন্স স্পেশাল থিম',
  mosque_silhouette_gold: 'সোনালী মিনার ও দিগন্ত',
  moroccan_arch_glow: 'মরক্কান মেহরাব ও নকশা',
  hanging_fanous_trio: 'ঝুলন্ত ঐতিহ্যবাহী ফানুস',
  crescent_starry_dunes: 'তারকাখচিত আকাশ ও বাঁকা চাঁদ',
  minimal_paper_cut: 'শুভ্র ইসলামিক পেপার আর্ট',
  emerald_royal_mihrab: 'রাজকীয় পান্না ও জ্যামিতিক আর্চ',
  twilight_minaret_reflection: 'গোধূলির আলোয় মসজিদের ছায়া',
  quran_radiant_mandala: 'নূরানী তাজবীদ ও মান্ডালা',
  candle_lantern_dates: 'ইফতারের খেজুর ও মোমের আলো',
  celestial_orbit_crescent: 'নক্ষত্রপুঞ্জ ও হেলাল',
  ottoman_courtyard_arch: 'অটোমান খিলান ও ঝাড়বাতি'
};

export const THEMES_97: ThemePreset[] = Array.from({ length: 97 }, (_, index) => {
  const id = index + 1;
  const day = 98 - id; // Day 97 down to Day 1

  // First 7 themes directly honor the 7 uploaded reference images!
  if (id === 1) {
    return {
      id: 1,
      day: 97,
      nameBn: '১. গোধূলির নীল গম্বুজ (১ম রেফারেন্স থিম)',
      category: 'reference',
      sceneType: 'ref1_blue_dome_sunset',
      skyColors: ['#041b2d', '#114b6e', '#df7626'],
      accentColor: '#f59e0b',
      secondaryAccent: '#38bdf8',
      textColor: '#ffffff',
      subTextColor: '#f1f5f9',
      numberColor: '#ffffff',
      duaColor: '#fde68a',
      quoteColor: '#ffffff',
      layoutAlign: 'center',
      headerX: 51,
      headerY: 25,
      numberX: 59,
      numberY: 47.5,
      duaX: 50,
      duaY: 69,
      quoteX: 50,
      quoteY: 92.5,
      patternSeed: 1
    };
  }

  if (id === 2) {
    return {
      id: 2,
      day: 96,
      nameBn: '২. নূরানী আল-কুরআন ও ফিরোজা আভা (রেফারেন্স ২)',
      category: 'reference',
      sceneType: 'ref_image',
      bgImageUrl: '/assets/aistudio/ae31d7e5aaa483c4cda89c53f62f9fd7_4e5056e4.jpg',
      skyColors: ['#042f36', '#0e6973', '#67e8f9'],
      accentColor: '#67e8f9',
      secondaryAccent: '#fde047',
      textColor: '#ffffff',
      subTextColor: '#cffafe',
      numberColor: '#ffffff',
      duaColor: '#fef08a',
      quoteColor: '#ecfeff',
      layoutAlign: 'center',
      headerX: 50,
      headerY: 23,
      numberX: 50,
      numberY: 46,
      duaX: 50,
      duaY: 69,
      quoteX: 50,
      quoteY: 92,
      patternSeed: 2
    };
  }

  if (id === 3) {
    return {
      id: 3,
      day: 95,
      nameBn: '৩. মরক্কান জানালা ও মেহরাব (রেফারেন্স ৩)',
      category: 'reference',
      sceneType: 'ref_image',
      bgImageUrl: '/assets/aistudio/e17640942b1b2b2c032f2f2a143fca93_a870084f.jpg',
      skyColors: ['#161124', '#261d3a', '#4a3254'],
      accentColor: '#f4b886',
      secondaryAccent: '#e9d5ff',
      textColor: '#ffffff',
      subTextColor: '#e9d5ff',
      numberColor: '#fde68a',
      duaColor: '#f4b886',
      quoteColor: '#f3e8ff',
      layoutAlign: 'left',
      headerX: 33,
      headerY: 25,
      numberX: 33,
      numberY: 47,
      duaX: 48,
      duaY: 69,
      quoteX: 45,
      quoteY: 92,
      patternSeed: 3
    };
  }

  if (id === 4) {
    return {
      id: 4,
      day: 94,
      nameBn: '৪. বাঁকা চাঁদ ও ছাদের ফানুস (রেফারেন্স ৪)',
      category: 'reference',
      sceneType: 'ref_image',
      bgImageUrl: '/assets/aistudio/f09f649f864afc278aee0c0e78b694c3_11a30445.jpg',
      skyColors: ['#061621', '#0f3547', '#335c67'],
      accentColor: '#fbbf24',
      secondaryAccent: '#7dd3fc',
      textColor: '#ffffff',
      subTextColor: '#bae6fd',
      numberColor: '#fef08a',
      duaColor: '#fde68a',
      quoteColor: '#ffffff',
      layoutAlign: 'left',
      headerX: 38,
      headerY: 25,
      numberX: 38,
      numberY: 47,
      duaX: 48,
      duaY: 69,
      quoteX: 48,
      quoteY: 92,
      patternSeed: 4
    };
  }

  if (id === 5) {
    return {
      id: 5,
      day: 93,
      nameBn: '৫. ফিরোজা জ্যামিতিক জোড়া ফানুস (রেফারেন্স ৫)',
      category: 'reference',
      sceneType: 'ref_image',
      bgImageUrl: '/assets/aistudio/12e3ca5c5fab55b0dbe03f71471ed59b_612107a1.jpg',
      skyColors: ['#052430', '#0a3f52', '#125a70'],
      accentColor: '#facc15',
      secondaryAccent: '#38bdf8',
      textColor: '#ffffff',
      subTextColor: '#bae6fd',
      numberColor: '#ffffff',
      duaColor: '#fde047',
      quoteColor: '#f0f9ff',
      layoutAlign: 'left',
      headerX: 38,
      headerY: 25,
      numberX: 38,
      numberY: 47,
      duaX: 48,
      duaY: 69,
      quoteX: 48,
      quoteY: 92,
      patternSeed: 5
    };
  }

  if (id === 6) {
    return {
      id: 6,
      day: 92,
      nameBn: '৬. শুভ্র কাগজের কাটিং ও নীল চাঁদ (রেফারেন্স ৬)',
      category: 'reference',
      sceneType: 'ref_image',
      bgImageUrl: '/assets/aistudio/360f62fe1f4768761491f7dca662a1f5_c4acaaaf.jpg',
      skyColors: ['#f8fafc', '#f1f5f9', '#e2e8f0'],
      accentColor: '#0f2942',
      secondaryAccent: '#d97706',
      textColor: '#0f2942',
      subTextColor: '#334155',
      numberColor: '#0f2942',
      duaColor: '#b45309',
      quoteColor: '#1e293b',
      layoutAlign: 'center',
      headerX: 60,
      headerY: 25,
      numberX: 60,
      numberY: 47,
      duaX: 56,
      duaY: 69,
      quoteX: 56,
      quoteY: 92,
      patternSeed: 6
    };
  }

  if (id === 7) {
    return {
      id: 7,
      day: 91,
      nameBn: '৭. ইফতারের খেজুর ও মোমের ফানুস (রেফারেন্স ৭)',
      category: 'reference',
      sceneType: 'ref_image',
      bgImageUrl: '/assets/aistudio/712fea8964b14995b0375943fabdeebf_9c87caf2.jpg',
      skyColors: ['#070a12', '#101929', '#1e293b'],
      accentColor: '#f97316',
      secondaryAccent: '#fbbf24',
      textColor: '#ffffff',
      subTextColor: '#e2e8f0',
      numberColor: '#ffedd5',
      duaColor: '#fdba74',
      quoteColor: '#ffffff',
      layoutAlign: 'left',
      headerX: 36,
      headerY: 25,
      numberX: 36,
      numberY: 47,
      duaX: 46,
      duaY: 69,
      quoteX: 46,
      quoteY: 92,
      patternSeed: 7
    };
  }

  // Themes 8 to 97: 90 distinct procedural + hybrid graphic designs
  const paletteIdx = (id - 8) % COLOR_PALETTES.length;
  const sceneIdx = (id - 8) % SCENE_ROTATION.length;
  const catIdx = (id - 8) % CATEGORY_LIST.length;

  const palette = COLOR_PALETTES[paletteIdx];
  const sceneType = SCENE_ROTATION[sceneIdx];
  const category = CATEGORY_LIST[catIdx];

  // Vary layout coordinates subtly based on scene composition so each card feels art-directed
  let headerX = 50;
  let numberX = 50;
  let duaX = 50;
  let quoteX = 50;
  let layoutAlign: 'center' | 'left' | 'right' = 'center';

  if (sceneType === 'ref1_blue_dome_sunset' || sceneType === 'twilight_minaret_reflection') {
    numberX = 58;
    headerX = 52;
  } else if (sceneType === 'candle_lantern_dates' || sceneType === 'hanging_fanous_trio') {
    numberX = 38;
    headerX = 38;
    duaX = 46;
    quoteX = 46;
    layoutAlign = 'left';
  } else if (sceneType === 'minimal_paper_cut') {
    numberX = 58;
    headerX = 58;
    duaX = 56;
    quoteX = 56;
  }

  const bnDigits = id.toString().replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);

  return {
    id,
    day,
    nameBn: `${bnDigits}. ${palette.namePrefixBn} — ${SCENE_NAMES_BN[sceneType]}`,
    category,
    sceneType,
    skyColors: palette.sky,
    accentColor: palette.accent,
    secondaryAccent: palette.secondary,
    textColor: palette.text,
    subTextColor: palette.subText,
    numberColor: palette.num,
    duaColor: palette.dua,
    quoteColor: palette.quote,
    layoutAlign,
    headerX,
    headerY: 25,
    numberX,
    numberY: 47,
    duaX,
    duaY: 69,
    quoteX,
    quoteY: 92,
    patternSeed: id * 17
  };
});

export function toBengaliNumber(n: number | string): string {
  return String(n).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);
}
