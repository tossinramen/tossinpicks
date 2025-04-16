'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import NbaSchedule from '@/components/NbaSchedule';

export default function SchedulePage() {
  const [activeSport, setActiveSport] = useState('NBA');

  return (
    <Header activeSport={activeSport} setActiveSport={setActiveSport}>
      <NbaSchedule />
    </Header>
  );
}
