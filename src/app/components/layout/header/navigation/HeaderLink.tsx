"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HeaderItem } from "../../../../types/layout/menu";

interface Props {
  item: HeaderItem;
}

const HOVER_DELAY = 150; // ms

const HeaderLink: React.FC<Props> = ({ item }) => {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  const openTimeout = useRef<NodeJS.Timeout | null>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // ---------- HOVER WITH DELAY ----------
  const handleMouseEnter = () => {
    if (!item.submenu) return;
    if (closeTimeout.current) clearTimeout(closeTimeout.current);

    openTimeout.current = setTimeout(() => {
      setOpen(true);
    }, HOVER_DELAY);
  };

  const handleMouseLeave = () => {
    if (openTimeout.current) clearTimeout(openTimeout.current);

    closeTimeout.current = setTimeout(() => {
      setOpen(false);
    }, 100);
  };

  // ---------- KEYBOARD SUPPORT ----------
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!item.submenu) return;

    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((prev) => !prev);
    }

    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // ---------- CLICK OUTSIDE ----------
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={item.href}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-haspopup={!!item.submenu}
        aria-expanded={open}
        className={`
          flex items-center gap-1 py-3 text-base font-normal
          ${
            path === item.href
              ? "text-primary"
              : "text-midnight_text dark:text-white hover:text-primary"
          }
        `}
      >
        {item.label}
        {item.submenu && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            className={`transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m7 10l5 5l5-5"
            />
          </svg>
        )}
      </Link>

      {/* ---------- ANIMATED SUBMENU ---------- */}
      <AnimatePresence>
        {open && item.submenu && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="
              absolute top-full left-0 mt-2 w-60
              rounded-xl bg-white dark:bg-darkmode
              shadow-lg dark:shadow-darkmd
              overflow-hidden
            "
            role="menu"
          >
            {item.submenu.map((subItem) => (
              <Link
                key={subItem.href}
                href={subItem.href}
                role="menuitem"
                tabIndex={0}
                className={`
                  block px-4 py-2 text-sm
                  ${
                    path === subItem.href
                      ? "bg-primary text-white"
                      : "text-midnight_text dark:text-white hover:bg-section dark:hover:bg-semidark"
                  }
                `}
                onClick={() => setOpen(false)}
              >
                {subItem.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeaderLink;
