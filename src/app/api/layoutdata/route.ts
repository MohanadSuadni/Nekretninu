import { NextResponse } from "next/server";

const headerData = [
  { label: "Početna", href: "/" },
  {
    label: "Nekretnine",
    href: "#",
    submenu: [
      { label: "Lista nekretnina", href: "/properties/properties-list" },
    ],
  },
    { label: "Stručni savetnik", href: "documentation" },

  {
    label: "Novogradnja",
    href: "#",
    submenu: [
      { label: "Novogradnja – mrežni prikaz", href: "/blogs" },
      { label: "Detalji Novogradnja", href: "/blogs/blog_1" },
    ],
  },
  { label: "Kontakt", href: "/contact" },
];

export const GET = async () => {
  return NextResponse.json({
    headerData,
  });
};
