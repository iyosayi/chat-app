module.exports = {
  purge: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        sidebar: {
          primary: "#120F13",
          footer: "#0B090C",
          context: {
            primary: "#252329",
            hover: "#3C393F",
          },
        },
        content: {
          primary: "#252329",
          button: "#2F80ED",
          input: "#3C393F",
          secondaryText: "#828282",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
