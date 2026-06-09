'use client';
import { useAppStore } from '../lib/store';
import { Icon } from './Icons';

export default function ToastContainer() {
  const { toasts, removeToast } = useAppStore();
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className="toast">
          {t.type === 'success' && <Icon.Check />}
          {t.type === 'error' && <Icon.X />}
          <span style={{ flex:1 }}>{t.message}</span>
          <button onClick={() => removeToast(t.id)} style={{ background:'none', border:'none', cursor:'pointer', color:'inherit', opacity:0.5, padding:0, display:'flex' }}>
            <Icon.X />
          </button>
        </div>
      ))}
    </div>
  );
}
