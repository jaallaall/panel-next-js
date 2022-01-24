import { fontType, stylesRtl, defStyle } from "@mui/CacheProvider";
import { PaletteOptions } from "@mui/material";
import * as locales from "@mui/material/locale";
import { createTheme } from "@mui/material/styles";

type SupportedLocales = keyof typeof locales;

const locale = locales.enUS;

const customTheme = (palette: PaletteOptions, dir: "rtl" | "ltr") => {
  console.log(dir);
  return createTheme({
    direction: dir,
    typography: {
      fontFamily:
        dir === "rtl"
          ? fontType
          : "system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji",
      h1: {
        fontSize: "2.5rem",
      },
      h2: {
        fontSize: "2rem",
      },
      h3: {
        fontSize: "1.75rem",
      },
      h4: {
        fontSize: "1.5rem",
      },
      h5: {
        fontSize: "1.25rem",
      },
      h6: {
        fontSize: "1rem",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: dir === "rtl" ? stylesRtl : defStyle,
      },
      MuiInputBase: {
        styleOverrides: {
          formControl: {
            color: "#707070",
            backgroundColor: "#fff",
          },
          input: {
            direction: dir === "rtl" ? "ltr" : "ltr",
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            direction: dir === "rtl" ? "ltr" : "ltr",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            color: "#333",
            direction: dir === "rtl" ? "ltr" : "ltr",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            color: "inherit",
          },
          head: {
            fontWeight: 600,
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: "#999",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            borderColor: "rgba(0, 0, 0, 0.23) !important",
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: "inherit",
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: "rgba(0, 0, 0, 0.23)",
          },
        },
      },
    },
    palette,
  });
};

export default customTheme;
