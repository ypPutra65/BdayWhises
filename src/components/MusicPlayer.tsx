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
        aria-label={isPlaying ? "Mute music" : "Play music"}
        className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-surface-dark/85 backdrop-blur-md border border-antique-gold/25 text-ivory text-xs tracking-wider transition-all duration-300 hover:border-antique-gold/60 hover:bg-surface-dark shadow-xl shadow-black/50 group cursor-pointer"
      >
        {isPlaying ? (
          <>
            <span className="flex items-center gap-0.5 h-3">
              <span className="w-0.5 h-full bg-antique-gold animate-[pulse_0.8s_ease-in-out_infinite]" />
              <span className="w-0.5 h-2 bg-antique-gold animate-[pulse_1.2s_ease-in-out_infinite_0.2s]" />
              <span className="w-0.5 h-full bg-antique-gold animate-[pulse_1s_ease-in-out_infinite_0.4s]" />
            </span>
            <Volume2 className="w-3.5 h-3.5 text-antique-gold" />
            <span className="hidden sm:inline font-sans text-[11px] text-ivory/90 font-medium">Sound On</span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-ivory/40 group-hover:text-ivory/80 transition-colors" />
            <span className="hidden sm:inline font-sans text-[11px] text-ivory/50 group-hover:text-ivory/80 transition-colors font-medium">
              Sound Off
            </span>
          </>
        )}
      </button>
    </div>
  );
};
