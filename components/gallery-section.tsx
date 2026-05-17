"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface GalleryImage {
  src: string;
  caption: string;
  rotation: number;
}

const galleryImages: GalleryImage[] = [
  {
    src: "/gallery/gambar2.jpg",
    caption: "The prologue of a masterpiece",
    rotation: -2,
  },
  {
    src: "/gallery/gambar6.jpg",
    caption: "A universe in a single gaze",
    rotation: 2,
  },
  {
    src: "/gallery/gambar3.jpg",
    caption: "Becoming, in every breath",
    rotation: -1,
  },
  {
    src: "/gallery/gambar1.jpg",
    caption: "Captured light, held forever",
    rotation: 1,
  },
  {
    src: "/gallery/gambar4.jpg",
    caption: "Unscripted and infinite",
    rotation: -2,
  },
  {
    src: "/gallery/gambar5.jpg",
    caption: "Beyond the frame, into the light",
    rotation: 2,
  },
];

function buildWindingPath(
  nodeYs: number[],
  centerX: number,
  amplitude: number,
): string {
  if (nodeYs.length < 2) return "";
  const pts: string[] = [`M ${centerX} ${nodeYs[0]}`];
  for (let i = 0; i < nodeYs.length - 1; i++) {
    const yMid = (nodeYs[i] + nodeYs[i + 1]) / 2;
    const dir = i % 2 === 0 ? 1 : -1;
    pts.push(
      `Q ${centerX + amplitude * dir} ${yMid} ${centerX} ${nodeYs[i + 1]}`,
    );
  }
  return pts.join(" ");
}

