"use client";

import React from "react";
import { birthdayData } from "@/data/birthday";

export const FinalScene: React.FC = () => {
  return (
    <footer className="relative py-24 px-6 text-center z-10 border-t border-antique-gold/15 bg-gradient-to-t from-black via-surface-dark/40 to-transparent">
      <div className="max-w-md mx-auto space-y-5">
        <div className="flex items-center justify-center gap-4">
          <div className="w-12 sm:w-16 h-[1px] bg-antique-gold/25" />
          <span className="font-serif italic text-xs tracking-[0.35em] text-antique-gold/60">
            XXII
          </span>
          <div className="w-12 sm:w-16 h-[1px] bg-antique-gold/25" />
        </div>

        <p className="font-serif italic text-base sm:text-lg text-ivory/75 font-light">
          Happy 22nd Birthday, {birthdayData.recipient}.
        </p>

        <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-antique-gold/45">
          Bella · Chapter XXII · With Love, Putra
        </p>
      </div>
    </footer>
  );
};
