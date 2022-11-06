/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#14121E",
        secondary: "#FFEFE2",
        accent: "#FAFAFA",
        terciary: "#FCF3FD",
        darkPrimary: "#111826",
      },
    },
  },
  plugins: [],
};
