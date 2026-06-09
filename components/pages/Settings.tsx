'use client';
import { useState } from 'react';
import { useAppStore } from '../../lib/store';
import { DEMO_USERS, SCORING_CONFIG } from '../../lib/data';
import { Icon } from '../Icons';

export default function Settings() {
  const { addToast } = useAppStore();
  const [thresholds, setThresholds] = useState({ A:85, B:70, C:50 });
  const [activeTab, setActiveTab] = useState<'users'|'scoring'|'platform'>('users');

  const tabs: { id: typeof activeTab; label: string }[] = [
    { id:'users',    label:'Users & roles' },
    { id:'scoring',  label:'Scoring config' },
    { id:'platform', label:'Platform settings' },
  ];

  return (
    <div className="animate-in" style={{ maxWidth:860 }}>
      {/* Tabs */}
      <div style={{ display:'flex', gap:0, borderBottom:'1px solid var(--border-light)', marginBottom:28 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            padding:'10px 20px', background:'none', border:'none', cursor:'pointer',
            fontSize:12, color: activeTab === t.id ? 'var(--text-primary)' : 'var(--text-faint)',
            borderBottom: activeTab === t.id ? '2px solid var(--espresso)' : '2px solid transparent',
            fontFamily:'var(--font-body)', letterSpacing:'0.03em', fontWeight: activeTab === t.id ? 500 : 400,
            transition:'all 0.15s',
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'users' && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          <div className="card" style={{ gridColumn:'1/-1' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18 }}>
              <div className="card-title" style={{ margin:0 }}>Team members</div>
              <button className="btn btn-sm" onClick={() => addToast('Invite sent')}><Icon.Plus /> Invite user</button>
            </div>
            <table className="data-table">
              <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th></th></tr></thead>
              <tbody>
                {DEMO_USERS.map(u => (
                  <tr key={u.id}>
                    <td>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <div style={{ width:30, height:30, borderRadius:'50%', background:'var(--linen)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:500, color:'var(--espresso)', flexShrink:0 }}>
                          {u.initials}
                        </div>
                        <span style={{ fontWeight:500, color:'var(--text-primary)', fontSize:12 }}>{u.name}</span>
                      </div>
                    </td>
                    <td style={{ color:'var(--text-faint)', fontSize:11 }}>{u.email}</td>
                    <td><span className={`badge badge-${u.role.toLowerCase()}`} style={{ fontSize:9 }}>{u.role}</span></td>
                    <td><span style={{ fontSize:10, color:'#6B8F3A', textTransform:'uppercase', letterSpacing:'0.06em' }}>Active</span></td>
                    <td>
                      <button className="btn btn-ghost btn-sm" onClick={() => addToast(`Role updated for ${u.name}`)}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'scoring' && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          <div className="card">
            <div className="card-title">Recommendation thresholds</div>
            <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
              {[
                { key:'A' as const, label:'Level A — Strongly recommended', color:'#2C1A0E' },
                { key:'B' as const, label:'Level B — Recommended',          color:'#6B4C35' },
                { key:'C' as const, label:'Level C — Conditional',          color:'#C4A98E' },
              ].map(({ key, label, color }) => (
                <div key={key}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
                    <div>
                      <span className={`badge badge-${key}`} style={{ marginRight:8 }}>{key}</span>
                      <span style={{ fontSize:11, color:'var(--text-muted)' }}>{label}</span>
                    </div>
                    <span style={{ fontSize:13, fontFamily:'var(--font-display)', color:'var(--text-primary)' }}>≥ {thresholds[key]}</span>
                  </div>
                  <input type="range" min={0} max={100} step={1} value={thresholds[key]}
                    onChange={e => setThresholds(p => ({ ...p, [key]: Number(e.target.value) }))} />
                </div>
              ))}
            </div>
            <button className="btn btn-primary btn-sm" style={{ marginTop:20 }} onClick={() => addToast('Thresholds saved')}>
              <Icon.Check /> Save thresholds
            </button>
          </div>

          <div className="card">
            <div className="card-title">Scoring criteria weights</div>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {SCORING_CONFIG.criteria.map(c => (
                <div key={c.id}>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                    <span style={{ fontSize:11, color:'var(--text-secondary)' }}>{c.label}</span>
                    <span style={{ fontSize:12, fontFamily:'var(--font-display)', color:'var(--text-primary)' }}>{c.maxPoints} pts</span>
                  </div>
                  <div className="score-track" style={{ height:4 }}>
                    <div className="score-fill" style={{ width:`${(c.maxPoints/20)*100}%`, background:'var(--umber)' }} />
                  </div>
                </div>
              ))}
              <div style={{ fontSize:10, color:'var(--text-faint)', marginTop:4, textAlign:'right' }}>Total: 100 pts</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'platform' && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          <div className="card">
            <div className="card-title">General settings</div>
            <div className="form-group">
              <label className="form-label">Default language</label>
              <select className="form-select">
                <option>English</option><option>Français</option><option>Deutsch</option><option>Italiano</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Default region filter</label>
              <select className="form-select">
                <option>All regions</option><option>EMEA</option><option>Americas</option><option>Asia</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">GDPR data retention (months)</label>
              <input className="form-input" type="number" defaultValue={24} min={12} max={120} />
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => addToast('Settings saved')}><Icon.Check /> Save</button>
          </div>
          <div className="card">
            <div className="card-title">Regions & criteria</div>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {['EMEA','Americas','Asia'].map(r => (
                <div key={r} className="doc-item" style={{ justifyContent:'space-between' }}>
                  <span style={{ fontSize:12, color:'var(--text-secondary)' }}>{r}</span>
                  <button className="btn btn-ghost btn-sm">Edit criteria</button>
                </div>
              ))}
            </div>
            <button className="btn btn-sm" style={{ marginTop:12 }} onClick={() => addToast('Region added')}><Icon.Plus /> Add region</button>
          </div>
        </div>
      )}
    </div>
  );
}
