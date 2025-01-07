module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#B71C1C',
          dark: '#7f1616',  // A darker shade for hover states
          light: '#e53935', // A lighter shade for highlights
        }
      },
      keyframes: {
        'fade-out': {
          '0%': { opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'pinch': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.8)' },
          '100%': { transform: 'scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-out': 'fade-out 4s ease-in-out forwards',
        'pinch': 'pinch 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.3s ease-in-out',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
} 