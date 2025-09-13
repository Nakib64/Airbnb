"use client"
import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import dynamic from "next/dynamic";
import Footer from "@/components/Footer/Footer";

const I18nProvider = dynamic(() => import("./../lib/I18nProvider"), { ssr: false });
const queryClient = new QueryClient();
export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col gap-4">
        <I18nProvider>
          <QueryClientProvider client={queryClient}>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </QueryClientProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
