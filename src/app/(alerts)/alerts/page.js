"use client"

import Link from 'next/link';
import { useState } from "react";
import TopNavbar from "@/app/(Dashboard)/components/Navbar";
import Sidebar from "@/app/(Dashboard)/components/Sidebar";

export default function Home() {


  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (

    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      <div className="flex-1 h-screen overflow-y-auto bg-white px-4 md:px-6 py-6">
        <TopNavbar onHamburgerClick={() => setIsMobileOpen(true)} />
          <div className="max-w-[80vw] mx-auto bg-white rounded-2xl shadow-2xl p-8 text-center mt-40">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
              Alerts Page
            </h2>
            <p className="mt-2 text-gray-600">
              This is the Alerts Dashboard page
            </p>
            <Link
              href="/"
              className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Home
            </Link>
          </div>
      </div>
    </div>

  );
}
