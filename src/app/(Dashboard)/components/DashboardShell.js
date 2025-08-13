"use client";

import { useState } from "react";
import TopNavbar from "@/app/(Dashboard)/components/Navbar";
import Sidebar from "@/app/(Dashboard)/components/Sidebar";

export default function DashboardShell({ children }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div>
      {/* Sidebar */}
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main Content */}
      <div >
        {/* Navbar */}
        <TopNavbar onHamburgerClick={() => setIsMobileOpen(true)} />

        {/* Page Content */}
        {children}
      </div>
    </div>
  );
}
