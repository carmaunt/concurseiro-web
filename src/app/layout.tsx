import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { WebVitals } from "@/components/WebVitals";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000"),
  title: {
    default: "O Concurseiro",
    template: "%s | O Concurseiro",
  },
  description: "Portal do estudante do O Concurseiro.",
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
  return (
    <html lang="pt-br">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "O Concurseiro",
              url: process.env.NEXT_PUBLIC_WEB_URL || "http://localhost:3000",
            }).replace(/</g, "\\u003c"),
          }}
        />
        <WebVitals />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
