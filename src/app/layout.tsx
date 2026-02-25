import "./globals.css"
import Script from "next/script"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Bodoni_Moda, Inter } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { FloatingSavedButton } from "@/components/floating-saved-button";
import type { Metadata } from "next"

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  style: ["normal", "italic"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "OWASP | OSS Opportunities",
    template: "%s | Open Source Programs Hub",
  },
  description:
    "Explore a curated directory of beginner-friendly open-source programs, internships, and contribution opportunities.",
  keywords: [
    "owasp tiet",
    "open source programs",
    "how to contribute to open source",
    "internships",
    "GSoC alternatives",
    "OSS opportunities",
    "contribute to open source projects",
    "student developer programs",
  ],
  metadataBase: new URL("https://oss.owasptiet.com/"),
  openGraph: {
    title: "Explore Open Source Programs",
    description:
      "Browse active open source programs and opportunities to kickstart your journey into open source development.",
    url: "https://oss.owasptiet.com/",
    siteName: "OSS Opportunities",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Open Source Programs Hub",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OSS Opportunities",
    description:
      "Explore a curated directory of beginner-friendly open-source programs, internships, and contribution opportunities.",
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bodoni.variable} ${inter.variable}`}
    >
      <head>
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Open Source Programs Hub",
              url: "https://oss.owasptiet.com",
              description:
                "Discover beginner-friendly open source programs and contribution opportunities.",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://oss.owasptiet.com/programs?search={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>

      <body className="min-h-screen bg-background font-sans antialiased text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          <FloatingSavedButton />

          <Header />

          <main className="flex-1 min-h-[calc(100vh-4rem-6rem)]">
            {children}
          </main>

          <footer className="py-12 border-t bg-muted/30">
            <div className="container flex flex-col items-center justify-between gap-8 md:flex-row max-w-7xl mx-auto px-6 text-center md:text-left">
              <div className="flex flex-col md:items-start items-center gap-2">
                <p className="text-sm font-bold tracking-tight">
                  OSS Opportunities
                </p>
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-muted-foreground max-w-[250px] leading-relaxed">
                    Built by the community. Data maintained via YAML and GitHub.
                  </p>
                  <p className="text-[10px] text-muted-foreground/60 font-medium italic">
                    Made by{" "}
                    <Link
                      href="https://www.owasptiet.com/"
                      className="hover:text-primary transition-colors"
                    >
                      OWASP TIET
                    </Link>{" "}
                    team :)
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
                  href="https://github.com/OWASP-STUDENT-CHAPTER/oss-programs"
                  className="hover:text-primary transition-colors"
                >
                  GitHub
                </Link>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}