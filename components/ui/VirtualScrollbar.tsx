"use client";
import { useEffect, useRef, useCallback } from "react";

// Warna diambil langsung dari global.css — tidak perlu getComputedStyle
// Light: dari --primary-raw: 0.55 0.12 145 (sage green)
// Dark:  dari .dark ::-webkit-scrollbar-thumb di global.css (purple)
const COLORS = {
  light: {
    normal: "oklch(0.55 0.12 145 / 0.15)",
    active: "oklch(0.55 0.12 145 / 0.35)",
  },
  dark: {
    normal: "oklch(0.6 0.2 300 / 0.4)",
    active: "oklch(0.6 0.2 300 / 0.6)",
  },
} as const;

export function VirtualScrollbar() {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const isHovered = useRef(false);

  // ─── Warna Thumb ─────────────────────────────────────────────────────────
  // Cek langsung classList — tidak bergantung pada CSS variable resolution
  const updateThumbColor = useCallback(() => {
    const thumb = thumbRef.current;
    if (!thumb) return;

    const isDark = document.documentElement.classList.contains("dark");
    const isActive = isDragging.current || isHovered.current;
    const palette = isDark ? COLORS.dark : COLORS.light;

    thumb.style.backgroundColor = isActive ? palette.active : palette.normal;
  }, []);

  // ─── Posisi Thumb — Direct DOM, no useState ───────────────────────────────
  const updateThumbPosition = useCallback(() => {
    const thumb = thumbRef.current;
    const track = trackRef.current;
    if (!thumb || !track) return;

    const totalScrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    if (totalScrollable <= 0) return;

    const progress = window.scrollY / totalScrollable;
    const maxTranslate = track.clientHeight - thumb.clientHeight;

    thumb.style.transform = `translateY(${progress * maxTranslate}px)`;
  }, []);

  // ─── Scroll Listener ──────────────────────────────────────────────────────
  useEffect(() => {
    window.addEventListener("scroll", updateThumbPosition, { passive: true });
    updateThumbPosition();
    return () => window.removeEventListener("scroll", updateThumbPosition);
  }, [updateThumbPosition]);

  // ─── MutationObserver — deteksi classList.add("dark") dari tombol CTA ─────
  useEffect(() => {
    const observer = new MutationObserver(updateThumbColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    updateThumbColor(); // set warna awal
    return () => observer.disconnect();
  }, [updateThumbColor]);

  // ─── Drag ─────────────────────────────────────────────────────────────────
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current || !trackRef.current || !thumbRef.current) return;
    e.preventDefault();

    const trackRect = trackRef.current.getBoundingClientRect();
    const thumbHeight = thumbRef.current.clientHeight;
    const trackHeight = trackRect.height - thumbHeight;

    let y = e.clientY - trackRect.top - thumbHeight / 2;
    y = Math.max(0, Math.min(y, trackHeight));

    const totalScrollable =
      document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: (y / trackHeight) * totalScrollable,
      behavior: "auto",
    });
  }, []);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    document.body.style.userSelect = "";
    updateThumbColor();
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  }, [handleMouseMove, updateThumbColor]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      isDragging.current = true;
      document.body.style.userSelect = "none";
      updateThumbColor();
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    },
    [handleMouseMove, handleMouseUp, updateThumbColor],
  );

  return (
    <div
      ref={trackRef}
      className="fixed right-0 top-0 bottom-0 w-6 z-[9999] flex items-start justify-center py-1 cursor-none"
      onMouseEnter={() => {
        isHovered.current = true;
        updateThumbColor();
      }}
      onMouseLeave={() => {
        isHovered.current = false;
        updateThumbColor();
      }}
    >
      <div
        ref={thumbRef}
        className="w-[5px] rounded-full"
        style={{
          height: "12vh",
          willChange: "transform",
          transition: "background-color 0.4s ease",
        }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}
