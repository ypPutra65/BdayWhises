"use client";

import React, { useState } from "react";
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

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);

    // After the 3D flap unfolds and the letter emerges, transition into the grand reveal
    setTimeout(() => {
      setHasEnteredExperience(true);
    }, 1900);
  };

  const handleScrollToLetter = () => {
    const letterEl = document.getElementById("birthday-letter");
    if (letterEl) {
      letterEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen bg-obsidian text-ivory overflow-hidden">
      {/* Floating ambient dust / particles across entire app */}
      <FloatingParticles count={35} />

      {/* Opening cinematic radial glow layer */}
      <OpeningAnimation isOpening={isOpen && !hasEnteredExperience} />

      {/* Music Player Controller */}
      <MusicPlayer autoPlayTrigger={isOpen} />

      <AnimatePresence mode="wait">
        {!hasEnteredExperience ? (
          /* SECTION 1: THE INVITATION (LOCKED ENVELOPE) */
          <motion.div
            key="envelope-stage"
            className="min-h-screen flex flex-col items-center justify-center px-4 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.08,
              filter: "blur(8px)",
              transition: { duration: 1.1, ease: [0.4, 0, 0.2, 1] },
            }}
          >
            {/* Ambient lighting behind envelope */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[520px] h-[320px] sm:h-[520px] bg-radial from-oxblood/80 via-burgundy/25 to-transparent blur-3xl pointer-events-none rounded-full" />

            {/* Editorial Title */}
            <div className="text-center mb-10 sm:mb-14">
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
            </div>

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
