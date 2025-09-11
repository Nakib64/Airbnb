"use client"
import "./globals.css";
import Navbar from "./navbar/Navbar";
import Footer from "./Footer/Footer";
import dynamic from "next/dynamic";

const I18nProvider = dynamic(() => import("./../lib/I18nProvider"), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col gap-4">
        <I18nProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
