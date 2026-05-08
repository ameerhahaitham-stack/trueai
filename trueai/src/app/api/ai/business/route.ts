import { NextRequest, NextResponse } from 'next/server';
import { callGemini } from '@/lib/utils';

const PROMPTS: Record<string, (input: string) => string> = {
  product:  (i) => `You are True AI's business intelligence engine. A seller says: "${i}". Recommend the single best product for them to sell right now. Include: product name, why it's trending, estimated buy price from Alibaba, recommended sell price, profit margin, and target audience. Be specific and data-driven.`,
  price:    (i) => `You are True AI's pricing AI. The seller says: "${i}". Suggest the optimal selling price strategy. Include: recommended price, competitor price range, psychological pricing tip, and projected profit. Be specific.`,
  supplier: (i) => `You are True AI's supplier finder. The seller wants: "${i}". Suggest the best sourcing strategy. Include: where to find it (Alibaba/Amazon), what keywords to search, what to look for in a verified supplier, minimum order quantity tip, and quality check advice.`,
  ad:       (i) => `You are True AI's ad copywriter. Create a high-converting ad for: "${i}". Include: headline (under 10 words), primary text (2-3 sentences), unique selling point, and a strong call to action. Make it feel urgent and authentic.`,
  video:    (i) => `You are True AI's video script writer. Write a complete viral short-form video script for: "${i}". Include: Hook (0-3 sec), Problem statement (3-8 sec), Solution reveal (8-20 sec), Social proof (20-28 sec), Call to action (28-30 sec). Format it clearly with timestamps.`,
  translate:(i) => `You are True AI's translator. Translate the following content into Arabic (right-to-left), keeping it natural and culturally appropriate for Middle Eastern audiences. Also provide an English version if not already in English. Content: "${i}"`,
};

export async function POST(req: NextRequest) {
  try {
    const { tool, input } = await req.json();
    const promptFn = PROMPTS[tool];
    if (!promptFn) return NextResponse.json({ error: 'Unknown tool' }, { status: 400 });
    const result = await callGemini(promptFn(input));
    return NextResponse.json({ result: result.trim() });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
