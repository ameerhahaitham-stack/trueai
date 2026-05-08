'use client';
import { useState } from 'react';
import { Map, TrendingUp, Users, ShoppingBag, Sparkles } from 'lucide-react';

const COUNTRIES = [
  { flag:'🇺🇸', name:'United States',    trend:'Mini Blender',       growth:340, buyers:'2.4M', revenue:'$84M',  heat:95 },
  { flag:'🇬🇧', name:'United Kingdom',   trend:'LED Car Kit',         growth:280, buyers:'980K', revenue:'$31M',  heat:82 },
  { flag:'🇩🇪', name:'Germany',          trend:'Smart Pet Feeder',    growth:210, buyers:'760K', revenue:'$28M',  heat:74 },
  { flag:'🇦🇪', name:'UAE',              trend:'Glow Massager',       growth:195, buyers:'420K', revenue:'$19M',  heat:68 },
  { flag:'🇸🇦', name:'Saudi Arabia',     trend:'Posture Corrector',   growth:180, buyers:'390K', revenue:'$17M',  heat:64 },
  { flag:'🇫🇷', name:'France',           trend:'Portable Projector',  growth:165, buyers:'350K', revenue:'$15M',  heat:59 },
  { flag:'🇮🇳', name:'India',            trend:'Magnetic Phone Stand',growth:155, buyers:'3.1M', revenue:'$41M',  heat:55 },
  { flag:'🇮🇶', name:'Iraq',             trend:'Wireless Earbuds',    growth:145, buyers:'180K', revenue:'$6M',   heat:50 },
  { flag:'🇪🇬', name:'Egypt',            trend:'Smart Watch',         growth:140, buyers:'290K', revenue:'$9M',   heat:48 },
  { flag:'🇧🇷', name:'Brazil',           trend:'Gaming Chair',        growth:130, buyers:'420K', revenue:'$18M',  heat:44 },
  { flag:'🇨🇦', name:'Canada',           trend:'Air Purifier',        growth:125, buyers:'310K', revenue:'$14M',  heat:42 },
  { flag:'🇦🇺', name:'Australia',        trend:'Foam Roller Set',     growth:115, buyers:'190K', revenue:'$8M',   heat:38 },
];

const FILTERS = ['All products','Beauty','Tech','Health','Gaming','Home','Pets'];

export default function HeatmapClient() {
  const [filter, setFilter] = useState('All products');
  const [selected, setSelected] = useState<typeof COUNTRIES[0] | null>(null);

  function heatColor(heat: number): string {
    if (heat >= 90) return '#ef4444';
    if (heat >= 70) return '#f97316';
    if (heat >= 50) return '#eab308';
    if (heat >= 30) return '#22c55e';
    return '#3b82f6';
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="h-14 bg-surface-100 border-b border-white/5 flex items-center px-6 gap-3 flex-shrink-0">
        <Map className="w-4 h-4 text-tai-400" />
        <span className="text-sm font-semibold text-white">Global Demand Heat Map</span>
        <span className="badge-ai">Live</span>
        <div className="ml-auto flex gap-1">
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                filter === f ? 'bg-tai-600/20 text-tai-400' : 'text-white/30 hover:text-white/60'
              }`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-y-auto p-5">
          {/* Visual heat map representation */}
          <div className="card-dark p-5 mb-5">
            <div className="text-xs text-white/40 mb-4 flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-tai-400" />
              True AI is monitoring {COUNTRIES.length} countries live · Updated every 60 seconds
            </div>
            <div className="grid grid-cols-6 gap-2">
              {COUNTRIES.map((c, i) => (
                <button key={i} onClick={() => setSelected(selected?.name === c.name ? null : c)}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-1 transition-all border ${
                    selected?.name === c.name ? 'border-white/30 scale-105' : 'border-transparent hover:border-white/10'
                  }`}
                  style={{ background: heatColor(c.heat) + '25', borderColor: selected?.name === c.name ? heatColor(c.heat) : undefined }}>
                  <span className="text-xl">{c.flag}</span>
                  <span className="text-[9px] text-white/50 text-center leading-tight">{c.name.split(' ')[0]}</span>
                  <span className="text-[9px] font-medium" style={{ color: heatColor(c.heat) }}>+{c.growth}%</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-4 justify-center">
              {[['#3b82f6','Low'],['#22c55e','Medium'],['#eab308','High'],['#f97316','Very High'],['#ef4444','Explosive']].map(([color,label]) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ background: color }} />
                  <span className="text-xs text-white/30">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Selected country detail */}
          {selected && (
            <div className="card-dark p-5 mb-5 border-tai-600/30">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{selected.flag}</span>
                <div>
                  <h2 className="font-semibold text-white">{selected.name}</h2>
                  <p className="text-xs text-white/40">Top trending: {selected.trend}</p>
                </div>
                <div className="ml-auto text-right">
                  <div className="text-emerald-400 font-bold text-lg">+{selected.growth}%</div>
                  <div className="text-xs text-white/30">weekly growth</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <Users className="w-4 h-4 text-tai-400 mx-auto mb-1" />
                  <div className="text-white font-semibold">{selected.buyers}</div>
                  <div className="text-xs text-white/30">Active buyers</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <ShoppingBag className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <div className="text-white font-semibold">{selected.revenue}</div>
                  <div className="text-xs text-white/30">Market revenue</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3 text-center">
                  <TrendingUp className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                  <div className="text-white font-semibold">{selected.heat}/100</div>
                  <div className="text-xs text-white/30">Heat score</div>
                </div>
              </div>
            </div>
          )}

          {/* Country list */}
          <div className="space-y-2">
            {COUNTRIES.map((c, i) => (
              <div key={i} onClick={() => setSelected(selected?.name === c.name ? null : c)}
                className={`card-dark p-4 flex items-center gap-4 cursor-pointer transition-all hover:border-white/10 ${selected?.name === c.name ? 'border-tai-600/30' : ''}`}>
                <span className="text-2xl flex-shrink-0">{c.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-white">{c.name}</span>
                    <span className="text-xs text-white/30">·</span>
                    <span className="text-xs text-white/50">{c.trend}</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full transition-all" style={{ width: c.heat + '%', background: heatColor(c.heat) }} />
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-emerald-400 font-semibold text-sm">+{c.growth}%</div>
                  <div className="text-xs text-white/30">{c.buyers} buyers</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
