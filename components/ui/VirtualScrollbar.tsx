"use client";
import { useCallback, useEffect, useRef } from "react";

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

interface VirtualScrollbarProps {
  /**
   * LOCAL MODE — isi dengan scrollRef div container (misal: ConstellationCanvas).
   * Scrollbar akan mengontrol div ini, bukan window.
   *
   * GLOBAL MODE — biarkan kosong (undefined).
   * Scrollbar mengontrol window, persis seperti semula.
   */
  containerRef?: React.RefObject<HTMLDivElement | null>;

  /**
   * Hanya untuk LOCAL MODE.
   * Override warna langsung dari state, tidak perlu baca classList.
   */
  isDarkTheme?: boolean;
}

export function VirtualScrollbar({
  containerRef,
  isDarkTheme,
}: VirtualScrollbarProps = {}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const isHovered = useRef(false);

  // Nilai ini stabil — hanya berubah jika prop containerRef berubah dari/ke undefined,
  // yang tidak terjadi dalam penggunaan normal (prop tidak berubah setelah mount).
  const isLocalMode = containerRef !== undefined;

  // ─── updateThumbColor ────────────────────────────────────────────────────
  // Dipisah dari isDarkTheme agar tidak membuat referensi baru tiap re-render.
  // Membaca isDarkTheme lewat closure, bukan dependency.
  const updateThumbColor = useCallback(() => {
    const thumb = thumbRef.current;
    if (!thumb) return;

    // Local mode: gunakan prop isDarkTheme. Global mode: baca classList.
    const dark =
      isDarkTheme !== undefined
        ? isDarkTheme
        : document.documentElement.classList.contains("dark");

    const palette = dark ? COLORS.dark : COLORS.light;
    const isActive = isDragging.current || isHovered.current;
    thumb.style.backgroundColor = isActive ? palette.active : palette.normal;
    // isDarkTheme disertakan agar warna update saat prop berubah (misal animasi tema)
  }, [isDarkTheme]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── updateThumbPosition ─────────────────────────────────────────────────
  const updateThumbPosition = useCallback(() => {
    const thumb = thumbRef.current;
    const track = trackRef.current;
    if (!thumb || !track) return;

    let progress = 0;
    if (isLocalMode && containerRef?.current) {
      const el = containerRef.current;
      const total = el.scrollHeight - el.clientHeight;
      if (total <= 0) return;
      progress = el.scrollTop / total;
    } else {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      progress = window.scrollY / total;
    }

    const maxTranslate = track.clientHeight - thumb.clientHeight;
    thumb.style.transform = `translateY(${progress * maxTranslate}px)`;
  }, [isLocalMode, containerRef]);

  // ─── updateVisibility (HANYA global mode) ────────────────────────────────
  // Didefinisikan di luar useEffect agar tidak ada fungsi setelah `return`.
  // Sembunyikan global scrollbar saat ConstellationCanvas terbuka.
  const updateVisibility = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const hidden =
      document.documentElement.classList.contains("constellation-open");
    track.style.opacity = hidden ? "0" : "1";
    track.style.pointerEvents = hidden ? "none" : "auto";
  }, []);

  // ─── Scroll listener ──────────────────────────────────────────────────────
  useEffect(() => {
    if (isLocalMode) {
      const el = containerRef?.current;
      if (!el) return;
      el.addEventListener("scroll", updateThumbPosition, { passive: true });
      updateThumbPosition();
      return () => el.removeEventListener("scroll", updateThumbPosition);
    }
    // Global mode
    window.addEventListener("scroll", updateThumbPosition, { passive: true });
    updateThumbPosition();
    return () => window.removeEventListener("scroll", updateThumbPosition);
  }, [isLocalMode, containerRef, updateThumbPosition]);

  // ─── MutationObserver & visibility ───────────────────────────────────────
  useEffect(() => {
    // Local mode: tidak butuh observer — warna datang dari prop isDarkTheme.
    // Cukup sinkronisasi warna saat prop berubah.
    if (isLocalMode) {
      updateThumbColor();
      return; // tidak ada cleanup yang dibutuhkan
    }

    // Global mode: pantau perubahan class di <html>
    // untuk dark mode dan constellation-open.
    const onClassChange = () => {
      updateThumbColor();
      updateVisibility();
    };

    const observer = new MutationObserver(onClassChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Set state awal
    updateThumbColor();
    updateVisibility();

    return () => observer.disconnect();
  }, [isLocalMode, updateThumbColor, updateVisibility]);
  // ─────────────────────────────────────────────────────────────────────────

  // ─── Drag ─────────────────────────────────────────────────────────────────
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging.current || !trackRef.current || !thumbRef.current) return;
      e.preventDefault();

      const trackRect = trackRef.current.getBoundingClientRect();
      const thumbHeight = thumbRef.current.clientHeight;
      const usable = trackRect.height - thumbHeight;

      let y = e.clientY - trackRect.top - thumbHeight / 2;
      y = Math.max(0, Math.min(y, usable));
      const ratio = y / usable;

      if (isLocalMode && containerRef?.current) {
        const el = containerRef.current;
        el.scrollTop = ratio * (el.scrollHeight - el.clientHeight);
      } else {
        const total =
          document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({ top: ratio * total, behavior: "auto" });
      }
    },
    [isLocalMode, containerRef],
  );

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

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div
      ref={trackRef}
      className={
        isLocalMode
          ? // Local: absolute dalam parent yang position:relative
            "absolute right-0 top-0 bottom-0 w-4 z-10 flex items-start justify-center py-1 cursor-none"
          : // Global: tetap fixed ke viewport seperti semula
            "fixed right-0 top-0 bottom-0 w-6 z-[9999] flex items-start justify-center py-1 cursor-none"
      }
      style={{ transition: "opacity 0.3s ease" }}
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
