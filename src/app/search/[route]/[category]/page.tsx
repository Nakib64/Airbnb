"use client";

import HotelCard from "@/components/Card/Card";
import HotelsSkeletonSection from "@/components/HotelSkeletonSec/HotelSkeletonSec";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useTranslation } from "react-i18next";

interface Params {
  route: string;
  category: string;
}
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
const fetchData = async (route: string, category: string, language: string) => {
  let url = "";

  if (route === "services") {
    url = `https://airbnb-server-rx37.vercel.app/search?route=services&category=${category}&language=${language}`;
  } else if (route === "hotel" || route === "experience") {
    url = `https://airbnb-server-rx37.vercel.app/search?route=${route}&category=${category}&language=${language}`;
  } else {
    throw new Error("Invalid route");
  }

  const res = await axios.get(url);
  return res.data;
};

export default function Page({ params }: { params: Params }) {
  const { route, category } = params;
  const { i18n } = useTranslation("common");

  const { data, isLoading, error } = useQuery({
    queryKey: ["search", route, category, i18n.language], // include language in key
    queryFn: () => fetchData(route, category, i18n.language), // pass language in
    enabled: !!route && !!category,
  });

  if (isLoading) return <HotelsSkeletonSection />;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div className="px-4 md:px-12">
      <h1 className="text-xl font-bold capitalize">
        {route} in {category}
      </h1>

      {!data || data.length === 0 ? (
        <p>No results found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mt-4">
          {data.map((item: Hotel) => (
            <HotelCard key={item._id} hotel={item} />
          ))}
        </div>
      )}
    </div>
  );
}
