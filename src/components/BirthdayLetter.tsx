"use client";

import React from "react";
import { motion } from "framer-motion";
import { birthdayData } from "@/data/birthday";
import { letterParagraphVariant } from "@/lib/animations";

export const BirthdayLetter: React.FC = () => {
  const { letter, chapter } = birthdayData;

  return (
    <section
      id="birthday-letter"
      className="relative min-h-screen py-24 sm:py-36 px-4 sm:px-6 flex items-center justify-center z-10 scroll-mt-12"
    >
      {/* Editorial Letter Card */}
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#181216]/95 to-[#110d0f]/98 backdrop-blur-xl border border-antique-gold/20 rounded-xl p-7 sm:p-14 md:p-18 shadow-2xl shadow-black/90 overflow-hidden">
        {/* Soft Background Monogram */}
        <div className="absolute right-6 bottom-6 pointer-events-none select-none text-[100px] sm:text-[150px] font-serif font-bold text-antique-gold/[0.025] leading-none">
          {chapter}
        </div>

        {/* Letter Top Masthead */}
        <motion.div
          variants={letterParagraphVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="flex items-center justify-between border-b border-antique-gold/15 pb-5 mb-10"
        >
          <span className="font-serif italic text-sm sm:text-base text-antique-gold/75">
            Bella
          </span>
          <span className="font-sans text-[10px] sm:text-xs tracking-[0.3em] uppercase text-antique-gold/50">
            Chapter XXII
          </span>
        </motion.div>

        {/* Salutation / Headline */}
        <motion.div
          variants={letterParagraphVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="mb-8"
        >
          <h3 className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-antique-gold font-normal">
            {letter.salutation}
          </h3>
        </motion.div>

        {/* Letter Paragraphs */}
        <div className="space-y-6 sm:space-y-7">
          {letter.paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              variants={letterParagraphVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              className="font-serif text-base sm:text-lg md:text-xl text-ivory/90 leading-relaxed sm:leading-loose tracking-wide text-left font-light"
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Sign-off & Signature */}
        <motion.div
          variants={letterParagraphVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          className="mt-12 sm:mt-16 pt-8 border-t border-antique-gold/15 flex flex-col items-end text-right"
        >
          <p className="font-serif italic text-sm sm:text-base text-ivory/60 mb-2">
            {letter.closing}
          </p>
          <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-antique-gold font-normal tracking-wide">
            {letter.signature}
          </p>
          <div className="w-12 h-[1px] bg-antique-gold/40 mt-3" />
        </motion.div>
      </div>

      {/* Downstream Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 text-center">
        <button
          onClick={() => {
            const galleryEl = document.getElementById("photo-gallery");
            if (galleryEl) {
              galleryEl.scrollIntoView({ behavior: "smooth" });
            }
          }}
          aria-label="Scroll down"
          className="group inline-flex flex-col items-center gap-1.5 text-antique-gold/50 hover:text-antique-gold transition-colors cursor-pointer"
        >
          <div className="w-[1px] h-8 bg-gradient-to-b from-antique-gold/50 to-transparent group-hover:h-11 transition-all duration-300" />
        </button>
      </div>
    </section>
  );
};
