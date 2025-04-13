'use client';

import React from 'react';

interface SidebarProps {
  activeSport: string;
  setActiveSport: (sport: string) => void;
  isOpen: boolean;
}

const sports = [
  { name: 'NBA', icon: '🏀' },
  { name: 'NFL', icon: '🏈' },
  { name: 'LoL', icon: '🎮' },
];

export default function Sidebar({ activeSport, setActiveSport, isOpen }: SidebarProps) {
  return (
    <aside
      className={`h-full bg-black border-r border-gray-800 overflow-hidden transition-all duration-300 ease-in-out
      ${isOpen ? 'w-16 sm:w-20 md:w-24' : 'w-0'}`}
    >
      <div className="pt-28 flex flex-col items-center space-y-6">
        {sports.map(({ name, icon }) => (
          <button
            key={name}
            onClick={() => setActiveSport(name)}
            className={`text-xl sm:text-2xl focus:outline-none transition-all duration-150 ${
              activeSport === name ? 'text-red-500 font-bold' : 'text-white hover:text-red-400'
            }`}
          >
            <div>{icon}</div>
            <div className="text-[10px] sm:text-xs mt-1">{name}</div>
          </button>
        ))}
      </div>
    </aside>
  );
}
