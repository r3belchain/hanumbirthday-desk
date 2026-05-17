"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface TimeCard {
  title: string;
  subtitle: string;
  message: string;
  icon: string;
}

const timeCards: TimeCard[] = [
  {
    title: "Past Memory",
    subtitle: "Yang telah berlalu",
    message: `Aku masih anak kecil yang belum paham saat itu, aku ngga pernah membayangkan sampai segininya. Tapi bagiku, setiap fragmen memori yang tersisa adalah bagian dari cerita yang membentuk siapa aku hari ini. A lot. Mungkin bagi kamu aku halusinasi, tapi "kedalaman" itu nyata.`,
    icon: "📽️",
  },
  {
    title: "Nowadays",
    subtitle: "Titik hari ini",
    message:
      "Melihatmu mencapai usia 20 tahun adalah hal yang luar biasa. Kamu tumbuh. Hari ini bukan lagi soal masa lalu, tapi tentang mengapresiasi dan menghargai masa sekarang.",
    icon: "📷",
  },
  {
    title: "The Future",
    subtitle: "Langkah ke depan",
    message:
      "Menghadapi dunia di depan yang penuh dengan variabel kemungkinan dan tanda tanya, seperti katamu, yang bisa dilakukan hanyalah mengupayakan semaksimal mungkin hal yang bisa dilakukan sekarang. Penyesalan karena tidak mencoba itu lebih sakit dan mahal daripada penyesalan atas 'percobaan yang belum berhasil'. Apa pun jalannya, dan siapa pun yang menemanimu nanti, semoga kamu diberikan kemudahan.",
    icon: "📺",
  },
];

function TimeCardItem({ card, index }: { card: TimeCard; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
    >
      <motion.div
        className={`glass rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 bg-white/10 backdrop-blur-md border border-white/20 ${
          isExpanded ? "shadow-2xl" : "shadow-lg"
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: isExpanded ? 1 : 1.02 }}
        layout
      >
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-3xl">{card.icon}</span>
            <div>
              <h3 className="font-serif text-2xl text-foreground">
                {card.title}
              </h3>
              <p className="text-sm text-muted-foreground">{card.subtitle}</p>
            </div>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="pt-4 border-t border-border/50">
                  <p className="text-foreground/80 leading-relaxed italic">
                    "{card.message}"
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.p
            className="text-xs tracking-widest text-primary mt-4 text-center uppercase"
            animate={{ opacity: isExpanded ? 0 : 1 }}
          >
            {isExpanded ? "" : "Tap to open"}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function TimelineCards() {
  return (
    <section className="py-24 px-4 bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <span className="text-xs md:text-sm tracking-[0.3em] uppercase text-muted-foreground">
          Refleksi Perjalanan
        </span>
        <h2 className="font-serif text-4xl md:text-6xl text-foreground mt-4">
          Dulu, Kini, & Nanti
        </h2>
      </motion.div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
        {timeCards.map((card, index) => (
          <TimeCardItem key={card.title} card={card} index={index} />
        ))}
      </div>
    </section>
  );
}
