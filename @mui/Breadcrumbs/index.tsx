import Breadcrumbs, { BreadcrumbsProps } from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { useTranslate, TranslationKeysAll } from "hooks";
import { SxPropes } from "interfaces";
import { TFunction } from "next-i18next";
import { useRouter } from "next/router";
import { NextLink } from "../Link";

export const BreadcrumbsCustom: React.FC<
  {
    home: string;
    sx?: SxPropes;
    menu: (e: TFunction) => { [key: string]: any }[];
  } & BreadcrumbsProps
> = ({ home, sx, menu, ...rest }): React.ReactElement | null => {
  const { pathname } = useRouter();
  const { t } = useTranslate();

  function capitalizeFirstLetter(string: string) {
    const words = string.split("-");
    return words
      .map((word, i) => {
        if (i > 0) return word[0].toUpperCase() + word.substring(1);
        return word;
      })
      .join("");
  }

  const breadcrumb = pathname.split("/");
  breadcrumb.splice(0, 1, home);
  const final = breadcrumb.filter((item) => item !== "");

  return final.length !== 1 ? (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{
        mb: 3,
        color: "inherit",
        bgcolor: "#f5f5f5",
        fontSize: 14,
        p: ({ spacing }) => spacing(1, 2),
        borderRadius: 2,
        "& .MuiBreadcrumbs-separator": {
          display: final[1] === "" ? "none" : "",
        },
        ...sx,
      }}
      {...rest}
    >
      {final?.map((item, i) => {
        if (
          i === final.length - 1 ||
          menu(t)?.some((it) => it.href === item && it.subMenu.length > 0)
        ) {
          return (
            <Typography key={i} sx={{ fontSize: "inherit" }}>
              {t(item as TranslationKeysAll)}
            </Typography>
          );
        }
        return (
          <NextLink
            underline="hover"
            href={item === home ? "/" : `/${item}`}
            key={i}
          >
            {/* {(menu(t) as any)[capitalizeFirstLetter(item)]} */}
            {t(item as TranslationKeysAll)}
          </NextLink>
        );
      })}
    </Breadcrumbs>
  ) : null;
};
