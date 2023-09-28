/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#000000',
          darkest: '#161616',
          darker: '#212121',
          darky: '#2B2B2B',
          dark: '#373737',
          gray: '#9A9CA4',
          grayDark: '#666D80',
          light: '#EBEEF3',
          lighty: '#F1F4F8',
          lighter: '#F6F8FA',
          lightest: '#FFFFFF',
          white: '#FFFFFF',
          success: '#28C780',
        },
      },
      fontFamily: {
        brand: ['Inter', 'sans-serif']
      },
    },
  },
  plugins: [],
};
