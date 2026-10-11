export type Lang = "uz" | "en";

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
  name: "Ayyub Usmonaliyev",
  handle: "usmonaliyevm",
  github: "https://github.com/usmonaliyevm",
  // Shu ikkitasini o'zingizniki bilan almashtiring
  telegram: "https://t.me/usmonaliyevm",
  email: "hello@example.com",
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
    workLede: "Mobil ilovalar. Flutter, toza arxitektura, tezkor interfeys.",
    cuts: "Montaj",
    cutsLede: "Reels, reklama, YouTube. Ritm, rang, ovoz.",
    about: "Men haqimda",
    aboutBody:
      "Kunduzi Flutter'da ilova yozaman, kechqurun Premiere va DaVinci'da video kesaman. Ikkalasida ham bitta narsa muhim: foydalanuvchi sezmaydigan, lekin his qiladigan tartib. Hozir freelance loyihalar va o'z ilovalarim ustida ishlayman.",
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
    footer: "Next.js bilan qurilgan. Timeline — sahifa xaritasi.",
  },
  en: {
    role1: "Developer",
    role2: "Video editor",
    tagline: "I build apps. I cut video.",
    lede:
      "Flutter developer and video editor from Uzbekistan. Two crafts, one habit: putting every frame where it belongs.",
    scroll: "Scroll",
    work: "Code",
    workLede: "Mobile apps. Flutter, clean architecture, fast UI.",
    cuts: "Cuts",
    cutsLede: "Reels, ads, YouTube. Rhythm, color, sound.",
    about: "About",
    aboutBody:
      "By day I write Flutter apps, by night I cut video in Premiere and DaVinci. Both come down to the same thing: order the user never notices but always feels. Currently working on freelance projects and my own apps.",
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
    footer: "Built with Next.js. The timeline is the page map.",
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
    },
  },
];

export const cuts: Cut[] = [
  {
    id: "cut-01",
    file: "cut-01.mp4",
    aspect: "9/16",
    title: { uz: "Reel 01", en: "Reel 01" },
    kind: { uz: "Instagram reels", en: "Instagram reel" },
    tools: ["Premiere Pro", "After Effects"],
  },
  {
    id: "cut-02",
    file: "cut-02.mp4",
    aspect: "16/9",
    title: { uz: "Reklama roligi", en: "Commercial" },
    kind: { uz: "Reklama", en: "Ad spot" },
    tools: ["DaVinci Resolve"],
  },
  {
    id: "cut-03",
    file: "cut-03.mp4",
    aspect: "9/16",
    title: { uz: "Reel 02", en: "Reel 02" },
    kind: { uz: "Instagram reels", en: "Instagram reel" },
    tools: ["Premiere Pro"],
  },
  {
    id: "cut-04",
    file: "cut-04.mp4",
    aspect: "16/9",
    title: { uz: "YouTube montaj", en: "YouTube edit" },
    kind: { uz: "YouTube", en: "YouTube" },
    tools: ["Premiere Pro", "After Effects"],
  },
];

export const tools = {
  code: ["Flutter", "Dart", "BLoC", "Firebase", "REST", "Git"],
  cut: ["Premiere Pro", "After Effects", "DaVinci Resolve", "CapCut"],
};
