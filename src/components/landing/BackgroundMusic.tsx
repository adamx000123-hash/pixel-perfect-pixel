import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

import musicAsset from "@/assets/legend-bg-music.mp3.asset.json";
import { useI18n } from "@/lib/i18n";

/**
 * Plays background music. Browsers block autoplay with sound, so we:
 * 1. Try to play immediately (works if the browser allows it).
 * 2. Otherwise, start on the first user interaction (click, key, scroll, touch).
 * Includes a floating mute/unmute toggle.
 */
export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);
  const { lang } = useI18n();

  useEffect(() => {
    const audio = new Audio(musicAsset.url);
    audio.loop = true;
    audio.volume = 0.35;
    audio.preload = "auto";
    audioRef.current = audio;

    let unlocked = false;

    const tryPlay = () => {
      if (unlocked) return;
      audio
        .play()
        .then(() => {
          unlocked = true;
          setStarted(true);
          removeListeners();
        })
        .catch(() => {
          // Autoplay blocked — wait for first interaction.
        });
    };

    const onFirstInteraction = () => tryPlay();

    const events: (keyof WindowEventMap)[] = [
      "click",
      "pointerdown",
      "touchstart",
      "keydown",
      "scroll",
      "mousemove",
    ];

    const removeListeners = () => {
      events.forEach((e) => window.removeEventListener(e, onFirstInteraction));
    };

    // Attempt immediate autoplay, then arm interaction listeners.
    tryPlay();
    events.forEach((e) =>
      window.addEventListener(e, onFirstInteraction, { passive: true }),
    );

    return () => {
      removeListeners();
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  return (
    <button
      type="button"
      onClick={toggleMute}
      aria-label={
        lang === "ar"
          ? muted
            ? "تشغيل الموسيقى"
            : "كتم الموسيقى"
          : muted
            ? "Unmute music"
            : "Mute music"
      }
      className="fixed bottom-5 left-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-card/70 text-primary shadow-lg backdrop-blur-md transition-colors hover:bg-card"
    >
      {muted || !started ? (
        <VolumeX className="h-5 w-5" />
      ) : (
        <Volume2 className="h-5 w-5" />
      )}
    </button>
  );
}