function PolaroidCard({
  image,
  index,
  isActive,
  isDarkTheme,
}: {
  image: GalleryImage;
  index: number;
  isActive: boolean;
  isDarkTheme: boolean;
}) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const activeShadow = isDarkTheme
    ? "0 25px 60px -12px rgba(168, 85, 247, 0.45)"
    : "0 25px 60px -12px rgba(138, 154, 138, 0.45)";

  const hoverShadow = isDarkTheme
    ? "0 28px 64px -12px rgba(168, 85, 247, 0.55)"
    : "0 28px 64px -12px rgba(138, 154, 138, 0.5)";

  const spinnerClass = isDarkTheme
    ? "w-7 h-7 rounded-full border-2 border-purple-500/20 border-t-purple-500"
    : "w-7 h-7 rounded-full border-2 border-primary/20 border-t-primary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.65,
        ease: [0.21, 0.47, 0.32, 0.98],
        delay: 0.08,
      }}
      className="w-full max-w-65 md:max-w-sm relative z-20"
    >
      <motion.div
        className="bg-white p-3 md:p-4 pb-10 md:pb-12 shadow-2xl border border-slate-100"
        style={{ rotate: image.rotation }}
        animate={{
          boxShadow: isActive
            ? activeShadow
            : "0 10px 30px -8px rgba(0, 0, 0, 0.12)",
          scale: isActive ? 1.03 : 1,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{
          rotate: 0,
          scale: 1.05,
          boxShadow: hoverShadow,
          transition: { duration: 0.25 },
        }}
      >
        <div className="relative aspect-3/4 overflow-hidden bg-slate-100 shadow-inner rounded-sm">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
              <motion.div
                className={spinnerClass}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          )}
          {imageError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-50 text-slate-300">
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
            </div>
          ) : (
            <Image
              src={image.src}
              alt={image.caption}
              fill
              className={`object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              sizes="(max-width: 768px) 260px, 384px"
              priority={index < 2}
              loading={index < 2 ? "eager" : "lazy"}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          )}
        </div>
        <p className="font-serif text-center text-slate-500 mt-4 md:mt-6 text-sm md:text-lg italic font-medium tracking-wide !text-slate-600 dark:!text-slate-600">
          {image.caption}
        </p>
      </motion.div>
    </motion.div>
  );
}

function NodeMarker({
  isActive,
  isPassed,
  isDarkTheme,
}: {
  isActive: boolean;
  isPassed: boolean;
  isDarkTheme: boolean;
}) {
  const animationProps = isActive
    ? {
        boxShadow: isDarkTheme
          ? [
              "0 0 0 0px rgba(168,85,247,0.5)",
              "0 0 18px 7px rgba(168,85,247,0.35)",
              "0 0 0 14px rgba(168,85,247,0)",
            ]
          : [
              "0 0 0 0px rgba(138,154,138,0.5)",
              "0 0 18px 7px rgba(138,154,138,0.25)",
              "0 0 0 14px rgba(138,154,138,0)",
            ],
        scale: [1, 1.12, 1],
      }
    : {
        boxShadow: isPassed
          ? isDarkTheme
            ? "0 0 8px 2px rgba(168,85,247,0.25)"
            : "0 0 8px 2px rgba(138,154,138,0.18)"
          : "none",
        scale: 1,
      };

  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 z-10"
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.15, type: "spring", stiffness: 220, damping: 18 }}
    >
      <motion.div
        className={`w-3.5 h-3.5 md:w-4 md:h-4 rounded-full transition-colors duration-500 ${
          isPassed || isActive
            ? isDarkTheme
              ? "bg-purple-500"
              : "bg-primary"
            : "bg-slate-200"
        }`}
        animate={animationProps}
        transition={
          isActive
            ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.4 }
        }
      >
        {(isPassed || isActive) && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-white/70" />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

interface GallerySectionProps {
  isDarkTheme?: boolean;
}

export function GallerySection({ isDarkTheme = false }: GallerySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [containerHeight, setContainerHeight] = useState(0);
  const [nodeYs, setNodeYs] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // 1. Ambil scrollYProgress dengan detektor presisi di tengah viewport (0.5)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.5", "end 0.5"],
  });

  // 2. Haluskan progress global dengan useSpring (Bikin aspal & dot super lembut jalannya)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 18,
    restDelta: 0.0001,
  });

  const recalc = () => {
    if (!containerRef.current) return;
    const containerTop =
      containerRef.current.getBoundingClientRect().top + window.scrollY;
    const ys = nodeRefs.current.map((el) => {
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      return r.top + window.scrollY - containerTop + r.height / 2;
    });
    setNodeYs(ys);
    setContainerHeight(containerRef.current.scrollHeight);
  };

  useEffect(() => {
    recalc();
    const t1 = setTimeout(recalc, 300);
    const t2 = setTimeout(recalc, 1000);
    window.addEventListener("resize", recalc);
    const ro = new ResizeObserver(recalc);
    if (containerRef.current) ro.observe(containerRef.current);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("resize", recalc);
      ro.disconnect();
    };
  }, []);

  // Update index active node secara berkala mengikuti smoothProgress
  useEffect(() => {
    return smoothProgress.on("change", (v) => {
      const idx = Math.min(
        Math.floor(v * galleryImages.length),
        galleryImages.length - 1,
      );
      setActiveIndex(Math.max(0, idx));
    });
  }, [smoothProgress]);

  // 3. AMANKAN LOGIKA TRANSFORMASI: Dot Y & X sekarang mengekor 100% pada smoothProgress
  const dotY = useTransform(smoothProgress, (v) => {
    if (nodeYs.length < 2) return 0;
    const totalSeg = nodeYs.length - 1;
    const segFloat = v * totalSeg;
    const seg = Math.min(Math.floor(segFloat), totalSeg - 1);
    const t = segFloat - seg;
    return nodeYs[seg] + (nodeYs[seg + 1] - nodeYs[seg]) * t;
  });

  const dotX = useTransform(smoothProgress, (v) => {
    if (nodeYs.length < 2) return 0;
    const totalSeg = nodeYs.length - 1;
    const segFloat = v * totalSeg;
    const seg = Math.min(Math.floor(segFloat), totalSeg - 1);
    const t = segFloat - seg;
    const dir = seg % 2 === 0 ? 1 : -1;
    const amplitude = 55;
    return amplitude * dir * 4 * t * (1 - t);
  });

  const svgCenterX = 150;
  const amplitude = 55;
  const pathD = buildWindingPath(nodeYs, svgCenterX, amplitude);

  const clipY1 = nodeYs[0] ?? 0;
  const clipY2 = nodeYs[nodeYs.length - 1] ?? containerHeight;

  const trackColor = isDarkTheme ? "#a855f7" : "#8a9a8a";
  const fillMiddleColor = isDarkTheme ? "#c084fc" : "#a8b5a8";
  const thinLineColor = isDarkTheme ? "#e9d5ff" : "#c8d4c8";

  return (
    <section ref={sectionRef} className="py-16 md:py-24 px-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 md:mb-24"
      >
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-4">
          Foto Kamu
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-md mx-auto opacity-50 font-light">
          Foto kamu dulu kehapus dari Google Foto tahun lalu. Jadi aku comot
          dari sorotanmu aja yaa (😁)
        </p>
      </motion.div>

      <div ref={containerRef} className="relative max-w-4xl mx-auto">
        {/* SVG Winding Path bertema Ungu Claude */}
        {pathD && containerHeight > 0 && (
          <svg
            className="absolute left-1/2 top-0 -translate-x-1/2 pointer-events-none z-0"
            width="300"
            height={containerHeight}
            viewBox={`0 0 300 ${containerHeight}`}
            style={{ overflow: "visible" }}
          >
            <defs>
              <linearGradient id="gTrack" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={trackColor} stopOpacity="0.1" />
                <stop offset="50%" stopColor={trackColor} stopOpacity="0.28" />
                <stop offset="100%" stopColor={trackColor} stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="gFill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={trackColor} stopOpacity="0.35" />
                <stop
                  offset="50%"
                  stopColor={fillMiddleColor}
                  stopOpacity="0.85"
                />
                <stop offset="100%" stopColor={trackColor} stopOpacity="0.35" />
              </linearGradient>
              <filter id="gGlow" x="-80%" y="-5%" width="260%" height="110%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <clipPath id="gClip">
                <rect
                  x="-200"
                  y={clipY1}
                  width="700"
                  height={clipY2 - clipY1}
                />
              </clipPath>
            </defs>

            {/* Track asli putus-putus */}
            <path
              d={pathD}
              fill="none"
              stroke="url(#gTrack)"
              strokeWidth="2.5"
              strokeDasharray="10 7"
              strokeLinecap="round"
              clipPath="url(#gClip)"
            />

            {/* Garis utuh (solid) yang menutup jalan, ditenagai oleh smoothProgress */}
            <motion.path
              d={pathD}
              fill="none"
              stroke="url(#gFill)"
              strokeWidth="4"
              strokeLinecap="round"
              filter="url(#gGlow)"
              style={{ pathLength: smoothProgress }}
              initial={{ pathLength: 0 }}
              clipPath="url(#gClip)"
            />

            {/* Garis solid tipis pemanis */}
            <motion.path
              d={pathD}
              fill="none"
              stroke={thinLineColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ pathLength: smoothProgress }}
              initial={{ pathLength: 0 }}
              clipPath="url(#gClip)"
            />
          </svg>
        )}

        {/* FIX TOTAL: Dot Connector digerakkan langsung via Framer Motion transform (Super Smooth) */}
        {nodeYs.length > 1 && (
          <motion.div
            className="absolute pointer-events-none z-10"
            style={{
              left: "50%",
              top: dotY,
              x: dotX,
              y: "-50%",
              translateX: "-50%",
            }}
          >
            <motion.div
              className={`absolute rounded-full ${isDarkTheme ? "bg-purple-500/20" : "bg-primary/15"}`}
              style={{ width: 44, height: 44, marginLeft: -22, marginTop: -22 }}
              animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 28,
                height: 28,
                marginLeft: -14,
                marginTop: -14,
                background: isDarkTheme
                  ? "radial-gradient(circle, rgba(168,85,247,0.55) 0%, transparent 70%)"
                  : "radial-gradient(circle, rgba(138,154,138,0.55) 0%, transparent 70%)",
              }}
              animate={{ scale: [1, 1.25, 1] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div
              className={`absolute rounded-full ${isDarkTheme ? "bg-purple-400" : "bg-primary"}`}
              style={{
                width: 14,
                height: 14,
                marginLeft: -7,
                marginTop: -7,
                boxShadow: isDarkTheme
                  ? "0 0 18px 5px rgba(168,85,247,0.5), 0 0 36px 10px rgba(168,85,247,0.25)"
                  : "0 0 18px 5px rgba(138,154,138,0.45), 0 0 36px 10px rgba(138,154,138,0.25)",
              }}
            />
            <div
              className="absolute rounded-full bg-white"
              style={{ width: 5, height: 5, marginLeft: -2.5, marginTop: -2.5 }}
            />
          </motion.div>
        )}

        {/* Foto-foto */}
        <div className="relative z-20 flex flex-col items-center">
          {galleryImages.map((image, index) => {
            const isFirst = index === 0;
            const isLast = index === galleryImages.length - 1;

            // Penentuan node aktif/berlalu yang aman saat di-scroll
            const passedProgress = index / (galleryImages.length - 1 || 1);
            const isPassed = activeIndex > index;
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                className="relative w-full flex flex-col items-center"
                style={{
                  paddingTop: isFirst ? 16 : "20vh",
                  paddingBottom: isLast ? 16 : "20vh",
                }}
              >
                {/* Node marker dengan ref DOM */}
                <div
                  ref={(el) => {
                    nodeRefs.current[index] = el;
                  }}
                  className="relative w-full flex justify-center mb-7"
                >
                  <NodeMarker
                    isActive={isActive}
                    isPassed={isPassed}
                    isDarkTheme={isDarkTheme}
                  />
                </div>

                <PolaroidCard
                  image={image}
                  index={index}
                  isActive={isActive}
                  isDarkTheme={isDarkTheme}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
