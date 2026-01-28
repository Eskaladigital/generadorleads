/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        lora: ['Roboto Slab', 'serif'],
        work: ['Work Sans', 'sans-serif'],
      },
      colors: {
        accent: '#c7956d',
        'accent-light': '#e0c5a8',
      },
    },
  },
  plugins: [],
}
