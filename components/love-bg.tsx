"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const LoveBackground = () => {
  const [hearts, setHearts] = useState<
    { id: number; x: number; size: number; duration: number }[]
  >([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * (20 - 12) + 12,
      duration: Math.random() * (6 - 4) + 4,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#0a020f]">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/30 via-black to-black" />

      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: "110vh", opacity: 0, x: `${heart.x}vw` }}
          animate={{
            y: "-10vh",
            opacity: [0, 0.4, 0.4, 0],

            x: [`${heart.x}vw`, `${heart.x + (Math.random() * 4 - 2)}vw`],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
          className="absolute pointer-events-none"
          style={{ fontSize: heart.size }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
};
