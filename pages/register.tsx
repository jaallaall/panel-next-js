import { nextDynamic } from "components";
import { getAuthLayout } from "layouts/AuthLayout";

const RegisterPage = () => {
  const Auth = nextDynamic("Auth");
  return <Auth />;
};

RegisterPage.getLayout = getAuthLayout;

export default RegisterPage;
