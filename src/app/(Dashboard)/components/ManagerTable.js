import { useState, useEffect, useRef } from "react";
import { Search } from 'lucide-react';

export default function ManagerTable({
  managers,
  onAddClick,
  onDeleteClick,
  onUpdateClick,
}) {
  const [menuIndex, setMenuIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortLocation, setSortLocation] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(7);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


// Reset to first page when search/filter changes
useEffect(() => {
  setCurrentPage(1);
}, [searchQuery, filterStatus, sortLocation]);

const filteredManagers = managers

  .filter((m) =>
    (m.name || "").toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
    (m.contact || "").toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
    (m.date || "").toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
    (m.machine || "").toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
    (m.location || "").toLowerCase().includes(searchQuery.trim().toLowerCase())
  )
 
  .filter((m) => filterStatus === "All" ? true : m.report === filterStatus)

  .filter((m) =>
    sortLocation === "All"
      ? true
      : (m.location || "").toLowerCase() === sortLocation.toLowerCase()
  );


  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredManagers.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredManagers.length / rowsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(currentPage + 2, totalPages);

    if (startPage > 1) pages.push(<button key="1" onClick={() => paginate(1)} className="px-4 py-2 rounded-md">1</button>);
    if (startPage > 2) pages.push(<span key="ellipsis-start" className="px-4 py-2">...</span>);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`px-4 py-2 rounded-md ${currentPage === i ? 'bg-[#3359a3] text-white' : 'bg-[#f5f5f5]'}`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages - 1) pages.push(<span key="ellipsis-end" className="px-4 py-2">...</span>);
    if (endPage < totalPages) pages.push(
      <button key={totalPages} onClick={() => paginate(totalPages)} className="px-4 py-2 rounded-md">{totalPages}</button>
    );

    return pages;
  };

  return (
    <div className="py-4 w-full">
      {/* Header Section */}
      <div className="flex flex-col gap-4 mb-4 px-2 sm:px-4 md:px-6">
        <div className="flex justify-between items-center w-full px-4">
          <h2 className="text-2xl font-semibold text-gray-800">Managers</h2>
          <button
            onClick={onAddClick}
            className="block xl:hidden bg-[#3359a3] text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
          >
            ADD +
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-3">
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:ml-4 md:sm:flex-row w-full">
            <div className="relative w-full sm:w-60 md:w-72 lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7e7e7e]" size={18} />
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-2 border bg-[#f9fbff] border-gray-300 text-sm rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select
              value={sortLocation}
              onChange={(e) => setSortLocation(e.target.value)}
              className="text-sm px-3 py-2 bg-[#f9fbff] border border-gray-300 rounded-md text-[#7e7e7e] focus:outline-none"
            >
              <option value="All">See: All</option>
              <option value="Noida">Sort by : Noida</option>
              <option value="Delhi">Sort by : Delhi</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-sm px-3 py-2 bg-[#f9fbff] border border-gray-300 rounded-md text-[#7e7e7e] focus:outline-none"
            >
              <option value="All">See: All</option>
              <option value="Pending">See: Pending</option>
              <option value="Done">See: Done</option>
            </select>
          </div>

          <div className="w-full sm:w-auto">
            <button
              onClick={onAddClick}
              className="hidden xl:block w-full md:w-[10vw] lg:w-[6vw] bg-[#3359a3] text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
            >
              ADD +
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200">
        <table className="w-full text-sm text-left text-gray-800 min-w-[768px]">
          <thead className="bg-[#3359a3] text-white">
            <tr className="text-sm">
              <th className="px-4 py-3 whitespace-nowrap">Name</th>
              <th className="px-4 py-3 whitespace-nowrap">Contact No.</th>
              <th className="px-4 py-3 whitespace-nowrap">Assigned Clients</th>
              <th className="px-4 py-3 whitespace-nowrap text-center">No. Of Workers</th>
              <th className="px-4 py-3 whitespace-nowrap">Report</th>
              <th className="px-4 py-3 whitespace-nowrap">Machine</th>
              <th className="px-4 py-3 whitespace-nowrap">Starting Date</th>
              <th className="px-4 py-3 whitespace-nowrap text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((m, i) => {
              const globalIndex = indexOfFirstRow + i; // ✅ FIX: global index
              return (
                <tr key={globalIndex} className="hover:bg-gray-50 border-b border-gray-200">
                  <td className="px-4 py-4 font-medium whitespace-nowrap">{m.name}</td>
                  <td className="px-4 py-4 font-semibold whitespace-nowrap">{m.contact}</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    {m.client}
                    <div className="text-xs text-gray-400">{m.location}</div>
                  </td>

                  <td className="px-4 py-4 font-bold text-center whitespace-nowrap">{m.workers}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-md text-white text-xs ${m.report === "Done" ? "bg-[#07bf99]" : "bg-[#c13320]"}`}>{m.report}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-block px-2 py-1 rounded-md text-white text-xs text-center min-w-[75px] ${m.machine === "Assign" ? "bg-[#07bf99]" : "bg-[#c13320]"}`}>{m.machine}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">{m.date}</td>
                  <td className="px-4 py-4 text-center relative">
                    <button
                      className="hover:bg-gray-200 cursor-pointer rounded-full w-8 h-8 flex items-center justify-center"
                      onClick={() => setMenuIndex(i === menuIndex ? null : i)}
                    >
                      ⋮
                    </button>
                    {menuIndex === i && (
                      <div
                        ref={menuRef}
                        className="absolute z-50 right-0 -top-2 w-30  bg-white border border-gray-200 rounded shadow-md"
                      >
                        <button
                          onClick={() => {
                            setMenuIndex(null);
                            onUpdateClick(m); 
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => {
                            setMenuIndex(null);
                            onDeleteClick(m); 
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 cursor-pointer text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col md:flex-col lg:flex-row md:px-20 justify-between items-center mt-4">
        <div className="text-base pb-5 md:text-sm text-[#b5b7c0]">
          Showing {indexOfFirstRow + 1} to {Math.min(indexOfLastRow, filteredManagers.length)} of {filteredManagers.length} entries
        </div>
        <div className="flex gap-2 flex-wrap justify-center">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-[#f5f5f5] text-black px-4 py-2 rounded-md"
          >
            &lt;
          </button>
          {renderPageNumbers()}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-[#f5f5f5] text-black px-4 py-2 rounded-md"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
