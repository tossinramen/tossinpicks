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
      className={`
        ${isOpen ? 'relative' : 'absolute'} 
        top-0 left-0 z-40 h-screen bg-black border-r border-gray-800 
        transition-all duration-300 ease-in-out 
        ${isOpen ? 'w-16 sm:w-20 md:w-24' : 'w-0'}
        overflow-hidden
      `}
    >
      <div
        className={`
          pt-28 flex flex-col items-center space-y-6 w-full h-full
          transition-opacity duration-200 ease-in-out
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
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
      </div>
    </aside>
  );
}
