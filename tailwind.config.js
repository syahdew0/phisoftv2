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
          DEFAULT: '#7B1F3A',
          dark: '#5C1529',
          light: '#C9A84C',
          50: '#FDF0F3',
          100: '#E8D08A',
        },
        maroon: {
          50:  '#FDF0F3',
          100: '#F5C6D0',
          200: '#EC9CB0',
          300: '#DC6880',
          400: '#C83D5E',
          500: '#A82845',
          600: '#8A1F38',
          700: '#7B1F3A',
          800: '#5C1529',
          900: '#3E0D1C',
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
