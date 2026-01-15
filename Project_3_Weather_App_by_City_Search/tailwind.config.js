/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dashboard-bg': '#0B131E',       // Very dark blue/black background
        'component-bg': '#202B3B',       // Slightly lighter for cards
        'sidebar-bg': '#202B3B',         // Sidebar background matching cards
        'highlight-blue': '#0095FF',     // Accent blue (like the "See more" button)
        'text-primary': '#F0F1F1',       // White-ish text
        'text-secondary': '#9399A2',     // Gray text
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
