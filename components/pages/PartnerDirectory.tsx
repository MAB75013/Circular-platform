'use client';
import { useState, useMemo } from 'react';
import { useAppStore } from '../../lib/store';
import { Region, Specialty, RecommendationLevel, DDStatus } from '../../lib/data';
import { LevelDot, DDStatusBadge, SpecialtyBadge } from '../Badge';
import ScoreBar from '../ScoreBar';
import { Icon } from '../Icons';

interface Props { onViewPartner: (id: number) => void; }

export default function PartnerDirectory({ onViewPartner }: Props) {
  const { partners } = useAppStore();
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState<Region | ''>('');
  const [specialty, setSpecialty] = useState<Specialty | ''>('');
  const [level, setLevel]     = useState<RecommendationLevel | ''>('');
  const [ddStatus, setDDStatus] = useState<DDStatus | ''>('');
  const [view, setView]       = useState<'table' | 'cards'>('table');

  const filtered = useMemo(() => partners.filter(p => {
    const q = search.toLowerCase();
    return (
      (!q || p.name.toLowerCase().includes(q) || p.country.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) &&
      (!region    || p.region    === region) &&
      (!specialty || p.specialty === specialty) &&
      (!level     || p.level     === level) &&
      (!ddStatus  || p.ddStatus  === ddStatus)
    );
  }), [partners, search, region, specialty, level, ddStatus]);

  return (
    <div className="animate-in">
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
        <div className="search-wrap" style={{ flex:1 }}>
          <Icon.Search />
          <input className="search-input" placeholder="Search partners by name, country, or description…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="view-toggle">
          <button className={`view-btn${view==='table'?' active':''}`} onClick={() => setView('table')} title="Table view"><Icon.Table /></button>
          <button className={`view-btn${view==='cards'?' active':''}`} onClick={() => setView('cards')} title="Card view"><Icon.Grid /></button>
        </div>
      </div>

      <div className="filter-bar">
        {[
          { value:region,    set:setRegion,    opts:['EMEA','Americas','Asia'],           label:'All regions' },
          { value:specialty, set:setSpecialty, opts:['Reuse','Recycling','Mixed'],         label:'All specialties' },
          { value:level,     set:setLevel,     opts:['A','B','C','D'],                    label:'All levels' },
          { value:ddStatus,  set:setDDStatus,  opts:['Complete','In review','Pending','Rejected'], label:'All DD status' },
        ].map((f,i) => (
          <select key={i} className="filter-select" value={f.value} onChange={e => (f.set as any)(e.target.value)}>
            <option value="">{f.label}</option>
            {f.opts.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        ))}
        {(search||region||specialty||level||ddStatus) && (
          <button className="btn btn-ghost btn-sm" onClick={() => { setSearch(''); setRegion(''); setSpecialty(''); setLevel(''); setDDStatus(''); }}>
            Clear filters
          </button>
        )}
      </div>

      <div style={{ fontSize:11, color:'var(--text-faint)', marginBottom:14 }}>
        {filtered.length} partner{filtered.length !== 1 ? 's' : ''} found
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state card">
          <div style={{ fontSize:32, marginBottom:10 }}>◎</div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:18, marginBottom:6 }}>No partners found</div>
          <div style={{ fontSize:12 }}>Try adjusting your search or filters</div>
        </div>
      ) : view === 'table' ? (
        <div className="card" style={{ padding:0, overflow:'hidden' }}>
          <div style={{ overflowX:'auto' }}>
            <table className="data-table" style={{ minWidth:800 }}>
              <thead>
                <tr>
                  <th style={{ paddingLeft:24 }}>Company</th>
                  <th>Country</th>
                  <th>Specialty</th>
                  <th>Level</th>
                  <th>Due diligence</th>
                  <th>Reuse</th>
                  <th>Recycling</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} style={{ cursor:'pointer' }} onClick={() => onViewPartner(p.id)}>
                    <td style={{ paddingLeft:24 }}>
                      <div style={{ fontWeight:500, color:'var(--text-primary)', fontSize:12 }}>{p.name}</div>
                      <div style={{ fontSize:10, color:'var(--text-faint)', marginTop:1 }}>{p.legalName}</div>
                    </td>
                    <td style={{ color:'var(--text-faint)' }}>{p.country}</td>
                    <td><SpecialtyBadge specialty={p.specialty} /></td>
                    <td><LevelDot level={p.level} /></td>
                    <td><DDStatusBadge status={p.ddStatus} /></td>
                    <td style={{ width:110 }}><ScoreBar value={p.reuseScore} /></td>
                    <td style={{ width:110 }}><ScoreBar value={p.recyclingScore} /></td>
                    <td style={{ width:110 }}><ScoreBar value={p.totalScore} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="partners-grid">
          {filtered.map(p => (
            <div key={p.id} className="partner-card" onClick={() => onViewPartner(p.id)}>
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:10 }}>
                <div>
                  <div style={{ fontWeight:500, fontSize:13, color:'var(--text-primary)', marginBottom:2 }}>{p.name}</div>
                  <div style={{ fontSize:10, color:'var(--text-faint)' }}>{p.country} · {p.region}</div>
                </div>
                <LevelDot level={p.level} />
              </div>
              <div style={{ fontSize:11, color:'var(--text-muted)', lineHeight:1.5, marginBottom:14, minHeight:34 }}>
                {p.description.substring(0, 75)}…
              </div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
                <SpecialtyBadge specialty={p.specialty} />
                <DDStatusBadge status={p.ddStatus} />
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:10, color:'var(--text-faint)' }}>
                  <span style={{ width:56 }}>Reuse</span>
                  <ScoreBar value={p.reuseScore} />
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:8, fontSize:10, color:'var(--text-faint)' }}>
                  <span style={{ width:56 }}>Recycling</span>
                  <ScoreBar value={p.recyclingScore} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
