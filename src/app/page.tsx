"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import HotelsSection from "./HotelSection/Hotelsec";

interface Hotel {
  _id: string;
  division: string;
  city: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  isFavourite: boolean;
}

export default function Home() {
  const [dhaka, setDhaka] = useState<Hotel[]>([]);
  const [chittagong, setChittagong] = useState<Hotel[]>([]);
  const [khulna, setKhulna] = useState<Hotel[]>([]);
  const [rajshahi, setRajshahi] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const { i18n } = useTranslation("common");

  // Ensure component only renders after client mounts
  useEffect(() => {
    setMounted(true);

    const fetchData = async () => {
      try {
        const [dhakaRes, ctgRes, khulnaRes, rajRes] = await Promise.all([
          axios.get(`http://localhost:5000/hotels?division=dhaka&language=${i18n.language}`),
          axios.get(`http://localhost:5000/hotels?division=chittagong&language=${i18n.language}`),
          axios.get(`http://localhost:5000/hotels?division=khulna&language=${i18n.language}`),
          axios.get(`http://localhost:5000/hotels?division=rajshahi&language=${i18n.language}`),
        ]);

        setDhaka(dhakaRes.data);
        setChittagong(ctgRes.data);
        setKhulna(khulnaRes.data);
        setRajshahi(rajRes.data);
      } catch (err) {
        console.error("Error fetching hotels:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [i18n.language]);

  if (!mounted) return null; // ⬅️ prevents hydration mismatch
  if (loading) return <p className="text-center mt-20">Loading...</p>;

  const divisions: { name: string; data: Hotel[] }[] = [
    { name: "Dhaka", data: dhaka },
    { name: "Chittagong", data: chittagong },
    { name: "Khulna", data: khulna },
    { name: "Rajshahi", data: rajshahi },
  ];

  return (
    <div className="px-4 md:px-12 py-6 space-y-16">
    
        <HotelsSection title="Dhaka" hotels={dhaka} />
        <HotelsSection title="Chittagong" hotels={chittagong} />
        <HotelsSection title="Khulna" hotels={khulna} />
        <HotelsSection title="Rajshahi" hotels={rajshahi} />
      </div>


  );
}
