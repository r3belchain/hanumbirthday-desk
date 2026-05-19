"use client";

import { AnimatePresence, Variants, motion, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { useConfetti } from "./confetti";

interface CTASectionProps {
  onClick?: () => void;
}

const SUCCESS_WORDS = [
  "Hap!\uD83D\uDE46\u200D\u2642\uFE0F",
  "Aku",
  "terima",
  "doa",
  "baiknya.",
  "Makasii.",
];

const wordContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 200, damping: 22 },
  },
};

const successWrapVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const heartVariants: Variants = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 13 },
  },
};

const buttonExitVariants: Variants = {
  exit: {
    opacity: 0,
    scale: 0.88,
    filter: "blur(5px)",
    transition: { duration: 0.2, ease: "easeIn" },
  },
};


function NeonBorderCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        relative rounded-3xl overflow-hidden isolation-isolate
        border-none p-0 dark:border dark:border-transparent dark:p-[1.5px]
        transition-all duration-300 w-full
      "
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden dark:block overflow-hidden rounded-3xl"
      >
        <div className="absolute top-1/2 left-1/2 w-[300%] aspect-square -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <motion.div
            className="w-full h-full original-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "conic-gradient(from 0deg at center, transparent 40%, #7c3aed 65%, #db2777 75%, #7c3aed 85%, transparent 100%)",
              }}
            />
          </motion.div>
        </div>
      </div>

      <div
        className="
          relative z-10 rounded-3xl dark:rounded-[22px]
          bg-white dark:bg-zinc-950/85
          backdrop-blur-xl
          shadow-[0_10px_40px_rgba(0,0,0,0.04)]
          dark:shadow-[0_8px_48px_rgba(0,0,0,0.55)]
        "
      >
        {children}
      </div>
    </div>
  );
}

function MagneticButton({ onClick }: { onClick: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);

  const mx = useSpring(0, { stiffness: 160, damping: 16, mass: 0.6 });
  const my = useSpring(0, { stiffness: 160, damping: 16, mass: 0.6 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    mx.set((e.clientX - (left + width / 2)) * 0.35);
    my.set((e.clientY - (top + height / 2)) * 0.35);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
    setHovered(false);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: mx, y: my }}
      whileTap={{ scale: 0.93 }}
      variants={buttonExitVariants}
      exit="exit"
      className="
        relative inline-flex items-center justify-center
        px-9 py-3.5 rounded-full overflow-hidden cursor-pointer
        text-sm font-semibold tracking-[0.14em] uppercase select-none
        bg-[#EDE3DA] border border-[#C9B8A8] text-neutral-700
        dark:bg-white/[0.06] dark:border-white/10 dark:text-zinc-100
        transition-shadow duration-300
        shadow-md
        hover:shadow-[0_6px_20px_rgba(201,184,168,0.3)]
        dark:hover:shadow-[0_6px_36px_rgba(124,58,237,0.45)]
      "
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full overflow-hidden"
      >
        <motion.span
          className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/55 to-transparent dark:via-purple-200/15 -skew-x-12"
          animate={hovered ? { left: "160%" } : { left: "-100%" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </span>

      <span className="relative z-10 flex items-center gap-2">
        Kirim Doa Baik
        <motion.span
          className="inline-block"
          animate={{ scale: hovered ? 1.28 : 1, rotate: hovered ? 10 : 0 }}
          transition={{ type: "spring", stiffness: 280, damping: 16 }}
        >
          ✨
        </motion.span>
      </span>
    </motion.button>
  );
}

function SuccessState() {
  return (
    <motion.div
      variants={successWrapVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center gap-4"
    >
      <motion.span
        variants={heartVariants}
        className="text-5xl leading-none block"
      >
        🤍
      </motion.span>
      <motion.p
        variants={wordContainerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap justify-center gap-x-[0.3em] gap-y-1 text-base font-bold tracking-wide text-zinc-800 dark:text-zinc-100 drop-shadow-[0_0_10px_rgba(168,85,247,0.15)] dark:drop-shadow-[0_0_16px_rgba(168,85,247,0.85)]"
      >
        {SUCCESS_WORDS.map((word) => (
          <motion.span
            key={word}
            variants={wordVariants}
            className="inline-block"
          >
            {word}
          </motion.span>
        ))}
      </motion.p>
    </motion.div>
  );
}

export function CTASection({ onClick }: CTASectionProps) {
  const [isClicked, setIsClicked] = useState(false);
  const { fireHearts } = useConfetti();

  const handleClick = () => {
    setIsClicked(true);
    fireHearts();
    onClick?.();
  };

  return (
    <section className="py-24 px-4">
      <div
        style={{ perspective: "1200px" }}
        className="w-full overflow-visible"
      >
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 25, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, rotateX: 25, scale: 0.95 }}
          viewport={{ once: false, amount: 0.2 }} 
          transition={{
            type: "spring",
            stiffness: 50, 
            damping: 15, 
            mass: 0.8,
          }}
          className="max-w-md mx-auto origin-bottom"
        >
          <NeonBorderCard>
            <div className="relative px-8 py-10 text-center overflow-hidden">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[22px] bg-[radial-gradient(ellipse_at_top,rgba(201,184,168,0.15)_0%,transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.10)_0%,transparent_60%)]"
              />

              {(["tl", "tr", "bl", "br"] as const).map((pos) => (
                <div
                  key={pos}
                  aria-hidden
                  className={`absolute w-6 h-6 opacity-25 border-neutral-400 dark:border-white/15
                    ${pos === "tl" ? "top-3 left-3 border-l border-t rounded-tl-md" : ""}
                    ${pos === "tr" ? "top-3 right-3 border-r border-t rounded-tr-md" : ""}
                    ${pos === "bl" ? "bottom-3 left-3 border-l border-b rounded-bl-md" : ""}
                    ${pos === "br" ? "bottom-3 right-3 border-r border-b rounded-br-md" : ""}
                  `}
                />
              ))}

              <div className="relative z-10">
                <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-400 dark:text-zinc-500">
                  Satu Hal Terakhir...
                </span>
                <h2
                  className="font-serif text-2xl md:text-3xl mt-3 mb-4 text-zinc-800 dark:text-zinc-100"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Terima Kasih.
                </h2>
                <p className="text-sm leading-relaxed italic mb-7 text-zinc-500 dark:text-zinc-400">
                  &ldquo;Terima kasih sudah meluangkan waktu untuk melihat ini.
                  Semoga hari ini menjadi titik awal dari hal-hal luar biasa dan
                  ajaib yang akan datang.&rdquo;
                </p>
              </div>

              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  {!isClicked ? (
                    <MagneticButton key="btn" onClick={handleClick} />
                  ) : (
                    <SuccessState key="success" />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </NeonBorderCard>
        </motion.div>
      </div>
    </section>
  );
}
