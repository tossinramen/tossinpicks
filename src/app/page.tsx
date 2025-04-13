'use client';

import Link from 'next/link';
import { useState } from 'react';

const sports = [
  { name: 'NBA', icon: '🏀' },
  { name: 'NFL', icon: '🏈' },
  { name: 'LoL', icon: '🎮' },
];

const ScheduleContent = ({ sport }: { sport: string }) => {
  if (sport === 'NBA') {
    return <div className="text-white">NBA schedule content goes here</div>;
  } else if (sport === 'NFL') {
    return <div className="text-white">NFL schedule coming soon!</div>;
  } else if (sport === 'LoL') {
    return <div className="text-white">League of Legends schedule coming soon!</div>;
  }
  return null;
};

export default function HomeLayout() {
  const [activeSport, setActiveSport] = useState('NBA');

  const handleSportClick = (sport: string) => {
    setActiveSport(sport);
  };

  return (
    <div className="min-h-screen flex bg-gray-950 text-white">
      {/* Sidebar */}
      <aside className="w-20 bg-black flex flex-col items-center pt-6 space-y-6 border-r border-gray-800">
        {sports.map(({ name, icon }) => (
          <button
            key={name}
            onClick={() => handleSportClick(name)}
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
        {/* Top Nav */}
        <header className="bg-black px-6 py-4 flex items-center justify-between border-b border-gray-800 shadow-sm">
          <div className="flex items-center space-x-3">
            <img src="/logo-icon.png" alt="tossinpicks logo" className="h-10 w-auto" />
            <h1 className="text-xl font-bold lowercase text-white">tossinpicks</h1>
            <p className="text-sm text-gray-400">Sports Predictions & Analysis</p>
          </div>
          <nav className="flex space-x-6 text-sm font-medium">
            <Link href="/odds" className="hover:text-red-400 transition-colors">Odds</Link>
            <Link href="/schedule" className="hover:text-red-400 transition-colors">Schedule</Link>
            <Link href="/picks" className="hover:text-red-400 transition-colors">Picks</Link>
          </nav>
        </header>

        <main className="p-6 flex-1">
          <ScheduleContent sport={activeSport} />
        </main>
      </div>
    </div>
  );
}