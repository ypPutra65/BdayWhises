"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface OpeningAnimationProps {
  isOpening: boolean;
  onAnimationComplete?: () => void;
}

export const OpeningAnimation: React.FC<OpeningAnimationProps> = ({
  isOpening,
  onAnimationComplete,
}) => {
  return (
    <AnimatePresence>
      {isOpening && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          onAnimationComplete={onAnimationComplete}
        >
          {/* Radial oxblood glow swelling from center */}
          <motion.div
            className="w-[600px] h-[600px] sm:w-[900px] sm:h-[900px] rounded-full bg-radial from-burgundy/40 via-oxblood/20 to-transparent blur-3xl"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1.4, opacity: 0.8 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
