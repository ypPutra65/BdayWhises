"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.7;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch((err) => {
        console.warn("Playback error:", err);
      });
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      {/* Explicit DOM Audio Element with Multiple Sources for 100% Cross-Browser Support */}
      <audio
        id="bg-music"
        ref={audioRef}
        loop
        preload="auto"
        playsInline
      >
        <source src="/music/birthday.mp3" type="audio/mpeg" />
        <source src="/music/birthday.m4a" type="audio/mp4" />
      </audio>

      {/* Floating Audio Controller */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={toggleMusic}
          type="button"
          aria-label={isPlaying ? "Mute soundtrack" : "Play soundtrack"}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-dark/80 backdrop-blur-md border border-antique-gold/25 text-ivory/80 text-xs tracking-wider transition-all duration-300 hover:border-antique-gold/60 hover:text-ivory shadow-lg shadow-black/50 group cursor-pointer"
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-antique-gold animate-pulse" />
              <span className="font-serif italic text-xs text-antique-gold tracking-widest">
                Audio On
              </span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-ivory/40 group-hover:text-ivory/70 transition-colors" />
              <span className="font-serif italic text-xs text-ivory/40 group-hover:text-ivory/70 tracking-widest">
                Audio Off
              </span>
            </>
          )}
        </button>
      </div>
    </>
  );
};
