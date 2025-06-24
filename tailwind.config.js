/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
  corePlugins: {
    // ปิดบาง utilities ที่อาจจะ conflict กับ Bootstrap
    preflight: false,
  },
}