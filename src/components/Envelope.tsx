"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { audioManager } from "@/lib/audioManager";

interface EnvelopeProps {
  isOpen: boolean;
  onOpen: () => void;
  waxSealText?: string;
  hintText?: string;
}

export const Envelope: React.FC<EnvelopeProps> = ({
  isOpen,
  onOpen,
  waxSealText = "XXII",
  hintText = "Click to Open",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleEnvelopeClick = () => {
    if (isOpen) return;

    // Start background music directly on user click
    audioManager.play();

    // Subtle audio feedback using Web Audio API
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(160, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.22);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      }
    } catch {
      // Audio fallback silent
    }

    onOpen();
  };

  return (
    <div className="relative flex flex-col items-center">
      {/* 3D Envelope Container */}
      <div
        className="perspective-1000 relative cursor-pointer select-none group"
        onClick={handleEnvelopeClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="button"
        tabIndex={0}
        aria-label="Open Birthday Letter Envelope"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleEnvelopeClick();
          }
        }}
      >
        <div
          className={`relative w-[280px] sm:w-[390px] h-[190px] sm:h-[265px] max-w-[calc(100vw-32px)] rounded-lg transition-transform duration-700 preserve-3d ${
            !isOpen && isHovered ? "scale-[1.025] -translate-y-1" : ""
          }`}
          style={{
            boxShadow:
              "0 30px 60px -12px rgba(0, 0, 0, 0.9), 0 0 45px rgba(74, 16, 29, 0.35)",
          }}
        >
          {/* Back pocket interior */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#181215] to-[#0f0c0d] rounded-lg border border-antique-gold/15" />

          {/* Letter Card nestled inside pocket */}
          <motion.div
            className="absolute left-4 right-4 sm:left-6 sm:right-6 top-3 bg-gradient-to-b from-[#231b1f] to-[#1a1417] border border-antique-gold/30 rounded p-4 text-center shadow-2xl z-20"
            initial={{ y: 0 }}
            animate={
              isOpen
                ? {
                    y: -130,
                    scale: 1.04,
                    opacity: 1,
                    transition: { delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] },
                  }
                : { y: 0 }
            }
          >
            <div className="text-[10px] sm:text-xs tracking-[0.3em] text-antique-gold font-sans uppercase mb-1">
              Chapter XXII
            </div>
            <div className="text-sm sm:text-base font-serif italic text-ivory">
              For Bella
            </div>
            <div className="w-12 h-[1px] bg-antique-gold/40 mx-auto mt-2" />
          </motion.div>

          {/* Front Pocket (Left & Right Fold Flaps) - converges at exact 50% 50% */}
          <div
            className="absolute inset-0 z-30 pointer-events-none rounded-lg overflow-hidden"
            style={{
              clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0, 50% 50%)",
              background:
                "linear-gradient(180deg, #1d161a 0%, #110d0f 100%)",
              boxShadow: "inset 0 1px 3px rgba(185, 154, 128, 0.15)",
              borderBottom: "1px solid rgba(185, 154, 128, 0.22)",
              borderLeft: "1px solid rgba(185, 154, 128, 0.22)",
              borderRight: "1px solid rgba(185, 154, 128, 0.22)",
            }}
          />

          {/* Front Bottom Triangle Pocket - converges at exact 50% 50% */}
          <div
            className="absolute inset-0 z-30 pointer-events-none rounded-b-lg"
            style={{
              clipPath: "polygon(0 100%, 100% 100%, 50% 50%)",
              background:
                "linear-gradient(0deg, #130d10 0%, #20171c 100%)",
              borderBottom: "1px solid rgba(185, 154, 128, 0.3)",
              filter: "drop-shadow(0 -3px 8px rgba(0,0,0,0.4))",
            }}
          />

          {/* Top Flap (Triangular flap that opens in 3D) - height exactly 50% so tip reaches center */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/2 origin-top preserve-3d"
            style={{
              zIndex: isOpen ? 15 : 40,
            }}
            initial={{ rotateX: 0 }}
            animate={
              isOpen
                ? {
                    rotateX: -180,
                    transition: { duration: 0.85, ease: [0.4, 0, 0.2, 1] },
                  }
                : { rotateX: 0 }
            }
          >
            <div
              className="w-full h-full relative"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background:
                  "linear-gradient(180deg, #271c22 0%, #191216 100%)",
                borderTop: "1px solid rgba(185, 154, 128, 0.35)",
                boxShadow: "0 6px 18px rgba(0,0,0,0.7)",
              }}
            >
              {/* Subtle top flap accent line */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  clipPath: "polygon(5% 0, 95% 0, 50% 92%)",
                  borderTop: "1px solid rgba(185, 154, 128, 0.15)",
                }}
              />
            </div>
          </motion.div>

          {/* Guaranteed Dead-Center Wax Seal Container */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex items-center justify-center pointer-events-auto">
            <motion.div
              initial={{ scale: 1, opacity: 1 }}
              animate={
                isOpen
                  ? {
                      scale: 1.3,
                      opacity: 0,
                      filter: "blur(4px)",
                      transition: { duration: 0.45, ease: "easeOut" },
                    }
                  : { scale: 1, opacity: 1 }
              }
            >
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#5a1323] via-[#3d0b17] to-[#1d050a] p-1 shadow-2xl flex items-center justify-center border border-[#781E30]/60 group-hover:scale-105 transition-all duration-300">
                {/* Molten wax organic outer ring */}
                <div
                  className="absolute inset-[-3px] rounded-full opacity-70 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(120,30,48,0.4) 0%, rgba(74,16,29,0) 70%)",
                  }}
                />

                {/* Wax Seal Outer Embossed Ring */}
                <div className="absolute inset-1 rounded-full border border-antique-gold/45 shadow-[inset_0_1px_3px_rgba(255,255,255,0.2)]" />

                {/* Inner Stamped Medallion */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-antique-gold/35 flex flex-col items-center justify-center bg-gradient-to-b from-[#310912] to-[#1c0409] shadow-inner">
                  <span className="font-serif font-bold text-antique-gold text-xs sm:text-sm tracking-widest drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)] select-none">
                    {waxSealText}
                  </span>
                  <span className="w-4 h-[1px] bg-antique-gold/50 mt-0.5" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Subtle Hint Text Underneath */}
      {!isOpen && (
        <motion.p
          className="mt-10 text-[11px] sm:text-xs tracking-[0.35em] text-antique-gold/60 uppercase font-sans font-light"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {hintText}
        </motion.p>
      )}
    </div>
  );
};
