"use client";

import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

interface FooterLinkColumn {
  title: string;
  links: string[];
}

export default function Footer() {
  const footerLinks: FooterLinkColumn[] = [
    {
      title: "Company",
      links: ["About Us", "Careers", "Press", "Blog", "Contact"],
    },
    {
      title: "Explore",
      links: ["Destinations", "Experiences", "Hotels", "Flights", "Travel Guides"],
    },
    {
      title: "Support",
      links: ["Help Center", "Cancellation Options", "Safety Information", "FAQs", "Terms of Service"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms & Conditions", "Cookies", "Accessibility", "Licenses"],
    },
  ];

  return (
    <footer className="bg-gray-100 w-full mt-10">
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row justify-between gap-10 md:gap-20">
        {/* Logo & Social */}
        <div className="flex flex-col gap-6 md:w-1/4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Logo" width={36} height={36} />
            <span className="text-2xl font-bold text-red-500">airbnb</span>
          </Link>
          <p className="text-gray-600">
            Discover amazing places, unique stays, and unforgettable experiences.
          </p>
          <div className="flex gap-4 mt-2">
            <Link href="#"><Facebook size={20} /></Link>
            <Link href="#"><Twitter size={20} /></Link>
            <Link href="#"><Instagram size={20} /></Link>
            <Link href="#"><Linkedin size={20} /></Link>
          </div>
        </div>

        {/* Link columns */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-20 flex-1">
          {footerLinks.map((column: FooterLinkColumn) => (
            <div key={column.title}>
              <h3 className="font-semibold text-gray-800 mb-4">{column.title}</h3>
              <ul className="flex flex-col gap-2">
                {column.links.map((link: string) => (
                  <li key={link}>
                    <Link href="#" className="text-gray-600 hover:text-black transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-300 mt-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between text-gray-500 text-sm">
          <span>© 2025 Airbnb, Inc. All rights reserved.</span>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
            <Link href="#">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
