import { nextDynamic } from "components";
import type { NextPage } from "next";

const HomePage: NextPage = () => {
  const Home = nextDynamic("Home");
  return <Home />;
};

export default HomePage;
