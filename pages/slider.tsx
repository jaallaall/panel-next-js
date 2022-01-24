import { nextDynamic } from "components";
import { getLayout } from "layouts";

const SliderPage = () => {
  const Slider = nextDynamic("Slider");
  return <Slider />;
};

SliderPage.getLayout = getLayout;

export default SliderPage;
