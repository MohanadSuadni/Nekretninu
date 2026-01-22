"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

type Props = {
  images: string[];
  interval?: number; // auto-play interval u ms
};

export default function AdorImageSlider({
  images,
  interval = 3000,
}: Props) {
  if (images.length === 0) return null;

  return (
    <Swiper
      spaceBetween={20}
      slidesPerView={1}
      loop={images.length > 1}
      autoplay={{
        delay: interval,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      className="rounded-xl"
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <Image
            src={img}
            alt={`Ador image ${index + 1}`}
            width={800}
            height={500}
            className="w-full h-auto rounded-xl object-cover"
            priority={index === 0}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
