"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Era = "SMP" | "SMA" | "Kuliah";

interface FriendPhoto {
  src: string;
  rotation: number;
}

interface SelectedPhoto extends FriendPhoto {
  index: number;
  era: Era;
}

const eraData: Record<
  Era,
  { label: string; subtitle: string; accent: string; photos: FriendPhoto[] }
> = {
  SMP: {
    label: "SMP",
    subtitle: "Memory Lane",
    accent: "#4a9072",
    photos: [
      // { src: "/friends/smp-1.jpg", rotation: -3 },
      // { src: "/friends/smp-2.jpg", rotation: 2 },
      // { src: "/friends/smp-3.jpg", rotation: -1 },
      // { src: "/friends/smp-4.jpg", rotation: 3 },
      // { src: "/friends/smp-5.jpg", rotation: -2 },
    ],
  },
  SMA: {
    label: "SMA",
    subtitle: "Chapter of Youth",
    accent: "#9c7126",
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
    subtitle: "The Growth: Higher Ground",
    accent: "#3b7eb3",
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

function lockScroll() {
  document.documentElement.setAttribute("data-modal-open", "true");
  document.body.setAttribute("data-modal-open", "true");
}

function unlockScroll() {
  document.documentElement.removeAttribute("data-modal-open");
  document.body.removeAttribute("data-modal-open");
}

function PhotoCard({
  photo,
  index,
  activeEra,
  onSelect,
}: {
  photo: FriendPhoto;
  index: number;
  activeEra: Era;
  onSelect: (photo: SelectedPhoto) => void;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="shrink-0 py-6 relative will-change-transform"
      style={{ width: "clamp(180px, 50vw, 240px)" }}
    >
      <motion.div
        layoutId={`polaroid-${activeEra}-${index}`}
        initial={{ rotate: photo.rotation }}
        whileHover={{ scale: 1.05, rotate: 0, transition: { duration: 0.2 } }}
        onClick={() => onSelect({ ...photo, index, era: activeEra })}
        className="bg-white p-2 pb-10 shadow-2xl border border-slate-100 relative group z-10 hover:z-30"
      >
        <div className="relative aspect-3/4 overflow-hidden bg-slate-50 pointer-events-none">
          <Image
            src={photo.src}
            alt={`Memory from ${activeEra}`}
            fill
            className={`object-cover transition-opacity duration-700 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setLoaded(true)}
            sizes="300px"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export function FriendsGallerySection() {
  const [activeEra, setActiveEra] = useState<Era>("SMP");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<SelectedPhoto | null>(
    null,
  );
  const [mounted, setMounted] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const currentData = eraData[activeEra];

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const checkTheme = () => {
      const parent = sectionRef.current?.closest(".theme-dark");
      setIsDarkTheme(!!parent);
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    if (document.body)
      observer.observe(document.body, {
        attributes: true,
        subtree: true,
        attributeFilter: ["class"],
      });
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!selectedPhoto) {
      unlockScroll();
    }
    return () => {
      unlockScroll();
    };
  }, [selectedPhoto]);

  const handlePhotoSelect = (photo: SelectedPhoto) => {
    lockScroll();
    setSelectedPhoto(photo);
  };

  const handlePhotoClose = () => {
    setSelectedPhoto(null);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;
    const progress = scrollLeft / maxScroll;
    const index = Math.round(progress * (currentData.photos.length - 1));
    if (!isNaN(index)) setCurrentIdx(index);
  };

  const handleEraChange = (era: Era) => {
    if (era === activeEra) return;
    setActiveEra(era);
    setCurrentIdx(0);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="relative block py-24 bg-transparent w-full"
      >
        <style>{`
          @keyframes custom-rainbow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes custom-shine {
            0% { left: -100%; transition-timing-function: ease-in; }
            100% { left: 200%; transition-timing-function: ease-out; }
          }
          @keyframes wrapper-glow {
            0% { box-shadow: 0 0 15px rgba(168,85,247,0.1), inset 0 0 5px rgba(168,85,247,0.05); border-color: rgba(168,85,247,0.2); }
            50% { box-shadow: 0 0 25px rgba(168,85,247,0.5), inset 0 0 15px rgba(168,85,247,0.2); border-color: rgba(168,85,247,0.6); }
            100% { box-shadow: 0 0 15px rgba(168,85,247,0.1), inset 0 0 5px rgba(168,85,247,0.05); border-color: rgba(168,85,247,0.2); }
          }

          .fluid-hover-circle {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 260px;
            height: 260px;
            border-radius: 9999px;
            z-index: -10;
            pointer-events: none;
            will-change: transform;
            transform: translate(-50%, -50%) scale(0);
            transition: transform 1.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
          }

          .group:hover .fluid-hover-circle {
            transform: translate(-50%, -50%) scale(1);
          }

          .animate-local-rainbow {
            background-size: 200% 200%;
            animation: custom-rainbow 4s linear infinite;
          }
          .animate-local-shine {
            animation: custom-shine 1.2s infinite;
          }
          .animate-local-wrapper-glow {
            animation: wrapper-glow 3s ease-in-out infinite;
          }

          html[data-modal-open],
          body[data-modal-open] {
            overflow: hidden !important;
          }

          /* Cover html/body scrollbar */
          html[data-modal-open]::-webkit-scrollbar,
          body[data-modal-open]::-webkit-scrollbar {
            display: none !important;
            width: 0 !important;
          }
          html[data-modal-open],
          body[data-modal-open] {
            scrollbar-width: none !important;
          }

          /* Cover SEMUA elemen lain (parent scroll containers yang tidak diketahui) */
          html[data-modal-open] *::-webkit-scrollbar {
            display: none !important;
            width: 0 !important;
            height: 0 !important;
          }
          html[data-modal-open] * {
            scrollbar-width: none !important;
          }
        `}</style>

        <div className="relative z-10 text-center mb-16 px-4 will-change-transform overflow-hidden">
          <motion.h2
            initial={{ opacity: 0, x: 120 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl md:text-7xl font-bold mb-4 transition-colors duration-700"
            style={{ color: isDarkTheme ? "#fff" : currentData.accent }}
          >
            Friendship Gallery
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className={`max-w-2xl italic mx-auto mb-4 text-sm md:text-base transition-colors duration-700 ${
              isDarkTheme ? "text-white/70" : "text-slate-700/60"
            }`}
          >
            Menghormati lingkaran pertemanan yang tumbuh bersamamu di setiap
            babak kehidupan
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl font-light italic transition-colors duration-700"
            style={{
              color: isDarkTheme ? "#4ade80" : currentData.accent,
              opacity: 0.8,
            }}
          >
            {currentData.subtitle}
          </motion.p>
        </div>

        <div className="relative z-20 flex justify-center mb-16 px-4">
          <div
            className={`flex p-1.5 rounded-full transition-all duration-700 border backdrop-blur-md gap-1 ${
              isDarkTheme
                ? "bg-zinc-950/80 animate-local-wrapper-glow border-purple-500/30"
                : "bg-white/60 border-slate-200/80 shadow-slate-200/50 shadow-lg"
            }`}
          >
            {ERAS.map((era) => {
              const isActive = activeEra === era;
              const buttonStyle = isDarkTheme
                ? {
                    backgroundColor: isActive ? "#6b21a8" : "transparent",
                    color: isActive ? "#ffffff" : "rgba(255, 255, 255, 0.55)",
                  }
                : {
                    backgroundColor: isActive
                      ? eraData[era].accent
                      : "transparent",
                    color: isActive ? "#fff" : "#64748b",
                  };

              return (
                <button
                  key={era}
                  onClick={() => handleEraChange(era)}
                  style={buttonStyle}
                  className={[
                    "group relative overflow-hidden rounded-full font-bold text-xs md:text-sm px-6 md:px-10 py-2.5 isolate select-none outline-none",
                    isDarkTheme && isActive
                      ? "transition-none [border:calc(0.125rem)_solid_transparent] [background-clip:padding-box,border-box] [background-origin:border-box] bg-[linear-gradient(#121213,#121213),linear-gradient(90deg,#7c3aed,#a855f7,#6366f1,#c084fc,#7c3aed)] animate-local-rainbow"
                      : "border border-transparent transition-all duration-300",
                  ].join(" ")}
                >
                  <span
                    style={{
                      backgroundColor: isDarkTheme
                        ? "#a855f7"
                        : eraData[era].accent,
                    }}
                    className="fluid-hover-circle"
                  />
                  {isDarkTheme && (
                    <span className="absolute top-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -left-full group-hover:animate-local-shine pointer-events-none -z-10" />
                  )}
                  <span className="relative z-10 flex items-center justify-center transition-colors duration-[1500ms] group-hover:text-white">
                    {eraData[era].label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative w-full">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className={[
              "flex gap-8 overflow-x-auto pb-10 px-[10vw]",
              "cursor-grab active:cursor-grabbing",
              "touch-pan-x",
              "overscroll-x-contain",
              "antialiased",
              "min-h-[380px]",
              "[&::-webkit-scrollbar]:h-1.5",
              "[&::-webkit-scrollbar-track]:bg-transparent",
              "[&::-webkit-scrollbar-thumb]:rounded-full",
              isDarkTheme
                ? "[&::-webkit-scrollbar-thumb]:bg-purple-600/80 [&::-webkit-scrollbar-thumb]:hover:bg-purple-500"
                : "[&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-thumb]:hover:bg-slate-400",
            ].join(" ")}
            style={{
              scrollbarColor: isDarkTheme
                ? "#a855f7 transparent"
                : `${currentData.accent} transparent`,
              scrollSnapType: "x mandatory",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEra}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`flex w-full ${
                  currentData.photos.length === 0
                    ? "items-center justify-center"
                    : "gap-8 items-start"
                }`}
              >
                {currentData.photos.length > 0 ? (
                  currentData.photos.map((photo, i) => (
                    <PhotoCard
                      key={`${activeEra}-${i}`}
                      photo={photo}
                      index={i}
                      activeEra={activeEra}
                      onSelect={handlePhotoSelect}
                    />
                  ))
                ) : (
                  <div className="text-center flex flex-col items-center justify-center py-16">
                    <p
                      className={`font-serif italic text-lg sm:text-2xl md:text-3xl tracking-widest whitespace-nowrap transition-colors duration-700 ${
                        isDarkTheme ? "text-white/40" : "text-slate-400"
                      }`}
                    >
                      — No Information Available —
                    </p>
                    <p
                      className={`text-[10px] sm:text-xs mt-3 uppercase tracking-[0.2em] sm:tracking-[0.3em] opacity-60 whitespace-nowrap ${
                        isDarkTheme ? "text-white/30" : "text-slate-400"
                      }`}
                    >
                      This chapter is a mystery
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-10 relative z-10">
          {currentData.photos.map((_, i) => (
            <motion.div
              key={`dot-${activeEra}-${i}`}
              animate={{
                width: currentIdx === i ? 40 : 10,
                backgroundColor:
                  currentIdx === i
                    ? isDarkTheme
                      ? "#a855f7"
                      : currentData.accent
                    : isDarkTheme
                      ? "rgba(255,255,255,0.2)"
                      : currentData.accent + "33",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="h-2 rounded-full"
            />
          ))}
        </div>
      </section>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedPhoto && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 overflow-hidden">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/80 backdrop-blur-md"
                  onClick={handlePhotoClose}
                />
                <motion.div
                  layoutId={`polaroid-${selectedPhoto.era}-${selectedPhoto.index}`}
                  className="relative z-10 bg-white p-3 md:p-5 pb-10 md:pb-14 shadow-2xl"
                  style={{
                    width: "clamp(200px, 55vh, 420px)",
                    maxWidth: "calc(100vw - 3rem)",
                    maxHeight: "calc(100vh - 3rem)",
                  }}
                  initial={{ rotate: 0 }}
                >
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-slate-50">
                    <Image
                      src={selectedPhoto.src}
                      alt={`Zoomed Memory from ${selectedPhoto.era}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 800px"
                      priority
                    />
                  </div>
                  <p className="absolute bottom-3 md:bottom-4 left-0 right-0 text-center font-serif text-slate-400 text-sm md:text-base opacity-70">
                    Tap anywhere to close
                  </p>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
