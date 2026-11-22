"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [isCracked, setIsCracked] = useState(false);

  // 1. Realistic Wax Seal Fracture Sound
  const playWaxSnapSound = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        // Sharp crisp wax fracture impulse
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(850, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.09);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.11);
      }
    } catch {
      // Audio fallback silent
    }
  };

  // 2. Silky Paper Friction Sound as Card Slides Out
  const playPaperSlideSound = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const bufferSize = ctx.sampleRate * 0.5;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.035 * (1 - i / bufferSize);
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(480, ctx.currentTime);
        filter.frequency.linearRampToValueAtTime(200, ctx.currentTime + 0.5);
        noise.connect(filter);
        filter.connect(ctx.destination);
        noise.start();
      }
    } catch {
      // Audio fallback silent
    }
  };

  const handleEnvelopeClick = (e?: React.MouseEvent) => {
    if (isOpen) return;

    // Trigger instant tactile crack
    setIsCracked(true);
    playWaxSnapSound();

    // Schedule paper sliding friction sound when card ascends
    setTimeout(() => {
      playPaperSlideSound();
    }, 600);

    // Directly trigger background music from click event to bypass browser autoplay policy
    try {
      const bgMusic = document.getElementById("bg-music") as HTMLAudioElement | null;
      if (bgMusic) {
        bgMusic.currentTime = 0;
        bgMusic.volume = 0.75;
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn("Direct play waiting for document interaction:", err);
          });
        }
      }
    } catch (err) {
      console.warn("Audio trigger error:", err);
    }

    onOpen();
  };

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* 3D Envelope Container with Real Perspective */}
      <div
        className="perspective-1000 relative cursor-pointer group"
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
          className={`relative w-[290px] sm:w-[410px] h-[195px] sm:h-[275px] max-w-[calc(100vw-32px)] rounded-xl transition-transform duration-700 preserve-3d ${
            !isOpen && isHovered ? "scale-[1.025] -translate-y-1.5" : ""
          }`}
          style={{
            boxShadow:
              "0 35px 70px -15px rgba(0, 0, 0, 0.98), 0 0 50px rgba(74, 16, 29, 0.4)",
          }}
        >
          {/* ================= 1. BACK INTERIOR WALL (Deep Envelope Pocket) ================= */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#180e14] via-[#10070c] to-[#070305] rounded-xl border border-antique-gold/25 overflow-hidden shadow-inner">
            {/* Deep velvet ambient occlusion shadow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow:
                  "inset 0 20px 35px rgba(0,0,0,0.85), inset 0 -15px 25px rgba(0,0,0,0.7)",
              }}
            />
            {/* Subtle top fold score highlight */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-antique-gold/40 to-transparent" />
          </div>

          {/* ================= 2. THE TOP FLAP (Folds Open in 3D Space) ================= */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/2 origin-top preserve-3d"
            initial={{ rotateX: 0, zIndex: 40 }}
            animate={
              isOpen
                ? {
                    rotateX: 180,
                    zIndex: 10,
                    transition: {
                      rotateX: {
                        duration: 0.88,
                        ease: [0.33, 1, 0.68, 1],
                        delay: 0.18,
                      },
                      zIndex: { delay: 0.58 }, // Drops behind envelope once past 90deg
                    },
                  }
                : { rotateX: 0, zIndex: 40 }
            }
          >
            {/* FRONT FACE of Top Flap (Visible when closed, pointing down) */}
            <div
              className="absolute inset-0 backface-hidden"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background: "linear-gradient(180deg, #271a23 0%, #170d15 100%)",
                borderTop: "1px solid rgba(185, 154, 128, 0.4)",
                filter: "drop-shadow(0 8px 18px rgba(0,0,0,0.75))",
              }}
            >
              {/* Embossed paper hairline edge */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  clipPath: "polygon(4% 0, 96% 0, 50% 93%)",
                  borderTop: "1px solid rgba(185, 154, 128, 0.2)",
                }}
              />

              {/* UPPER HALF OF WAX SEAL (Affixed to the tip of the flap!) */}
              <div
                className="absolute bottom-[-28px] sm:bottom-[-32px] left-1/2 -translate-x-1/2 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center pointer-events-none"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
                }}
              >
                <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#5a1323] via-[#3d0b17] to-[#1d050a] p-1 border border-[#781E30]/70 flex items-center justify-center">
                  <div className="absolute inset-1 rounded-full border border-antique-gold/45" />
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-antique-gold/35 flex flex-col items-center justify-center bg-gradient-to-b from-[#310912] to-[#1c0409]">
                    <span className="font-serif font-bold text-antique-gold text-xs sm:text-sm tracking-widest drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)]">
                      {waxSealText}
                    </span>
                    <span className="w-4 h-[1px] bg-antique-gold/50 mt-0.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* BACK FACE of Top Flap (Visible when open, pointing UP behind envelope) */}
            <div
              className="absolute inset-0 backface-hidden"
              style={{
                transform: "rotateX(180deg)",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                background: "linear-gradient(180deg, #200814 0%, #11030a 100%)",
                borderBottom: "1px solid rgba(185, 154, 128, 0.25)",
                boxShadow: "inset 0 4px 16px rgba(0, 0, 0, 0.75)",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  clipPath: "polygon(4% 0, 96% 0, 50% 93%)",
                  borderBottom: "1px solid rgba(185, 154, 128, 0.15)",
                }}
              />
            </div>
          </motion.div>

          {/* ================= 3. THE REAL LETTER CARD (Stationery Inside) ================= */}
          <motion.div
            className="absolute left-4 right-4 sm:left-6 sm:right-6 top-3 sm:top-4 h-[86%] bg-gradient-to-b from-[#251a21] via-[#1c1217] to-[#120a0e] border border-antique-gold/40 rounded-lg p-5 sm:p-6 text-center shadow-2xl z-20 flex flex-col items-center justify-between overflow-hidden"
            initial={{ y: 0, scale: 1 }}
            animate={
              isOpen
                ? {
                    y: -195, // Gracefully slides fully out of the envelope pocket
                    scale: 1.05,
                    boxShadow:
                      "0 35px 70px -12px rgba(0, 0, 0, 0.98), 0 0 45px rgba(185, 154, 128, 0.35)",
                    transition: {
                      delay: 0.65,
                      duration: 1.15,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }
                : { y: 0, scale: 1 }
            }
          >
            {/* Header on letter card */}
            <div className="w-full">
              <span className="text-[10px] sm:text-xs tracking-[0.38em] text-antique-gold font-sans uppercase font-medium block mb-1">
                Chapter XXII
              </span>
              <h3 className="text-base sm:text-lg font-serif italic text-ivory font-light">
                For Bella
              </h3>
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-antique-gold/50 to-transparent mx-auto mt-2" />
            </div>

            {/* Hint message preview in middle of card */}
            <div className="w-full my-auto py-2 opacity-85">
              <div className="w-20 h-[1px] bg-antique-gold/20 mx-auto mb-2" />
              <p className="font-serif italic text-xs sm:text-sm text-ivory/90 leading-relaxed max-w-[250px] mx-auto">
                “Hold this moment close, and let the quiet celebration begin...”
              </p>
              <div className="w-20 h-[1px] bg-antique-gold/20 mx-auto mt-2" />
            </div>

            {/* Signature at bottom of card */}
            <div className="text-[10px] tracking-[0.28em] text-antique-gold/70 uppercase font-sans font-medium">
              With Love · Putra
            </div>
          </motion.div>

          {/* ================= 4. FRONT POCKET (Left & Right Flaps) ================= */}
          <div
            className="absolute inset-0 z-30 pointer-events-none rounded-xl overflow-hidden"
            style={{
              clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0, 50% 50%)",
              background: "linear-gradient(180deg, #1b1118 0%, #0e070c 100%)",
              borderBottom: "1px solid rgba(185, 154, 128, 0.22)",
              borderLeft: "1px solid rgba(185, 154, 128, 0.22)",
              borderRight: "1px solid rgba(185, 154, 128, 0.22)",
            }}
          />

          {/* ================= 5. FRONT POCKET BOTTOM FLAP (Folds UP Over Sides) ================= */}
          <div
            className="absolute inset-0 z-30 pointer-events-none rounded-b-xl"
            style={{
              clipPath: "polygon(0 100%, 100% 100%, 50% 48%)",
              background: "linear-gradient(0deg, #10070c 0%, #1e1319 100%)",
              borderBottom: "1px solid rgba(185, 154, 128, 0.3)",
              filter: "drop-shadow(0 -5px 12px rgba(0,0,0,0.65))",
            }}
          >
            {/* LOWER HALF OF WAX SEAL (Affixed to the bottom flap pocket!) */}
            <div
              className="absolute top-[48%] -translate-y-1/2 left-1/2 -translate-x-1/2 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center pointer-events-none"
              style={{
                clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
              }}
            >
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#5a1323] via-[#3d0b17] to-[#1d050a] p-1 border border-[#781E30]/70 flex items-center justify-center">
                <div className="absolute inset-1 rounded-full border border-antique-gold/45" />
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-antique-gold/35 flex flex-col items-center justify-center bg-gradient-to-b from-[#310912] to-[#1c0409]">
                  <span className="font-serif font-bold text-antique-gold text-xs sm:text-sm tracking-widest drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)]">
                    {waxSealText}
                  </span>
                  <span className="w-4 h-[1px] bg-antique-gold/50 mt-0.5" />
                </div>
              </div>
            </div>
          </div>

          {/* ================= 6. GOLDEN FRACTURE FLASH (When Seal Breaks) ================= */}
          <AnimatePresence>
            {isCracked && !isOpen && (
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-[2px] bg-gradient-to-r from-transparent via-antique-gold to-transparent z-50 pointer-events-none shadow-[0_0_8px_#d4af37]"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Subtle Hint Text Underneath */}
      {!isOpen && (
        <motion.p
          className="mt-10 text-[11px] sm:text-xs tracking-[0.35em] text-antique-gold/60 uppercase font-sans font-light cursor-pointer hover:text-antique-gold/90 transition-colors"
          onClick={handleEnvelopeClick}
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
