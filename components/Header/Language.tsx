import { Link } from "@mui";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";

const Language: React.FC = (): React.ReactElement => {
  const { locales, locale, pathname, query, asPath } = useRouter();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ fontSize: "inherit" }}>
          <Image
            src={locale === "en" ? "/images/en.png" : "/images/ir.png"}
            width={20}
            height={20}
            alt="flag"
          />
        </IconButton>
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
        {locales?.map((loc) => {
          return (
            <Link
              color="primary"
              sx={{ display: "flex", p: 2 }}
              key={loc}
              href={{ pathname, query }}
              as={asPath}
              locale={loc}
            >
              <span style={{ marginLeft: 6 }}>
                <Image
                  src={loc === "en" ? "/images/en.png" : "/images/ir.png"}
                  width={20}
                  height={20}
                  alt="flag"
                />
              </span>
              {loc === "fa" ? "فا" : loc}
            </Link>
          );
        })}
      </Menu>
    </Box>
  );
};

export default Language;
