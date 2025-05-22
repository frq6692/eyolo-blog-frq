import "@/styles/styles.scss";

import { fontLexendDeca, fontPrata } from "@/components/essential/Fonts";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import config from "@/config/site.config.json";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export const metadata: Metadata = {
  title: config.metaData.title,
  description: config.metaData.description,
  // url: config.siteURL,
  // siteName: config.metaData.title,
  // type: "website",

  icons: {
    icon: "/images/favicon.png",
  },

  alternates: {
    canonical: "/",
  },
  openGraph: {
    images: "/images/ogimage.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontPrata.variable} ${fontLexendDeca.variable}`}
    >
      <body className="font-secondary">
        <NextTopLoader
          color="#ff4848"
          shadow="none"
          showSpinner={false}
          zIndex={9999999}
          height={2}
        />
        <main className="flex flex-col min-h-screen">
          <Header />

          <NuqsAdapter>
            <section>{children}</section>
          </NuqsAdapter>

          <Footer />
        </main>
      </body>
    </html>
  );
}
