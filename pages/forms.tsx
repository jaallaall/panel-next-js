import { nextDynamic } from "components";
import { getLayout } from "layouts";

const FormsPage = () => {
  const Forms = nextDynamic("Forms");
  return <Forms />;
};

FormsPage.getLayout = getLayout;

export default FormsPage;
