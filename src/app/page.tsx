'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getOdds } from './api/getOdds';

export default function Home() {
  const [odds, setOdds] = useState<any>(null);

  const handleCheckOdds = async () => {
    try {
      const data = await getOdds();
      console.log('📊 Odds:', data);
      setOdds(data); 
    } catch (err) {
      console.error('Error fetching odds:', err);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">🏀 TossinPicks</h1>
      <p className="text-lg text-gray-300">NBA schedule and prediction app</p>
      <Link href="/schedule" className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
        View NBA Schedule
      </Link>

      <button
        onClick={handleCheckOdds}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        Check Odds
      </button>

      {odds && (
        <div className="mt-6 text-sm max-w-lg">
          <pre>{JSON.stringify(odds, null, 2)}</pre>
        </div>
      )}
    </main>
  );
}
