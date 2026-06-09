'use client';
import { useMemo } from 'react';
import { useAppStore } from '../../lib/store';
import { PARTNERS, scoreColor } from '../../lib/data';
import { LevelDot, DDStatusBadge, SpecialtyBadge } from '../Badge';
import ScoreBar from '../ScoreBar';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';

interface Props { onViewPartner: (id: number) => void; }

const PALETTE = ['#2C1A0E','#6B4C35','#C4A98E','#D9CAB8'];

export default function Dashboard({ onViewPartner }: Props) {
  const { partners } = useAppStore();

  const stats = useMemo(() => ({
    total: partners.length,
    ab: partners.filter(p => p.level === 'A' || p.level === 'B').length,
    pending: partners.filter(p => p.ddStatus === 'Pending' || p.ddStatus === 'In review').length,
    countries: new Set(partners.map(p => p.country)).size,
  }), [partners]);

  const levelData = useMemo(() => {
    const counts = { A:0, B:0, C:0, D:0 };
    partners.forEach(p => counts[p.level]++);
    return [
      { name:'A', count:counts.A, fill: PALETTE[0] },
      { name:'B', count:counts.B, fill: PALETTE[1] },
      { name:'C', count:counts.C, fill: PALETTE[2] },
      { name:'D', count:counts.D, fill: PALETTE[3] },
    ];
  }, [partners]);

  const regionData = useMemo(() => {
    const counts: Record<string, number> = {};
    partners.forEach(p => { counts[p.region] = (counts[p.region] || 0) + 1; });
    return Object.entries(counts).map(([region, count], i) => ({ region, count, fill: PALETTE[i] }));
  }, [partners]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div style={{ background:'var(--ink)', color:'var(--linen)', padding:'8px 12px', borderRadius:'var(--r-sm)', fontSize:11 }}>
        {payload[0].payload.name || payload[0].payload.region}: <strong>{payload[0].value}</strong>
      </div>
    );
  };

  return (
    <div className="animate-in">
      {/* KPIs */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14, marginBottom:28 }}>
        {[
          { label:'Total partners', value: stats.total, sub:'across 3 regions' },
          { label:'A / B rated', value: stats.ab, sub:`${Math.round(stats.ab/stats.total*100)}% of portfolio` },
          { label:'Pending due diligence', value: stats.pending, sub:'requires action' },
          { label:'Countries covered', value: stats.countries, sub:'international reach' },
        ].map(k => (
          <div key={k.label} className="kpi-card">
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value">{k.value}</div>
            <div className="kpi-sub">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:24 }}>
        <div className="card">
          <div className="card-title">Recommendation distribution</div>
          <div className="chart-legend">
            {[{l:'A — Strongly recommended',c:PALETTE[0]},{l:'B — Recommended',c:PALETTE[1]},{l:'C — Conditional',c:PALETTE[2]},{l:'D — Limited',c:PALETTE[3]}].map(it=>(
              <div key={it.l} className="chart-legend-item"><span className="chart-legend-dot" style={{background:it.c}}/>{it.l}</div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={levelData} dataKey="count" cx="50%" cy="50%" outerRadius={70} innerRadius={40}>
                {levelData.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="card-title">Partners by region</div>
          <div className="chart-legend">
            {regionData.map((r,i) => (
              <div key={r.region} className="chart-legend-item"><span className="chart-legend-dot" style={{background:PALETTE[i]}}/>{r.region}</div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={regionData} barCategoryGap="40%">
              <XAxis dataKey="region" tick={{ fontSize:10, fill:'var(--text-faint)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize:10, fill:'var(--text-faint)' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[3,3,0,0]}>
                {regionData.map((e,i) => <Cell key={i} fill={e.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent submissions */}
      <div className="card">
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18 }}>
          <div className="card-title" style={{ margin:0 }}>Recent submissions</div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Region</th>
              <th>Specialty</th>
              <th>Level</th>
              <th>Due diligence</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {PARTNERS.slice(0, 7).map(p => (
              <tr key={p.id}>
                <td>
                  <button className="link-style" style={{ background:'none', border:'none', cursor:'pointer', fontFamily:'var(--font-body)', fontSize:12 }} onClick={() => onViewPartner(p.id)}>
                    {p.name}
                  </button>
                </td>
                <td style={{ color:'var(--text-faint)' }}>{p.region}</td>
                <td><SpecialtyBadge specialty={p.specialty} /></td>
                <td><LevelDot level={p.level} /></td>
                <td><DDStatusBadge status={p.ddStatus} /></td>
                <td style={{ width:140 }}><ScoreBar value={p.totalScore} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
