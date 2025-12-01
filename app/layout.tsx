import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../contexts/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Superwow Tech | Web & AI Solutions",
    template: "%s | Superwow Tech",
  },
  description: "Superwow Tech builds high-performance web applications and AI solutions. We turn complex tech challenges into seamless digital experiences.",
  keywords: ["Web Development", "AI Solutions", "Next.js", "TypeScript", "React", "Software Engineering", "Vilnius", "Tech Agency"],
  authors: [{ name: "Superwow Tech Team" }],
  creator: "Superwow Tech",
  publisher: "Superwow Tech",
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://superwow.tech",
    title: "Superwow Tech | Web & AI Solutions",
    description: "High-performance web applications and AI solutions. We turn complex tech challenges into seamless digital experiences.",
    siteName: "Superwow Tech",
    images: [
      {
        url: "/og-image.jpg", // Ensure this image exists or is created
        width: 1200,
        height: 630,
        alt: "Superwow Tech - Web & AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Superwow Tech | Web & AI Solutions",
    description: "High-performance web applications and AI solutions.",
    images: ["/og-image.jpg"],
    creator: "@superwowtech", // Placeholder, update if known
  },
  icons: {
    icon: "/icon.ico",
    shortcut: "/icon.ico",
    apple: "/apple-icon.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Superwow Tech",
  "image": "https://superwow.tech/og-image.jpg",
  "url": "https://superwow.tech",
  "telephone": "", // Add if available
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Vilnius",
    "addressCountry": "LT"
  },
  "priceRange": "$$$",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
