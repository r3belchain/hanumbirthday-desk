// "use client";

// import {
//   AnimatePresence,
//   motion,
//   useScroll,
//   useTransform,
// } from "framer-motion";
// import Image from "next/image";
// import { useRef, useState } from "react";

// type Era = "SMP" | "SMA" | "Kuliah";

// interface FriendPhoto {
//   src: string;
//   rotation: number;
// }

// const eraData: Record<
//   Era,
//   {
//     label: string;
//     subtitle: string;
//     accent: string;
//     photos: FriendPhoto[];
//   }
// > = {
//   SMP: {
//     label: "SMP",
//     subtitle: "Memory Lane",
//     accent: "#4a9072",
//     photos: [
//       { src: "/friends/smp-1.jpg", rotation: -3 },
//       { src: "/friends/smp-2.jpg", rotation: 2 },
//       { src: "/friends/smp-3.jpg", rotation: -1 },
//       { src: "/friends/smp-4.jpg", rotation: 3 },
//       { src: "/friends/smp-5.jpg", rotation: -2 },
//     ],
//   },
//   SMA: {
//     label: "SMA",
//     subtitle: "Chapter of Youth",
//     accent: "#9c7126",
//     photos: [
//       { src: "/friends/sma-1.jpg", rotation: 2 },
//       { src: "/friends/sma-2.jpg", rotation: -3 },
//       { src: "/friends/sma-3.jpg", rotation: 1 },
//       { src: "/friends/sma-4.jpg", rotation: -2 },
//       { src: "/friends/sma-5.jpg", rotation: 3 },
//     ],
//   },
//   Kuliah: {
//     label: "Kuliah",
//     subtitle: "The Growth: Higher Ground",
//     accent: "#3b7eb3",
//     photos: [
//       { src: "/friends/kuliah-11.png", rotation: -2 },
//       { src: "/friends/kuliah-2.jpg", rotation: 3 },
//       { src: "/friends/kuliah-3.jpg", rotation: -1 },
//       { src: "/friends/kuliah-4.jpg", rotation: 2 },
//       { src: "/friends/kuliah-5.jpg", rotation: -3 },
//     ],
//   },
// };

// const ERAS: Era[] = ["SMP", "SMA", "Kuliah"];

// function PhotoCard({ photo, index }: { photo: FriendPhoto; index: number }) {
//   const [loaded, setLoaded] = useState(false);

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.9 }}
//       transition={{ duration: 0.4, delay: index * 0.05 }}
//       className="shrink-0 py-6 relative"
//       style={{ width: "clamp(180px, 50vw, 240px)" }}
//     >
//       <div
//         className="bg-white p-2 pb-10 shadow-2xl border border-slate-100 relative"
//         style={{ transform: `rotate(${photo.rotation}deg)` }}
//       >
//         <div className="relative aspect-3/4 overflow-hidden bg-slate-50">
//           <Image
//             src={photo.src}
//             alt="Friendship"
//             fill
//             className={`object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
//             onLoad={() => setLoaded(true)}
//             sizes="300px"
//           />
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// export function FriendsGallerySection() {
//   const [activeEra, setActiveEra] = useState<Era>("SMP");
//   const [currentIdx, setCurrentIdx] = useState(0);
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const sectionRef = useRef<HTMLElement>(null);

//   const currentData = eraData[activeEra];

//   const { scrollYProgress } = useScroll({
//     target: sectionRef,
//     offset: ["start end", "end start"],
//   } as any);

//   const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

//   const handleScroll = () => {
//     if (scrollRef.current) {
//       const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
//       const maxScroll = scrollWidth - clientWidth;
//       if (maxScroll <= 0) return;
//       const progress = scrollLeft / maxScroll;
//       const index = Math.round(progress * (currentData.photos.length - 1));
//       if (!isNaN(index)) setCurrentIdx(index);
//     }
//   };

