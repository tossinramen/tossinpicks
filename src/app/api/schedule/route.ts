import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.BDL_API_KEY;

  const today = new Date();
  const startDate = today.toISOString().split('T')[0];
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + 7);
  const endDateStr = endDate.toISOString().split('T')[0];

  try {
    const res = await fetch(
      `https://api.balldontlie.io/v1/games?start_date=${startDate}&end_date=${endDateStr}&per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: `Upstream error: ${res.status}` }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('API route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
