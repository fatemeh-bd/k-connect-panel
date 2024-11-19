/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        white: "var(--lightColor)",
        boxColor: "var(--boxColor)",
        gray: {
          50: "var(--gray50)",
          100: "var(--gray100)",
          200: "var(--gray200)",
          300: "var(--gray300)",
          600: "var(--gray600)",

        },
      },
    },
  },
  plugins: [],
};
