import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import MessageIcon from "@mui/icons-material/Message";
import { TFunction } from "next-i18next";

export const menu = (t: TFunction) => [
  {
    name: t("dashboard"),
    icon: <DisplaySettingsIcon sx={{ mr: 1 }} />,
    href: "",
    subMenu: [],
  },
  {
    name: t("table"),
    icon: <MessageIcon sx={{ mr: 1 }} />,
    href: "table",
    subMenu: [
      { name: t("userCreate"), href: "user-create" },
      { name: t("userAll"), href: "user-all" },
    ],
  },
  {
    name: t("forms"),
    icon: <MessageIcon sx={{ mr: 1 }} />,
    href: "forms",
    subMenu: [],
  },
  {
    name: t("swiper"),
    icon: <AccountBoxIcon sx={{ mr: 1 }} />,
    href: "slider",
    subMenu: [],
  },
  // {
  //   name: menuUs.services,
  //   icon: <HomeRepairServiceIcon sx={{ mr: 1 }} />,
  //   href: "services",
  //   subMenu: [],
  // },
  // {
  //   name: menuUs.MobileManagement,
  //   icon: <MobileFriendlyIcon sx={{ mr: 1 }} />,
  //   href: "MobileManagement",
  //   subMenu: [],
  // },
  // {
  //   name: menuUs.EmailManagement,
  //   icon: <EmailIcon sx={{ mr: 1 }} />,
  //   href: "EmailManagement",
  //   subMenu: [],
  // },
  // {
  //   name: menuUs.changePassword,
  //   icon: <EnhancedEncryptionIcon sx={{ mr: 1 }} />,
  //   href: "changePassword",
  //   subMenu: [],
  // },
];
