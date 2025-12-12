import { createContext, useState, useRef, useCallback, useEffect } from 'react';

export const MusicContext = createContext();

// Default music source - using HTTPS to avoid mixed content issues
// This should be replaced with an actual music file uploaded to the project
const DEFAULT_MUSIC_SRC = 'https://cdn.pixabay.com/audio/2022/03/15/audio_11b0c2c41a.mp3';

export function MusicProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  // Initialize audio element once on mount. Volume is set separately
  // in a dedicated effect to avoid recreating the audio element.
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5; // Default volume
    // Set default music source
    audioRef.current.src = DEFAULT_MUSIC_SRC;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay blocked, will need user interaction
      });
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggle = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const setMusicSource = useCallback((src) => {
    if (audioRef.current) {
      const wasPlaying = isPlaying;
      audioRef.current.pause();
      audioRef.current.src = src;
      if (wasPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [isPlaying]);

  return (
    <MusicContext.Provider value={{
      isPlaying,
      volume,
      setVolume,
      play,
      pause,
      toggle,
      setMusicSource
    }}>
      {children}
    </MusicContext.Provider>
  );
}
