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



export interface MusicToggleHandle {
  playMusic: () => void;
}

interface MusicToggleProps {
  isDarkTheme?: boolean;
}



export const MusicToggle = forwardRef<MusicToggleHandle, MusicToggleProps>(
  ({ isDarkTheme = false }, ref) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

  
    const removeListenersRef = useRef<(() => void) | null>(null);

  
    useImperativeHandle(ref, () => ({
      playMusic: () => {
        if (!audioRef.current) return;
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            
            removeListenersRef.current?.();
          })
          .catch((err) => console.log("Playback error dari kado:", err));
      },
    }));

  
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
  
    }, []);

  
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


    const buttonStyleClass = isDarkTheme
      ? "bg-gradient-to-br from-purple-900/90 via-violet-600/85 to-purple-500/80 border-purple-500/40 shadow-[0_0_0_1px_rgba(168,85,247,0.30),0_4px_24px_rgba(109,40,217,0.60),0_0_30px_rgba(168,85,247,0.40)]"
      : "bg-white/20 border-white/30 shadow-lg glass";

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
