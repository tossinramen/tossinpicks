'use client';

import { useEffect, useState } from 'react';
import React from 'react';
import {
    ATL, // Atlanta Hawks
    BOS, // Boston Celtics
    BKN, // Brooklyn Nets
    CHA, // Charlotte Hornets
    CHI, // Chicago Bulls
    CLE, // Cleveland Cavaliers
    DAL, // Dallas Mavericks
    DEN, // Denver Nuggets
    DET, // Detroit Pistons
    GSW, // Golden State Warriors
    HOU, // Houston Rockets
    IND, // Indiana Pacers
    LAC, // LA Clippers
    LAL, // Los Angeles Lakers
    MEM, // Memphis Grizzlies
    MIA, // Miami Heat
    MIL, // Milwaukee Bucks
    MIN, // Minnesota Timberwolves
    NOP, // New Orleans Pelicans
    NYK, // New York Knicks
    OKC, // Oklahoma City Thunder
    ORL, // Orlando Magic
    PHI, // Philadelphia 76ers
    PHX, // Phoenix Suns
    POR, // Portland Trail Blazers
    SAC, // Sacramento Kings
    SAS, // San Antonio Spurs
    TOR, // Toronto Raptors
    UTA, // Utah Jazz
    WAS  // Washington Wizards
  } from 'react-nba-logos';
  
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
  <h1 className="text-4xl font-bold mb-8 text-center">🏀 NBA Schedule</h1>

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
                <th className="px-6 py-3">Status / Time</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game) => {
                const localTime = new Date(game.date).toLocaleTimeString([], {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                });

                return (
                  <tr key={game.id} className="border-b border-gray-700 hover:bg-gray-700/30">
                    <td className="px-6 py-4">
                      <span className="font-medium">{game.visitor_team.full_name}</span> @{' '}
                      <span className="font-medium">{game.home_team.full_name}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{game.status || localTime}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    ))
  )}
</main>
  );
}