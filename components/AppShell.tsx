'use client';
import { useState } from 'react';
import { useAppStore } from '../lib/store';
import Sidebar from './Sidebar';
import ToastContainer from './Toast';
import Dashboard from './pages/Dashboard';
import PartnerDirectory from './pages/PartnerDirectory';
import PartnerProfile from './pages/PartnerProfile';
import AnalystReview from './pages/AnalystReview';
import QualificationForm from './pages/QualificationForm';
import Settings from './pages/Settings';
import { Icon } from './Icons';

type Page = 'dashboard' | 'partners' | 'analyst' | 'form' | 'settings';

const PAGE_TITLES: Record<string, string> = {
  dashboard: 'Dashboard',
  partners:  'Partner directory',
  analyst:   'Analyst review',
  form:      'Qualification form',
  settings:  'Settings',
};

export default function AppShell() {
  const { currentUser } = useAppStore();
  const [page, setPage]         = useState<Page>(currentUser?.role === 'Partner' ? 'form' : 'dashboard');
  const [profileId, setProfileId] = useState<number | null>(null);

  const navigate = (p: Page) => { setPage(p); setProfileId(null); };

  const openProfile = (id: number) => setProfileId(id);
  const closeProfile = () => setProfileId(null);

  const displayTitle = profileId
    ? (useAppStore.getState().partners.find(p => p.id === profileId)?.name || 'Partner profile')
    : PAGE_TITLES[page] || '';

  return (
    <div className="app-shell">
      <Sidebar currentPage={page} onNavigate={navigate} />

      <div className="main-content">
        <div className="topbar">
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            {profileId && (
              <button className="btn btn-ghost btn-sm" onClick={closeProfile}>
                <Icon.ArrowLeft />
              </button>
            )}
            <h1 className="topbar-title">{displayTitle}</h1>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            {page === 'partners' && !profileId && (
              <button className="btn btn-primary btn-sm" onClick={() => navigate('form')}>
                <Icon.Plus /> Add partner
              </button>
            )}
          </div>
        </div>

        <div className="page-content">
          {profileId ? (
            <PartnerProfile partnerId={profileId} onBack={closeProfile} />
          ) : page === 'dashboard' ? (
            <Dashboard onViewPartner={openProfile} />
          ) : page === 'partners' ? (
            <PartnerDirectory onViewPartner={openProfile} />
          ) : page === 'analyst' ? (
            <AnalystReview />
          ) : page === 'form' ? (
            <QualificationForm />
          ) : page === 'settings' ? (
            <Settings />
          ) : null}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
