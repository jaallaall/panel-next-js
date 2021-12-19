import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import { useColorMode } from "hooks";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export const SwiperCarousel: React.FC<
  {
    data?: { [key: string]: any }[];
    render: (e: any) => React.ReactElement;
  } & SwiperProps
> = ({ data, render, ...rest }) => {
  const { dir } = useColorMode();
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
      dir={dir}
      {...rest}
    >
      {data?.map((item, index) => (
        <SwiperSlide key={index}>{render(item)}</SwiperSlide>
      ))}
    </Swiper>
  );
};
