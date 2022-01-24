import { useDirMode } from "hooks";
import SwiperCore, { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperProps, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import Box from "@mui/material/Box";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { SxProps } from "@mui/material";

SwiperCore.use([Navigation]);

interface IBreakpoints {
  md?: { slidesPerView?: number; spaceBetween?: number };
  lg?: { slidesPerView?: number; spaceBetween?: number };
  xl?: { slidesPerView?: number; spaceBetween?: number };
}

export const SwiperCarousel: React.FC<
  {
    data?: { [key: string]: any }[];
    render: (e: any) => React.ReactElement;
    breakpoints?: IBreakpoints;
    sx?: SxProps;
  } & SwiperProps
> = ({ data, render, breakpoints, sx, ...rest }) => {
  const { dir } = useDirMode();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  return (
    <>
      <Swiper
        // install Swiper modules
        modules={[Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        // slidesPerView={3}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
        dir={dir}
        breakpoints={{
          467: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: breakpoints?.md?.slidesPerView || 2,
            spaceBetween: breakpoints?.md?.spaceBetween || 10,
          },
          922: {
            slidesPerView: breakpoints?.lg?.slidesPerView || 3,
            spaceBetween: breakpoints?.lg?.spaceBetween || 16,
          },
          1200: {
            slidesPerView: breakpoints?.xl?.slidesPerView || 3,
            spaceBetween: breakpoints?.xl?.spaceBetween || 20,
          },
        }}
        style={{ width: "100%" }}
        {...rest}
      >
        {data?.map((item, index) => (
          <SwiperSlide key={index}>{render(item)}</SwiperSlide>
        ))}
      </Swiper>
      <Box sx={sx}>
        <div ref={prevRef}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 512"
            fill="currentColor"
            width={30}
            height={30}
          >
            <path d="M203.9 405.3c5.877 6.594 5.361 16.69-1.188 22.62c-6.562 5.906-16.69 5.375-22.59-1.188L36.1 266.7c-5.469-6.125-5.469-15.31 0-21.44l144-159.1c5.906-6.562 16.03-7.094 22.59-1.188c6.918 6.271 6.783 16.39 1.188 22.62L69.53 256L203.9 405.3z" />
          </svg>
        </div>
        <div ref={nextRef}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 512"
            fill="currentColor"
            width={30}
            height={30}
          >
            <path d="M219.9 266.7L75.89 426.7c-5.906 6.562-16.03 7.094-22.59 1.188c-6.918-6.271-6.783-16.39-1.188-22.62L186.5 256L52.11 106.7C46.23 100.1 46.75 90.04 53.29 84.1C59.86 78.2 69.98 78.73 75.89 85.29l144 159.1C225.4 251.4 225.4 260.6 219.9 266.7z" />
          </svg>
        </div>
      </Box>
    </>
  );
};
