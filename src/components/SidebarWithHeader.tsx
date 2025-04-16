'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMenu } from 'react-icons/fi';

interface SidebarWithHeaderProps {
  activeSport: string;
  setActiveSport: (sport: string) => void;
}

const sports = [
  { name: 'NBA', icon: '🏀' },
  { name: 'NFL', icon: '🏈' },
  { name: 'LoL', icon: '🎮' },
];

const navItems = [
  { name: 'Odds', href: '/odds' },
  { name: 'Schedule', href: '/schedule' },
  { name: 'Predictions', href: '/predictions' },
];

export default function SidebarWithHeader({
  activeSport,
  setActiveSport,
}: SidebarWithHeaderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`
          h-screen w-16 sm:w-20 md:w-24 bg-black border-r border-gray-800 
          transition-all duration-300 ease-in-out 
          flex flex-col items-center pt-28 space-y-6
          ${!isSidebarOpen && 'opacity-0 pointer-events-none'}
          sticky top-0
        `}
      >
        {sports.map(({ name, icon }) => (
          <button
            key={name}
            onClick={() => setActiveSport(name)}
            className={`text-xl sm:text-2xl w-full flex flex-col items-center transition-all duration-150
              ${
                activeSport === name
                  ? 'text-red-400 font-bold border-b-2 border-red-400 pb-1'
                  : 'text-white hover:text-red-400'
              }
            `}
          >
            <div>{icon}</div>
            <div className="text-[10px] sm:text-xs mt-1">{name}</div>
          </button>
        ))}
      </aside>

      {/* Header */}
      <header className="bg-black px-6 py-4 border-b border-gray-800 shadow-sm sticky top-0 z-50 w-full">
        <div className="flex items-center gap-8 flex-wrap">
          {/* Menu Button */}
          <button
            onClick={toggleSidebar}
            className={`text-2xl transition-colors duration-150 ${
              isSidebarOpen ? 'text-red-400' : 'text-white hover:text-red-400'
            }`}
          >
            <FiMenu />
          </button>

          {/* Logo */}
          <img src="/logo-icon.png" alt="tossinpicks logo" className="h-10 w-auto" />
          <div>
            <h1 className="text-xl font-bold lowercase text-white">tossinpicks</h1>
            <p className="text-sm text-gray-400">Sports Predictions & Analysis</p>
          </div>

          {/* Nav links */}
          <nav className="flex gap-6 text-sm font-semibold uppercase tracking-wide ml-10 flex-wrap">
            {navItems.map(({ name, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={name}
                  href={href}
                  className={`relative transition-colors ${
                    isActive ? 'text-red-400' : 'text-white hover:text-red-400'
                  }`}
                >
                  {name}
                  {isActive && (
                    <span className="absolute left-0 -bottom-1 w-full h-1 bg-red-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
    </>
  );
}
