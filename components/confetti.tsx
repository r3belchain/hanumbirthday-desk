"use client";

import { useEffect, useCallback } from "react";
import confetti from "canvas-confetti";

export function useConfetti() {
  const fireConfetti = useCallback(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 9999,
    };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#7a9e7e", "#b8c9b5", "#f5f3ef", "#d4a574", "#e8d5c4"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#7a9e7e", "#b8c9b5", "#f5f3ef", "#d4a574", "#e8d5c4"],
      });
    }, 250);
  }, []);

  const fireHearts = useCallback(() => {
    const defaults = {
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 20,
      shapes: ["heart" as unknown as confetti.Shape],
      colors: ["#7a9e7e", "#b8c9b5", "#d4a574", "#e8b4b8"],
      zIndex: 9999,
    };

    function shoot() {
      confetti({
        ...defaults,
        particleCount: 30,
        scalar: 1.2,
        origin: { x: 0.5, y: 0.5 },
      });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  }, []);

  return { fireConfetti, fireHearts };
}

export function ConfettiTrigger() {
  const { fireConfetti } = useConfetti();

  useEffect(() => {
    const timer = setTimeout(() => {
      fireConfetti();
    }, 500);

    return () => clearTimeout(timer);
  }, [fireConfetti]);

  return null;
}
