import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useColorMode, useDirMode } from "hooks";

const Settings: React.FC<{
  open: boolean;
  handleClickClose: (e?: any) => void;
}> = ({ open, handleClickClose }): React.ReactElement => {
  const { toggleColorMode } = useColorMode();
  const { toggleDirectionMode } = useDirMode();

  return (
    <>
      <Stack
        sx={{
          position: "fixed",
          right: !open ? -250 : 0,
          transition: ({ transitions }) =>
            transitions.create("right", {
              easing: transitions.easing.sharp,
              duration: transitions.duration.leavingScreen,
            }),
          top: 0,
          bottom: 0,
          bgcolor: "grey.100",
          width: 250,
          zIndex: 99999,
          color: "primary.100",
        }}
      >
        <Typography variant="h5" sx={{ p: 2 }}>
          mode
        </Typography>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Button
            color="primary"
            onClick={toggleColorMode}
            sx={{ width: "100%", justifyContent: "flex-start" }}
          >
            <FormatColorFillIcon sx={{ mr: 2 }} />
            change color
          </Button>
          <Button
            color="primary"
            onClick={toggleDirectionMode}
            sx={{ width: "100%", mt: 2, justifyContent: "flex-start" }}
          >
            change direction
          </Button>
        </Box>
      </Stack>
      {open && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: "rgba(0,0,0,.5)",
            zIndex: 9999,
            transition: ({ transitions }) =>
              transitions.create("bgcolor", {
                easing: transitions.easing.sharp,
                duration: transitions.duration.leavingScreen,
              }),
          }}
          onClick={handleClickClose}
        />
      )}
    </>
  );
};

export default Settings;
