export type Lang = "uz" | "en" | "ru";
export const langs: Lang[] = ["uz", "en", "ru"];

/* public/ ichidagi fayllarga qo'lda yo'l yozganda shu prefiks kerak (GitHub Pages basePath) */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export type Project = {
  id: string;
  name: string;
  year: string;
  stack: string[];
  url?: string;
  summary: Record<Lang, string>;
};

export type Cut = {
  id: string;
  /** Fayl public/videos/ ichida turadi */
  file: string;
  /** "16/9" yoki "9/16" */
  aspect: "16/9" | "9/16";
  title: Record<Lang, string>;
  kind: Record<Lang, string>;
  tools: string[];
};

export const site = {
  name: "Muhammadayyub Usmonaliyev",
  handle: "usmonaliyevm",
  github: "https://github.com/usmonaliyevm",
  telegram: "https://t.me/usmonaliyevm",
  email: "uzayyub2007@gmail.com",
  /* Footer uchun; statik sahifada new Date() ishlatib bo'lmaydi */
  year: 2026,
};

export const ui: Record<Lang, Record<string, string>> = {
  uz: {
    role1: "Dasturchi",
    role2: "Montajchi",
    tagline: "Ilova yozaman. Video montaj qilaman.",
    lede:
      "O'zbekistonlik Flutter dasturchi va montajchi. Ikki hunar, bitta odat: har bir kadrni o'z joyiga qo'yish.",
    scroll: "Pastga",
    work: "Kod",
    workLede: "Mobil ilovalar va pub.dev paketlari. Flutter, toza arxitektura, tezkor interfeys.",
    cuts: "Montaj",
    cutsLede: "Reels, reklama, YouTube. Ritm, rang, ovoz.",
    choose: "Ikki oyna",
    chooseLede: "Qaysi birini ko'rmoqchisiz? Oynani bosing.",
    openWindow: "Ochish",
    closeWindow: "Yopish",
    montajTeaser: "ta video",
    codingTeaser: "ta loyiha va paket",
    projects: "Loyihalar",
    packages: "pub.dev paketlari",
    pubScore: "pub ball",
    viewPackage: "pub.dev'da ko'rish",
    about: "Men haqimda",
    aboutBody:
      "2022-yildan beri mediadaman, ikki yildan ortiq vaqtdan buyon montaj bilan professional shug'ullanaman. Shu vaqt ichida 15 dan ortiq loyiha uchun video tayyorladim: target reklamalar, reels, brend roliklar va YouTube kontent. Kunduzi Flutter'da ilova yozaman, kechqurun Premiere va DaVinci'da video kesaman. Ikkalasida ham bitta narsa muhim: foydalanuvchi sezmaydigan, lekin his qiladigan tartib.",
    clients: "Men bilan ishlagan kompaniyalar",
    tools: "Asboblar",
    contact: "Aloqa",
    contactLede: "Loyiha bormi? Yozing, bir kun ichida javob beraman.",
    writeTelegram: "Telegram'da yozish",
    sendEmail: "Email yuborish",
    viewCode: "Kodni ko'rish",
    privateRepo: "Yopiq repo",
    play: "Ko'rish",
    missingVideo: "Video fayl hali qo'shilmagan",
    missingHint: "public/videos/ ichiga joylang",
    close: "Yopish",
    clipIntro: "Kirish",
    language: "Til",
    timeline: "Sahifa timeline'i",
    stack: "Texnologiyalar",
    meta: "Ma'lumot",
    footer: "Next.js bilan qurilgan. Timeline — sahifa xaritasi.",
  },
  en: {
    role1: "Developer",
    role2: "Video editor",
    tagline: "I build apps. I cut video.",
    lede:
      "Flutter developer and video editor from Uzbekistan. Two crafts, one habit: putting every frame where it belongs.",
    scroll: "Scroll",
    work: "Coding",
    workLede: "Mobile apps and pub.dev packages. Flutter, clean architecture, fast UI.",
    cuts: "Editing",
    cutsLede: "Reels, ads, YouTube. Rhythm, color, sound.",
    choose: "Two windows",
    chooseLede: "Which one do you want to see? Click a window.",
    openWindow: "Open",
    closeWindow: "Close",
    montajTeaser: "videos",
    codingTeaser: "projects and packages",
    projects: "Projects",
    packages: "pub.dev packages",
    pubScore: "pub points",
    viewPackage: "View on pub.dev",
    about: "About",
    aboutBody:
      "I have worked in media since 2022 and have been editing professionally for over two years. In that time I have delivered video for more than 15 projects: targeted ads, reels, brand spots and YouTube content. By day I write Flutter apps, by night I cut video in Premiere and DaVinci. Both come down to the same thing: order the user never notices but always feels.",
    clients: "Companies I have worked with",
    tools: "Tools",
    contact: "Contact",
    contactLede: "Have a project? Write me, I reply within a day.",
    writeTelegram: "Message on Telegram",
    sendEmail: "Send an email",
    viewCode: "View code",
    privateRepo: "Private repo",
    play: "Play",
    missingVideo: "Video file not added yet",
    missingHint: "drop it into public/videos/",
    close: "Close",
    clipIntro: "Intro",
    language: "Language",
    timeline: "Page timeline",
    stack: "Stack",
    meta: "Meta",
    footer: "Built with Next.js. The timeline is the page map.",
  },
  ru: {
    role1: "Разработчик",
    role2: "Монтажёр",
    tagline: "Пишу приложения. Монтирую видео.",
    lede:
      "Flutter-разработчик и видеомонтажёр из Узбекистана. Два ремесла, одна привычка: ставить каждый кадр на своё место.",
    scroll: "Вниз",
    work: "Код",
    workLede: "Мобильные приложения и пакеты pub.dev. Flutter, чистая архитектура, быстрый интерфейс.",
    cuts: "Монтаж",
    cutsLede: "Reels, реклама, YouTube. Ритм, цвет, звук.",
    choose: "Два окна",
    chooseLede: "Что хотите посмотреть? Нажмите на окно.",
    openWindow: "Открыть",
    closeWindow: "Закрыть",
    montajTeaser: "видео",
    codingTeaser: "проектов и пакетов",
    projects: "Проекты",
    packages: "Пакеты pub.dev",
    pubScore: "pub-баллов",
    viewPackage: "Открыть на pub.dev",
    about: "Обо мне",
    aboutBody:
      "Работаю в медиа с 2022 года, профессионально занимаюсь монтажом больше двух лет. За это время сделал видео более чем для 15 проектов: таргетированная реклама, reels, брендовые ролики и контент для YouTube. Днём пишу приложения на Flutter, вечером монтирую в Premiere и DaVinci. В обоих случаях важно одно: порядок, который пользователь не замечает, но чувствует.",
    clients: "Компании, с которыми я работал",
    tools: "Инструменты",
    contact: "Контакты",
    contactLede: "Есть проект? Напишите, отвечу в течение дня.",
    writeTelegram: "Написать в Telegram",
    sendEmail: "Написать на почту",
    viewCode: "Смотреть код",
    privateRepo: "Закрытый репозиторий",
    play: "Смотреть",
    missingVideo: "Видеофайл ещё не добавлен",
    missingHint: "положите его в public/videos/",
    close: "Закрыть",
    clipIntro: "Интро",
    language: "Язык",
    timeline: "Таймлайн страницы",
    stack: "Стек",
    meta: "Данные",
    footer: "Сделано на Next.js. Таймлайн — карта страницы.",
  },
};

