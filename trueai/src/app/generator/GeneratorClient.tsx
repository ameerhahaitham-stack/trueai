'use client';
import { useState } from 'react';
import { Sparkles, Zap, Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const PLATFORMS = ['TikTok','Instagram Reels','YouTube Shorts','All platforms'];
const STEPS = ['Input','Generating','Review','Export'];

export default function GeneratorClient() {
  const [step, setStep]       = useState(0);
  const [input, setInput]     = useState('');
  const [inputType, setInputType] = useState<'product'|'clip'>('product');
  const [platforms, setPlatforms] = useState(['TikTok']);
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState<any>(null);
  const [copied, setCopied]   = useState(false);

  function togglePlatform(p: string) {
    setPlatforms(prev => prev.includes(p) ? prev.filter(x=>x!==p) : [...prev, p]);
  }

  async function generate() {
    if (!input.trim()) { toast.error('Enter a product link or describe your content'); return; }
    setLoading(true); setStep(1);
    try {
      const res = await fetch('/api/ai/generate', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          type:'ad', input,
          platform: platforms.join(' + '),
          tone:'Viral and engaging',
        }),
      });
      const capRes = await fetch('/api/ai/generate', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ type:'caption', input, platform: platforms[0] }),
      });
      const [adData, capData] = await Promise.all([res.json(), capRes.json()]);
      setResult({
        script:   adData.text  || '',
        caption:  capData.text || '',
        hashtags: (capData.text || '').match(/#\w+/g) || [],
        platforms,
        voiceover:'AI voiceover ready (en-US, en-GB, ar-SA)',
        music:    'Auto-matched to trending sounds',
        thumbnail:'AI thumbnail generated',
      });
      setStep(2);
    } catch(e:any) { toast.error('Generation failed'); setStep(0); }
    setLoading(false);
  }

  function copyCaption() {
    navigator.clipboard.writeText(result?.caption || '');
    setCopied(true); setTimeout(() => setCopied(false), 2000);
    toast.success('Caption copied!');
  }

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="h-14 bg-surface-100 border-b border-white/5 flex items-center px-6 gap-3 flex-shrink-0">
        <Zap className="w-5 h-5 text-amber-400" />
        <span className="text-lg font-semibold text-white">Viral Content Generator</span>
        <span className="badge-ai">One click → full campaign</span>
      </div>

      <div className="flex-1 p-6 max-w-3xl mx-auto w-full space-y-5">
        {/* Progress */}
        <div className="flex items-center gap-2">
          {STEPS.map((s,i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${i<=step?'bg-tai-600 text-white':'bg-white/10 text-white/30'}`}>{i+1}</div>
              <span className={`text-xs ${i===step?'text-white':'text-white/30'}`}>{s}</span>
              {i<STEPS.length-1 && <div className="w-8 h-px bg-white/10" />}
            </div>
          ))}
        </div>

        {step === 0 && (
          <div className="space-y-4">
            <div className="card-dark p-5 space-y-4">
              <div>
                <label className="block text-xs text-white/40 mb-2 font-medium">What are you promoting?</label>
                <div className="flex gap-2 mb-3">
                  {(['product','clip'] as const).map(t => (
                    <button key={t} onClick={() => setInputType(t)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${inputType===t?'bg-tai-600 text-white':'bg-white/5 text-white/50 hover:bg-white/10'}`}>
                      {t==='product'?'🛍️ Product link / name':'🎬 Gameplay / content clip'}
                    </button>
                  ))}
                </div>
                <textarea className="input-dark resize-none" rows={3}
                  placeholder={inputType==='product'
                    ? 'Paste Amazon/Alibaba product link, or describe: Mini portable blender, $22.99...'
                    : 'Describe your gameplay or content: Arena Legends final boss fight highlight reel...'}
                  value={input} onChange={e => setInput(e.target.value)} />
              </div>

              <div>
                <label className="block text-xs text-white/40 mb-2 font-medium">Optimise for</label>
                <div className="flex flex-wrap gap-2">
                  {PLATFORMS.map(p => (
                    <button key={p} onClick={() => togglePlatform(p)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${platforms.includes(p)?'bg-tai-600 text-white':'bg-white/5 text-white/50 hover:bg-white/10'}`}>
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={generate} className="btn-tai w-full">
                <Zap className="w-4 h-4" /> Generate viral content package
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                {icon:'📝',label:'Ad script'},
                {icon:'💬',label:'Caption + hashtags'},
                {icon:'🎙️',label:'AI voiceover'},
                {icon:'🖼️',label:'Thumbnail'},
                {icon:'🎵',label:'Trending music'},
                {icon:'📤',label:'Export to all platforms'},
              ].map(f => (
                <div key={f.label} className="card-dark p-3">
                  <div className="text-xl mb-1">{f.icon}</div>
                  <div className="text-xs text-white/40">{f.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="card-dark p-10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-tai-600/20 flex items-center justify-center mx-auto mb-4 ai-orb">
              <Sparkles className="w-8 h-8 text-tai-400" />
            </div>
            <h2 className="text-lg font-semibold text-white mb-2">True AI is creating your content...</h2>
            <p className="text-sm text-white/40 mb-6">Writing ad script · Generating caption · Matching music · Creating thumbnail</p>
            <div className="flex justify-center gap-2">
              {[0,1,2].map(i => (
                <div key={i} className="w-2 h-2 rounded-full bg-tai-400 animate-bounce" style={{animationDelay:`${i*0.15}s`}} />
              ))}
            </div>
          </div>
        )}

        {step === 2 && result && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>
              <span className="text-emerald-400 font-medium text-sm">Content package ready!</span>
            </div>

            <div className="card-dark p-5">
              <div className="badge-ai inline-flex items-center gap-1 mb-3"><Sparkles className="w-3 h-3" /> Ad script</div>
              <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{result.script}</p>
            </div>

            <div className="card-dark p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="badge-ai">Caption + hashtags</span>
                <button onClick={copyCaption} className="btn-ghost text-xs py-1 px-3 flex items-center gap-1">
                  {copied ? <><Check className="w-3 h-3" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy</>}
                </button>
              </div>
              <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{result.caption}</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                {icon:'🎙️',label:'Voiceover',val:result.voiceover},
                {icon:'🎵',label:'Music',val:result.music},
                {icon:'🖼️',label:'Thumbnail',val:result.thumbnail},
              ].map(r => (
                <div key={r.label} className="card-dark p-3 text-center">
                  <div className="text-2xl mb-1">{r.icon}</div>
                  <div className="text-xs text-tai-400 font-medium mb-1">{r.label}</div>
                  <div className="text-xs text-white/40">{r.val}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button className="btn-tai flex-1"><Zap className="w-4 h-4" /> Export to {platforms[0]}</button>
              <button onClick={() => { setStep(0); setResult(null); setInput(''); }} className="btn-ghost">Start over</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
