"use client"

import { useState, useRef, useEffect } from "react";
import TopNavbar from "@/app/(Dashboard)/components/Navbar";
import Sidebar from "@/app/(Dashboard)/components/Sidebar";
import ClientTable from './ClientTable';
import AddClientModal from "../components/AddClientModal";
import UpdateClientModal from "../components/UpdateClientModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import ClientCards from "./ClientCards";

export default function Home() {

 const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const [clients, setClients] = useState([
  {
    name: "Mohan Lal Pandey",
    contact: "9876543210",
    company: "TechSolutions Pvt Ltd",
    location: "Noida",
    workers: 4,
    managers: 5,
    machine: "Not Assign",
    date: "04 Apr 2024",
  },
  {
    name: "Rajesh Kumar",
    contact: "9898765432",
    company: "GlobalSoft Ltd",
    location: "Delhi",
    workers: 3,
    managers: 7,
    machine: "Assign",
    date: "12 Mar 2024",
  },
  {
    name: "Anil Sharma",
    contact: "9823456789",
    company: "InnovaTech Solutions",
    location: "Mumbai",
    workers: 5,
    managers: 5,
    machine: "Assign",
    date: "25 May 2024",
  },
  {
    name: "Sunita Devi",
    contact: "9811122233",
    company: "NextGen Enterprises",
    location: "Kolkata",
    workers: 2,
    managers: 7,
    machine: "Not Assign",
    date: "17 Feb 2024",
  },
  {
    name: "Ramesh Gupta",
    contact: "9809098765",
    company: "VisionCorp Pvt Ltd",
    location: "Pune",
    workers: 6,
    managers: 5,
    machine: "Assign",
    date: "30 Jun 2024",
  },
  {
    name: "Suresh Yadav",
    contact: "9877001122",
    company: "BrightFuture Ltd",
    location: "Chennai",
    workers: 3,
    managers: 7,
    machine: "Assign",
    date: "10 Jan 2024",
  },
  {
    name: "Ajay Mehta",
    contact: "9888123456",
    company: "GreenLeaf Industries",
    location: "Bengaluru",
    workers: 1,
    managers: 5,
    machine: "Not Assign",
    date: "05 May 2024",
  },
  {
    name: "Vijay Kumar",
    contact: "9812233445",
    company: "StarEdge Technologies",
    location: "Hyderabad",
    workers: 4,
    managers: 7,
    machine: "Assign",
    date: "20 Apr 2024",
  },
  {
    name: "Arun Sharma",
    contact: "9822009988",
    company: "FutureWave Pvt Ltd",
    location: "Jaipur",
    workers: 2,
    managers: 5,
    machine: "Not Assign",
    date: "15 Aug 2024",
  },
  {
    name: "Mahesh Patil",
    contact: "9800112233",
    company: "SkyHigh Solutions",
    location: "Lucknow",
    workers: 5,
    managers: 7,
    machine: "Assign",
    date: "08 Jul 2024",
  },
  {
    name: "Anita Singh",
    contact: "9845123456",
    company: "ProTech Systems",
    location: "Surat",
    workers: 3,
    managers: 5,
    machine: "Assign",
    date: "14 Sep 2024",
  },
  {
    name: "Deepak Joshi",
    contact: "9810098765",
    company: "AlphaOmega Pvt Ltd",
    location: "Chandigarh",
    workers: 6,
    managers: 7,
    machine: "Assign",
    date: "28 Nov 2024",
  },
  {
    name: "Rekha Verma",
    contact: "9833445566",
    company: "UrbanTech Global",
    location: "Nagpur",
    workers: 4,
    managers: 5,
    machine: "Not Assign",
    date: "19 Dec 2024",
  },
  {
    name: "Harish Chandra",
    contact: "9821223344",
    company: "BlueOcean Corp",
    location: "Indore",
    workers: 2,
    managers: 7,
    machine: "Assign",
    date: "01 Feb 2024",
  },
  {
    name: "Sanjay Sinha",
    contact: "9808002233",
    company: "NovaTech Systems",
    location: "Bhopal",
    workers: 3,
    managers: 5,
    machine: "Assign",
    date: "22 Mar 2024",
  },
  {
    name: "Ravi Prasad",
    contact: "9899001122",
    company: "EcoBuild Pvt Ltd",
    location: "Gurgaon",
    workers: 5,
    managers: 7,
    machine: "Not Assign",
    date: "03 May 2024",
  },
  {
    name: "Shashi Kiran",
    contact: "9811778899",
    company: "SmartTech Solutions",
    location: "Faridabad",
    workers: 4,
    managers: 5,
    machine: "Assign",
    date: "29 Jun 2024",
  },
  {
    name: "Vimal Singh",
    contact: "9822001100",
    company: "Zenith Enterprises",
    location: "Patna",
    workers: 1,
    managers: 7,
    machine: "Assign",
    date: "11 Jul 2024",
  },
  {
    name: "Rohit Bansal",
    contact: "9800998877",
    company: "BrightPath Pvt Ltd",
    location: "Agra",
    workers: 3,
    managers: 5,
    machine: "Not Assign",
    date: "17 Aug 2024",
  },
  {
    name: "Amit Kapoor",
    contact: "9871234567",
    company: "NextWave Technologies",
    location: "Varanasi",
    workers: 6,
    managers: 7,
    machine: "Assign",
    date: "21 Sep 2024",
  },
  // ...continue the same pattern for the rest
]);

  const [toast, setToast] = useState({ show: false, message: "" });
  const toastTimerRef = useRef(null);


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
         <div className="max-w-9xl mx-auto bg-[#f3f5f9] rounded-3xl p-6 space-y-6 shadow-sm">
          <ClientCards clients={clients} />
           {/* <ClientCards managers={filteredManagers} setDateFilter={setDateFilter} dateFilter={dateFilter} /> */}
           {/* <ReportCharts managers={filteredManagers} dateFilter={dateFilter} /> */}
 
           <div className="max-w-[80vw] mx-auto bg-white rounded-2xl">
             <ClientTable
               clients={clients}
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
