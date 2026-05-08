# True AI — AI-Powered Commerce Platform

> Discover. Source. Market. Sell. — All with AI.

The world's first platform that finds trending products globally, sources suppliers automatically, creates viral content in one click, and shows live demand on a world map.

---

## What is built

| Screen | What it does |
|---|---|
| Login / Signup | Real auth with role selection (Seller, Creator, Gamer) |
| Dashboard | AI insights, trending products, quick access to all tools |
| AI Trend Radar | Live trending products, sounds, hashtags, games by country |
| AI Business Assistant | Find products, prices, suppliers, create ads and video scripts |
| Viral Content Generator | One click to hook, script, caption, hashtags, thumbnail, music |
| Global Heat Map | Live demand visualised by country with heat scoring |
| Profile | User profile with role, followers, and stats |

---

## Deploy in 4 steps

### Step 1 — Supabase database

1. Go to supabase.com and open your project
2. Go to SQL Editor
3. First clear the old schema by running this:

drop table if exists profiles cascade;
drop table if exists videos cascade;
drop table if exists comments cascade;
drop table if exists likes cascade;
drop table if exists follows cascade;
drop table if exists products cascade;
drop table if exists live_streams cascade;

4. Then paste the entire supabase-schema.sql file and click Run
5. You should see Success at the bottom

### Step 2 — Environment variables

Create a file called .env.local in this folder and fill in:

NEXT_PUBLIC_SUPABASE_URL=https://fgvhvbxodjrmtvbeekcu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_publishable_key_here
GEMINI_API_KEY=your_new_gemini_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000

### Step 3 — Run locally

npm install
npm run dev

Open http://localhost:3000

### Step 4 — Deploy to Vercel

1. Upload this folder to your GitHub repository
2. In Vercel go to Settings then Environment Variables and add the 3 keys
3. Click Redeploy
4. Your live True AI platform is ready in 60 seconds

---

## What works right now

- Real signup with role selection (Seller, Creator, Gamer)
- Real login with Supabase Auth
- All routes protected
- AI Trend Radar with live Gemini AI insights by country
- AI Business Assistant with 6 tools
- Viral Content Generator with full campaign output
- Global Heat Map with 12 countries
- Dashboard with live AI insight bar
- Fully deployable on Vercel

## Phase 2 next steps

- Real Google Trends API integration
- Alibaba product search
- Amazon price tracking
- AI Personality Clone
- AI Collaboration Matching
- Auto-Source and Auto-Sell automation
- Mobile app iOS and Android
- Arabic language support
- Stripe payments and subscriptions

---

Built with Next.js 14, Supabase, Tailwind CSS, Google Gemini AI, and Vercel
