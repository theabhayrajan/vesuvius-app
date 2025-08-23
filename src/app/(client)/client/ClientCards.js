"use client";

import { GrLineChart } from "react-icons/gr";
import { useEffect, useState } from "react";
import {
    CircularProgressbar,
    buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// ✅ Animated Circular Progress wrapper
function AnimatedProgressProvider({ value }) {
    const [animatedValue, setAnimatedValue] = useState(0);

    useEffect(() => {
        let start = animatedValue;
        let end = value;
        let startTime = null;

        const duration = 500; // animation time in ms

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentValue = Math.round(start + (end - start) * progress);
            setAnimatedValue(currentValue);

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    }, [value]);

    return (
        <CircularProgressbar
            value={animatedValue}
            text={`${animatedValue}%`}
            strokeWidth={12}
            styles={buildStyles({
                pathColor: "#3359a3",
                textColor: "#333333",
                trailColor: "#e5e7eb",
                textSize: "20px",
                fontWeight: "bold",
                strokeLinecap: "round",
            })}
        />
    );
}

export default function ClientCards({
    clients,
    setDateFilter,
    dateFilter,
    managers,
    robotMachines,
}) {
    const [totalClients, setTotalClients] = useState(0);
    const [totalRobotMachines, setTotalRobotMachines] = useState(0);
    const [totalManagers, setTotalManagers] = useState(0);
    const [activeClients, setActiveClients] = useState(0);
    const [inActiveClients, setInActiveClients] = useState(0);
    const [activeManagers, setActiveManagers] = useState(0);
    const [inActiveManagers, setInActiveManagers] = useState(0);
    const [activeRobotMachines, setActiveRobotMachines] = useState(0);
    const [inActiveRobotMachines, setInActiveRobotMachines] = useState(0);

    useEffect(() => {
        if (!managers || managers.length === 0) {
            setTotalClients(0);
            setTotalRobotMachines(0);
            setTotalManagers(0);
            setActiveClients(0);
            setInActiveClients(0);
            setActiveManagers(0);
            setInActiveManagers(0);
            setActiveRobotMachines(0);
            setInActiveRobotMachines(0);
            return;
        }

        const totalClients = clients.length + (managers.length - clients.length);
        const totalRobotMachines = robotMachines.length;
        const totalManagers = managers.length;

        const activeClients = clients.length;
        const inactiveClients = totalClients - activeClients;

        const activeManagers = managers.filter((m) =>
            clients.some((c) => c.name === m.client)
        ).length;
        const inactiveManagers = totalManagers - activeManagers;

        const activeMachines = robotMachines.filter(
            (r) => r.status === "active"
        ).length;
        const inactiveMachines = totalRobotMachines - activeMachines;

        setTotalClients(totalClients);
        setTotalRobotMachines(totalRobotMachines);
        setTotalManagers(totalManagers);
        setActiveClients(activeClients);
        setInActiveClients(inactiveClients);
        setActiveManagers(activeManagers);
        setInActiveManagers(inactiveManagers);
        setActiveRobotMachines(activeMachines);
        setInActiveRobotMachines(inactiveMachines);
    }, [clients, managers, robotMachines, dateFilter]);

    const stats = [
        {
            title: "Total Clients",
            value: totalClients,
            percent:
                totalClients > 0
                    ? Math.round((activeClients / totalClients) * 100)
                    : 0,
            active: activeClients,
            inactive: inActiveClients,
        },
        {
            title: "Total Robot Machine",
            value: totalRobotMachines,
            percent:
                totalRobotMachines > 0
                    ? Math.round(
                        (activeRobotMachines / totalRobotMachines) * 100
                    )
                    : 0,
            active: activeRobotMachines,
            inactive: inActiveRobotMachines,
        },
        {
            title: "Total Managers",
            value: totalManagers,
            percent:
                totalManagers > 0
                    ? Math.round((activeManagers / totalManagers) * 100)
                    : 0,
            active: activeManagers,
            inactive: inActiveManagers,
        },
    ];

    return (
        <div>
            {/* Dropdown */}
            <div className="mb-4">
                <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="text-sm px-3 py-2 bg-[#f8faff] border border-gray-300 rounded-3xl w-40 text-[#3359a3] font-semibold focus:outline-none"
                >
                    <option value="All">Total</option>
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

            {/* Cards */}
            <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 gap-6 w-full">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-3xl shadow p-6 flex items-center justify-between"
                        >
                            {/* Left content */}
                            <div>
                                <h3 className="text-base font-semibold text-gray-400">
                                    {stat.title}
                                </h3>
                                <p className="text-4xl font-bold text-gray-800 mt-1">
                                    {stat.value}
                                </p>

                                <div className="flex items-center gap-1 mt-2">
                                    <span className="text-sm font-bold text-[#3359a3]">
                                        <GrLineChart />
                                    </span>
                                    <span className="text-sm font-bold text-[#3359a3]">69%</span>
                                    <span className="text-sm text-gray-500">this month</span>
                                </div>

                                <div className="flex flex-row items-center gap-8 mt-4 text-sm font-medium">
                                    <span className="text-[#c9c9c9]">
                                        Active <br />
                                        <span className="font-bold text-gray-800">{stat.active}</span>
                                    </span>
                                    <span className="text-[#c9c9c9]">
                                        Inactive <br />
                                        <span className="font-bold text-gray-800">{stat.inactive}</span>
                                    </span>
                                </div>
                            </div>

                            {/* Right animated progress circle */}
                            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
                                <AnimatedProgressProvider value={stat.percent} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
