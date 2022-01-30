import { SxProps } from "@mui/system";
import { Theme } from "@mui/material";
import dic from "public/locales/en/common.json";

export const Dic = (() =>
  ({
    ...Object.keys(dic)
      .filter((k) => isNaN(Number(k)))
      .reduce(
        (acc, cur) => ({
          ...acc,
          [cur]: cur,
        }),
        {}
      ),
  } as {
    [k in keyof typeof dic]: k;
  }))();

export type SxPropes = SxProps<Theme>;
export interface SxObject {
  [key: string]: SxProps<Theme>;
}

export interface Options {
  [key: string]: any;
}

export interface MyValues {
  [key: string]: string | null | { name: string };
}
