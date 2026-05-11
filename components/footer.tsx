"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="py-16 px-4 border-t border-white/10">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="text-center"
      >
        <div className="mb-6 flex justify-center gap-3">
          {["👽", "🔒", "💻"].map((emoji, i) => (
            <motion.span
              key={i}
              className="text-lg opacity-40"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>

        <p className="font-serif text-xl md:text-2xl text-foreground/80 mb-2">
          This site made by <span className="text-primary">Azhar Aufa</span>
        </p>

        <p className="text-muted-foreground text-[10px] md:text-xs tracking-[0.2em] uppercase">
          With love & sincerity
        </p>

        <div className="mt-10 opacity-30 hover:opacity-100 transition-opacity duration-500">
          <p className="text-[10px] tracking-widest text-muted-foreground">
            &copy; 0xR3bel — 30 Mei 2026
          </p>
          <p className="text-[9px] mt-1 text-muted-foreground/50 italic">
            stay in the game & never stop trying
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
