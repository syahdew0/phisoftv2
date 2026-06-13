/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#752918',
          dark: '#4b190f',
          light: '#C9A84C',
          50: '#f5ece8',
          100: '#e8d0c8',
        },
        maroon: {
          50:  '#f5ece8',
          100: '#e8d0c8',
          200: '#d4aca0',
          300: '#bc7d6e',
          400: '#9b5242',
          500: '#752918',
          600: '#5f2115',
          700: '#4b190f',
          800: '#3a130b',
          900: '#2a0d07',
        },
        gold: {
          50:  '#FDF8EC',
          100: '#F9ECC6',
          200: '#F2D98A',
          300: '#E8C050',
          400: '#D9A82C',
          500: '#C9A84C',
          600: '#B08A2A',
          700: '#8F6E20',
          800: '#6E5218',
          900: '#4D3A10',
        },
      },
    },
  },
  plugins: [],
}
