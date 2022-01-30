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

// export enum Dic {
//   table = "table",
//   forms = "forms",
//   messageMarketing = "messageMarketing",
//   userCreate = "userCreate",
//   userAll = "userAll",
//   swiper = "swiper",
//   dashboard = "dashboard",
//   type = "type",
//   email = "email",
//   phoneNumber = "phoneNumber",
//   city = "city",
//   username = "username",
//   password = "password",
//   message = "message",
//   gender = "gender",
//   number = "number",
//   description = "description",
//   message_count = "message_count",
//   admin_accept = "admin_accept",
//   male = "male",
//   female = "female",
//   total_cost = "total_cost",
//   search = "search",
//   other = "other",
// }
