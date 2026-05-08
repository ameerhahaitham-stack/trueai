-- ============================================================
-- TRUE AI — DATABASE SCHEMA
-- Paste this entire file into Supabase SQL Editor and Run it.
-- ============================================================

-- Profiles
create table if not exists profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  email           text unique not null,
  username        text unique not null,
  display_name    text not null,
  avatar_url      text,
  bio             text,
  role            text default 'seller' check (role in ('seller','creator','gamer','both')),
  followers_count integer default 0,
  following_count integer default 0,
  is_verified     boolean default false,
  created_at      timestamptz default now()
);

-- Trending products (AI-discovered)
create table if not exists trending_products (
  id               uuid primary key default gen_random_uuid(),
  name             text not null,
  category         text,
  growth_percent   numeric default 0,
  search_volume    bigint default 0,
  country          text default 'Global',
  region           text default 'Global',
  supplier_url     text,
  supplier_name    text,
  buy_price        numeric(10,2),
  sell_price       numeric(10,2),
  estimated_profit numeric(10,2),
  image_url        text,
  platform         text default 'alibaba',
  tags             text[] default '{}',
  is_active        boolean default true,
  created_at       timestamptz default now()
);

-- Content generation jobs
create table if not exists content_jobs (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid references profiles(id) on delete cascade,
  product_url         text,
  product_name        text,
  status              text default 'pending' check (status in ('pending','processing','done','failed')),
  output_caption      text,
  output_hashtags     text[] default '{}',
  output_script       text,
  output_hook         text,
  platforms           text[] default '{}',
  created_at          timestamptz default now()
);

-- AI insights per user
create table if not exists ai_insights (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references profiles(id) on delete cascade,
  type         text default 'growth',
  title        text,
  message      text,
  action_label text,
  action_url   text,
  is_read      boolean default false,
  created_at   timestamptz default now()
);

-- Saved products (user watchlist)
create table if not exists saved_products (
  user_id    uuid references profiles(id) on delete cascade,
  product_id uuid references trending_products(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, product_id)
);

-- Collaboration matches
create table if not exists collaboration_matches (
  id            uuid primary key default gen_random_uuid(),
  requester_id  uuid references profiles(id) on delete cascade,
  matched_id    uuid references profiles(id) on delete cascade,
  match_score   numeric default 0,
  reason        text,
  status        text default 'pending' check (status in ('pending','accepted','declined')),
  created_at    timestamptz default now()
);

-- ── Row Level Security ─────────────────────────
alter table profiles              enable row level security;
alter table trending_products     enable row level security;
alter table content_jobs          enable row level security;
alter table ai_insights           enable row level security;
alter table saved_products        enable row level security;
alter table collaboration_matches enable row level security;

-- Profiles
create policy "profiles_read"   on profiles for select using (true);
create policy "profiles_insert" on profiles for insert with check (auth.uid() = id);
create policy "profiles_update" on profiles for update using (auth.uid() = id);

-- Trending products (public read)
create policy "products_read"   on trending_products for select using (is_active = true);
create policy "products_insert" on trending_products for insert with check (auth.role() = 'authenticated');

-- Content jobs (own only)
create policy "jobs_read"   on content_jobs for select using (auth.uid() = user_id);
create policy "jobs_insert" on content_jobs for insert with check (auth.uid() = user_id);
create policy "jobs_update" on content_jobs for update using (auth.uid() = user_id);

-- AI insights (own only)
create policy "insights_read"   on ai_insights for select using (auth.uid() = user_id);
create policy "insights_insert" on ai_insights for insert with check (auth.uid() = user_id);
create policy "insights_update" on ai_insights for update using (auth.uid() = user_id);

-- Saved products
create policy "saved_read"   on saved_products for select using (auth.uid() = user_id);
create policy "saved_insert" on saved_products for insert with check (auth.uid() = user_id);
create policy "saved_delete" on saved_products for delete using (auth.uid() = user_id);

-- Storage
insert into storage.buckets (id, name, public) values ('avatars','avatars',true) on conflict do nothing;
insert into storage.buckets (id, name, public) values ('content','content',true) on conflict do nothing;

create policy "avatars_read"   on storage.objects for select using (bucket_id = 'avatars');
create policy "avatars_insert" on storage.objects for insert with check (bucket_id = 'avatars' and auth.role() = 'authenticated');
create policy "content_read"   on storage.objects for select using (bucket_id = 'content');
create policy "content_insert" on storage.objects for insert with check (bucket_id = 'content' and auth.role() = 'authenticated');

-- ── Seed some trending products ────────────────
insert into trending_products (name, category, growth_percent, search_volume, country, buy_price, sell_price, estimated_profit, platform, tags) values
('Mini Portable Blender',   'Kitchen',  340, 2400000, 'USA',     4.20,  22.99, 18.79, 'alibaba', array['kitchen','health','trending']),
('LED Car Interior Kit',    'Automotive',280, 1800000, 'UK',      6.50,  28.99, 22.49, 'amazon',  array['car','lifestyle','viral']),
('Smart Pet Feeder',        'Pets',      210,  980000, 'Germany', 12.00, 44.99, 32.99, 'alibaba', array['pets','smart home','growing']),
('Magnetic Phone Stand',    'Tech',      190, 3100000, 'Global',  2.80,  19.99, 17.19, 'alibaba', array['tech','office','evergreen']),
('Glow Facial Massager',    'Beauty',    165, 1200000, 'UAE',     8.00,  39.99, 31.99, 'alibaba', array['beauty','skincare','luxury']),
('Posture Corrector Belt',  'Health',    145,  890000, 'USA',     5.50,  29.99, 24.49, 'amazon',  array['health','fitness','office']);
