"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Logo from "./logo";
import HeaderLink from "./navigation/HeaderLink";
import MobileHeaderLink from "./navigation/MobileHeaderLink";

const PHONE = "+381601234567";

const Header: React.FC = () => {
  const pathUrl = usePathname();
  const { theme, setTheme } = useTheme();

  const [data, setData] = useState<any[]>([]);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => setSticky(window.scrollY >= 80);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node)
    ) {
      setNavbarOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/layoutdata");
      const json = await res.json();
      setData(json?.headerData || []);
    };
    fetchData();
  }, []);

  return (
    <header
      className={`fixed h-[132px] top-0 z-50 w-full transition-all ${
        sticky
          ? "shadow-lg bg-white dark:bg-semidark"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto lg:max-w-screen-xl flex items-center justify-between px-4 py-6">
        <Logo />

        {/* DESKTOP NAV */}
        <nav className="hidden lg:flex flex-grow justify-center space-x-6">
          {data.map((item, i) => (
            <HeaderLink key={i} item={item} />
          ))}
        </nav>

        {/* RIGHT */}
        <div className="flex items-center space-x-4">

          {/* DARK / LIGHT – ISTI SVG */}
          <button
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex h-8 w-8 items-center justify-center text-body-color duration-300 dark:text-white"
          >
            <svg
              viewBox="0 0 16 16"
              className={`hidden h-6 w-6 dark:block ${
                !sticky && pathUrl === "/" && "text-white"
              }`}
            >
              <path
                d="M4.50663 3.2267L3.30663 2.03337L2.36663 2.97337L3.55996 4.1667L4.50663 3.2267ZM2.66663 7.00003H0.666626V8.33337H2.66663V7.00003ZM8.66663 0.366699H7.33329V2.33337H8.66663V0.366699ZM13.6333 2.97337L12.6933 2.03337L11.5 3.2267L12.44 4.1667L13.6333 2.97337ZM11.4933 12.1067L12.6866 13.3067L13.6266 12.3667L12.4266 11.1734L11.4933 12.1067ZM13.3333 7.00003V8.33337H15.3333V7.00003H13.3333ZM7.99996 3.6667C5.79329 3.6667 3.99996 5.46003 3.99996 7.6667C3.99996 9.87337 5.79329 11.6667 7.99996 11.6667C10.2066 11.6667 12 9.87337 12 7.6667C12 5.46003 10.2066 3.6667 7.99996 3.6667ZM7.33329 14.9667H8.66663V13H7.33329V14.9667Z"
                fill="#FFFFFF"
              />
            </svg>

            <svg
              viewBox="0 0 23 23"
              className={`h-8 w-8 dark:hidden ${
                !sticky && pathUrl === "/" && "text-white"
              }`}
            >
              <path d="M16.6111 15.855C17.591 15.1394 18.3151 14.1979 18.7723 13.1623C16.4824 13.4065 14.1342 12.4631 12.6795 10.4711C11.2248 8.47905 11.0409 5.95516 11.9705 3.84818C10.8449 3.9685 9.72768 4.37162 8.74781 5.08719C5.7759 7.25747 5.12529 11.4308 7.29558 14.4028C9.46586 17.3747 13.6392 18.0253 16.6111 15.855Z" />
            </svg>
          </button>

          {/* CALL */}
          <a
            href={`tel:${PHONE}`}
            className="hidden lg:block bg-transparent border border-primary text-primary px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white"
          >
            Call
          </a>

          {/* SMS */}
          <a
            href={`sms:${PHONE}`}
            className="hidden lg:block bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            SMS
          </a>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setNavbarOpen(true)}
            className="block lg:hidden p-2 rounded-lg"
          >
            <span className="block w-6 h-0.5 bg-black dark:bg-white"></span>
            <span className="block w-6 h-0.5 bg-black dark:bg-white mt-1.5"></span>
            <span className="block w-6 h-0.5 bg-black dark:bg-white mt-1.5"></span>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        ref={mobileMenuRef}
        className={`lg:hidden fixed top-0 right-0 h-full w-full max-w-xs bg-white dark:bg-darkmode z-50 transform transition-transform ${
          navbarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="p-4 flex flex-col gap-4">
          {data.map((item, i) => (
            <MobileHeaderLink
              key={i}
              item={item}
              onClose={() => setNavbarOpen(false)}
            />
          ))}

          <a
            href={`tel:${PHONE}`}
            className="border border-primary text-primary px-4 py-2 rounded-lg text-center"
          >
            Call
          </a>

          <a
            href={`sms:${PHONE}`}
            className="bg-primary text-white px-4 py-2 rounded-lg text-center"
          >
           💬 SMS
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;