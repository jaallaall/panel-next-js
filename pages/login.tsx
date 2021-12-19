import { nextDynamic } from "components";
import type { NextPage } from "next";

const LoginPage: NextPage = () => {
  const Login = nextDynamic("Auth/Login");
  return <Login />;
};

export default LoginPage;
