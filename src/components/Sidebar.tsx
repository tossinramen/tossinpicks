'use client';

import React from 'react';

interface SidebarProps {
  activeSport: string;
  setActiveSport: (sport: string) => void;
}

const sports = [
  { name: 'NBA', icon: '🏀' },
  { name: 'NFL', icon: '🏈' },
  { name: 'LoL', icon: '🎮' },
];

export default function Sidebar({ activeSport, setActiveSport }: SidebarProps) {
  return (
    <aside className="w-20 bg-black flex flex-col items-center pt-6 space-y-6 border-r border-gray-800">
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
    </aside>
  );
}