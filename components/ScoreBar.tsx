import { scoreColor } from '../lib/data';
interface Props { value: number; max?: number; }
export default function ScoreBar({ value, max = 100 }: Props) {
  return (
    <div className="score-bar">
      <div className="score-track">
        <div className="score-fill" style={{ width:`${(value/max)*100}%`, background: scoreColor(value) }} />
      </div>
      <span className="score-val">{value}</span>
    </div>
  );
}
