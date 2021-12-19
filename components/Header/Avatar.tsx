import { Box } from "@mui";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useLogout } from "services";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const AvatarList: React.FC = (): React.ReactElement => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const { push } = useRouter();
  const { mutate } = useLogout();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickLogout = () => {
    removeCookie("token");
    mutate(null);
    push("/login");
  };
  const user = "jalal";
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <Box display="flex" alignItems="center" sx={{ ml: 3 }}>
          <Typography sx={{ mr: 1 }}>
            {user.charAt(0).toUpperCase() + user.slice(1)}
          </Typography>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar
              alt="Remy Sharp"
              sx={{ bgcolor: "#7081b9", width: 35, height: 35 }}
            />
          </IconButton>
        </Box>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem
            key={setting}
            onClick={setting === "Logout" ? handleClickLogout : undefined}
          >
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default AvatarList;
