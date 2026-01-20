"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type Props = {
  images: string[];
    interval?: number; // auto-play interval u ms

};

export default function AdorImageSlider({ images }: Props) {
  return (
    <Swiper spaceBetween={20} slidesPerView={1}>
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <Image
            src={img}
            alt={`Ador image ${index + 1}`}
            width={800}
            height={500}
            className="rounded-xl"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
