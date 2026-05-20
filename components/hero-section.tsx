"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface HeroSectionProps {
  isDarkTheme?: boolean;
}

function useTypingText(
  targetText: string,
  triggerDelay: number = 1.5,
  typingSpeed: number = 60,
) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let isMounted = true;
    let currentIndex = 0;


    setDisplayText("");

    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (!isMounted) return;

   
        setDisplayText(targetText.slice(0, currentIndex + 1));
        currentIndex++;


        if (currentIndex >= targetText.length) {
          clearInterval(interval);
        }
      }, typingSpeed);
    }, triggerDelay * 1000);

    return () => {
      isMounted = false;
      clearTimeout(startTimeout);
    };
  }, [targetText, triggerDelay, typingSpeed]);

  return displayText;
}

export function HeroSection({ isDarkTheme = false }: HeroSectionProps) {
  const typingText = useTypingText(
    "Senang bisa kembali menyapa di hari spesialmu ini",
    1.5,
    80,
  );

  const scrollToMessage = () => {
    const element = document.getElementById("message-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const nameColorClass = isDarkTheme ? "!text-purple-400" : "text-primary";

  const mouseBorderClass = isDarkTheme
    ? "border-purple-500/50 group-hover:!border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.2)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]"
    : "border-primary/50 group-hover:border-primary";

  const mouseDotClass = isDarkTheme
    ? "bg-purple-500/60 group-hover:!bg-purple-300"
    : "bg-primary/50 group-hover:bg-primary";

  const textMaskStyle = isDarkTheme
    ? {
        backgroundImage:
          "linear-gradient(270deg, #ffffff, #c084fc, #6366f1, #ec4899, #ffffff)",
        backgroundSize: "400% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }
    : {
        backgroundImage:
          "linear-gradient(270deg, #0f172a, #115e59, #15803d, #22c55e, #1e3a1e)",
        backgroundSize: "400% 100%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      };

  const letterVariants = {
    hidden: { opacity: 0, y: 30, rotateX: 60 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        stiffness: 90,
        damping: 14,
        delay: 1.1 + i * 0.08,
      },
    }),
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-accent/20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-center z-10 flex flex-col items-center"
      >
        <motion.p
          className="text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Buat kamu
        </motion.p>

        <motion.h1
          style={textMaskStyle}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-6 font-bold tracking-tight select-none"
          animate={{
            y: [0, -8, 0],
            backgroundPosition: ["0% center", "400% center"],
          }}
          transition={{
            y: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
            backgroundPosition: {
              duration: 12,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        >
          <span className="block">
            Selamat bertambah <br />
            usia yang ke-20,
          </span>
          <span
            className={`block ${nameColorClass} italic mt-2 overflow-hidden py-1`}
          >
            {"Hanum".split("").map((char, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={letterVariants}
                initial="hidden"
                animate="visible"
                className="inline-block origin-bottom perspective-3d"
              >
                {char}
              </motion.span>
            ))}
          </span>
        </motion.h1>

        <motion.p
          className="text-xs md:text-sm text-muted-foreground mt-8 font-mono tracking-wide min-h-[2rem] max-w-[240px] sm:max-w-xs md:max-w-none md:whitespace-nowrap text-center opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          {typingText}

          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            className="inline-block w-[2px] h-[1em] bg-current align-middle ml-[2px]"
          />
        </motion.p>

        <motion.div
          className="mt-12 cursor-pointer relative z-20 group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          onClick={scrollToMessage}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            className={`w-6 h-10 border-2 rounded-full mx-auto flex justify-center transition-colors duration-500 ${mouseBorderClass}`}
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className={`w-1.5 h-3 rounded-full mt-2 transition-colors duration-500 ${mouseDotClass}`}
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>

          <span className="text-[10px] uppercase tracking-widest text-muted-foreground mt-2 block transition-opacity">
            Klik Ini
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
