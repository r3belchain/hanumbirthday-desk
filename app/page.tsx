"use client";

import { ConfettiTrigger } from "@/components/confetti";
import { ConstellationTimeline } from "@/components/constellation-timeline"; 
import { CTASection } from "@/components/cta-section";
import { FireworksBackground } from "@/components/fireworksbg";
import { Footer } from "@/components/footer";
import { FriendsGallerySection } from "@/components/friends-gallery-section";
import { GallerySection } from "@/components/gallery-section";
import GiftIntro from "@/components/giftIntro";
import { HanumAiChat } from "@/components/hanumAiChat";
import { HeroSection } from "@/components/hero-section";
import { LoveBackground } from "@/components/love-bg";
import { MessageSection } from "@/components/message-section";
import { MusicToggle } from "@/components/music-toggle";
import { PreLoader } from "@/components/pre-loader";
import { useEffect, useRef, useState } from "react";

export default function BirthdayPage() {
  const [isReady, setIsReady] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);
  const [showLoveBg, setShowLoveBg] = useState(false);

  const musicRef = useRef<{ playMusic: () => void } | null>(null);
  const popSoundRef = useRef<HTMLAudioElement | null>(null);
  const hasPopped = useRef(false);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  const handleOpenGift = () => {
    setGiftOpened(true);
    if (musicRef.current) {
      musicRef.current.playMusic();
    }
  };

  const handlePreloaderComplete = () => {
    setIsReady(true);

    if (!hasPopped.current) {
      setTimeout(() => {
        if (popSoundRef.current) {
          popSoundRef.current.currentTime = 0;
          popSoundRef.current.volume = 0.7;
          popSoundRef.current
            .play()
            .then(() => {
              hasPopped.current = true;
            })
            .catch((err) => console.log("Gagal putar mercon:", err));
        }
      }, 350);
    }
  };

  const handleCtaClick = () => {
    setShowLoveBg(true);
  };

  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden isolate">
      <audio ref={popSoundRef} src="/mercon.mp3" preload="auto" />

      <GiftIntro onOpen={handleOpenGift} />

      <div className={giftOpened ? "contents" : "hidden"}>
        <MusicToggle ref={musicRef} isDarkTheme={showLoveBg} />
      </div>

      {giftOpened && <PreLoader onComplete={handlePreloaderComplete} />}

      {showLoveBg && <LoveBackground />}
      {isReady && <FireworksBackground />}

      {isReady && (
        <div
          className={`relative z-10 flex flex-col transition-colors duration-1000 ${showLoveBg ? "dark theme-dark" : "theme-light"}`}
        >
          <ConfettiTrigger />

          <div className="relative">
            <HeroSection isDarkTheme={showLoveBg} />
            <div className="relative space-y-12 md:space-y-24 pb-20">
              <MessageSection />
              <GallerySection isDarkTheme={showLoveBg} />
              <FriendsGallerySection />

              <ConstellationTimeline isDarkTheme={showLoveBg} />

              <CTASection onClick={handleCtaClick} />
            </div>
            <Footer isDarkTheme={showLoveBg} />
          </div>
          <HanumAiChat isDarkTheme={showLoveBg} />
        </div>
      )}

      <div className="fixed inset-0 pointer-events-none bg-background/20 mix-blend-multiply z-[2]" />
    </main>
  );
}
