import Typography from "@mui/material/Typography";
import Breadcrumbs, { BreadcrumbsProps } from "@mui/material/Breadcrumbs";
import { useRouter } from "next/router";
import { SxPropes } from "interfaces";
import { menuUs } from "i18n";
import { NextLink } from "../Link";

export const BreadcrumbsCustom: React.FC<
  { home: string; sx?: SxPropes } & BreadcrumbsProps
> = ({ home, sx, ...rest }): React.ReactElement => {
  const { pathname } = useRouter();

  function capitalizeFirstLetter(string: string) {
    const words = string.split(" ");
    return words
      .map((word) => {
        return word[0].toUpperCase() + word.substring(1);
      })
      .join("");
  }

  const breadcrumb = pathname.split("/");
  breadcrumb.splice(0, 1, home);

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{
        mb: 3,
        color: "inherit",
        bgcolor: "#f5f5f5",
        p: ({ spacing }) => spacing(1, 2),
        borderRadius: 2,
        "& .MuiBreadcrumbs-separator": {
          display: breadcrumb[1] === "" ? "none" : "",
        },
        ...sx,
      }}
      {...rest}
    >
      {breadcrumb?.map((item, i) => {
        // const tit = (menuUs as any)[
        //   item === home
        //     ? home
        //     : capitalizeFirstLetter(item.split("-").join(" "))
        // ];
        if (i === breadcrumb.length - 1) {
          return <Typography key={i}>{item.split("-").join(" ")}</Typography>;
        }
        return (
          <NextLink
            underline="hover"
            href={item === home ? "/" : `/${item}`}
            key={i}
          >
            {item.split("-").join(" ")}
          </NextLink>
        );
      })}
    </Breadcrumbs>
  );
};
