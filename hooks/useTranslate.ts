import { StringMap, TOptions } from "i18next";
import { useTranslation } from "next-i18next";
import dictionary from "public/locales/en/common.json";
import dictionaryMenu from "public/locales/en/menu.json";
import {
  Namespace,
  UseTranslationOptions,
  DefaultNamespace,
} from "react-i18next";

export const dic = (() =>
  ({
    ...Object.keys(dictionary)
      .filter((k) => isNaN(Number(k)))
      .reduce(
        (acc, cur) => ({
          ...acc,
          [cur]: cur,
        }),
        {}
      ),
  } as {
    [k in keyof typeof dictionary]: k;
  }))();

export const dicMenu = (() =>
  ({
    ...Object.keys(dictionaryMenu)
      .filter((k) => isNaN(Number(k)))
      .reduce(
        (acc, cur) => ({
          ...acc,
          [cur]: cur,
        }),
        {}
      ),
  } as {
    [k in keyof typeof dictionaryMenu]: k;
  }))();

export type TranslationKeys = keyof typeof dic;
export type TranslationKeysMenu = keyof typeof dicMenu;
export type TranslationKeysAll = keyof typeof dic | keyof typeof dicMenu;

export function useTranslate<
  N extends Namespace = DefaultNamespace | "common",
  TInterpolationMap extends object = StringMap
>(ns?: N | Readonly<N>, options?: UseTranslationOptions<any>) {
  const { t } = useTranslation();
  return {
    t(
      key: N extends null | "common" ? TranslationKeys : TranslationKeysMenu,
      options?: TOptions<TInterpolationMap> | string
    ) {
      return t(key, options);
    },
  };
}

// export function useTranslate<
//   N extends Namespace = DefaultNamespace | "common",
//   TKPrefix extends KeyPrefix<N> = undefined
// >(ns?: N | Readonly<N>, options?: UseTranslationOptions<TKPrefix>) {
//   const { t } = useTranslation();
//   // const tr = t()
//   return { t, dic };
// }
