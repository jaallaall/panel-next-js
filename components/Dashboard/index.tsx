import { Paper, Stack } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { styled } from "@mui/material/styles";
import ListItems from "./ListItems";
import { menu } from "./menu";
import { useTranslation } from "next-i18next";

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      // [theme.breakpoints.up("sm")]: {
      //   width: theme.spacing(0),
      // },
      left: -4,
    }),
  },
}));

const Dashboard: React.FC<{
  open?: boolean;
  hover?: boolean;
  setSidebar: (e: any) => void;
}> = ({ open, setSidebar, hover }): React.ReactElement => {
  const { t } = useTranslation("common");
  return (
    <Stack
      sx={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 999,
        mt: { lg: 8, xs: 7 },
        direction: "inherit",
        "& .MuiPaper-root": {
          direction: "inherit",
          bgcolor: ({ palette }) => palette.primary.main,
          borderRadius: 0,
          color: "#e6e6e6",
          "&::-webkit-scrollbar": {
            width: 7,
          },

          "&::-webkit-scrollbar-track": {
            bgcolor: ({ palette }) => palette.primary.main,
          },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: ({ palette }) => palette.primary.dark,
          },
          "::-webkit-scrollbar-thumb:hover": {
            bgcolor: "#0e3370",
          },
        },
      }}
      component={Paper}
      onMouseOver={hover ? () => setSidebar(true) : undefined}
      onMouseLeave={hover ? () => setSidebar(false) : undefined}
    >
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          height: "100%",
        }}
      >
        <List component="nav" aria-labelledby="nested-list-subheader">
          {menu(t).map((item, i) => {
            return (
              <ListItems
                key={i}
                name={item.name}
                subMenu={item.subMenu}
                openDrawer={open}
                subName={"name"}
                icon={item.icon}
                href={item.href}
              />
            );
          })}
        </List>
      </Drawer>
    </Stack>
  );
};

export default Dashboard;
