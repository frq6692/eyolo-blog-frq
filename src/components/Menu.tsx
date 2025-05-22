"use client";

import SocialLinks from "@/components/essential/SocialLinks";
import mainMenu from "@/config/main-menu.json";
import styles from "@/styles/modules/Menu.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Menu = ({
  menuOpen,
  toggleMenu,
  className,
}: {
  menuOpen: boolean;
  toggleMenu: () => void;
  className?: string;
}) => {
  const pathname = usePathname();

  return (
    <div
      className={`absolute right-0 left-0 origin-top backdrop-blur-lg z-[9909] text-center ${className} ${
        styles.menu
      } ${menuOpen ? styles.isOpen : styles.isClose}`}
    >
      <nav>
        <ul>
          {mainMenu.map((menu, key) => {
            const activeClass = styles.active;

            return (
              <li key={key}>
                <span
                  className={`block ${
                    pathname === menu.link ? activeClass : ""
                  }`}
                >
                  <Link href={menu.link || "#"} onClick={toggleMenu}>
                    {menu.name}
                  </Link>
                </span>
              </li>
            );
          })}
        </ul>

        <SocialLinks dark={false} />
      </nav>
    </div>
  );
};

export default Menu;
