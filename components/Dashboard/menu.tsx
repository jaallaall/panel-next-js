import AccountBoxIcon from "@mui/icons-material/AccountBox";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import MessageIcon from "@mui/icons-material/Message";
import { main } from "i18n";

export const menu = [
  {
    name: main.dashboard,
    icon: <DisplaySettingsIcon sx={{ mr: 1 }} />,
    href: "/",
    subMenu: [],
  },
  {
    name: main.table,
    icon: <MessageIcon sx={{ mr: 1 }} />,
    href: "table",
    subMenu: [
      { name: "ساخت کاربر", href: "user-create" },
      { name: "همه کاربران", href: "user-all" },
    ],
  },
  {
    name: main.forms,
    icon: <MessageIcon sx={{ mr: 1 }} />,
    href: "forms",
    subMenu: [],
  },
  {
    name: main.swiper,
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
