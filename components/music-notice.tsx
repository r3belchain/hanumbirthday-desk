"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function MusicNotice() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="music-instruction"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-20 left-0 w-full flex justify-center z-100 pointer-events-none"
        >
          <p className="text-[10px] md:text-[11px] text-black uppercase tracking-[0.3em] font-light italic bg-black/20 backdrop-blur-sm px-4 py-1 rounded-full">
            Tap 1x di manapun agar musiknya jalan
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
