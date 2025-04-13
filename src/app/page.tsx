'use client';

import { useState } from 'react';
import NbaSchedule from '@/components/NbaSchedule';
import Header from '@/components/Header';

const sports = [
  { name: 'NBA', icon: '🏀' },
  { name: 'NFL', icon: '🏈' },
  { name: 'LoL', icon: '🎮' },
];

export default function HomeLayout() {
  const [activeSport, setActiveSport] = useState('NBA');

  return (
    <div className="min-h-screen flex bg-gray-950 text-white">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />

        <main className="p-6 flex-1">
          {activeSport === 'NBA' && <NbaSchedule />}
          {activeSport !== 'NBA' && (
            <div className="text-center text-gray-400 text-lg mt-8">
              {activeSport} schedule coming soon...
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
