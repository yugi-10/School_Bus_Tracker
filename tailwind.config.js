/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Enables dark mode support via 'class'
  theme: {
    extend: {
      colors: {
        // Optional custom color shades
        primary: {
          DEFAULT: '#06b6d4',
          dark: '#0891b2',
        },
        glass: 'rgba(255, 255, 255, 0.1)',
      },
      boxShadow: {
        glow: '0 0 20px rgba(34, 211, 238, 0.5)',
      },
      backdropBlur: {
        xs: '2px',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'], // If you decide to use Orbitron
      },
    },
  },
  plugins: [],
};
