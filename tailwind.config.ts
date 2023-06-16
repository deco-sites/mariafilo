import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: {
    container: { center: true },
    colors: {
      role: {
        brand: {
          primary: {
            "1": "#BB9059",
          },
        },
        neutral: {
          light: {
            "1": "#fff",
            "2": "#f1f1f1",
            "3": "#CCCCCC",
            "4": "#969696",
          },
          dark: {
            "1": "#000000",
            "2": "#595959",
            "3": "#757575",
          },
        },
      },
    },
  },
};
