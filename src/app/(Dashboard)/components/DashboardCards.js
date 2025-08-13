import { GrLineChart } from "react-icons/gr";

// components/DashboardCards.js
const stats = [
  { title: "Total Clients", value: 120, percent: 69 },
  { title: "Total Managers", value: 25, percent: 69 },
  { title: "Total Workers", value: 250, percent: 69 },
  { title: "Total Report Submitted", value: 44, percent: 69, today: true },
  { title: "Total Approval", value: 12, percent: 69, today: true },
];

export default function DashboardCards() {
   return (
    <>

      <div>
        <div>
             <select
             
              className="text-sm px-3 py-2 bg-[#f8faff] border border-gray-300 rounded-3xl w-30 text-[#3359a3] font-semibold focus:outline-none"
            >
              <option value="All">Total</option>
              <option value="Noida">Null</option>
              <option value="Delhi">Null</option>
            </select>
        </div>

        <div>


          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 px-6 py-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="relative bg-white p-4 rounded-3xl shadow flex flex-col justify-center items-center"
              >
                {/* Today Label (only for items with 'today: true') */}
                {stat.today && (
                  <div className="mb-3">

                    <div className="absolute top-0 left-0 bg-[#3359a3] text-white text-xs text-center px-2 py-1 w-20 rounded-tl-full rounded-bl-md">
                      Today
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
