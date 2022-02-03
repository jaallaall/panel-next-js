import Box from "@mui/material/Box";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useColorMode, useDirMode } from "hooks";
import { useRouter } from "next/router";
import Image from "next/image";
import { Link } from "@mui";

const Settings: React.FC<{
  open: boolean;
  handleClickClose: (e?: any) => void;
}> = ({ open, handleClickClose }): React.ReactElement => {
  const { locales, pathname, query, asPath } = useRouter();
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
            sx={{ width: "100%" }}
          >
            <FormatColorFillIcon sx={{ mr: 2 }} />
            change color
          </Button>
          {locales?.map((loc) => {
            return (
              <Link
                color="primary"
                onClick={toggleDirectionMode}
                sx={{ mt: 4, display: "inline-flex", p: 2 }}
                key={loc}
                href={{ pathname, query }}
                as={asPath}
                locale={loc}
              >
                {/* <Image
                  src={`${
                    loc === "en" ? "EN".toLowerCase() : "IR".toLowerCase()
                  }.png`}
                  width={20}
                  height={20}
                  alt=""
                /> */}
                {loc}
              </Link>
            );
          })}
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
