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
// import { SidebarProvider, DashboardSidebar, DashboardNavbar } from "@/app/(Dashboard)/components/DashboardShell";

export default function Home() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const [managers, setManagers] = useState([
  {
    name: "Yash",
    contact: "9876543210",
    client: "Mohan Lal Pandey",
    location: "Noida",
    workers: 4,
    report: "Pending",
    machine: "Not Assign",
    date: "04 Apr 2024",
  },
  {
    name: "Abhishek",
    contact: "9898765432",
    client: "Rajesh Kumar",
    location: "Delhi",
    workers: 3,
    report: "Done",
    machine: "Assign",
    date: "12 Mar 2024",
  },
  {
    name: "Sneha",
    contact: "9823456789",
    client: "Anil Sharma",
    location: "Mumbai",
    workers: 5,
    report: "Pending",
    machine: "Assign",
    date: "25 May 2024",
  },
  {
    name: "Ravi",
    contact: "9811122233",
    client: "Sunita Devi",
    location: "Kolkata",
    workers: 2,
    report: "Done",
    machine: "Not Assign",
    date: "17 Feb 2024",
  },
  {
    name: "Pooja",
    contact: "9809098765",
    client: "Ramesh Gupta",
    location: "Pune",
    workers: 6,
    report: "Pending",
    machine: "Assign",
    date: "30 Jun 2024",
  },
  {
    name: "Vikas",
    contact: "9877001122",
    client: "Suresh Yadav",
    location: "Chennai",
    workers: 3,
    report: "Done",
    machine: "Assign",
    date: "10 Jan 2024",
  },
  {
    name: "Kiran",
    contact: "9888123456",
    client: "Ajay Mehta",
    location: "Bengaluru",
    workers: 1,
    report: "Pending",
    machine: "Not Assign",
    date: "05 May 2024",
  },
  {
    name: "Manoj",
    contact: "9812233445",
    client: "Vijay Kumar",
    location: "Hyderabad",
    workers: 4,
    report: "Done",
    machine: "Assign",
    date: "20 Apr 2024",
  },
  {
    name: "Divya",
    contact: "9822009988",
    client: "Arun Sharma",
    location: "Jaipur",
    workers: 2,
    report: "Pending",
    machine: "Not Assign",
    date: "15 Aug 2024",
  },
  {
    name: "Sandeep",
    contact: "9800112233",
    client: "Mahesh Patil",
    location: "Lucknow",
    workers: 5,
    report: "Done",
    machine: "Assign",
    date: "08 Jul 2024",
  },
  {
    name: "Priya",
    contact: "9845123456",
    client: "Anita Singh",
    location: "Surat",
    workers: 3,
    report: "Pending",
    machine: "Assign",
    date: "14 Sep 2024",
  },
  {
    name: "Amit",
    contact: "9810098765",
    client: "Deepak Joshi",
    location: "Chandigarh",
    workers: 6,
    report: "Done",
    machine: "Assign",
    date: "28 Nov 2024",
  },
  {
    name: "Neha",
    contact: "9833445566",
    client: "Rekha Verma",
    location: "Nagpur",
    workers: 4,
    report: "Pending",
    machine: "Not Assign",
    date: "19 Dec 2024",
  },
  {
    name: "Kunal",
    contact: "9821223344",
    client: "Harish Chandra",
    location: "Indore",
    workers: 2,
    report: "Done",
    machine: "Assign",
    date: "01 Feb 2024",
  },
  {
    name: "Meera",
    contact: "9808002233",
    client: "Sanjay Sinha",
    location: "Bhopal",
    workers: 3,
    report: "Pending",
    machine: "Assign",
    date: "22 Mar 2024",
  },
  {
    name: "Arjun",
    contact: "9899001122",
    client: "Ravi Prasad",
    location: "Gurgaon",
    workers: 5,
    report: "Done",
    machine: "Not Assign",
    date: "03 May 2024",
  },
  {
    name: "Simran",
    contact: "9811778899",
    client: "Shashi Kiran",
    location: "Faridabad",
    workers: 4,
    report: "Pending",
    machine: "Assign",
    date: "29 Jun 2024",
  },
  {
    name: "Nitin",
    contact: "9822001100",
    client: "Vimal Singh",
    location: "Patna",
    workers: 1,
    report: "Done",
    machine: "Assign",
    date: "11 Jul 2024",
  },
  {
    name: "Shreya",
    contact: "9800998877",
    client: "Rohit Bansal",
    location: "Agra",
    workers: 3,
    report: "Pending",
    machine: "Not Assign",
    date: "17 Aug 2024",
  },
  {
    name: "Deepak",
    contact: "9871234567",
    client: "Amit Kapoor",
    location: "Varanasi",
    workers: 6,
    report: "Done",
    machine: "Assign",
    date: "21 Sep 2024",
  },
  {
    name: "Isha",
    contact: "9827654321",
    client: "Rajeev Malhotra",
    location: "Kanpur",
    workers: 2,
    report: "Pending",
    machine: "Not Assign",
    date: "15 Jan 2024",
  },
  {
    name: "Lokesh",
    contact: "9819988776",
    client: "Sandeep Chauhan",
    location: "Amritsar",
    workers: 5,
    report: "Done",
    machine: "Assign",
    date: "26 Feb 2024",
  },
  {
    name: "Rohit",
    contact: "9832112233",
    client: "Tarun Arora",
    location: "Gwalior",
    workers: 3,
    report: "Pending",
    machine: "Assign",
    date: "02 Apr 2024",
  },
  {
    name: "Ananya",
    contact: "9807766554",
    client: "Satish Nair",
    location: "Kochi",
    workers: 4,
    report: "Done",
    machine: "Not Assign",
    date: "19 Apr 2024",
  },
  {
    name: "Sahil",
    contact: "9821230099",
    client: "Naveen Verma",
    location: "Thane",
    workers: 2,
    report: "Pending",
    machine: "Not Assign",
    date: "28 May 2024",
  },
  {
    name: "Tanya",
    contact: "9812345678",
    client: "Pankaj Mittal",
    location: "Bhubaneswar",
    workers: 6,
    report: "Done",
    machine: "Assign",
    date: "05 Jun 2024",
  },
  {
    name: "Kartik",
    contact: "9808765432",
    client: "Girish Shetty",
    location: "Mysuru",
    workers: 3,
    report: "Pending",
    machine: "Assign",
    date: "14 Jul 2024",
  },
  {
    name: "Aarav",
    contact: "9898877665",
    client: "Himanshu Jain",
    location: "Vadodara",
    workers: 1,
    report: "Done",
    machine: "Not Assign",
    date: "20 Aug 2024",
  },
  {
    name: "Vidya",
    contact: "9823344556",
    client: "Manoj Sharma",
    location: "Rajkot",
    workers: 4,
    report: "Pending",
    machine: "Assign",
    date: "29 Aug 2024",
  },
  {
    name: "Jay",
    contact: "9811009988",
    client: "Parth Agarwal",
    location: "Jodhpur",
    workers: 2,
    report: "Done",
    machine: "Assign",
    date: "10 Sep 2024",
  },
  {
    name: "Swati",
    contact: "9844556677",
    client: "Umesh Chandra",
    location: "Dehradun",
    workers: 5,
    report: "Pending",
    machine: "Not Assign",
    date: "15 Oct 2024",
  },
  {
    name: "Harshit",
    contact: "9819876543",
    client: "Ashok Kumar",
    location: "Shimla",
    workers: 3,
    report: "Done",
    machine: "Assign",
    date: "21 Oct 2024",
  },
  {
    name: "Monika",
    contact: "9825678901",
    client: "Pradeep Singh",
    location: "Panaji",
    workers: 4,
    report: "Pending",
    machine: "Assign",
    date: "30 Oct 2024",
  },
  {
    name: "Aniket",
    contact: "9801122334",
    client: "Kailash Meena",
    location: "Udaipur",
    workers: 6,
    report: "Done",
    machine: "Assign",
    date: "04 Nov 2024",
  },
  {
    name: "Bhavna",
    contact: "9812233446",
    client: "Sunil Rathi",
    location: "Ranchi",
    workers: 2,
    report: "Pending",
    machine: "Not Assign",
    date: "12 Nov 2024",
  },
  {
    name: "Raj",
    contact: "9833344455",
    client: "Bharat Soni",
    location: "Aurangabad",
    workers: 3,
    report: "Done",
    machine: "Assign",
    date: "18 Nov 2024",
  },
  {
    name: "Krishna",
    contact: "9877665544",
    client: "Vivek Tiwari",
    location: "Guwahati",
    workers: 5,
    report: "Pending",
    machine: "Assign",
    date: "22 Nov 2024",
  },
  {
    name: "Geeta",
    contact: "9844332211",
    client: "Ashwini Patil",
    location: "Nashik",
    workers: 4,
    report: "Done",
    machine: "Not Assign",
    date: "25 Nov 2024",
  },
  {
    name: "Omkar",
    contact: "9819988775",
    client: "Jagdish Rao",
    location: "Madurai",
    workers: 2,
    report: "Pending",
    machine: "Assign",
    date: "01 Dec 2024",
  },
  {
    name: "Ramesh",
    contact: "9822110099",
    client: "Harbhajan Singh",
    location: "Jalandhar",
    workers: 1,
    report: "Done",
    machine: "Not Assign",
    date: "05 Dec 2024",
  },
  {
    name: "Shivani",
    contact: "9809876543",
    client: "Tejas Kulkarni",
    location: "Kolhapur",
    workers: 3,
    report: "Pending",
    machine: "Assign",
    date: "10 Dec 2024",
  },
  {
    name: "Pankaj",
    contact: "9871230987",
    client: "Naresh Kumar",
    location: "Meerut",
    workers: 6,
    report: "Done",
    machine: "Assign",
    date: "15 Dec 2024",
  },
  {
    name: "Chirag",
    contact: "9823344990",
    client: "Dinesh Sharma",
    location: "Bareilly",
    workers: 4,
    report: "Pending",
    machine: "Not Assign",
    date: "20 Dec 2024",
  },
  {
    name: "Lata",
    contact: "9812347788",
    client: "Anupam Roy",
    location: "Howrah",
    workers: 5,
    report: "Done",
    machine: "Assign",
    date: "22 Dec 2024",
  },
  {
    name: "Manish",
    contact: "9845223344",
    client: "Prem Prakash",
    location: "Ghaziabad",
    workers: 3,
    report: "Pending",
    machine: "Assign",
    date: "27 Dec 2024",
  },
  {
    name: "Tanvi",
    contact: "9807654321",
    client: "Hemant Joshi",
    location: "Dharamshala",
    workers: 2,
    report: "Done",
    machine: "Not Assign",
    date: "29 Dec 2024",
  },
  {
    name: "Sameer",
    contact: "9824433221",
    client: "Kiran Desai",
    location: "Ahmedabad",
    workers: 4,
    report: "Pending",
    machine: "Assign",
    date: "31 Dec 2024",
  },
]);
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