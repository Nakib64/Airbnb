"use client";

import { useState } from "react";
import { Menu, Globe, User, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "./Searchbar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        
        {/* Left - Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/airbnb-logo.png" alt="Airbnb" width={100} height={32} priority />
        </Link>

        {/* Middle - Search */}
        <SearchBar></SearchBar>

        {/* Right - Menu */}
        <div className="flex items-center space-x-4">
          <p className="hidden md:block cursor-pointer">Airbnb your home</p>
          <Globe className="cursor-pointer" />

          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center space-x-2 border p-2 rounded-full hover:shadow-md transition"
            >
              <Menu size={18} />
              <User size={18} />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-xl border overflow-hidden">
                <Link href="/login" className="block px-4 py-2 hover:bg-gray-100">Log in</Link>
                <Link href="/signup" className="block px-4 py-2 hover:bg-gray-100">Sign up</Link>
                <hr />
                <Link href="/trips" className="block px-4 py-2 hover:bg-gray-100">Trips</Link>
                <Link href="/wishlists" className="block px-4 py-2 hover:bg-gray-100">Wishlists</Link>
                <Link href="/account" className="block px-4 py-2 hover:bg-gray-100">Account</Link>
                <Link href="/help" className="block px-4 py-2 hover:bg-gray-100">Help</Link>
                <Link href="/logout" className="block px-4 py-2 hover:bg-gray-100">Log out</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden flex justify-center px-4 pb-3">
        <div className="flex items-center justify-between border rounded-full px-4 py-2 shadow-sm w-full">
          <span className="text-sm text-gray-600">Where to?</span>
          <Search size={18} className="text-red-500" />
        </div>
      </div>
    </header>
  );
}
