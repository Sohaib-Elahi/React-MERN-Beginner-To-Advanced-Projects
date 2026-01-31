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
        notion: {
          bg: "#ffffff",
          surface: "#f7f6f3",
          border: "#e5e4df",
          text: "#37352f",
          textLight: "#787774",
          accent: "#2383e2",
          success: "#0f7b6c",
          warning: "#d9730d",
          danger: "#e03e3e",
        },
      },
      
      borderRadius: {
        notion: "3px",
      },
    },
  },
  plugins: [],
};
