'use client';

import { useEffect, useState } from 'react';

// Define the structure of a game returned by the API
interface Game {
  id: number;
  date: string;
  season: number;
  status: string;
  home_team: { full_name: string };
  visitor_team: { full_name: string };
}

export default function SchedulePage() {
  const [gamesByDate, setGamesByDate] = useState<Record<string, Game[]>>({});

  useEffect(() => {
    const fetchGames = async () => {
      const apiKey = process.env.NEXT_PUBLIC_BDL_API_KEY;
      const today = new Date();
      const startDate = today.toISOString().split('T')[0];
      const endDate = new Date(today);
      endDate.setDate(today.getDate() + 7); // next 7 days
      const endDateStr = endDate.toISOString().split('T')[0];

      try {
        const res = await fetch('/api/schedule');

        if (!res.ok) throw new Error(`API error: ${res.status}`);

        const data = await res.json();
        const grouped: Record<string, Game[]> = {};

        (data.data || []).forEach((game: Game) => {
          const dateKey = new Date(game.date).toISOString().split('T')[0];
          if (!grouped[dateKey]) grouped[dateKey] = [];
          grouped[dateKey].push(game);
        });

        setGamesByDate(grouped);
      } catch (err) {
        console.error('Failed to load NBA schedule:', err);
      }
    };

    fetchGames();
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">🏀 NBA Schedule</h1>

      {Object.keys(gamesByDate).length === 0 ? (
        <p className="text-center text-gray-400">No games found or still loading...</p>
      ) : (
        Object.entries(gamesByDate).map(([date, games]) => (
          <div key={date} className="mb-6 p-4 rounded-xl bg-gray-800 shadow">
            <h2 className="text-2xl font-semibold mb-2">{date}</h2>
            <ul className="list-disc list-inside space-y-1">
              {games.map((game) => (
                <li key={game.id}>
                  {game.visitor_team.full_name} @ {game.home_team.full_name} — {game.status}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </main>
  );
}