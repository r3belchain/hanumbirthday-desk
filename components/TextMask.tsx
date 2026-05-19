"use client";

import { motion } from "framer-motion";

interface TextMaskProps {
  text: string;
  className?: string;
}

export default function TextMask({ text, className = "" }: TextMaskProps) {
  return (
    <div className="overflow-hidden py-2">
      <motion.h1
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.215, 0.61, 0.355, 1] }}
        // RAHASIA UTAMA: bg-clip-text dan text-transparent dipadukan dengan gradasi bergerak
        className={`bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent bg-[size:200%_auto] animate-[gradient_4s_ease_infinite] select-none ${className}`}
        style={
          {
            // Opsional: Jika ingin mengganti gradasi dengan gambar/foto estetis, silakan aktifkan baris di bawah ini:
            // backgroundImage: "url('https://images.unsplash.com/photo-1518199266791-5375a83190b7')",
            // backgroundSize: "cover",
            // backgroundPosition: "center",
          }
        }
      >
        {text}
      </motion.h1>
    </div>
  );
}
