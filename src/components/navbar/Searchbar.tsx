"use client";
import { useState } from "react";

import { t } from "i18next";
import { SearchFields } from "./SearchFields";
import DesktopSearchFields from "./LgSearchFields";



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
      <div className="">
        <DesktopSearchFields checkInDate={checkInDate} setCheckInDate={setCheckInDate} checkOutDate={checkOutDate} setCheckOutDate={setCheckOutDate} guests={guests} setGuests={setGuests} onSearch={handleSearch} />
      </div>

      {/* Mobile: reuse the same div */}
     
    </>
  );
};

export default SearchBar;