//   const handleEraChange = (era: Era) => {
//     if (era === activeEra) return;
//     setActiveEra(era);
//     setCurrentIdx(0);
//     if (scrollRef.current) {
//       scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
//     }
//   };

//   return (
//     <section
//       ref={sectionRef}
//       style={{ position: "relative" }}
//       className="relative block py-24 overflow-hidden bg-transparent w-full"
//     >
//       <motion.div
//         style={{ y }}
//         className="relative z-10 text-center mb-16 px-4"
//       >
//         <h2
//           className="font-serif text-5xl md:text-7xl font-bold mb-4 transition-colors duration-700"
//           style={{ color: currentData.accent }}
//         >
//           Friendship Gallery
//         </h2>
//         <p className="text-slate-700/60 max-w-2xl italic mx-auto mb-4 text-sm md:text-base leading-relaxed">
//           Menghormati lingkaran pertemanan yang tumbuh bersamamu di setiap babak
//           kehidupan
//         </p>
//         <p
//           className="text-lg md:text-xl font-light italic transition-colors duration-700"
//           style={{ color: currentData.accent, opacity: 0.8 }}
//         >
//           {currentData.subtitle}
//         </p>
//       </motion.div>

//       <div className="relative z-20 flex justify-center mb-16 px-4">
//         <div className="flex p-1 rounded-full bg-white/50 backdrop-blur-md border border-slate-200 shadow-lg relative">
//           {ERAS.map((era) => (
//             <button
//               key={era}
//               onClick={() => handleEraChange(era)}
//               className="px-6 md:px-10 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-500 relative"
//               style={{
//                 backgroundColor:
//                   activeEra === era ? eraData[era].accent : "transparent",
//                 color: activeEra === era ? "#fff" : "#64748b",
//               }}
//             >
//               {eraData[era].label}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="relative w-full">
//         <div
//           ref={scrollRef}
//           onScroll={handleScroll}
//           className="flex gap-8 overflow-x-auto pb-10 px-[10vw]
//                      cursor-grab active:cursor-grabbing
//                      touch-pan-x antialiased relative
//                      [&::-webkit-scrollbar]:h-2
//                      [&::-webkit-scrollbar-track]:bg-transparent
//                      [&::-webkit-scrollbar-thumb]:rounded-full"
//           style={{
//             // @ts-ignore
//             scrollbarColor: `${currentData.accent} transparent`,
//             WebkitOverflowScrolling: "touch",
//           }}
//         >
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={activeEra}
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -20 }}
//               className="flex gap-8 relative"
//             >
//               {currentData.photos.map((photo, i) => (
//                 <PhotoCard key={`${activeEra}-${i}`} photo={photo} index={i} />
//               ))}
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>

//       <div className="flex justify-center gap-3 mt-10 relative z-10">
//         {currentData.photos.map((_, i) => (
//           <motion.div
//             key={`dot-${activeEra}-${i}`}
//             animate={{
//               width: currentIdx === i ? 40 : 10,
//               backgroundColor:
//                 currentIdx === i
//                   ? currentData.accent
//                   : currentData.accent.replace(")", " / 0.2)"),
//             }}
//             transition={{ type: "spring", stiffness: 200, damping: 25 }}
//             className="h-2 rounded-full relative"
//           />
//         ))}
//       </div>
//     </section>
//   );
// }

"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
    accent: string;
    photos: FriendPhoto[];
  }
> = {
  SMP: {
    label: "SMP",
    subtitle: "Memory Lane",
    accent: "#4a9072", // Hijau
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
    subtitle: "Chapter of Youth",
    accent: "#9c7126", // Cokelat Gold
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
    accent: "#3b7eb3", // Biru
    photos: [
      { src: "/friends/kuliah-11.png", rotation: -2 },
      { src: "/friends/kuliah-2.jpg", rotation: 3 },
      { src: "/friends/kuliah-3.jpg", rotation: -1 },
      { src: "/friends/kuliah-4.jpg", rotation: 2 },
      { src: "/friends/kuliah-5.jpg", rotation: -3 },
    ],
  },
};

