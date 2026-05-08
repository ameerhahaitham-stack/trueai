'use client';
import { useState } from 'react';
import { Sparkles, Copy, RefreshCw, Globe, DollarSign, Megaphone, Lightbulb, Languages, Tag } from 'lucide-react';
import toast from 'react-hot-toast';

const TOOLS = [
  { id:'ad',       icon:Megaphone,  label:'Ad creator',        desc:'Write viral ad scripts' },
  { id:'caption',  icon:Tag,        label:'Caption maker',     desc:'Captions + hashtags' },
  { id:'ideas',    icon:Lightbulb,  label:'Content ideas',     desc:'AI content strategy' },
  { id:'price',    icon:DollarSign, label:'Price strategist',  desc:'Find the perfect price' },
  { id:'translate',icon:Languages,  label:'Translator',        desc:'Any language instantly' },
  { id:'bio',      icon:Globe,      label:'Bio writer',        desc:'Professional creator bio' },
];

const PLATFORMS = ['TikTok','Instagram','YouTube Shorts','Amazon','Alibaba Store'];
const LANGUAGES = ['Arabic','French','Spanish','German','Chinese','Hindi','Portuguese'];

export default function AssistantClient() {
  const [tool, setTool]   = useState('ad');
  const [input, setInput] = useState('');
  const [platform, setPlatform] = useState('TikTok');
  const [language, setLanguage] = useState('Arabic');
  const [tone, setTone]   = useState('Engaging');
  const [output, setOutput] = useState('');
  const [ideas, setIdeas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const current = TOOLS.find(t => t.id === tool)!;

  async function generate() {
    if (!input.trim()) { toast.error('Enter something first'); return; }
    setLoading(true); setOutput(''); setIdeas([]);
    try {
      const res = await fetch('/api/ai/generate', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ type:tool, input, platform, language, tone }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      if (tool === 'ideas') setIdeas(data.ideas || []);
      else setOutput(data.text || '');
    } catch(e:any) { toast.error(e.message || 'Failed'); }
    setLoading(false);
  }

  function copy() { navigator.clipboard.writeText(output); toast.success('Copied!'); }

  const PLACEHOLDERS: Record<string,string> = {
    ad:        'E.g. Mini portable blender — fits in your bag, makes smoothies in 30 seconds',
    caption:   'E.g. New product launch — sustainable bamboo phone stand',
    ideas:     'E.g. fitness, fashion, cooking, gaming, tech...',
    price:     'E.g. Wireless earbuds — cost me $8 to source from Alibaba',
    translate: 'Paste any text here to translate it...',
    bio:       'E.g. Fashion seller from Baghdad, selling eco-friendly products globally',
  };

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Tool list */}
      <div className="w-56 bg-surface-100 border-r border-white/5 p-3 flex flex-col gap-1">
        <p className="text-xs text-white/25 px-2 py-2 uppercase tracking-wider font-medium">AI Tools</p>
        {TOOLS.map(t => (
          <button key={t.id} onClick={() => { setTool(t.id); setOutput(''); setIdeas([]); }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 ${
              tool === t.id ? 'bg-tai-600/15 border border-tai-600/25' : 'hover:bg-white/5 border border-transparent'
            }`}>
            <t.icon className={`w-4 h-4 flex-shrink-0 ${tool === t.id ? 'text-tai-400' : 'text-white/30'}`} />
            <div>
              <div className={`text-sm font-medium ${tool === t.id ? 'text-white' : 'text-white/60'}`}>{t.label}</div>
              <div className="text-xs text-white/25">{t.desc}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Workspace */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <div className="flex items-center gap-3">
          <current.icon className="w-5 h-5 text-tai-400" />
          <h1 className="text-lg font-semibold text-white">{current.label}</h1>
          <span className="badge-ai">True AI</span>
        </div>

        <div className="card-dark p-5 space-y-4">
          {/* Platform selector */}
          {['ad','caption','ideas'].includes(tool) && (
            <div>
              <label className="block text-xs text-white/40 mb-2 font-medium">Platform</label>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map(p => (
                  <button key={p} onClick={() => setPlatform(p)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${platform===p?'bg-tai-600 text-white':'bg-white/5 text-white/50 hover:bg-white/10'}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Language selector */}
          {tool === 'translate' && (
            <div>
              <label className="block text-xs text-white/40 mb-2 font-medium">Translate to</label>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map(l => (
                  <button key={l} onClick={() => setLanguage(l)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${language===l?'bg-tai-600 text-white':'bg-white/5 text-white/50 hover:bg-white/10'}`}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs text-white/40 mb-2 font-medium">
              {tool==='ideas'?'Your niche':tool==='translate'?'Text to translate':tool==='bio'?'Describe yourself':'Describe your product'}
            </label>
            <textarea className="input-dark resize-none" rows={4}
              placeholder={PLACEHOLDERS[tool]}
              value={input} onChange={e => setInput(e.target.value)} />
          </div>

          <button onClick={generate} disabled={loading} className="btn-tai">
            {loading
              ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              : <><Sparkles className="w-4 h-4" /> Generate with True AI</>}
          </button>
        </div>

        {/* Output */}
        {output && (
          <div className="card-dark p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="badge-ai flex items-center gap-1"><Sparkles className="w-3 h-3" /> Output</span>
              <div className="flex gap-2">
                <button onClick={copy} className="btn-ghost flex items-center gap-1 py-1.5 px-3 text-xs"><Copy className="w-3 h-3" />Copy</button>
                <button onClick={generate} className="btn-ghost flex items-center gap-1 py-1.5 px-3 text-xs"><RefreshCw className="w-3 h-3" />Retry</button>
              </div>
            </div>
            <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{output}</p>
          </div>
        )}

        {/* Ideas grid */}
        {ideas.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {ideas.map((idea,i) => (
              <div key={i} className="card-dark p-4">
                <div className="font-medium text-white text-sm mb-1">{idea.title}</div>
                <div className="text-xs text-tai-400 mb-2">{idea.format}</div>
                {idea.hook && <div className="text-xs text-white/40 italic">Hook: {idea.hook}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
