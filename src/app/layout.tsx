import type { Metadata } from "next";
import "./globals.scss";
import LayoutWrapper from "@/components/LayoutWrapper";

const menaCountries = [
  "UAE", "United Arab Emirates", "Saudi Arabia", "KSA", "Qatar", "Kuwait",
  "Bahrain", "Oman", "Jordan", "Lebanon", "Egypt", "Iraq", "Morocco",
  "Algeria", "Tunisia", "Libya", "Yemen", "Palestine", "Middle East",
  "North Africa", "MENA", "Gulf", "GCC",
];

const partnerBrands = [
  "Genasys", "Genasys MENA", "Genasys Middle East",
  "Rohde & Schwarz", "Rohde Schwarz", "R&S", "Rohde & Schwarz Middle East", "Rohde & Schwarz MENA",
  "Cisco", "Cisco Systems", "Cisco Middle East", "Cisco MENA", "Cisco partner MENA",
  "Nokia", "Nokia Networks", "Nokia Middle East", "Nokia MENA",
  "Microchip", "Microchip Technology", "Microchip Middle East", "Microchip MENA",
];

const partnerKeywords = [
  ...partnerBrands,
  ...menaCountries.flatMap((c) =>
    ["Genasys", "Rohde & Schwarz", "Cisco", "Nokia", "Microchip"].map(
      (b) => `${b} ${c}`
    )
  ),
  "Genasys distributor MENA",
  "Rohde & Schwarz distributor Middle East",
  "Cisco systems integrator MENA",
  "Nokia telecom partner Middle East",
  "Microchip authorized partner MENA",
  "secured communications MENA",
  "tactical radios Middle East",
  "VSAT Middle East",
  "microwave links MENA",
  "RF systems Gulf",
  "air traffic control Middle East",
];

export const metadata: Metadata = {
  metadataBase: new URL('https://lunasat.com'),
  title: "Lunasat | Genasys, Rohde & Schwarz, Cisco, Nokia & Microchip Partner in MENA",
  description: "Lunasat is a trusted systems integrator and authorized partner for Genasys, Rohde & Schwarz, Cisco, Nokia and Microchip across the MENA region — delivering secured communications, telecommunications, security infrastructure and airspace & control solutions.",
  keywords: [
    "satellite communications",
    "secure networks",
    "telecommunications",
    "tactical systems",
    "security infrastructure",
    "Lunasat",
    "Lunasat MENA",
    "Lunasat Middle East",
    "systems integrator MENA",
    ...partnerKeywords,
  ],
  authors: [{ name: "Lunasat" }],
  openGraph: {
    title: "Lunasat | Genasys, Rohde & Schwarz, Cisco, Nokia & Microchip Partner in MENA",
    description: "Authorized partner and systems integrator for Genasys, Rohde & Schwarz, Cisco, Nokia and Microchip in the Middle East and North Africa. Secured communications, telecommunications and mission-critical infrastructure.",
    url: "https://lunasat.com",
    siteName: "Lunasat",
    images: [
      {
        url: "/lunasat-icon.svg",
        width: 512,
        height: 512,
        alt: "Lunasat Logo",
      },
    ],
    locale: "en_US",
    alternateLocale: ["ar_AE", "ar_SA", "ar_EG", "fr_MA"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lunasat | Genasys, Rohde & Schwarz, Cisco, Nokia & Microchip Partner in MENA",
    description: "Authorized partner and systems integrator for Genasys, Rohde & Schwarz, Cisco, Nokia and Microchip across the MENA region.",
    images: ["/lunasat-icon.svg"],
  },
  icons: {
    icon: [
      { url: "/lunasat-icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/lunasat-icon.svg", type: "image/svg+xml" },
    ],
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
  verification: {
    // Add your verification codes when ready
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Lunasat",
  url: "https://lunasat.com",
  logo: "https://lunasat.com/lunasat-icon.svg",
  description:
    "Lunasat is a systems integrator and authorized partner for Genasys, Rohde & Schwarz, Cisco, Nokia and Microchip across the MENA region, delivering secured communications, telecommunications, security infrastructure and airspace & control solutions.",
  areaServed: [
    { "@type": "Place", name: "Middle East" },
    { "@type": "Place", name: "North Africa" },
    { "@type": "Place", name: "MENA" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "Qatar" },
    { "@type": "Country", name: "Kuwait" },
    { "@type": "Country", name: "Bahrain" },
    { "@type": "Country", name: "Oman" },
    { "@type": "Country", name: "Jordan" },
    { "@type": "Country", name: "Lebanon" },
    { "@type": "Country", name: "Egypt" },
    { "@type": "Country", name: "Iraq" },
    { "@type": "Country", name: "Morocco" },
    { "@type": "Country", name: "Algeria" },
    { "@type": "Country", name: "Tunisia" },
  ],
  brand: [
    { "@type": "Brand", name: "Genasys" },
    { "@type": "Brand", name: "Rohde & Schwarz" },
    { "@type": "Brand", name: "Cisco" },
    { "@type": "Brand", name: "Nokia" },
    { "@type": "Brand", name: "Microchip" },
  ],
  knowsAbout: [
    "Genasys",
    "Rohde & Schwarz",
    "Cisco",
    "Nokia",
    "Microchip",
    "Secured Communications",
    "Tactical Radios",
    "VSAT",
    "Microwave Links",
    "Air Traffic Control",
    "RF Monitoring",
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
        <link href="https://fonts.googleapis.com/css2?family=Funnel+Display:wght@300..800&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <meta name="geo.region" content="AE;SA;QA;KW;BH;OM;JO;LB;EG;IQ;MA;DZ;TN;LY;YE" />
        <meta name="geo.placename" content="Middle East and North Africa" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
