export interface Profile {
  id: string;
  email: string;
  username: string;
  display_name: string;
  avatar_url?: string;
  bio?: string;
  role: 'seller' | 'creator' | 'gamer' | 'both';
  followers_count: number;
  following_count: number;
  is_verified: boolean;
  created_at: string;
}

export interface TrendingProduct {
  id: string;
  name: string;
  category: string;
  growth_percent: number;
  search_volume: number;
  country: string;
  region: string;
  supplier_url?: string;
  supplier_name?: string;
  buy_price: number;
  sell_price: number;
  estimated_profit: number;
  image_url?: string;
  platform: 'alibaba' | 'amazon' | 'both';
  tags: string[];
  created_at: string;
}

export interface TrendingSound {
  id: string;
  name: string;
  artist: string;
  uses_count: number;
  growth_percent: number;
  platform: string;
  created_at: string;
}

export interface TrendingHashtag {
  id: string;
  tag: string;
  posts_count: number;
  growth_percent: number;
  niche: string;
  platform: string;
  created_at: string;
}

export interface ContentJob {
  id: string;
  user_id: string;
  product_url?: string;
  product_name?: string;
  status: 'pending' | 'processing' | 'done' | 'failed';
  output_video_url?: string;
  output_caption?: string;
  output_hashtags?: string[];
  output_thumbnail_url?: string;
  platforms: string[];
  created_at: string;
}

export interface AIInsight {
  id: string;
  user_id: string;
  type: 'growth' | 'product' | 'timing' | 'revenue';
  title: string;
  message: string;
  action_label?: string;
  action_url?: string;
  created_at: string;
}

export interface CollaborationMatch {
  id: string;
  requester_id: string;
  matched_id: string;
  match_score: number;
  reason: string;
  status: 'pending' | 'accepted' | 'declined';
  created_at: string;
}
