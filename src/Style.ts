export const Colours = {
  primary: "#df5e88",
  secondary: "#8fcfd1",
  background: "#fdfdfd",
  lightGrey: "#C4C4C4",
  lightText: "#F5F5F5",
  darkText: "#282c34",
  white: "#fdfdfd",
};

export const Padding = {
  default: "40px",
};

export const GrommetTheme = {
  global: {
    font: {
      family: "Roboto",
      size: "14px",
      height: "20px",
    },
    input: {
      weight: 400,
    },
  },
  textInput: {
    extend: " color: #282c34; padding: 0; padding-right: 10px;",
  },
  select: {
    textInput: {
      extend:
        "text-align: right; color: #282c34; padding: 0; padding-right: 10px;",
    },
    options: {
      container: { align: "start", pad: "small" },
    },
    control: {
      extend: "border: none; ",
    },
    icons: {
      margin: "none",
    },
  },
};
