import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">🏀 TossinPicks</h1>
      <p className="text-lg text-gray-300">NBA schedule and prediction app</p>

      <Link
        href="/schedule"
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        View NBA Schedule
      </Link>

      <Link
        href="/odds"
        className="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        Check Odds
      </Link>
    </main>
  );
}
