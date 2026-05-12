"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function MusicNotice() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="music-instruction"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed top-24 left-0 right-0 mx-auto w-fit flex justify-center z-100 pointer-events-none"
        >
          <p className="text-[10px] md:text-[11px] text-zinc-800 uppercase tracking-[0.3em] font-medium italic bg-white/30 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 shadow-sm">
            Tap 1x di manapun agar musiknya jalan
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
