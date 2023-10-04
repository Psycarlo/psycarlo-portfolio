/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '480px',
      he: '530px',
      sm: '640px',
      md: '768px',
      mg: '890px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {
      colors: {
        brand: {
          black: '#000000',
          darkest: '#161616',
          darker: '#212121',
          darky: '#2B2B2B',
          dark: '#373737',
          grayLightest: '#D9DFE8',
          grayLight: '#BFC3CB',
          gray: '#9A9CA4',
          grayDark: '#666D80',
          grayDarkest: '#424242',
          light: '#EBEEF3',
          lighty: '#F1F4F8',
          lighter: '#F6F8FA',
          lightest: '#FFFFFF',
          white: '#FFFFFF',
          success: '#28C780',
          error: '#D05353'
        }
      },
      fontFamily: {
        brand: ['Inter Variable', 'sans-serif']
      }
    }
  },
  plugins: []
}
