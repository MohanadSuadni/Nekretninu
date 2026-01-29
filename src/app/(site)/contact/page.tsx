import React from "react";
import { Metadata } from "next";
import HeroSub from "@/app/components/shared/hero-sub";
import ContactInfo from "@/app/components/contact/contact-info";
import ContactForm from "@/app/components/contact/form";
import Location from "@/app/components/contact/office-location";

export const metadata: Metadata = {
  title: "Kontakt | Artopolis 369",
};

const page = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Početna" },
    { href: "/contact", text: "Kontakt" },
  ];

  return (
    <>
      <HeroSub
        title="Kontaktirajte nas"
        description="Stojimo vam na raspolaganju za sva pitanja u vezi kupovine, prodaje ili izdavanja nekretnina."
        breadcrumbLinks={breadcrumbLinks}
      />
      <ContactInfo />
      <ContactForm />
    </>
  );
};

export default page;
