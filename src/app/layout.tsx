import type { Metadata } from "next";
import "./globals.scss";
import LayoutWrapper from "@/components/LayoutWrapper";

const siteUrl = "https://lunasat.com";
const siteTitle = "Lunasat | Mission-Critical Systems Integrator";
const siteDescription =
  "Lunasat engineers, integrates, and supports secure communications, telecom, security, and airspace systems across the Middle East and North Africa.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Lunasat",
  },
  description: siteDescription,
  applicationName: "Lunasat",
  authors: [{ name: "Lunasat", url: siteUrl }],
  creator: "Lunasat",
  publisher: "Lunasat",
  keywords: [
    "Lunasat",
    "systems integrator MENA",
    "secured communications",
    "telecommunications infrastructure",
    "security and surveillance",
    "air traffic control",
    "mission-critical systems",
    "Middle East",
    "North Africa",
  ],
  alternates: { canonical: "/" },
  category: "technology",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Lunasat",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/lunasat-icon.svg",
        width: 512,
        height: 512,
        alt: "Lunasat",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
    images: ["/lunasat-icon.svg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { url: "/icons/lunasat-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
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
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Lunasat",
  url: siteUrl,
  logo: `${siteUrl}/lunasat-icon.svg`,
  description: siteDescription,
  areaServed: [
    { "@type": "Place", name: "Middle East" },
    { "@type": "Place", name: "North Africa" },
  ],
  knowsAbout: [
    "Secured communications",
    "Telecommunications infrastructure",
    "Security and surveillance",
    "Airspace and control systems",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&family=Noto+Sans:wght@300..700&display=swap"
          rel="stylesheet"
        />
        <meta name="geo.region" content="ME" />
        <meta name="geo.placename" content="Middle East and North Africa" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
