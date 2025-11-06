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
        primary: {
          DEFAULT: "#556B2F",
          dark: "#3d4d21",
          light: "#6d8a3a",
        },
        accent: {
          DEFAULT: "#FF6B8A",
          dark: "#e65578",
          light: "#ff8da6",
        },
        dark: {
          DEFAULT: "#0B0B0B",
          surface: "#1a1a1a",
        },
        surface: {
          DEFAULT: "#F6F5F3",
          light: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        heading: ["Poppins", "system-ui", "sans-serif"],
        mono: ["Roboto Mono", "monospace"],
      },
      maxWidth: {
        container: "1300px",
      },
      spacing: {
        section: "6rem",
      },
    },
  },
  plugins: [],
};

export default config;
