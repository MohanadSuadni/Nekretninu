"use client";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { PropertyContext } from "@/context-api/PropertyContext";

const Footer = () => {
  const { updateFilter } = useContext(PropertyContext)!;

  return (
    <footer className="relative z-10 bg-midnight_text dark:bg-semidark">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md pt-10 pb-5 px-0 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 gap-4">
          <div className="md:col-span-4 col-span-12 flex items-center px-4 sm:px-0">
            <Link href="/" className="mb-6 inline-block max-w-80">
              <Image
                src="/images/logo/Artopolis LOGOa za watermark.png"
                alt="logo"
                width={200}
                height={100}
              />
            </Link>
          </div>

          <div className="md:col-span-8 col-span-12 grid grid-cols-12 gap-4 px-4 sm:px-0">
            <div className="w-full lg:col-span-4 col-span-12">
              <h4 className="mb-4 text-lg text-white dark:text-white">
                Adresa
              </h4>
              <p className="mb-6 text-gray text-base">
                Antifašistička borba 23G /2/7
              </p>
            </div>

            <div className="w-full lg:col-span-4 col-span-12">
              <h4 className="mb-4 text-lg text-white dark:text-white">
                Brzi linkovi
              </h4>
              <ul>
                <li>
                  <Link href="/contact" className="mb-3 inline-block text-base text-gray hover:text-white">
                    Kontakt podrška
                  </Link>
                </li>
                <li>
                  <Link href="/properties/properties-list" className="mb-3 inline-block text-base text-gray hover:text-white">
                    Nekretnine
                  </Link>
                </li>
                <li>
                  <Link href="/blogs" className="mb-3 inline-block text-base text-gray hover:text-white">
                    Nova gradnja
                  </Link>
                </li>
              </ul>
            </div>

            <div className="w-full lg:col-span-4 col-span-12">
              <h4 className="mb-4 text-lg text-white dark:text-white">
                Popularne pretrage
              </h4>
              <ul>
                <li onClick={() => updateFilter("category", "Stan")}>
                  <Link href="/properties/properties-list?category=stan" className="mb-3 inline-block text-base text-gray hover:text-white">
                    Prodaja i izdavanje stanova
                  </Link>
                </li>
                <li onClick={() => updateFilter("category", "Kuća")}>
                  <Link href="/properties/properties-list?category=Kuća" className="mb-3 inline-block text-base text-gray hover:text-white">
                    Prodaja i izdavanje kuća
                  </Link>
                </li>
                <li onClick={() => updateFilter("category", "Kancelarija")}>
                  <Link href="/properties/properties-list?category=Kancelarija" className="mb-3 inline-block text-base text-gray hover:text-white">
                    Poslovni prostor na prodaju
                  </Link>
                </li>
                <li onClick={() => updateFilter("category", "Lokal")}>
                  <Link href="/properties/properties-list?category=Lokal" className="mb-3 inline-block text-base text-gray hover:text-white">
                    Lokali za izdavanje
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border dark:border-dark_border py-8">
        <div className="container flex flex-col lg:flex-row justify-between items-center mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          
          {/* Contact Info */}
          <div className="lg:max-w-45 max-w-full text-center lg:text-left mb-4 lg:mb-0">
            <div className="flex lg:flex-nowrap flex-wrap lg:flex-row lg:gap-11 gap-4 text-base sm:text-lg md:text-xl text-black text-opacity-50">
              <p className="text-white">
                Telefon: 
                <Link href="tel:+381642225543" className="text-gray hover:text-white"> +381 64 222 5543</Link>
              </p>
              <p className="text-white">
                Email: 
                <Link href="mailto:offic@artopolis369.rs" className="text-gray hover:text-white"> offic@artopolis369.rs</Link>
              </p>
            </div>
          </div>

          {/* Newsletter */}
          <div className="max-w-lg w-full">
            <div className="flex justify-center lg:justify-end">
              <p className="items-center flex mr-3 text-base sm:text-lg md:text-xl font-bold text-white">
                Newsletter
              </p>
              <input
                type="text"
                className="py-3 dark:bg-darkmode dark:text-gray !rounded-r-none border border-transparent dark:border-dark_border dark:focus:border-primary focus-visible:outline-none rounded-l-lg px-3 w-full sm:w-auto"
                placeholder="Email adresa"
              />
              <button className="py-2 px-5 sm:px-9 bg-primary text-base text-white rounded-r-lg hover:bg-blue-700">
                prijavi se
              </button>
            </div>
          </div>
        </div>

        {/* ================= COPYRIGHT ================= */}
        <div className="mt-6 border-t border-border dark:border-dark_border pt-4 text-center text-sm text-white">
          &copy; {new Date().getFullYear()} Artopolis. Dizajn by{" "}
          <a href="tel:+381695546541" className="text-white hover:text-primary font-semibold">
            M. Sudani
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
