import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, JetBrains_Mono, Geist } from "next/font/google";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Zaid Malick — AI Engineer",
    template: "%s — Zaid Malick",
  },
  description:
    "AI Engineer building agentic systems — agent orchestration, RAG, and eval-first development. Ask my portfolio chatbot anything about my work.",
  keywords: [
    "AI Engineer",
    "Forward Deployed Engineer",
    "Applied AI",
    "agent orchestration",
    "RAG",
    "LLM evals",
    "Zaid Malick",
  ],
  authors: [{ name: "Zaid Malick" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Zaid Malick — AI Engineer",
    description:
      "Agentic systems, RAG, and eval-first development. Ask my portfolio chatbot anything about my work.",
    siteName: "Zaid Malick",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zaid Malick — AI Engineer",
    description:
      "Agentic systems, RAG, and eval-first development. Ask my portfolio chatbot anything about my work.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${jetbrains.variable} ${geist.variable} h-full antialiased`}
    >
      <body className="grain min-h-full flex flex-col bg-ink text-fg">
        {/* Scroll reveals start hidden and are un-hidden by JS (useInView).
            Without JS, show everything so the page is never blank. */}
        <noscript>
          <style>{`.reveal-on-scroll{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
