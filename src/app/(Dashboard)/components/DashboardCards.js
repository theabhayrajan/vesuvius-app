"use client";

import { GrLineChart } from "react-icons/gr";
import { useEffect, useState } from "react";

// components/DashboardCards.js
export default function DashboardCards({ managers, setDateFilter, dateFilter }) {
  const [totalSubmitted, setTotalSubmitted] = useState(0);
  const [totalApproved, setTotalApproved] = useState(0);
  const [totalWorkers, setTotalWorkers] = useState(0);
  const [totalClients, setTotalClients] = useState(0);

  useEffect(() => {
    if (!managers || managers.length === 0) {
      setTotalSubmitted(0);
      setTotalApproved(0);
      setTotalWorkers(0);
      setTotalClients(0);
      return;
    }

    const submitted = managers.length;
    const approved = managers.filter((m) => m.report === "Done").length;
    const totalWorkers = managers.reduce(
      (sum, m) => sum + (Number(m.workers) || 0),
      0
    );
    const Clients = managers.length;

    setTotalSubmitted(submitted);
    setTotalApproved(approved);
    setTotalWorkers(totalWorkers);
    setTotalClients(Clients);
  }, [managers]);

  const stats = [
    { title: "Total Clients", value: totalClients, percent: 69 },
    { title: "Total Managers", value: totalSubmitted, percent: 69 },
    { title: "Total Workers", value: totalWorkers, percent: 69 },
    {
      title: "Total Report Submitted",
      value: totalSubmitted,
      percent: 69,
      Today: true,
    },
    { title: "Total Approval", value: totalApproved, percent: 69, Today: true },
  ];

  return (
    <>

      <div>
            <div className="mb-4">
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="text-sm px-3 py-2 bg-[#f8faff] border border-gray-300 rounded-3xl w-40 text-[#3359a3] font-semibold focus:outline-none"
        >
          <option value="All">All</option>
          <option value="Today">Today</option>
          <option value="Yesterday">Yesterday</option>
          <option value="Last 7 Days">Last 7 Days</option>
          <option value="Last 15 Days">Last 15 Days</option>
          <option value="This Month">This Month</option>
          <option value="Last Month">Last Month</option>
          <option value="Last 3 Month">Last 3 Months</option>
          <option value="Last 6 Month">Last 6 Months</option>
          <option value="This Year">This Year</option>
          <option value="Last Year">Last Year</option>
        </select>
      </div>

        <div>


          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 px-6 py-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="relative bg-white p-4 rounded-3xl shadow flex flex-col justify-center items-center"
              >
                {/* Today Label (only for items with 'Today: true') */}
                {stat.Today && (
                  <div className="mb-3">

                  <div className="absolute top-0 left-0 bg-[#3359a3] text-white text-xs text-center px-3 py-1 rounded-tl-full rounded-bl-md min-w-20 whitespace-nowrap">
                     {dateFilter}
                    </div>
                  </div>


                )}

                <h3 className="text-base font-semibold text-[#acacac] text-center">
                  {stat.title}
                </h3>
                <p className="text-4xl text-[#333333] font-bold mt-1">
                  {stat.value}
                </p>
                <div className="flex flex-row justify-center items-center gap-1">
                  <p className="text-sm font-bold text-[#3359a3] mt-1">
                    <GrLineChart />
                  </p>
                  <p className="text-sm font-bold text-[#3359a3] mt-1">
                    {stat.percent}%
                  </p>
                  <p className="text-sm text-[#5f6265] mt-1">this month</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>




    </>

  );
}
