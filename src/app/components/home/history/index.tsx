import React from "react";
import Image from "next/image";
import "../../../style/index.css";
import Link from "next/link";

export default function History() {
  return (
    <section className="history-bg">
      <div className="container lg:max-w-screen-xl md:max-w-screen-md dark:text-black mx-auto grid grid-cols-1 lg:grid-cols-12 py-40">
        <div
          className="col-span-1 lg:col-span-7 5xl:col-span-8 px-4"
          data-aos="fade-right"
        >
          <p className="text-4xl text-midnight_text dark:text-white mb-8 font-bold">
Vaš partner u svetu nekretnina <br />
Siguran put do pravog doma           
          </p>

          <p className="mb-8 pb-2 text-gray">
            Više od tri decenije gradimo poverenje na tržištu nekretnina.
            Počevši kao mala agencija, kroz posvećenost, znanje i razumevanje
            potreba klijenata, izrasli smo u jednog od lidera u oblasti prodaje
            i izdavanja nekretnina.
            <br /><br />
            Danas stojimo iza hiljada uspešno realizovanih kupovina,
            prodaja i zakupa, nudeći sigurne, proverene i kvalitetne
            nekretnine širom zemlje.
          </p>

          <Link
            href="/properties/properties-list"
            className="text-xl px-9 py-3 border border-primary text-primary hover:text-white hover:bg-primary rounded-lg"
          >
            Saznajte više
          </Link>
        </div>

        <div
          className="hidden lg:block 5xl:col-span-4 5xl:ml-11 col-span-1 lg:col-span-5"
          data-aos="fade-left"
        >
        <div className="relative bg-white dark:bg-darklight p-4 max-w-80   border-4 border-primary rounded-lg overflow-hidden">
  <video
   src="/images/history/belgrade.mp4"
    autoPlay
    muted
    loop
    playsInline
    className="w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-black/20"></div>
</div>
        </div>
      </div>
    </section>
  );
}
