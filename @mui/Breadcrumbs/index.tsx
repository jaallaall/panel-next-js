import Typography from "@mui/material/Typography";
import Breadcrumbs, { BreadcrumbsProps } from "@mui/material/Breadcrumbs";
import { Link } from "../Link";
import { useRouter } from "next/router";
import { SxPropes } from "interfaces";

export const BreadcrumbsCustom: React.FC<
  { home: string; sx?: SxPropes } & BreadcrumbsProps
> = ({ home, sx, ...rest }): React.ReactElement => {
  const { pathname } = useRouter();

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
        if (i === breadcrumb.length - 1) {
          return <Typography key={i}>{item}</Typography>;
        }
        return (
          <Link
            underline="hover"
            href={item === home ? "/" : `/${item}`}
            key={i}
          >
            {item}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};
