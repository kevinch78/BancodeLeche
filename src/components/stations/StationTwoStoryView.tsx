import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Play,
  Pause,
  Maximize2,
  Minimize2,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { CUENTO_SCENES, type CuentoScene, cuentoAudioUrl } from '../../config/cuentoViajeraData';
import { useFullscreen } from '../../hooks/useFullscreen';
import { mapBg } from '../../assets/images';

interface StationTwoStoryViewProps {
  onBackToMap: () => void;
  onCompleteAndAdvance: () => void;
}

export const StationTwoStoryView: React.FC<StationTwoStoryViewProps> = ({
  onBackToMap,
  onCompleteAndAdvance,
}) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isSceneAudioFinished, setIsSceneAudioFinished] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  const currentScene: CuentoScene = CUENTO_SCENES[currentSceneIndex] || CUENTO_SCENES[0];
  const isFirstScene = currentSceneIndex === 0;
  const isLastScene = currentSceneIndex === CUENTO_SCENES.length - 1;

  // Reproducir el fragmento de la escena
  const playSceneAudio = useCallback(
    (fromStart = false) => {
      const audio = audioRef.current;
      if (!audio || currentScene.isCover) return;

      if (fromStart || audio.currentTime < currentScene.startTime || audio.currentTime >= currentScene.endTime) {
        audio.currentTime = currentScene.startTime;
      }

      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsSceneAudioFinished(false);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    },
    [currentScene]
  );

  // Pausar audio
  const pauseAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }, []);

  // Al cambiar de escena
  const goToScene = useCallback(
    (index: number) => {
      if (index < 0 || index >= CUENTO_SCENES.length) return;
      const targetScene = CUENTO_SCENES[index];
      setCurrentSceneIndex(index);
      setIsSceneAudioFinished(false);

      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = targetScene.startTime;
        if (!targetScene.isCover) {
          audio
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        } else {
          audio.pause();
          setIsPlaying(false);
        }
      }
    },
    []
  );

  const handleNext = useCallback(() => {
    if (isLastScene) {
      pauseAudio();
      onCompleteAndAdvance();
    } else {
      goToScene(currentSceneIndex + 1);
    }
  }, [isLastScene, currentSceneIndex, goToScene, pauseAudio, onCompleteAndAdvance]);

  const handlePrev = useCallback(() => {
    if (currentSceneIndex > 0) {
      goToScene(currentSceneIndex - 1);
    }
  }, [currentSceneIndex, goToScene]);

  const handleReplayScene = useCallback(() => {
    playSceneAudio(true);
  }, [playSceneAudio]);

  const handleTogglePlayPause = useCallback(() => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playSceneAudio(false);
    }
  }, [isPlaying, pauseAudio, playSceneAudio]);

  // Listener del tiempo del audio
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || currentScene.isCover) return;

    const time = audio.currentTime;

    // Si alcanza el final de la escena actual -> pausar
    if (time >= currentScene.endTime) {
      audio.pause();
      audio.currentTime = currentScene.endTime;
      setIsPlaying(false);
      setIsSceneAudioFinished(true);
    }
  };

  // Atajos de teclado para facilitar charlas presenciales / facilitadora
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        handleReplayScene();
      } else if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        handleTogglePlayPause();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, handleReplayScene, handleTogglePlayPause, toggleFullscreen]);

  return (
    <div className="relative w-screen h-dvh max-h-dvh flex flex-col justify-between overflow-hidden select-none bg-gradient-to-b from-[#E0F2FE] via-[#FFF8F3] to-[#F0F9FF] text-[#3B2A5C]">
      {/* Elemento de Audio HTML5 */}
      <audio
        ref={audioRef}
        src={cuentoAudioUrl}
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => {
          setIsPlaying(false);
          setIsSceneAudioFinished(true);
        }}
      />

      {/* ======================================================== */}
      {/* 1. FONDO DE ESCENA ACUARELA SUAVE                         */}
      {/* ======================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <img
          src={mapBg}
          alt=""
          className="w-full h-full object-cover filter blur-[14px] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#E0F2FE]/80 via-[#FFF8F3]/70 to-[#E0F2FE]/80" />
      </div>

      {/* Barra de progreso súper fina en la parte superior (0px espacio ocupado) */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-sky-100/70 z-40">
        <motion.div
          className="h-full bg-gradient-to-r from-[#38BDF8] to-[#0284C7]"
          initial={false}
          animate={{ width: `${((currentSceneIndex + 1) / CUENTO_SCENES.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* ======================================================== */}
      {/* 2. HEADER SUPERIOR ULTRA COMPACTO (h-9 a h-11)           */}
      {/* ======================================================== */}
      <header className="relative z-30 w-full h-9 sm:h-11 px-2.5 sm:px-6 flex items-center justify-between pointer-events-auto shrink-0 max-w-7xl mx-auto pt-0.5">
        {/* Botón Volver al Mapa */}
        <button
          type="button"
          onClick={() => {
            pauseAudio();
            onBackToMap();
          }}
          className="min-h-[32px] min-w-[32px] w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/95 border border-white shadow-sm hover:bg-white text-[#0284C7] flex items-center justify-center transition-all duration-200 active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
          title="Volver al mapa"
          aria-label="Volver al mapa interactivo"
        >
          <ArrowLeft size={17} className="stroke-[2.5]" />
        </button>

        {/* Indicador Único y Dinámico de Escena (Reemplaza los 12 puntos) */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-[#38BDF8]/60 shadow-xs">
          <BookOpen size={13} className="text-[#0284C7]" />
          <span className="text-[11px] sm:text-xs md:text-sm font-black font-fredoka text-[#0284C7]">
            {isFirstScene ? 'Portada' : `Escena ${currentSceneIndex + 1} de 12`}
          </span>
          <span className="text-[10px] sm:text-[11px] font-bold text-[#6B4FA8] font-nunito px-1.5 py-0.2 rounded-full bg-[#E0F2FE]">
            {currentSceneIndex + 1}/12
          </span>
        </div>

        {/* Controles de Audio y Pantalla Completa (Sin botón de mute como se solicitó) */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* Botón Play / Pausa */}
          {!currentScene.isCover && (
            <button
              type="button"
              onClick={handleTogglePlayPause}
              className="min-h-[32px] min-w-[32px] w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/95 border border-white shadow-sm hover:bg-white text-[#0284C7] flex items-center justify-center transition-all duration-200 active:scale-95 outline-none"
              title={isPlaying ? 'Pausar narración (P)' : 'Reproducir narración (P)'}
              aria-label={isPlaying ? 'Pausar narración' : 'Reproducir narración'}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} className="translate-x-0.5" />}
            </button>
          )}

          {/* Botón Repetir fragmento de audio */}
          {!currentScene.isCover && (
            <button
              type="button"
              onClick={handleReplayScene}
              className="min-h-[32px] min-w-[32px] w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/95 border border-white shadow-sm hover:bg-white text-[#0284C7] flex items-center justify-center transition-all duration-200 active:scale-95 outline-none"
              title="Volver a escuchar esta lámina (R)"
              aria-label="Repetir narración"
            >
              <RotateCcw size={14} />
            </button>
          )}

          {/* Botón Pantalla Completa */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="min-h-[32px] min-w-[32px] w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 border border-white shadow-sm hover:bg-white text-slate-700 flex items-center justify-center transition-all duration-200 active:scale-95 outline-none"
            title={isFullscreen ? 'Salir de pantalla completa (F)' : 'Pantalla completa / Modo proyector (F)'}
            aria-label="Pantalla completa"
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 3. ESCENA PRINCIPAL: MÁXIMO ESPACIO PARA LA LÁMINA       */}
      {/*    Ocupa el 100% del alto restante sin recortar la imagen */}
      {/* ======================================================== */}
      <main className="relative z-20 w-full flex-1 min-h-0 flex items-center justify-center px-1 sm:px-3 pb-1 pt-0.5 overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScene.id}
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.985 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <img
                src={currentScene.image}
                alt={currentScene.title}
                className="max-h-[calc(100dvh-50px)] max-w-full w-auto h-auto object-contain rounded-xl sm:rounded-2xl shadow-[0_12px_32px_-6px_rgba(2,132,199,0.22)] border-2 border-white select-none pointer-events-auto"
                loading="eager"
                decoding="async"
              />
            </motion.div>
          </AnimatePresence>

          {/* ======================================================== */}
          {/* CONTROLES FLOTANTES LATERALES (No consumen espacio vertical) */}
          {/* ======================================================== */}

          {/* Flecha Lateral Izquierda (Anterior) */}
          {!isFirstScene && (
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-1.5 sm:left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 min-h-[42px] min-w-[42px] w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/90 hover:bg-white text-[#0284C7] shadow-lg hover:shadow-xl border-2 border-white backdrop-blur-sm flex items-center justify-center active:scale-90 transition-all duration-150 outline-none focus-visible:ring-3 focus-visible:ring-[#38BDF8]"
              title="Escena anterior (Flecha Izquierda)"
              aria-label="Ir a la escena anterior"
            >
              <ChevronLeft size={26} className="stroke-[2.8] -translate-x-0.5" />
            </button>
          )}

          {/* Flecha Lateral Derecha (Siguiente escena) */}
          {!isLastScene && !isFirstScene && (
            <button
              type="button"
              onClick={handleNext}
              className={`absolute right-1.5 sm:right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 min-h-[42px] min-w-[42px] w-11 h-11 sm:w-13 sm:h-13 rounded-full shadow-lg hover:shadow-xl border-2 border-white backdrop-blur-sm flex items-center justify-center active:scale-90 transition-all duration-150 outline-none focus-visible:ring-3 focus-visible:ring-[#38BDF8] ${
                isSceneAudioFinished
                  ? 'bg-gradient-to-r from-[#38BDF8] to-[#0284C7] text-white animate-pulse'
                  : 'bg-white/90 hover:bg-white text-[#0284C7]'
              }`}
              title="Siguiente escena (Flecha Derecha o Espacio)"
              aria-label="Avanzar a la siguiente escena"
            >
              <ChevronRight size={26} className="stroke-[2.8] translate-x-0.5" />
            </button>
          )}

          {/* Botón Flotante para la Portada (Escena 1) */}
          {isFirstScene && (
            <div className="absolute bottom-3 sm:bottom-5 z-30 flex items-center justify-center">
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 sm:px-8 sm:py-3 rounded-full bg-gradient-to-r from-[#38BDF8] via-[#0284C7] to-[#0369A1] text-white font-fredoka font-black text-sm sm:text-base md:text-lg flex items-center gap-2 shadow-[0_8px_24px_-4px_rgba(2,132,199,0.5)] hover:brightness-105 active:scale-95 transition-all duration-150 border-2 border-white outline-none"
              >
                <BookOpen size={20} />
                <span>Iniciar Cuento Ilustrado ▶</span>
              </button>
            </div>
          )}

          {/* Botón Flotante para la Última Escena (Escena 12: Completar Estación) */}
          {isLastScene && (
            <div className="absolute bottom-3 sm:bottom-5 z-30 flex items-center justify-center">
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 sm:px-8 sm:py-3 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white font-fredoka font-black text-sm sm:text-base md:text-lg flex items-center gap-2 shadow-[0_8px_24px_-4px_rgba(16,185,129,0.55)] hover:brightness-105 active:scale-95 transition-all duration-150 border-2 border-white outline-none animate-bounce"
              >
                <Sparkles size={20} className="text-yellow-300" />
                <span>¡Completar Estación 2 y Avanzar!</span>
                <Sparkles size={20} className="text-yellow-300" />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
