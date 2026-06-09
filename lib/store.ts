'use client';
import { create } from 'zustand';
import { DemoUser, DEMO_USERS, Partner, PARTNERS } from './data';

interface Toast { id: string; message: string; type?: 'success' | 'error' | 'info'; }

interface AppState {
  currentUser: DemoUser | null;
  partners: Partner[];
  toasts: Toast[];
  login: (user: DemoUser) => void;
  logout: () => void;
  updatePartner: (id: number, updates: Partial<Partner>) => void;
  addToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentUser: null,
  partners: PARTNERS,
  toasts: [],
  login: (user) => set({ currentUser: user }),
  logout: () => set({ currentUser: null }),
  updatePartner: (id, updates) =>
    set((s) => ({ partners: s.partners.map((p) => (p.id === id ? { ...p, ...updates } : p)) })),
  addToast: (message, type = 'success') => {
    const id = Math.random().toString(36).slice(2);
    set((s) => ({ toasts: [...s.toasts, { id, message, type }] }));
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 3500);
  },
  removeToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

export { DEMO_USERS };
