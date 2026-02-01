"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: string[];
  title?: string;
};

export default function ImageSlider({ images, title }: Props) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const prev = () =>
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () =>
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  if (!images || images.length === 0) return null;

  return (
    <>
      {/* ===== SLIDER ===== */}
      <div
        className="relative w-full h-full overflow-hidden rounded-lg cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Image
          src={images[index]}
          alt={title || "Property image"}
          fill
          priority
          className="
            object-contain 
            object-cover 
bg-transparent"
        />

        {/* Overlay tekst */}
        <span className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded text-sm">
          Tap to view gallery
        </span>

        {/* Strelice */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
            >
              <ChevronRight />
            </button>
          </>
        )}
      </div>

      {/* ===== LIGHTBOX ===== */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Close */}
          <button
            className="absolute top-6 right-6 text-white"
            onClick={() => setOpen(false)}
          >
            <X size={32} />
          </button>

          {/* Prev */}
          <button
            onClick={prev}
            className="absolute left-6 text-white"
          >
            <ChevronLeft size={40} />
          </button>

          {/* Image */}
          <div className="relative w-full max-w-6xl h-[80vh]">
            <Image
              src={images[index]}
              alt={title || "Property image"}
              fill
              className="object-contain"
            />
          </div>

          {/* Next */}
          <button
            onClick={next}
            className="absolute right-6 text-white"
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </>
  );
}
