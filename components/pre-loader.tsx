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
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#FDFBF7]"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <p className="font-serif text-2xl italic text-foreground/60 mb-4">
              Wait a second... code, do your magic....
            </p>
            <div className="h-px w-16 bg-foreground/20 mx-auto" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}