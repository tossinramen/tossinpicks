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
      className={`fixed top-0 left-0 h-full bg-black border-r border-gray-800 z-40 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } w-40 sm:w-48 md:w-56`}
    >
      <div className="pt-20 flex flex-col items-center space-y-6">
        {sports.map(({ name, icon }) => (
          <button
            key={name}
            onClick={() => setActiveSport(name)}
            className={`text-2xl focus:outline-none transition-all duration-150 ${
              activeSport === name ? 'text-red-500 font-bold' : 'text-white hover:text-red-400'
            }`}
          >
            <div>{icon}</div>
            <div className="text-xs mt-1">{name}</div>
          </button>
        ))}
      </div>
    </aside>
  );
}
