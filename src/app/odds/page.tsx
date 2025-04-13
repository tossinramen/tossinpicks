'use client';

import { useEffect, useState } from 'react';

type OddsGame = {
  home_team: string;
  away_team: string;
  moneylines: {
    home: Record<string, string>;
    away: Record<string, string>;
  };
  totals: Record<string, string>;
};

const sportsbooks = ['fanduel', 'draftkings', 'bet_rivers_ny', 'bet365'];

export default function OddsPage() {
  const [odds, setOdds] = useState<OddsGame[]>([]);

  useEffect(() => {
    const fetchOdds = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get-odds`);
        const data = await res.json();
        setOdds(data.games || []);
      } catch (err) {
        console.error('Failed to fetch odds:', err);
      }
    };

    fetchOdds();
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Check Odds</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse bg-gray-800 text-sm">
          <thead className="bg-gray-700 text-gray-300 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">Matchup</th>
              <th className="px-4 py-3">Location</th>
              {sportsbooks.map((book) => (
                <th key={book} className="px-4 py-3 text-center">
                  {book}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {odds.map((game, index) => (
              <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/30">
                <td className="px-4 py-3">
                  {game.away_team} @ {game.home_team}
                </td>
                <td className="px-4 py-3 text-gray-400">{game.home_team} Arena</td>
                {sportsbooks.map((book) => {
                  const homeOdd = game.moneylines.home?.[book] ?? '-';
                  const awayOdd = game.moneylines.away?.[book] ?? '-';
                  const total = game.totals?.[book];

                  return (
                    <td key={book} className="px-4 py-3 text-center text-gray-200">
                      <div>🏠 {homeOdd}</div>
                      <div>🛫 {awayOdd}</div>
                      {total && <div className="text-xs text-gray-400">O/U: {total}</div>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
