/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        script: ["Cormorant Garamond", "serif"],
        cafe: ["Quicksand", "sans-serif"],
      },
      colors: {
        parisWine: "#6E3B3B",
        parisRose: "#F3C6C6",
        parisLavender: "#C3A6E8",
        parisCream: "#F7F0E7",
        parisBlue: "#6A83D3",
      },
    },
  },
  plugins: [],
}
