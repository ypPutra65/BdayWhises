import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#090809",
        "surface-dark": "#151012",
        oxblood: "#26090F",
        burgundy: "#4A101D",
        "deep-red": "#781E30",
        ivory: "#EDE4DC",
        "ivory-muted": "rgba(237, 228, 220, 0.65)",
        "antique-gold": "#B99A80",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
        "flicker": "flicker 1.5s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        pulseSubtle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(0.98)" },
        },
        flicker: {
          "0%, 100%": { transform: "scaleY(1) skewX(0deg)", opacity: "0.9" },
          "25%": { transform: "scaleY(1.08) skewX(1deg)", opacity: "1" },
          "50%": { transform: "scaleY(0.95) skewX(-1deg)", opacity: "0.8" },
          "75%": { transform: "scaleY(1.04) skewX(0.5deg)", opacity: "0.95" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
