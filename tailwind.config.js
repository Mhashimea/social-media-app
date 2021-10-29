module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: { primary: "#ed4b58" },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
