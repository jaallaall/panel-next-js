import { nextDynamic } from "components";
import { getLayout } from "layouts";

const MessageMarketingPage = () => {
  const MessageMarketing = nextDynamic("MessageMarketing");
  return <MessageMarketing />;
};

MessageMarketingPage.getLayout = getLayout;

export default MessageMarketingPage;
