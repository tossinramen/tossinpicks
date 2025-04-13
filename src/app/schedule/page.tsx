type GameDay = {
    date: string;
    games: string[];
  };
  
  const mockSchedule: GameDay[] = [
    {
      date: '2025-04-13',
      games: ['Lakers vs Warriors', 'Celtics vs Knicks'],
    },
    {
      date: '2025-04-14',
      games: ['Heat vs Bucks', 'Nuggets vs Suns'],
    },
    {
      date: '2025-04-15',
      games: ['Mavericks vs Clippers', 'Hawks vs Bulls'],
    },
  ];
  
  export default function SchedulePage() {
    return (
      <main className="min-h-screen bg-gray-900 text-white p-8">
        <h1 className="text-4xl font-bold mb-6 text-center">🏀 NBA Schedule</h1>
        <p className="text-center mb-10 text-gray-400">Remaining games for the 2024-2025 season</p>
  
        {mockSchedule.map((day, i) => (
          <div key={i} className="mb-6 p-4 rounded-xl bg-gray-800 shadow">
            <h2 className="text-2xl font-semibold mb-2">{day.date}</h2>
            <ul className="list-disc list-inside">
              {day.games.map((game, j) => (
                <li key={j}>{game}</li>
              ))}
            </ul>
          </div>
        ))}
      </main>
    );
  }
  