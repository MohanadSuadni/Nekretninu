"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

// HERO IMAGES
const heroImages = [
  "/images/hero/shutterstock_24987766671.jpg.webp",
  "/images/hero/west-65-lux-kompleks-komforan-lokal-id-24775-5425645993789-71812851623.jpg",
  "/images/hero/maxresdefault.jpg",
];

// LOCATIONS
const searchOptions = {
  locations: [
    { value: "", label: "Lokacija" },
    { value: "Beograd", label: "Beograd" },
    { value: "Novi Sad", label: "Novi Sad" },
    { value: "Niš", label: "Niš" },
    { value: "Dedinje", label: "Dedinje" },
    { value: "Stari Grad", label: "Stari Grad" },
    { value: "Dorćol", label: "Dorćol" },
    { value: "Vračar", label: "Vračar" },
    { value: "Savski Venac", label: "Savski Venac" },
    { value: "Palilula", label: "Palilula" },
    { value: "Zemun", label: "Zemun" },
    { value: "Novi Beograd", label: "Novi Beograd" },
    { value: "Bežanijska Kosa", label: "Bežanijska Kosa" },
    { value: "Voždovac", label: "Voždovac" },
    { value: "Kanarevo Brdo", label: "Kanarevo Brdo" },
    { value: "Banjica", label: "Banjica" },
    { value: "Zvezdara", label: "Zvezdara" },
    { value: "Konjarnik", label: "Konjarnik" },
    { value: "Rakovica", label: "Rakovica" },
    { value: "Vidikovac", label: "Vidikovac" },
    { value: "Čukarica", label: "Čukarica" },
    { value: "Banovo Brdo", label: "Banovo Brdo" },
    { value: "Grocka", label: "Grocka" },
    { value: "Mladenovac", label: "Mladenovac" },
    { value: "Obrenovac", label: "Obrenovac" },
    { value: "Barajevo", label: "Barajevo" },
    { value: "Sopot", label: "Sopot" },
    { value: "Lazarevac", label: "Lazarevac" },
  ],
};

type LocationItem = {
  value: string;
  label: string;
  group: string;
  isGroup: boolean;
};

// FLAT LOCATIONS SA GROUP I isGroup FLAGOM
const flatLocations: LocationItem[] = searchOptions.locations.flatMap((loc) => {
  if (["Beograd", "Novi Sad", "Niš"].includes(loc.value)) {
    return {
      value: loc.value,
      label: loc.label,
      group: loc.value,
      isGroup: true,
    };
  }

  // Odredi kojoj grupi pripada
  let parentGroup = "Beograd";
  if (
    [
      "Dedinje",
      "Stari Grad",
      "Dorćol",
      "Vračar",
      "Savski Venac",
      "Palilula",
      "Zemun",
      "Novi Beograd",
      "Bežanijska Kosa",
      "Voždovac",
      "Kanarevo Brdo",
      "Banjica",
      "Zvezdara",
      "Konjarnik",
      "Rakovica",
      "Vidikovac",
      "Čukarica",
      "Banovo Brdo",
    ].includes(loc.value)
  ) {
    parentGroup = "Beograd";
  } else if (["Grocka", "Mladenovac", "Obrenovac", "Barajevo", "Sopot", "Lazarevac"].includes(loc.value)) {
    parentGroup = "Ostalo";
  }

  return {
    value: loc.value,
    label: `${parentGroup} – ${loc.label}`,
    group: parentGroup,
    isGroup: false,
  };
});

