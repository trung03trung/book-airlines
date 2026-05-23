/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'vna-teal': '#008080',
        'vna-teal-dark': '#006666',
        'vna-gold': '#B8860B',
        'vna-gold-light': '#DAA520',
        'vna-navy': '#1A2B4A',
        'vna-navy-dark': '#0F1B2D',
        'vna-gray-bg': '#F5F5F5',
        'vna-gray-text': '#666666',
        'vna-gray-light': '#999999',
        'vna-border': '#E5E5E5',
      },
      fontFamily: {
        sans: ['"Noto Sans"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        vna: '1200px',
      },
    },
  },
  plugins: [],
}
