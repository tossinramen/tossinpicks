'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  activeSport: string;
  setActiveSport: (sport: string) => void;
  children: React.ReactNode;
}

const navItems = [
  { name: 'Odds', href: '/odds' },
  { name: 'Schedule', href: '/schedule' },
  { name: 'Predictions', href: '/predictions' },
];

export default function Header({
  activeSport,
  setActiveSport,
  children,
}: HeaderProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-black px-6 py-4 border-b border-gray-800 shadow-sm sticky top-0 z-50 w-full">
        <div className="flex items-center gap-8 flex-wrap">
          {/* Logo and Text */}
          <img src="/logo-icon.png" alt="tossinpicks logo" className="h-10 w-auto" />
          <div>
            <h1 className="text-xl font-bold lowercase text-white">tossinpicks</h1>
            <p className="text-sm text-gray-400">Sports Predictions & Analysis</p>
          </div>

          {/* Nav */}
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

      {/* Main content area */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
