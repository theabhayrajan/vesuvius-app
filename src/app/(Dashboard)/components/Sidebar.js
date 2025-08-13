'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', path: '/' },
{ label: 'Client', path: '/client' },

  { label: 'Worker', path: '/worker' },
  { label: 'Manager', path: '/manager' },
  { label: 'Alerts', path: '/alerts' },
  { label: 'Access & Security', path: '/access-security' },
  { label: 'Settings', path: '/settings' },
];

export default function Sidebar({ isMobileOpen, setIsMobileOpen }) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 h-screen bg-white shadow-lg px-6 py-8 space-y-4">
        <div>
          <Link href="/" className="inline-block">
            <img
              src="/images/logo.png"
              alt="User"
              className="w-30 h-30 bg-transparent"
            />
          </Link>
        </div>

        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.path}
            className={`block text-left w-full py-2 px-3 rounded-md text-base font-bold ${
              pathname === item.path
                ? 'bg-[#ff7b25] text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Mobile Sidebar Modal */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsMobileOpen(false)}
          />

          {/* Sidebar Drawer */}
          <div className="relative w-64 bg-white h-full shadow-lg z-50 px-6 py-8 space-y-4">
            {/* Close button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-4 right-4"
            >
              <X size={24} />
            </button>

            <div>
              <Link href="/" onClick={() => setIsMobileOpen(false)}>
                <img
                  src="/images/logo.png"
                  alt="User"
                  className="w-30 h-30 bg-transparent"
                />
              </Link>
            </div>

            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.path}
                onClick={() => setIsMobileOpen(false)}
                className={`block text-left w-full py-2 px-3 rounded-md text-sm font-medium ${
                  pathname === item.path
                    ? 'bg-[#ff7b25] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
