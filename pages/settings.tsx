import { nextDynamic } from "components";
import type { NextPage } from "next";

const SettingsPage: NextPage = () => {
  const Settings = nextDynamic("Settings");
  return <Settings />;
};

export default SettingsPage;
