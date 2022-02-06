import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import { useTheme } from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTranslate } from "hooks";
import { forwardRef } from "react";
import AvatarList from "./Avatar";
import Language from "./Language";
import Search from "./Search";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

type HeaderRefProps = {
  toggleDrawer?: React.MouseEventHandler<HTMLButtonElement>;
  open: boolean;
  handleClickOpen: (e: any) => void;
};

function HeaderRef(
  props: HeaderRefProps,
  ref?: React.ForwardedRef<HTMLDivElement>
): React.ReactElement {
  const { toggleDrawer, open, handleClickOpen } = props;
  const { t } = useTranslate();
  const { direction } = useTheme();

  return (
    <AppBar
      position="fixed"
      open={open}
      sx={{
        bgcolor: "#fff",
        color: "primary.100",
        flexDirection: "row",
        boxShadow: "none",
        direction: "inherit",
      }}
      ref={ref}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: open ? 1 : "0 !important",
          flex: { lg: open ? "0 0 " + drawerWidth + "px" : 0 },
          transition: ({ transitions }) =>
            transitions.create(["flex", "padding"], {
              easing: transitions.easing.sharp,
              duration: transitions.duration.enteringScreen,
            }),
          bgcolor: ({ palette }) => palette.primary.main,
          color: "#e6e6e6",
          borderBottom: "1px solid rgba(255,255,255,.08)",
        }}
      >
        {open && (
          <IconButton onClick={toggleDrawer} color="inherit">
            {direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        )}
      </Toolbar>
      <Toolbar
        sx={{
          pr: "24px",
          flex: "auto",
          borderBottom: "1px solid #e3ebf6",
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          {t("dashboard")}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Search />
          <IconButton color="inherit">
            <Badge
              badgeContent={4}
              color="secondary"
              sx={{
                "& .MuiBadge-colorSecondary": {
                  color: "#fff",
                },
              }}
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton onClick={handleClickOpen} color="inherit">
            <SettingsIcon />
          </IconButton>
          <Language />
          <AvatarList />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export const Header = forwardRef(HeaderRef);
