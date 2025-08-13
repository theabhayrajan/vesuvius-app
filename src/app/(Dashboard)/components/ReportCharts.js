"use client";

import {
  AreaChart,
  Area,
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

export default function ReportCharts() {
  // ✅ Store chart data in state
  const [lineData, setLineData] = useState([
    { name: "Mon", submitted: 20, approved: 1 },
    { name: "Tue", submitted: 55, approved: 45 },
    { name: "Wed", submitted: 35, approved: 3 },
    { name: "Thu", submitted: 30, approved: 25 },
    { name: "Fri", submitted: 40, approved: 35 },
    { name: "Sat", submitted: 30, approved: 45 },
    { name: "Sun", submitted: 25, approved: 2 }
  ]);
  const [pieData, setPieData] = useState([]);
  const COLORS = ["#83dfa6", "#81cafc"];

  const [pieSize, setPieSize] = useState({ inner: 110, outer: 220 });
  const [chartHeight, setChartHeight] = useState(450);

  // ✅ Recalculate pie data whenever line data changes
  useEffect(() => {
    const totalSubmitted = lineData.reduce((acc, cur) => acc + cur.submitted, 0);
    const totalApproved = lineData.reduce((acc, cur) => acc + cur.approved, 0);
    const pending = totalSubmitted - totalApproved;

    const pendingPercent = ((pending / totalSubmitted) * 100).toFixed(1);
    const approvedPercent = ((totalApproved / totalSubmitted) * 100).toFixed(1);

    setPieData([
      { name: "Pending reports", value: Number(pendingPercent) },
      { name: "Approved reports", value: Number(approvedPercent) }
    ]);
  }, [lineData]);

  // ✅ Handle responsive sizes
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setPieSize({ inner: 70, outer: 135 });
        setChartHeight(300);
      } else if (width < 1024) {
        setPieSize({ inner: 90, outer: 160 });
        setChartHeight(400);
      } else {
        setPieSize({ inner: 110, outer: 220 });
        setChartHeight(450);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {/* Line Chart */}
      <div className="bg-[#f9fafb] rounded-2xl p-4 shadow flex flex-col">
        <div className="flex flex-col w-full gap-1 mb-4 md:items-end p-2 rounded">
          <div className="flex items-center gap-2 mr-2">
            <span className="w-3 h-3 rounded-full bg-[#82ca9d]"></span>
            <span className="text-sm text-gray-700">Submitted report by workers</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#fcd34d]"></span>
            <span className="text-sm text-gray-700">Approved report by managers</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontWeight: "bold", fontSize: 12 }} />
            <YAxis tick={{ fontWeight: "bold", fontSize: 12 }} />
            <Tooltip />
            <Area dataKey="submitted" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
            <Area dataKey="approved" stroke="#fcd34d" fill="#fcd34d" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
        <p className="text-center text-sm mt-2 text-black">Last 7 days</p>
      </div>

      {/* Donut Chart */}
      <div className="bg-[#f9fafb] rounded-2xl p-4 shadow flex flex-col">
        <div className="flex flex-col w-full gap-1 mb-4 md:items-end p-2 rounded">
          <div className="flex items-center gap-2 mr-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[0] }}></span>
            <span className="text-sm text-gray-700">Pending reports</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[1] }}></span>
            <span className="text-sm text-gray-700">Approved reports</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={chartHeight}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
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
                <Cell key={`cell-${index}`} fill={COLORS[index]} stroke="none" />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
