"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight, CircleArrowOutUpRight } from "lucide-react";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import HotelCard from "../Card/Card";
import { motion } from "framer-motion";

interface Hotel {
  _id: string;
  division?: string;
  city?: string;
  title: string;
  description: string;
  price?: number;
  images: string[];
  isPopular?: boolean;
  isFavourite?: boolean;
  field: string;
}

interface HotelsSectionProps {
  title: string;
  hotels: Hotel[];
}

export default function HotelsSection({ title, hotels }: HotelsSectionProps) {
  const pathname = usePathname();
  const segment = pathname.split("/").filter(Boolean).pop() || "hotel";

  if (!hotels || hotels.length === 0) return null;

  const prevClass = `swiper-prev-${title.replace(/\s+/g, "-").toLowerCase()}`;
  const nextClass = `swiper-next-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <section className="space-y-4">
      {/* Title with navigation buttons */}
      <div className="flex items-center justify-between">
        <Link href={`/search/${segment}/${title.toLowerCase()}`}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="text-xl md:text-2xl font-bold capitalize">
              {segment} in {title}
            </span>
            <motion.span
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="flex items-center"
            >
              <CircleArrowOutUpRight size={25}/>
            </motion.span>
          </motion.div>
        </Link>
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`${prevClass} p-1 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300`}
          >
            <ChevronLeft size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 200 }}
            className={`${nextClass} p-1 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300`}
          >
            <ChevronRight size={20} />
          </motion.button>
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
            <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
              <HotelCard hotel={hotel} />
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
