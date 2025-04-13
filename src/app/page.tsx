'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  ATL, BOS, BKN, CHA, CHI, CLE, DAL, DEN, DET,
  GSW, HOU, IND, LAC, LAL, MEM, MIA, MIL, MIN, NOP,
  NYK, OKC, ORL, PHI, PHX, POR, SAC, SAS, TOR, UTA, WAS
} from 'react-nba-logos';

const sports = [
  { name: 'NBA', icon: '🏀' },
  { name: 'NFL', icon: '🏈' },
  { name: 'LoL', icon: '🎮' },
];

const teamComponents: Record<string, React.ElementType> = {
  "Atlanta Hawks": ATL, "Boston Celtics": BOS, "Brooklyn Nets": BKN, "Charlotte Hornets": CHA,
  "Chicago Bulls": CHI, "Cleveland Cavaliers": CLE, "Dallas Mavericks": DAL, "Denver Nuggets": DEN,
  "Detroit Pistons": DET, "Golden State Warriors": GSW, "Houston Rockets": HOU, "Indiana Pacers": IND,
  "LA Clippers": LAC, "Los Angeles Lakers": LAL, "Memphis Grizzlies": MEM, "Miami Heat": MIA,
  "Milwaukee Bucks": MIL, "Minnesota Timberwolves": MIN, "New Orleans Pelicans": NOP,
  "New York Knicks": NYK, "Oklahoma City Thunder": OKC, "Orlando Magic": ORL, "Philadelphia 76ers": PHI,
  "Phoenix Suns": PHX, "Portland Trail Blazers": POR, "Sacramento Kings": SAC,
  "San Antonio Spurs": SAS, "Toronto Raptors": TOR, "Utah Jazz": UTA, "Washington Wizards": WAS
};

interface Game {
  id: number;
  date: string;
  season: number;
  status: string;
  home_team: { full_name: string };
  visitor_team: { full_name: string };
}

function ScheduleContent() {
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
    <div>
      {Object.keys(gamesByDate).length === 0 ? (
        <p className="text-center text-gray-400">Loading NBA schedule...</p>
      ) : (
        Object.entries(gamesByDate).map(([date, games]) => (
          <div key={date} className="mb-10">
            <h2 className="text-xl font-semibold mb-4 border-b border-gray-700 pb-1">{date}</h2>
            <div className="overflow-x-auto rounded-lg shadow-md">
              <table className="min-w-full bg-gray-800 text-left text-sm">
                <thead className="bg-gray-700 text-gray-300 uppercase tracking-wide text-xs">
                  <tr>
                    <th className="px-6 py-3">Matchup</th>
                    <th className="px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {games.map((game) => {
                    const VisitorLogo = teamComponents[game.visitor_team.full_name];
                    const HomeLogo = teamComponents[game.home_team.full_name];
                    return (
                      <tr key={game.id} className="border-b border-gray-700 hover:bg-gray-700/30">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 mb-1">
                            {VisitorLogo && <VisitorLogo size={24} />} {game.visitor_team.full_name}
                          </div>
                          <div className="flex items-center gap-2">
                            {HomeLogo && <HomeLogo size={24} />} {game.home_team.full_name}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-400">{game.status}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default function HomeLayout() {
  const [activeSport, setActiveSport] = useState('NBA');

  return (
    <div className="min-h-screen flex bg-gray-950 text-white">
      {/* Sidebar */}
      <aside className="w-20 bg-black flex flex-col items-center pt-6 space-y-6 border-r border-gray-800">
        {sports.map(({ name, icon }) => (
          <button
            key={name}
            onClick={() => setActiveSport(name)}
            className={`text-2xl focus:outline-none transition-all duration-150 ${
              activeSport === name ? 'text-red-500 font-bold' : 'text-white hover:text-red-400'
            }`}
          >
            <div>{icon}</div>
            <div className="text-xs mt-1">{name}</div>
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Nav */}
        <header className="bg-black px-6 py-4 flex items-center justify-between border-b border-gray-800 shadow-sm">
          <div className="flex items-center space-x-3">
            <img src="/logo-icon.png" alt="tossinpicks logo" className="h-10 w-auto" />
            <h1 className="text-xl font-bold lowercase text-white">tossinpicks</h1>
            <p className="text-sm text-gray-400">Sports Predictions & Analysis</p>
          </div>
          <nav className="flex space-x-6 text-sm font-medium">
            <Link href="/odds" className="hover:text-red-400 transition-colors">Odds</Link>
            <Link href="/schedule" className="hover:text-red-400 transition-colors">Schedule</Link>
            <Link href="/picks" className="hover:text-red-400 transition-colors">Picks</Link>
          </nav>
        </header>

        <main className="p-6 flex-1">
          {activeSport === 'NBA' && <ScheduleContent />}
          {activeSport !== 'NBA' && <p className="text-gray-400">{activeSport} schedule coming soon...</p>}
        </main>
      </div>
    </div>
  );
}
