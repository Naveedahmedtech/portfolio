import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://naveedahmed.ai"),
  title: "Naveed Ahmed | Backend Engineer — Node.js, TypeScript, NestJS & PostgreSQL",
  description: "Naveed Ahmed is a Backend / Product Engineer building production Node.js and TypeScript APIs, NestJS services, PostgreSQL systems, JavaScript SDKs, integrations, and AI backend products.",
  applicationName: "Naveed Ahmed Portfolio",
  authors: [{ name: "Naveed Ahmed" }],
  creator: "Naveed Ahmed",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Naveed Ahmed",
    locale: "en_US",
    title: "Naveed Ahmed | Backend Engineer — Node.js, TypeScript, NestJS & PostgreSQL",
    description: "Production Node.js APIs, NestJS services, PostgreSQL systems, JavaScript SDKs, integrations, and AI backend products.",
    url: "https://naveedahmed.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naveed Ahmed | Backend Engineer — Node.js, TypeScript, NestJS & PostgreSQL",
    description: "Production Node.js APIs, NestJS services, PostgreSQL systems, JavaScript SDKs, integrations, and AI backend products.",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Naveed Ahmed",
    url: "https://naveedahmed.ai",
    jobTitle: "Backend / Product Engineer",
    sameAs: [
      "https://github.com/Naveedahmedtech",
      "https://www.linkedin.com/in/naveed-dev",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Islamabad",
      addressCountry: "Pakistan",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
