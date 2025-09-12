"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { t } from "i18next";
import React from "react";

interface Hotel {
  _id: string;
  division: string;
  city: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  isPopular?: boolean;
  isFavourite?: boolean;
}

interface HotelsSectionProps {
  title: string;
  hotels: Hotel[];
}

export default function HotelsSection({ title, hotels }: HotelsSectionProps) {
  if (!hotels || hotels.length === 0) return null;

  const prevClass = `swiper-prev-${title.replace(/\s+/g, "-").toLowerCase()}`;
  const nextClass = `swiper-next-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <section className="space-y-4">
      {/* Title with navigation buttons */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold capitalize">{title}</h2>
        <div className="flex gap-2">
          <button className={`${prevClass} p-1`}>
            <ChevronLeft size={20} />
          </button>
          <button className={`${nextClass} p-1`}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <Swiper
        slidesPerView={5}
        spaceBetween={16}
        slidesPerGroup={1}
        navigation={{
          prevEl: `.${prevClass}`,
          nextEl: `.${nextClass}`,
        }}
        modules={[Navigation]}
        className="py-4"
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 7 },
        }}
      >
        {hotels.map((hotel) => (
          <SwiperSlide key={hotel._id}>
            <HotelCard hotel={hotel} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

// Separate HotelCard component
function HotelCard({ hotel }: { hotel: Hotel }) {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <div className="relative rounded-xl overflow-hidden transition-all duration-300">
      {/* Image container */}
      <div className="relative w-full aspect-square">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <Image
          src={hotel.images[0]}
          alt={hotel.title}
          fill
          unoptimized
          className={`object-cover rounded-xl ${loaded ? "" : "invisible"}`}
          onLoadingComplete={() => setLoaded(true)}
        />
      </div>

      {/* Badges */}
      {hotel.isFavourite && (
        <span className="absolute top-3 left-3 bg-white text-black/80 text-xs font-semibold px-2 py-1 rounded-lg">
          {t("fav")}
        </span>
      )}
      {hotel.isPopular && (
        <span className="absolute top-3 left-3 bg-white text-black/80 text-xs font-semibold px-2 py-1 rounded-lg">
          {t("pop")}
        </span>
      )}

      {/* Info */}
      <div className="p-3">
        <h3 className="font-semibold text-base truncate">{hotel.title}</h3>
        <p className="text-gray-500 text-sm truncate">{hotel.description}</p>
        <div className="flex items-center justify-between mt-2 text-sm">
          <p className="font-semibold">${hotel.price}</p>
        </div>
      </div>
    </div>
  );
}
