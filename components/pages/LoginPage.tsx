'use client';
import { useState } from 'react';
import { useAppStore, DEMO_USERS } from '../../lib/store';
import { DemoUser } from '../../lib/data';

export default function LoginPage() {
  const { login } = useAppStore();
  const [email, setEmail] = useState('admin@groupe-luxe.com');
  const [err, setErr]   = useState('');

  const handleLogin = (user?: DemoUser) => {
    const u = user || DEMO_USERS.find(u => u.email === email);
    if (!u) { setErr('No account found for this email.'); return; }
    login(u);
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div style={{ position:'relative', zIndex:1, maxWidth:400 }}>
          <div style={{ fontFamily:'var(--font-display)', fontSize:11, color:'var(--taupe)', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:32 }}>
            Circular Economy Platform
          </div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:52, fontWeight:300, color:'var(--linen)', lineHeight:1.1, marginBottom:24, fontStyle:'italic' }}>
            Partner<br />Intelligence<br />Platform
          </div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:16, color:'rgba(196,169,142,0.65)', lineHeight:1.8, fontStyle:'italic' }}>
            Identify, qualify, and activate<br />circular economy partners<br />across global luxury operations.
          </div>
          <div style={{ marginTop:56, display:'flex', gap:32 }}>
            {[['12','Partners indexed'],['3','Regions covered'],['75%','A/B rated']].map(([val, label]) => (
              <div key={label}>
                <div style={{ fontFamily:'var(--font-display)', fontSize:28, fontWeight:300, color:'var(--linen)' }}>{val}</div>
                <div style={{ fontSize:9, color:'var(--umber)', letterSpacing:'0.12em', textTransform:'uppercase', marginTop:2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="login-right">
        <div style={{ width:'100%', maxWidth:360 }}>
          <div style={{ marginBottom:36 }}>
            <div style={{ fontFamily:'var(--font-display)', fontSize:28, fontWeight:400, color:'var(--text-primary)', marginBottom:6 }}>Welcome back</div>
            <div style={{ fontSize:12, color:'var(--text-faint)' }}>Sign in to access the platform</div>
          </div>
          <div className="form-group">
            <label className="form-label">Email address</label>
            <input className="form-input" type="email" value={email} onChange={e => { setEmail(e.target.value); setErr(''); }} />
          </div>
          <div className="form-group" style={{ marginBottom:24 }}>
            <label className="form-label">Password</label>
            <input className="form-input" type="password" defaultValue="••••••••" />
          </div>
          {err && <div style={{ fontSize:11, color:'#A32D2D', marginBottom:12 }}>{err}</div>}
          <button className="btn btn-primary btn-lg" style={{ width:'100%', justifyContent:'center', marginBottom:28 }} onClick={() => handleLogin()}>
            Sign in
          </button>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
            <div style={{ flex:1, height:1, background:'var(--border-faint)' }} />
            <span style={{ fontSize:9, color:'var(--text-faint)', letterSpacing:'0.12em', textTransform:'uppercase' }}>Demo access</span>
            <div style={{ flex:1, height:1, background:'var(--border-faint)' }} />
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
            {DEMO_USERS.map(u => (
              <button key={u.id} className="btn" style={{ justifyContent:'center', flexDirection:'column', gap:3, padding:'12px 8px', background:'var(--bg-subtle)' }} onClick={() => handleLogin(u)}>
                <div style={{ width:28, height:28, borderRadius:'50%', background:'var(--linen)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:10, fontWeight:500, color:'var(--espresso)', marginBottom:2 }}>
                  {u.initials}
                </div>
                <div style={{ fontSize:11, fontWeight:500 }}>{u.role}</div>
                <div style={{ fontSize:9, color:'var(--text-faint)', letterSpacing:'0.04em' }}>{u.name.split(' ')[0]}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
