// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          900: "#050816",
          800: "#090f24",
          700: "#10152f",
          accent: "#e11d48",
        },
      },
      backgroundImage: {
        "gradient-hero":
          "radial-gradient(circle at top, #4c1d95 0, #020617 45%, #000 100%)",
      },
    },
  },
  plugins: [],
};
