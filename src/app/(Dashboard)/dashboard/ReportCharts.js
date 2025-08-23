"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { useEffect, useState } from "react";
import {
  format,
  startOfMonth,
  differenceInCalendarWeeks,
  getYear,
} from "date-fns";

export default function ReportCharts({ managers, dateFilter }) {
  const [lineData, setLineData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [chartVersion, setChartVersion] = useState(0);

  const COLORS = ["#83dfa6", "#81cafc"];
  const [pieSize, setPieSize] = useState({ inner: 110, outer: 220 });
  const [chartHeight, setChartHeight] = useState(450);
  const [lineChartHeight, setLineChartHeight] = useState(300);
  const [hasData, setHasData] = useState(true);

  // 🟢 Pie + Line Data generator
  useEffect(() => {
    if (!managers || managers.length === 0) {
      setHasData(false);
      setLineData([]);
      setPieData([]);
      return;
    }
    setHasData(true);

    // ---- PIE CHART ----
    const totalSubmitted = managers.length;
    const totalApproved = managers.filter((m) => m.report === "Done").length;
    const totalPending = totalSubmitted - totalApproved;

    const pendingPercent = ((totalPending / totalSubmitted) * 100).toFixed(1);
    const approvedPercent = ((totalApproved / totalSubmitted) * 100).toFixed(1);

    setPieData([
      { name: "Pending reports", value: Number(pendingPercent) },
      { name: "Approved reports", value: Number(approvedPercent) }
    ]);

    // ---- LINE CHART ----
    const grouped = {};

    managers.forEach((m) => {
      const d = new Date(m.date);
      let key = "";

      if (dateFilter === "Last 7 Days" || dateFilter === "Last 15 Days") {
        key = format(d, "dd MMM");
      } else if (dateFilter === "This Month" || dateFilter === "Last Month") {
        const startMonth = startOfMonth(d);
        const weekOfMonth = differenceInCalendarWeeks(d, startMonth) + 1;
        const monthLabel = format(d, "MMM");
        key = `Week ${weekOfMonth} (${monthLabel})`;
      } else if (dateFilter === "This Year" || dateFilter === "Last Year") {
        key = format(d, "MMM");
      } else if (dateFilter === "All") {
        key = getYear(d).toString();
      } else {
        key = format(d, "dd MMM");
      }

      if (!grouped[key]) {
        grouped[key] = { name: key, submitted: 0, approved: 0 };
      }
      grouped[key].submitted += 1;
      if (m.report === "Done") grouped[key].approved += 1;
    });

    // ---- SORTING ----
    let finalData = Object.keys(grouped).map((key) => ({
      ...grouped[key],
    }));

    if (dateFilter === "This Month" || dateFilter === "Last Month") {
      const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      finalData.sort((a, b) => {
        const [_, weekA, monthA] = a.name.match(/Week (\d+) \((\w+)\)/);
        const [__, weekB, monthB] = b.name.match(/Week (\d+) \((\w+)\)/);
        const monthDiff = monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB);
        if (monthDiff !== 0) return monthDiff;
        return Number(weekA) - Number(weekB);
      });
    } else if (dateFilter.includes("Year")) {
      const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      finalData.sort((a, b) => monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name));
    } else if (dateFilter === "All") {
      finalData.sort((a, b) => Number(a.name) - Number(b.name));
    } else {
      finalData.sort((a, b) => new Date(a.name) - new Date(b.name));
    }

    setLineData(finalData);
    setChartVersion((v) => v + 1);
  }, [managers, dateFilter]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setPieSize({ inner: 70, outer: 132 });
        setChartHeight(300);
        setLineChartHeight(250);
      } else if (width < 1024) {
        setPieSize({ inner: 90, outer: 160 });
        setChartHeight(400);
        setLineChartHeight(300);
      } else {
        setPieSize({ inner: 110, outer: 220 });
        setChartHeight(500);
        setLineChartHeight(400);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Line Chart */}
      <div className="bg-[#f9fafb] rounded-2xl p-4 shadow flex flex-col relative">
        {!hasData && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-semibold text-sm md:text-lg">
            No record for this
          </div>
        )}
        <div className="flex flex-col w-full gap-1 mb-4 md:items-end p-2 rounded">
          <div className="flex items-center gap-2 mr-2">
            <span className="w-3 h-3 rounded-full bg-[#82ca9d]"></span>
            <span className="text-sm text-gray-700">
              Submitted report by workers
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#fcd34d]"></span>
            <span className="text-sm text-gray-700">
              Approved report by managers
            </span>
          </div>
        </div>

        <ResponsiveContainer
          key={`line-${chartVersion}`}
          width="100%"
          height={lineChartHeight}
        >
          {hasData && lineData.length === 1 ? (
            // ✅ Show BarChart if only one record
            <BarChart
              data={lineData}
              barCategoryGap="40%" // controls spacing between categories
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontWeight: "bold", fontSize: 12 }} />
              <YAxis tick={{ fontWeight: "bold", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                }}
                cursor={{ fill: "transparent" }}
              />
              <Bar
                dataKey="submitted"
                fill="#82ca9d"
                barSize={35} // reduce thickness
                radius={[6, 6, 0, 0]} // rounded top corners
              />
              <Bar
                dataKey="approved"
                fill="#fcd34d"
                barSize={35}
                radius={[6, 6, 0, 0]}
              />
            </BarChart>

          ) : (
            <AreaChart data={hasData ? lineData : []}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontWeight: "bold", fontSize: 12 }} />
              <YAxis tick={{ fontWeight: "bold", fontSize: 12 }} />
              <Tooltip />
              <Area
                dataKey="submitted"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.3}
              />
              <Area
                dataKey="approved"
                stroke="#fcd34d"
                fill="#fcd34d"
                fillOpacity={0.3}
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
        <p className="text-center text-sm mt-2 text-black">{dateFilter}</p>
      </div>

      {/* Donut Chart */}
      <div className="bg-[#f9fafb] rounded-2xl p-4 shadow flex flex-col items-center relative">
        {!hasData && (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-semibold text-sm md:text-lg">
            No record for this
          </div>
        )}
        <div className="flex flex-col w-full gap-1 mb-4 md:items-end p-2 rounded">
          <div className="flex items-center gap-2 mr-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[0] }}
            ></span>
            <span className="text-sm text-gray-700">Pending reports</span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[1] }}
            ></span>
            <span className="text-sm text-gray-700">Approved reports</span>
          </div>
        </div>

        <ResponsiveContainer
          key={`pie-${chartVersion}`}
          width="100%"
          height={chartHeight}
        >
          <PieChart>
            {hasData ? (
              <Pie
                data={pieData}
                cx="50%"
                cy="45%"
                innerRadius={pieSize.inner}
                outerRadius={pieSize.outer}
                paddingAngle={1}
                dataKey="value"
                labelLine={false}
                label={({ value, cx, cy, midAngle, innerRadius, outerRadius }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = innerRadius + (outerRadius - innerRadius) / 2;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);
                  return (
                    <text
                      x={x}
                      y={y}
                      fill="#000"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontWeight="semibold"
                    >
                      {`${value}%`}
                    </text>
                  );
                }}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                    stroke="none"
                  />
                ))}
              </Pie>
            ) : (
              <Pie
                data={[{ name: "No record", value: 100 }]}
                cx="50%"
                cy="45%"
                innerRadius={pieSize.inner}
                outerRadius={pieSize.outer}
                dataKey="value"
              >
                <Cell fill="#d1d5db" /> {/* faded grey */}
              </Pie>
            )}
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
