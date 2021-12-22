import { nextDynamic } from "components";
import { getLayout } from "layouts";

const UserCreatePage = () => {
  const MessageMarketing = nextDynamic("MessageMarketing");
  return <MessageMarketing />;
};

UserCreatePage.getLayout = getLayout;

export default UserCreatePage;
