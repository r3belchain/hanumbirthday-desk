"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface FooterProps {
  isDarkTheme?: boolean;
}

const ORIGINAL_QUOTE = '"never stop trying & keep running code..."';
const CRYPTO_CHARS = "01X#@$&*<>[]_-+=%!?aBcDeFgHiJkLmNoPqRsTuVwXyZ";

function EncryptedQuote() {
  const [displayText, setDisplayText] = useState(ORIGINAL_QUOTE);

  useEffect(() => {
    let glitchInterval: NodeJS.Timeout;

    const startGlitchCycle = () => {
      let iterations = 0;

      glitchInterval = setInterval(() => {
        const scrambled = ORIGINAL_QUOTE.split("")
          .map((char, index) => {
            if (char === " " || char === '"') return char;

            if (index < iterations) {
              return ORIGINAL_QUOTE[index];
            }

            return CRYPTO_CHARS[
              Math.floor(Math.random() * CRYPTO_CHARS.length)
            ];
          })
          .join("");

        setDisplayText(scrambled);

        if (iterations >= ORIGINAL_QUOTE.length) {
          clearInterval(glitchInterval);
        }

        iterations += 1 / 2;
      }, 25);
    };

    const loopTimer = setInterval(startGlitchCycle, 6000);

    startGlitchCycle();

    return () => {
      clearInterval(glitchInterval);
      clearInterval(loopTimer);
    };
  }, []);

  return <p>{displayText}</p>;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      ease: [0.16, 1, 0.3, 1],
      duration: 0.7,
    },
  },
};

const emojiVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5, y: 15 },
  visible: (i: number) => ({
    opacity: 0.4,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 10,
      delay: i * 0.08,
    },
  }),
};

export function Footer({ isDarkTheme = false }: FooterProps) {
  const highlightColor = isDarkTheme ? "" : "text-primary";
  const hoverHighlightColor = isDarkTheme
    ? "hover:!text-purple-400"
    : "hover:text-primary";
  const groupHoverHighlightColor = isDarkTheme
    ? "group-hover:!text-purple-400"
    : "group-hover:text-primary";

  return (
    <footer className="py-16 px-4 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        exit="hidden"
        viewport={{ once: false, amount: 0.1 }}
        className="text-center max-w-md mx-auto"
      >
        <motion.div
          variants={itemVariants}
          className="mb-6 flex justify-center gap-3"
        >
          {["👽", "🔒", "💻"].map((emoji, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={emojiVariants}
              className="text-lg inline-block"
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              >
                {emoji}
              </motion.div>
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="font-serif text-xl md:text-2xl text-foreground/80 mb-2"
        >
          This site crafted by{" "}
          {isDarkTheme ? (
            <motion.span
              animate={{ backgroundPosition: ["0% center", "-200% center"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="inline-block font-bold tracking-wide select-none"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #a855f7 0%, #ec4899 25%, #6366f1 50%, #a855f7 75%, #ec4899 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                WebkitTextFillColor: "transparent",
              }}
            >
              Azhar Aufa
            </motion.span>
          ) : (
            <span
              className={`${highlightColor} transition-colors duration-500`}
            >
              Azhar Aufa
            </span>
          )}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-muted-foreground text-[10px] md:text-xs tracking-[0.2em] uppercase mb-10"
        >
          With love & sincerity
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="opacity-40 hover:opacity-100 transition-opacity duration-500"
        >
          <div className="flex items-center justify-center gap-2 mb-3 flex-wrap">
            <p className="text-[10px] tracking-widest text-muted-foreground">
              &copy; 0xR3bel — 30 Mei 2026
            </p>

            <span className="text-muted-foreground/30 text-[8px]">•</span>

            <a
              href="https://github.com/r3belchain/hanumbirthday-desk"
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

          <motion.div
            animate={{ opacity: [0.35, 0.75, 0.35] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="text-[9px] text-muted-foreground italic leading-relaxed font-mono select-none"
          >
            <EncryptedQuote />
          </motion.div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
