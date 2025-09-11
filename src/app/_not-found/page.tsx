"use client"; // optional if you want client-side interactivity

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Oops! Page Not Found</h2>
      <p className="text-gray-600 mb-8">
        The page you are looking for might have been removed or never existed.
      </p>
      <Link
        href="/"
        className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
