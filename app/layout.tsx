import type { Metadata } from "next";
import { Inter, Poppins, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/Analytics";
import { BookingWidget } from "@/components/ui/BookingWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DimDev - Portfolio & Services POC",
  description: "Je transforme vos idées en prototypes fonctionnels — en quelques jours. POC Express, MVP rapide ou développement complet.",
  keywords: ["POC", "MVP", "Next.js", "Python", "Django", "FastAPI", "développement web", "freelance"],
  authors: [{ name: "Rassoul Dim" }],
  openGraph: {
    title: "DimDev - Portfolio & Services POC",
    description: "Je transforme vos idées en prototypes fonctionnels — en quelques jours.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "DimDev - Portfolio & Services POC",
    description: "Je transforme vos idées en prototypes fonctionnels — en quelques jours.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable} ${robotoMono.variable}`}>
      <body className="font-sans antialiased">
        <Analytics />
        <Header />
        <main>{children}</main>
        <Footer />
        <BookingWidget />
      </body>
    </html>
  );
}
