"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import emailjs from "@emailjs/browser";

const ContactForm = () => {

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
     phone: "",
    specialist: "",
    date: "",
    time: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const reset = () => {
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
       phone: "",
      specialist: "",
      date: "",
      time: ""
    });
  };

  // ✅ EMAILJS SUBMIT (SAMO OVO JE BITNO)
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoader(true);

    try {
   await emailjs.send(
        "service_4jqx3gm",   // npr: service_xxxxx
        "template_1cqduzb",  // npr: template_xxxxx
        {
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          phone: formData.phone,
          specialist: formData.specialist,
          date: formData.date,
          time: formData.time,
        },
        "jJT0oY9CFoSG9LRvj"    // npr: xxxxxxxxxxxxxx
      );

    setSubmitted(true);
  reset();
} catch (err: any) {
  console.error("EmailJS error object:", err);
  if (err.text) console.error("Error text:", err.text);
  if (err.status) console.error("Status:", err.status);
} finally {
  setLoader(false);
}
  };

  return (
    <>
      <section className="dark:bg-darkmode lg:pb-24 pb-16 px-4">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md">
          <div className="grid md:grid-cols-12 grid-cols-1 gap-8 items-center">  
            <div className="col-span-6">
              <h2 className="max-w-100 text-[40px] leading-[1.2] font-bold mb-9">
                Zakažite Sastanak
              </h2>

              <form onSubmit={handleSubmit} className="flex flex-wrap w-full m-auto justify-between">
                <div className="sm:flex gap-3 w-full">
                  <div className="mx-0 my-2.5 flex-1">
                    <label className="pb-3 inline-block text-17">Ime*</label>
                    <input
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      className="w-full text-17 px-4 rounded-lg py-2.5 border-border dark:border-dark_border border-solid dark:text-white dark:bg-darkmode border transition-all duration-500"
                    />
                  </div>

                  <div className="mx-0 my-2.5 flex-1">
                    <label className="pb-3 inline-block text-17">Prezime*</label>
                    <input
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      className="w-full text-17 px-4 py-2.5 rounded-lg border-border dark:border-dark_border border-solid dark:text-white dark:bg-darkmode border transition-all duration-500"
                    />
                  </div>
                </div>

                <div className="sm:flex gap-3 w-full">
                  <div className="mx-0 my-2.5 flex-1">
                    <label className="pb-3 inline-block text-17">Email adresa*</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full text-17 px-4 py-2.5 rounded-lg border-border dark:border-dark_border border-solid dark:text-white dark:bg-darkmode border transition-all duration-500"
                    />
                  </div>
<div className="mx-0 my-2.5 flex-1">
  <label className="pb-3 inline-block text-17">Telefon*</label>
  <input
    type="tel"
    name="phone"
    value={formData.phone}
    onChange={handleChange}
    className="w-full text-17 px-4 py-2.5 rounded-lg border-border dark:border-dark_border border-solid dark:text-white dark:bg-darkmode border transition-all duration-500"
    placeholder="+381 60 123..."
  />
</div>
                  <div className="mx-0 my-2.5 flex-1">
                    <label className="pb-3 inline-block text-17">Specijalista*</label>
                    <select
                      name="specialist"
                      value={formData.specialist}
                      onChange={handleChange}
                      className="custom-select w-full text-17 px-4 py-2.5 rounded-lg border-border dark:text-white border-solid dark:bg-darkmode border transition-all duration-500"
                    >
                      <option value="">Izaberite razlog sastanka</option>
                      <option value="Kupujem nekretninu">Kupujem nekretninu</option>
                      <option value="Prodajem nekretninu">Prodajem nekretninu</option>
                      <option value="Iznajmljujem nekretninu">Iznajmljujem nekretninu</option>
                      <option value="Tražim zakup">Tražim nekretninu za iznajmljivanje</option>
                      <option value="Procjena vrijednosti">Procjena vrijednosti nekretnine</option>
                      <option value="Investiciona kupovina">Investiciona kupovina</option>
                      <option value="Savjetovanje">Savjetovanje</option>
                    </select>
                  </div>
                </div>

                <div className="sm:flex gap-3 w-full">
                  <div className="mx-0 my-2.5 flex-1">
                    <label className="pb-3 inline-block text-17">Datum*</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full text-17 px-4 rounded-lg py-2.5 dark:text-white dark:bg-darkmode border-border border-solid border"
                    />
                  </div>

                  <div className="mx-0 my-2.5 flex-1">
                    <label className="pb-3 inline-block text-17">Vreme*</label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full text-17 px-4 rounded-lg py-2.5 dark:text-white dark:bg-darkmode border-border border-solid border"
                    />
                  </div>
                </div>

                <div className="mx-0 my-2.5 w-full">
                  <button type="submit" className="bg-primary rounded-lg text-white py-4 px-8 mt-4 inline-block hover:bg-blue-700">
                    {loader ? "Slanje..." : "Zakažite Termin"}
                  </button>
                </div>

                {submitted && (
                  <p className="text-green-600 mt-2">
                    Termin je uspešno poslat.
                  </p>
                )}
              </form>
            </div>

            <div className="col-span-6 h-[600px]">
              <Image
                src="/images/contact-page/Image Jan 26, 2026, 10_24_50 PM.png"
                alt="Kontakt"
                width={1300}
                height={0}
                quality={100}
                className="w-full h-full object-cover bg-no-repeat bg-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactForm;
