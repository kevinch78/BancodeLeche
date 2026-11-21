import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Volume2,
  VolumeX,
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
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isSceneAudioFinished, setIsSceneAudioFinished] = useState<boolean>(false);
  const [audioCurrentTime, setAudioCurrentTime] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  const currentScene: CuentoScene = CUENTO_SCENES[currentSceneIndex] || CUENTO_SCENES[0];
  const isFirstScene = currentSceneIndex === 0;
  const isLastScene = currentSceneIndex === CUENTO_SCENES.length - 1;

  // Duración del fragmento de la escena actual
  const sceneDuration = currentScene.isCover
    ? 0
    : Math.max(1, currentScene.endTime - currentScene.startTime);

  // Progreso relativo dentro del fragmento de la escena actual (0 a 1)
  const sceneProgress = currentScene.isCover
    ? 0
    : Math.min(
        1,
        Math.max(
          0,
          (audioCurrentTime - currentScene.startTime) / sceneDuration
        )
      );

  // Reproducir el fragmento de la escena
  const playSceneAudio = useCallback(
    (fromStart = false) => {
      const audio = audioRef.current;
      if (!audio || !soundEnabled || currentScene.isCover) return;

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
    [currentScene, soundEnabled]
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
        if (!targetScene.isCover && soundEnabled) {
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
    [soundEnabled]
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
    setAudioCurrentTime(time);

    // Si alcanza el final de la escena actual -> PAUSAR AUTOMÁTICAMENTE
    if (time >= currentScene.endTime) {
      audio.pause();
      audio.currentTime = currentScene.endTime;
      setIsPlaying(false);
      setIsSceneAudioFinished(true);
    }
  };

  // Sincronizar estado de mute / volumen
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !soundEnabled;
    if (!soundEnabled && isPlaying) {
      audio.pause();
      setIsPlaying(false);
    }
  }, [soundEnabled, isPlaying]);

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
          className="w-full h-full object-cover filter blur-[12px] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#E0F2FE]/80 via-[#FFF8F3]/70 to-[#E0F2FE]/80" />
      </div>

      {/* ======================================================== */}
      {/* 2. HEADER SUPERIOR COMPACTO (48px - 52px)                */}
      {/* ======================================================== */}
      <header className="relative z-30 w-full h-11 sm:h-12 px-3 sm:px-6 flex items-center justify-between pointer-events-auto shrink-0 max-w-6xl mx-auto pt-1">
        {/* Botón Volver al Mapa */}
        <button
          type="button"
          onClick={() => {
            pauseAudio();
            onBackToMap();
          }}
          className="min-h-[38px] min-w-[38px] w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 border border-white shadow-sm hover:bg-white text-[#0284C7] flex items-center justify-center transition-all duration-200 active:scale-95 outline-none focus-visible:ring-3 focus-visible:ring-[#38BDF8]"
          title="Volver al mapa"
          aria-label="Volver al mapa interactivo"
        >
          <ArrowLeft size={19} className="stroke-[2.5]" />
        </button>

        {/* Chip Central de la Estación 2 */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-[#38BDF8] shadow-sm">
          <BookOpen size={14} className="text-[#0284C7]" />
          <span className="text-[11px] sm:text-xs md:text-sm font-black font-fredoka text-[#0284C7]">
            2 · La Gotita Viajera · Cuento
          </span>
          <span className="text-[10px] sm:text-xs font-bold text-[#6B4FA8] font-nunito px-1.5 py-0.2 rounded-full bg-[#E0F2FE]">
            {currentSceneIndex + 1}/12
          </span>
        </div>

        {/* Botones de Utilidad (Sonido y Pantalla Completa) */}
        <div className="flex items-center gap-1.5">
          {/* Alternar Sonido */}
          <button
            type="button"
            onClick={() => setSoundEnabled((prev) => !prev)}
            className="min-h-[38px] min-w-[38px] w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 border border-white shadow-sm hover:bg-white text-[#0284C7] flex items-center justify-center transition-all duration-200 active:scale-95 outline-none focus-visible:ring-3 focus-visible:ring-[#38BDF8]"
            title={soundEnabled ? 'Silenciar narración' : 'Activar narración'}
            aria-label={soundEnabled ? 'Silenciar narración' : 'Activar narración'}
          >
            {soundEnabled ? (
              <Volume2 size={18} className="stroke-[2.2] text-[#0284C7]" />
            ) : (
              <VolumeX size={18} className="stroke-[2.2] text-slate-400" />
            )}
          </button>

          {/* Pantalla Completa */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="hidden sm:flex min-h-[38px] min-w-[38px] w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 border border-white shadow-sm hover:bg-white text-slate-700 items-center justify-center transition-all duration-200 active:scale-95 outline-none"
            title={isFullscreen ? 'Salir de pantalla completa (F)' : 'Pantalla completa / Modo proyector (F)'}
            aria-label="Pantalla completa"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 3. ESCENA PRINCIPAL: LÁMINA DEL CUENTO (16:9 NÍTIDA)     */}
      {/* ======================================================== */}
      <main className="relative z-20 w-full flex-1 min-h-0 flex flex-col items-center justify-center px-3 sm:px-6 py-1 overflow-hidden">
        <div className="relative w-full h-full max-w-4xl flex flex-col items-center justify-center">
          {/* Contenedor con animación de transición suave entre láminas */}
          <div className="relative w-full flex-1 min-h-0 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScene.id}
                initial={{ opacity: 0, scale: 0.97, y: 4 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -4 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <img
                  src={currentScene.image}
                  alt={currentScene.title}
                  className="max-h-[min(65dvh,480px)] w-auto max-w-full object-contain rounded-2xl sm:rounded-3xl shadow-[0_12px_32px_-6px_rgba(2,132,199,0.25)] border-2 sm:border-3 border-white filter drop-shadow-sm transition-all"
                  loading="eager"
                  decoding="async"
                />

                {/* Badge flotante sutil con el título de la escena */}
                <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#38BDF8]/40 shadow-sm flex items-center gap-1.5 pointer-events-none">
                  <span className="text-xs">❄️</span>
                  <span className="text-[10px] sm:text-xs font-black font-fredoka text-[#0284C7] tracking-tight">
                    {currentScene.title}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ======================================================== */}
          {/* BARRA DE NARRACIÓN Y CONTROLES DEL SEGMENTO DE AUDIO    */}
          {/* ======================================================== */}
          {!currentScene.isCover && (
            <div className="w-full max-w-md mx-auto mt-1 sm:mt-1.5 px-3 py-1 sm:py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#38BDF8]/30 shadow-xs flex items-center justify-between gap-2.5">
              {/* Botón Play / Pausa del segmento */}
              <button
                type="button"
                onClick={handleTogglePlayPause}
                className="w-8 h-8 rounded-full bg-[#0284C7] text-white flex items-center justify-center shadow-xs hover:bg-[#0369A1] active:scale-95 transition-all outline-none"
                title={isPlaying ? 'Pausar narración (P)' : 'Reproducir narración (P)'}
                aria-label={isPlaying ? 'Pausar narración' : 'Reproducir narración'}
              >
                {isPlaying ? <Pause size={14} /> : <Play size={14} className="translate-x-0.5" />}
              </button>

              {/* Barra de progreso de la escena actual */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="w-full h-1.5 rounded-full bg-slate-200 overflow-hidden relative">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#38BDF8] to-[#0284C7] rounded-full"
                    style={{ width: `${sceneProgress * 100}%` }}
                    transition={{ ease: 'linear', duration: 0.1 }}
                  />
                </div>
                <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-bold text-[#6B4FA8]/80 font-nunito mt-0.5">
                  <span>
                    {isSceneAudioFinished
                      ? 'Narración pausada'
                      : isPlaying
                        ? 'Escuchando...'
                        : 'Pausa'}
                  </span>
                  <span>{currentScene.timeRangeLabel}</span>
                </div>
              </div>

              {/* Botón Repetir Narración */}
              <button
                type="button"
                onClick={handleReplayScene}
                className="h-7 px-2.5 rounded-full bg-[#E0F2FE] hover:bg-[#BAE6FD] text-[#0284C7] text-[10px] sm:text-xs font-bold font-fredoka flex items-center gap-1 transition-all active:scale-95 outline-none"
                title="Volver a escuchar esta página (R)"
                aria-label="Repetir narración de esta lámina"
              >
                <RotateCcw size={12} />
                <span className="hidden min-[380px]:inline">Repetir</span>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* ======================================================== */}
      {/* 4. FOOTER: TIMELINE Y BOTONERA DE AVANCE A SU RITMO      */}
      {/* ======================================================== */}
      <footer className="relative z-30 w-full max-w-xl mx-auto px-4 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1 flex flex-col gap-2 shrink-0">
        {/* Línea de Puntos Interactivos (1 a 12) */}
        <div className="flex items-center justify-center gap-1 sm:gap-1.5 py-0.5">
          {CUENTO_SCENES.map((scene, idx) => {
            const isCurrent = idx === currentSceneIndex;
            const isPassed = idx < currentSceneIndex;

            return (
              <button
                key={scene.id}
                type="button"
                onClick={() => goToScene(idx)}
                className={`transition-all duration-200 rounded-full flex items-center justify-center outline-none ${
                  isCurrent
                    ? 'w-6 sm:w-7 h-5 sm:h-5.5 bg-[#0284C7] text-white text-[10px] font-black shadow-xs ring-2 ring-[#38BDF8]/40'
                    : isPassed
                      ? 'w-2.5 sm:w-3 h-2.5 sm:h-3 bg-emerald-400 hover:bg-emerald-500'
                      : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
                title={`Ir a lámina ${idx + 1}: ${scene.title}`}
                aria-label={`Ir a lámina ${idx + 1}`}
              >
                {isCurrent && <span>{idx + 1}</span>}
              </button>
            );
          })}
        </div>

        {/* Fila de Botones: Anterior y Siguiente */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Botón Escena Anterior */}
          {!isFirstScene && (
            <button
              type="button"
              onClick={handlePrev}
              className="min-h-[44px] sm:min-h-[48px] px-3.5 sm:px-4 rounded-full border-2 border-[#38BDF8]/50 bg-white/95 text-[#0284C7] font-fredoka font-bold text-xs sm:text-sm flex items-center gap-1 shadow-xs hover:bg-[#F0F9FF] active:scale-95 transition-all outline-none"
              aria-label="Ir a la escena anterior"
            >
              <ArrowLeft size={16} />
              <span>Anterior</span>
            </button>
          )}

          {/* Botón Protagonista Siguiente / Completar */}
          <button
            type="button"
            onClick={handleNext}
            className={`flex-1 min-h-[44px] sm:min-h-[48px] px-5 py-2.5 rounded-full font-fredoka font-black text-xs sm:text-sm md:text-base flex items-center justify-center gap-2 shadow-md hover:brightness-105 active:scale-95 transition-all outline-none focus-visible:ring-3 ${
              isLastScene
                ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white shadow-[0_8px_20px_-4px_rgba(16,185,129,0.45)] focus-visible:ring-emerald-400'
                : isSceneAudioFinished
                  ? 'bg-gradient-to-r from-[#38BDF8] via-[#0284C7] to-[#0369A1] text-white shadow-[0_8px_20px_-4px_rgba(2,132,199,0.45)] animate-pulse focus-visible:ring-[#38BDF8]'
                  : 'bg-gradient-to-r from-[#38BDF8] via-[#0284C7] to-[#0369A1] text-white shadow-[0_8px_20px_-4px_rgba(2,132,199,0.35)] focus-visible:ring-[#38BDF8]'
            }`}
            aria-label={
              isLastScene
                ? 'Completar Estación 2 y avanzar a la Estación 3'
                : isFirstScene
                  ? 'Iniciar cuento ilustrado'
                  : 'Avanzar a la siguiente lámina'
            }
          >
            {isLastScene ? (
              <>
                <Sparkles size={18} className="text-yellow-300" />
                <span>¡Completar Estación 2 y Avanzar!</span>
                <Sparkles size={18} className="text-yellow-300" />
              </>
            ) : isFirstScene ? (
              <>
                <BookOpen size={18} />
                <span>Iniciar Cuento Ilustrado ▶</span>
              </>
            ) : (
              <>
                <span>Siguiente escena</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </footer>
    </div>
  );
};
