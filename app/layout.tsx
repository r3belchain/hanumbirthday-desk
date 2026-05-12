import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

// Deklarasi Font (Jangan sampai ketinggalan)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  preload: true, // Tetap true karena ini font utama (sans)
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  preload: false, // Ubah ke false jika Playfair hanya dipakai di section bawah
});

export const metadata: Metadata = {
  title: "Happy Birthday, Hanum! 🎂",
  description: "Karya sederhana ini dibuat khusus untuk kamu",
  icons: {
    icon: "https://fav.farm/🎂",
    apple: "https://fav.farm/🎂",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f1eb",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} bg-background`}
    >
      <body className="font-sans antialiased relative min-h-screen">
        {/* Grain effect tetap di paling atas */}
        <div className="bg-grain fixed inset-0 z-[9999] pointer-events-none" />

        {/* 
           WRAPPER UTAMA: 
           Ini adalah kunci untuk masalah 'non-static'. 
           Kita bungkus children dengan div relative tambahan.
        */}
        <div className="relative w-full">{children}</div>

        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
