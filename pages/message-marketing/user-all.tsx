import { nextDynamic } from "components";
import { getLayout } from "layouts";

const UserAllPage = () => {
  const UserAll = nextDynamic("MessageMarketing/UserAll");
  return <UserAll />;
};

UserAllPage.getLayout = getLayout;

export default UserAllPage;
