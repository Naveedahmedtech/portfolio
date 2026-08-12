import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://naveedahmed.ai"),
  title: "Naveed Ahmed — Backend / Product Engineer",
  description: "Backend / Product Engineer building production APIs, SDKs, integrations, developer platforms, and AI-enabled backend systems with Node.js, TypeScript, NestJS, and PostgreSQL.",
  applicationName: "Naveed Ahmed Portfolio",
  authors: [{ name: "Naveed Ahmed" }],
  creator: "Naveed Ahmed",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Naveed Ahmed",
    locale: "en_US",
    title: "Naveed Ahmed — Backend / Product Engineer",
    description: "Backend systems, SDKs, integrations, developer platforms, and AI-enabled products.",
    url: "https://naveedahmed.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naveed Ahmed — Backend / Product Engineer",
    description: "Backend systems, SDKs, integrations, developer platforms, and AI-enabled products.",
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
