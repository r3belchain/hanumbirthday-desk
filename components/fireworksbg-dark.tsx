"use client";

import { useEffect, useRef } from "react";

export function FireworksBackgroundNew() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<any[]>([]);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    particlesRef.current = [];

    const setupCanvas = () => {

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      dimensionsRef.current = { width: w, height: h };

      canvas.width = w * dpr;
      canvas.height = h * dpr;

      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.scale(dpr, dpr);
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      decay: number;
      color: string;
      friction: number;
      gravity: number;
      history: { x: number; y: number }[];
      historyLength: number;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 3;

        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.01;
        this.color = color;
        this.friction = 0.96;
        this.gravity = 0.1;
        this.history = [];
        this.historyLength = 5; 
      }

      update() {
        this.history.push({ x: this.x, y: this.y });
        if (this.history.length > this.historyLength) {
          this.history.shift();
        }

        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
      }

      draw(c: CanvasRenderingContext2D) {
        if (this.history.length === 0) return;
        c.save();
        c.globalAlpha = this.alpha;
        c.strokeStyle = this.color;
        c.lineWidth = 2.5; 
        c.lineCap = "round";
        c.lineJoin = "round";

        c.beginPath();
        c.moveTo(this.history[0].x, this.history[0].y);
        for (let i = 1; i < this.history.length; i++) {
          c.lineTo(this.history[i].x, this.history[i].y);
        }
        c.lineTo(this.x, this.y);
        c.stroke();
        c.restore();
      }
    }

    const createFirework = () => {

      if (particlesRef.current.length > 150) return;

      const { width, height } = dimensionsRef.current;
      if (width === 0 || height === 0) return;

      const x = Math.random() * (width * 0.8) + width * 0.1;
      const y = Math.random() * (height * 0.4) + height * 0.15;

      const colors = [
        "#FF0055",
        "#00FFCC",
        "#FFFF00",
        "#FF00FF",
        "#00FF00",
        "#FFFFFF",
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];


      const particleCount = window.innerWidth < 768 ? 25 : 40;

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(new Particle(x, y, color));
      }
    };


    let lastTime = 0;
    const fpsLimit = 1000 / 60; 

    const animate = (currentTime: number) => {

      if (currentTime - lastTime < fpsLimit) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime;

      const { width, height } = dimensionsRef.current;
      ctx.clearRect(0, 0, width, height);


      if (Math.random() < 0.05) {
        createFirework();
      }

      particlesRef.current = particlesRef.current.filter((p) => p.alpha > 0);

      particlesRef.current.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    setupCanvas();

    animationFrameRef.current = requestAnimationFrame(animate);


    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setupCanvas();
      }, 200);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-[1]"
      style={{
        background: "transparent",
        willChange: "transform", 
        transform: "translateZ(0)", 
      }}
    />
  );
}
