"use client";

import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

type Era = "SMP" | "SMA" | "Kuliah";

interface FriendPhoto {
  src: string;
  rotation: number;
}

const eraData: Record<
  Era,
  {
    label: string;
    subtitle: string;
    color: string;
    accent: string;
    photos: FriendPhoto[];
  }
> = {
  SMP: {
    label: "SMP",
    subtitle: "Masa-masa polos",
    color: "oklch(0.88 0.06 145)",
    accent: "oklch(0.55 0.12 145)",
    photos: [
      { src: "/friends/smp-1.jpg", rotation: -3 },
      { src: "/friends/smp-2.jpg", rotation: 2 },
      { src: "/friends/smp-3.jpg", rotation: -1 },
      { src: "/friends/smp-4.jpg", rotation: 3 },
      { src: "/friends/smp-5.jpg", rotation: -2 },
    ],
  },
  SMA: {
    label: "SMA",
    subtitle: "Masa paling seru",
    color: "oklch(0.90 0.06 75)",
    accent: "oklch(0.60 0.12 75)",
    photos: [
      { src: "/friends/sma-1.jpg", rotation: 2 },
      { src: "/friends/sma-2.jpg", rotation: -3 },
      { src: "/friends/sma-3.jpg", rotation: 1 },
      { src: "/friends/sma-4.jpg", rotation: -2 },
      { src: "/friends/sma-5.jpg", rotation: 3 },
    ],
  },
  Kuliah: {
    label: "Kuliah",
    subtitle: "Geng sekarang",
    color: "oklch(0.88 0.06 260)",
    accent: "oklch(0.52 0.10 260)",
    photos: [
      { src: "/friends/kuliah-1.jpg", rotation: -2 },
      { src: "/friends/kuliah-2.jpg", rotation: 3 },
      { src: "/friends/kuliah-3.jpg", rotation: -1 },
      { src: "/friends/kuliah-4.jpg", rotation: 2 },
      { src: "/friends/kuliah-5.jpg", rotation: -3 },
    ],
  },
};

const ERAS: Era[] = ["SMP", "SMA", "Kuliah"];

function PhotoCard({
  photo,
  index,
  accent,
}: {
  photo: FriendPhoto;
  index: number;
  accent: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.93 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{
        duration: 0.55,
        ease: [0.21, 0.47, 0.32, 0.98],
        delay: index * 0.07,
      }}
      className="flex-shrink-0 snap-center"
      style={{ width: "clamp(155px, 42vw, 200px)" }}
    >
      <motion.div
        className="bg-white p-2.5 pb-8 shadow-xl border border-slate-100/80"
        style={{ rotate: photo.rotation }}
        whileHover={{
          rotate: 0,
          scale: 1.04,
          boxShadow: `0 20px 48px -12px ${accent}55`,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative aspect-[9/16] overflow-hidden bg-slate-100 rounded-sm">
          {!loaded && !error && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
              <motion.div
                className="w-6 h-6 rounded-full border-2 border-t-transparent"
                style={{ borderColor: `${accent}60`, borderTopColor: accent }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          )}
          {error ? (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
              <div className="flex flex-col items-center gap-2 opacity-40">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="m21 15-5-5L5 21" />
                </svg>
                <span className="text-xs text-slate-400">foto</span>
              </div>
            </div>
          ) : (
            <Image
              src={photo.src}
              alt="Foto bersama teman"
              fill
              className={`object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
              sizes="240px"
              onLoad={() => setLoaded(true)}
              onError={() => setError(true)}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function EraTab({
  era,
  isActive,
  onClick,
  accent,
}: {
  era: Era;
  isActive: boolean;
  onClick: () => void;
  accent: string;
}) {
  return (
    <button
      onClick={onClick}
      className="relative px-5 py-2 text-sm font-medium transition-colors duration-200 rounded-full"
      style={{
        color: isActive ? "#fff" : "oklch(0.45 0.02 250)",
        background: isActive ? accent : "transparent",
      }}
    >
      {eraData[era].label}
    </button>
  );
}

export function FriendsGallerySection() {
  const [activeEra, setActiveEra] = useState<Era>("SMP");
  const [direction, setDirection] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const currentData = eraData[activeEra];

  const handleEraChange = (era: Era) => {
    const currentIndex = ERAS.indexOf(activeEra);
    const nextIndex = ERAS.indexOf(era);
    setDirection(nextIndex > currentIndex ? 1 : -1);
    setActiveEra(era);
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10 md:mb-14 px-4"
        style={{ y }}
      >
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-3">
          Teman-Temanmu
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto opacity-50 font-light">
          Dari yang polos sampai yang sekarang — mereka selalu ada.
        </p>
      </motion.div>

      {/* Tab Era */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="flex justify-center mb-10 px-4"
      >
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/60 backdrop-blur-sm border border-white/40 shadow-sm">
          {ERAS.map((era) => (
            <EraTab
              key={era}
              era={era}
              isActive={activeEra === era}
              onClick={() => handleEraChange(era)}
              accent={eraData[era].accent}
            />
          ))}
        </div>
      </motion.div>

      {/* Era subtitle */}
      <AnimatePresence mode="wait">
        <motion.p
          key={activeEra + "-subtitle"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="text-center text-sm font-medium mb-8 px-4"
          style={{ color: currentData.accent, opacity: 0.8 }}
        >
          {currentData.subtitle}
        </motion.p>
      </AnimatePresence>

      {/* Decorative top strip */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeEra + "-strip"}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="h-[2px] w-24 mx-auto mb-8 rounded-full origin-center"
          style={{ background: currentData.accent }}
        />
      </AnimatePresence>

      {/* Horizontal scroll container */}
      <div className="relative">
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 h-full w-8 md:w-16 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, var(--background) 0%, transparent 100%)",
          }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 h-full w-8 md:w-16 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to left, var(--background) 0%, transparent 100%)",
          }}
        />

        <div
          ref={scrollRef}
          className="flex gap-5 md:gap-7 overflow-x-auto pb-8 pt-4 px-[10vw] md:px-[15vw]"
          style={{
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {currentData.photos.map((photo, index) => (
              <PhotoCard
                key={activeEra + "-" + index}
                photo={photo}
                index={index}
                accent={currentData.accent}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Scroll hint dots */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="flex justify-center gap-1.5 mt-4"
      >
        {currentData.photos.map((_, i) => (
          <motion.div
            key={activeEra + "-dot-" + i}
            className="rounded-full"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.05 }}
            style={{
              width: i === 0 ? 16 : 6,
              height: 6,
              background:
                i === 0 ? currentData.accent : `${currentData.accent}40`,
            }}
          />
        ))}
      </motion.div>

      {/* Swipe hint on mobile */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7 }}
        className="flex items-center justify-center gap-2 mt-5 md:hidden"
      >
        <motion.svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-muted-foreground/40"
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M5 12h14M13 6l6 6-6 6" />
        </motion.svg>
        <span className="text-xs text-muted-foreground/40 font-light">
          geser untuk lihat lebih
        </span>
      </motion.div>
    </section>
  );
}
