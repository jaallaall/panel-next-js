import { nextDynamic } from "components";
import { getLayout } from "layouts";

const UserCreatePage = () => {
  const UserCreate = nextDynamic("Table/UserCreate");
  return <UserCreate />;
};

UserCreatePage.getLayout = getLayout;

export default UserCreatePage;
