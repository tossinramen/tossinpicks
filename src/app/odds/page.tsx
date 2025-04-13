'use client';

import { useEffect, useState } from 'react';

export default function OddsPage() {
  const [odds, setOdds] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOdds = async () => {
      const res = await fetch('http://localhost:8000/api/odds?sportsbook=fanduel'); // Update to your FastAPI domain
      const data = await res.json();
      setOdds(data);
      setLoading(false);
    };

    fetchOdds();
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">🏀 Odds by Fanduel</h1>
      {loading ? (
        <p>Loading odds...</p>
      ) : (
        Object.entries(odds).map(([matchup, details]) => (
          <div key={matchup} className="mb-4 bg-gray-800 p-4 rounded">
            <h2 className="text-xl font-semibold">{matchup}</h2>
            <p>Over/Under: {details.under_over_odds || 'N/A'}</p>
            {Object.entries(details).map(([team, val]) => {
              if (team === "under_over_odds") return null;
              return (
                <p key={team}>{team}: {val.money_line_odds || 'N/A'}</p>
              );
            })}
          </div>
        ))
      )}
    </main>
  );
}