'use client';

import { useEffect, useState } from 'react';
import React from 'react';
import {
  ATL, BOS, BKN, CHA, CHI, CLE, DAL, DEN, DET,
  GSW, HOU, IND, LAC, LAL, MEM, MIA, MIL, MIN, NOP,
  NYK, OKC, ORL, PHI, PHX, POR, SAC, SAS, TOR, UTA, WAS
} from 'react-nba-logos';
import Header from '../../components/Header';

interface Game {
  id: number;
  date: string;
  season: number;
  status: string;
  home_team: { full_name: string };
  visitor_team: { full_name: string };
}

const teamComponents: Record<string, React.ElementType> = {
  "Atlanta Hawks": ATL,
  "Boston Celtics": BOS,
  "Brooklyn Nets": BKN,
  "Charlotte Hornets": CHA,
  "Chicago Bulls": CHI,
  "Cleveland Cavaliers": CLE,
  "Dallas Mavericks": DAL,
  "Denver Nuggets": DEN,
  "Detroit Pistons": DET,
  "Golden State Warriors": GSW,
  "Houston Rockets": HOU,
  "Indiana Pacers": IND,
  "LA Clippers": LAC,
  "Los Angeles Lakers": LAL,
  "Memphis Grizzlies": MEM,
  "Miami Heat": MIA,
  "Milwaukee Bucks": MIL,
  "Minnesota Timberwolves": MIN,
  "New Orleans Pelicans": NOP,
  "New York Knicks": NYK,
  "Oklahoma City Thunder": OKC,
  "Orlando Magic": ORL,
  "Philadelphia 76ers": PHI,
  "Phoenix Suns": PHX,
  "Portland Trail Blazers": POR,
  "Sacramento Kings": SAC,
  "San Antonio Spurs": SAS,
  "Toronto Raptors": TOR,
  "Utah Jazz": UTA,
  "Washington Wizards": WAS,
};

export default function SchedulePage() {
  const [gamesByDate, setGamesByDate] = useState<Record<string, Game[]>>({});

  useEffect(() => {
    const fetchGames = async () => {
      const today = new Date();
      const startDate = today.toISOString().split('T')[0];
      const endDate = new Date(today);
      endDate.setDate(today.getDate() + 7);
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
      <Header />
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
                    <th className="px-6 py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {games.map((game) => {
                    const utcDate = new Date(game.date);
                    const estDate = new Date(utcDate.toLocaleString('en-US', { timeZone: 'America/New_York' }));
                    const VisitorLogo = teamComponents[game.visitor_team.full_name];
                    const HomeLogo = teamComponents[game.home_team.full_name];

                    return (
                      <tr key={game.id} className="border-b border-gray-700 hover:bg-gray-700/30">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 mb-1">
                            {VisitorLogo && <VisitorLogo size={30} />} {game.visitor_team.full_name}
                          </div>
                          <div className="flex items-center gap-2">
                            {HomeLogo && <HomeLogo size={30} />} {game.home_team.full_name}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-400">{game.home_team.full_name} Arena</td>
                        <td className="px-6 py-4 text-gray-400">{estDate.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</td>
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
