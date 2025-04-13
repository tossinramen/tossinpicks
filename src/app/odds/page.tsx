'use client';

import React, { useEffect, useState } from 'react';
import {
  ATL, BOS, BKN, CHA, CHI, CLE, DAL, DEN, DET,
  GSW, HOU, IND, LAC, LAL, MEM, MIA, MIL, MIN, NOP,
  NYK, OKC, ORL, PHI, PHX, POR, SAC, SAS, TOR, UTA, WAS
} from 'react-nba-logos';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

const teamComponents: Record<string, React.ElementType> = {
  // ... same as before
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

const sportsbooks = ['fanduel', 'draftkings', 'BetRivers', 'bet365'];

export default function OddsPage() {
  const [odds, setOdds] = useState<OddsGame[]>([]);
  const [activeSport, setActiveSport] = useState('NBA');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // 👈 NEW

  const handleMenuClick = () => {
    setIsSidebarOpen((prev) => !prev);
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
    <div className="min-h-screen flex bg-gray-900 text-white">
      <Sidebar activeSport={activeSport} setActiveSport={setActiveSport} isOpen={isSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <Header onMenuClick={handleMenuClick} />
        <main className="p-8">
          {/* ... rest of your table rendering code ... */}
        </main>
      </div>
    </div>
  );
}
