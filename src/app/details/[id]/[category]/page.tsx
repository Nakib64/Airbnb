"use client";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface Params {
  id: string;
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
}

const Page = ({ params }: { params: Params }) => {
  const { i18n, t } = useTranslation("common");
  const { id, category } = params;

  const [data, setData] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(
          `https://airbnb-server-rx37.vercel.app/details?id=${id}&category=${category}&language=${i18n.language}`
        );
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id, category, i18n.language]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        No details found.
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 gap-8 items-start"
      >
        {/* Left Column - Image */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl"
        >
          <Image
            src={data.images?.[0] || "/placeholder.png"}
            alt={data.title}
            unoptimized
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
          {data.isPopular && (
            <Badge className="absolute top-4 left-4 bg-primary text-white">
              {t("pop")}
            </Badge>
          )}
          {data.isFavourite && (
            <Badge className="absolute top-4 right-4 bg-pink-500 text-white">
              {t("fav")}
            </Badge>
          )}
        </motion.div>

        {/* Right Column - Details */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="p-6 shadow-lg rounded-2xl">
            <CardContent className="space-y-5">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                {data.title}
              </h1>
              <p className="text-gray-600 leading-relaxed">{data.description}</p>

              {data.city && (
                <p className="text-sm text-muted-foreground">
                  📍 {data.city}, {data.division}
                </p>
              )}

              {data.price && (
                <p className="text-2xl font-semibold text-primary">
                  ${data.price}
                </p>
              )}

              <div className="flex gap-4">
                <Button className="rounded-2xl px-6">{t("book")}</Button>
                <Button variant="outline" className="rounded-2xl px-6">
                  {t("wish")}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Page;
