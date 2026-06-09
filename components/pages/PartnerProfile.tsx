'use client';
import { useAppStore } from '../../lib/store';
import { AUDIT_LOG, scoreColor } from '../../lib/data';
import { LevelBadge, DDStatusBadge, SpecialtyBadge } from '../Badge';
import ScoreBar from '../ScoreBar';
import { Icon } from '../Icons';

interface Props { partnerId: number; onBack: () => void; }

export default function PartnerProfile({ partnerId, onBack }: Props) {
  const { partners } = useAppStore();
  const p = partners.find(x => x.id === partnerId);
  if (!p) return null;

  const auditItems = AUDIT_LOG.filter(l => l.partnerId === partnerId);

  return (
    <div className="animate-in">
      {/* Header */}
      <div className="card" style={{ marginBottom:16 }}>
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:24 }}>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:'var(--font-display)', fontSize:28, fontWeight:400, color:'var(--text-primary)', marginBottom:4 }}>
              {p.name}
            </div>
            <div style={{ fontSize:11, color:'var(--text-faint)', marginBottom:12 }}>{p.legalName}</div>
            <div style={{ fontSize:12, color:'var(--text-muted)', lineHeight:1.7, maxWidth:520, marginBottom:16 }}>{p.description}</div>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', alignItems:'center' }}>
              <SpecialtyBadge specialty={p.specialty} />
              <span className="tag">{p.country}</span>
              <span className="tag">{p.region}</span>
              <DDStatusBadge status={p.ddStatus} />
              {p.website && (
                <a href={p.website} target="_blank" rel="noopener noreferrer" className="tag" style={{ display:'flex', alignItems:'center', gap:4, textDecoration:'none', color:'var(--text-muted)' }}>
                  <Icon.Globe />{p.website.replace('https://','').replace('http://','')}
                  <Icon.ExternalLink />
                </a>
              )}
            </div>
          </div>

          {/* Score circles */}
          <div style={{ display:'flex', gap:20, flexShrink:0 }}>
            {[
              { label:'Overall', val: p.totalScore, showLetter: true },
              { label:'Reuse',   val: p.reuseScore,     showLetter: false },
              { label:'Recycling', val: p.recyclingScore, showLetter: false },
            ].map(sc => (
              <div key={sc.label} style={{ textAlign:'center' }}>
                <div className={`score-circle${sc.showLetter ? ` sc-${p.level}` : ' sc-num'}`} style={{ margin:'0 auto 6px' }}>
                  {sc.showLetter ? p.level : sc.val}
                </div>
                <div style={{ fontSize:9, color:'var(--text-faint)', textTransform:'uppercase', letterSpacing:'0.1em' }}>{sc.label}</div>
                {sc.showLetter && <div style={{ fontSize:16, fontFamily:'var(--font-display)', color:'var(--text-primary)', marginTop:2 }}>{sc.val}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Score bars */}
        <div style={{ borderTop:'1px solid var(--border-faint)', marginTop:20, paddingTop:20, display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:16 }}>
          {[['Total score', p.totalScore], ['Reuse score', p.reuseScore], ['Recycling score', p.recyclingScore]].map(([label, val]) => (
            <div key={label as string}>
              <div style={{ fontSize:9, color:'var(--text-faint)', letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:8 }}>{label as string}</div>
              <ScoreBar value={val as number} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
        {/* Circular expertise */}
        <div className="card">
          <div className="card-title">Circular expertise</div>
          <dl style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {[
              ['Specialty', <SpecialtyBadge key="s" specialty={p.specialty} />],
              ['Experience', p.experience],
              ['Certifications', p.certifications.length ? p.certifications.join(', ') : '—'],
              ['Traceability', p.traceability],
              ['Reporting', p.reporting],
            ].map(([dt, dd]) => (
              <div key={dt as string}>
                <div style={{ fontSize:9, color:'var(--text-faint)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:3 }}>{dt as string}</div>
                <div style={{ fontSize:12, color:'var(--text-secondary)' }}>{dd}</div>
              </div>
            ))}
          </dl>
        </div>

        {/* Technical capabilities */}
        <div className="card">
          <div className="card-title">Technical capabilities</div>
          <dl style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {[
              ['Processing capacity', p.capacity],
              ['Materials handled', p.materials.join(', ')],
              ['Country of operation', p.country],
              ['Region', p.region],
              ['Website', p.website || '—'],
            ].map(([dt, dd]) => (
              <div key={dt as string}>
                <div style={{ fontSize:9, color:'var(--text-faint)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:3 }}>{dt as string}</div>
                <div style={{ fontSize:12, color:'var(--text-secondary)' }}>{dd as string}</div>
              </div>
            ))}
          </dl>
        </div>

        {/* Documents */}
        <div className="card">
          <div className="card-title">Due diligence documents</div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {[
              ['Legal registration certificate', 'verified'],
              ['Insurance certificate', p.ddStatus === 'Complete' ? 'verified' : 'pending'],
              ['Compliance documentation', p.ddStatus === 'Complete' ? 'verified' : 'pending'],
              ['Governance structure', p.ddStatus === 'Complete' ? 'verified' : 'not provided'],
            ].map(([name, status]) => (
              <div key={name} className="doc-item">
                <Icon.File />
                <span style={{ flex:1, color:'var(--text-secondary)' }}>{name}</span>
                <span style={{ fontSize:9, color: status === 'verified' ? '#6B8F3A' : 'var(--text-faint)', textTransform:'uppercase', letterSpacing:'0.08em' }}>{status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Analyst notes */}
        <div className="card">
          <div className="card-title">Analyst assessment</div>
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:9, color:'var(--text-faint)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:6 }}>Recommendation</div>
            <LevelBadge level={p.level} />
          </div>
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:9, color:'var(--text-faint)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:6 }}>Due diligence status</div>
            <DDStatusBadge status={p.ddStatus} />
          </div>
          <div>
            <div style={{ fontSize:9, color:'var(--text-faint)', textTransform:'uppercase', letterSpacing:'0.1em', marginBottom:6 }}>Notes</div>
            <div style={{ fontSize:12, color:'var(--text-secondary)', lineHeight:1.7, fontStyle:'italic', borderLeft:'2px solid var(--border-light)', paddingLeft:12 }}>
              {p.analystNotes}
            </div>
          </div>
        </div>

        {/* Audit trail */}
        <div className="card" style={{ gridColumn:'1/-1' }}>
          <div className="card-title">Audit trail</div>
          <div>
            {auditItems.length ? auditItems.map(a => (
              <div key={a.id} className="audit-item">
                <div className="audit-dot" />
                <div style={{ minWidth:90, color:'var(--text-faint)', fontSize:10 }}>{a.timestamp}</div>
                <div style={{ color:'var(--text-muted)', fontSize:11 }}>{a.actor}</div>
                <div style={{ color:'var(--text-secondary)', fontSize:11, flex:1 }}>— {a.action}</div>
              </div>
            )) : (
              <div style={{ fontSize:12, color:'var(--text-faint)' }}>No audit records yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
