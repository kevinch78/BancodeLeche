import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBadgeProps {
  current: number;
  total: number;
  label?: string;
  isCompleted?: boolean;
}

export const ProgressBadge: React.FC<ProgressBadgeProps> = ({
  current,
  total,
  label = 'Estación',
  isCompleted = false,
}) => {
  // Ajuste visual: el punto 0 es "Inicio", 1 a 4 son "Estación 1-4", 5 es "Meta"
  const isStart = current === 0;
  const isGoal = current >= total - 1;

  let displayLabel = `${label} ${current} de ${total - 2}`;
  if (isStart) displayLabel = 'Punto de Partida 🌱';
  if (isGoal) displayLabel = '¡Meta Alcanzada! 🏆';

  const percentage = Math.round((current / (total - 1)) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/80 shadow-sm"
    >
      <div className="flex items-center gap-1.5">
        <span
          className={`w-2.5 h-2.5 rounded-full ${
            isGoal
              ? 'bg-amber-400 animate-ping'
              : isCompleted
                ? 'bg-blh-mint-500'
                : 'bg-blh-sky-400 animate-pulse'
          }`}
        />
        <span className="text-xs md:text-sm font-extrabold text-slate-700 tracking-tight">
          {displayLabel}
        </span>
      </div>

      <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-slate-200">
        <div className="w-14 h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blh-sky-400 via-blh-mint-400 to-blh-pink-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
        <span className="text-[11px] font-bold text-slate-500">{percentage}%</span>
      </div>
    </motion.div>
  );
};
