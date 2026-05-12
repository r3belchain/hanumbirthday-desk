"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useConfetti } from "./confetti";

export function CTASection() {
  const [isClicked, setIsClicked] = useState(false);
  const { fireHearts } = useConfetti();

  const handleClick = () => {
    setIsClicked(true);
    fireHearts();
    // Tidak perlu window.open WhatsApp agar tidak agresif
  };

  return (
    <section className="py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto text-center"
      >
        <div className="glass rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
              Satu Hal Terakhir...
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mt-4 mb-6">
              Terima Kasih.
            </h2>
            <p className="text-foreground/70 mb-8 max-w-md mx-auto italic">
              "Terima kasih sudah meluangkan waktu untuk melihat ini. Semoga
              hari ini menjadi titik awal dari hal-hal luar biasa dan indah yang
              akan datang."
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!isClicked ? (
              <motion.button
                key="button"
                onClick={handleClick}
                className="relative inline-flex items-center justify-center px-10 py-4 text-lg font-medium text-white bg-[#E2D1C3] rounded-full overflow-hidden group shadow-lg"
                whileHover={{ scale: 1.05, backgroundColor: "#D4C1B2" }}
                whileTap={{ scale: 0.95 }}
                exit={{ scale: 0, opacity: 0 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Kirim Doa Baik
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    ✨
                  </motion.span>
                </span>
              </motion.button>
            ) : (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4"
              >
                <div className="text-6xl">🤍</div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-sm text-primary tracking-widest uppercase font-medium"
                >
                  Hap!🙆‍♂️ Aku terima doa baiknya. Makasii.
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Decorative corner elements */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/20 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/20 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/20 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/20 rounded-br-lg" />
        </div>
      </motion.div>
    </section>
  );
}
