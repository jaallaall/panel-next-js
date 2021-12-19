import { nextDynamic } from "components";
import type { NextPage } from "next";

const RegisterPage: NextPage = () => {
  const Auth = nextDynamic("Auth");
  return <Auth />;
};

export default RegisterPage;
