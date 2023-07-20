const colors = require("tailwindcss/colors");
/* @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      height: {
        hero: "42rem",
        popup_mobile: "24rem",
        popup: "34rem",
      },
      maxHeight: {
        trending: "80vh",
      },
      minHeight: {
        trending: "80vh",
      },
      gridTemplateColumns: {
        footer: "1fr 3fr",
        articles: "2fr 5fr 2fr",
        articles_lg: "2fr 1fr",
        profile: "2fr 3fr",
        profile_2xl: "1fr 3fr",
      },
    },
    colors: {
      ...colors,
      primary: "#089cf4",
      dark: "#161616"
    },
  },
  plugins: [],
};
