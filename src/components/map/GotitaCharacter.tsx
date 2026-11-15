import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { WaypointCoordinates } from '../../types/route.types';
import { gotitaImg } from '../../assets/images';

interface GotitaCharacterProps {
  coordinates: WaypointCoordinates;
  isTraveling: boolean;
  onArrive?: () => void;
  stationName?: string;
}

export const GotitaCharacter: React.FC<GotitaCharacterProps> = ({
  coordinates,
  isTraveling,
  onArrive,
  stationName,
}) => {
  const [imageError, setImageError] = useState(false);
  const gotitaImageUrl = gotitaImg;

  return (
    <motion.div
      className="absolute z-30 pointer-events-none -translate-x-1/2 -translate-y-[85%] flex flex-col items-center"
      initial={false}
      animate={{
        left: `${coordinates.x}%`,
        top: `${coordinates.y}%`,
      }}
      transition={{
        type: 'spring',
        stiffness: 55,
        damping: 14,
        mass: 0.9,
      }}
      onAnimationComplete={() => {
        if (isTraveling && onArrive) {
          onArrive();
        }
      }}
    >
      {/* Etiqueta flotante sutil con el nombre del personaje */}
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="mb-0.5 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm border border-blh-sky-300 shadow-sm flex items-center gap-1"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-blh-sky-500 animate-ping" />
        <span className="text-[9px] sm:text-[10px] font-black text-blh-hudn-blue tracking-tight whitespace-nowrap">
          {stationName || 'La Gotita'}
        </span>
      </motion.div>

      {/* Contenedor del personaje con animación continua de flotación/brinco */}
      <motion.div
        animate={
          isTraveling
            ? {
                y: [0, -14, 0],
                rotate: [0, -5, 5, 0],
                scale: [1, 1.06, 0.96, 1],
              }
            : {
                y: [0, -6, 0],
                rotate: [0, 2, -2, 0],
              }
        }
        transition={{
          repeat: Infinity,
          duration: isTraveling ? 0.45 : 2.5,
          ease: 'easeInOut',
        }}
        className="relative w-11 h-13 sm:w-13 sm:h-16 md:w-15 md:h-18 filter drop-shadow-md flex items-center justify-center"
      >
        {!imageError ? (
          <img
            src={gotitaImageUrl}
            alt="Mascota Gotita"
            className="w-full h-full object-contain"
            onError={() => setImageError(true)}
          />
        ) : (
          <GotitaVectorGraphic isTraveling={isTraveling} />
        )}
      </motion.div>

      {/* Sombra proyectada en el piso */}
      <motion.div
        animate={{
          scale: isTraveling ? [1, 0.6, 1] : [1, 0.85, 1],
          opacity: isTraveling ? [0.4, 0.2, 0.4] : [0.35, 0.2, 0.35],
        }}
        transition={{
          repeat: Infinity,
          duration: isTraveling ? 0.45 : 2.5,
          ease: 'easeInOut',
        }}
        className="w-10 sm:w-14 h-3 bg-slate-900/30 rounded-full blur-[2px] -mt-1"
      />
    </motion.div>
  );
};

/**
 * Renderizado vectorial de respaldo para la Gotita (Ultra tierno y nítido)
 */
const GotitaVectorGraphic: React.FC<{ isTraveling: boolean }> = ({ isTraveling }) => {
  return (
    <svg viewBox="0 0 100 120" className="w-full h-full">
      <defs>
        <radialGradient id="dropShine" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#e0f2fe" />
          <stop offset="45%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </radialGradient>
      </defs>

      {/* Silueta de Gota */}
      <path
        d="M50 6 C50 6 16 55 16 82 C16 102 31 116 50 116 C69 116 84 102 84 82 C84 55 50 6 50 6 Z"
        fill="url(#dropShine)"
        stroke="#ffffff"
        strokeWidth="3.5"
      />

      {/* Brillo especular superior izquierdo */}
      <path d="M32 45 C36 34 45 25 50 22 C46 32 38 43 32 48 Z" fill="#ffffff" opacity="0.8" />

      {/* Ojos expresivos */}
      <ellipse cx="38" cy="74" rx="4.5" ry="6" fill="#0f172a" />
      <ellipse cx="62" cy="74" rx="4.5" ry="6" fill="#0f172a" />
      <circle cx="36" cy="71" r="1.8" fill="#ffffff" />
      <circle cx="60" cy="71" r="1.8" fill="#ffffff" />

      {/* Sonrosado de mejillas */}
      <circle cx="28" cy="82" r="5" fill="#f43f5e" opacity="0.55" />
      <circle cx="72" cy="82" r="5" fill="#f43f5e" opacity="0.55" />

      {/* Sonrisa alegre */}
      <path
        d={isTraveling ? 'M42 84 Q50 95 58 84' : 'M42 84 Q50 91 58 84'}
        stroke="#0f172a"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};
