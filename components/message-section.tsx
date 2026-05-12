"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface TypewriterProps {
  text: string;
  delay?: number;
  speed?: number; // Kita gunakan ini sebagai nilai dasar (default 20)
  startTrigger?: boolean;
}

export function Typewriter({
  text,
  delay = 0,
  speed = 20,
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
      const randomSpeed =
        Math.floor(Math.random() * (speed + 20 - (speed - 10) + 1)) +
        (speed - 10);

      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, randomSpeed);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text, speed, started]);

  return (
    <span>
      {displayedText}
      {currentIndex < text.length && started && (
        <motion.span
          className="inline-block w-0.5 h-6 bg-primary ml-1"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </span>
  );
}

export function MessageSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const message = `Aku sengaja membuat ini sebagai bentuk apresiasi dan ucapan selamat saja. Yaa.. tapi ya sudah lah yaa, intinya aku ingin merayakan hari kelahiranmu dengan cara yang sedikit berbeda—cara yang sekarang aku bisa. 😊

Semoga di usia ke-20 ini, langkahmu selalu dimudahkan, mimpi-mimpimu tercapai, dan kamu selalu menemukan kebahagiaan apapun pilihan kamu. Suatu saat jika memang ketetapan ngga berpihak pada harapanku, semoga kamu bisa dapat "teman hidup" ideal yang kamu inginkan. Yang menerimamu apa adanya. Yang ngga menyalahkanmu, saat kamu ngga sempurna. Yang bisa meningkatkan nilai dirinya dan memaksimalkan upayanya, demi kamu.

Pada dasarnya, ngga ada manusia yang sempurna dan murni baik. Adanya manusia yang mencoba "terlihat sempurna" dan berusaha untuk lebih baik.

Selamat menginjak umur di mana segala hal terasa penuh dengan ketidakpastian, kekhawatiran, dan kekalutan. Kepala yang bising, sementara usia terus bertambah, waktu tak dapat dikembalikan, dan momen tak bisa diulang. Sehat dan gembira selaluu...`;

  return (
    <section
      id="message-section"
      ref={sectionRef}
      className="py-24 px-4 scroll-mt-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto"
      >
        <div className="glass rounded-3xl p-8 md:p-12 shadow-xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-center mb-8"
          >
            <span className="text-sm tracking-[0.3em] uppercase text-muted-foreground">
              Catatan Kecil
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mt-4">
              Bingung Kasih Judul
            </h2>
          </motion.div>

          <div className="font-sans text-foreground/80 text-lg leading-relaxed whitespace-pre-line min-h-75">
            <Typewriter
              text={message}
              delay={500}
              speed={30}
              startTrigger={isInView}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
