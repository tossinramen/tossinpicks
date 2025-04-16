import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { home_team, visitor_team, date } = body;

  return new Promise((resolve) => {
    const py = spawn('python', ['backend/predict_matchup.py', home_team, visitor_team, date]);

    let result = '';
    py.stdout.on('data', (data) => result += data.toString());

    py.on('close', () => {
      resolve(NextResponse.json({ winner: result.trim() }));
    });
  });
}
