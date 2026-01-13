/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  safelist: [
    "animate-glow", // 👈 force Tailwind to keep this class
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A",   // Deep Navy Blue
        secondary: "#2563EB", // Royal Blue
        accent: "#D4AF37",    // Gold (Luxury)
        neutral: {
          light: "#F8FAFC",   // Light Gray
          white: "#FFFFFF",
        },
        text: {
          dark: "#111827",    // Dark Gray
          muted: "#6B7280",   // Muted Gray
        },
        teal: "#0D9488",      // Optional softer vibe
      },
      keyframes: {
        glow: {
          "0%, 100%": { boxShadow: "0 0 8px rgba(212, 175, 55, 0.4)" },
          "50%": { boxShadow: "0 0 20px rgba(212, 175, 55, 0.9)" },
        },
      },
      animation: {
        glow: "glow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
