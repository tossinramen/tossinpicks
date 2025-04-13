'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import NbaSchedule from '@/components/NbaSchedule';

export default function SchedulePage() {
  const [activeSport, setActiveSport] = useState('NBA');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleMenuClick = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-white">
      <Sidebar activeSport={activeSport} setActiveSport={setActiveSport} isOpen={isSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <Header onMenuClick={handleMenuClick} />
        <main className="p-8">
          <NbaSchedule />
        </main>
      </div>
    </div>
  );
}
