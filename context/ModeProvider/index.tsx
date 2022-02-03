import CacheProviderRtl from "@mui/CacheProvider";
import { ThemeProvider } from "@mui/material/styles";
// import { i18n } from "next-i18next";
import { createContext, useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import customTheme from "theme";
import { getDesignTokens } from "theme/palette";

export interface Mode {
  toggleColorMode: () => void;
  mode: "light" | "dark";
}

export interface Dir {
  toggleDirectionMode: () => void;
  dir: "rtl" | "ltr";
}

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: "light",
});

export const DirectionModeContext = createContext({
  toggleDirectionMode: () => {},
  dir: "rtl",
});

export const ColorModeProvider: React.FC = ({
  children,
}): React.ReactElement => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const [dir, setDir] = useState<"rtl" | "ltr">("rtl");
  const [cookie, setCookie] = useCookies(["theme"]);

  useEffect(() => {
    if (cookie.theme) {
      setMode(cookie.theme.mode);
      setDir(cookie.theme.dir);
    }
  }, []);

  useEffect(() => {
    setCookie("theme", JSON.stringify({ mode, dir }));
  }, [mode, dir]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode,
    }),
    [mode]
  );

  const directionMode = useMemo(
    () => ({
      toggleDirectionMode: () => {
        // if (i18n) i18n.changeLanguage(i18n.language === "en" ? "fa" : "en");
        setDir((prevMode) => (prevMode === "ltr" ? "rtl" : "ltr"));
      },
      dir,
    }),
    [dir]
  );

  const theme = useMemo(
    () => customTheme(getDesignTokens(cookie.theme?.mode), cookie.theme?.dir),
    [cookie.theme]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <DirectionModeContext.Provider value={directionMode}>
        <CacheProviderRtl direction={dir}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </CacheProviderRtl>
      </DirectionModeContext.Provider>
    </ColorModeContext.Provider>
  );
};
