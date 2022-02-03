import { Theme, SxProps } from "@mui/material";

export type SxPropes = SxProps<Theme>;

export enum ApiKey {
  USERALL = "USERALL",
}

export interface Options {
  [key: string]: any;
}
