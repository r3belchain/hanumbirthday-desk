"use client";

import { motion } from "framer-motion";

interface HeroSectionProps {
  isDarkTheme?: boolean;
}

export function HeroSection({ isDarkTheme = false }: HeroSectionProps) {
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

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Decorative elements */}
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
        className="text-center z-10"
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
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-foreground mb-6"
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="block">
            Selamat bertambah <br />
            usia yang ke-20,
          </span>
          <motion.span
            className={`block ${nameColorClass} italic mt-2 transition-colors duration-500`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Hanum
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Senang bisa kembali menyapa di hari spesialmu ini
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
          {/* Bingkai Luar */}
          <motion.div
            className={`w-6 h-10 border-2 rounded-full mx-auto flex justify-center transition-all duration-500 ${mouseBorderClass}`}
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* Roda Scroll */}
            <motion.div
              className={`w-1.5 h-3 rounded-full mt-2 transition-all duration-500 ${mouseDotClass}`}
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
