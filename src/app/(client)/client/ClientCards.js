"use client";

import { GrLineChart } from "react-icons/gr";
import { useEffect, useState } from "react";

// components/DashboardCards.js
export default function ClientCards({ clients, setDateFilter, dateFilter }) {
    const [totalClients, setTotalClients] = useState(0);
    const [totalRobotMachines, setTotalRobotMachines] = useState(0);
    const [totalManagers, setTotalManagers] = useState(0);

    useEffect(() => {
        if (!clients || clients.length === 0) {
            setTotalClients(0);
            setTotalRobotMachines(0);
            setTotalManagers(0);
            return;
        }

        const totalClients = clients.length;
        const totalRobotMachines = clients.length;
        const totalManagers = clients.reduce(
            (sum, c) => sum + (Number(c.managers) || 0),
            0
        );
        
        const Clients = clients.length;

        setTotalClients(totalClients);
        setTotalRobotMachines(totalRobotMachines);
        setTotalManagers(totalManagers);
    }, [clients]);

    const stats = [
        { title: "Total Clients", value: totalClients, percent: 69 },
        { title: "Total Robot Machine", value: totalRobotMachines, percent: 69 },
        { title: "Total Managers", value: totalManagers, percent: 69 },
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
                                {/* {stat.Today && (
                  <div className="mb-3">

                  <div className="absolute top-0 left-0 bg-[#3359a3] text-white text-xs text-center px-3 py-1 rounded-tl-full rounded-bl-md min-w-20 whitespace-nowrap">
                     {dateFilter}
                    </div>
                  </div>


                )} */}

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
