"use client";
import { useState, useRef, useEffect } from "react";
import TopNavbar from "@/app/(Dashboard)/components/Navbar";
import Sidebar from "@/app/(Dashboard)/components/Sidebar";
import DashboardCards from "@/app/(Dashboard)/components/DashboardCards";
import ManagerTable from "@/app/(Dashboard)/components/ManagerTable";
import AddManagerModal from "@/app/(Dashboard)/components/AddManagerModal";
import ConfirmDeleteModal from "@/app/(Dashboard)/components/ConfirmDeleteModal";
import UpdateManagerModal from "@/app/(Dashboard)/components/UpdateManagerModal";
import ReportCharts from "@/app/(Dashboard)/components/ReportCharts";

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
    date: "04 Apr'24",
  },
  {
    name: "Abhishek",
    contact: "9898765432",
    client: "Rajesh Kumar",
    location: "Delhi",
    workers: 3,
    report: "Done",
    machine: "Assign",
    date: "12 Mar'24",
  },
  {
    name: "Sneha",
    contact: "9823456789",
    client: "Anil Sharma",
    location: "Mumbai",
    workers: 5,
    report: "Pending",
    machine: "Assign",
    date: "25 May'24",
  },
  {
    name: "Ravi",
    contact: "9811122233",
    client: "Sunita Devi",
    location: "Kolkata",
    workers: 2,
    report: "Done",
    machine: "Not Assign",
    date: "17 Feb'24",
  },
  {
    name: "Pooja",
    contact: "9809098765",
    client: "Ramesh Gupta",
    location: "Pune",
    workers: 6,
    report: "Pending",
    machine: "Assign",
    date: "30 Jun'24",
  },
  {
    name: "Vikas",
    contact: "9877001122",
    client: "Suresh Yadav",
    location: "Chennai",
    workers: 3,
    report: "Done",
    machine: "Assign",
    date: "10 Jan'24",
  },
  {
    name: "Kiran",
    contact: "9888123456",
    client: "Ajay Mehta",
    location: "Bengaluru",
    workers: 1,
    report: "Pending",
    machine: "Not Assign",
    date: "05 May'24",
  },
  {
    name: "Manoj",
    contact: "9812233445",
    client: "Vijay Kumar",
    location: "Hyderabad",
    workers: 4,
    report: "Done",
    machine: "Assign",
    date: "20 Apr'24",
  },
  {
    name: "Divya",
    contact: "9822009988",
    client: "Arun Sharma",
    location: "Jaipur",
    workers: 2,
    report: "Pending",
    machine: "Not Assign",
    date: "15 Aug'24",
  },
  {
    name: "Sandeep",
    contact: "9800112233",
    client: "Mahesh Patil",
    location: "Lucknow",
    workers: 5,
    report: "Done",
    machine: "Assign",
    date: "08 Jul'24",
  },
  {
    name: "Priya",
    contact: "9845123456",
    client: "Anita Singh",
    location: "Surat",
    workers: 3,
    report: "Pending",
    machine: "Assign",
    date: "14 Sep'24",
  },
  {
    name: "Amit",
    contact: "9810098765",
    client: "Deepak Joshi",
    location: "Chandigarh",
    workers: 6,
    report: "Done",
    machine: "Assign",
    date: "28 Nov'24",
  },
  {
    name: "Neha",
    contact: "9833445566",
    client: "Rekha Verma",
    location: "Nagpur",
    workers: 4,
    report: "Pending",
    machine: "Not Assign",
    date: "19 Dec'24",
  },
  {
    name: "Kunal",
    contact: "9821223344",
    client: "Harish Chandra",
    location: "Indore",
    workers: 2,
    report: "Done",
    machine: "Assign",
    date: "01 Feb'24",
  },
  {
    name: "Meera",
    contact: "9808002233",
    client: "Sanjay Sinha",
    location: "Bhopal",
    workers: 3,
    report: "Pending",
    machine: "Assign",
    date: "22 Mar'24",
  },
  {
    name: "Arjun",
    contact: "9899001122",
    client: "Ravi Prasad",
    location: "Gurgaon",
    workers: 5,
    report: "Done",
    machine: "Not Assign",
    date: "03 May'24",
  },
  {
    name: "Simran",
    contact: "9811778899",
    client: "Shashi Kiran",
    location: "Faridabad",
    workers: 4,
    report: "Pending",
    machine: "Assign",
    date: "29 Jun'24",
  },
  {
    name: "Nitin",
    contact: "9822001100",
    client: "Vimal Singh",
    location: "Patna",
    workers: 1,
    report: "Done",
    machine: "Assign",
    date: "11 Jul'24",
  },
  {
    name: "Shreya",
    contact: "9800998877",
    client: "Rohit Bansal",
    location: "Agra",
    workers: 3,
    report: "Pending",
    machine: "Not Assign",
    date: "17 Aug'24",
  },
  {
    name: "Deepak",
    contact: "9871234567",
    client: "Amit Kapoor",
    location: "Varanasi",
    workers: 6,
    report: "Done",
    machine: "Assign",
    date: "21 Sep'24",
  },
  {
    name: "Isha",
    contact: "9827654321",
    client: "Rajeev Malhotra",
    location: "Kanpur",
    workers: 2,
    report: "Pending",
    machine: "Not Assign",
    date: "15 Jan'24",
  },
  {
    name: "Lokesh",
    contact: "9819988776",
    client: "Sandeep Chauhan",
    location: "Amritsar",
    workers: 5,
    report: "Done",
    machine: "Assign",
    date: "26 Feb'24",
  },
  {
    name: "Rohit",
    contact: "9832112233",
    client: "Tarun Arora",
    location: "Gwalior",
    workers: 3,
    report: "Pending",
    machine: "Assign",
    date: "02 Apr'24",
  },
  {
    name: "Ananya",
    contact: "9807766554",
    client: "Satish Nair",
    location: "Kochi",
    workers: 4,
    report: "Done",
    machine: "Not Assign",
    date: "19 Apr'24",
  },
  {
    name: "Sahil",
    contact: "9821230099",
    client: "Naveen Verma",
    location: "Thane",
    workers: 2,
    report: "Pending",
    machine: "Not Assign",
    date: "28 May'24",
  },
  {
    name: "Tanya",
    contact: "9812345678",
    client: "Pankaj Mittal",
    location: "Bhubaneswar",
    workers: 6,
    report: "Done",
    machine: "Assign",
    date: "05 Jun'24",
  },
  {
    name: "Kartik",
    contact: "9808765432",
    client: "Girish Shetty",
    location: "Mysuru",
    workers: 3,
    report: "Pending",
    machine: "Assign",
    date: "14 Jul'24",
  },
  {
    name: "Aarav",
    contact: "9898877665",
    client: "Himanshu Jain",
    location: "Vadodara",
    workers: 1,
    report: "Done",
    machine: "Not Assign",
    date: "20 Aug'24",
  },
  {
    name: "Vidya",
    contact: "9823344556",
    client: "Manoj Sharma",
    location: "Rajkot",
    workers: 4,
    report: "Pending",
    machine: "Assign",
    date: "29 Aug'24",
  },
  {
    name: "Jay",
    contact: "9811009988",
    client: "Parth Agarwal",
    location: "Jodhpur",
    workers: 2,
    report: "Done",
    machine: "Assign",
    date: "10 Sep'24",
  },
  {
    name: "Swati",
    contact: "9844556677",
    client: "Umesh Chandra",
    location: "Dehradun",
    workers: 5,
    report: "Pending",
    machine: "Not Assign",
    date: "15 Oct'24",
  },
  {
    name: "Harshit",
    contact: "9819876543",
    client: "Ashok Kumar",
    location: "Shimla",
    workers: 3,
    report: "Done",
    machine: "Assign",
    date: "21 Oct'24",
  },
  {
    name: "Monika",
    contact: "9825678901",
    client: "Pradeep Singh",
    location: "Panaji",
    workers: 4,
    report: "Pending",
    machine: "Assign",
    date: "30 Oct'24",
  },
  {
    name: "Aniket",
    contact: "9801122334",
    client: "Kailash Meena",
    location: "Udaipur",
    workers: 6,
    report: "Done",
    machine: "Assign",
    date: "04 Nov'24",
  },
  {
    name: "Bhavna",
    contact: "9812233446",
    client: "Sunil Rathi",
    location: "Ranchi",
    workers: 2,
    report: "Pending",
    machine: "Not Assign",
    date: "12 Nov'24",
  },
  {
    name: "Raj",
    contact: "9833344455",
    client: "Bharat Soni",
    location: "Aurangabad",
    workers: 3,
    report: "Done",
    machine: "Assign",
    date: "18 Nov'24",
  },
  {
    name: "Krishna",
    contact: "9877665544",
    client: "Vivek Tiwari",
    location: "Guwahati",
    workers: 5,
    report: "Pending",
    machine: "Assign",
    date: "22 Nov'24",
  },
  {
    name: "Geeta",
    contact: "9844332211",
    client: "Ashwini Patil",
    location: "Nashik",
    workers: 4,
    report: "Done",
    machine: "Not Assign",
    date: "25 Nov'24",
  },
  {
    name: "Omkar",
    contact: "9819988775",
    client: "Jagdish Rao",
    location: "Madurai",
    workers: 2,
    report: "Pending",
    machine: "Assign",
    date: "01 Dec'24",
  },
  {
    name: "Ramesh",
    contact: "9822110099",
    client: "Harbhajan Singh",
    location: "Jalandhar",
    workers: 1,
    report: "Done",
    machine: "Not Assign",
    date: "05 Dec'24",
  },
  {
    name: "Shivani",
    contact: "9809876543",
    client: "Tejas Kulkarni",
    location: "Kolhapur",
    workers: 3,
    report: "Pending",
    machine: "Assign",
    date: "10 Dec'24",
  },
  {
    name: "Pankaj",
    contact: "9871230987",
    client: "Naresh Kumar",
    location: "Meerut",
    workers: 6,
    report: "Done",
    machine: "Assign",
    date: "15 Dec'24",
  },
  {
    name: "Chirag",
    contact: "9823344990",
    client: "Dinesh Sharma",
    location: "Bareilly",
    workers: 4,
    report: "Pending",
    machine: "Not Assign",
    date: "20 Dec'24",
  },
  {
    name: "Lata",
    contact: "9812347788",
    client: "Anupam Roy",
    location: "Howrah",
    workers: 5,
    report: "Done",
    machine: "Assign",
    date: "22 Dec'24",
  },
  {
    name: "Manish",
    contact: "9845223344",
    client: "Prem Prakash",
    location: "Ghaziabad",
    workers: 3,
    report: "Pending",
    machine: "Assign",
    date: "27 Dec'24",
  },
  {
    name: "Tanvi",
    contact: "9807654321",
    client: "Hemant Joshi",
    location: "Dharamshala",
    workers: 2,
    report: "Done",
    machine: "Not Assign",
    date: "29 Dec'24",
  },
  {
    name: "Sameer",
    contact: "9824433221",
    client: "Kiran Desai",
    location: "Ahmedabad",
    workers: 4,
    report: "Pending",
    machine: "Assign",
    date: "31 Dec'24",
  },
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

 

 const handleAddManager = (newManager) => {
    setManagers([...managers, newManager]);
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
        m === selectedManager ? updatedManager : m
      )
    );
    setShowUpdateModal(false);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      <div className="flex-1 h-screen overflow-y-auto bg-white px-4 md:px-6 py-6">
        <TopNavbar onHamburgerClick={() => setIsMobileOpen(true)} />
        <div className="max-w-9xl mx-auto bg-[#f3f5f9] rounded-3xl p-6 space-y-6 shadow-sm">
          <DashboardCards />
          <ReportCharts managers={managers} />
          <div className="max-w-[80vw] mx-auto bg-white rounded-2xl">
            <ManagerTable
              managers={managers}
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
  );
}