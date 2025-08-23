"use client";
import { useState, useRef, useEffect } from "react";
import TopNavbar from "@/app/(Dashboard)/components/Navbar";
import Sidebar from "@/app/(Dashboard)/components/Sidebar";
import DashboardCards from "@/app/(Dashboard)/dashboard/DashboardCards";
import ManagerTable from "@/app/(Dashboard)/dashboard/ManagerTable";
import AddManagerModal from "@/app/(Dashboard)/components/AddManagerModal";
import ConfirmDeleteModal from "@/app/(Dashboard)/components/ConfirmDeleteModal";
import UpdateManagerModal from "@/app/(Dashboard)/components/UpdateManagerModal";
import ReportCharts from "@/app/(Dashboard)/dashboard/ReportCharts";
import { managersData } from "@/app/data/data";
// import { SidebarProvider, DashboardSidebar, DashboardNavbar } from "@/app/(Dashboard)/components/DashboardShell";

export default function Home() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [managers, setManagers] = useState(managersData);
  const [toast, setToast] = useState({ show: false, message: "" });
  const toastTimerRef = useRef(null);


  const [dateFilter, setDateFilter] = useState("All"); // ⬅️ NEW

  // helper: parse "04 Nov 2025", "04 November 2025", "04 APR 2024", etc.
  const parseDate = (str) => {
    if (!str) return null;

    // Remove apostrophes (e.g., "Apr 2024" → "Apr 24")
    str = str.replace("'", "");

    const parts = str.trim().split(/\s+/); // split by spaces
    if (parts.length < 3) return null;

    const [day, monRaw, yearRaw] = parts;
    const d = parseInt(day, 10);

    // Map short + full month names to numbers (case-insensitive)
    const monthMap = {
      jan: 0, january: 0,
      feb: 1, february: 1,
      mar: 2, march: 2,
      apr: 3, april: 3,
      may: 4,
      jun: 5, june: 5,
      jul: 6, july: 6,
      aug: 7, august: 7,
      sep: 8, sept: 8, september: 8,
      oct: 9, october: 9,
      nov: 10, november: 10,
      dec: 11, december: 11,
    };

    // normalize month input (lowercase)
    const monKey = monRaw.toLowerCase();
    const m = monthMap[monKey];
    if (m === undefined) return null;

    // Handle 2-digit vs 4-digit year
    const y = yearRaw.length === 2 ? parseInt("20" + yearRaw, 10) : parseInt(yearRaw, 10);

    return new Date(y, m, d);
  };



  // ✅ filter managers by selected dateFilter
  const getFilteredManagers = () => {
    const now = new Date();
    return managers.filter((m) => {
      const d = parseDate(m.date);
      if (!d) return false;

      switch (dateFilter) {
        case "Today":
          return d.toDateString() === now.toDateString();
        case "Yesterday":
          const y = new Date(now);
          y.setDate(now.getDate() - 1);
          return d.toDateString() === y.toDateString();
        case "Last 7 Days":
          const last7 = new Date(now);
          last7.setDate(now.getDate() - 7);
          return d >= last7 && d <= now;
        case "Last 15 Days":
          const last15 = new Date(now);
          last15.setDate(now.getDate() - 15);
          return d >= last15 && d <= now;
        case "This Month":
          return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        case "Last Month":
          const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          return d.getMonth() === lastMonth.getMonth() && d.getFullYear() === lastMonth.getFullYear();
        case "Last 3 Month":
          const last3 = new Date(now);
          last3.setMonth(now.getMonth() - 3);
          return d >= last3 && d <= now;
        case "Last 6 Month":
          const last6 = new Date(now);
          last6.setMonth(now.getMonth() - 6);
          return d >= last6 && d <= now;
        case "This Year":
          return d.getFullYear() === now.getFullYear();
        case "Last Year":
          return d.getFullYear() === now.getFullYear() - 1;
        default:
          return true;
      }
    });
  };

  const filteredManagers = getFilteredManagers();

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const showToast = (message, ms = 3000) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ show: true, message });
    toastTimerRef.current = setTimeout(() => {
      setToast({ show: false, message: "" });
    }, ms);
  };



  const handleAddManager = (newManager) => {
    setManagers([newManager, ...managers]);
    managersData.unshift(newManager);
    setShowAddModal(false);
  };

  const handleDeleteManager = () => {
    if (!selectedManager) return;
    setManagers(managers.filter((m) => m !== selectedManager));
    setShowDeleteModal(false);
    showToast("Record Deleted successfully!");
  };

  const handleUpdateManager = (updatedManager) => {
    if (!selectedManager) return;
    setManagers(
      managers.map((m) =>
        m === selectedManager ? { ...m, ...updatedManager } : m
      )
    );
    setShowUpdateModal(false);
  };


  return (
    // <SidebarProvider>
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
      {/* <DashboardSidebar /> */}
      <div className="flex-1 h-screen overflow-y-auto bg-white px-4 md:px-6 py-6">
        <TopNavbar onHamburgerClick={() => setIsMobileOpen(true)} />
        {/* <DashboardNavbar /> */}
        <div className="max-w-9xl mx-auto bg-[#f3f5f9] rounded-3xl p-6 space-y-6 shadow-sm">
          <DashboardCards managers={filteredManagers} setDateFilter={setDateFilter} dateFilter={dateFilter} />
          <ReportCharts managers={filteredManagers} dateFilter={dateFilter} />

          <div className="max-w-[80vw] mx-auto bg-white rounded-2xl">
            <ManagerTable
              managers={filteredManagers}
              onAddClick={() => setShowAddModal(true)}
              onDeleteClick={(manager) => {
                setSelectedManager(manager);
                setShowDeleteModal(true);
              }}
              onUpdateClick={(manager) => {
                setSelectedManager(manager);
                setShowUpdateModal(true);
              }}
            />
          </div>
        </div>

        <AddManagerModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddManager}
        />
        {/* Toast - OUTSIDE modal condition */}
        {toast.show && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[9999]">
            <div className="bg-red-500 w-70 sm:w-80 text-sm text-center text-white px-6 py-3 rounded-lg shadow-lg lg:text-base font-medium transition-opacity duration-300">
              {toast.message}
            </div>
          </div>
        )}
        <ConfirmDeleteModal
          isOpen={showDeleteModal}

          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteManager}

        />

        <UpdateManagerModal
          isOpen={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          onUpdate={handleUpdateManager}
          manager={selectedManager}
        />
      </div>
    </div>
    // </SidebarProvider>
  );
}