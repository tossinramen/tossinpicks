'use client';

import Link from 'next/link';

export default function Header() {
  return (
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
  );
}
