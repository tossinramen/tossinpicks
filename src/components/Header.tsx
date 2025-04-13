'use client';

import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { FiMenu } from 'react-icons/fi';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-black px-6 py-4 flex items-center justify-between border-b border-gray-800 shadow-sm relative z-50">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="text-white text-2xl block">
            <FiMenu />
        </button>
        <img src="/logo-icon.png" alt="tossinpicks logo" className="h-10 w-auto" />
        <div>
          <h1 className="text-xl font-bold lowercase text-white">tossinpicks</h1>
          <p className="text-sm text-gray-400">Sports Predictions & Analysis</p>
        </div>
      </div>
      <nav className="hidden md:flex gap-10 text-white text-sm font-semibold uppercase tracking-wide">
        <Link href="/odds" className="hover:text-red-400">Odds</Link>
        <Link href="/schedule" className="hover:text-red-400">Schedule</Link>
        <Link href="/picks" className="hover:text-red-400">Picks</Link>
      </nav>
    </header>
  );
}
