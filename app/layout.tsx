import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import SmoothScroll from "@/components/smoothScroll";
import {VirtualScrollbar} from "@/components/ui/VirtualScrollbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  preload: false,
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
      <body className="font-sans antialiased relative min-h-screen overflow-x-hidden cursor-none">
        <div className="bg-grain fixed inset-0 z-[9999] pointer-events-none" />

        <SmoothCursor />
        <VirtualScrollbar />

        <SmoothScroll>
          <div className="relative w-full flex flex-col">{children}</div>
        </SmoothScroll>

        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
