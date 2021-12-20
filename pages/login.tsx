import { nextDynamic } from "components";
import { getAuthLayout } from "layouts/AuthLayout";

const LoginPage = () => {
  const Login = nextDynamic("Auth/Login");
  return <Login />;
};

LoginPage.getLayout = getAuthLayout;

export default LoginPage;
