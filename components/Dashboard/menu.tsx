import { menuUs } from "i18n";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import MobileFriendlyIcon from "@mui/icons-material/MobileFriendly";
import EmailIcon from "@mui/icons-material/Email";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";

export const menu = [
  {
    name: menuUs.MessageMarketing,
    icon: <DisplaySettingsIcon sx={{ mr: 1 }} />,
    href: "message-marketing",
    subMenu: [
      { name: "user create", href: "user-create" },
      { name: "user all", href: "user-all" },
    ],
  },
  {
    name: menuUs.userProfile,
    icon: <AccountBoxIcon sx={{ mr: 1 }} />,
    href: "userProfile",
    subMenu: [],
  },
  {
    name: menuUs.services,
    icon: <HomeRepairServiceIcon sx={{ mr: 1 }} />,
    href: "services",
    subMenu: [],
  },
  {
    name: menuUs.MobileManagement,
    icon: <MobileFriendlyIcon sx={{ mr: 1 }} />,
    href: "MobileManagement",
    subMenu: [],
  },
  {
    name: menuUs.EmailManagement,
    icon: <EmailIcon sx={{ mr: 1 }} />,
    href: "EmailManagement",
    subMenu: [],
  },
  {
    name: menuUs.changePassword,
    icon: <EnhancedEncryptionIcon sx={{ mr: 1 }} />,
    href: "changePassword",
    subMenu: [],
  },
];
