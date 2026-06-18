import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";

// Brand typeface — Whyte (provided in public/fonts). Body + headlines.
const whyte = localFont({
  variable: "--font-whyte",
  display: "swap",
  src: [
    { path: "../public/fonts/Whyte-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/Whyte-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/Whyte-Bold.ttf", weight: "700", style: "normal" },
  ],
});
// Geist Mono retained for data, code, tickers.
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Silvana — the agent interaction layer for tokenized assets",
  description:
    "Deploy agents that trade, settle, and prove on Canton. Private execution, atomic settlement, full asset control — from your first transaction to your millionth.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${whyte.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* set the theme class before paint to avoid a flash of the wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      {/* suppressHydrationWarning: browser extensions (e.g. ColorZilla adds
          `cz-shortcut-listen`) mutate <body> before React hydrates. */}
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <div className="ambient" aria-hidden />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