const Hero = () => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"prodaja" | "izdavanje">("prodaja");
  const [location, setLocation] = useState("");
  const [tag, setTag] = useState("prodaja");
  const [filteredLocations, setFilteredLocations] = useState(flatLocations);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  // FILTER LOCATIONS
  const handleLocationChange = (value: string) => {
    setLocation(value);
    const filtered = flatLocations.filter((loc) =>
      loc.label.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredLocations(filtered);
    setShowSuggestions(true);
  };

  // SEARCH FUNCTION
  const goSearch = () => {
    if (!location.trim()) {
      setError("Molimo unesite lokaciju za pretragu.");
      return;
    }
    setError("");

    router.push(
      `/properties/properties-list?location=${encodeURIComponent(location)}&tag=${encodeURIComponent(tag)}`
    );
  };

  return (
    <section className="relative pt-44 pb-0 dark:bg-darklight bg-no-repeat bg-gradient-to-b from-white from-10% dark:from-darkmode to-herobg to-90% dark:to-darklight overflow-x-hidden">
      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md relative z-10">
        <div className="grid lg:grid-cols-12 grid-cols-1">
          {/* LEFT */}
          <div className="flex flex-col col-span-6 justify-center items-start" data-aos="fade-right">
            <div className="mb-8">
              <h1 className="md:text-[50px] leading-[1.2] text-4xl ml-4 text-midnight_text dark:text-white font-bold">
                Pronađite svoju idealnu nekretninu
              </h1>
            </div>

            <div className="max-w-xl ml-4 sm:w-full">
              {/* TABS */}
              <div className="flex">
                <button
                  className={`px-9 py-3 text-xl rounded-t-md ${
                    activeTab === "prodaja"
                      ? "bg-white dark:bg-darkmode border-b border-primary"
                      : "bg-white bg-opacity-50 dark:bg-darkmode dark:bg-opacity-50"
                  }`}
                  onClick={() => {
                    setActiveTab("prodaja");
                    setTag("prodaja");
                  }}
                >
                  Prodaja
                </button>

                <button
                  className={`px-9 py-3 text-xl rounded-t-md ${
                    activeTab === "izdavanje"
                      ? "bg-white dark:bg-darkmode border-b border-primary"
                      : "bg-white bg-opacity-50 dark:bg-darkmode dark:bg-opacity-50"
                  }`}
                  onClick={() => {
                    setActiveTab("izdavanje");
                    setTag("izdavanje");
                  }}
                >
                  Izdavanje
                </button>
              </div>

              {/* SEARCH BOX */}
              <div className="bg-white dark:bg-transparent rounded-b-lg rounded-tr-lg">
                <div className="bg-white dark:bg-darkmode shadow-lg p-8 pb-10 rounded-b-lg rounded-tr-lg">
                  <div className="relative mb-4">
                    <div className="absolute left-0 p-4">
                      <Image src="/images/svgs/icon-location.svg" alt="icon" width={24} height={24} />
                    </div>

                    <input
                      type="text"
                      ref={inputRef}
                      placeholder="Izaberite lokaciju"
                      value={location}
                      onChange={(e) => handleLocationChange(e.target.value)}
                      onFocus={() => setShowSuggestions(true)}
                      className="py-5 pr-3 pl-14 w-full rounded-lg border dark:bg-[#0c121e]"
                    />

                    {showSuggestions && filteredLocations.length > 0 && (
                      <ul className="absolute left-0 right-0 top-full bg-white dark:bg-semidark border rounded-md z-10 max-h-40 overflow-y-auto">
                        {filteredLocations.map((loc) => (
                          <li
                            key={loc.value}
                            className="cursor-pointer hover:text-primary px-4 py-2"
                            onMouseDown={() => {
                              if (loc.isGroup) {
                                // kliknuta cela grupa -> selektuje sve opštine
                                const groupValues = flatLocations
                                  .filter((l) => l.group === loc.value && !l.isGroup)
                                  .map((l) => l.value)
                                  .join(",");
                                setLocation(groupValues);
                              } else {
                                setLocation(loc.value);
                              }
                              setShowSuggestions(false);
                            }}
                          >
                            {loc.label}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Pretraži button */}
                  <div className="mt-6 flex gap-4">
                    <button onClick={goSearch} className="flex-1 py-4 bg-primary text-white rounded-lg">
                      Pretraži
                    </button>
                  </div>

                  {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
                </div>
              </div>
            </div>

            {/* RATING */}
            <div className="flex flex-col justify-start ml-4 mt-8 mb-12 gap-3">
              <div className="flex space-x-2" data-aos="fade-left">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 .587l3.668 7.431L24 9.763l-6 5.847L19.336 24 12 20.019 4.664 24 6 15.61 0 9.763l8.332-1.745z" />
                  </svg>
                ))}
              </div>

 <div data-aos="fade-left" className="flex flex-col gap-4">
  <p className="text-lg dark:text-white text-black">
    4.9/5
    <span className="text-gray-400"> – na osnovu 658 recenzija</span>
  </p>

  <a
    href="#history"
    className="
      inline-flex items-center gap-2
      bg-blue-500 text-white
      px-6 py-3
      rounded-lg
      text-sm font-medium
      hover:bg-blue-600
      transition
      duration-300
      group
      overflow-hidden
    "
  >
    Saznajte više o našoj agenciji
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  </a>
</div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl xl:h-[400px] xl:w-[990px] -z-1">
            <Swiper
              slidesPerView={1}
              loop
              speed={2200}
              spaceBetween={16}
              slidesOffsetBefore={16}
              slidesOffsetAfter={16}
              autoplay={{ delay: 3500, disableOnInteraction: false }}
              modules={[Autoplay]}
            >
              {heroImages.map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-[270px] sm:h-[350px] md:h-[450px] lg:h-[500px] xl:h-[550px] rounded-3xl overflow-hidden shadow-none">
                    {/* Badge */}
                    <div className="absolute top-4 left-4 z-20 bg-primary text-white px-4 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-md">
                      Premium nekretnine
                    </div>

                    {/* Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-6 bg-gradient-to-t from-black/60 to-transparent">
                      <h3 className="text-white text-lg sm:text-2xl font-bold">
                        Pouzdana kupovina i izdavanje
                      </h3>
                      <p className="text-white/80 text-xs sm:text-sm mt-1">
                        Beograd • Novi Sad • Ekskluzivne lokacije
                      </p>
                    </div>

                    <Image src={img} alt={`Hero ${index + 1}`} fill priority={index === 0} className="object-cover zoom-animation" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;