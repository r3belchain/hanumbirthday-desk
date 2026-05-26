"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// Import VirtualScrollbar yang sudah di-extend dengan props opsional
import { VirtualScrollbar } from "@/components/ui/VirtualScrollbar";

interface TimeNode {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  message: React.ReactNode;
  scrollTrigger: number;
}

const constellationData: TimeNode[] = [
  {
    id: "past",
    title: "Past Memory",
    subtitle: "Yang telah berlalu",
    icon: "📽️",
    message: `Aku masih anak kecil yang belum paham saat itu, aku ngga pernah membayangkan sampai segininya. Tapi bagiku, setiap fragmen memori yang tersisa adalah bagian dari cerita yang membentuk siapa aku hari ini. A lot. Mungkin bagi kamu aku halusinasi, tapi "kedalaman" itu nyata.`,
    scrollTrigger: 0,
  },
  {
    id: "present",
    title: "Nowadays",
    subtitle: "Titik hari ini",
    icon: "📷",
    message:
      "Melihatmu mencapai usia 20 tahun adalah hal yang luar biasa. Kamu tumbuh. Hari ini bukan lagi soal masa lalu, tapi tentang mengapresiasi dan menghargai masa sekarang.",
    scrollTrigger: 0.5,
  },
  {
    id: "future",
    title: "The Future",
    subtitle: "Langkah ke depan",
    icon: "📺",
    message: (
      <>
        Menghadapi dunia di depan yang penuh dengan variabel kemungkinan dan
        tanda tanya, seseorang pernah bilang ke aku, yang bisa dilakukan
        hanyalah fokus dan mengupayakan semaksimal mungkin hal yang bisa
        dilakukan sekarang.
        <br />
        <br />
        Karya ini, adalah upaya maksimal itu. 5 tahun lagi, 10 tahun lagi, karya
        ini akan tetap bisa dilihat, dikenang, dan sebagai bentuk dokumentasi
        memori dan artefak perasaan.
        <br />
        <br />
        Penyesalan karena{" "}
        <strong>
          <em>tidak mencoba</em>
        </strong>{" "}
        itu lebih sakit dan mahal harganya daripada rasa lelah atas{" "}
        <strong>
          <em>percobaan yang belum berhasil</em>
        </strong>
        . Apa pun jalannya dan "dengan siapa", may you find ease.
      </>
    ),
    scrollTrigger: 1,
  },
];

const CANVAS_BASE_W = 1400;
const CANVAS_BASE_H = 3200;

const BASE_NODES = [
  { id: "past", x: 350, y: 500 },
  { id: "present", x: 1050, y: 1600 },
  { id: "future", x: 550, y: 2700 },
];

const BASE_PATH =
  "M 350 500 C 700 700, 1100 1100, 1050 1600 C 1000 2100, 400 2200, 550 2700";

function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler, { passive: true });
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

function useLayout() {
  const vw = useWindowWidth();
  const usableW = Math.min(vw, CANVAS_BASE_W);
  const scale = usableW / CANVAS_BASE_W;
  const canvasW = CANVAS_BASE_W * scale;
  const canvasH = CANVAS_BASE_H * scale;

  const nodes = useMemo(
    () =>
      BASE_NODES.map((n) => ({
        ...n,
        sx: n.x * scale,
        sy: n.y * scale,
      })),
    [scale],
  );

  const xFrames = useMemo(
    () => [0, 0.5, 1].map((_, i) => `calc(50vw - ${nodes[i].sx}px)`),
    [nodes],
  );
  const yFrames = useMemo(
    () => [0, 0.5, 1].map((_, i) => `calc(50vh - ${nodes[i].sy}px)`),
    [nodes],
  );

  return { scale, canvasW, canvasH, nodes, xFrames, yFrames };
}

const BIRD_PATH = "M0,6 C4,0 8,0 12,6 C16,0 20,0 24,6";

