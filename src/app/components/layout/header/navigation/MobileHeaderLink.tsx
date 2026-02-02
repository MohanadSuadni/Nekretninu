'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { HeaderItem } from '../../../../types/layout/menu';

interface Props {
  item: HeaderItem;
  onClose?: () => void; // 👈 BITNO
}

const MobileHeaderLink: React.FC<Props> = ({ item, onClose }) => {
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const router = useRouter();
  const path = usePathname();

  const handleToggle = () => {
    setSubmenuOpen((prev) => !prev);
  };

  const handleNav = () => {
    setSubmenuOpen(false);
    onClose?.(); // 👈 zatvara ceo meni
    router.push(item.href);
  };

  const handleSubNav = (href: string) => {
    setSubmenuOpen(false);
    onClose?.(); // 👈 zatvara ceo meni
    router.push(href);
  };

  useEffect(() => {
    setSubmenuOpen(false);
  }, [path]);

  return (
    <div className="w-full">
      {/* MAIN ITEM */}
      <button
        onClick={item.submenu ? handleToggle : handleNav}
        className={`
          flex items-center justify-between w-full py-2 px-3 rounded-md
          ${
            path === item.href
              ? 'bg-primary text-white'
              : 'text-black dark:text-white'
          }
        `}
      >
        {item.label}

        {item.submenu && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
            className={`transition-transform ${submenuOpen ? 'rotate-180' : ''}`}
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
      </button>

      {/* SUBMENU */}
      {submenuOpen && item.submenu && (
        <div className="mt-2 bg-white dark:bg-darkmode rounded-md shadow">
          {item.submenu.map((subItem, index) => (
            <button
              key={index}
              onClick={() => handleSubNav(subItem.href)}
              className="block w-full text-left py-2 px-3 text-gray-600 hover:bg-gray-100"
            >
              {subItem.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileHeaderLink;
