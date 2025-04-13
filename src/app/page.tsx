'use client';

import { useState } from 'react';
import NbaSchedule from '@/components/NbaSchedule';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

export default function HomeLayout() {
  const [activeSport, setActiveSport] = useState('NBA');

  return (
    <div className="min-h-screen flex bg-gray-950 text-white">
      {/* Sidebar as component */}
      <Sidebar activeSport={activeSport} setActiveSport={setActiveSport} />

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
