import { DDStatus, RecommendationLevel, Specialty } from '../lib/data';

export function LevelBadge({ level }: { level: RecommendationLevel }) {
  const labels: Record<RecommendationLevel, string> = { A:'Strongly recommended', B:'Recommended', C:'Conditional', D:'Limited' };
  return <span className={`badge badge-${level}`}>{level} — {labels[level]}</span>;
}

export function LevelDot({ level }: { level: RecommendationLevel }) {
  return <span className={`badge badge-${level}`}>{level}</span>;
}

export function DDStatusBadge({ status }: { status: DDStatus }) {
  const cls = status.replace(' ','_');
  return <span className={`badge badge-${cls}`}>{status}</span>;
}

export function SpecialtyBadge({ specialty }: { specialty: Specialty }) {
  return <span className={`badge badge-${specialty}`}>{specialty}</span>;
}
