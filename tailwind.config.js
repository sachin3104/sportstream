import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-red": "#19204e",
        "dark-navy": "#000000",
        "highlight-yellow": "#fcb300",
        "soft-white": "#d6d6d6",
        "deep-burgundy": "#800020",
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        heading: ["Merriweather", "serif"],
        arial: ["Arial", "sans-serif"],
        nunito: ["Nunito Sans", "sans-serif"],
      },
      borderRadius: {
        large: "2rem",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(), require("tailwind-scrollbar")],
};
