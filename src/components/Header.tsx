'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const navItems = [
    { name: 'ODDS', href: '/odds' },
    { name: 'SCHEDULE', href: '/schedule' },
    { name: 'PICKS', href: '/picks' },
  ];

  return (
    <header className="bg-black px-6 py-5 flex items-center justify-between border-b border-gray-800 shadow-sm">
      <div className="flex items-center space-x-10">
        {/* Logo + Name */}
        <Link href="/" className="flex items-center space-x-3">
          <img src="/logo-icon.png" alt="tossinpicks logo" className="h-10 w-auto" />
          <div>
            <h1 className="text-xl font-bold lowercase text-white">tossinpicks</h1>
            <p className="text-sm text-gray-400">Sports Predictions & Analysis</p>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex space-x-10 text-base font-semibold tracking-wider uppercase">
          {navItems.map(({ name, href }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={name}
                href={href}
                className={`relative pb-1 transition-colors ${
                  isActive ? 'text-red-400' : 'text-white hover:text-red-400'
                }`}
              >
                {name}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4/5 h-[3px] bg-red-400 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
