"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { birthdayData, GalleryPhoto } from "@/data/birthday";

export const PhotoGallery: React.FC = () => {
  const { gallery } = birthdayData;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedPhoto: GalleryPhoto | null =
    selectedIndex !== null ? gallery.photos[selectedIndex] : null;

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev === null ? null : (prev - 1 + gallery.photos.length) % gallery.photos.length
    );
  }, [selectedIndex, gallery.photos.length]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((prev) =>
      prev === null ? null : (prev + 1) % gallery.photos.length
    );
  }, [selectedIndex, gallery.photos.length]);

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (selectedIndex === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, handleClose, handlePrev, handleNext]);

  const scrollToCake = () => {
    const cakeEl = document.getElementById("birthday-cake");
    if (cakeEl) {
      cakeEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="photo-gallery"
      className="relative min-h-screen py-24 sm:py-36 px-4 sm:px-6 md:px-8 z-10 scroll-mt-12 overflow-hidden"
    >
      {/* Background radial ambiance */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[700px] h-[340px] sm:h-[700px] bg-radial from-oxblood/40 via-burgundy/15 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Editorial Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-4 mb-4"
          >
            <span className="w-8 sm:w-16 h-[1px] bg-antique-gold/30" />
            <span className="font-sans text-[11px] sm:text-xs tracking-[0.35em] uppercase text-antique-gold/75">
              {gallery.subtitle}
            </span>
            <span className="w-8 sm:w-16 h-[1px] bg-antique-gold/30" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.85, delay: 0.1 }}
            className="font-serif italic text-3xl sm:text-5xl md:text-6xl text-ivory font-light tracking-wide mb-5"
          >
            {gallery.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.85, delay: 0.2 }}
            className="font-serif text-sm sm:text-base md:text-lg text-ivory/70 font-light leading-relaxed px-4"
          >
            {gallery.description}
          </motion.p>
        </div>

        {/* Gallery Grid: 4 Exhibition Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 lg:gap-8">
          {gallery.photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => setSelectedIndex(index)}
              className="group cursor-pointer relative flex flex-col bg-gradient-to-b from-[#181115]/90 via-[#130d10]/95 to-[#0e0a0c]/98 border border-antique-gold/20 hover:border-antique-gold/60 rounded-xl p-3 sm:p-3.5 shadow-2xl shadow-black/80 transition-all duration-500 hover:-translate-y-1.5"
            >
              {/* Inner Image Frame */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-black/60 border border-antique-gold/15">
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={index < 2}
                />

                {/* Subtle vignette gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                {/* Tag pill at top left */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-antique-gold/30">
                  <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-antique-gold font-medium">
                    {photo.numeral} · {photo.tag}
                  </span>
                </div>

                {/* Magnify icon hover prompt */}
                <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-antique-gold/30 flex items-center justify-center text-antique-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Maximize2 size={14} />
                </div>
              </div>

              {/* Card Caption Info */}
              <div className="pt-4 pb-2 px-1 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-serif text-lg sm:text-xl text-ivory/95 font-medium tracking-wide group-hover:text-antique-gold transition-colors duration-300">
                    {photo.title}
                  </h3>
                </div>
                <span className="font-serif italic text-xs text-antique-gold/80 mb-2.5">
                  {photo.subtitle}
                </span>
                <p className="font-serif text-xs sm:text-[13px] text-ivory/70 font-light leading-relaxed line-clamp-3">
                  {photo.caption}
                </p>
              </div>

              {/* Bottom delicate accent line */}
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-antique-gold/20 to-transparent mt-2 group-hover:via-antique-gold/50 transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Scroll downstream indicator to Birthday Cake */}
        <div className="mt-20 sm:mt-24 text-center">
          <motion.button
            onClick={scrollToCake}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="group inline-flex flex-col items-center gap-2 text-antique-gold/70 hover:text-antique-gold transition-colors cursor-pointer"
          >
            <span className="font-sans text-[11px] tracking-[0.35em] uppercase">
              Next: Make a Wish
            </span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-antique-gold/60 to-transparent group-hover:h-11 transition-all duration-300" />
          </motion.button>
        </div>
      </div>

      {/* Cinematic Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && selectedPhoto && (
          <motion.div
            key="lightbox-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-xl"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close modal"
              className="absolute top-5 right-5 sm:top-8 sm:right-8 z-50 p-2.5 rounded-full bg-surface-dark/80 hover:bg-oxblood/80 border border-antique-gold/30 hover:border-antique-gold text-antique-gold hover:text-ivory transition-all duration-300 shadow-xl cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Prev Navigation Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              aria-label="Previous photo"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-surface-dark/80 hover:bg-oxblood/80 border border-antique-gold/30 hover:border-antique-gold text-antique-gold hover:text-ivory transition-all duration-300 shadow-xl cursor-pointer"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next Navigation Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next photo"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-surface-dark/80 hover:bg-oxblood/80 border border-antique-gold/30 hover:border-antique-gold text-antique-gold hover:text-ivory transition-all duration-300 shadow-xl cursor-pointer"
            >
              <ChevronRight size={24} />
            </button>

            {/* Content Container */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[92vh] flex flex-col items-center justify-center"
            >
              {/* Photo Frame */}
              <div className="relative max-h-[68vh] sm:max-h-[72vh] w-auto aspect-[3/4] rounded-xl overflow-hidden border border-antique-gold/35 shadow-2xl shadow-black/95 bg-black">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  fill
                  sizes="(max-width: 768px) 90vw, 700px"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Modal Editorial Caption */}
              <div className="mt-5 text-center max-w-xl px-4">
                <div className="flex items-center justify-center gap-3 mb-1.5">
                  <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-antique-gold/80">
                    {selectedPhoto.numeral} · {selectedPhoto.tag}
                  </span>
                  <span className="text-antique-gold/40">·</span>
                  <span className="font-serif italic text-xs sm:text-sm text-antique-gold/80">
                    {selectedPhoto.subtitle}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-ivory font-normal tracking-wide mb-2">
                  {selectedPhoto.title}
                </h3>

                <p className="font-serif text-xs sm:text-sm text-ivory/80 font-light leading-relaxed">
                  {selectedPhoto.caption}
                </p>

                {/* Position counter indicator */}
                <div className="mt-3 font-sans text-[10px] tracking-[0.3em] uppercase text-antique-gold/50">
                  {selectedIndex + 1} of {gallery.photos.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
