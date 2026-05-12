"use client";

import { ConfettiTrigger } from "@/components/confetti";
import { CTASection } from "@/components/cta-section";
import { FireworksBackground } from "@/components/fireworksbg";
import { Footer } from "@/components/footer";
import { FriendsGallerySection } from "@/components/friends-gallery-section";
import { GallerySection } from "@/components/gallery-section";
import { HeroSection } from "@/components/hero-section";
import { MessageSection } from "@/components/message-section";
import { MusicNotice } from "@/components/music-notice";
import { MusicToggle } from "@/components/music-toggle";
import { PreLoader } from "@/components/pre-loader";
import { TimelineCards } from "@/components/timeline-cards";
import { useState } from "react";

export default function BirthdayPage() {
  const [isReady, setIsReady] = useState(false);

  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden selection:bg-primary/20">
      <PreLoader onComplete={() => setIsReady(true)} />

      <FireworksBackground />
      {isReady && <ConfettiTrigger />}

      <MusicToggle />

      <div className="relative z-10 flex flex-col gap-0">
        <MusicNotice />
        <HeroSection />

        <div className="relative space-y-12 md:space-y-24 pb-20">
          <MessageSection />
          <GallerySection />
          <FriendsGallerySection />
          <TimelineCards />
          <CTASection />
        </div>

        <Footer />
      </div>

      <div className="fixed inset-0 pointer-events-none bg-background/20 mix-blend-multiply z-2" />
    </main>
  );
}
