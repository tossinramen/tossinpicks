'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMenu } from 'react-icons/fi';

interface HeaderProps {
  onMenuClick: () => void;
  isSidebarOpen: boolean;
}

export default function Header({ onMenuClick, isSidebarOpen }: HeaderProps) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Odds', href: '/odds' },
    { name: 'Schedule', href: '/schedule' },
    { name: 'Predictions', href: '/predictions' },
  ];

  return (
    <header className="bg-black px-6 py-4 border-b border-gray-800 shadow-sm relative z-50">
      <div className="flex items-center gap-8 flex-wrap">
        {/* Menu Button */}
        <button
          onClick={onMenuClick}
          className={`text-2xl transition-colors duration-150 ${
            isSidebarOpen ? 'text-red-400' : 'text-white hover:text-red-400'
          }`}
        >
          <FiMenu />
        </button>

        {/* Logo + Text */}
        <img src="/logo-icon.png" alt="tossinpicks logo" className="h-10 w-auto" />
        <div>
          <h1 className="text-xl font-bold lowercase text-white">tossinpicks</h1>
          <p className="text-sm text-gray-400">Sports Predictions & Analysis</p>
        </div>

        {/* Navigation links (stay on the left) */}
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
  );
}
