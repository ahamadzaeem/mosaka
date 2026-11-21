/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        gold: {
          300: '#e5ca9e',
          400: '#d4b47d',
          500: '#c59d60',
          600: '#a87e3f',
        },
        stone: {
          850: '#171615',
          900: '#121211',
          950: '#0a0a09',
        },
      },
      letterSpacing: {
        luxury: '0.24em',
        'wide-luxury': '0.35em',
      },
    },
  },
  plugins: [],
};
