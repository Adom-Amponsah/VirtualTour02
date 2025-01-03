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
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
} 