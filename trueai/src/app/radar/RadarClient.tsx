'use client';
import { useState } from 'react';
import { Sparkles, TrendingUp, RefreshCw, ExternalLink, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

const TABS = ['Products','Sounds','Hashtags','Niches','Games'] as const;
type Tab = typeof TABS[number];

const SEED_PRODUCTS = [
  { emoji:'🥤', name:'Mini Portable Blender',       growth:340, country:'🇺🇸 USA',    buy:4.20,  sell:22.99, profit:18.79, supplier:'Alibaba',  tag:'Kitchen',   hot:true },
  { emoji:'💡', name:'LED Car Interior Kit',         growth:280, country:'🇬🇧 UK',     buy:6.50,  sell:28.99, profit:22.49, supplier:'Alibaba',  tag:'Auto',      hot:true },
  { emoji:'🐾', name:'Smart Pet Feeder',             growth:210, country:'🇩🇪 Germany', buy:12.00, sell:44.99, profit:32.99, supplier:'Alibaba',  tag:'Pets',      hot:false },
  { emoji:'🌿', name:'Bamboo Phone Stand',           growth:190, country:'🇨🇦 Canada',  buy:2.80,  sell:18.99, profit:16.19, supplier:'Alibaba',  tag:'Tech',      hot:false },
  { emoji:'💪', name:'Resistance Band Set',          growth:175, country:'🇦🇺 Australia',buy:5.00, sell:29.99, profit:24.99, supplier:'Amazon',   tag:'Fitness',   hot:false },
  { emoji:'🧴', name:'Ice Roller Face Massager',     growth:160, country:'🇫🇷 France',  buy:3.50,  sell:19.99, profit:16.49, supplier:'Alibaba',  tag:'Beauty',    hot:false },
  { emoji:'🔦', name:'Magnetic USB Charging Cable',  growth:145, country:'🇧🇷 Brazil',  buy:1.80,  sell:14.99, profit:13.19, supplier:'Alibaba',  tag:'Tech',      hot:false },
  { emoji:'🧊', name:'Collapsible Water Bottle',     growth:130, country:'🇮🇳 India',   buy:2.20,  sell:15.99, profit:13.79, supplier:'Alibaba',  tag:'Outdoor',   hot:false },
];

const SEED_SOUNDS = [
  { name:'Calm Down — Rema',          uses:'4.2M', growth:340, platform:'TikTok' },
  { name:'Escapism — RAYE',           uses:'2.8M', growth:210, platform:'Instagram' },
  { name:'Trendy Beat 2026',          uses:'1.9M', growth:185, platform:'TikTok' },
  { name:'Golden Hour Lofi',          uses:'1.4M', growth:160, platform:'YouTube' },
  { name:'Arabic Vibes Remix',        uses:'980K', growth:145, platform:'TikTok' },
];

const SEED_HASHTAGS = [
  { tag:'#TikTokMadeMeBuyIt',   posts:'18M', growth:280, niche:'Shopping' },
  { tag:'#AmazonFinds',         posts:'12M', growth:240, niche:'Shopping' },
  { tag:'#SmallBusiness',       posts:'9.4M',growth:195, niche:'Business' },
  { tag:'#AlibabaSupplier',     posts:'4.2M',growth:310, niche:'Sourcing' },
  { tag:'#ViralProduct2026',    posts:'3.8M',growth:420, niche:'Trending' },
  { tag:'#AIBusiness',          posts:'2.1M',growth:380, niche:'AI' },
];

const SEED_NICHES = [
  { name:'AI-powered gadgets',   growth:480, size:'$2.4B', rising:true },
  { name:'Eco-friendly products',growth:320, size:'$1.8B', rising:true },
  { name:'Pet tech accessories', growth:290, size:'$980M', rising:true },
  { name:'Home gym equipment',   growth:240, size:'$1.2B', rising:true },
  { name:'Smart home devices',   growth:210, size:'$3.1B', rising:true },
];

const SEED_GAMES = [
  { name:'Arena Legends',   players:'128M', growth:180, platform:'PC/Mobile' },
  { name:'Speed Circuit 4', players:'54M',  growth:145, platform:'Console' },
  { name:'Mind Quest Pro',  players:'38M',  growth:210, platform:'Mobile' },
  { name:'Battle Arena X',  players:'29M',  growth:165, platform:'PC' },
];

export default function RadarClient() {
  const [tab, setTab]       = useState<Tab>('Products');
  const [loading, setLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [selected, setSelected] = useState<any>(null);

  async function analyseProduct(product: any) {
    setSelected(product);
    setLoading(true);
    setAiAnalysis('');
    try {
      const res = await fetch('/api/ai/analyse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product }),
      });
      const data = await res.json();
      setAiAnalysis(data.analysis || '');
    } catch {
      setAiAnalysis('AI analysis unavailable. Check your API key.');
    }
    setLoading(false);
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-14 bg-surface-100 border-b border-white/5 flex items-center px-6 gap-3 flex-shrink-0">
        <span className="text-lg font-semibold text-white">🔥 AI Trend Radar</span>
        <span className="badge-ai">Live</span>
        <span className="text-xs text-white/30 ml-2">Updated every 60 minutes by True AI</span>
        <button className="ml-auto btn-ghost flex items-center gap-1.5 text-xs py-1.5 px-3">
          <RefreshCw className="w-3 h-3" /> Refresh
        </button>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* Tabs */}
          <div className="flex gap-2 mb-5">
            {TABS.map(t => (
              <button key={t} onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                  tab === t ? 'bg-tai-600/20 text-tai-400 border border-tai-600/30' : 'text-white/40 hover:text-white/70 border border-white/5'
                }`}>{t}</button>
            ))}
          </div>

          {tab === 'Products' && (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-2 mb-3 text-xs text-white/30 px-2">
                <span>Product</span><span className="text-center">Growth</span><span className="text-right">Est. profit/sale</span>
              </div>
              {SEED_PRODUCTS.map((p, i) => (
                <div key={i} onClick={() => analyseProduct(p)}
                  className={`card-dark p-4 flex items-center gap-4 cursor-pointer transition-all duration-150 hover:border-tai-600/30 ${selected?.name === p.name ? 'border-tai-600/50 bg-tai-600/5' : ''}`}>
                  <div className="text-2xl">{p.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white text-sm">{p.name}</span>
                      {p.hot && <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">🔥 Hot</span>}
                    </div>
                    <div className="text-xs text-white/40 mt-0.5">{p.country} · {p.tag} · via {p.supplier}</div>
                  </div>
                  <div className="text-emerald-400 font-semibold text-sm text-center w-20">+{p.growth}%</div>
                  <div className="text-right">
                    <div className="text-white font-semibold text-sm">${p.profit.toFixed(2)}</div>
                    <div className="text-xs text-white/30">Buy: ${p.buy.toFixed(2)}</div>
                  </div>
                  <button onClick={e => { e.stopPropagation(); analyseProduct(p); }}
                    className="btn-tai text-xs py-1.5 px-3 whitespace-nowrap">
                    <Sparkles className="w-3 h-3" /> AI analyse
                  </button>
                </div>
              ))}
            </div>
          )}

          {tab === 'Sounds' && (
            <div className="space-y-3">
              {SEED_SOUNDS.map((s, i) => (
                <div key={i} className="card-dark p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-tai-600/20 flex items-center justify-center text-xl flex-shrink-0">🎵</div>
                  <div className="flex-1">
                    <div className="font-medium text-white text-sm">{s.name}</div>
                    <div className="text-xs text-white/40">{s.platform} · {s.uses} uses</div>
                  </div>
                  <div className="text-emerald-400 font-semibold">+{s.growth}%</div>
                </div>
              ))}
            </div>
          )}

          {tab === 'Hashtags' && (
            <div className="space-y-3">
              {SEED_HASHTAGS.map((h, i) => (
                <div key={i} className="card-dark p-4 flex items-center gap-4">
                  <div className="text-tai-400 font-bold text-lg w-8 text-center">#</div>
                  <div className="flex-1">
                    <div className="font-medium text-white text-sm">{h.tag}</div>
                    <div className="text-xs text-white/40">{h.posts} posts · {h.niche}</div>
                  </div>
                  <div className="text-emerald-400 font-semibold">+{h.growth}%</div>
                </div>
              ))}
            </div>
          )}

          {tab === 'Niches' && (
            <div className="space-y-3">
              {SEED_NICHES.map((n, i) => (
                <div key={i} className="card-dark p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-xl flex-shrink-0">📈</div>
                  <div className="flex-1">
                    <div className="font-medium text-white text-sm">{n.name}</div>
                    <div className="text-xs text-white/40">Market size: {n.size}</div>
                  </div>
                  <div className="text-emerald-400 font-semibold">+{n.growth}%</div>
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Rising</span>
                </div>
              ))}
            </div>
          )}

          {tab === 'Games' && (
            <div className="space-y-3">
              {SEED_GAMES.map((g, i) => (
                <div key={i} className="card-dark p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-tai-600/20 flex items-center justify-center text-xl flex-shrink-0">🎮</div>
                  <div className="flex-1">
                    <div className="font-medium text-white text-sm">{g.name}</div>
                    <div className="text-xs text-white/40">{g.players} players · {g.platform}</div>
                  </div>
                  <div className="text-emerald-400 font-semibold">+{g.growth}%</div>
                  <button className="btn-ghost text-xs py-1.5 px-3">Stream</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* AI analysis panel */}
        <div className="w-72 bg-surface-100 border-l border-white/5 flex flex-col flex-shrink-0">
          <div className="p-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-tai-400" />
              <span className="text-sm font-medium text-white">AI Analysis</span>
            </div>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {!selected && (
              <div className="text-center pt-8">
                <div className="text-3xl mb-3">👆</div>
                <p className="text-xs text-white/30">Click any product and tap "AI analyse" to get a full business breakdown</p>
              </div>
            )}
            {selected && (
              <div className="space-y-4">
                <div className="card-dark p-3">
                  <div className="text-lg mb-1">{selected.emoji} {selected.name}</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white/5 rounded-lg p-2"><div className="text-white/40">Buy price</div><div className="text-white font-medium">${selected.buy}</div></div>
                    <div className="bg-white/5 rounded-lg p-2"><div className="text-white/40">Sell price</div><div className="text-white font-medium">${selected.sell}</div></div>
                    <div className="bg-emerald-500/10 rounded-lg p-2 col-span-2"><div className="text-emerald-400/70">Est. profit</div><div className="text-emerald-400 font-semibold text-base">${selected.profit.toFixed(2)} / sale</div></div>
                  </div>
                </div>

                {loading && (
                  <div className="flex items-center gap-2 text-xs text-white/40">
                    <div className="w-3 h-3 border border-tai-400/40 border-t-tai-400 rounded-full animate-spin" />
                    True AI is analysing...
                  </div>
                )}

                {aiAnalysis && (
                  <div className="card-dark p-3">
                    <div className="text-xs text-tai-400 font-medium mb-2 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> AI verdict
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed whitespace-pre-wrap">{aiAnalysis}</p>
                  </div>
                )}

                <a href={`https://www.alibaba.com/trade/search?SearchText=${encodeURIComponent(selected.name)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn-tai w-full text-xs py-2">
                  <ShoppingCart className="w-3 h-3" /> Find supplier on Alibaba
                </a>
                <a href={`https://www.amazon.com/s?k=${encodeURIComponent(selected.name)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn-ghost w-full text-xs py-2 flex items-center justify-center gap-2">
                  <ExternalLink className="w-3 h-3" /> Check Amazon prices
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
