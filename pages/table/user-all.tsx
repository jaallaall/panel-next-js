import { nextDynamic } from "components";
import { getLayout } from "layouts";

const UserAllPage = () => {
  const UserAll = nextDynamic("Table/UserAll");
  return <UserAll />;
};

UserAllPage.getLayout = getLayout;

export default UserAllPage;
