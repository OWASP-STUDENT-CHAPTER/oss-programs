import "./globals.css"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Bodoni_Moda, Inter } from "next/font/google"
import type { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL("https://oss.owasptiet.com"), // Change if deployed URL is different

  title: {
    default: "OSS Opps",
    template: "%s | OSS Opps",
  },

  description:
    "Curated directory of paid open source programs, grants, and fellowships.",

  keywords: [
    "open source",
    "GSoC",
    "open source grants",
    "OSS fellowships",
    "developer programs",
  ],

  authors: [{ name: "OWASP TIET Team" }],
  creator: "OWASP TIET",

  openGraph: {
    title: "OSS Opps",
    description:
      "Launch your open source journey. Explore paid programs and grants.",
    url: "/",
    siteName: "OSS Opps",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "OSS Opps",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "OSS Opps",
    description:
      "Launch your open source journey. Explore paid programs and grants.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
}

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  style: ["normal", "italic"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-background font-sans antialiased text-foreground">
        <Header />
        <main className="flex-1 min-h-[calc(100vh-4rem-6rem)]">
          {children}
        </main>
        <footer className="py-12 border-t bg-muted/30">
          <div className="container flex flex-col items-center justify-between gap-8 md:flex-row max-w-7xl mx-auto px-6 text-center md:text-left">
            <div className="flex flex-col md:items-start items-center gap-2 text-center md:text-left">
              <p className="text-sm font-bold tracking-tight">
                OSS Opportunities
              </p>
              <div className="flex flex-col gap-1">
                <p className="text-xs text-muted-foreground max-w-[250px] leading-relaxed">
                  Built by the community. Data maintained via YAML and GitHub.
                </p>
                <p className="text-[10px] text-muted-foreground/60 font-medium italic">
                  Made by OWASP TIET team :)
                </p>
              </div>
            </div>
            <div className="flex gap-8 text-xs text-muted-foreground uppercase tracking-widest font-bold">
              <Link
                href="/about"
                className="hover:text-primary transition-colors"
              >
                About
              </Link>
              <Link
                href="https://github.com"
                className="hover:text-primary transition-colors"
              >
                GitHub
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}