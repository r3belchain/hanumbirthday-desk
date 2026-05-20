// "use client";

// import confetti from "canvas-confetti";
// import { useCallback, useEffect } from "react";

// export function useConfetti() {
//   const fireConfetti = useCallback(() => {
//     const duration = 3000;
//     const animationEnd = Date.now() + duration;
//     const defaults = {
//       startVelocity: 30,
//       spread: 360,
//       ticks: 60,
//       zIndex: 9999,
//     };

//     function randomInRange(min: number, max: number) {
//       return Math.random() * (max - min) + min;
//     }

//     const interval = setInterval(function () {
//       const timeLeft = animationEnd - Date.now();

//       if (timeLeft <= 0) {
//         return clearInterval(interval);
//       }

//       const particleCount = 50 * (timeLeft / duration);

//       confetti({
//         ...defaults,
//         particleCount,
//         origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
//         colors: ["#7a9e7e", "#b8c9b5", "#f5f3ef", "#d4a574", "#e8d5c4"],
//       });
//       confetti({
//         ...defaults,
//         particleCount,
//         origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
//         colors: ["#7a9e7e", "#b8c9b5", "#f5f3ef", "#d4a574", "#e8d5c4"],
//       });
//     }, 250);
//   }, []);

//   const fireHearts = useCallback(() => {
//     const defaults = {
//       spread: 360,
//       ticks: 100,
//       gravity: 0,
//       decay: 0.94,
//       startVelocity: 20,
//       shapes: ["heart" as unknown as confetti.Shape],
//       colors: ["#7a9e7e", "#b8c9b5", "#d4a574", "#e8b4b8"],
//       zIndex: 9999,
//     };

//     function shoot() {
//       confetti({
//         ...defaults,
//         particleCount: 30,
//         scalar: 1.2,
//         origin: { x: 0.5, y: 0.5 },
//       });
//     }

//     setTimeout(shoot, 0);
//     setTimeout(shoot, 100);
//     setTimeout(shoot, 200);
//   }, []);

//   return { fireConfetti, fireHearts };
// }

// export function ConfettiTrigger() {
//   const { fireConfetti } = useConfetti();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       fireConfetti();
//     }, 50);

//     return () => clearTimeout(timer);
//   }, [fireConfetti]);

//   return null;
// }
"use client";

import confetti from "canvas-confetti";
import { useCallback, useEffect } from "react";

export function useConfetti() {
  const fireConfetti = useCallback(() => {
    const duration = 3000; // Durasi semburan (3 detik)
    const animationEnd = Date.now() + duration;

    const frame = () => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return; // Berhenti jika sudah 3 detik
      }

      // Semburan kontinu dari Samping Kiri (Menembak ke kanan atas)
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.9 },
        colors: ["#7a9e7e", "#b8c9b5", "#f5f3ef", "#d4a574", "#e8d5c4"],
        zIndex: 9999,
      });

      // Semburan kontinu dari Samping Kanan (Menembak ke kiri atas)
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.9 },
        colors: ["#7a9e7e", "#b8c9b5", "#f5f3ef", "#d4a574", "#e8d5c4"],
        zIndex: 9999,
      });

      // Melanjutkan loop animasi di frame berikutnya
      requestAnimationFrame(frame);
    };

    // Jalankan semburan samping
    frame();

    // Ditambah 1x letupan besar instan di tengah layar sebagai kejutan pembuka
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

// Komponen pemicu otomatis saat di-render
export function ConfettiTrigger() {
  const { fireConfetti } = useConfetti();

  useEffect(() => {
    const timer = setTimeout(() => {
      fireConfetti();
    }, 200); // Diberi jeda sedikit agar transisi preloader selesai dulu

    return () => clearTimeout(timer);
  }, [fireConfetti]);

  return null;
}