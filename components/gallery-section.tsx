"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
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
    caption: "Senyumnya ngga berubah",
    rotation: -2,
  },
  {
    src: "/gallery/gambar6.jpg",
    caption: "Mata Panda itu masih ada",
    rotation: 2,
  },
  {
    src: "/gallery/gambar3.jpg",
    caption: "Dewasa vibes, i think",
    rotation: -1,
  },
  { src: "/gallery/gambar1.jpg", caption: "Nah ini", rotation: 1 },
  { src: "/gallery/gambar4.jpg", caption: "....", rotation: -2 },
  { src: "/gallery/gambar5.jpg", caption: "(:", rotation: 2 },
];

function PolaroidCard({
  image,
  index,
  isActive,
}: {
  image: GalleryImage;
  index: number;
  isActive: boolean;
}) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        ease: [0.21, 0.47, 0.32, 0.98],
        delay: 0.1,
      }}
      className="w-full max-w-[280px] md:max-w-sm relative z-20"
    >
      <motion.div
        className="bg-white p-3 md:p-4 pb-10 md:pb-12 shadow-2xl border border-slate-100 transition-all duration-500"
        style={{ rotate: image.rotation }}
        animate={{
          boxShadow: isActive
            ? "0 25px 60px -12px rgba(138, 154, 138, 0.5)"
            : "0 20px 40px -12px rgba(0, 0, 0, 0.15)",
          scale: isActive ? 1.02 : 1,
        }}
        whileHover={{
          rotate: 0,
          scale: 1.05,
          transition: { duration: 0.2 },
        }}
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-slate-100 shadow-inner rounded-sm">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
              <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          )}
          {imageError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-400">
              <span className="text-sm">Failed to load</span>
            </div>
          ) : (
            <Image
              src={image.src}
              alt={image.caption}
              fill
              className={`object-cover transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              sizes="(max-width: 768px) 280px, 400px"
              priority={index < 2}
              loading={index < 2 ? "eager" : "lazy"}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          )}
        </div>

        <p className="font-serif text-center text-slate-600 mt-4 md:mt-6 text-sm md:text-xl italic font-medium">
          {image.caption}
        </p>
      </motion.div>
    </motion.div>
  );
}

function WindingPath({
  pathLength,
  containerHeight,
}: {
  pathLength: ReturnType<typeof useSpring>;
  containerHeight: number;
}) {
  const numPhotos = galleryImages.length;
  const segmentHeight = containerHeight / numPhotos;

  const buildPath = () => {
    if (containerHeight === 0) return "";

    const points: string[] = [];
    const amplitude = 60;
    const centerX = 150;

    points.push(`M ${centerX} 0`);

    for (let i = 0; i < numPhotos; i++) {
      const yStart = i * segmentHeight;
      const yMid = yStart + segmentHeight * 0.5;
      const yEnd = (i + 1) * segmentHeight;

      const direction = i % 2 === 0 ? 1 : -1;
      const controlX = centerX + amplitude * direction;

      points.push(`Q ${controlX} ${yMid} ${centerX} ${yEnd}`);
    }

    return points.join(" ");
  };

  const pathD = buildPath();

  if (!pathD) return null;

  return (
    <svg
      className="absolute left-1/2 top-0 -translate-x-1/2 h-full pointer-events-none z-0"
      width="300"
      height={containerHeight}
      viewBox={`0 0 300 ${containerHeight}`}
      preserveAspectRatio="xMidYMin slice"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8a9a8a" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#8a9a8a" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#8a9a8a" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="glowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8a9a8a" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#a8b5a8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#8a9a8a" stopOpacity="0.4" />
        </linearGradient>
        <filter id="pathGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="strongGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="8" result="blur1" />
          <feGaussianBlur stdDeviation="4" result="blur2" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="blur2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

    
      <path
        d={pathD}
        fill="none"
        stroke="url(#pathGradient)"
        strokeWidth="3"
        strokeDasharray="12 8"
        strokeLinecap="round"
      />

      
      <motion.path
        d={pathD}
        fill="none"
        stroke="url(#glowGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        filter="url(#strongGlow)"
        style={{ pathLength }}
        initial={{ pathLength: 0 }}
      />

     
      <motion.path
        d={pathD}
        fill="none"
        stroke="#c8d4c8"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ pathLength }}
        initial={{ pathLength: 0 }}
      />
    </svg>
  );
}

function GlowingDot({
  progress,
  containerHeight,
}: {
  progress: number;
  containerHeight: number
}) {
  const numPhotos = galleryImages.length;
  const segmentHeight = containerHeight / numPhotos;
  const amplitude = 60;

  const currentSegment = Math.floor(progress * numPhotos);
  const segmentProgress = progress * numPhotos - currentSegment;

  const direction = currentSegment % 2 === 0 ? 1 : -1;

  const t = segmentProgress;
  const xOffset = amplitude * direction * 4 * t * (1 - t);

  const yPos = progress * containerHeight;

  return (
    <motion.div
      className="absolute left-1/2 pointer-events-none z-10"
      style={{
        top: yPos,
        x: xOffset,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/20"
        style={{
          width: 48,
          height: 48,
          marginLeft: -24,
          marginTop: -24,
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

     
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 32,
          height: 32,
          marginLeft: -16,
          marginTop: -16,
          background:
            "radial-gradient(circle, rgba(138, 154, 138, 0.6) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      
      <div
        className="absolute rounded-full bg-primary shadow-lg"
        style={{
          width: 16,
          height: 16,
          marginLeft: -8,
          marginTop: -8,
          boxShadow:
            "0 0 20px 6px rgba(138, 154, 138, 0.5), 0 0 40px 12px rgba(138, 154, 138, 0.3)",
        }}
      />

     
      <div
        className="absolute rounded-full bg-white"
        style={{
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
        }}
      />
    </motion.div>
  );
}

function NodeMarker({
  index,
  isActive,
  isPassed,
}: {
  index: number;
  isActive: boolean;
  isPassed: boolean;
}) {
  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 z-10"
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
    >
      <motion.div
        className={`w-4 h-4 md:w-5 md:h-5 rounded-full transition-all duration-700 ${
          isPassed || isActive ? "bg-primary" : "bg-slate-300"
        }`}
        animate={
          isActive
            ? {
                boxShadow: [
                  "0 0 0 0px rgba(138, 154, 138, 0.4)",
                  "0 0 20px 8px rgba(138, 154, 138, 0.3)",
                  "0 0 0 15px rgba(138, 154, 138, 0)",
                ],
                scale: [1, 1.1, 1],
              }
            : {
                boxShadow: isPassed
                  ? "0 0 10px 2px rgba(138, 154, 138, 0.2)"
                  : "0 0 0px 0px rgba(0,0,0,0)",
              }
        }
        transition={
          isActive
            ? {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : { duration: 0.5 }
        }
      >
        
        {(isPassed || isActive) && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60 shadow-sm" />
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  });

  const pathLengthSpring = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1]),
    { stiffness: 50, damping: 20, restDelta: 0.001 },
  );

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.scrollHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    const observer = new ResizeObserver(updateHeight);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateHeight);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      const index = Math.min(
        Math.floor(latest * galleryImages.length),
        galleryImages.length - 1,
      );
      setActiveIndex(Math.max(0, index));
    });
    return unsubscribe;
  }, [smoothProgress]);

  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      setCurrentProgress(latest);
    });
    return unsubscribe;
  }, [smoothProgress]);

  return (
    <section className="py-16 md:py-24 px-4 overflow-hidden">
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
          dari sorotanmu yaa (😁)
        </p>
      </motion.div>

      <div ref={containerRef} className="relative max-w-4xl mx-auto">
        
        <WindingPath
          pathLength={pathLengthSpring}
          containerHeight={containerHeight}
        />

       
        {containerHeight > 0 && (
          <GlowingDot
            progress={currentProgress}
            containerHeight={containerHeight}
          />
        )}

      
        <div className="relative z-20 flex flex-col items-center">
          {galleryImages.map((image, index) => {
            const passedProgress = (index + 1) / galleryImages.length;

            return (
              <div
                key={index}
                className="relative w-full flex flex-col items-center py-[35vh] md:py-[25vh] first:pt-8 last:pb-8"
              >
              
                <div className="relative w-full flex justify-center mb-8">
                  <NodeMarker
                    index={index}
                    isActive={activeIndex === index}
                    isPassed={currentProgress >= passedProgress}
                  />
                </div>

            
                <PolaroidCard
                  image={image}
                  index={index}
                  isActive={activeIndex === index}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
