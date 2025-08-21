"use client";

import { createContext, useContext, useMemo, useState } from "react";
import TopNavbar from "@/app/(Dashboard)/components/Navbar";
import Sidebar from "@/app/(Dashboard)/components/Sidebar";

/** ---------- Shared context ---------- */
const SidebarContext = createContext(null);

export function SidebarProvider({ children }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const value = useMemo(() => ({ isMobileOpen, setIsMobileOpen }), [isMobileOpen]);
  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within <SidebarProvider>");
  return ctx;
}

/** ---------- Named components you can place anywhere ---------- */
export function DashboardSidebar(props) {
  const { isMobileOpen, setIsMobileOpen } = useSidebar();
  return (
    <Sidebar
      isMobileOpen={isMobileOpen}
      setIsMobileOpen={setIsMobileOpen}
      {...props}
    />
  );
}

export function DashboardNavbar(props) {
  const { setIsMobileOpen } = useSidebar();
  return (
    <TopNavbar
      onHamburgerClick={() => setIsMobileOpen(true)}
      {...props}
    />
  );
}

/** ---------- Optional bundled shell (kept for convenience) ---------- */
export default function DashboardShell({ children }) {
  return (
    <SidebarProvider>
      <div className="flex">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardNavbar />
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
