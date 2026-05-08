import { NextRequest, NextResponse } from 'next/server';
import { callGemini } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const { product } = await req.json();
    const prompt = `You are True AI, an expert e-commerce business analyst. Analyse this trending product:

Product: ${product.name}
Growth: +${product.growth}% this week
Country: ${product.country}
Buy price: $${product.buy} | Sell price: $${product.sell} | Profit: $${product.profit}/sale
Supplier: ${product.supplier}

Give in exactly this format:
VERDICT: [Hot/Good/Risky] — [one sentence why]
CHANNEL: [Best platform to sell]
AUDIENCE: [Who to target]
AD ANGLE: [One winning ad idea]

Max 100 words. Be sharp and direct.`;

    const analysis = await callGemini(prompt);
    return NextResponse.json({ analysis });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
