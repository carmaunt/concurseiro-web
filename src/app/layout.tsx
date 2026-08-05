import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import { WebVitals } from "@/components/WebVitals";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000"),
  title: {
    default: "O Concurseiro",
    template: "%s | O Concurseiro",
  },
  description:
    "Filtre questões de concursos e acompanhe acertos, erros e evolução por disciplina para estudar com mais direção.",
  applicationName: "O Concurseiro",
  authors: [{ name: "O Concurseiro" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "O Concurseiro",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const baseUrl = (process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000").replace(/\/$/, "");
  const organizationId = `${baseUrl}/#organization`;
  const websiteId = `${baseUrl}/#website`;

  return (
    <html lang="pt-br">
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-F96CSLPLPV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F96CSLPLPV');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": organizationId,
                  name: "O Concurseiro",
                  url: baseUrl,
                  logo: {
                    "@type": "ImageObject",
                    url: `${baseUrl}/icon.png`,
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": websiteId,
                  name: "O Concurseiro",
                  alternateName: "Portal O Concurseiro",
                  url: baseUrl,
                  inLanguage: "pt-BR",
                  publisher: { "@id": organizationId },
                },
              ],
            }).replace(/</g, "\\u003c"),
          }}
        />
        <WebVitals />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