function DayAtmosphere() {
  const clouds = useMemo(
    () => [
      {
        id: 1,
        top: "8%",
        delay: 0,
        duration: 55,
        w: 180,
        h: 45,
        opacity: 0.55,
      },
      {
        id: 2,
        top: "18%",
        delay: 8,
        duration: 70,
        w: 240,
        h: 55,
        opacity: 0.4,
      },
      {
        id: 3,
        top: "28%",
        delay: 20,
        duration: 60,
        w: 140,
        h: 38,
        opacity: 0.45,
      },
      {
        id: 4,
        top: "5%",
        delay: 35,
        duration: 80,
        w: 200,
        h: 50,
        opacity: 0.35,
      },
    ],
    [],
  );

  const birds = useMemo(
    () => [
      { id: 1, top: "12%", delay: 5, duration: 18, scale: 0.9 },
      { id: 2, top: "14%", delay: 5.4, duration: 18, scale: 0.7 },
      { id: 3, top: "10%", delay: 5.9, duration: 18, scale: 0.75 },
      { id: 4, top: "22%", delay: 28, duration: 22, scale: 1 },
      { id: 5, top: "24%", delay: 28.6, duration: 22, scale: 0.8 },
    ],
    [],
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[5]">
      <motion.div
        className="absolute"
        style={{ top: "8%", right: "14%" }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-16 h-16 rounded-full bg-gradient-radial from-yellow-200 via-amber-300 to-orange-400 shadow-[0_0_60px_20px_rgba(251,191,36,0.45)]" />
        <div className="absolute inset-0 -m-4 rounded-full bg-amber-300/20 blur-2xl" />
      </motion.div>

      {clouds.map((c) => (
        <motion.div
          key={`cloud-${c.id}`}
          initial={{ x: "-25vw" }}
          animate={{ x: "115vw" }}
          transition={{
            duration: c.duration,
            repeat: Infinity,
            ease: "linear",
            delay: c.delay,
          }}
          className="absolute"
          style={{ top: c.top, opacity: c.opacity }}
        >
          <div className="relative" style={{ width: c.w, height: c.h }}>
            <div
              className="absolute bg-white rounded-full blur-xl"
              style={{ width: c.w * 0.8, height: c.h, left: "10%", top: "20%" }}
            />
            <div
              className="absolute bg-white rounded-full blur-xl"
              style={{
                width: c.w * 0.5,
                height: c.h * 0.8,
                left: "5%",
                top: "10%",
              }}
            />
            <div
              className="absolute bg-white rounded-full blur-xl"
              style={{
                width: c.w * 0.6,
                height: c.h * 0.9,
                left: "35%",
                top: "5%",
              }}
            />
            <div
              className="absolute bg-white/80 rounded-full blur-2xl"
              style={{
                width: c.w * 0.4,
                height: c.h * 0.7,
                left: "55%",
                top: "15%",
              }}
            />
          </div>
        </motion.div>
      ))}

      {birds.map((b) => (
        <motion.div
          key={`bird-${b.id}`}
          initial={{ x: "105vw" }}
          animate={{ x: "-10vw" }}
          transition={{
            duration: b.duration,
            repeat: Infinity,
            ease: "linear",
            delay: b.delay,
            repeatDelay: 15,
          }}
          className="absolute"
          style={{ top: b.top }}
        >
          <motion.svg
            width={24 * b.scale}
            height={12 * b.scale}
            viewBox="0 0 24 12"
            style={{ transform: `scale(${b.scale})`, transformOrigin: "0 0" }}
            className="overflow-visible"
          >
            <motion.path
              d={BIRD_PATH}
              fill="none"
              stroke="#374151"
              strokeWidth="1.8"
              strokeLinecap="round"
              animate={{
                d: [
                  BIRD_PATH,
                  "M0,6 C4,10 8,10 12,6 C16,10 20,10 24,6",
                  BIRD_PATH,
                ],
              }}
              transition={{
                duration: 0.7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.svg>
        </motion.div>
      ))}
    </div>
  );
}

function NightAtmosphere() {
  const stars = useMemo(() => {
    const positions: [number, number][] = [
      [8, 12],
      [15, 45],
      [22, 78],
      [30, 25],
      [38, 60],
      [45, 10],
      [52, 88],
      [60, 35],
      [68, 70],
      [75, 15],
      [82, 55],
      [90, 40],
      [5, 80],
      [25, 5],
      [35, 95],
      [50, 50],
      [65, 20],
      [80, 85],
      [12, 65],
      [42, 38],
      [70, 48],
      [88, 72],
      [18, 90],
      [55, 30],
      [92, 18],
      [3, 55],
      [48, 75],
      [77, 8],
      [33, 42],
      [60, 92],
    ];
    return positions.map(([top, left], i) => ({
      id: i,
      top: `${top}%`,
      left: `${left}%`,
      delay: (i * 0.37) % 4,
      size: i % 3 === 0 ? 2.5 : i % 3 === 1 ? 1.5 : 2,
    }));
  }, []);

  const shootingStars = useMemo(
    () => [
      { id: 1, top: "10%", left: "75%", delay: 2, repeatDelay: 9 },
      { id: 2, top: "25%", left: "55%", delay: 8, repeatDelay: 13 },
      { id: 3, top: "6%", left: "30%", delay: 15, repeatDelay: 11 },
      { id: 4, top: "40%", left: "85%", delay: 22, repeatDelay: 17 },
    ],
    [],
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[5]">
      <motion.div
        className="absolute"
        style={{ top: "7%", right: "12%" }}
        animate={{ scale: [1, 1.04, 1], opacity: [0.92, 1, 0.92] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-slate-100 via-blue-50 to-slate-300 shadow-[0_0_50px_15px_rgba(196,181,253,0.3),inset_-6px_-4px_12px_rgba(100,116,139,0.3)]" />
        <div className="absolute inset-0 -m-3 rounded-full bg-violet-200/20 blur-2xl" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-tl from-transparent via-transparent to-slate-700/25" />
      </motion.div>

      {stars.map((s) => (
        <motion.div
          key={`star-${s.id}`}
          className="absolute rounded-full bg-white"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{
            duration: 2 + (s.id % 3),
            repeat: Infinity,
            ease: "easeInOut",
            delay: s.delay,
          }}
        />
      ))}

      {shootingStars.map((ss) => (
        <motion.div
          key={`shoot-${ss.id}`}
          className="absolute w-[160px] h-[2px] -rotate-[35deg] origin-left"
          style={{ top: ss.top, left: ss.left }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: [0, 1, 1, 0], opacity: [0, 1, 0.8, 0] }}
          transition={{
            duration: 1.2,
            times: [0, 0.3, 0.7, 1],
            repeat: Infinity,
            repeatDelay: ss.repeatDelay,
            delay: ss.delay,
            ease: "easeOut",
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-transparent via-purple-300 to-white rounded-full shadow-[0_0_8px_2px_rgba(216,180,254,0.6)]" />
        </motion.div>
      ))}
    </div>
  );
}

function NodeModal({
  node,
  isDarkTheme,
  onClose,
}: {
  node: TimeNode | null;
  isDarkTheme: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!node) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [node, onClose]);

  return (
    <AnimatePresence>
      {node && (
        <motion.div
          key={node.id}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onPointerDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-[6px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 32, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.92, y: 20, filter: "blur(4px)" }}
            transition={{
              type: "spring",
              stiffness: 130,
              damping: 18,
              mass: 0.8,
            }}
            onPointerDown={(e) => e.stopPropagation()}
            className={`relative max-w-md w-full rounded-3xl border p-8 shadow-2xl ${
              isDarkTheme
                ? "bg-[#0c0c18]/95 border-purple-500/25 text-white"
                : "bg-white/95 border-emerald-200 text-neutral-800"
            }`}
            style={{
              boxShadow: isDarkTheme
                ? "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(168,85,247,0.1), inset 0 1px 0 rgba(255,255,255,0.05)"
                : "0 32px 80px rgba(0,0,0,0.12), 0 0 0 1px rgba(16,185,129,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              className={`absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-sm transition-all ${
                isDarkTheme
                  ? "bg-white/5 hover:bg-white/15 text-white/60 hover:text-white"
                  : "bg-neutral-100 hover:bg-neutral-200 text-neutral-400 hover:text-neutral-700"
              }`}
            >
              ✕
            </button>
            <div className="text-5xl mb-4 select-none">{node.icon}</div>
            <h3
              className="text-3xl font-serif mb-2"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              {node.title}
            </h3>
            <p
              className={`text-[10px] font-mono uppercase tracking-[0.25em] mb-6 ${isDarkTheme ? "text-purple-300/80" : "text-emerald-700"}`}
            >
              {node.subtitle}
            </p>
            <p
              className={`leading-relaxed text-sm md:text-[15px] ${isDarkTheme ? "text-slate-300" : "text-neutral-600"}`}
            >
              {node.message}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ConstellationCanvas({
  isDarkTheme,
  onClose,
}: {
  isDarkTheme: boolean;
  onClose: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const savedScrollTop = useRef(0);

  const { scale, canvasW, canvasH, nodes, xFrames, yFrames } = useLayout();
  useEffect(() => {
    document.documentElement.classList.add("constellation-open");
    return () => {
      document.documentElement.classList.remove("constellation-open");
    };
  }, []);

  useEffect(() => {
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = orig;
    };
  }, []);

  const { scrollYProgress } = useScroll({ container: scrollRef });

  useEffect(
    () => scrollYProgress.on("change", (v) => setProgress(v)),
    [scrollYProgress],
  );

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 18,
    restDelta: 0.0001,
  });

  const mapX = useTransform(smoothProgress, [0, 0.5, 1], xFrames);
  const mapY = useTransform(smoothProgress, [0, 0.5, 1], yFrames);

  const openNode = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>, nodeId: string) => {
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      savedScrollTop.current = scrollRef.current?.scrollTop ?? 0;
      setActiveNodeId(nodeId);
    },
    [],
  );

  const closeNode = useCallback(() => {
    setActiveNodeId(null);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = savedScrollTop.current;
        }
      });
    });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (activeNodeId) {
      el.style.overflow = "hidden";
    } else {
      el.style.overflow = "auto";
      el.style.overflowX = "hidden";
    }
  }, [activeNodeId]);

  const activeNode =
    constellationData.find((n) => n.id === activeNodeId) ?? null;

  const scaledPath = useMemo(() => {
    return BASE_PATH.replace(/(\d+\.?\d*)\s+(\d+\.?\d*)/g, (_, px, py) => {
      return `${parseFloat(px) * scale} ${parseFloat(py) * scale}`;
    });
  }, [scale]);

  return (
    <>
      <div className="fixed inset-0 z-[9999] pointer-events-none">
        <p
          className={`pointer-events-none absolute top-5 left-0 right-0 mx-auto w-max text-[9px] font-mono tracking-[0.3em] uppercase px-4 py-1.5 rounded-full border transition-all duration-700 ${
            isDarkTheme
              ? "bg-white/5 backdrop-blur-md text-purple-400 border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]"
              : "bg-white/70 backdrop-blur-md text-emerald-700 border-emerald-600/20 shadow-sm"
          }`}
        >
          Klik dan scroll untuk membuka pesan dari setiap waktu
        </p>

        <AnimatePresence>
          {progress >= 0.85 && (
            <motion.div
              key="exit-button"
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 20,
                mass: 0.9,
              }}
              className="pointer-events-auto absolute bottom-10 left-0 right-0 flex flex-col items-center gap-3"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className={`text-[9px] font-mono tracking-[0.3em] uppercase ${isDarkTheme ? "text-purple-400/60" : "text-emerald-700/60"}`}
              >
                — Akhir Perjalanan —
              </motion.p>
              <button
                type="button"
                onClick={onClose}
                className={`group relative flex items-center gap-3 px-8 py-4 rounded-2xl border backdrop-blur-xl cursor-pointer transition-all duration-300 select-none ${
                  isDarkTheme
                    ? "bg-purple-950/30 border-purple-400/40 text-white hover:bg-purple-900/50 hover:border-purple-300 shadow-[0_0_40px_rgba(168,85,247,0.2)] hover:shadow-[0_0_60px_rgba(168,85,247,0.35)]"
                    : "bg-white/80 border-emerald-300/70 text-emerald-900 hover:bg-white hover:border-emerald-400 shadow-lg shadow-emerald-900/10 hover:shadow-xl hover:shadow-emerald-900/15"
                }`}
              >
                {isDarkTheme && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none"
                    initial={false}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/10 to-transparent -skew-x-12"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        repeatDelay: 1.8,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                )}
                <motion.span
                  className="text-sm opacity-60"
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ✕
                </motion.span>
                <span className="text-[11px] font-mono tracking-[0.25em] uppercase font-semibold">
                  Keluar dari Konstelasi Zaman
                </span>
                <motion.span
                  className="text-sm opacity-60"
                  animate={{ x: [0, 3, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ✕
                </motion.span>
              </button>
              {isDarkTheme && (
                <div className="w-32 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent mt-1" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div
        ref={scrollRef}
        data-lenis-prevent="true"
        className={`fixed inset-0 z-[100] overflow-y-auto overflow-x-hidden outline-none transition-colors duration-1000 ${
          isDarkTheme
            ? "bg-[#030305] dark-scroll"
            : "bg-gradient-to-b from-[#FAF8F5] via-[#F3EDE2] to-[#E2EAD0] light-scroll"
        }`}
        style={{ touchAction: "pan-y", WebkitOverflowScrolling: "touch" }}
      >
        {isDarkTheme ? <NightAtmosphere /> : <DayAtmosphere />}
        {!isDarkTheme && (
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-[2]">
            <div className="absolute -top-[10%] -left-[5%] w-[70vw] h-[70vw] rounded-full bg-[radial-gradient(circle,rgba(254,243,199,0.3)_0%,transparent_70%)] blur-[60px]" />
            <div className="absolute top-[40%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-[radial-gradient(circle,rgba(209,250,229,0.25)_0%,transparent_70%)] blur-[90px]" />
          </div>
        )}

        <div className="h-[350vh] relative w-full z-10">
          <div className="sticky top-0 h-screen w-full overflow-visible flex items-center justify-center z-20">
            <motion.div
              layout={false}
              style={{
                x: mapX,
                y: mapY,
                width: canvasW,
                height: canvasH,
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
              }}
              className="absolute left-0 top-0 flex-shrink-0 will-change-transform transform-gpu z-30"
            >
              <svg
                className="absolute inset-0 pointer-events-none z-0"
                style={{ width: canvasW, height: canvasH }}
                viewBox={`0 0 ${canvasW} ${canvasH}`}
              >
                <path
                  d={scaledPath}
                  fill="none"
                  className={`transition-colors duration-1000 ${isDarkTheme ? "stroke-white/[0.04] stroke-[3px]" : "stroke-emerald-800/[0.05] stroke-[2px]"}`}
                />
                <motion.path
                  d={scaledPath}
                  fill="none"
                  strokeLinecap="round"
                  className={`transition-colors duration-1000 ${isDarkTheme ? "stroke-purple-500 stroke-[3px] drop-shadow-[0_0_12px_rgba(168,85,247,0.9)]" : "stroke-emerald-600 stroke-[2.5px] drop-shadow-[0_0_8px_#059669]"}`}
                  style={{ pathLength: smoothProgress }}
                />
              </svg>

              {constellationData.map((nodeData) => {
                const layout = nodes.find((n) => n.id === nodeData.id)!;
                const isNear =
                  Math.abs(progress - nodeData.scrollTrigger) < 0.15;

                return (
                  <div
                    key={nodeData.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-50"
                    style={{
                      left: layout.sx,
                      top: layout.sy,
                      width: 160 * scale,
                    }}
                  >
                    <button
                      type="button"
                      onPointerDown={(e) => openNode(e, nodeData.id)}
                      className={`relative touch-none rounded-full flex items-center justify-center backdrop-blur-xl border transition-all duration-500 cursor-pointer hover:scale-105 active:scale-95 z-50 ${
                        isNear
                          ? isDarkTheme
                            ? "bg-[#0d0d18] border-purple-400 shadow-[0_0_35px_rgba(168,85,247,0.45)]"
                            : "bg-white border-emerald-400 shadow-lg shadow-emerald-500/25"
                          : isDarkTheme
                            ? "bg-[#07070c]/60 border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.1)]"
                            : "bg-white/95 border-emerald-200/80 shadow-md"
                      }`}
                      style={{
                        width: Math.max(56, 80 * scale),
                        height: Math.max(56, 80 * scale),
                      }}
                    >
                      <span
                        className="relative z-50 pointer-events-none select-none"
                        style={{ fontSize: Math.max(18, 28 * scale) }}
                      >
                        {nodeData.icon}
                      </span>
                    </button>
                    <div className="text-center mt-3 pointer-events-none select-none">
                      <h4
                        className={`font-serif font-light tracking-wide transition-colors duration-1000 ${isDarkTheme ? "text-gray-200" : "text-neutral-800"}`}
                        style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          fontSize: Math.max(14, 20 * scale),
                        }}
                      >
                        {nodeData.title}
                      </h4>
                      <p
                        className={`font-mono uppercase font-bold mt-0.5 transition-colors duration-1000 ${isDarkTheme ? "text-purple-400/70" : "text-emerald-600"}`}
                        style={{
                          fontSize: Math.max(7, 9 * scale),
                          letterSpacing: "0.2em",
                        }}
                      >
                        {nodeData.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="fixed right-0 top-0 bottom-0 z-[150] w-6">
        <VirtualScrollbar containerRef={scrollRef} isDarkTheme={isDarkTheme} />
      </div>

      <NodeModal
        node={activeNode}
        isDarkTheme={isDarkTheme}
        onClose={closeNode}
      />
    </>
  );
}

export function ConstellationTimeline({
  isDarkTheme,
}: {
  isDarkTheme: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-12 px-4 text-center overflow-hidden w-full relative z-9999">
      <motion.div
        initial={{ opacity: 0, x: 120 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md mx-auto relative group"
      >
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.98, 1.02, 0.98] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute inset-0 rounded-2xl blur-xl pointer-events-none transition-colors duration-500 ${
            isDarkTheme ? "bg-purple-500/20" : "bg-emerald-400/15"
          }`}
        />

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className={`group relative w-full py-6 px-8 rounded-2xl border text-left transition-all duration-500 shadow-sm cursor-pointer overflow-hidden ${
            isDarkTheme
              ? "bg-purple-950/10 border-purple-500/30 hover:border-purple-400 hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]"
              : "bg-gradient-to-r from-emerald-50/60 to-amber-50/60 border-emerald-100 backdrop-blur-md hover:border-emerald-300 hover:shadow-[0_0_25px_rgba(16,185,129,0.12)]"
          }`}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <motion.div
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.1 }}
              className={`absolute top-3 left-1/4 w-1 h-1 rounded-full ${isDarkTheme ? "bg-purple-300" : "bg-emerald-400"}`}
            />
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: 0.4 }}
              className={`absolute bottom-4 left-12 w-1.5 h-1.5 rounded-full ${isDarkTheme ? "bg-purple-200" : "bg-amber-400"}`}
            />
            <motion.div
              animate={{ opacity: [0.1, 0.9, 0.1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 }}
              className={`absolute top-4 right-1/3 w-1 w-1 rounded-full ${isDarkTheme ? "bg-white" : "bg-emerald-300"}`}
            />
          </div>

          <div className="flex items-center justify-between relative z-10">
            <div>
              <span
                className={`text-[10px] font-mono uppercase tracking-widest block transition-colors duration-500 ${
                  isDarkTheme
                    ? "text-purple-400 group-hover:text-purple-300"
                    : "text-emerald-700 font-bold group-hover:text-emerald-500"
                }`}
              >
                Susuri pesan dari waktu
              </span>
              <h3
                className={`font-serif text-xl mt-1 transition-colors duration-500 ${isDarkTheme ? "text-white" : "text-neutral-800"}`}
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Konstelasi Zaman
                <motion.span
                  className="inline-block"
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ⏳
                </motion.span>
              </h3>
            </div>
            <motion.span
              className={`text-xl ${isDarkTheme ? "text-purple-400" : "text-emerald-600"}`}
              whileHover={{ x: 6, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              →
            </motion.span>
          </div>
        </button>
      </motion.div>

      <AnimatePresence mode="wait" initial={false}>
        {isOpen && (
          <ConstellationCanvas
            isDarkTheme={isDarkTheme}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
