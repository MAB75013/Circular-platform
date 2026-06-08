'use client';
import { useAppStore } from '../lib/store';
import LoginPage from '../components/pages/LoginPage';
import AppShell from '../components/AppShell';

export default function Home() {
  const { currentUser } = useAppStore();
  return currentUser ? <AppShell /> : <LoginPage />;
}
