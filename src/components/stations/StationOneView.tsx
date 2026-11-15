import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles, MapPin, Check } from 'lucide-react';
import { ROUTE_STATIONS } from '../../config/routeData';
import { mapBg, gotitaCuriosaImg, gotitaImg } from '../../assets/images';

interface StationOneViewProps {
  onBackToMap: () => void;
  onCompleteAndAdvance: () => void;
}

// Tokens específicos de la Estación 1: La Gotita Curiosa (Acento Lila)
const E1_THEME = {
  accent: '#B79CE8',
  accentDark: '#6B4FA8',
  accentLight: '#F3EDFC',
  text: '#3B2A5C',
  textMuted: '#6E5C8A',
  badgeBg: '#EFE7FA',
  badgeBorder: 'rgba(183, 156, 232, 0.45)',
  shadowAccent: 'rgba(107, 79, 168, 0.22)',
};

export const StationOneView: React.FC<StationOneViewProps> = ({
  onBackToMap,
  onCompleteAndAdvance,
}) => {
  const station = ROUTE_STATIONS.find((s) => s.id === 'estacion-1');
  const questions = station?.dialogQuestions || [];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [imgError, setImgError] = useState<boolean>(false);

  const currentQ = questions[currentIndex] || questions[0];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleStepClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-screen h-dvh flex items-center justify-center overflow-hidden select-none bg-[#FFF8F3]">
      {/* ======================================================== */}
      {/* 1. FONDO DE ESCENA: Mapa Acuarela + Overlay Crema + Blur */}
      {/* ======================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Imagen del mapa original de fondo para continuidad de mundo */}
        <img
          src={mapBg}
          alt=""
          className="w-full h-full object-cover filter blur-[8px] scale-105 opacity-35"
        />

        {/* Overlay degradado cálido crema / lila muy sutil */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF8F3]/90 via-[#FFF8F3]/80 to-[#F6EDF8]/90" />

        {/* Capas decorativas sutiles: nubes acuarela y destellos flotantes */}
        <motion.div
          animate={{ y: [0, -14, 0], x: [0, 8, 0], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-8 left-[6%] w-44 h-20 rounded-full bg-white/70 blur-xl"
        />
        <motion.div
          animate={{ y: [0, -18, 0], x: [0, -10, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-16 right-[10%] w-56 h-24 rounded-full bg-[#B79CE8]/20 blur-2xl"
        />

        {/* Destellos y corazones tenues en el cielo */}
        <motion.div
          animate={{ y: [0, -16, 0], rotate: [-6, 6, -6], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 left-[18%] text-[#B79CE8]/60"
        >
          <Sparkles size={32} />
        </motion.div>
        <motion.div
          animate={{ y: [0, -22, 0], scale: [1, 1.1, 1], opacity: [0.25, 0.6, 0.25] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-24 right-[16%] text-[#F6A6C9]/60"
        >
          <Sparkles size={28} />
        </motion.div>
      </div>

      {/* ======================================================== */}
      {/* 2. CONTENEDOR PRINCIPAL RESPONSIVO (16:9 / FULL HEIGHT)   */}
      {/* ======================================================== */}
      <div
        className="relative flex flex-col justify-between p-4 sm:p-6 md:p-8 overflow-hidden z-10 w-full h-full max-w-[1500px]"
        style={{
          maxHeight: '100dvh',
        }}
      >
        {/* ======================================================== */}
        {/* HEADER: Volver al Mapa | Chip Estación | Camino Gotitas   */}
        {/* ======================================================== */}
        <header className="flex items-center justify-between gap-3 z-30 flex-shrink-0 w-full">
          {/* Botón Volver al mapa (pill con icono de mapa y elevación) */}
          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={onBackToMap}
            type="button"
            className="inline-flex items-center gap-2 min-h-[44px] px-4 sm:px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-md border border-[#B79CE8]/30 shadow-sm hover:shadow-md text-[#6B4FA8] hover:text-[#3B2A5C] transition-all cursor-pointer font-fredoka font-semibold text-xs sm:text-sm"
            aria-label="Volver al mapa interactivo"
          >
            <MapPin size={16} className="text-[#6B4FA8]" />
            <span>Volver al mapa</span>
          </motion.button>

          {/* Chip central de la estación */}
          <div className="flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#B79CE8]/40 shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B79CE8] animate-pulse" />
            <h1 className="text-xs sm:text-sm md:text-base font-bold text-[#3B2A5C] tracking-tight font-fredoka">
              1. <span className="text-[#6B4FA8]">La Gotita Curiosa</span>
            </h1>
          </div>

          {/* Camino de 5 gotitas conectadas por línea punteada */}
          <nav
            aria-label="Progreso de preguntas"
            className="flex items-center px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#B79CE8]/30 shadow-sm"
          >
            <div className="flex items-center relative">
              {/* Línea punteada que conecta las 5 gotitas */}
              <div className="absolute left-3 right-3 top-1/2 -translate-y-1/2 h-[2px] border-t-2 border-dashed border-[#B79CE8]/40 pointer-events-none" />

              {questions.map((_, idx) => {
                const isActive = idx === currentIndex;
                const isCompleted = idx < currentIndex;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleStepClick(idx)}
                    className={`relative z-10 min-w-[40px] min-h-[40px] w-10 h-10 mx-0.5 sm:mx-1 rounded-full flex items-center justify-center font-fredoka font-bold text-xs sm:text-sm transition-all cursor-pointer select-none ${
                      isActive
                        ? 'bg-[#B79CE8] text-white ring-4 ring-[#B79CE8]/30 scale-110 shadow-md shadow-[#B79CE8]/30'
                        : isCompleted
                          ? 'bg-[#6B4FA8] text-white shadow-sm'
                          : 'bg-white/80 text-[#6E5C8A] border-2 border-[#B79CE8]/40 hover:bg-white'
                    }`}
                    aria-label={`Pregunta ${idx + 1} de ${questions.length}${
                      isActive ? ' (actual)' : isCompleted ? ' (completada)' : ''
                    }`}
                    aria-current={isActive ? 'step' : undefined}
                  >
                    {isCompleted ? (
                      <Check size={16} className="stroke-[3] text-white" />
                    ) : (
                      <span>{idx + 1}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>
        </header>

        {/* ======================================================== */}
        {/* ESCENA PRINCIPAL (Izquierda 38% | Derecha 62%)           */}
        {/* ======================================================== */}
        <main className="flex-1 grid grid-cols-12 gap-4 sm:gap-8 items-center my-auto py-2 z-20 w-full">
          {/* ------------------------------------------------------ */}
          {/* COLUMNA IZQUIERDA (~38%): Gotita Detective sobre Isla  */}
          {/* ------------------------------------------------------ */}
          <div className="col-span-12 md:col-span-5 lg:col-span-5 flex flex-col items-center justify-center relative h-full">
            {/* Isla ilustrada orgánica de flores/pasto */}
            <div className="relative flex flex-col items-center">
              {/* Resplandor suave de la isla */}
              <div className="absolute -bottom-4 w-52 sm:w-64 md:w-80 h-14 bg-gradient-to-r from-[#BFEBDD]/60 via-[#FFE69A]/40 to-[#F6A6C9]/50 rounded-[50%] blur-xl pointer-events-none" />

              {/* Colina / montículo de pasto pastel ilustrado */}
              <div className="absolute -bottom-2 w-48 sm:w-60 md:w-72 h-10 bg-gradient-to-t from-[#BFEBDD] to-[#E2F7EF] rounded-[50%] border border-white/60 shadow-sm pointer-events-none flex items-center justify-around px-6 overflow-hidden">
                <span className="text-xs opacity-75">🌸</span>
                <span className="text-xs opacity-60">🌼</span>
                <span className="text-xs opacity-75">🌸</span>
              </div>

              {/* La Gotita Protagonista (Flotación idle suave y entrada) */}
              <motion.div
                initial={{ opacity: 0, x: -30, scale: 0.95 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  y: [0, -8, 0],
                }}
                transition={{
                  opacity: { duration: 0.6, ease: 'easeOut' },
                  x: { duration: 0.6, ease: 'easeOut' },
                  scale: { duration: 0.6, ease: 'easeOut' },
                  y: { duration: 3.6, repeat: Infinity, ease: 'easeInOut' },
                }}
                className="relative z-10 w-48 sm:w-56 md:w-72 lg:w-84 max-h-[48vh] flex items-center justify-center filter drop-shadow-[0_12px_24px_rgba(107,79,168,0.18)]"
              >
                <img
                  src={imgError ? gotitaImg : gotitaCuriosaImg}
                  alt="La Gotita Curiosa con lupa"
                  className="w-full h-full max-h-[46vh] object-contain pointer-events-none select-none"
                  onError={() => setImgError(true)}
                />
              </motion.div>

              {/* Sombra suave ovalada proyectada */}
              <motion.div
                animate={{ scale: [1, 0.88, 1], opacity: [0.35, 0.22, 0.35] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-36 sm:w-48 h-3.5 bg-[#6B4FA8]/20 rounded-full blur-[3px] mt-1 z-10"
              />
            </div>
          </div>

          {/* ------------------------------------------------------ */}
          {/* COLUMNA DERECHA (~62%): Glass Card Crema / Diálogo     */}
          {/* ------------------------------------------------------ */}
          <div className="col-span-12 md:col-span-7 lg:col-span-7 flex flex-col justify-center h-full max-h-full">
            <div className="relative w-full">
              {/* Pico orgánico del globo apuntando a la Gotita (mismo estilo glass) */}
              <div
                className="hidden md:block absolute top-1/2 -left-4 -translate-y-1/2 w-0 h-0 z-20 pointer-events-none"
                style={{
                  borderTop: '16px solid transparent',
                  borderBottom: '16px solid transparent',
                  borderRight: '18px solid rgba(255, 255, 255, 0.88)',
                }}
              />
              <div
                className="hidden md:block absolute top-1/2 -left-5 -translate-y-1/2 w-0 h-0 z-10 pointer-events-none"
                style={{
                  borderTop: '17px solid transparent',
                  borderBottom: '17px solid transparent',
                  borderRight: '20px solid rgba(183, 156, 232, 0.3)',
                }}
              />

              {/* Tarjeta de Pregunta tipo Glass Card translúcida */}
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="watercolor-glass-card rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 md:p-10 flex flex-col items-center justify-between min-h-[220px] sm:min-h-[270px] md:min-h-[300px]"
                style={{
                  boxShadow:
                    '0 16px 40px -10px rgba(107, 79, 168, 0.16), 0 4px 12px -2px rgba(107, 79, 168, 0.08)',
                }}
              >
                {/* Cinta / Etiqueta superior en color de acento Lila */}
                <div
                  className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full text-xs sm:text-sm font-fredoka font-bold uppercase tracking-wider shadow-sm mb-4"
                  style={{
                    backgroundColor: E1_THEME.badgeBg,
                    color: E1_THEME.accentDark,
                    border: `1.5px solid ${E1_THEME.badgeBorder}`,
                  }}
                >
                  <Sparkles size={14} className="text-[#6B4FA8]" />
                  <span>Pregunta {currentIndex + 1} de 5</span>
                </div>

                {/* Texto de la PREGUNTA: Grande, centrado y con contraste AA */}
                <div className="flex-1 flex items-center justify-center w-full px-2 sm:px-6 my-auto">
                  <AnimatePresence mode="wait">
                    <motion.h2
                      key={`question-title-${currentIndex}`}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-fredoka font-bold text-[#3B2A5C] text-center leading-[1.22] tracking-tight drop-shadow-sm select-text"
                    >
                      {currentQ.question}
                    </motion.h2>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* ======================================================== */}
            {/* CONTROLES INFERIORES: Botón Anterior y Siguiente Limpios */}
            {/* ======================================================== */}
            <div className="flex items-center justify-between gap-4 mt-4 sm:mt-5 pt-1 px-1">
              {/* Botón Secundario "Anterior" (discreto/ghost) */}
              <div>
                {currentIndex > 0 ? (
                  <motion.button
                    whileHover={{ scale: 1.03, x: -2 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={handlePrev}
                    className="inline-flex items-center gap-2 min-h-[48px] px-6 py-3 rounded-full bg-white/70 hover:bg-white text-[#6B4FA8] font-fredoka font-bold text-sm sm:text-base border border-[#B79CE8]/30 shadow-sm hover:shadow transition-all cursor-pointer"
                  >
                    <ArrowLeft size={18} />
                    <span>Anterior</span>
                  </motion.button>
                ) : (
                  <div className="w-24" />
                )}
              </div>

              {/* Botón Primario "Siguiente pregunta" o "Completar" (UNA sola flecha) */}
              <div>
                {!isLastQuestion ? (
                  <motion.button
                    whileHover={{ scale: 1.04, y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={handleNext}
                    className="group inline-flex items-center gap-2.5 min-h-[48px] sm:min-h-[52px] px-8 sm:px-10 py-3.5 rounded-full text-white font-fredoka font-bold text-sm sm:text-base md:text-lg shadow-lg cursor-pointer transition-all border-b-3 border-[#553C8B]"
                    style={{
                      background: 'linear-gradient(135deg, #B79CE8 0%, #6B4FA8 100%)',
                      boxShadow: '0 8px 24px -4px rgba(107, 79, 168, 0.38)',
                    }}
                  >
                    <span>Siguiente pregunta</span>
                    <motion.span className="inline-flex items-center transition-transform duration-200 group-hover:translate-x-1">
                      <ArrowRight size={20} className="stroke-[2.5]" />
                    </motion.span>
                  </motion.button>
                ) : (
                  /* En la pregunta 5: botón de completar y continuar ruta */
                  <motion.button
                    whileHover={{ scale: 1.04, y: -1 }}
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={onCompleteAndAdvance}
                    className="inline-flex items-center gap-2.5 min-h-[48px] sm:min-h-[52px] px-8 sm:px-10 py-3.5 rounded-full text-[#3B2A5C] font-fredoka font-bold text-sm sm:text-base md:text-lg shadow-xl cursor-pointer transition-all border-b-3 border-[#2CA37A]"
                    style={{
                      background: 'linear-gradient(135deg, #BFEBDD 0%, #7FE2C3 100%)',
                      boxShadow: '0 8px 26px -4px rgba(44, 163, 122, 0.35)',
                    }}
                  >
                    <span>¡Completar estación y seguir ruta!</span>
                    <Sparkles size={20} className="text-[#3B2A5C]" />
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
