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

  // 1. Crisp Wax Seal Fracture Sound
  const playWaxSnapSound = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      }
    } catch {
      // Silent fallback
    }
  };

  // 2. Paper Slide Sound as Letter Glides Out
  const playPaperSlideSound = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const bufferSize = ctx.sampleRate * 0.45;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.03 * (1 - i / bufferSize);
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(450, ctx.currentTime);
        filter.frequency.linearRampToValueAtTime(200, ctx.currentTime + 0.45);
        noise.connect(filter);
        filter.connect(ctx.destination);
        noise.start();
      }
    } catch {
      // Silent fallback
    }
  };

  const handleEnvelopeClick = (e?: React.MouseEvent) => {
    if (isOpen) return;

    playWaxSnapSound();

    setTimeout(() => {
      playPaperSlideSound();
    }, 380);

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
      {/* Container matching reference video animation */}
      <div
        className="envelope-wrapper group"
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
          className={`envelope-base transition-transform duration-500 ${
            !isOpen && isHovered ? "scale-[1.025] -translate-y-1.5" : ""
          }`}
        >
          {/* Top Flap (Triangle rotating 180deg backward behind envelope) */}
          <div className={`envelope-flap ${isOpen ? "open" : ""}`} />

          {/* Letter Card (Inside pocket, slides smoothly up when opened) */}
          <div
            className={`envelope-letter ${
              isOpen ? "open" : ""
            } flex flex-col items-center justify-between p-4 sm:p-5 text-center overflow-hidden`}
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
            <div className="w-full my-auto py-2 opacity-85">
              <div className="w-20 h-[1px] bg-antique-gold/20 mx-auto mb-2" />
              <p className="font-serif italic text-xs sm:text-sm text-ivory/90 leading-relaxed max-w-[240px] mx-auto">
                “Hold this moment close, and let the quiet celebration begin...”
              </p>
              <div className="w-20 h-[1px] bg-antique-gold/20 mx-auto mt-2" />
            </div>

            {/* Signature at bottom of card */}
            <div className="text-[10px] tracking-[0.25em] text-antique-gold/70 uppercase font-sans font-medium">
              With Love · Putra
            </div>
          </div>

          {/* Front Pocket (Left, Right, and Bottom triangle flaps) */}
          <div className="envelope-pocket" />

          {/* Luxury Wax Seal Stamped at Center */}
          <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 1, opacity: 1 }}
              animate={
                isOpen
                  ? {
                      scale: [1, 1.15, 1.25],
                      opacity: [1, 0.8, 0],
                      filter: ["blur(0px)", "blur(1px)", "blur(4px)"],
                      transition: { duration: 0.35, ease: "easeOut" },
                    }
                  : { scale: 1, opacity: 1 }
              }
            >
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#5a1323] via-[#3d0b17] to-[#1d050a] p-1 shadow-2xl flex items-center justify-center border border-[#781E30]/70 group-hover:scale-105 transition-all duration-300">
                <div
                  className="absolute inset-[-3px] rounded-full opacity-70 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(120,30,48,0.4) 0%, rgba(74,16,29,0) 70%)",
                  }}
                />
                <div className="absolute inset-1 rounded-full border border-antique-gold/45 shadow-[inset_0_1px_3px_rgba(255,255,255,0.2)]" />
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