export const projects: Project[] = [
  {
    id: "pinpic",
    name: "PinPic",
    year: "2025",
    stack: ["Flutter", "BLoC", "freezed", "Retrofit", "Hive", "Unsplash API"],
    summary: {
      uz: "Pinterest uslubidagi rasm ilovasi: masonry lenta, qidiruv, sevimlilar, galereyaga yuklab olish, 3 til. iOS va Android.",
      en: "Pinterest-style photo app: masonry feed, search, favorites, save to gallery, 3 languages. iOS and Android.",
      ru: "Фотоприложение в стиле Pinterest: masonry-лента, поиск, избранное, сохранение в галерею, 3 языка. iOS и Android.",
    },
  },
  {
    id: "unsplash_lite",
    name: "Unsplash Lite",
    year: "2023",
    stack: ["Flutter", "Dart", "REST"],
    url: "https://github.com/usmonaliyevm/unsplash_lite",
    summary: {
      uz: "Shu g'oyaning birinchi, yengil versiyasi. Keyinchalik PinPic shundan o'sib chiqdi.",
      en: "First, lightweight take on the same idea. PinPic grew out of it.",
      ru: "Первая, лёгкая версия той же идеи. Из неё вырос PinPic.",
    },
  },
];

export type Package = {
  name: string;
  version: string;
  score: string;
  url: string;
  repo: string;
  summary: Record<Lang, string>;
};

