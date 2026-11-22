"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { birthdayData } from "@/data/birthday";

interface BirthdayRevealProps {
  onScrollToLetter?: () => void;
}

const letterContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.25,
    },
  },
};

const letterCharVariants: Variants = {
  hidden: { opacity: 0, y: 25, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const BirthdayReveal: React.FC<BirthdayRevealProps> = ({ onScrollToLetter }) => {
  const line1 = "HAPPY BIRTHDAY";
  const line2 = "BELLA";

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-28 z-10 overflow-hidden">
      {/* 1. Dramatic Dark Red Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[650px] md:w-[850px] h-[340px] sm:h-[650px] md:h-[850px] bg-radial from-oxblood/80 via-burgundy/25 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] sm:w-[350px] h-[180px] sm:h-[350px] bg-deep-red/20 blur-2xl pointer-events-none rounded-full" />

      {/* 2. Editorial Overline (No AI-slop pill badge, no sparkles) */}
      <motion.div
        className="relative z-20 mb-8 flex items-center justify-center gap-4 text-antique-gold/75"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="w-8 sm:w-16 h-[1px] bg-antique-gold/30" />
        <span className="font-serif italic text-xs sm:text-sm tracking-[0.35em] uppercase text-antique-gold">
          {birthdayData.revealSubline}
        </span>
        <span className="w-8 sm:w-16 h-[1px] bg-antique-gold/30" />
      </motion.div>

      {/* 3. Staggered Cinematic Typography Reveal */}
      <div className="relative z-20 max-w-5xl mx-auto flex flex-col items-center">
        {/* Line 1: HAPPY BIRTHDAY */}
        <motion.div
          className="flex justify-center flex-wrap gap-x-2 sm:gap-x-4 mb-2 sm:mb-3"
          variants={letterContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {line1.split(" ").map((word, wordIndex) => (
            <span key={`w1-${wordIndex}`} className="inline-flex tracking-widest sm:tracking-[0.25em]">
              {word.split("").map((char, charIndex) => (
                <motion.span
                  key={`c1-${wordIndex}-${charIndex}`}
                  variants={letterCharVariants}
                  className="font-serif text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-ivory/90 font-light drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.div>

        {/* Line 2: BELLA */}
        <motion.div
          className="flex justify-center tracking-[0.2em] sm:tracking-[0.3em]"
          variants={letterContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {line2.split("").map((char, index) => (
            <motion.span
              key={`c2-${index}`}
              variants={letterCharVariants}
              className="font-serif text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] text-ivory font-bold drop-shadow-[0_6px_28px_rgba(120,30,48,0.7)] inline-block"
              style={{
                textShadow:
                  "0 0 40px rgba(120, 30, 48, 0.4), 0 0 80px rgba(74, 16, 29, 0.3)",
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* 4. Minimalist Hairline Accent */}
      <motion.div
        className="relative z-20 my-10 w-16 sm:w-28 h-[1px] bg-gradient-to-r from-transparent via-antique-gold/50 to-transparent"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1.1, delay: 1, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* 5. Intimate Editorial Subtitle */}
      <motion.p
        className="relative z-20 font-serif italic text-base sm:text-xl md:text-2xl text-ivory/80 max-w-xl mx-auto px-4 leading-relaxed font-light"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        “A celebration of your warmth, your grace, and the beautiful soul you are.”
      </motion.p>

      {/* 6. Minimalist Editorial Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer z-30 group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        onClick={onScrollToLetter}
        role="button"
        tabIndex={0}
        aria-label="Scroll down to read the letter"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onScrollToLetter?.();
          }
        }}
      >
        <span className="text-[10px] tracking-[0.35em] uppercase text-antique-gold/60 font-sans group-hover:text-antique-gold transition-colors">
          Scroll to Read
        </span>
        <div className="w-[1px] h-9 bg-gradient-to-b from-antique-gold/60 via-antique-gold/30 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
};
