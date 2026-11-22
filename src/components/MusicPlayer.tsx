"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { ambientMusic } from "@/lib/ambientMusic";

interface MusicPlayerProps {
  autoPlayTrigger?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ autoPlayTrigger = false }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isUsingFallbackRef = useRef<boolean>(false);

  useEffect(() => {
    const audio = new Audio("/music/birthday.mp3");
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    audio.addEventListener("error", () => {
      // If no mp3 is found, mark fallback ready
      isUsingFallbackRef.current = true;
    });

    return () => {
      audio.pause();
      ambientMusic.stop();
      audioRef.current = null;
    };
  }, []);

  const startPlayback = () => {
    if (audioRef.current && !isUsingFallbackRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // If browser blocked or mp3 not found, activate ambient engine
          isUsingFallbackRef.current = true;
          ambientMusic.start();
          setIsPlaying(true);
        });
    } else {
      ambientMusic.start();
      setIsPlaying(true);
    }
  };

  const stopPlayback = () => {
    if (audioRef.current && !isUsingFallbackRef.current) {
      audioRef.current.pause();
    }
    ambientMusic.stop();
    setIsPlaying(false);
  };

  useEffect(() => {
    if (autoPlayTrigger && !isPlaying) {
      startPlayback();
    }
  }, [autoPlayTrigger]);

  const toggleMusic = () => {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={toggleMusic}
        type="button"
        aria-label={isPlaying ? "Mute soundtrack" : "Play soundtrack"}
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-dark/70 backdrop-blur-md border border-antique-gold/20 text-ivory/70 text-xs tracking-wider transition-all duration-300 hover:border-antique-gold/50 hover:text-ivory shadow-lg shadow-black/40 group cursor-pointer"
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-3.5 h-3.5 text-antique-gold/80" />
            <span className="font-serif italic text-xs text-antique-gold/80 tracking-widest">
              Audio
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-ivory/40 group-hover:text-ivory/70 transition-colors" />
            <span className="font-serif italic text-xs text-ivory/40 group-hover:text-ivory/70 tracking-widest">
              Muted
            </span>
          </>
        )}
      </button>
    </div>
  );
};
