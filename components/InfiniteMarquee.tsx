"use client";

import { motion } from "framer-motion";

interface InfiniteMarqueeProps {
  baseText: string;
  className?: string;
  speed?: number; // Semakin kecil nilainya, semakin cepat jalannya
}

export default function InfiniteMarquee({
  baseText,
  className = "",
  speed = 20,
}: InfiniteMarqueeProps) {
  // Kita duplikasi teksnya sebanyak 4 kali agar barisan teksnya panjang dan tidak terputus saat melintasi layar lebar
  const textArray = Array(4).fill(baseText);

  return (
    <div className="w-full overflow-hidden whitespace-nowrap flex select-none border-y border-gray-200/50 py-4 bg-white/30 backdrop-blur-sm">
      <motion.div
        className={`flex gap-16 pr-16 text-xs md:text-sm font-mono uppercase tracking-widest ${className}`}
        // Memicu animasi berjalan selamanya secara horizontal
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          ease: "linear",
          duration: speed,
          repeat: Infinity,
        }}
      >
        {textArray.map((text, index) => (
          <span key={index} className="flex items-center gap-16 flex-shrink-0">
            {text}
            {/* Karakter pembatas antar teks biar makin estetik */}
            <span className="text-purple-500 text-lg">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
