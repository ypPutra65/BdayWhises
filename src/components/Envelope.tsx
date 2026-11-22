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

  const playOpenAudioCue = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        // Soft paper unfolding frequency sweep
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(340, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.35);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.38);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch {
      // Silent fallback
    }
  };

  const handleEnvelopeClick = (e?: React.MouseEvent) => {
    if (isOpen) return;

    // 1. Play paper rustle sound
    playOpenAudioCue();

    // 2. Play background music immediately inside user click handler
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
    <div className="relative flex flex-col items-center">
      {/* 3D Envelope Container with Perspective */}
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
          className={`relative w-[280px] sm:w-[390px] h-[190px] sm:h-[265px] max-w-[calc(100vw-32px)] rounded-xl transition-transform duration-700 preserve-3d ${
            !isOpen && isHovered ? "scale-[1.025] -translate-y-1" : ""
          }`}
          style={{
            boxShadow:
              "0 30px 60px -12px rgba(0, 0, 0, 0.95), 0 0 45px rgba(74, 16, 29, 0.35)",
          }}
        >
          {/* 1. Back Interior Wall (Inside of Envelope) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#180f14] via-[#120a0f] to-[#0a0508] rounded-xl border border-antique-gold/20 overflow-hidden shadow-inner">
            {/* Subtle inner velvet sheen */}
            <div className="absolute inset-0 bg-radial from-burgundy/20 via-transparent to-black/50 pointer-events-none" />
          </div>

          {/* 2. Top Flap (Flap Penutup Atas yang Terbuka Mulus ke Atas) */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-1/2 origin-top"
            initial={{ rotateX: 0, zIndex: 40 }}
            animate={
              isOpen
                ? {
                    rotateX: 180,
                    zIndex: 10,
                    transition: {
                      rotateX: {
                        duration: 0.85,
                        ease: [0.33, 1, 0.68, 1],
                        delay: 0.15,
                      },
                      zIndex: { delay: 0.55 }, // Switch behind envelope after passing 90deg
                    },
                  }
                : { rotateX: 0, zIndex: 40 }
            }
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              background: "linear-gradient(180deg, #261b22 0%, #170f15 100%)",
              borderTop: "1px solid rgba(185, 154, 128, 0.35)",
              boxShadow: "0 8px 25px rgba(0,0,0,0.7)",
            }}
          >
            {/* Elegant inner hairline border */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                clipPath: "polygon(4% 0, 96% 0, 50% 93%)",
                borderTop: "1px solid rgba(185, 154, 128, 0.18)",
              }}
            />
          </motion.div>

          {/* 3. The Letter Card (Glides Gracefully UP out of the pocket) */}
          <motion.div
            className="absolute left-4 right-4 sm:left-6 sm:right-6 top-3 sm:top-4 h-[84%] bg-gradient-to-b from-[#231a20] via-[#1a1216] to-[#120b0e] border border-antique-gold/35 rounded-lg p-4 sm:p-5 text-center shadow-2xl z-20 flex flex-col items-center justify-between overflow-hidden"
            initial={{ y: 0, scale: 1 }}
            animate={
              isOpen
                ? {
                    y: -175,
                    scale: 1.05,
                    boxShadow:
                      "0 30px 60px -12px rgba(0, 0, 0, 0.95), 0 0 40px rgba(185, 154, 128, 0.3)",
                    transition: {
                      delay: 0.55,
                      duration: 1.05,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }
                : { y: 0, scale: 1 }
            }
          >
            {/* Header on letter card */}
            <div className="w-full">
              <span className="text-[10px] sm:text-xs tracking-[0.35em] text-antique-gold font-sans uppercase font-medium block mb-1">
                Chapter XXII
              </span>
              <h3 className="text-base sm:text-lg font-serif italic text-ivory font-light">
                For Bella
              </h3>
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-antique-gold/50 to-transparent mx-auto mt-2" />
            </div>

            {/* Hint message preview in middle of card */}
            <div className="w-full my-auto py-2 opacity-80">
              <div className="w-20 h-[1px] bg-antique-gold/20 mx-auto mb-2" />
              <p className="font-serif italic text-xs sm:text-sm text-ivory/85 leading-relaxed max-w-[240px] mx-auto">
                “Hold this moment close, and let the quiet celebration begin...”
              </p>
              <div className="w-20 h-[1px] bg-antique-gold/20 mx-auto mt-2" />
            </div>

            {/* Signature at bottom of card */}
            <div className="text-[10px] tracking-[0.25em] text-antique-gold/60 uppercase font-sans">
              With Love · Putra
            </div>
          </motion.div>

          {/* 4. Front Pocket Left & Right Flaps */}
          <div
            className="absolute inset-0 z-30 pointer-events-none rounded-xl overflow-hidden"
            style={{
              clipPath: "polygon(0 0, 0 100%, 100% 100%, 100% 0, 50% 50%)",
              background: "linear-gradient(180deg, #1b1218 0%, #0f0a0d 100%)",
              borderBottom: "1px solid rgba(185, 154, 128, 0.22)",
              borderLeft: "1px solid rgba(185, 154, 128, 0.22)",
              borderRight: "1px solid rgba(185, 154, 128, 0.22)",
            }}
          />

          {/* 5. Front Pocket Bottom Flap (Overlaps left and right to form true envelope pocket) */}
          <div
            className="absolute inset-0 z-30 pointer-events-none rounded-b-xl"
            style={{
              clipPath: "polygon(0 100%, 100% 100%, 50% 50%)",
              background: "linear-gradient(0deg, #11090d 0%, #1e141a 100%)",
              borderBottom: "1px solid rgba(185, 154, 128, 0.3)",
              filter: "drop-shadow(0 -4px 10px rgba(0,0,0,0.55))",
            }}
          />

          {/* 6. Wax Seal Stamped at Exact Dead-Center */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 flex items-center justify-center cursor-pointer"
            onClick={handleEnvelopeClick}
          >
            <motion.div
              initial={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              animate={
                isOpen
                  ? {
                      scale: [1, 1.15, 1.3],
                      opacity: [1, 0.85, 0],
                      filter: ["blur(0px)", "blur(1px)", "blur(6px)"],
                      transition: { duration: 0.45, ease: "easeInOut" },
                    }
                  : { scale: 1, opacity: 1, filter: "blur(0px)" }
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
