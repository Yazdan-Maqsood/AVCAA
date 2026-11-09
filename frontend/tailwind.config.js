/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Aapka naya color palette
        brand: {
          red: "#B3001B",    // Mahogany Red (Primary actions)
          black: "#262626",  // Carbon Black (Text, Dark mode bg)
          white: "#FFFFFF",  // White (Cards, Light mode bg)
        },
        background: {
          light: "#FAFAFA",  // Off-white background for better contrast
          dark: "#1A1A1A",   // Slightly lighter than carbon black for depth
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}