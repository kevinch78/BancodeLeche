import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Volume2, VolumeX, ArrowRight, Sparkles } from 'lucide-react';
import { inicioVideo } from '../../assets/images';

interface IntroVideoScreenProps {
  onComplete: () => void;
}

export const IntroVideoScreen: React.FC<IntroVideoScreenProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [autoplayBlocked, setAutoplayBlocked] = useState<boolean>(false);

  // Intentar reproducir automáticamente con sonido
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setAutoplayBlocked(false);
        })
        .catch(() => {
          // Si el navegador bloqueó el autoplay con audio, intentamos muted o pedimos toque
          setAutoplayBlocked(true);
          setIsPlaying(false);
        });
    }
  }, []);

  // Actualizar barra de progreso
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
    if (video.duration) {
      setProgress((video.currentTime / video.duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      setDuration(video.duration);
    }
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => {
        setIsPlaying(true);
        setAutoplayBlocked(false);
      });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  // Al finalizar el video, pasar al mapa
  const handleVideoEnded = useCallback(() => {
    setTimeout(() => {
      onComplete();
    }, 400);
  }, [onComplete]);

  // Atajos de teclado: Espacio para play/pausa, Escape o Flecha para avanzar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        togglePlayPause();
      } else if (e.key === 'Escape' || e.key === 'ArrowRight') {
        e.preventDefault();
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onComplete]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="relative w-screen h-dvh overflow-hidden select-none bg-gradient-to-b from-[#E0F2FE] via-[#FFF8F3] to-[#FFE3F0] flex flex-col justify-between p-2.5 sm:p-4 md:p-6 text-[#3B2A5C]">
      {/* Fondo decorativo con burbujas de acuarela suave */}
      <div className="absolute inset-0 pointer-events-none opacity-45 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#BFEBDD]/50 blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-[#F6A6C9]/40 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 w-96 h-96 rounded-full bg-[#FFE69A]/40 blur-3xl" />
      </div>

      {/* ======================================================== */}
      {/* HEADER SUPERIOR: CHIP DE BIENVENIDA Y BOTÓN SALTAR      */}
      {/* ======================================================== */}
      <header className="relative z-30 w-full max-w-5xl mx-auto flex items-center justify-between pointer-events-auto h-11 shrink-0">
        {/* Chip institucional de bienvenida */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 border border-[#B79CE8]/40 shadow-xs backdrop-blur-md">
          <Sparkles size={14} className="text-[#E0A100]" />
          <span className="text-xs sm:text-sm font-black font-fredoka text-[#3B2A5C] tracking-tight">
            Bienvenida · La Ruta de la Gotita
          </span>
        </div>

        {/* Botón Saltar e ir directamente al mapa */}
        <button
          type="button"
          onClick={onComplete}
          className="inline-flex items-center gap-1.5 min-h-[38px] px-3.5 sm:px-4 py-1.5 rounded-full bg-white/95 hover:bg-white border border-[#B79CE8]/50 shadow-sm text-[#6B4FA8] hover:text-[#3B2A5C] font-fredoka font-bold text-xs sm:text-sm transition-all duration-200 active:scale-95 cursor-pointer outline-none focus-visible:ring-3 focus-visible:ring-[#B79CE8]"
          title="Saltar video e ir al mapa (Escape o Flecha Derecha)"
          aria-label="Saltar introducción e ir al mapa"
        >
          <span>Ir al mapa</span>
          <ArrowRight size={15} className="stroke-[2.5]" />
        </button>
      </header>

      {/* ======================================================== */}
      {/* CONTENEDOR DEL VIDEO: CENTRADO CON RELACIÓN DE ASPECTO   */}
      {/* ======================================================== */}
      <main className="relative z-20 w-full flex-1 min-h-0 flex items-center justify-center p-1 sm:p-2 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          onClick={togglePlayPause}
          className="relative max-h-[min(76dvh,540px)] w-auto max-w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_16px_40px_-8px_rgba(107,79,168,0.28)] border-3 border-white/90 bg-black cursor-pointer group flex items-center justify-center"
        >
          <video
            ref={videoRef}
            src={inicioVideo}
            playsInline
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleVideoEnded}
            className="w-full h-full object-contain pointer-events-none"
          />

          {/* Overlay de Pausa / Autoplay Bloqueado */}
          <AnimatePresence>
            {(!isPlaying || autoplayBlocked) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-slate-900/35 backdrop-blur-[2px] flex flex-col items-center justify-center text-white p-4"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#F6A6C9] to-[#6B4FA8] flex items-center justify-center shadow-lg border-2 border-white/90 mb-2 transform-gpu group-hover:scale-105 transition-transform">
                  <Play size={28} className="translate-x-0.5 text-white" />
                </div>
                <p className="font-fredoka font-black text-sm sm:text-base text-white drop-shadow-md">
                  {autoplayBlocked ? 'Toca para iniciar el video' : 'Continuar reproducción'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botón flotante para Silenciar / Activar audio en esquina del video */}
          <button
            type="button"
            onClick={toggleMute}
            className="absolute bottom-3 right-3 z-30 min-h-[36px] min-w-[36px] w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-900/70 hover:bg-slate-900/90 text-white backdrop-blur-md border border-white/40 flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm"
            title={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
            aria-label={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
          >
            {isMuted ? (
              <VolumeX size={17} className="text-slate-300" />
            ) : (
              <Volume2 size={17} className="text-white" />
            )}
          </button>
        </motion.div>
      </main>

      {/* ======================================================== */}
      {/* BARRA INFERIOR DE PROGRESO Y ACCIONES                    */}
      {/* ======================================================== */}
      <footer className="relative z-30 w-full max-w-3xl mx-auto shrink-0 flex flex-col items-center gap-1.5 pb-1">
        {/* Barra de progreso interactiva del video */}
        <div className="w-full flex items-center gap-3 px-2">
          <span className="text-[11px] sm:text-xs font-bold text-[#6B4FA8] font-nunito min-w-[32px] text-right">
            {formatTime(currentTime)}
          </span>

          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const ratio = Math.max(0, Math.min(1, clickX / rect.width));
              if (videoRef.current && videoRef.current.duration) {
                videoRef.current.currentTime = ratio * videoRef.current.duration;
              }
            }}
            className="flex-1 h-2 rounded-full bg-white/80 border border-[#B79CE8]/40 shadow-xs overflow-hidden cursor-pointer relative"
          >
            <motion.div
              className="h-full bg-gradient-to-r from-[#B79CE8] via-[#F6A6C9] to-[#FFD36E] rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear', duration: 0.1 }}
            />
          </div>

          <span className="text-[11px] sm:text-xs font-bold text-[#6B4FA8] font-nunito min-w-[32px]">
            {formatTime(duration)}
          </span>
        </div>

        {/* Mensaje de apoyo */}
        <div className="flex items-center gap-1.5 text-xs text-[#6B4FA8]/90 font-nunito font-semibold">
          <Sparkles size={13} className="text-[#E0A100]" />
          <span>Al terminar el video entraremos automáticamente al mapa</span>
        </div>
      </footer>
    </div>
  );
};
