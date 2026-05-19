"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface PreLoaderProps {
  onComplete?: () => void;
}

export function PreLoader({ onComplete }: PreLoaderProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
    
      if (onComplete) onComplete();
      setLoading(false);
    }, 3200); 

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          exit={{ pointerEvents: "none" }}
        >
        
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1.2, ease: [0.85, 0, 0.15, 1] }}
            className="absolute top-0 left-0 w-full h-1/2 bg-[#FDFBF7] origin-bottom z-0"
          />


          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 1.2, ease: [0.85, 0, 0.15, 1] }}
            className="absolute bottom-0 left-0 w-full h-1/2 bg-[#FDFBF7] origin-top z-0"
          />

       
          <motion.div
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{
              opacity: 0,
              y: -20,
              filter: "blur(8px)",
              transition: { duration: 0.5, ease: "easeInOut" },
            }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-center relative z-10 px-4 select-none"
          >

            <p className="font-serif text-xl md:text-2xl italic text-neutral-500/80 mb-4 tracking-wide">
              Wait a second... code, do your magic...
            </p>

    
            <div className="h-[1.5px] w-24 bg-neutral-300 mx-auto overflow-hidden rounded-full relative">
              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-black to-transparent"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
