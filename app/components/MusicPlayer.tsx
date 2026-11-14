
"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music2, Pause, Play, Volume2 } from "lucide-react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
      setError(false);
    } catch {
      setError(true);
      setPlaying(false);
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/birthday.mp3"
        loop
        preload="none"
        onEnded={() => setPlaying(false)}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />

      <div className="music-control">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleMusic}
          className="music-button"
          aria-label={playing ? "Pause music" : "Play music"}
          title={playing ? "Pause music" : "Play music"}
        >
          {playing ? <Pause size={18} /> : <Play size={18} />}
        </motion.button>

        <div className="music-label">
          <Volume2 size={12} />
          <span>
            {error
              ? "Add your music file"
              : playing
                ? "Playing a little melody"
                : "Play the music"}
          </span>
        </div>
      </div>
    </>
  );
}
