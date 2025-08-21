'use client';

import { Menu, Search } from 'lucide-react';
import { IoNotificationsCircleOutline } from "react-icons/io5";

export default function Navbar({ onHamburgerClick }) {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center bg-white px-6 py-3 ">

      {/* Vesuvius Logo + Text Section */}
      <div className="-translate-y-5 md:translate-y-0 flex items-center gap-3 bg-[#f3f5f9] px-4 rounded-2xl w-full md:w-full lg:w-auto shadow">

        <img
          src="/images/logo.png"
          alt="User"
          className="w-10 h-10 rounded-full"
        />
        <div className="text-lg font-semibold">vesuvius india pvt ltd</div>
      </div>

      {/* Right Side Controls: Hamburger, Search, Bell, Avatar */}
      <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">

        {/* Hamburger only visible on mobile */}
        <button
          onClick={onHamburgerClick}
          className="md:hidden p-1 rounded hover:bg-gray-100"
        >
          <Menu size={24} />
        </button>

        {/* Search bar */}
        <div className="relative w-full md:w-[400px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-600" size={18} />
          <input
            type="text"
            placeholder="Search...."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow"
          />
        </div>

        {/* Notification + Avatar */}
        <button className="relative text-xl hover:cursor-pointer"><IoNotificationsCircleOutline size={35} /></button>
        <img
          src="/images/profile-logo.png"
          alt="User"
          className="w-15 h-15 rounded-full hover:cursor-pointer"
        />
      </div>
    </div>
  );
}
