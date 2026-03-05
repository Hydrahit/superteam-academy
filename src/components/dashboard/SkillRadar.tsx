'use client';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

const data = [
  { subject: 'Rust', A: 120, fullMark: 150 },
  { subject: 'Anchor', A: 98, fullMark: 150 },
  { subject: 'Frontend', A: 86, fullMark: 150 },
  { subject: 'Security', A: 99, fullMark: 150 },
  { subject: 'Ecosystem', A: 85, fullMark: 150 },
];

export const SkillRadar = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4">
      <h3 className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-[0.3em] mb-4">Skill_Matrix_v1.0</h3>
      <ResponsiveContainer width="100%" height="80%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#ffffff10" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#ffffff60', fontSize: 10, fontWeight: 'bold' }} />
          <Radar
            name="Skills"
            dataKey="A"
            stroke="#14F195"
            fill="#14F195"
            fillOpacity={0.5}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
