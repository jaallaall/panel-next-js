import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const AskDialog: React.FC<{
  handleClickOpen: (e?: any) => void;
  open: boolean;
  handleCloseModal?: (e?: any) => void;
}> = ({ handleClickOpen, open, handleCloseModal }): React.ReactElement => {
  const handleClose: () => void = () => {
    handleClickOpen(false);
  };

  return (
    <Dialog
      onClose={handleCloseModal}
      open={open}
      maxWidth="xs"
      sx={{
        "& .MuiPaper-root": {
          px: 3,
          py: 2,
        },
      }}
    >
      <Typography variant="h6" textAlign="center">
        {"Are you sure from delete?"}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 5,
        }}
      >
        <Button onClick={handleClose}>{"yes"}</Button>
        <Button onClick={handleCloseModal}>{"no"}</Button>
      </Box>
    </Dialog>
  );
};
