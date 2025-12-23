/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          50: '#faf8f6',
          100: '#f5f1eb',
          200: '#e8ddd0',
          300: '#d4c4b0',
          400: '#b89d7f',
          500: '#9d7a5f',
          600: '#7d6149',
          700: '#5d4837',
          800: '#3e3025',
          900: '#1f1812',
        },
        cream: {
          50: '#fefdfb',
          100: '#fdfbf7',
          200: '#faf7ef',
          300: '#f6f0e3',
          400: '#f2e9d7',
          500: '#ede2cb',
          600: '#d4c9b5',
          700: '#9d937f',
          800: '#6b6253',
          900: '#3a3329',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}



