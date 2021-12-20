import { nextDynamic } from "components";
import { getLayout } from "layouts";

const HomePage = () => {
  const Home = nextDynamic("Home");
  return <Home />;
};

HomePage.getLayout = getLayout;

export default HomePage;
