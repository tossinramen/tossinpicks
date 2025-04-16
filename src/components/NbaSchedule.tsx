'use client';

import { useEffect, useState } from 'react';
import TeamLogo from '@/components/TeamLogo'; 

interface Game {
  id: number;
  date: string;
  season: number;
  status: string;
  home_team: { full_name: string };
  visitor_team: { full_name: string };
}

export default function NbaSchedule() {
  const [gamesByDate, setGamesByDate] = useState<Record<string, Game[]>>({});

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch('/api/schedule');
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
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8 text-center">NBA Schedule</h1>
      {Object.keys(gamesByDate).length === 0 ? (
        <p className="text-center text-gray-400">No games found or still loading...</p>
      ) : (
        Object.entries(gamesByDate).map(([date, games]) => (
          <div key={date} className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-1">{date}</h2>
            <div className="overflow-x-auto rounded-lg shadow-md">
              <table className="min-w-full bg-gray-800 text-left text-sm">
                <thead className="bg-gray-700 text-gray-300 uppercase tracking-wide text-xs">
                  <tr>
                    <th className="px-6 py-3">Matchup</th>
                    <th className="px-6 py-3">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {games.map((game) => (
                    <tr key={game.id} className="border-b border-gray-700 hover:bg-gray-700/30">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 mb-1">
                          <TeamLogo teamName={game.visitor_team.full_name} />
                          {game.visitor_team.full_name}
                        </div>
                        <div className="flex items-center gap-2">
                          <TeamLogo teamName={game.home_team.full_name} />
                          {game.home_team.full_name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        {game.home_team.full_name} Arena
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
