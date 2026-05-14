// "use client";

// import { AnimatePresence, motion } from "framer-motion";
// import { Volume2, VolumeX } from "lucide-react";
// import { useEffect, useRef, useState } from "react";

// export function MusicToggle() {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const audioRef = useRef<HTMLAudioElement | null>(null);

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
//             console.log(
//               "Autoplay ditahan browser, menunggu interaksi pengguna.",
//               err,
//             );
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

//       <audio
//         ref={audioRef}
//         src="/musicmp3.mp3"
//         loop
//         preload="auto"
//       />

//       <motion.button
//         initial={{ opacity: 0, x: 20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: 2, duration: 0.5 }}
//         onClick={toggleMusic}
//         className="fixed top-6 right-6 z-50 glass rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow bg-white/20 backdrop-blur-md border border-white/30"
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.95 }}
//         aria-label={isPlaying ? "Mute music" : "Play music"}
//       >
//         <AnimatePresence mode="wait">
//           {isPlaying ? (
//             <motion.div
//               key="playing"
//               initial={{ scale: 0, rotate: -180 }}
//               animate={{ scale: 1, rotate: 0 }}
//               exit={{ scale: 0, rotate: 180 }}
//               transition={{ duration: 0.2 }}
//             >
//               <Volume2 className="w-5 h-5 text-primary" />
//             </motion.div>
//           ) : (
//             <motion.div
//               key="muted"
//               initial={{ scale: 0, rotate: 180 }}
//               animate={{ scale: 1, rotate: 0 }}
//               exit={{ scale: 0, rotate: -180 }}
//               transition={{ duration: 0.2 }}
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
//                 animate={{
//                   height: ["4px", "12px", "4px"],
//                 }}
//                 transition={{
//                   duration: 0.5,
//                   repeat: Infinity,
//                   delay: i * 0.1,
//                 }}
//               />
//             ))}
//           </div>
//         )}
//       </motion.button>
//     </>
//   );
// }
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";

// Kita gunakan forwardRef agar fungsi play bisa dipicu dari luar
export const MusicToggle = forwardRef((props, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Ekspos fungsi play ke komponen induk
  useImperativeHandle(ref, () => ({
    playMusic: () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log("Playback error dari kado:", err));
      }
    },
  }));

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            removeEventListeners();
          })
          .catch((err) => {
            console.log("Autoplay ditahan browser, menunggu interaksi.", err);
          });
      }
    };

    const removeEventListeners = () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
      window.removeEventListener("scroll", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("touchstart", handleFirstInteraction);
    window.addEventListener("scroll", handleFirstInteraction);

    return () => removeEventListeners();
  }, [isPlaying]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current
          .play()
          .catch((err) => console.log("Playback error:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/musicmp3.mp3" loop preload="auto" />

      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 glass rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow bg-white/20 backdrop-blur-md border border-white/30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="playing"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Volume2 className="w-5 h-5 text-primary" />
            </motion.div>
          ) : (
            <motion.div
              key="muted"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <VolumeX className="w-5 h-5 text-muted-foreground" />
            </motion.div>
          )}
        </AnimatePresence>

        {isPlaying && (
          <div className="absolute -right-1 -bottom-1 flex gap-0.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1 bg-primary rounded-full"
                animate={{ height: ["4px", "12px", "4px"] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </div>
        )}
      </motion.button>
    </>
  );
});

MusicToggle.displayName = "MusicToggle";