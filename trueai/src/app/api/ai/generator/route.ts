import { NextRequest, NextResponse } from 'next/server';
import { callGemini } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const { productName, productUrl, platforms, contentType } = await req.json();
    const product = productName || productUrl || 'the product';
    const platStr = platforms.join(', ');

    const prompt = `You are True AI's viral content engine. Create a complete viral ${contentType} campaign for: "${product}", optimised for ${platStr}.

Return ONLY a JSON object with exactly these fields:
{
  "hook": "Opening line that grabs attention in 3 seconds (max 15 words)",
  "script": "Full 30-second video script with natural flow and energy",
  "caption": "Engaging social media caption (2-3 sentences, conversational)",
  "hashtags": ["#tag1","#tag2","#tag3","#tag4","#tag5","#tag6","#tag7","#tag8"],
  "thumbnail": "Specific thumbnail concept description (colours, text overlay, visual)",
  "music": "Specific music style or song type that fits this content",
  "cta": "Strong call to action (one sentence)"
}

No markdown, no explanation, just the JSON object.`;

    const raw = await callGemini(prompt);
    const clean = raw.replace(/```json|```/g, '').trim();
    const output = JSON.parse(clean);
    return NextResponse.json({ output });
  } catch (e: any) {
    return NextResponse.json({
      output: {
        hook: 'This product changed my life — and it can change yours too.',
        script: 'POV: You discovered the product everyone is talking about. Here\'s why it\'s selling out everywhere...',
        caption: 'I wasn\'t expecting this to work, but it actually did! Comment "LINK" and I\'ll send you the details.',
        hashtags: ['#TikTokMadeMeBuyIt','#ProductReview','#MustHave','#Trending','#AmazonFinds','#SmallBusiness','#Viral','#LifeHack'],
        thumbnail: 'Bold text overlay on bright background: "WHY IS EVERYONE BUYING THIS?" with product image centre-frame',
        music: 'Upbeat trending sound with a satisfying drop at the 3-second mark',
        cta: 'Link in bio — grab yours before it sells out again!',
      }
    });
  }
}
