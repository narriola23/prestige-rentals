import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f0f4ff",
          100: "#e0e8ff",
          500: "#1a2a5e",
          600: "#152349",
          700: "#101b38",
          800: "#0b1227",
          900: "#060c1a",
        },
        gold: {
          300: "#fde68a",
          400: "#fbbf24",
          500: "#d4a017",
          600: "#b8860b",
          700: "#9a6f00",
        },
      },
    },
  },
  plugins: [],
};
export default config;
