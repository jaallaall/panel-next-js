import Button, { ButtonProps } from "@mui/material/Button";

export const ButtonCustom: React.FC<ButtonProps> = ({
  children,
  ...rest
}): React.ReactElement => {
  return (
    <Button
      {...rest}
      variant="contained"
      color="primary"
      sx={{ boxShadow: "none !important", py: 1.5 }}
    >
      {children}
    </Button>
  );
};
