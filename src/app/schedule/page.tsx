'use client';

import { useEffect, useState } from 'react';

type TeamInfo = { name: string };
type Game = {
  date: { start: string };
  teams: { home: TeamInfo; visitors: TeamInfo };
};

export default function SchedulePage() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      const today = new Date().toISOString().split('T')[0]; // e.g., "2025-04-13"
      const url = `https://api-nba-v1.p.rapidapi.com/games?season=2023&league=standard&date=${today}`;

      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
            'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY!,
          },
        });

        const data = await res.json();
        setGames(data.response || []);
      } catch (error) {
        console.error('Failed to fetch NBA games:', error);
      }
    };

    fetchGames();
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">🏀 NBA Schedule</h1>

      {games.length === 0 && (
        <p className="text-center text-gray-400">No games found or still loading...</p>
      )}

      {games.map((game, idx) => (
        <div key={idx} className="mb-4 p-4 rounded-lg bg-gray-800 shadow">
          <h2 className="text-xl font-semibold mb-1">
            {game.teams.visitors.name} @ {game.teams.home.name}
          </h2>
          <p className="text-sm text-gray-400">
            {new Date(game.date.start).toLocaleString()}
          </p>
        </div>
      ))}
    </main>
  );
}
