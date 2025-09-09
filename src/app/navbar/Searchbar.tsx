"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState<number>(1);

  const handleSearch = () => {
    console.log({
      location,
      checkIn,
      checkOut,
      guests,
    });
    // You can navigate with router.push(`/search?location=${location}...`)
  };

  return (
    <div className="hidden md:flex items-center gap-2 border rounded-full shadow-sm px-4 py-2 hover:shadow-md transition bg-white">
      {/* Location */}
      <input
        type="text"
        placeholder="Where?"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="px-2 py-1 focus:outline-none text-sm w-32"
      />

      {/* Check-in */}
      <input
        type="date"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        className="px-2 py-1 focus:outline-none text-sm"
      />

      {/* Check-out */}
      <input
        type="date"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        className="px-2 py-1 focus:outline-none text-sm"
      />

      {/* Guests */}
      <input
        type="number"
        min={1}
        value={guests}
        onChange={(e) => setGuests(Number(e.target.value))}
        className="px-2 py-1 focus:outline-none text-sm w-16"
      />

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="bg-red-500 text-white p-2 rounded-full ml-2 hover:bg-red-600 transition"
      >
        <Search size={16} />
      </button>
    </div>
  );
}
