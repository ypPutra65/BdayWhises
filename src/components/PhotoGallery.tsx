"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
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

  return (
    <section
      id="photo-gallery"
      className="relative py-8 sm:py-14 px-4 z-10 flex flex-col items-center justify-center scroll-mt-8"
    >
      {/* Delicate hairline divider */}
      <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent via-antique-gold/25 to-transparent mb-6 sm:mb-8" />

      {/* Small Compact Image Thumbnails (Zero text, pure images) */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-4 md:gap-5 max-w-[340px] sm:max-w-md md:max-w-lg mx-auto w-full">
        {gallery.photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{
              duration: 0.6,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ scale: 1.06, y: -3 }}
            onClick={() => setSelectedIndex(index)}
            className="group relative aspect-[3/4] w-full overflow-hidden rounded-lg sm:rounded-xl bg-black/60 border border-antique-gold/30 hover:border-antique-gold transition-all duration-300 shadow-lg shadow-black/80 cursor-pointer select-none"
          >
            <Image
              src={photo.src}
              alt=""
              fill
              sizes="(max-width: 640px) 75px, 120px"
              className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-108"
              priority={index < 2}
            />

            {/* Subtle gloss border overlay */}
            <div className="absolute inset-0 border border-white/5 rounded-lg sm:rounded-xl pointer-events-none" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
          </motion.div>
        ))}
      </div>

      {/* Subtle bottom accent line */}
      <div className="w-16 sm:w-24 h-[1px] bg-gradient-to-r from-transparent via-antique-gold/25 to-transparent mt-6 sm:mb-2 sm:mt-8" />

      {/* Lightbox Modal (Pure image, no text/captions) */}
      <AnimatePresence>
        {selectedIndex !== null && selectedPhoto && (
          <motion.div
            key="lightbox-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-md select-none"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close"
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
              aria-label="Previous"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-3 rounded-full bg-surface-dark/80 hover:bg-oxblood/80 border border-antique-gold/30 hover:border-antique-gold text-antique-gold hover:text-ivory transition-all duration-300 shadow-xl cursor-pointer"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Next Navigation Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              aria-label="Next"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 p-2.5 sm:p-3 rounded-full bg-surface-dark/80 hover:bg-oxblood/80 border border-antique-gold/30 hover:border-antique-gold text-antique-gold hover:text-ivory transition-all duration-300 shadow-xl cursor-pointer"
            >
              <ChevronRight size={22} />
            </button>

            {/* Pure Photo Presentation */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[82vh] w-auto aspect-[3/4] rounded-xl overflow-hidden border border-antique-gold/35 shadow-2xl shadow-black/95 bg-black"
            >
              <Image
                src={selectedPhoto.src}
                alt=""
                fill
                sizes="(max-width: 768px) 90vw, 650px"
                className="object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
