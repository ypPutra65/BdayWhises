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
      className="relative min-h-screen py-24 sm:py-32 px-4 sm:px-6 flex items-center justify-center z-10 scroll-mt-12"
    >
      {/* Background card container with luxury parchment styling */}
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#181216]/90 to-[#120e10]/95 backdrop-blur-xl border border-antique-gold/25 rounded-2xl p-6 sm:p-12 md:p-16 shadow-2xl shadow-black/90 overflow-hidden">
        {/* Soft Background Watermark */}
        <div className="absolute right-4 bottom-4 pointer-events-none select-none text-[120px] sm:text-[180px] font-serif font-bold text-antique-gold/[0.03] leading-none">
          {chapter}
        </div>

        {/* Ornate Gold Corner Filigrees */}
        <div className="absolute top-3.5 left-3.5 w-5 h-5 border-t-2 border-l-2 border-antique-gold/40 rounded-tl-sm" />
        <div className="absolute top-3.5 right-3.5 w-5 h-5 border-t-2 border-r-2 border-antique-gold/40 rounded-tr-sm" />
        <div className="absolute bottom-3.5 left-3.5 w-5 h-5 border-b-2 border-l-2 border-antique-gold/40 rounded-bl-sm" />
        <div className="absolute bottom-3.5 right-3.5 w-5 h-5 border-b-2 border-r-2 border-antique-gold/40 rounded-br-sm" />

        {/* Inner subtle hairline border */}
        <div className="absolute inset-2 border border-antique-gold/10 rounded-xl pointer-events-none" />

        {/* Letter Header Stamp */}
        <motion.div
          variants={letterParagraphVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="flex items-center justify-between border-b border-antique-gold/15 pb-4 mb-8"
        >
          <span className="font-sans text-[10px] sm:text-xs tracking-[0.3em] uppercase text-antique-gold/80">
            Chapter XXII · Letter No. 22
          </span>
          <span className="font-serif italic text-xs sm:text-sm text-ivory/50">
            Personal & Confidential
          </span>
        </motion.div>

        {/* Salutation */}
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
        <div className="space-y-6">
          {letter.paragraphs.map((paragraph, index) => {
            const isFirst = index === 0;

            if (isFirst) {
              // Classic editorial Drop Cap for the opening paragraph
              const firstLetter = paragraph.charAt(0);
              const remainingText = paragraph.slice(1);

              return (
                <motion.p
                  key={index}
                  variants={letterParagraphVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-30px" }}
                  className="font-serif text-base sm:text-lg md:text-xl text-ivory/90 leading-relaxed sm:leading-loose tracking-wide text-left"
                >
                  <span className="float-left text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-antique-gold leading-none mr-3 pt-1 select-none">
                    {firstLetter}
                  </span>
                  {remainingText}
                </motion.p>
              );
            }

            return (
              <motion.p
                key={index}
                variants={letterParagraphVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                className="font-serif text-base sm:text-lg md:text-xl text-ivory/85 leading-relaxed sm:leading-loose tracking-wide text-left"
              >
                {paragraph}
              </motion.p>
            );
          })}
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
          <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-antique-gold font-medium tracking-wide">
            {letter.signature}
          </p>
          <div className="w-16 h-[1px] bg-gradient-to-l from-antique-gold/60 to-transparent mt-3" />
        </motion.div>
      </div>
    </section>
  );
};
