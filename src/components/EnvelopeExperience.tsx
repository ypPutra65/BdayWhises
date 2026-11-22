"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Envelope } from "./Envelope";
import { OpeningAnimation } from "./OpeningAnimation";
import { BirthdayReveal } from "./BirthdayReveal";
import { BirthdayLetter } from "./BirthdayLetter";
import { BirthdayCake } from "./BirthdayCake";
import { FinalScene } from "./FinalScene";
import { FloatingParticles } from "./FloatingParticles";
import { MusicPlayer } from "./MusicPlayer";
import { birthdayData } from "@/data/birthday";

export const EnvelopeExperience: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasEnteredExperience, setHasEnteredExperience] = useState<boolean>(false);

  // Strictly ensure music is stopped on page load
  useEffect(() => {
    const bgMusic = document.getElementById("bg-music") as HTMLAudioElement | null;
    if (bgMusic) {
      bgMusic.pause();
      bgMusic.currentTime = 0;
    }
  }, []);

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);

    // Audio starts playing automatically ONLY when user opens the envelope
    try {
      const bgMusic = document.getElementById("bg-music") as HTMLAudioElement | null;
      if (bgMusic) {
        bgMusic.currentTime = 0;
        bgMusic.volume = 0.75;
        bgMusic.play().catch((err) => {
          console.warn("Audio play on envelope open:", err);
        });
      }
    } catch (e) {
      console.warn("Audio trigger error:", e);
    }

    // After the envelope flap opens and the letter card glides up, transition into the grand reveal
    setTimeout(() => {
      setHasEnteredExperience(true);
    }, 2100);
  };

  const handleScrollToLetter = () => {
    const letterEl = document.getElementById("birthday-letter");
    if (letterEl) {
      letterEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen bg-obsidian text-ivory overflow-hidden">
      {/* Floating warm golden glowing embers & bokeh lights */}
      <FloatingParticles count={85} />

      {/* Opening cinematic radial glow layer */}
      <OpeningAnimation isOpening={isOpen && !hasEnteredExperience} />

      {/* Music Player Controller - only shown once envelope is opened */}
      <MusicPlayer showButton={isOpen} />

      <AnimatePresence mode="wait">
        {!hasEnteredExperience ? (
          /* SECTION 1: THE INVITATION (LOCKED ENVELOPE) - COMPLETELY SILENT */
          <motion.div
            key="envelope-stage"
            className="min-h-screen flex flex-col items-center justify-center px-4 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.06,
              filter: "blur(8px)",
              transition: { duration: 0.9, ease: [0.4, 0, 0.2, 1] },
            }}
          >
            {/* Ambient lighting behind envelope */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[520px] h-[320px] sm:h-[520px] bg-radial from-oxblood/80 via-burgundy/25 to-transparent blur-3xl pointer-events-none rounded-full" />

            {/* Editorial Title - Fades gently when envelope opens to allow letter card to take center stage */}
            <motion.div
              className="text-center mb-8 sm:mb-12"
              animate={{
                opacity: isOpen ? 0 : 1,
                y: isOpen ? -18 : 0,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.span
                className="block text-[11px] sm:text-xs font-serif italic tracking-[0.35em] uppercase text-antique-gold/75 mb-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Chapter XXII
              </motion.span>
              <motion.h1
                className="font-serif text-2xl sm:text-4xl text-ivory tracking-wider font-light"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                A Letter for Bella
              </motion.h1>
            </motion.div>

            {/* 3D Envelope Component */}
            <Envelope
              isOpen={isOpen}
              onOpen={handleOpenEnvelope}
              waxSealText={birthdayData.waxSealText}
              hintText={birthdayData.envelopeHint}
            />
          </motion.div>
        ) : (
          /* SECTION 2-5: GRAND REVEAL, LETTER, CAKE & FINAL WISH */
          <motion.div
            key="grand-experience"
            className="relative z-10 w-full"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Phase 2: Grand Reveal */}
            <BirthdayReveal onScrollToLetter={handleScrollToLetter} />

            {/* Phase 3: The Personal Letter */}
            <BirthdayLetter />

            {/* Phase 4: Interactive Birthday Cake & Wish */}
            <BirthdayCake />

            {/* Phase 5: Final Scene / Footer */}
            <FinalScene />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};
