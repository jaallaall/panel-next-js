import { Breadcrumbs, Section } from "@mui";
import Stack from "@mui/material/Stack";
import Dashboard from "components/Dashboard";
import { Header } from "components/Header";
import { menuUs } from "i18n";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Helmet from "./Helmet";
import Settings from "./Settings";

const Layout: React.FC<{
  handleClickDelete?: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ handleClickDelete, children }): React.ReactElement => {
  const [cookie] = useCookies(["token"]);
  const { push, pathname } = useRouter();
  const [sidebar, setSidebar] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);
  // توی مرورگر خطا میده توی پست من درسته ولی
  const toggleDrawer = () => {
    setSidebar(!sidebar);
    setHover(!hover);
  };

  useEffect(() => {
    if (!Boolean(cookie.token)) push("/login");
  }, []);

  if (
    !cookie.token &&
    pathname.split("/").some((it) => it === "login" || it === "register")
  ) {
    return (
      <Helmet>
        <Section
          sx={{
            py: 10,
            flex: "auto",
            justifyContent: "center",
            backgroundImage: "url(/images/auth-bg.png)",
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundRepeat: "repeat",
            backgroundColor: "rgba(0,0,0,0.04)",
          }}
        >
          {children}
        </Section>
      </Helmet>
    );
  }

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
          ml: ({ spacing }) => ({ lg: sidebar ? spacing(30) : spacing(7) }),
          transition: ({ transitions }) =>
            transitions.create("margin", {
              easing: transitions.easing.sharp,
              duration: transitions.duration.leavingScreen,
            }),
          mt: 8,
        }}
      >
        <Breadcrumbs home={menuUs.doshboard} sx={{ color: "primary.100" }} />

        {children}
      </Stack>
    </Helmet>
  );
};

export default Layout;
