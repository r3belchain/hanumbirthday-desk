// components/fake-notification.tsx
"use client";

import { motion } from "framer-motion";

interface FakeNotificationProps {
  show: boolean;
}

export function FakeNotification({ show }: FakeNotificationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -100, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[100000] w-[90%] max-w-sm md:max-w-md pointer-events-none"
    >
      <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border border-black/5 dark:border-white/10 rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex items-start gap-3 pointer-events-auto select-none">
        <div className="flex-none w-11 h-11 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800 shadow-sm border border-black/10 dark:border-white/10 aspect-square">
          <img
            src="/profil.jpg"
            alt="mfatxt Profile"
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
              Instagram
            </span>
            <span className="text-[10px] text-zinc-400 whitespace-nowrap">
              sekarang
            </span>
          </div>
          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">
            mfatxt
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-snug break-words">
            Doa baiknya udah sampe di aku, makasii ☺️. Maaf yaa klo belum
            sempurnaa... 
          </p>
        </div>
      </div>
    </motion.div>
  );
}
