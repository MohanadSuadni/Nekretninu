import React from "react";
import Link from "next/link";

const Location = () => {
  return (
    <section className="bg-primary lg:py-24 py-16 px-4">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md">
        <div className="grid md:grid-cols-6 lg:grid-cols-9 grid-cols-1 gap-7 border-b border-solid border-white border-opacity-50 pb-11">
          
          <div className="col-span-3">
            <h2 className="text-white text-4xl leading-[1.2] font-bold">
              Artopolis 369
            </h2>
          </div>

          <div className="col-span-3">
            <p className="text-xl text-white text-opacity-50 font-normal max-w-64">
              Antifašistička borba 23G / 2 / 7<br />
              Beograd, Srbija
            </p>
          </div>

          <div className="col-span-3">
            <Link
              href="mailto:info@artopolis369.rs"
              className="text-xl text-white font-medium underline block"
            >
              info@artopolis369.rs
            </Link>

            <Link
              href="tel:+381642225543"
              className="text-xl text-white text-opacity-80 flex items-center gap-2 hover:text-opacity-100 w-fit"
            >
              <span className="text-white !text-opacity-40">Pozovite</span>
              +381 64 222 5543
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Location;
