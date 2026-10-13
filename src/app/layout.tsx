import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans, JetBrains_Mono, Oswald } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/components/LangProvider";
import { ModeProvider } from "@/components/ModeProvider";
import { Effects } from "@/components/Effects";
import { site } from "@/content/site";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  axes: ["wdth", "opsz"],
});
const plex = IBM_Plex_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-plex",
});
/* Bricolage'da kirill yo'q: ruscha sarlavhalar uchun tor Oswald zaxira shrift */
const oswald = Oswald({
  subsets: ["cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-display-cyr",
});
const jet = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-jet",
});

/* Sayt origin'i build vaqtida env'dan keladi (GitHub Actions); lokalda localhost.
   basePath'ni Next o'zi qo'shadi, shuning uchun bu yerda faqat domen. */
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const title = `${site.name} — Flutter developer & video editor`;
const description =
  "Portfolio of Muhammadayyub Usmonaliyev: Flutter mobile apps and video editing. Reels, ads, YouTube.";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

/* JS bor-yo'qligini CSS'ga aytadi: html.js bo'lmasa reveal elementlar yashirilmaydi */
const jsFlag = "document.documentElement.classList.add('js')";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${plex.variable} ${oswald.variable} ${jet.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body>
        <LangProvider>
          <ModeProvider>
            {children}
            <Effects />
          </ModeProvider>
        </LangProvider>
      </body>
    </html>
  );
}
