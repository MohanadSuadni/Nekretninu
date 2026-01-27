import { NextResponse } from "next/server";

const headerData = [
  { label: "Početna", href: "/" },
  {
    label: "Nekretnine",
    href: "#",
    submenu: [
      { label: "Lista nekretnina", href: "/properties/properties-list" },
      { label: "Detalji nekretnine", href: "/properties/properties-list/modern-apartment" },
    ],
  },
  {
    label: "Nova gradnja",
    href: "#",
    submenu: [
      { label: "Nova gradnja – mrežni prikaz", href: "/blogs" },
      { label: "Detalji Nova gradnja", href: "/blogs/blog_1" },
    ],
  },
  { label: "Kontakt", href: "/contact" },
];

export const GET = async () => {
  return NextResponse.json({
    headerData,
  });
};
