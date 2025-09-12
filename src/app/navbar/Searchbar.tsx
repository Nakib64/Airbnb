"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar as CalendarIcon, Minus, Plus } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { t } from "i18next";

const SearchBar = () => {
  const [activeField, setActiveField] = useState<"where" | "checkIn" | "checkOut" | "who" | null>(null);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();
  const [guests, setGuests] = useState({ adults: 0, children: 0, infants: 0 });

  const handleFocus = (field: typeof activeField) => setActiveField(field);
  const handleBlur = () => setTimeout(() => setActiveField(null), 100);
  const handleGuestChange = (type: keyof typeof guests, delta: number) =>
    setGuests(prev => ({ ...prev, [type]: Math.max(0, prev[type] + delta) }));

  const totalGuests = guests.adults + guests.children;
  const guestText = totalGuests > 0 ? `${totalGuests} guests${guests.infants > 0 ? `, ${guests.infants} infants` : ""}` : "Add guests";

  const fieldClass = (field: typeof activeField) =>
    `flex flex-col rounded-full py-2 px-4 transition ${activeField === field ? "bg-white shadow-md" : "hover:bg-gray-100"}`;

  return (
    <div className="md:grid hidden grid-cols-1 md:grid-cols-[2fr_1fr_1fr_2fr] gap-2 max-w-2xl lg:max-w-4xl  mx-auto p-1 border-2 rounded-full shadow-md bg-white">
      
      {/* Where */}
      <div
        className={fieldClass("where")}
        tabIndex={0}
        onFocus={() => handleFocus("where")}
        onBlur={handleBlur}
      >
        <label className="text-xs font-semibold text-gray-500">{t("where")}</label>
        <Input
          type="text"
          placeholder="Search destinations"
          className="border-0 outline-none focus:ring-0 bg-transparent placeholder-gray-400 text-sm"
          autoComplete="off"
        />
      </div>

      {/* Check In */}
      <Popover>
        <PopoverTrigger asChild>
          <div
            className={fieldClass("checkIn")}
            tabIndex={0}
            onFocus={() => handleFocus("checkIn")}
            onBlur={handleBlur}
          >
            <label className="text-xs font-semibold text-gray-500">{t("checkIn")}</label>
            <Button variant="ghost" className="p-0 h-auto font-normal justify-start text-sm text-gray-400 hover:bg-transparent">
              <CalendarIcon className="mr-1 h-4 w-4" />
              {checkInDate ? format(checkInDate, "MMM d") : "Add dates"}
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-2 w-auto" align="start">
          <Calendar mode="single" selected={checkInDate} onSelect={setCheckInDate} initialFocus />
        </PopoverContent>
      </Popover>

      {/* Check Out */}
      <Popover>
        <PopoverTrigger asChild>
          <div
            className={fieldClass("checkOut")}
            tabIndex={0}
            onFocus={() => handleFocus("checkOut")}
            onBlur={handleBlur}
          >
            <label className="text-xs font-semibold text-gray-500">{t("checkOut")}</label>
            <Button variant="ghost" className="p-0 h-auto font-normal justify-start text-sm text-gray-400 hover:bg-transparent">
              <CalendarIcon className="mr-1 h-4 w-4" />
              {checkOutDate ? format(checkOutDate, "MMM d") : "Add dates"}
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-2 w-auto" align="start">
          <Calendar mode="single" selected={checkOutDate} onSelect={setCheckOutDate} initialFocus />
        </PopoverContent>
      </Popover>

      {/* Guests */}
      <Popover>
        <PopoverTrigger asChild>
          <div
            className={`flex items-center justify-between px-4 py-2 rounded-full transition ${activeField === "who" ? "bg-white shadow-md" : "hover:bg-gray-100"}`}
            tabIndex={0}
            onFocus={() => handleFocus("who")}
            onBlur={handleBlur}
          >
            <div className="flex flex-col">
              <label className="text-xs font-semibold text-gray-500">{t("who")}</label>
              <Input
                type="text"
                value={guestText}
                readOnly
                className="border-0 outline-none focus:ring-0 bg-transparent placeholder-gray-400 text-sm"
              />
            </div>
            <Button type="submit" className="bg-rose-500 p-3 rounded-full text-white flex items-center justify-center">
              <Search size={20} />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-3 w-64" align="end">
          <div className="flex flex-col gap-3">
            {["adults", "children", "infants"].map((type) => (
              <div key={type} className="flex justify-between items-center">
                <div>
                  <div className="font-semibold capitalize">{type}</div>
                  <div className="text-gray-500 text-sm">
                    {type === "adults" ? "Ages 13+" : type === "children" ? "Ages 2–12" : "Under 2"}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleGuestChange(type as keyof typeof guests, -1)}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span>{guests[type as keyof typeof guests]}</span>
                  <Button variant="outline" size="icon" onClick={() => handleGuestChange(type as keyof typeof guests, 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchBar;
