'use client';

import { useEffect, useState } from 'react';

type Game = {
  id: number;
  date: string;
  home_team: { full_name: string };
  visitor_team: { full_name: string };
};

export default function SchedulePage() {
  const [gamesByDate, setGamesByDate] = useState<Record<string, Game[]>>({});

  useEffect(() => {
    const fetchGames = async () => {
      const today = new Date();
      const startDate = today.toISOString().split('T')[0];

      const res = await fetch(
        `https://www.balldontlie.io/api/v1/games?start_date=${startDate}&per_page=100`
      );

      const data = await res.json();

      const grouped: Record<string, Game[]> = {};

      (data.data || []).forEach((game: Game) => {
        const dateKey = new Date(game.date).toISOString().split('T')[0];
        if (!grouped[dateKey]) grouped[dateKey] = [];
        grouped[dateKey].push(game);
      });

      setGamesByDate(grouped);
    };

    fetchGames();
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">🏀 NBA Schedule</h1>

      {Object.keys(gamesByDate).length === 0 && (
        <p className="text-center text-gray-400">No games found or still loading...</p>
      )}

      {Object.entries(gamesByDate).map(([date, games]) => (
        <div key={date} className="mb-6 p-4 rounded-xl bg-gray-800 shadow">
          <h2 className="text-2xl font-semibold mb-2">{date}</h2>
          <ul className="list-disc list-inside space-y-1">
            {games.map((game) => (
              <li key={game.id}>
                {game.visitor_team.full_name} @ {game.home_team.full_name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
}
