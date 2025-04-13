'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMenu } from 'react-icons/fi';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Odds', href: '/odds' },
    { name: 'Schedule', href: '/schedule' },
    { name: 'Picks', href: '/picks' },
  ];

  return (
    <header className="bg-black px-6 py-4 flex items-center justify-between border-b border-gray-800 shadow-sm relative z-50">
      <div className="flex items-center gap-6">
        <button onClick={onMenuClick} className="text-white text-2xl block">
          <FiMenu />
        </button>
        <img src="/logo-icon.png" alt="tossinpicks logo" className="h-10 w-auto" />
        <div>
          <h1 className="text-xl font-bold lowercase text-white">tossinpicks</h1>
          <p className="text-sm text-gray-400">Sports Predictions & Analysis</p>
        </div>

        {/* Navigation - move left next to logo */}
        <nav className="hidden md:flex gap-10 ml-10 text-sm font-semibold uppercase tracking-wide">
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
  );
}
