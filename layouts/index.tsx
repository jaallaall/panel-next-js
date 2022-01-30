import { Breadcrumbs } from "@mui";
import Stack from "@mui/material/Stack";
import Dashboard from "components/Dashboard";
import { menu } from "components/Dashboard/menu";
import { Header } from "components/Header";
import { Dic } from "interfaces";
import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import Helmet from "./Helmet";
import Settings from "./Settings";

const Layout: React.FC = ({ children }): React.ReactElement => {
  const [cookie] = useCookies(["token"]);
  const { t } = useTranslation();
  const { push, pathname } = useRouter();
  const [sidebar, setSidebar] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);

  const toggleDrawer = () => {
    setSidebar(!sidebar);
    setHover(!hover);
  };

  // useEffect(() => {
  //   if (!Boolean(cookie.token)) push("/login");
  // }, []);

  return (
    <Helmet>
      <Settings open={open} handleClickClose={() => setOpen(false)} />
      <Header
        toggleDrawer={toggleDrawer}
        open={sidebar}
        handleClickOpen={() => setOpen(!open)}
      />
      <Dashboard open={sidebar} setSidebar={setSidebar} hover={hover} />
      <Stack
        component="main"
        sx={{
          p: 3,
          ml: ({ spacing }) => ({
            lg: sidebar ? spacing(30) : spacing(7),
            xs: spacing(6),
          }),
          transition: ({ transitions }) =>
            transitions.create("margin", {
              easing: transitions.easing.sharp,
              duration: transitions.duration.leavingScreen,
            }),
          mt: 8,
        }}
      >
        <Breadcrumbs
          home={t(Dic.dashboard)}
          menu={menu}
          sx={{ color: "primary.100" }}
        />

        {children}
      </Stack>
    </Helmet>
  );
};

export function getLayout(page: NextPage) {
  return <Layout>{page}</Layout>;
}
