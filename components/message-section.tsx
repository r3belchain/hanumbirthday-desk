"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface TypewriterProps {
  text: string;
  delay?: number;
  speed?: number;
  startTrigger?: boolean;
}

export function Typewriter({
  text,
  delay = 0,
  speed = 10,
  startTrigger = false,
}: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (startTrigger) {
      const startTimer = setTimeout(() => {
        setStarted(true);
      }, delay);
      return () => clearTimeout(startTimer);
    }
  }, [delay, startTrigger]);

  useEffect(() => {
    if (!started) return;

    if (currentIndex < text.length) {
      const minSpeed = Math.max(1, speed - 5);
      const maxSpeed = speed + 2;
      const randomSpeed =
        Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed;

      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, randomSpeed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed, started]);

  return (
    <span className="inline">
      {displayedText}
      {currentIndex < text.length && started && (
        <motion.span
          className="inline-block w-1.5 h-[1.1em] bg-primary ml-1 translate-y-[0.1em]"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.4, repeat: Infinity }}
        />
      )}
    </span>
  );
}

// Komponen Pembungkus Paragraf Mandiri (Mengisolasi Animasi Tiap Paragraf)
function MessageCard({
  text,
  index,
  title,
}: {
  text: string;
  index: number;
  title?: string;
}) {
  const cardRef = useRef(null);
  // once: false agar ketika di-scroll naik-turun, transisinya hidup kembali
  const isCardInView = useInView(cardRef, { once: false, margin: "-120px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, margin: "-120px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-2xl mx-auto mb-16 last:mb-0 relative group"
    >
      {/* Efek Border Glow Tipis Berubah Warna Saat Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      <div className="relative glass border border-white/10 dark:border-white/5 rounded-3xl p-6 md:p-10 shadow-xl backdrop-blur-xl transition-all duration-500 group-hover:translate-y-[-4px]">
        {title && (
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary/70">
              {title}
            </span>
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500/40" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/40" />
              <span className="w-2 h-2 rounded-full bg-green-500/40" />
            </div>
          </div>
        )}

        <div className="font-sans text-foreground/90 text-base md:text-lg leading-relaxed whitespace-pre-line min-h-[4rem]">
          {/* Efek Typewriter dipicu secara independen saat card ini masuk viewport */}
          <Typewriter
            text={text}
            delay={300}
            speed={15} // Dipercepat sedikit biar kenyamanan membaca terjaga
            startTrigger={isCardInView}
          />
        </div>
      </div>
    </motion.div>
  );
}

export function MessageSection() {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: false });

  // Kita pecah array string-nya berdasarkan paragraf asli teks kamu
  const paragraphs = [
    `Aku sengaja membuat ini sebagai bentuk apresiasi dan ucapan selamat. Yaa.. tapi ya sudah lah yaa, intinya aku ingin merayakan hari spesial ini dengan cara yang sedikit berbeda—cara yang sekarang aku bisa. 😊`,

    `Semoga di usia ke-20 ini, langkahmu selalu dimudahkan, mimpi-mimpimu menemukan jalannya, dan kamu tetap memegang kendali atas kebahagiaanmu sendiri, apapun pilihannya.`,

    `Pada dasarnya, ngga ada manusia yang sempurna dan murni baik. Adanya manusia yang mencoba "terlihat sempurna" dan berusaha untuk lebih baik. Semoga kamu selalu dikelilingi oleh manusia-manusia yang tidak hanya menerima kekuranganmu, tapi juga bisa buat diri kamu improve.`,

    `Selamat menginjak fase di mana segala hal terasa penuh dengan ketidakpastian, kekhawatiran, dan kekalutan. Kepala yang bising, keputusan-keputusan yang seringkali kita sesali, sementara usia terus bertambah, waktu tak dapat dikembalikan, dan momen tak bisa diulang. Sehat dan gembira selaluu...`,
  ];

  const subTitles = [
    "LOG // 01. APRESIASI",
    "LOG // 02. HARAPAN",
    "LOG // 03. REFLEKSI diri",
    "LOG // 04. SEBUAH REALITA",
  ];

  return (
    <section
      id="message-section"
      className="py-32 px-4 scroll-mt-20 relative bg-transparent w-full min-h-screen flex flex-col items-center justify-center"
    >
      {/* Judul Section Utama */}
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={isTitleInView ? { opacity: 1, filter: "blur(0px)" } : {}}
        transition={{ duration: 1 }}
        className="text-center mb-20 select-none"
      >
        <span className="text-xs tracking-[0.4em] uppercase text-muted-foreground/60 block mb-3">
          catatan kecil
        </span>
        <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-foreground">
          Judulnya apa
        </h2>
      </motion.div>

      {/* Kontainer Utama Penguras Scroll Paragraf */}
      <div className="w-full max-w-4xl flex flex-col items-center">
        {paragraphs.map((para, index) => (
          <MessageCard
            key={index}
            text={para}
            index={index}
            title={subTitles[index]}
          />
        ))}
      </div>
    </section>
  );
}
