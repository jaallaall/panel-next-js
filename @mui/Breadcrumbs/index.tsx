import Typography from "@mui/material/Typography";
import Breadcrumbs, { BreadcrumbsProps } from "@mui/material/Breadcrumbs";
import { useRouter } from "next/router";
import { SxPropes } from "interfaces";
import { main, menuUs } from "i18n";
import { NextLink } from "../Link";

export const BreadcrumbsCustom: React.FC<
  {
    home: string;
    sx?: SxPropes;
    menu?: { [key: string]: any }[];
  } & BreadcrumbsProps
> = ({ home, sx, menu, ...rest }): React.ReactElement | null => {
  const { pathname } = useRouter();

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
          menu?.some((it) => it.href === item && it.subMenu.length > 0)
        ) {
          return (
            <Typography key={i} sx={{ fontSize: "inherit" }}>
              {(main as any)[capitalizeFirstLetter(item)]}
            </Typography>
          );
        }
        return (
          <NextLink
            underline="hover"
            href={item === home ? "/" : `/${item}`}
            key={i}
          >
            {(main as any)[capitalizeFirstLetter(item)]}
          </NextLink>
        );
      })}
    </Breadcrumbs>
  ) : null;
};
