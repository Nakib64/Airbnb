import Image from "next/image";
import React from "react";
import { t } from "i18next";

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
export default function HotelCard({ hotel }: { hotel: Hotel }) {
    const [loaded, setLoaded] = React.useState(false);

    return (
        <div className="relative rounded-xl overflow-hidden transition-all duration-300">
            {/* Image container */}
            <div className="relative w-full aspect-square">
                {!loaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <div className="w-6 h-6 border-4 border-gray-300 border-t-gray-500 rounded-full animate-spin"></div>
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
                    {hotel.price && <p className="font-semibold">${hotel.price}</p>}
                </div>
            </div>
        </div>
    );
}