import { nextDynamic } from "components";
import { getLayout } from "layouts";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const HomePage = () => {
  const Home = nextDynamic("Home");
  return <Home />;
};

HomePage.getLayout = getLayout;

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "menu"])),
    },
  };
}

export default HomePage;
