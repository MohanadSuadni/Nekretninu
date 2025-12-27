"use client";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

type Props = {
  images: string[];
  open: boolean;
  index: number;
  close: () => void;
};

export default function PropertyLightbox({ images, open, index, close }: Props) {
  return (
    <Lightbox
      open={open}
      close={close}
      index={index}
      slides={images.map((img) => ({ src: img }))}
    />
  );
}
