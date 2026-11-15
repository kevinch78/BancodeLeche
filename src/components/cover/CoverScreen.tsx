import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { ActionButton } from '../ui/ActionButton';
import { coverBg } from '../../assets/images';

interface CoverScreenProps {
  onStart: () => void;
}

export const CoverScreen: React.FC<CoverScreenProps> = ({ onStart }) => {
  const [imageError, setImageError] = useState(false);
  const coverBgUrl = coverBg;

  return (
    <div className="relative w-screen h-dvh overflow-hidden select-none flex items-center justify-center bg-gradient-to-b from-[#fce4ec] via-[#e1f5fe] to-[#e8f5e9]">
      {/* Contenedor dinámico 16:9 ajustado al 100% del viewport sin cortes ni márgenes sobrantes */}
      <div
        className="relative flex items-center justify-center overflow-hidden"
        style={{
          width: 'min(100vw, calc(100dvh * (16 / 9)))',
          height: 'min(100dvh, calc(100vw * (9 / 16)))',
          aspectRatio: '16 / 9',
        }}
      >
        {/* Ilustración de portada a pantalla completa sin deformación ni cortes */}
        {!imageError ? (
          <img
            src={coverBgUrl}
            alt="La Ruta de la Gotita - Portada"
            className="w-full h-full object-contain pointer-events-none block"
            onError={() => setImageError(true)}
          />
        ) : (
          <PlaceholderCoverGraphic />
        )}

        {/* Botón de Inicio limpio e integrado en la parte inferior central */}
        <div className="absolute inset-x-0 bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 z-20 flex flex-col items-center justify-center pointer-events-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 260, damping: 20 }}
          >
            <ActionButton
              size="xl"
              variant="pink"
              pulse
              onClick={onStart}
              icon={
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white text-blh-pink-500 flex items-center justify-center shadow-inner">
                  <Play size={22} className="fill-blh-pink-500 translate-x-0.5" />
                </div>
              }
              className="min-h-[48px] px-6 py-2.5 sm:px-8 sm:py-3.5 md:px-10 md:py-4 text-base sm:text-lg md:text-xl font-black shadow-bubble cursor-pointer"
            >
              ¡Iniciar la Aventura!
            </ActionButton>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/**
 * Gráfico Vectorial Ilustrado de Respaldo si no estuviera la imagen
 */
const PlaceholderCoverGraphic: React.FC = () => {
  return (
    <div className="w-full h-full bg-gradient-to-b from-sky-200 via-blh-sky-100 to-emerald-100 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      <div className="relative z-10 max-w-2xl px-4 mb-2">
        <span className="inline-block px-4 py-1 rounded-full bg-white/80 backdrop-blur-sm text-blh-hudn-blue font-black text-xs md:text-sm tracking-wider uppercase mb-2 shadow-sm">
          Aventura Educativa Interactiva
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-800 tracking-tight font-display drop-shadow-sm">
          La Ruta de la <span className="text-blh-sky-500">Gotita</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg font-bold text-slate-600 mt-2">
          Banco de Leche Humana • Hospital Universitario Departamental de Nariño
        </p>
      </div>
    </div>
  );
};
