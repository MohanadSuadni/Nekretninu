import React from 'react';
import Image from 'next/image';

export default function Testimonials() {
  return (
    <section className="px-4 md:px-0 dark:bg-darkmode">
      <div className="container lg:max-w-screen-xl md:max-w-screen-md px-8 mx-auto py-16 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Slika tima */}
        <div className="flex-1 flex justify-center md:justify-start" data-aos="fade-right">
          <Image
            src="/images/testimonial/vector-smart.png"
            alt="testimonial"
            width={451}
            height={470}
            quality={100}
    className="hidden lg:block w-full max-w-[451px] h-auto"
          />
        </div>

        {/* Tekst */}
        <div className="flex-1" data-aos="fade-left">
          {/* Quote */}
          <Image
            src="/images/testimonial/quote.svg"
            alt="quote"
            className="mb-4 md:mb-6"
            height={100}
            width={100}
          />

          {/* Glavni tekst */}
<p className="text-lg md:text-2xl text-gray mb-6 md:mb-12">
                Naš tim čine posvećeni agenti i savetnici sa jasnim ciljem – 
            da vam pruže sigurnu, transparentnu i efikasnu uslugu 
            pri kupovini, prodaji ili izdavanju nekretnina.
          </p>

          {/* Ime tima */}
<p className="text-lg md:text-2xl">
  <span className="text-[#002f55] dark:text-white font-sans font-semibold">
    ARTOPOLIS
  </span>{" "}
  <span className="text-[#00bfff] font-sans font-semibold">
    369
  </span>
</p>
<p className="text-gray text-lg md:text-xl">Tim za nekretnine</p>
        </div>

      </div>
    </section>
  );
}
