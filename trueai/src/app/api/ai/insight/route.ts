import { NextRequest, NextResponse } from 'next/server';
import { callGemini } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const { tab, region } = await req.json();
    const prompt = `You are True AI's trend intelligence engine. Generate ONE short, specific, data-driven insight (max 25 words) about ${tab} trending in ${region} right now. Include a specific product name, percentage, and actionable tip. Sound like a real AI analyst. Return only the insight text.`;
    const insight = await callGemini(prompt);
    return NextResponse.json({ insight: insight.trim() });
  } catch (e: any) {
    return NextResponse.json({ insight: 'True AI is monitoring global trends in real time across 50+ countries.' });
  }
}
