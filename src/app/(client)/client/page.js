"use client"

import { useState, useRef, useEffect } from "react";
import TopNavbar from "@/app/(Dashboard)/components/Navbar";
import Sidebar from "@/app/(Dashboard)/components/Sidebar";
import ClientTable from './ClientTable';
import AddClientModal from "../components/AddClientModal";
import UpdateClientModal from "../components/UpdateClientModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import ClientCards from "./ClientCards";
import { managersData, robotMachinesData } from "@/app/data/data";

export default function Home() {

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

const [clients, setClients]= useState([ 
  {
    name: "Mohan Lal Pandey",
    contact: "9876543210",
    company: "TechSolutions Pvt Ltd",
    location: "Noida",
    workers: 4,
    managers: "Yash",
    machine: "Not Assign",
    date: "04 Apr 2025",
  },
  {
    name: "Rajesh Kumar",
    contact: "9898765432",
    company: "GlobalSoft Ltd",
    location: "Delhi",
    workers: 3,
    managers: "Abhishek",
    machine: "Assign",
    date: "12 Mar 2025",
  },
  {
    name: "Anil Sharma",
    contact: "9823456789",
    company: "InnovaTech Solutions",
    location: "Mumbai",
    workers: 5,
    managers: "Sneha",
    machine: "Assign",
    date: "25 May 2025",
  },
  {
    name: "Sunita Devi",
    contact: "9811122233",
    company: "NextGen Enterprises",
    location: "Kolkata",
    workers: 2,
    managers: "Ravi",
    machine: "Not Assign",
    date: "17 Feb 2025",
  },
  {
    name: "Ramesh Gupta",
    contact: "9809098765",
    company: "VisionCorp Pvt Ltd",
    location: "Pune",
    workers: 6,
    managers: "Pooja",
    machine: "Assign",
    date: "30 Jun 2025",
  },
  {
    name: "Suresh Yadav",
    contact: "9877001122",
    company: "BrightFuture Ltd",
    location: "Chennai",
    workers: 3,
    managers: "Vikas",
    machine: "Assign",
    date: "10 Jan 2025",
  },
  {
    name: "Ajay Mehta",
    contact: "9888123456",
    company: "GreenLeaf Industries",
    location: "Bengaluru",
    workers: 1,
    managers: "Kiran",
    machine: "Not Assign",
    date: "05 May 2025",
  },
  {
    name: "Vijay Kumar",
    contact: "9812233445",
    company: "StarEdge Technologies",
    location: "Hyderabad",
    workers: 4,
    managers: "Manoj",
    machine: "Assign",
    date: "20 Apr 2025",
  },
  {
    name: "Arun Sharma",
    contact: "9822009988",
    company: "FutureWave Pvt Ltd",
    location: "Jaipur",
    workers: 2,
    managers: "Divya",
    machine: "Not Assign",
    date: "15 Aug 2025",
  },
  {
    name: "Mahesh Patil",
    contact: "9800112233",
    company: "SkyHigh Solutions",
    location: "Lucknow",
    workers: 5,
    managers: "Sandeep",
    machine: "Assign",
    date: "08 Jul 2025",
  },
  {
    name: "Anita Singh",
    contact: "9845123456",
    company: "ProTech Systems",
    location: "Surat",
    workers: 3,
    managers: "Priya",
    machine: "Assign",
    date: "14 Sep 2025",
  },
  {
    name: "Deepak Joshi",
    contact: "9810098765",
    company: "AlphaOmega Pvt Ltd",
    location: "Chandigarh",
    workers: 6,
    managers: "Amit",
    machine: "Assign",
    date: "28 Nov 2025",
  },
  {
    name: "Rekha Verma",
    contact: "9833445566",
    company: "UrbanTech Global",
    location: "Nagpur",
    workers: 4,
    managers: "Neha",
    machine: "Not Assign",
    date: "19 Dec 2025",
  },
  {
    name: "Harish Chandra",
    contact: "9821223344",
    company: "BlueOcean Corp",
    location: "Indore",
    workers: 2,
    managers: "Kunal",
    machine: "Assign",
    date: "01 Feb 2025",
  },
  {
    name: "Sanjay Sinha",
    contact: "9808002233",
    company: "NovaTech Systems",
    location: "Bhopal",
    workers: 3,
    managers: "Meera",
    machine: "Assign",
    date: "22 Mar 2025",
  },
  {
    name: "Ravi Prasad",
    contact: "9899001122",
    company: "EcoBuild Pvt Ltd",
    location: "Gurgaon",
    workers: 5,
    managers: "Arjun",
    machine: "Not Assign",
    date: "03 May 2025",
  },
  {
    name: "Shashi Kiran",
    contact: "9811778899",
    company: "SmartTech Solutions",
    location: "Faridabad",
    workers: 4,
    managers: "Simran",
    machine: "Assign",
    date: "29 Jun 2025",
  },
  {
    name: "Vimal Singh",
    contact: "9822001100",
    company: "Zenith Enterprises",
    location: "Patna",
    workers: 1,
    managers: "Nitin",
    machine: "Assign",
    date: "11 Jul 2025",
  },
  {
    name: "Rohit Bansal",
    contact: "9800998877",
    company: "BrightPath Pvt Ltd",
    location: "Agra",
    workers: 3,
    managers: "Shreya",
    machine: "Not Assign",
    date: "17 Aug 2025",
  },
  {
    name: "Amit Kapoor",
    contact: "9871234567",
    company: "NextWave Technologies",
    location: "Varanasi",
    workers: 6,
    managers: "Deepak",
    machine: "Assign",
    date: "21 Sep 2025",
  },
]);

  const [toast, setToast] = useState({ show: false, message: "" });
  const toastTimerRef = useRef(null);




  const [dateFilter, setDateFilter] = useState("All"); // ⬅️ NEW

  // helper: parse "04 Nov 2025", "04 November 2025", "04 APR 2025", etc.
  const parseDate = (str) => {
    if (!str) return null;

    // Remove apostrophes (e.g., "Apr 2025" → "Apr 24")
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
    const c = monthMap[monKey];
    if (c === undefined) return null;

    // Handle 2-digit vs 4-digit year
    const y = yearRaw.length === 2 ? parseInt("20" + yearRaw, 10) : parseInt(yearRaw, 10);

    return new Date(y, m, d);
  };



  // ✅ filter managers by selected dateFilter
  const getFilteredManagers = () => {
    const now = new Date();
    return managersData.filter((m) => {
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

  const getFilteredClients = () => {
    const now = new Date();
    return clients.filter((c) => {
      const d = parseDate(c.date);
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
  const filteredClients = getFilteredClients();


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



  const handleAddClient = (newClient) => {
    setClients([newClient, ...clients]);
     managersData.unshift(newClient);
    setShowAddModal(false);
  };

  const handleDeleteClient = () => {
    if (!selectedClient) return;
    setClients(clients.filter((c) => c !== selectedClient));
    setShowDeleteModal(false);
    showToast("Record Deleted successfully!");
  };

  const handleUpdateClient = (updatedClient) => {
    if (!selectedClient) return;
    setClients(
      clients.map((c) =>
        c === selectedClient ? { ...c, ...updatedClient } : c
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
        <div className="max-w-8xl mx-auto bg-[#f3f5f9] rounded-3xl p-6 space-y-6 shadow-sm">
          <ClientCards clients={filteredClients} managers={filteredManagers} robotMachines={robotMachinesData} setDateFilter={setDateFilter} dateFilter={dateFilter} />

          <div className="max-w-[80vw] mx-auto bg-white rounded-2xl">
            <ClientTable
              clients={filteredClients}
              onAddClick={() => setShowAddModal(true)}
              onDeleteClick={(client) => {
                setSelectedClient(client);
                setShowDeleteModal(true);
              }}
              onUpdateClick={(client) => {
                setSelectedClient(client);
                setShowUpdateModal(true);
              }}
            />
          </div>
        </div>

        <AddClientModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddClient}
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
          onConfirm={handleDeleteClient}

        />

        <UpdateClientModal
          isOpen={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          onUpdate={handleUpdateClient}
          client={selectedClient}
        />
      </div>
    </div>
    // </SidebarProvider>
  );
}
