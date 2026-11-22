import { Variants } from "framer-motion";

export const fadeIn = (delay: number = 0, duration: number = 0.8): Variants => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

export const fadeInScale = (delay: number = 0, duration: number = 1): Variants => ({
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  },
});

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.15,
    },
  },
};

export const letterParagraphVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
