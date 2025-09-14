"use client";
import { useState } from "react";

import { t } from "i18next";
import { SearchFields } from "./SearchFields";



const SearchBar = () => {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();
  const [guests, setGuests] = useState({ adults: 0, children: 0, infants: 0 });

  const handleSearch = () => {
    console.log({ checkInDate, checkOutDate, guests });
  };

  return (
    <>
      {/* Desktop */}
      <div className="md:grid hidden grid-cols-1 md:grid-cols-[2fr_1fr_1fr_2fr] gap-2 max-w-2xl lg:max-w-4xl mx-auto p-1 border-2 rounded-full shadow-md bg-white">
        <SearchFields checkInDate={checkInDate} setCheckInDate={setCheckInDate} checkOutDate={checkOutDate} setCheckOutDate={setCheckOutDate} guests={guests} setGuests={setGuests} onSearch={handleSearch} />
      </div>

      {/* Mobile: reuse the same div */}
     
    </>
  );
};

export default SearchBar;
