"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { birthdayData } from "@/data/birthday";

interface BirthdayRevealProps {
  onScrollToLetter?: () => void;
}

const letterContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.3,
    },
  },
};

const letterCharVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const BirthdayReveal: React.FC<BirthdayRevealProps> = ({ onScrollToLetter }) => {
  const line1 = "HAPPY BIRTHDAY";
  const line2 = "BELLA";

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 z-10 overflow-hidden">
      {/* 1. Dramatic Red / Oxblood Lighting Spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[650px] md:w-[850px] h-[340px] sm:h-[650px] md:h-[850px] bg-radial from-oxblood/80 via-burgundy/25 to-transparent blur-3xl pointer-events-none rounded-full animate-pulse-subtle" />

      {/* 2. Secondary Deep Red Core Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] sm:w-[350px] h-[180px] sm:h-[350px] bg-deep-red/20 blur-2xl pointer-events-none rounded-full" />

      {/* 3. Vignette Border */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(9, 8, 9, 0.85) 100%)",
        }}
      />

      {/* 4. Age Identity Badge: CHAPTER XXII */}
      <motion.div
        className="relative z-20 mb-6 inline-flex items-center gap-3 px-5 py-2 rounded-full border border-antique-gold/30 bg-surface-dark/70 backdrop-blur-md shadow-lg shadow-black/60"
        initial={{ opacity: 0, scale: 0.9, y: -25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Sparkles className="w-3.5 h-3.5 text-antique-gold animate-pulse" />
        <span className="font-sans text-[11px] sm:text-xs tracking-[0.35em] uppercase text-antique-gold font-medium">
          {birthdayData.revealSubline}
        </span>
        <Sparkles className="w-3.5 h-3.5 text-antique-gold animate-pulse" />
      </motion.div>

      {/* 5. Staggered Cinematic Typography Reveal */}
      <div className="relative z-20 max-w-5xl mx-auto flex flex-col items-center">
        {/* Line 1: HAPPY BIRTHDAY */}
        <motion.div
          className="flex justify-center flex-wrap gap-x-2 sm:gap-x-4 mb-2 sm:mb-4"
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

      {/* 6. Gold Accent Line Divider */}
      <motion.div
        className="relative z-20 flex items-center justify-center gap-3 my-8 w-full max-w-xs sm:max-w-md mx-auto"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 1.1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-antique-gold/60" />
        <span className="text-antique-gold text-xs">✦</span>
        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-antique-gold/60" />
      </motion.div>

      {/* 7. Intimate Editorial Subtitle */}
      <motion.p
        className="relative z-20 font-serif italic text-lg sm:text-2xl md:text-3xl text-ivory/80 max-w-2xl mx-auto px-4 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
      >
        “A celebration of your warmth, your grace, and the beautiful soul you are.”
      </motion.p>

      {/* 8. Smooth Scroll Indicator to Letter */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-30 group"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
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
        <span className="text-[10px] tracking-[0.3em] uppercase text-antique-gold/80 font-sans group-hover:text-antique-gold transition-colors">
          Read Your Letter
        </span>
        <div className="w-8 h-8 rounded-full border border-antique-gold/25 flex items-center justify-center group-hover:border-antique-gold/60 transition-colors bg-surface-dark/40 backdrop-blur-sm">
          <ChevronDown className="w-4 h-4 text-antique-gold/70 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};
