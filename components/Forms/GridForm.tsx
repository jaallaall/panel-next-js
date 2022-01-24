import { Options } from "interfaces";
import { Grid, GridItem } from "@mui";
import { IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment-jalaali";
import { forwardRef } from "react";

function GridFormRef(
  {
    data,
    handleDelete,
  }: {
    data: Options[];
    handleDelete: (e: any) => void;
  },
  ref?: React.ForwardedRef<HTMLDivElement>
): React.ReactElement | null {
  return data?.length > 0 ? (
    <Grid cols={{ lg: 3, xs: 2 }} gap={3} sx={{ mt: 3 }} ref={ref}>
      {data?.map((item, i) => {
        return (
          <GridItem
            key={i}
            sx={{
              bgcolor: "#f5f5f5",
              p: 3,
              borderRadius: 3,
              position: "relative",
            }}
            spacing={1}
          >
            <IconButton
              onClick={() => handleDelete(item)}
              sx={{ position: "absolute", top: 2, right: 2 }}
            >
              <CloseIcon />
            </IconButton>
            {Object.keys(item).map((itm, index) => {
              if (itm === "birthDate") {
                return (
                  <Typography key={index}>
                    {moment(item[itm]).format("jYYYY/jM/jD")}
                  </Typography>
                );
              } else if (itm === "countries") {
                return <Typography key={index}>{item[itm].label}</Typography>;
              } else if (itm === "countries1") {
                return item[itm]?.map(
                  ({ label }: { label: string }, inx: number) => {
                    console.log(label);
                    return <Typography key={inx}>{label}</Typography>;
                  }
                );
              } else return <Typography key={index}>{item[itm]}</Typography>;
            })}
          </GridItem>
        );
      })}
    </Grid>
  ) : null;
}

export const GridForm = forwardRef(GridFormRef);
