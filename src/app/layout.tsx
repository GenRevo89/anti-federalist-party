import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "The Anti-Federalist Party | Access. Agency. Accountability.",
  description:
    "A new political movement born in New Mexico, restoring the founders' vision of decentralized power. We fight for the people's access, agency, and accountability over government, industry, and automation.",
  keywords: [
    "Anti-Federalist Party",
    "political party",
    "New Mexico politics",
    "decentralization",
    "access",
    "agency",
    "accountability",
    "third party",
    "new political movement",
  ],
  openGraph: {
    title: "The Anti-Federalist Party",
    description:
      "Access. Agency. Accountability. A new political movement restoring the founders' vision.",
    type: "website",
    locale: "en_US",
    siteName: "The Anti-Federalist Party",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Anti-Federalist Party",
    description:
      "Access. Agency. Accountability. A new political movement restoring the founders' vision.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} ${jetbrains.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
