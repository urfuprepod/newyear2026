// Кастомный хук
import { useEffect, useRef, useState, useCallback } from "react";

export const useAudioPlayer = (src: string, block = false) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    // Инициализация аудио
    useEffect(() => {
        const audio = new Audio(src);
        audioRef.current = audio;
        if (!block) {
            audioRef.current.play();
        }

        // События
        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setCurrentTime(0);
        };

        audio.addEventListener("loadedmetadata", handleLoadedMetadata);
        audio.addEventListener("timeupdate", handleTimeUpdate);
        audio.addEventListener("ended", handleEnded);

        // Очистка при размонтировании
        return () => {
            audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
            audio.removeEventListener("timeupdate", handleTimeUpdate);
            audio.removeEventListener("ended", handleEnded);

            audio.pause();
            audio.currentTime = 0;
            audio.src = "";
        };
    }, [src]);

    // Воспроизведение/пауза
    const togglePlay = useCallback(() => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch((error) => {
                console.error("Playback error:", error);
            });
        }
        setIsPlaying(!isPlaying);
    }, [isPlaying]);

    // Остановка
    const stop = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    }, []);

    // Перемотка
    const seek = useCallback((time: number) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
        }
    }, []);

    // Изменение громкости
    const setVolume = useCallback((volume: number) => {
        if (audioRef.current) {
            audioRef.current.volume = Math.max(0, Math.min(1, volume));
        }
    }, []);

    return {
        isPlaying,
        duration,
        currentTime,
        togglePlay,
        stop,
        seek,
        setVolume,
    };
};
