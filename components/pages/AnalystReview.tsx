'use client';
import { useState } from 'react';
import { useAppStore } from '../../lib/store';
import { Partner, DDStatus, RecommendationLevel } from '../../lib/data';
import { LevelDot, DDStatusBadge, SpecialtyBadge } from '../Badge';
import ScoreBar from '../ScoreBar';
import { Icon } from '../Icons';

export default function AnalystReview() {
  const { partners, updatePartner, addToast } = useAppStore();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const [scoreOverride, setScoreOverride] = useState(0);
  const [levelOverride, setLevelOverride] = useState<RecommendationLevel>('B');
  const [ddOverride, setDDOverride]       = useState<DDStatus>('Pending');

  const queue = partners.filter(p => p.ddStatus === 'Pending' || p.ddStatus === 'In review');
  const selected = partners.find(p => p.id === selectedId);

  const selectPartner = (p: Partner) => {
    setSelectedId(p.id);
    setNotes(p.analystNotes);
    setScoreOverride(p.totalScore);
    setLevelOverride(p.level);
    setDDOverride(p.ddStatus);
  };

  const handleSave = (action: 'approve' | 'request' | 'reject') => {
    if (!selectedId) return;
    const ddMap: Record<string, DDStatus> = { approve:'Complete', request:'In review', reject:'Rejected' };
    const newDD = ddMap[action];
    updatePartner(selectedId, {
      analystNotes: notes,
      totalScore: scoreOverride,
      level: levelOverride,
      ddStatus: newDD,
    });
    addToast(
      action === 'approve' ? `Partner approved — DD status set to Complete` :
      action === 'request' ? `Changes requested from partner` :
      `Partner rejected`,
      action === 'reject' ? 'error' : 'success'
    );
    setSelectedId(null);
  };

  return (
    <div className="animate-in" style={{ display:'grid', gridTemplateColumns:'1fr 420px', gap:16 }}>
      {/* Queue */}
      <div>
        <div className="card" style={{ marginBottom:16 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
            <div className="card-title" style={{ margin:0 }}>Submissions queue</div>
            <span className="tag">{queue.length} pending</span>
          </div>
          {queue.length === 0 ? (
            <div className="empty-state" style={{ padding:'32px 0' }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize:16, marginBottom:4 }}>Queue is clear</div>
              <div style={{ fontSize:11 }}>All submissions have been reviewed</div>
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Partner</th>
                  <th>Specialty</th>
                  <th>Status</th>
                  <th>Score</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {queue.map(p => (
                  <tr key={p.id} style={{ cursor:'pointer', background: selectedId === p.id ? 'var(--bg-subtle)' : undefined }}>
                    <td>
                      <div style={{ fontWeight:500, color:'var(--text-primary)', fontSize:12 }}>{p.name}</div>
                      <div style={{ fontSize:10, color:'var(--text-faint)' }}>{p.country}</div>
                    </td>
                    <td><SpecialtyBadge specialty={p.specialty} /></td>
                    <td><DDStatusBadge status={p.ddStatus} /></td>
                    <td style={{ width:100 }}><ScoreBar value={p.totalScore} /></td>
                    <td>
                      <button className="btn btn-sm" onClick={() => selectPartner(p)}>
                        Review <Icon.ChevronRight />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* All partners summary */}
        <div className="card">
          <div className="card-title">All partners</div>
          <table className="data-table">
            <thead><tr><th>Partner</th><th>Level</th><th>DD Status</th><th>Submitted</th></tr></thead>
            <tbody>
              {partners.map(p => (
                <tr key={p.id} style={{ cursor:'pointer' }} onClick={() => selectPartner(p)}>
                  <td>
                    <div style={{ fontWeight:500, color:'var(--text-primary)', fontSize:12 }}>{p.name}</div>
                    <div style={{ fontSize:10, color:'var(--text-faint)' }}>{p.region}</div>
                  </td>
                  <td><LevelDot level={p.level} /></td>
                  <td><DDStatusBadge status={p.ddStatus} /></td>
                  <td style={{ color:'var(--text-faint)', fontSize:11 }}>{p.submittedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review panel */}
      <div>
        {!selected ? (
          <div className="card" style={{ height:300, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ textAlign:'center', color:'var(--text-faint)' }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize:18, marginBottom:6 }}>Select a partner</div>
              <div style={{ fontSize:11 }}>Choose from the queue to begin review</div>
            </div>
          </div>
        ) : (
          <div className="card">
            <div style={{ marginBottom:20 }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize:20, color:'var(--text-primary)', marginBottom:3 }}>{selected.name}</div>
              <div style={{ fontSize:11, color:'var(--text-faint)' }}>{selected.country} · <span style={{ textTransform:'uppercase', letterSpacing:'0.04em' }}>{selected.specialty}</span></div>
            </div>

            <div className="form-group">
              <label className="form-label">Score adjustment (current: {selected.totalScore})</label>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <input type="range" min={0} max={100} step={1} value={scoreOverride} onChange={e => setScoreOverride(Number(e.target.value))} style={{ flex:1 }} />
                <span style={{ fontSize:16, fontFamily:'var(--font-display)', fontWeight:400, minWidth:36, color:'var(--text-primary)', textAlign:'right' }}>{scoreOverride}</span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Recommendation override</label>
              <select className="form-select" value={levelOverride} onChange={e => setLevelOverride(e.target.value as RecommendationLevel)}>
                <option value="A">A — Strongly recommended (≥ 85)</option>
                <option value="B">B — Recommended (70–84)</option>
                <option value="C">C — Conditional (50–69)</option>
                <option value="D">D — Limited relevance (0–49)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Due diligence status</label>
              <select className="form-select" value={ddOverride} onChange={e => setDDOverride(e.target.value as DDStatus)}>
                <option>Pending</option>
                <option>In review</option>
                <option>Complete</option>
                <option>Rejected</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom:24 }}>
              <label className="form-label">Analyst notes</label>
              <textarea className="form-textarea" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Add assessment notes, justification for override, or action items…" />
            </div>

            <div style={{ display:'flex', gap:8 }}>
              <button className="btn btn-primary" style={{ flex:1, justifyContent:'center' }} onClick={() => handleSave('approve')}>
                <Icon.Check /> Approve
              </button>
              <button className="btn" onClick={() => handleSave('request')}>
                <Icon.Send /> Request changes
              </button>
              <button className="btn btn-danger btn-sm" onClick={() => handleSave('reject')}>
                Reject
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
