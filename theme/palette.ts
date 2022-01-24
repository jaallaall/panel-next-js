import { PaletteMode } from "@mui/material";
import { deepOrange, grey } from "@mui/material/colors";

export const getDesignTokens = (mode: PaletteMode) => {
  return {
    mode,
    ...(mode !== "dark"
      ? {
          primary: {
            light: "#5B8EE5",
            main: "#244f96",
            dark: "#17438b",
            "100": "#7081b9",
          },
          secondary: {
            main: "#f5325c",
          },
          background: {
            default: "#fff",
            paper: "#fff",
          },
          text: {
            primary: "#333",
            secondary: "#333",
          },
        }
      : {
          primary: deepOrange,
          divider: deepOrange[700],
          background: {
            default: deepOrange[900],
            paper: deepOrange[900],
          },
          text: {
            primary: "#fff",
            secondary: grey[500],
          },
        }),
  };
};
