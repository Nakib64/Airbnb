"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Minus, Plus, Search } from "lucide-react";
import { format } from "date-fns";
import { t } from "i18next";

interface DesktopSearchFieldsProps {
  checkInDate: Date | undefined;
  setCheckInDate: (date: Date | undefined) => void;
  checkOutDate: Date | undefined;
  setCheckOutDate: (date: Date | undefined) => void;
  guests: { adults: number; children: number; infants: number };
  setGuests: React.Dispatch<
    React.SetStateAction<{ adults: number; children: number; infants: number }>
  >;
  onSearch: () => void;
}

export const DesktopSearchFields = ({
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  guests,
  setGuests,
  onSearch,
}: DesktopSearchFieldsProps) => {
  const [guestOpen, setGuestOpen] = useState(false);

  const handleGuestChange = (type: keyof typeof guests, delta: number) =>
    setGuests((prev) => ({ ...prev, [type]: Math.max(0, prev[type] + delta) }));

  const totalGuests = guests.adults + guests.children;
  const guestText =
    totalGuests > 0
      ? `${totalGuests} guests${guests.infants > 0 ? `, ${guests.infants} infants` : ""}`
      : "Add guests";

  const fieldClass =
    "flex flex-col min-w-0 rounded-full py-2 px-4 hover:bg-gray-100 cursor-pointer";

  return (
    // hidden on small devices, visible >= md; grid uses shrinkable columns to avoid overflow
    <div className="hidden md:grid items-center gap-3 w-full
      grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,2fr)] rounded-full border-2 p-1 border-gray-100 shadow-md">
      {/* Where (2fr) */}
      <div className={`${fieldClass} min-w-0`}>
        <label className="text-xs font-semibold text-gray-500">{t("where")}</label>
        {/* Use Input so it matches your UI; make it truncate so long text won't overflow */}
        <Input
          type="text"
          placeholder="Search destinations"
          className="border-0 outline-none focus:ring-0 bg-transparent placeholder-gray-400 text-sm truncate"
        />
      </div>

      {/* Check In (1fr) */}
      <Popover>
        <PopoverTrigger asChild>
          <div className={`${fieldClass} min-w-0`}>
            <label className="text-xs font-semibold text-gray-500">{t("checkIn")}</label>
            <button className="p-0 h-auto font-normal text-sm text-gray-600 text-left">
              <div className="flex items-center gap-2 truncate">
                <CalendarIcon className="h-4 w-4" />
                <span className="truncate">
                  {checkInDate ? format(checkInDate, "MMM d") : "Add date"}
                </span>
              </div>
            </button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-2 w-auto" align="start">
          <Calendar mode="single" selected={checkInDate} onSelect={setCheckInDate} initialFocus />
        </PopoverContent>
      </Popover>

      {/* Check Out (1fr) */}
      <Popover>
        <PopoverTrigger asChild>
          <div className={`${fieldClass} min-w-0`}>
            <label className="text-xs font-semibold text-gray-500">{t("checkOut")}</label>
            <button className="p-0 h-auto font-normal text-sm text-gray-600 text-left">
              <div className="flex items-center gap-2 truncate">
                <CalendarIcon className="h-4 w-4" />
                <span className="truncate">
                  {checkOutDate ? format(checkOutDate, "MMM d") : "Add date"}
                </span>
              </div>
            </button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-2 w-auto" align="start">
          <Calendar mode="single" selected={checkOutDate} onSelect={setCheckOutDate} initialFocus />
        </PopoverContent>
      </Popover>

      {/* Who (2fr) + Search button inside same pill (left triggers popover; button does search) */}
      <div className="min-w-0">
        <div className="flex items-center justify-between min-w-0 rounded-full py-2 px-3 hover:bg-gray-100">
          {/* Left: guest display wrapped by popover trigger */}
          <Popover open={guestOpen} onOpenChange={setGuestOpen}>
            <PopoverTrigger asChild>
              <div className="flex flex-col min-w-0 cursor-pointer">
                <label className="text-xs font-semibold text-gray-500">{t("who")}</label>
                {/* readOnly look, truncated */}
                <div className="text-sm font-medium truncate">{guestText}</div>
              </div>
            </PopoverTrigger>

            <PopoverContent className="p-4 w-64" align="end">
              <div className="flex flex-col gap-3">
                {(["adults", "children", "infants"] as const).map((type) => (
                  <div key={type} className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold capitalize">{type}</div>
                      <div className="text-gray-500 text-sm">
                        {type === "adults" ? "Ages 13+" : type === "children" ? "Ages 2–12" : "Under 2"}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        aria-label={`decrease ${type}`}
                        onClick={() => handleGuestChange(type, -1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-6 text-center">{guests[type]}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        aria-label={`increase ${type}`}
                        onClick={() => handleGuestChange(type, 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="flex justify-end mt-1">
                  <Button
                    onClick={() => setGuestOpen(false)}
                    className="rounded-full px-4 py-2"
                  >
                    Done
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Right: Search button (separate, so clicking it doesn't open guest popover) */}
          <Button
            onClick={onSearch}
            className="ml-3 rounded-full p-2 flex items-center justify-center bg-rose-500 text-white"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DesktopSearchFields;
