// "use client";

// import { AnimatePresence, motion } from "framer-motion";
// import { Volume2, VolumeX } from "lucide-react";
// import {
//   useEffect,
//   useRef,
//   useState,
//   forwardRef,
//   useImperativeHandle,
// } from "react";

// export const MusicToggle = forwardRef((props, ref) => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const audioRef = useRef<HTMLAudioElement | null>(null);

//   useImperativeHandle(ref, () => ({
//     playMusic: () => {
//       if (audioRef.current && !isPlaying) {
//         audioRef.current
//           .play()
//           .then(() => setIsPlaying(true))
//           .catch((err) => console.log("Playback error dari kado:", err));
//       }
//     },
//   }));

//   useEffect(() => {
//     const handleFirstInteraction = () => {
//       if (audioRef.current && !isPlaying) {
//         audioRef.current
//           .play()
//           .then(() => {
//             setIsPlaying(true);
//             removeEventListeners();
//           })
//           .catch((err) => {
//             console.log("Autoplay ditahan browser, menunggu interaksi.", err);
//           });
//       }
//     };

//     const removeEventListeners = () => {
//       window.removeEventListener("click", handleFirstInteraction);
//       window.removeEventListener("touchstart", handleFirstInteraction);
//       window.removeEventListener("scroll", handleFirstInteraction);
//     };

//     window.addEventListener("click", handleFirstInteraction);
//     window.addEventListener("touchstart", handleFirstInteraction);
//     window.addEventListener("scroll", handleFirstInteraction);

//     return () => removeEventListeners();
//   }, [isPlaying]);

//   const toggleMusic = () => {
//     if (audioRef.current) {
//       if (isPlaying) {
//         audioRef.current.pause();
//       } else {
//         audioRef.current
//           .play()
//           .catch((err) => console.log("Playback error:", err));
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   return (
//     <>
//       <audio ref={audioRef} src="/musicmp3.mp3" loop preload="auto" />

//       <motion.button
//         initial={{ opacity: 0, x: 20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: 2, duration: 0.5 }}
//         onClick={toggleMusic}
//         className="fixed top-6 right-6 z-50 glass rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow bg-white/20 backdrop-blur-md border border-white/30"
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.95 }}
//       >
//         <AnimatePresence mode="wait">
//           {isPlaying ? (
//             <motion.div
//               key="playing"
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0 }}
//             >
//               <Volume2 className="w-5 h-5 text-primary" />
//             </motion.div>
//           ) : (
//             <motion.div
//               key="muted"
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0 }}
//             >
//               <VolumeX className="w-5 h-5 text-muted-foreground" />
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {isPlaying && (
//           <div className="absolute -right-1 -bottom-1 flex gap-0.5">
//             {[0, 1, 2].map((i) => (
//               <motion.div
//                 key={i}
//                 className="w-1 bg-primary rounded-full"
//                 animate={{ height: ["4px", "12px", "4px"] }}
//                 transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
//               />
//             ))}
//           </div>
//         )}
//       </motion.button>
//     </>
//   );
// });

// MusicToggle.displayName = "MusicToggle";

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MusicToggleHandle {
  playMusic: () => void;
}

interface MusicToggleProps {
  isDarkTheme?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const MusicToggle = forwardRef<MusicToggleHandle, MusicToggleProps>(
  ({ isDarkTheme = false }, ref) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Ref untuk menyimpan fungsi cleanup listener
    const removeListenersRef = useRef<(() => void) | null>(null);

    // ── Imperative handle: dipanggil Parent saat user klik "Buka Kado" ──
    useImperativeHandle(ref, () => ({
      playMusic: () => {
        if (!audioRef.current) return;
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            // Musik sudah jalan via parent → buang semua listener global sekarang
            removeListenersRef.current?.();
          })
          .catch((err) => console.log("Playback error dari kado:", err));
      },
    }));

    // ── Global first-interaction listener (fallback autoplay policy browser) ──
    useEffect(() => {
      if (isPlaying) return;

      const handleFirstInteraction = () => {
        if (!audioRef.current) return;
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            removeListenersRef.current?.();
          })
          .catch((err) =>
            console.log("Autoplay ditahan browser, menunggu interaksi.", err),
          );
      };

      const remove = () => {
        window.removeEventListener("click", handleFirstInteraction);
        window.removeEventListener("touchstart", handleFirstInteraction);
        window.removeEventListener("scroll", handleFirstInteraction);
        removeListenersRef.current = null;
      };

      removeListenersRef.current = remove;

      window.addEventListener("click", handleFirstInteraction);
      window.addEventListener("touchstart", handleFirstInteraction);
      window.addEventListener("scroll", handleFirstInteraction);

      return () => remove();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ── Toggle play/pause ──
    const toggleMusic = () => {
      if (!audioRef.current) return;

      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log("Playback error:", err));
      }
    };

    // ── Sinkronisasi Warna Sesuai Variabel hanumAiChat ──
    const buttonStyleClass = isDarkTheme
      ? "bg-gradient-to-br from-purple-900/90 via-violet-600/85 to-purple-500/80 border-purple-500/40 shadow-[0_0_0_1px_rgba(168,85,247,0.30),0_4px_24px_rgba(109,40,217,0.60),0_0_30px_rgba(168,85,247,0.40)]"
      : "bg-white/20 border-white/30 shadow-lg glass";

    // Semua icon dan bar penanda musik berputar otomatis jadi putih murni saat dark theme
    const iconColor = isDarkTheme ? "text-white" : "text-primary";
    const mutedIconColor = isDarkTheme
      ? "text-white/60"
      : "text-muted-foreground";
    const barColor = isDarkTheme ? "bg-white" : "bg-primary";

    return (
      <>
        <audio ref={audioRef} src="/musicmp3.mp3" loop preload="auto" />

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          onClick={toggleMusic}
          aria-label={isPlaying ? "Pause musik" : "Play musik"}
          className={`fixed top-6 right-6 z-50 rounded-full p-3 hover:shadow-xl transition-all duration-500 backdrop-blur-md border ${buttonStyleClass}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="playing"
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 10 }}
                transition={{ duration: 0.15 }}
              >
                <Volume2
                  className={`w-5 h-5 ${iconColor} transition-colors duration-500`}
                />
              </motion.div>
            ) : (
              <motion.div
                key="muted"
                initial={{ scale: 0, rotate: 10 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -10 }}
                transition={{ duration: 0.15 }}
              >
                <VolumeX
                  className={`w-5 h-5 ${mutedIconColor} transition-colors duration-500`}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Equalizer bar animasi — Mengikuti warna barColor */}
          <AnimatePresence>
            {isPlaying && (
              <motion.div
                key="equalizer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute -right-1 -bottom-1 flex gap-0.5 items-end"
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className={`w-1 ${barColor} rounded-full transition-colors duration-500`}
                    animate={{ height: ["4px", "12px", "4px"] }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: i * 0.12,
                      ease: "easeInOut",
                    }}
                    style={{ height: "4px" }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </>
    );
  },
);

MusicToggle.displayName = "MusicToggle";
