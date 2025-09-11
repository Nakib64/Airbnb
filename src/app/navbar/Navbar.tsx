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

    const { t, i18n } = useTranslation("common");

    const pathname = usePathname();

    const navlinks = [
        { title: "Home", route: "/", logo: "/homeLogo.png" },
        { title: "Experience", route: "/experience", logo: "/experienceLogo.png" },
        { title: "Services", route: "/services", logo: "/serviceLogo.png" },
    ];

    // Scroll listener
    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            if (currentScroll > lastScroll && currentScroll > 50) {
                // scrolling down
                setHideNavButtons(true);
            } else {
                // scrolling up
                setHideNavButtons(false);
            }
            setLastScroll(currentScroll);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScroll]);

    const NavButtons = () => (
        <div
            className={`flex w-full justify-evenly md:justify-center mx-auto gap-2 md:gap-4 lg:gap-8 md:py-4 items-center transition-transform duration-300 ${hideNavButtons ? "-translate-y-20 opacity-0" : "translate-y-0 opacity-100"
                }`}
        >
            {navlinks.map((navlink) => {
                const isActive = pathname === navlink.route;
                return (
                    <Link href={navlink.route} key={navlink.route}>
                        <button
                            className={`flex items-center flex-col md:flex-row md:gap-2 py-2 hover:bg-gray-100 transition-colors duration-200 ${isActive ? "border-b-4 border-black" : ""
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
        <header className="sticky top-0 z-50 w-full shadow-md md:pb-12 pt-4 md:pt-0">
            <div className="w-full mx-auto flex flex-col gap-2 md:flex-row items-center justify-between md:px-6">
                {/* Left - Logo */}
                <Link href="/" className="md:flex items-center gap-1 hidden ">
                    <Image src="/logo.svg" alt="Airbnb" width={28} height={28} priority />
                    <p className="hidden md:block text-red-400 text-xl font-bold">airbnb</p>
                </Link>

                {/* searchbar for small devices */}
                <div className="w-full px-4 rounded-full shadow-lg md:hidden text-center border flex justify-center items-center py-4">
                    <Search size={28} /> Start your search
                </div>

                {/* Middle */}
                <NavButtons />

                {/* Right - Menu */}
                <RightMenu></RightMenu>
            </div>

            {/* Middle - Search */}
            <div className="hidden md:block">
                <SearchBar />
            </div>
        </header>
    );
}
