import { menu } from "i18n";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material";

export type Routes = { [key in keyof typeof menu]?: any };

export type Pages = keyof typeof menu;

export enum Api {
  Mission = "Mission",
}

export enum ApiKeys {
  Mission = "Mission",
  MissionId = "MissionId",
}

export type Endpoint = keyof typeof Api;
export type EndpointKey = keyof typeof ApiKeys;

// const keysApi = Object.keys(Api).reduce(
//     (acc, cur) => ({ ...(acc as any), [cur]: cur }),
//     {} as const
// )

// export type ApiKey = keyof typeof keysApi

// export const getKeys = <A extends Api>(obj: A) =>
//     Object.keys(obj) as (keyof A)[]

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

export enum ROUTESURL {
  signin = "signin",
  home = "/",
}
