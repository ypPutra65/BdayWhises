"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { audioManager } from "@/lib/audioManager";

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => unsubscribe();
  }, []);

  const handleToggle = () => {
    audioManager.toggle();
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={handleToggle}
        type="button"
        aria-label={isPlaying ? "Mute soundtrack" : "Play soundtrack"}
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-dark/75 backdrop-blur-md border border-antique-gold/25 text-ivory/80 text-xs tracking-wider transition-all duration-300 hover:border-antique-gold/60 hover:text-ivory shadow-lg shadow-black/40 group cursor-pointer"
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
  );
};
