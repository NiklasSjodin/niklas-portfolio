import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getNavItems } from "@/lib/navigation";
import { getAllNotes } from "@/lib/notes";
import { siteName, siteTagline, siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Software Engineer`,
    template: `%s · ${siteName}`,
  },
  description: `The personal site of ${siteName}. ${siteTagline} Backend work in C# and .NET, side projects, notes, and the occasional ice cream.`,
  openGraph: {
    type: "website",
    siteName,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: `Notes · ${siteName}` }],
    },
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const notes = await getAllNotes();
  const navItems = getNavItems({ hasNotes: notes.length > 0 });

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:text-champagne focus:outline-2 focus:outline-offset-2 focus:outline-ring"
        >
          Skip to content
        </a>
        <Header navItems={navItems} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer hasNotes={notes.length > 0} />
      </body>
    </html>
  );
}
