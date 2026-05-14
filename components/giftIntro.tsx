"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface GiftIntroProps {
  onOpen: () => void;
}

export default function GiftIntro({ onOpen }: GiftIntroProps) {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpen = () => {
    setIsOpened(true);
    // Memberi sedikit jeda agar animasi kado terlihat dulu sebelum hilang
    setTimeout(() => {
      onOpen();
    }, 500);
  };

  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
        >
          {/* Efek Cahaya Belakang */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black opacity-60" />

          <motion.div
            whileHover={{ scale: 1.1, rotate: 3 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleOpen}
            className="relative cursor-pointer"
          >
            <span className="text-9xl filter drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]">
              🎁
            </span>
            <span className="absolute inset-0 animate-ping rounded-full bg-white/10" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 font-mono text-[10px] tracking-[0.4em] text-white/60 uppercase pointer-events-none"
          >
            Klik untuk membuka kado
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
