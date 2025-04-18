'use client';

import React, { useEffect, useState } from 'react';
import SidebarWithHeader from '@/components/Header';
import TeamLogo from '@/components/TeamLogo';

type OddsGame = {
  home_team: string;
  away_team: string;
  moneylines: {
    home: Record<string, string>;
    away: Record<string, string>;
  };
  totals: Record<string, string>;
};

const sportsbooks = ['fanduel', 'draftkings', 'BetRivers', 'bet365'];

export default function OddsPage() {
  const [odds, setOdds] = useState<OddsGame[]>([]);
  const [activeSport, setActiveSport] = useState('NBA');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleMenuClick = () => {
    setIsSidebarOpen(prev => !prev);
  };

  useEffect(() => {
    const fetchOdds = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/get-odds`);
        const data = await res.json();

        const cleanedGames = (data.games || []).map((game: OddsGame) => {
          const cleanHome = { ...game.moneylines.home };
          const cleanAway = { ...game.moneylines.away };
          const cleanTotal = { ...game.totals };

          if (cleanHome['bet_rivers_ny']) {
            cleanHome['BetRivers'] = cleanHome['bet_rivers_ny'];
            delete cleanHome['bet_rivers_ny'];
          }
          if (cleanAway['bet_rivers_ny']) {
            cleanAway['BetRivers'] = cleanAway['bet_rivers_ny'];
            delete cleanAway['bet_rivers_ny'];
          }
          if (cleanTotal['bet_rivers_ny']) {
            cleanTotal['BetRivers'] = cleanTotal['bet_rivers_ny'];
            delete cleanTotal['bet_rivers_ny'];
          }

          return {
            ...game,
            moneylines: { home: cleanHome, away: cleanAway },
            totals: cleanTotal,
          };
        });

        setOdds(cleanedGames);
      } catch (err) {
        console.error('Failed to fetch odds:', err);
      }
    };

    fetchOdds();
  }, []);

  const formatOdd = (odd: string) => {
    if (!odd || odd === '-') return '-';
    const num = parseFloat(odd);
    return num > 0 ? `+${num}` : `${num}`;
  };

  return (
    <SidebarWithHeader
      activeSport={activeSport}
      setActiveSport={setActiveSport}
      isOpen={isSidebarOpen}
      onMenuClick={handleMenuClick}
    >
      <h1 className="text-4xl font-bold mb-6 text-center">Check Odds</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse bg-gray-800 text-sm">
          <thead className="bg-gray-700 text-gray-300 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 w-[260px] align-bottom" rowSpan={2}>Matchup</th>
              {sportsbooks.map((book) => (
                <th key={`${book}-group`} colSpan={2} className="text-center py-2">{book}</th>
              ))}
            </tr>
            <tr>
              {sportsbooks.flatMap((book) => [
                <th key={`${book}-ml`} className="text-center">ML</th>,
                <th key={`${book}-ou`} className="text-center">O/U</th>,
              ])}
            </tr>
          </thead>
          <tbody>
            {odds.map((game, index) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 mb-1">
                    <TeamLogo teamName={game.away_team} size={30} />
                    <span>{game.away_team}</span>
                  </div>
                  <div className="w-full h-px bg-gray-600 my-1" />
                  <div className="flex items-center gap-2">
                    <TeamLogo teamName={game.home_team} size={30} />
                    <span>{game.home_team}</span>
                  </div>
                </td>

                {sportsbooks.map((book) => {
                  const awayML = formatOdd(game.moneylines.away?.[book] ?? '-');
                  const homeML = formatOdd(game.moneylines.home?.[book] ?? '-');
                  const total = parseFloat(game.totals?.[book]);

                  return (
                    <React.Fragment key={`${index}-${book}`}>
                      <td className="px-2 py-3 text-center">
                        <div className="bg-gray-700 rounded p-2 min-w-[80px]">
                          <div>{awayML}</div>
                          <div className="w-full h-px bg-gray-500 my-1" />
                          <div>{homeML}</div>
                        </div>
                      </td>
                      <td className="px-2 py-3 text-center">
                        <div className="bg-gray-700 rounded p-2 min-w-[80px]">
                          {isNaN(total) ? (
                            <div className="text-gray-400">-</div>
                          ) : (
                            <>
                              <div className="text-green-300">O {total}</div>
                              <div className="w-full h-px bg-gray-500 my-1" />
                              <div className="text-red-300">U {total}</div>
                            </>
                          )}
                        </div>
                      </td>
                    </React.Fragment>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SidebarWithHeader>
  );
}
