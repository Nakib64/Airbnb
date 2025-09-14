"use client";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RightMenu from "./RightMenu";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import SearchBar from "./Searchbar";
import { SearchFields } from "./SearchFields";

export default function Navbar() {
  const [hideNavButtons, setHideNavButtons] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [open, setOpen] = useState(false); // For mobile search modal

  // Search field states
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();
  const [guests, setGuests] = useState({ adults: 0, children: 0, infants: 0 });

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
      setHideNavButtons(currentScroll > 1);
      setLastScroll(currentScroll);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  const NavButtons = () => (
    <div
      className={`flex justify-evenly w-full mx-auto md:justify-center gap-2 md:gap-4 lg:gap-8 items-center
        ${hideNavButtons ? "max-h-0 opacity-0" : "max-h-40 opacity-100"}
      `}
    >
      {navlinks.map((navlink) => {
        const isActive = pathname === navlink.route;
        return (
          <Link href={navlink.route} key={navlink.route}>
            <button
              className={`flex items-center p-2 rounded-t-2xl flex-col md:flex-row md:gap-2 py-2 hover:bg-gray-100 transition-colors duration-200 ${
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

  const handleSearch = () => {
    // Handle search logic here (redirect etc.)
    console.log({ checkInDate, checkOutDate, guests });
    setOpen(false); // Close modal after search
  };

  return (
    <header className="sticky top-0 pt-2 z-50 w-full bg-white shadow-md transition-shadow duration-500">
      <div className="w-full mx-auto flex flex-col md:flex-row items-start justify-between md:px-6 py-2 gap-2">
        {/* Left - Logo */}
        <Link href="/" className="md:flex items-center gap-1 hidden">
          <Image src="/logo.svg" alt="Airbnb" width={28} height={28} priority />
          <p className="hidden md:block text-red-400 text-xl font-bold">airbnb</p>
        </Link>

        {/* Small device search - top div */}
        <div
          className={`w-full px-4 rounded-full shadow-lg md:hidden text-center border flex justify-center items-center py-4 transition-all duration-500 cursor-pointer ${
            hideNavButtons ? "mt-0" : "mt-4"
          }`}
          onClick={() => setOpen(true)}
        >
          <Search size={28} className="mr-2" /> {t("Start your search")}
        </div>

        {/* Middle - Nav & Search */}
        <div className="flex flex-col w-full md:w-auto items-start md:items-center relative justify-center">
          <NavButtons />

          {/* Desktop SearchBar */}
          <div
            className={`w-full md:w-auto transition-all duration-1000 ${
              hideNavButtons ? "-translate-y-4" : "translate-y-0"
            } md:mt-4`}
          >
            <SearchBar />
          </div>
        </div>

        {/* Right - Menu */}
        <RightMenu />
      </div>

      {/* Mobile Search Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("Search")}</DialogTitle>
          </DialogHeader>
          <SearchFields
            checkInDate={checkInDate}
            setCheckInDate={setCheckInDate}
            checkOutDate={checkOutDate}
            setCheckOutDate={setCheckOutDate}
            guests={guests}
            setGuests={setGuests}
            onSearch={handleSearch}
          />
        </DialogContent>
      </Dialog>
    </header>
  );
}
