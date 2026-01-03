export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Instrument Sans"', 'sans-serif']
      },
      colors: {
        // Brand Kit Pallete
        'ink-black': '#001A23',
        'pine-teal': '#31493C',
        'muted-teal': '#7A9E7E',
        'celadon': '#B3EFB2',
        'alice-blue': '#E8F1F2',
      },
    },
  },
  plugins: [],
}