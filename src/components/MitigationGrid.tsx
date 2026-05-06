import { useState, useMemo } from 'preact/hooks';
import { mitigations, groupNames } from '../data/mitigations';

const GROUP_COLORS: Record<string, string> = {
  PL: 'border-emerald-500/30 bg-emerald-500/5',
  SE: 'border-blue-500/30 bg-blue-500/5',
  HI: 'border-amber-500/30 bg-amber-500/5',
  OG: 'border-red-500/30 bg-red-500/5',
  EX: 'border-violet-500/30 bg-violet-500/5',
};
const GROUP_TEXT: Record<string, string> = {
  PL: 'text-emerald-400', SE: 'text-blue-400', HI: 'text-amber-400', OG: 'text-red-400', EX: 'text-violet-400',
};

export default function MitigationGrid() {
  const [activeGroup, setActiveGroup] = useState<string>('');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let m = mitigations;
    if (activeGroup) m = m.filter(x => x.group === activeGroup);
    if (search) {
      const q = search.toLowerCase();
      m = m.filter(x => x.name.toLowerCase().includes(q) || x.purpose.toLowerCase().includes(q) || x.code.toLowerCase().includes(q));
    }
    return m;
  }, [activeGroup, search]);

  return (
    <div>
      <div class="flex flex-wrap gap-2 items-center mb-6">
        <button onClick={() => setActiveGroup('')} class={`filter-pill ${activeGroup === '' ? 'active bg-white/10' : 'text-muted'}`}>All</button>
        {Object.entries(groupNames).map(([k, v]) => (
          <button key={k} onClick={() => setActiveGroup(k)}
            class={`filter-pill ${GROUP_TEXT[k]} ${activeGroup === k ? 'active ring-2 ring-white/20' : 'opacity-50'}`}>
            {k} — {v.split(' &')[0]}
          </button>
        ))}
        <input type="text" placeholder="Search techniques..." value={search}
          onInput={e => setSearch((e.target as HTMLInputElement).value)}
          class="ml-auto bg-navy border border-divider rounded-lg px-3 py-1.5 text-xs text-white placeholder-muted w-48 focus:outline-none focus:border-white/30" />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(m => (
          <div key={m.code} class={`card border ${GROUP_COLORS[m.group]} relative`}>
            {m.firstFive && (
              <span class="absolute top-2 right-2 text-[10px] font-bold text-action bg-action/10 px-1.5 py-0.5 rounded">FIRST FIVE</span>
            )}
            <div class="flex items-center gap-2 mb-2">
              <span class={`text-sm font-mono font-bold ${GROUP_TEXT[m.group]}`}>{m.code}</span>
              <span class={`text-[10px] uppercase tracking-wider text-muted`}>{m.group}</span>
            </div>
            <h3 class="text-white font-semibold text-sm mb-1">{m.name}</h3>
            <p class="text-muted text-xs leading-relaxed">{m.purpose}</p>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p class="text-muted text-center py-12">No mitigations match your filters.</p>
      )}
    </div>
  );
}
