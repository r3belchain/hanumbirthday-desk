"use client";

import confetti from "canvas-confetti";
import { useCallback, useEffect } from "react";

export function useConfetti() {
  const fireConfetti = useCallback(() => {
    const duration = 3000; 
    const animationEnd = Date.now() + duration;

    const frame = () => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return; 
      }

     
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.9 },
        colors: ["#7a9e7e", "#b8c9b5", "#f5f3ef", "#d4a574", "#e8d5c4"],
        zIndex: 9999,
      });

     
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.9 },
        colors: ["#7a9e7e", "#b8c9b5", "#f5f3ef", "#d4a574", "#e8d5c4"],
        zIndex: 9999,
      });

      
      requestAnimationFrame(frame);
    };


    frame();

    
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { x: 0.5, y: 0.6 },
      colors: ["#7a9e7e", "#b8c9b5", "#f5f3ef", "#d4a574", "#e8d5c4"],
      zIndex: 9999,
    });
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
    }, 200); 

    return () => clearTimeout(timer);
  }, [fireConfetti]);

  return null;
}