import CircularProgress from "@mui/material/CircularProgress";
import Button, { ButtonProps } from "@mui/material/Button";
import { SxPropes } from "interfaces";

export const ButtonCustom: React.FC<
  { loading?: boolean; sx?: SxPropes } & ButtonProps
> = ({ children, loading, sx, ...rest }): React.ReactElement => {
  return (
    <Button
      {...rest}
      variant="contained"
      color="primary"
      sx={{ boxShadow: "none !important", py: 1.5, ...sx }}
    >
      {loading && <CircularProgress size={22} sx={{ color: "#fff", mr: 3 }} />}
      {children}
    </Button>
  );
};
