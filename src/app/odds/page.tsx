'use client';

import { useEffect, useState } from 'react';

interface GameOdds {
  home_team: string;
  away_team: string;
  moneylines: {
    home: Record<string, string>;
    away: Record<string, string>;
  };
  totals: Record<string, string>;
}

export default function OddsPage() {
  const [odds, setOdds] = useState<GameOdds[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOdds = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get-odds`);
        if (!res.ok) throw new Error('Failed to fetch odds');
        const data = await res.json();
        setOdds(data.games);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOdds();
  }, []);

  return (
    <main className="p-8 text-white bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Check Odds</h1>
      {loading ? (
        <p>Loading odds...</p>
      ) : (
        <div className="space-y-6">
          {odds.map((game, idx) => (
            <div key={idx} className="p-4 bg-gray-800 rounded shadow">
              <h2 className="text-xl font-semibold mb-2">
                {game.away_team} @ {game.home_team}
              </h2>
              <p><strong>Moneylines:</strong></p>
              <ul className="pl-5 list-disc">
                {Object.entries(game.moneylines.home).map(([bookie, value]) => (
                  <li key={`home-${bookie}`}>{bookie}: {value} (Home)</li>
                ))}
                {Object.entries(game.moneylines.away).map(([bookie, value]) => (
                  <li key={`away-${bookie}`}>{bookie}: {value} (Away)</li>
                ))}
              </ul>
              <p className="mt-2"><strong>Over/Under:</strong></p>
              <ul className="pl-5 list-disc">
                {Object.entries(game.totals).map(([bookie, val]) => (
                  <li key={`total-${bookie}`}>{bookie}: {val}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
