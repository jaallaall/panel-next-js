import createCache, { EmotionCache, Options } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import Stack from "@mui/material/Stack";
import rtlPlugin from "stylis-plugin-rtl";
import { defaultStyles, fontFamily, styleRtl } from "./styles";

export const fontType = "IRANSans";
export const stylesRtl = fontFamily + defaultStyles + styleRtl;
export const defStyle = defaultStyles;

// Create rtl cache
export const createEmotionCache: EmotionCache = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
} as Options);

const CacheProviderRtl: React.FC<{ direction?: "rtl" | "ltr" }> = ({
  children,
  direction,
}): React.ReactElement => {
  if (direction === "rtl") {
    return (
      <CacheProvider value={createEmotionCache}>
        <Stack dir="rtl" sx={{ minHeight: "100vh" }}>
          {children}
        </Stack>
      </CacheProvider>
    );
  }
  return children as React.ReactElement;
};

export default CacheProviderRtl;
