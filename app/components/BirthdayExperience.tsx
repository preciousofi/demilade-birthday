"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Heart,
  Moon,
  Sparkles,
  Star,
  X,
  Mail,
  Gift,
} from "lucide-react";

import { birthday } from "@/data/birthday";
import Reveal from "./Reveal";
import MusicPlayer from "./MusicPlayer";

function Stars() {
  const reduceMotion = useReducedMotion();

  const stars = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    left: `${(i * 37 + 13) % 100}%`,
    top: `${(i * 23 + 7) % 100}%`,
    delay: (i % 7) * 0.35,
    size: 3 + (i % 3) * 2,
  }));

  return (
    <div className="stars-layer" aria-hidden="true">
      {stars.map((star) => (
        <motion.span
          key={star.id}
          className="star-dot"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
          }}
          animate={
            reduceMotion
              ? undefined
              : { opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }
          }
          transition={{
            duration: 3,
            delay: star.delay,
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}

function FloatingDecorations() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <div className="floating-decorations" aria-hidden="true">
      {["✧", "♡", "✿", "⋆", "✦", "♡", "✧"].map(
        (symbol, i) => (
          <motion.span
            key={i}
            className="floating-symbol"
            style={{ left: `${8 + i * 14}%` }}
            animate={{
              y: [0, -35, 0],
              rotate: [0, 15, -15, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 5 + i,
              delay: i * 0.5,
              repeat: Infinity,
            }}
          >
            {symbol}
          </motion.span>
        )
      )}
    </div>
  );
}

function WelcomeScreen({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.section
      className="welcome-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.9 }}
    >
      <Stars />

      <div className="welcome-moon">
        <Moon size={35} strokeWidth={1} />
      </div>

      <motion.div
        className="welcome-content"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <span className="eyebrow">
          {birthday.welcome.eyebrow}
        </span>

        <h1>{birthday.welcome.heading}</h1>

        <div className="little-divider">
          <span />
          <Heart size={14} />
          <span />
        </div>

        <p>{birthday.welcome.message}</p>

        <motion.button
          className="primary-button"
          onClick={onOpen}
          whileHover={{ y: -4, scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
        >
          {birthday.welcome.button}
          <Sparkles size={16} />
        </motion.button>

        <span className="welcome-footer">
          MADE WITH A LITTLE EXTRA LOVE ♡
        </span>
      </motion.div>

      <div className="welcome-bottom">
        A SPECIAL DAY FOR A SPECIAL SOUL
      </div>
    </motion.section>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      <div className="heading-decoration">✧ ── ♡ ── ✧</div>
    </Reveal>
  );
}

function BirthdayHero() {
  return (
    <section className="hero-section" id="home">
      <Stars />

      <div className="hero-moon" />
      <div className="hero-cloud cloud-one" />
      <div className="hero-cloud cloud-two" />

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1 }}
      >
        <span className="eyebrow">
          <Sparkles size={14} />
          {birthday.hero.eyebrow}
        </span>

        <h1>
          {birthday.hero.heading}
          <br />
          <span>{birthday.name}.</span>
        </h1>

        <p>{birthday.hero.message}</p>

        <a href="#celebration" className="hero-scroll">
          LET'S MAKE A WISH
          <ArrowDown size={15} />
        </a>
      </motion.div>

      <div className="hero-bottom">
        <span>13 NOVEMBER</span>
        <span>♡</span>
        <span>MADE JUST FOR YOU</span>
      </div>
    </section>
  );
}

function BirthdayCake() {
  const [wished, setWished] = useState(false);

  return (
    <section
      className="cake-section section-padding"
      id="celebration"
    >
      <SectionHeading
        eyebrow="A LITTLE BIRTHDAY MAGIC"
        title="Make a wish, Demilade."
        description="Take a moment, close your eyes and wish for something beautiful."
      />

      <Reveal className="cake-area">
        <div className="cake-glow" />

        <div className="cake">
          <div className="cake-candles">
            {[0, 1, 2].map((item) => (
              <motion.div
                key={item}
                className="candle"
                animate={
                  wished
                    ? { opacity: 0.3, scale: 0.8 }
                    : { opacity: [0.8, 1, 0.85] }
                }
                transition={{
                  duration: 0.7,
                  repeat: wished ? 0 : Infinity,
                  delay: item * 0.15,
                }}
              >
                <span className="flame" />
              </motion.div>
            ))}
          </div>

          <div className="cake-top">
            <span>♡</span>
          </div>

          <div className="cake-middle">
            <div className="icing-drips">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <span className="cake-decoration">✿</span>
          </div>

          <div className="cake-bottom" />
          <div className="cake-plate" />
        </div>

        <AnimatePresence>
          {wished && (
            <motion.div
              className="wish-result"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Sparkles size={18} />
              May this year bring your wishes to life. 💜
            </motion.div>
          )}
        </AnimatePresence>

        <button
          className="secondary-button"
          onClick={() => setWished(!wished)}
        >
          {wished ? "Light the candles again" : "Blow out the candles"}
          <Sparkles size={15} />
        </button>
      </Reveal>
    </section>
  );
}

function BirthdayLetter() {
  const [opened, setOpened] = useState(false);

  return (
    <section className="letter-section section-padding" id="letter">
      <SectionHeading
        eyebrow="SOME WORDS FROM THE HEART"
        title="A little letter for you."
        description="There are a few things I wanted you to know today."
      />

      <Reveal>
        <motion.button
          className="letter-envelope"
          onClick={() => setOpened(true)}
          whileHover={{ y: -8 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Open your birthday letter"
        >
          <div className="envelope-flap" />
          <div className="envelope-heart">
            <Heart fill="currentColor" size={32} />
          </div>
          <div className="envelope-label">
            FOR {birthday.name.toUpperCase()}
          </div>
        </motion.button>

        <p className="envelope-caption">
          <Mail size={14} />
          A little something written just for you
        </p>
      </Reveal>

      <AnimatePresence>
        {opened && (
          <motion.div
            className="letter-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpened(false)}
          >
            <motion.article
              className="letter-modal"
              initial={{ opacity: 0, y: 40, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 25, scale: 0.96 }}
              transition={{ duration: 0.45 }}
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Birthday letter"
            >
              <button
                className="close-letter"
                onClick={() => setOpened(false)}
                aria-label="Close letter"
              >
                <X size={19} />
              </button>

              <span className="letter-flower">✿</span>
              <span className="eyebrow">A LETTER FOR YOU</span>

              <h3>{birthday.letter.greeting}</h3>

              <div className="letter-paragraphs">
                {birthday.letter.paragraphs.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <div className="letter-signature">
                <span>{birthday.letter.signature}</span>
                <strong>{birthday.letter.signOff}</strong>
              </div>

              <Heart
                className="letter-bottom-heart"
                size={20}
                fill="currentColor"
              />
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ----------------------------------------
   VIDEO GALLERY
---------------------------------------- */

function VideoGallery() {
  const [selected, setSelected] = useState<number | null>(null);

  const currentVideo =
    selected === null ? null : birthday.gallery[selected];

  function changeVideo(direction: number) {
    if (selected === null) return;

    setSelected(
      (selected + direction + birthday.gallery.length) %
        birthday.gallery.length
    );
  }

  return (
    <section className="gallery-section section-padding" id="gallery">
      <SectionHeading
        eyebrow="A LITTLE COLLECTION"
        title="Moments worth replaying."
        description="A little corner of this birthday universe dedicated to you. Every moment deserves to be remembered."
      />

      <div className="gallery-grid">
        {birthday.gallery.map((video, index) => (
          <Reveal key={video.src} delay={index * 0.1}>
            <motion.button
              type="button"
              className="polaroid"
              style={
                {
                  "--photo-rotation": `${video.rotate ?? 0}deg`,
                } as CSSProperties
              }
              whileHover={{
                rotate: 0,
                y: -10,
                scale: 1.035,
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelected(index)}
              aria-label={`Play video: ${video.caption}`}
            >
              <div className="photo-frame video-frame">
                <video
                  src={video.src}
                  className="gallery-photo gallery-video"
                  muted
                  playsInline
                  preload="metadata"
                />

                <span className="video-play-button">
                  ▶
                </span>
              </div>

              <span className="photo-caption">
                {video.caption}
              </span>

              <span className="photo-heart">♡</span>
            </motion.button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {currentVideo && (
          <motion.div
            className="photo-overlay video-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <button
              className="photo-close"
              onClick={() => setSelected(null)}
              aria-label="Close video"
            >
              <X />
            </button>

            <button
              className="photo-arrow photo-prev"
              onClick={(event) => {
                event.stopPropagation();
                changeVideo(-1);
              }}
              aria-label="Previous video"
            >
              <ArrowLeft />
            </button>

            <motion.div
              key={currentVideo.src}
              className="photo-lightbox video-lightbox"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(event) => event.stopPropagation()}
            >
              <video
                key={currentVideo.src}
                src={currentVideo.src}
                className="lightbox-video"
                controls
                autoPlay
                playsInline
                preload="auto"
              />

              <p>{currentVideo.caption}</p>
            </motion.div>

            <button
              className="photo-arrow photo-next"
              onClick={(event) => {
                event.stopPropagation();
                changeVideo(1);
              }}
              aria-label="Next video"
            >
              <ArrowRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ReasonsSection() {
  return (
    <section className="reasons-section section-padding" id="reasons">
      <SectionHeading
        eyebrow="THE LITTLE THINGS"
        title="Things that make you, you."
        description="A few things I genuinely appreciate about you."
      />

      <div className="reasons-grid">
        {birthday.reasons.map((reason, index) => (
          <Reveal key={reason.title} delay={index * 0.08}>
            <motion.article
              className="reason-card"
              whileHover={{ y: -7, rotate: index % 2 ? 1 : -1 }}
            >
              <span className="reason-number">
                0{index + 1}
              </span>

              <span className="reason-symbol">
                {reason.symbol}
              </span>

              <h3>{reason.title}</h3>
              <p>{reason.text}</p>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FinalSurprise() {
  const [revealed, setRevealed] = useState(false);

  return (
    <section className="final-section section-padding" id="final">
      <Stars />

      <Reveal className="final-content">
        <div className="final-decoration">
          <Star size={16} />
          <Heart size={27} fill="currentColor" />
          <Star size={16} />
        </div>

        <span className="eyebrow">
          {birthday.closing.eyebrow}
        </span>

        <h2>{birthday.closing.heading}</h2>

        <p>{birthday.closing.message}</p>

        <motion.button
          className="primary-button"
          onClick={() => setRevealed(!revealed)}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.96 }}
        >
          {revealed ? "Keep this moment" : "One last thing"}
          <Heart size={16} />
        </motion.button>

        <AnimatePresence>
          {revealed && (
            <motion.div
              className="final-reveal"
              initial={{ opacity: 0, y: 25, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15 }}
            >
              <span>✧ ♡ ✧</span>
              <h3>{birthday.closing.final}</h3>
              <p>{birthday.closing.signature}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </Reveal>

      <footer className="site-footer">
        <div className="footer-line" />

        <p>Made with love and a little bit of magic</p>

        <span>
          FOR {birthday.name.toUpperCase()} · 13 NOVEMBER
        </span>

        <Heart size={14} fill="currentColor" />
      </footer>
    </section>
  );
}

export default function BirthdayExperience() {
  const [started, setStarted] = useState(false);

  return (
    <main className="birthday-site">
      <FloatingDecorations />

      <AnimatePresence>
        {!started && (
          <WelcomeScreen onOpen={() => setStarted(true)} />
        )}
      </AnimatePresence>

      {started && (
        <>
          <nav className="top-nav">
            <a href="#home" className="nav-logo">
              D<span>♡</span>
            </a>

            <div className="nav-links">
              <a href="#celebration">Celebrate</a>
              <a href="#letter">Letter</a>
              <a href="#gallery">Videos</a>
            </div>

            <a href="#final" className="nav-gift">
              For you <Gift size={14} />
            </a>
          </nav>

          <BirthdayHero />
          <BirthdayCake />
          <BirthdayLetter />
          <VideoGallery />
          <ReasonsSection />
          <FinalSurprise />

          <MusicPlayer />
        </>
      )}
    </main>
  );
}