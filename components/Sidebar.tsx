'use client';
import { useAppStore } from '../lib/store';
import { Icon } from './Icons';

type Page = 'dashboard' | 'partners' | 'analyst' | 'form' | 'settings';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (p: Page) => void;
}

const NAV_ITEMS: { id: Page; label: string; icon: keyof typeof Icon; roles: string[] }[] = [
  { id: 'dashboard', label: 'Dashboard',        icon: 'Dashboard', roles: ['Admin','Analyst','Maison'] },
  { id: 'partners',  label: 'Partner directory', icon: 'Users',     roles: ['Admin','Analyst','Maison'] },
  { id: 'analyst',   label: 'Analyst review',    icon: 'Clipboard', roles: ['Admin','Analyst'] },
  { id: 'form',      label: 'Qualification',     icon: 'Form',      roles: ['Admin','Analyst','Partner'] },
  { id: 'settings',  label: 'Settings',          icon: 'Settings',  roles: ['Admin'] },
];

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const { currentUser, logout } = useAppStore();
  const role = currentUser?.role || '';

  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-title">Circular Partner<br />Mapping</div>
        <div className="sidebar-brand-sub">Luxury Group · MVP</div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-label">Navigation</div>
        {NAV_ITEMS.filter(n => n.roles.includes(role)).map(item => {
          const IconComp = Icon[item.icon];
          return (
            <button
              key={item.id}
              className={`nav-item${currentPage === item.id ? ' active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <IconComp />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
          <div style={{ width:30, height:30, borderRadius:'50%', background:'rgba(196,169,142,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:500, color:'var(--taupe)', flexShrink:0 }}>
            {currentUser?.initials}
          </div>
          <div>
            <div style={{ fontSize:11, color:'var(--linen)', fontWeight:400, letterSpacing:'0.02em' }}>{currentUser?.name}</div>
            <div style={{ fontSize:9, color:'var(--umber)', letterSpacing:'0.1em', textTransform:'uppercase', marginTop:1 }}>{currentUser?.role}</div>
          </div>
        </div>
        <button className="btn btn-ghost btn-sm" style={{ color:'rgba(196,169,142,0.5)', width:'100%', justifyContent:'flex-start', fontSize:10, letterSpacing:'0.06em' }} onClick={logout}>
          <Icon.LogOut /> Sign out
        </button>
      </div>
    </div>
  );
}
