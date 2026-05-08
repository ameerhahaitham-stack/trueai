import { NextRequest, NextResponse } from 'next/server';
import { callGemini } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const { type, input, tone, platform, language } = await req.json();
    let prompt = '';

    if (type === 'caption') {
      prompt = `Write a viral ${platform || 'social media'} caption for: "${input}". Tone: ${tone || 'engaging'}. Include 5 relevant hashtags. Return only the caption.`;
    } else if (type === 'ad') {
      prompt = `Write a high-converting ad script (30 seconds) for this product: "${input}". Make it viral, punchy, and optimised for ${platform || 'TikTok'}. Return only the script.`;
    } else if (type === 'bio') {
      prompt = `Write a professional creator bio for: "${input}". Make it compelling, max 3 sentences. Return only the bio.`;
    } else if (type === 'ideas') {
      prompt = `Generate 6 viral content ideas for a creator in the "${input}" niche on ${platform || 'TikTok'}. Return ONLY a JSON array: [{"title":"...","format":"...","hook":"..."}]. No markdown.`;
    } else if (type === 'translate') {
      prompt = `Translate this content to ${language || 'Arabic'}, keeping the same tone and style: "${input}". Return only the translation.`;
    } else if (type === 'price') {
      prompt = `Suggest the optimal selling price strategy for this product: "${input}". Consider platform fees, competition, and profit margins. Give 3 price points (budget/standard/premium) with reasoning. Max 80 words.`;
    }

    const text = await callGemini(prompt);

    if (type === 'ideas') {
      try {
        const clean = text.replace(/\`\`\`json|\`\`\`/g, '').trim();
        return NextResponse.json({ ideas: JSON.parse(clean) });
      } catch {
        return NextResponse.json({ ideas: [] });
      }
    }

    return NextResponse.json({ text });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