const ERAS: Era[] = ["SMP", "SMA", "Kuliah"];

function PhotoCard({ photo, index }: { photo: FriendPhoto; index: number }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="shrink-0 py-6 relative"
      style={{ width: "clamp(180px, 50vw, 240px)" }}
    >
      <div
        className="bg-white p-2 pb-10 shadow-2xl border border-slate-100 relative"
        style={{ transform: `rotate(${photo.rotation}deg)` }}
      >
        <div className="relative aspect-3/4 overflow-hidden bg-slate-50">
          <Image
            src={photo.src}
            alt="Friendship"
            fill
            className={`object-cover transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setLoaded(true)}
            sizes="300px"
          />
        </div>
      </div>
    </motion.div>
  );
}

export function FriendsGallerySection() {
  const [activeEra, setActiveEra] = useState<Era>("SMP");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const currentData = eraData[activeEra];

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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  } as any);

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll <= 0) return;
      const progress = scrollLeft / maxScroll;
      const index = Math.round(progress * (currentData.photos.length - 1));
      if (!isNaN(index)) setCurrentIdx(index);
    }
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
    <section
      ref={sectionRef}
      className="relative block py-24 overflow-hidden bg-transparent w-full"
    >
      <motion.div
        style={{ y }}
        className="relative z-10 text-center mb-16 px-4"
      >
        <h2
          className="font-serif text-5xl md:text-7xl font-bold mb-4 transition-colors duration-700"
          style={{ color: isDarkTheme ? "#fff" : currentData.accent }}
        >
          Friendship Gallery
        </h2>
        <p
          className={`max-w-2xl italic mx-auto mb-4 text-sm md:text-base transition-colors duration-700 ${isDarkTheme ? "text-white/70" : "text-slate-700/60"}`}
        >
          Menghormati lingkaran pertemanan yang tumbuh bersamamu di setiap babak
          kehidupan
        </p>
        <p
          className="text-lg md:text-xl font-light italic transition-colors duration-700"
          style={{
            color: isDarkTheme ? "#4ade80" : currentData.accent,
            opacity: 0.8,
          }}
        >
          {currentData.subtitle}
        </p>
      </motion.div>

      <div className="relative z-20 flex justify-center mb-16 px-4">
        <div
          className={`flex p-1 rounded-full transition-all duration-700 border shadow-lg ${isDarkTheme ? "bg-white/10 backdrop-blur-xl border-white/20" : "bg-white/50 backdrop-blur-md border-slate-200"}`}
        >
          {ERAS.map((era) => (
            <button
              key={era}
              onClick={() => handleEraChange(era)}
              className="px-6 md:px-10 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-500 relative"
              style={{
                // BALIK LAGI KE WARNA ASLI: Hijau/Cokelat/Biru
                backgroundColor:
                  activeEra === era ? eraData[era].accent : "transparent",
                // Logika Teks: Jika tidak aktif dan di mode gelap, buat jadi putih transparan agar kelihatan
                color:
                  activeEra === era
                    ? "#fff"
                    : isDarkTheme
                      ? "rgba(255,255,255,0.7)"
                      : "#64748b",
              }}
            >
              {eraData[era].label}
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-full">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-8 overflow-x-auto pb-10 px-[10vw] cursor-grab active:cursor-grabbing touch-pan-x antialiased relative [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full"
          style={{
            scrollbarColor: `${currentData.accent} transparent`,
            WebkitOverflowScrolling: "touch",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeEra}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex gap-8 relative"
            >
              {currentData.photos.map((photo, i) => (
                <PhotoCard key={`${activeEra}-${i}`} photo={photo} index={i} />
              ))}
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
                  ? currentData.accent
                  : isDarkTheme
                    ? "rgba(255,255,255,0.2)"
                    : currentData.accent + "33", // 33 itu hex untuk 20% opacity
            }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="h-2 rounded-full relative"
          />
        ))}
      </div>
    </section>
  );
}
