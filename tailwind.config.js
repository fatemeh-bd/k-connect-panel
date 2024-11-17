/** @type {import('tailwindcss').Config} */
import react from '@vitejs/plugin-react'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#202020"
      }
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      'datatables.net-dt/css': 'node_modules/datatables.net-dt/css',
    },
  },
}