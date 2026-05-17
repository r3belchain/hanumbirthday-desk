"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface FooterProps {
  isDarkTheme?: boolean;
}

export function Footer({ isDarkTheme = false }: FooterProps) {

  const highlightColor = isDarkTheme ? "!text-purple-400" : "text-primary";


  const hoverHighlightColor = isDarkTheme
    ? "hover:!text-purple-400"
    : "hover:text-primary";

  const groupHoverHighlightColor = isDarkTheme
    ? "group-hover:!text-purple-400"
    : "group-hover:text-primary";

  return (
   
    <footer className="py-16 px-4">
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
              animate={{ y: [0, -5, 0] }}
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
          This site crafted by{" "}
          <span className={`${highlightColor} transition-colors duration-500`}>
            Azhar Aufa
          </span>
        </p>

        <p className="text-muted-foreground text-[10px] md:text-xs tracking-[0.2em] uppercase">
          With love & sincerity
        </p>

        <div className="mt-10 opacity-40 hover:opacity-100 transition-opacity duration-500">
          <div className="flex items-center justify-center gap-2 mb-3 flex-wrap">
            <p className="text-[10px] tracking-widest text-muted-foreground">
              &copy; 0xR3bel — 30 Mei 2026
            </p>

            <span className="text-muted-foreground/30 text-[8px]">•</span>

            <a
              href="https://github.com/r3belchain/ulangtahun-hanum"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 ${hoverHighlightColor} transition-colors duration-100 group cursor-pointer`}
            >
              <span
                className={`text-[10px] text-muted-foreground ${groupHoverHighlightColor} transition-colors duration-100`}
              >
                Source Code on
              </span>
              <Image
                src="/githublogo.svg"
                width={15}
                height={15}
                alt="Github"
                className={`footer-github-icon transition-all duration-100 ${isDarkTheme ? "invert opacity-80" : ""}`}
              />
            </a>
          </div>

          <div className="text-[9px] text-muted-foreground/60 italic leading-relaxed font-mono">
            <p>"never stop trying & keep running code..."</p>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
