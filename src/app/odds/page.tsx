'use client';

import { useEffect, useState } from 'react';
import {
  ATL, BOS, BKN, CHA, CHI, CLE, DAL, DEN, DET,
  GSW, HOU, IND, LAC, LAL, MEM, MIA, MIL, MIN, NOP,
  NYK, OKC, ORL, PHI, PHX, POR, SAC, SAS, TOR, UTA, WAS
} from 'react-nba-logos';

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
            {odds.map((game, index) => {
              const AwayLogo = teamComponents[game.away_team];
              const HomeLogo = teamComponents[game.home_team];

              return (
                <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 mb-1">
                      {AwayLogo && <AwayLogo size={30} />}
                      <span>{game.away_team}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {HomeLogo && <HomeLogo size={30} />}
                      <span>{game.home_team}</span>
                    </div>
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
              );
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
