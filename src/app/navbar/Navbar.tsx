"use client";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./Searchbar";
import { usePathname } from "next/navigation";
import RightMenu from "./RightMenu";
import { Search } from "lucide-react";

export default function Navbar() {
  const [hideNavButtons, setHideNavButtons] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);

  const { t } = useTranslation("common");
  const pathname = usePathname();

  const navlinks = [
    { title: "Home", route: "/", logo: "/homeLogo.png" },
    { title: "Experience", route: "/experience", logo: "/experienceLogo.png" },
    { title: "Services", route: "/services", logo: "/serviceLogo.png" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if ( currentScroll > 1) {
        setHideNavButtons(true);
      } else {
        setHideNavButtons(false);
      }
      setLastScroll(currentScroll);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  const NavButtons = () => (
    <div
    className={`flex justify-evenly md:justify-center gap-2 md:gap-4 lg:gap-8 items-center
    ${hideNavButtons ? "max-h-0 opacity-0" : "max-h-40 opacity-100"}
  `}
    >
      {navlinks.map((navlink) => {
        const isActive = pathname === navlink.route;
        return (
          <Link href={navlink.route} key={navlink.route}>
            <button
              className={`flex items-center flex-col md:flex-row md:gap-2 py-2 hover:bg-gray-100 transition-colors duration-200 ${
                isActive ? "border-b-4 border-black" : ""
              }`}
            >
              <Image src={navlink.logo} alt="" width={36} height={36} />
              <span className="font-medium">{t(navlink.title)}</span>
            </button>
          </Link>
        );
      })}
    </div>
  );

  return (
    <header className="sticky top-0 pt-2 z-50 w-full bg-white shadow-md transition-shadow duration-500">
      <div className="w-full mx-auto flex flex-col md:flex-row items-start justify-between md:px-6 py-2 gap-2">
        {/* Left - Logo */}
        <Link href="/" className="md:flex items-center gap-1 hidden">
          <Image src="/logo.svg" alt="Airbnb" width={28} height={28} priority />
          <p className="hidden md:block text-red-400 text-xl font-bold">airbnb</p>
        </Link>

        {/* Middle - Nav & Search */}
        <div className="flex flex-col w-full md:w-auto items-start md:items-center relative justify-center">
          <NavButtons />

          {/* SearchBar - moves up smoothly */}
          <div
            className={`w-full md:w-auto transition-all duration-1000 ${
              hideNavButtons ? "-translate-y-4" : "translate-y-0"
            }  md:mt-4`}
          >
            <SearchBar />
          </div>
        </div>

        {/* Right - Menu */}
        <RightMenu />
      </div>

      {/* Small device search */}
      <div
        className={`w-full px-4 rounded-full shadow-lg md:hidden text-center border flex justify-center items-center py-4 transition-all duration-500 ${
          hideNavButtons ? "mt-0" : "mt-4"
        }`}
      >
        <Search size={28} /> Start your search
      </div>
    </header>
  );
}
