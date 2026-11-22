"use client";

import React from "react";
import { birthdayData } from "@/data/birthday";
import { Heart } from "lucide-react";

export const FinalScene: React.FC = () => {
  return (
    <footer className="relative py-20 px-6 text-center z-10 border-t border-antique-gold/15 bg-gradient-to-t from-black via-surface-dark/40 to-transparent">
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-[1px] bg-antique-gold/30" />
          <Heart className="w-3.5 h-3.5 text-antique-gold/60 fill-antique-gold/30" />
          <div className="w-12 h-[1px] bg-antique-gold/30" />
        </div>

        <p className="font-serif italic text-base sm:text-lg text-ivory/70">
          “Happy 22nd Birthday, {birthdayData.recipient}.”
        </p>

        <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-antique-gold/50">
          Bella · Chapter XXII · Crafted With All My Heart
        </p>
      </div>
    </footer>
  );
};
