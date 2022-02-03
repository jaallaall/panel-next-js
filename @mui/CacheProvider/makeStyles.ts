import { SxProps } from "@mui/system";
import { Theme } from "@mui/material";

export interface SxObject {
  [key: string]: SxProps<Theme>;
}

export const makeStyles = (style: SxObject | SxProps<Theme>) => {
  return style;
};
