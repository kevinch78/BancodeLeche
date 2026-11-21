import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WaypointCoordinates } from '../../types/route.types';
import { gotitaCuriosaImg } from '../../assets/images';

interface GotitaCharacterProps {
  coordinates: WaypointCoordinates;
  isTraveling: boolean;
  onArrive?: () => void;
  stationName?: string;
  stationIndex?: number;
}

export const GotitaCharacter: React.FC<GotitaCharacterProps> = ({
  coordinates,
  isTraveling,
  onArrive,
  stationName,
  stationIndex = 0,
}) => {
  const [imageError, setImageError] = useState(false);
  const gotitaImageUrl = gotitaCuriosaImg;

  // Frases emotivas según la estación o si está viajando
  const speechText = isTraveling
    ? '¡Allá vamos! 🏃‍♀️💨'
    : stationIndex === 0
      ? '¡Lista para explorar! 💧'
      : stationIndex === 1
        ? '¡Descubrí el calostro! ✨'
        : stationIndex === 2
          ? '¡Cadena de frío lista! ❄️'
          : stationIndex === 3
            ? '¡Valiente y pasteurizada! 🧩'
            : stationIndex === 4
              ? '¡Donar es amor puro! 💖'
              : '¡Llegamos al hospital! 🏁🏥';

  return (
    <motion.div
      className="absolute z-30 pointer-events-none -translate-x-1/2 -translate-y-[85%] flex flex-col items-center select-none"
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
      {/* ======================================================== */}
      {/* GLOBO DE DIÁLOGO TIERNO (Speech Bubble animado)          */}
      {/* ======================================================== */}
      <AnimatePresence mode="wait">
        <motion.div
          key={speechText}
          initial={{ opacity: 0, y: 4, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.25 }}
          className="relative mb-1 sm:mb-1.5 lg:mb-2 flex flex-col items-center"
        >
          <div className="px-2.5 py-0.5 sm:px-3 sm:py-1 lg:px-4 lg:py-1.5 rounded-2xl bg-white/95 backdrop-blur-md border-2 border-[#F6A6C9] shadow-md flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#E08A00] animate-ping shrink-0" />
            <span className="text-[10px] sm:text-xs md:text-sm lg:text-base font-fredoka font-black text-[#3B2A5C] whitespace-nowrap tracking-tight">
              {speechText}
            </span>
          </div>
          {/* Cola de la nube de diálogo */}
          <div className="w-2.5 h-2 bg-white border-r-2 border-b-2 border-[#F6A6C9] rotate-45 -mt-1 shadow-2xs" />
        </motion.div>
      </AnimatePresence>

      {/* ======================================================== */}
      {/* RASTRO DE CHISPAS Y GOTITAS DORADAS DURANTE EL VIAJE     */}
      {/* ======================================================== */}
      {isTraveling && (
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 pointer-events-none z-10">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 1, scale: 0.4, x: 0, y: 0 }}
              animate={{
                opacity: [1, 0.8, 0],
                scale: [0.4, 1.1, 0.6],
                x: (i % 2 === 0 ? -1 : 1) * (18 + i * 12),
                y: 12 + i * 10,
              }}
              transition={{
                repeat: Infinity,
                duration: 0.6,
                delay: i * 0.14,
                ease: 'easeOut',
              }}
              className="absolute text-xs sm:text-sm lg:text-base select-none"
            >
              {i % 2 === 0 ? '✨' : '💧'}
            </motion.div>
          ))}
        </div>
      )}

      {/* ======================================================== */}
      {/* CONTENEDOR DEL PERSONAJE CON BRINCO Y FLOTACIÓN          */}
      {/* Tamaño generoso y visible en computadores y proyectores   */}
      {/* ======================================================== */}
      <motion.div
        animate={
          isTraveling
            ? {
                y: [0, -18, 0],
                rotate: [0, -6, 6, 0],
                scale: [1, 1.08, 0.95, 1],
              }
            : {
                y: [0, -8, 0],
                rotate: [0, 2.5, -2.5, 0],
              }
        }
        transition={{
          repeat: Infinity,
          duration: isTraveling ? 0.42 : 2.4,
          ease: 'easeInOut',
        }}
        className="relative w-12 h-14 sm:w-16 sm:h-20 md:w-24 md:h-28 lg:w-32 lg:h-36 xl:w-36 xl:h-40 filter drop-shadow-[0_8px_18px_rgba(107,79,168,0.28)] flex items-center justify-center"
      >
        {!imageError ? (
          <img
            src={gotitaImageUrl}
            alt={stationName || 'La Gotita'}
            className="w-full h-full object-contain pointer-events-none"
            onError={() => setImageError(true)}
          />
        ) : (
          <GotitaVectorGraphic isTraveling={isTraveling} />
        )}
      </motion.div>

      {/* Sombra proyectada en el piso */}
      <motion.div
        animate={{
          scale: isTraveling ? [1, 0.5, 1] : [1, 0.85, 1],
          opacity: isTraveling ? [0.4, 0.15, 0.4] : [0.35, 0.2, 0.35],
        }}
        transition={{
          repeat: Infinity,
          duration: isTraveling ? 0.42 : 2.4,
          ease: 'easeInOut',
        }}
        className="w-12 sm:w-16 md:w-22 lg:w-28 xl:w-32 h-2.5 sm:h-3.5 lg:h-4 bg-slate-900/30 rounded-full blur-[3px] -mt-1 sm:-mt-2"
      />
    </motion.div>
  );
};

/**
 * Renderizado vectorial de respaldo para la Gotita
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
