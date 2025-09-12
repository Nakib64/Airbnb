"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import HotelsSection from "../HotelSection/Hotelsec";

interface Hotel {
    _id: string;
    category: string;
    title: string;
    description: string;
    images: string[];
    isPopular: boolean;
}

export default function Experience() {
    const [photography, setPhotography] = useState<Hotel[]>([]);
    const [chef, setChef] = useState<Hotel[]>([]);
    const [catering, setCatering] = useState<Hotel[]>([]);
    const [training, setTraining] = useState<Hotel[]>([]);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);
    const { i18n } = useTranslation("common");
    console.log(i18n.language);
    // Ensure component only renders after client mounts
    useEffect(() => {
        setMounted(true);

        const fetchData = async () => {
            try {
                const [photoRes, chefRes, cateringRes, trainingRes] = await Promise.all([
                    axios.get(`http://localhost:5000/services?category=photography&language=${i18n.language}`),
                    axios.get(`http://localhost:5000/services?category=chef&language=${i18n.language}`),
                    axios.get(`http://localhost:5000/services?category=catering&language=${i18n.language}`),
                    axios.get(`http://localhost:5000/services?category=training&language=${i18n.language}`),
                ]);

                setPhotography(photoRes.data);
                setChef(chefRes.data);
                setCatering(cateringRes.data);
                setTraining(trainingRes.data);
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


    return (
        <div className="px-4 md:px-12 py-6 space-y-16">

            <HotelsSection title="photography" hotels={photography} />
            <HotelsSection title="chef" hotels={chef} />
            <HotelsSection title="catering" hotels={catering} />
            <HotelsSection title="training" hotels={training} />
        </div>


    );
}
