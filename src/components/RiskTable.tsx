import { useState, useMemo, useEffect } from 'preact/hooks';
import type { Risk } from '../data/risks';
import { risks as allRisks, risksById, tierCounts } from '../data/risks';
import { mitigationsByCode, groupNames } from '../data/mitigations';

const TIERS = ['Critical', 'High', 'Moderate', 'Emerging'] as const;
const AXES = ['OP', 'OR', 'SY'] as const;
const AXIS_LABELS: Record<string, string> = { OP: 'Operational', OR: 'Organizational', SY: 'Systemic' };
const AXIS_COLORS: Record<string, string> = { OP: 'text-operational', OR: 'text-organizational', SY: 'text-systemic' };
const TIER_PILLS: Record<string, string> = {
  Critical: 'bg-red-500/20 text-red-400 border-red-500/30',
  High: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  Moderate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Emerging: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
};

type Score = { applies: boolean; maturity: number };

export default function RiskTable({ mode }: { mode: 'browse' | 'score' }) {
  const [activeTiers, setActiveTiers] = useState<Set<string>>(new Set(mode === 'score' ? ['Critical'] : []));
  const [activeAxes, setActiveAxes] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, Score>>({});
  const [category, setCategory] = useState('');

  // Load scores from LocalStorage
  useEffect(() => {
    if (mode === 'score') {
      const saved = localStorage.getItem('three-lens-scores');
      if (saved) setScores(JSON.parse(saved));
    }
  }, [mode]);

  const saveScores = (s: Record<string, Score>) => {
    setScores(s);
    if (mode === 'score') localStorage.setItem('three-lens-scores', JSON.stringify(s));
  };

  const categories = useMemo(() => [...new Set(allRisks.map(r => r.category))].sort(), []);

  const filtered = useMemo(() => {
    let r = allRisks;
    if (activeTiers.size > 0) r = r.filter(x => activeTiers.has(x.tier));
    if (activeAxes.size > 0) r = r.filter(x => activeAxes.has(x.axis));
    if (category) r = r.filter(x => x.category === category);
    if (search) {
      const q = search.toLowerCase();
      r = r.filter(x => x.name.toLowerCase().includes(q) || x.description.toLowerCase().includes(q) || x.id.toLowerCase().includes(q));
    }
    return r;
  }, [activeTiers, activeAxes, category, search]);

  const toggleTier = (t: string) => {
    setActiveTiers(prev => { const n = new Set(prev); n.has(t) ? n.delete(t) : n.add(t); return n; });
  };
  const toggleAxis = (a: string) => {
    setActiveAxes(prev => { const n = new Set(prev); n.has(a) ? n.delete(a) : n.add(a); return n; });
  };

  const scoreCount = Object.values(scores).filter(s => s.maturity > 0).length;
  const actionPlan = useMemo(() => {
    if (mode !== 'score') return [];
    const tierOrder: Record<string, number> = { Critical: 0, High: 1, Moderate: 2, Emerging: 3 };
    return Object.entries(scores)
      .filter(([, s]) => s.applies && s.maturity > 0)
      .sort(([a], [b]) => {
        const ra = risksById[a]; const rb = risksById[b];
        if (!ra || !rb) return 0;
        const ta = tierOrder[ra.tier] ?? 9; const tb = tierOrder[rb.tier] ?? 9;
        if (ta !== tb) return ta - tb;
        return (scores[a].maturity || 5) - (scores[b].maturity || 5);
      })
      .map(([id]) => risksById[id]).filter(Boolean);
  }, [scores, mode]);

  return (
    <div class="w-full">
      {/* Filter bar */}
      <div class="card mb-6 space-y-3">
        <div class="flex flex-wrap gap-2 items-center">
          <span class="text-xs text-muted font-medium mr-1">Tier:</span>
          {TIERS.map(t => (
            <button key={t} onClick={() => toggleTier(t)}
              class={`filter-pill ${TIER_PILLS[t]} ${activeTiers.has(t) ? 'active ring-2 ring-white/20' : 'opacity-50'}`}>
              {t} ({tierCounts[t as keyof typeof tierCounts]})
            </button>
          ))}
        </div>
        <div class="flex flex-wrap gap-2 items-center">
          <span class="text-xs text-muted font-medium mr-1">Axis:</span>
          {AXES.map(a => (
            <button key={a} onClick={() => toggleAxis(a)}
              class={`filter-pill ${AXIS_COLORS[a]} ${activeAxes.has(a) ? 'active ring-2 ring-white/20' : 'opacity-50'}`}>
              {AXIS_LABELS[a]}
            </button>
          ))}
        </div>
        <div class="flex flex-wrap gap-3 items-center">
          <select value={category} onChange={e => setCategory((e.target as HTMLSelectElement).value)}
            class="bg-navy border border-divider rounded-lg px-3 py-1.5 text-xs text-muted focus:outline-none focus:border-white/30">
            <option value="">All categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input type="text" placeholder="Search risks..." value={search}
            onInput={e => setSearch((e.target as HTMLInputElement).value)}
            class="bg-navy border border-divider rounded-lg px-3 py-1.5 text-xs text-white placeholder-muted flex-1 min-w-[200px] focus:outline-none focus:border-white/30" />
          <span class="text-xs text-muted">{filtered.length} of 87 risks</span>
          {mode === 'score' && (
            <>
              <span class="text-xs text-action font-medium">{scoreCount} scored</span>
              <button onClick={() => { if (confirm('Clear all scores?')) { localStorage.removeItem('three-lens-scores'); setScores({}); }}}
                class="text-xs text-muted hover:text-critical transition-colors">Reset</button>
            </>
          )}
        </div>
      </div>

      {/* Score mode progress bar */}
      {mode === 'score' && (
        <div class="mb-4 bg-card rounded-full h-2 overflow-hidden">
          <div class="h-full bg-action transition-all duration-300 rounded-full" style={{ width: `${Math.round((scoreCount / 87) * 100)}%` }} />
        </div>
      )}

      {/* Risk table */}
      <div class="card overflow-hidden !p-0">
        <div class="overflow-x-auto">
          <table class="w-full risk-table">
            <thead>
              <tr>
                <th class="w-20">ID</th>
                <th class="w-16">Tier</th>
                <th class="w-28">Category</th>
                <th>Risk Name</th>
                {mode === 'score' && <th class="w-16 text-center">Applies?</th>}
                {mode === 'score' && <th class="w-16 text-center">Score</th>}
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <RiskRow key={r.id} risk={r} expanded={expanded === r.id}
                  onToggle={() => setExpanded(expanded === r.id ? null : r.id)}
                  mode={mode} score={scores[r.id] || { applies: false, maturity: 0 }}
                  onScoreChange={(s) => saveScores({ ...scores, [r.id]: s })} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Plan (score mode only) */}
      {mode === 'score' && actionPlan.length > 0 && (
        <div class="mt-8">
          <h2 class="section-title">Your Action Plan</h2>
          <div class="card overflow-hidden !p-0">
            <div class="overflow-x-auto">
              <table class="w-full risk-table">
                <thead>
                  <tr>
                    <th>Priority</th>
                    <th>ID</th>
                    <th>Tier</th>
                    <th>Risk</th>
                    <th>Score</th>
                    <th>Primary Mitigations</th>
                  </tr>
                </thead>
                <tbody>
                  {actionPlan.map((r, i) => (
                    <tr key={r.id}>
                      <td class="text-center text-sm text-muted">{i + 1}</td>
                      <td class="text-xs font-mono"><span class={AXIS_COLORS[r.axis]}>{r.id}</span></td>
                      <td><span class={`tier-badge ${TIER_PILLS[r.tier]}`}>{r.tier}</span></td>
                      <td class="text-sm text-white">{r.name}</td>
                      <td class="text-center text-sm text-white">{scores[r.id]?.maturity || '-'}</td>
                      <td class="text-xs text-muted">
                        {r.primary.map(m => {
                          const mit = mitigationsByCode[m];
                          return mit ? <span class="mr-2" title={mit.purpose}>{mit.code}</span> : m;
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div class="mt-4 text-center">
            <button onClick={() => {
              const csv = 'ID,Tier,Category,Name,Applies,Score,Primary Mitigations\n' +
                actionPlan.map(r => `${r.id},${r.tier},${r.category},"${r.name}",Y,${scores[r.id]?.maturity},"${r.primary.join('; ')}"`).join('\n');
              const blob = new Blob([csv], { type: 'text/csv' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a'); a.href = url; a.download = 'three-lens-action-plan.csv'; a.click();
            }} class="btn-primary text-sm">Export CSV</button>
          </div>
        </div>
      )}
    </div>
  );
}

function RiskRow({ risk, expanded, onToggle, mode, score, onScoreChange }: {
  risk: Risk; expanded: boolean; onToggle: () => void;
  mode: 'browse' | 'score'; score: Score;
  onScoreChange: (s: Score) => void;
}) {
  return (
    <>
      <tr onClick={onToggle}>
        <td class="text-xs font-mono"><span class={AXIS_COLORS[risk.axis]}>{risk.id}</span></td>
        <td><span class={`tier-badge ${TIER_PILLS[risk.tier]}`}>{risk.tier}</span></td>
        <td class="text-xs text-muted">{risk.category}</td>
        <td class="text-sm text-white font-medium">{risk.name}</td>
        {mode === 'score' && (
          <td class="text-center">
            <select value={score.applies ? 'Y' : 'N'}
              onChange={e => onScoreChange({ ...score, applies: (e.target as HTMLSelectElement).value === 'Y' })}
              class="bg-navy border border-divider rounded px-1.5 py-0.5 text-xs text-white focus:outline-none">
              <option value="N">N</option><option value="Y">Y</option>
            </select>
          </td>
        )}
        {mode === 'score' && (
          <td class="text-center">
            <select value={score.maturity || ''}
              onChange={e => onScoreChange({ ...score, maturity: parseInt((e.target as HTMLSelectElement).value) || 0 })}
              class="bg-navy border border-divider rounded px-1.5 py-0.5 text-xs text-white focus:outline-none">
              <option value="">-</option>
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </td>
        )}
      </tr>
      {expanded && (
        <tr>
          <td colspan={mode === 'score' ? 6 : 4} class="bg-card/50 border-b border-divider">
            <div class="p-4 space-y-3 text-sm">
              <div class="flex flex-wrap gap-3 items-center text-xs">
                <span class="text-muted">Status: <span class="text-white font-medium">{risk.status}</span></span>
                <span class="text-muted">Tier: <span class={`${AXIS_COLORS[risk.axis]}`}>{risk.tier}</span></span>
                {risk.primary.length > 0 && <span class="text-muted">Primary: <span class="text-white">{risk.primary.join(', ')}</span></span>}
              </div>
              <p class="text-muted leading-relaxed">{risk.description}</p>
              {risk.secondary.length > 0 && (
                <p class="text-xs text-muted">Secondary mitigations: <span class="text-white">{risk.secondary.join(', ')}</span></p>
              )}
              {risk.interactions.length > 0 && (
                <p class="text-xs text-operational">Cross-axis: {risk.interactions.map(([rid, desc]) => `${rid} — ${desc}`).join(' · ')}</p>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
