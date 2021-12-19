import { AuthContext, ColorModeContext, DirectionModeContext } from "context";
import { useContext } from "react";

export function useColorMode() {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error("useColorMode must be used within a Provider");
  }
  return context;
}
export function useDirMode() {
  const context = useContext(DirectionModeContext);
  if (!context) {
    throw new Error("useDirMode must be used within a Provider");
  }
  return context;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a Provider");
  }
  return context;
}
