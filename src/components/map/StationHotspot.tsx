import React from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import type { StationData } from '../../types/route.types';

interface StationHotspotProps {
  station: StationData;
  isCurrent: boolean;
  isUnlocked: boolean;
  isCompleted: boolean;
  onClick: () => void;
  debugMode?: boolean;
}

export const StationHotspot: React.FC<StationHotspotProps> = ({
  station,
  isCurrent,
  isUnlocked,
  isCompleted,
  onClick,
  debugMode = false,
}) => {
  const isClickable = isUnlocked || debugMode;
  const isGoal = station.type === 'goal';

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
      style={{
        left: `${station.coordinates.x}%`,
        top: `${station.coordinates.y}%`,
      }}
    >
      {/* Botón interactivo táctil amplio pero visualmente sutil y transparente */}
      <motion.button
        type="button"
        disabled={!isClickable}
        onClick={onClick}
        whileHover={isClickable ? { scale: 1.15 } : undefined}
        whileTap={isClickable ? { scale: 0.95 } : undefined}
        className={`relative flex items-center justify-center rounded-full transition-transform duration-200 cursor-pointer disabled:cursor-not-allowed select-none min-w-[44px] min-h-[44px] ${
          isGoal ? 'w-12 h-12 sm:w-14 sm:h-14' : 'w-10 h-10 sm:w-12 sm:h-12'
        }`}
        aria-label={`${station.name} (${station.numberLabel || 'Parada'})`}
      >
        {/* Aro indicador pulsante sutil sobre el camino morado */}
        {isCurrent && (
          <>
            <span className="absolute inset-0 rounded-full bg-blh-sky-400/30 animate-ping pointer-events-none" />
            <span className="absolute -inset-1 rounded-full border-2 border-blh-sky-400 animate-pulse pointer-events-none" />
          </>
        )}

        {/* Punto central discreto con brillo */}
        <div
          className={`flex items-center justify-center rounded-full shadow-md backdrop-blur-sm transition-all ${
            isGoal
              ? 'w-8 h-8 sm:w-10 sm:h-10 bg-amber-400/80 text-amber-950 border-2 border-white'
              : isCompleted
                ? 'w-7 h-7 sm:w-8 sm:h-8 bg-emerald-500/85 text-white border-2 border-white'
                : isCurrent
                  ? 'w-7 h-7 sm:w-8 sm:h-8 bg-blh-sky-500/90 text-white border-2 border-white'
                  : isUnlocked
                    ? 'w-6 h-6 sm:w-7 sm:h-7 bg-white/70 text-blh-pink-500 border border-blh-pink-300 hover:bg-white'
                    : 'w-5 h-5 sm:w-6 sm:h-6 bg-slate-300/40 border border-slate-300/60 opacity-60'
          }`}
        >
          {isCompleted ? (
            <Check size={14} className="stroke-[3.5]" />
          ) : isGoal ? (
            <Sparkles size={16} className="text-amber-950" />
          ) : isCurrent ? (
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
          ) : (
            <span className="text-[10px] sm:text-xs font-black">
              {station.type === 'start' ? '🌱' : station.index}
            </span>
          )}
        </div>
      </motion.button>

      {/* Etiqueta solo visible en Modo Debug para calibrar coordenadas */}
      {debugMode && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-emerald-300 text-[10px] font-mono px-1.5 py-0.5 rounded shadow border border-emerald-400/50 pointer-events-none whitespace-nowrap z-50">
          #{station.index}: {station.coordinates.x}%, {station.coordinates.y}%
        </div>
      )}
    </div>
  );
};