export const packages: Package[] = [
  {
    name: "mu_search_table_dropdown",
    version: "0.0.3",
    score: "150/160",
    url: "https://pub.dev/packages/mu_search_table_dropdown",
    repo: "https://github.com/usmonaliyevm/mu_search_table_dropdown",
    summary: {
      uz: "Jadval ichida ishlaydigan qidiruvli dropdown. BLoC bilan boshqariladi, katta ro'yxatlarda tez filtrlaydi.",
      en: "Searchable dropdown for tables, driven by BLoC. Filters large datasets fast.",
      ru: "Выпадающий список с поиском для таблиц на BLoC. Быстро фильтрует большие наборы данных.",
    },
  },
  {
    name: "mu_radio_group",
    version: "0.0.3",
    score: "115/160",
    url: "https://pub.dev/packages/mu_radio_group",
    repo: "https://github.com/usmonaliyevm/mu_rediogroup",
    summary: {
      uz: "Sodda va moslashuvchan radio tugmalar guruhi. Bitta widget, istalgan dizayn.",
      en: "Simple, flexible radio button group. One widget, any design.",
      ru: "Простая и гибкая группа радиокнопок. Один виджет, любой дизайн.",
    },
  },
];

export const cuts: Cut[] = [
  // Asl fayllar video-src/ papkasida. Mos keladigan nomlar:
  // cut-01 = 1.mp4, cut-02 = 2.mp4, cut-03 = Aleksey, cut-04 = Soyubxon aka,
  // cut-05 = Zarina opa, cut-06 = charq.1. Sarlavha va asboblarni o'zingiz to'g'rilang.
  {
    id: "cut-01",
    file: "cut-01.mp4",
    aspect: "9/16",
    title: { uz: "Target 01", en: "Target 01", ru: "Таргет 01" },
    kind: { uz: "Target reklama", en: "Targeted ad", ru: "Таргет-реклама" },
    tools: [],
  },
  {
    id: "cut-02",
    file: "cut-02.mp4",
    aspect: "9/16",
    title: { uz: "Target 02", en: "Target 02", ru: "Таргет 02" },
    kind: { uz: "Target reklama", en: "Targeted ad", ru: "Таргет-реклама" },
    tools: [],
  },
  {
    id: "cut-03",
    file: "cut-03.mp4",
    aspect: "9/16",
    title: { uz: "Target 03", en: "Target 03", ru: "Таргет 03" },
    kind: { uz: "Target reklama", en: "Targeted ad", ru: "Таргет-реклама" },
    tools: [],
  },
  {
    id: "cut-04",
    file: "cut-04.mp4",
    aspect: "9/16",
    title: { uz: "Target 04", en: "Target 04", ru: "Таргет 04" },
    kind: { uz: "Target reklama", en: "Targeted ad", ru: "Таргет-реклама" },
    tools: [],
  },
  {
    id: "cut-05",
    file: "cut-05.mp4",
    aspect: "9/16",
    title: { uz: "Target 05 (kreativ)", en: "Target 05 (creative)", ru: "Таргет 05 (креатив)" },
    kind: { uz: "Target reklama", en: "Targeted ad", ru: "Таргет-реклама" },
    tools: [],
  },
  {
    id: "cut-06",
    file: "cut-06.mp4",
    aspect: "9/16",
    title: { uz: "Target 06", en: "Target 06", ru: "Таргет 06" },
    kind: { uz: "Target reklama", en: "Targeted ad", ru: "Таргет-реклама" },
    tools: [],
  },
];

/* "Men haqimda" bo'limidagi raqamlar */
export const aboutFacts: { value: string; label: Record<Lang, string> }[] = [
  { value: "2022", label: { uz: "yildan beri mediada", en: "in media since", ru: "в медиа с" } },
  { value: "2+", label: { uz: "yil professional montaj", en: "years of professional editing", ru: "года профессионального монтажа" } },
  { value: "15+", label: { uz: "loyiha uchun video", en: "projects delivered", ru: "проектов с видео" } },
];

/* Mijoz logotiplari. Faylni public/logos/ ga qo'ying (SVG yoki shaffof PNG, bo'yi ~80px),
   keyin shu ro'yxatga qo'shing. Ro'yxat bo'sh bo'lsa bo'lim ko'rinmaydi.
   Misol: { name: "Kompaniya nomi", logo: "kompaniya.svg", url: "https://..." } */
export const clients: { name: string; logo: string; url?: string }[] = [];

export const tools = {
  code: ["Flutter", "Dart", "BLoC", "Firebase", "REST", "Git"],
  cut: ["Premiere Pro", "After Effects", "DaVinci Resolve", "CapCut"],
};
