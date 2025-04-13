'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import NbaSchedule from '@/components/NbaSchedule';

export default function HomeLayout() {
  const [activeSport, setActiveSport] = useState('NBA');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleMenuClick = () => {
    setIsSidebarOpen(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {/* Sidebar */}
      <Sidebar
        activeSport={activeSport}
        setActiveSport={setActiveSport}
        isOpen={isSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={handleMenuClick} />

        <main className="p-6 mt-4">
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
