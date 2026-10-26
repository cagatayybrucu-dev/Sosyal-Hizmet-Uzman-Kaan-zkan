import { useCallback, useEffect, useRef, useState } from "react";
import openingImage from "../assets/opening-silent-threshold-v1.jpg";
import "./SilentThresholdIntro.css";

// App.jsx keeps the original opening available for local comparison and rollback.
export default function SilentThresholdIntro({ onComplete }) {
  const imageRef = useRef(null);
  const skipRef = useRef(null);
  const completeRef = useRef(onComplete);
  const closingRef = useRef(false);
  const [imageReady, setImageReady] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    completeRef.current = onComplete;
  }, [onComplete]);

  const leave = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setLeaving(true);
  }, []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference.matches);
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousOverscroll = document.body.style.overscrollBehavior;
    const onKeyDown = (event) => {
      if (event.key === "Escape") leave();
      if (event.key === "Tab") {
        event.preventDefault();
        skipRef.current?.focus();
      }
    };
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    document.addEventListener("keydown", onKeyDown);
    if (imageRef.current?.complete && imageRef.current.naturalWidth) {
      setImageReady(true);
    }
    // A slow or failed image must never keep the site behind an opening screen.
    const safetyTimer = window.setTimeout(leave, 5500);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior = previousOverscroll;
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(safetyTimer);
    };
  }, [leave]);

  useEffect(() => {
    if (!imageReady) return;
    const timer = window.setTimeout(leave, reducedMotion ? 700 : 2700);
    return () => window.clearTimeout(timer);
  }, [imageReady, reducedMotion, leave]);

  useEffect(() => {
    if (!leaving) return;
    const timer = window.setTimeout(() => completeRef.current(), reducedMotion ? 150 : 1000);
    return () => window.clearTimeout(timer);
  }, [leaving, reducedMotion]);

  const finishTransition = (event) => {
    if (event.target === event.currentTarget && event.propertyName === "opacity" && leaving) {
      completeRef.current();
    }
  };

  return (
    <section
      className={`silentThreshold ${imageReady ? "silentThreshold--ready" : ""} ${leaving ? "silentThreshold--leaving" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Kaan Özkan, aile danışmanlığı. Açılış."
      onTransitionEnd={finishTransition}
    >
      <div className="silentThreshold__scene" aria-hidden="true">
        <img
          ref={imageRef}
          className="silentThreshold__image"
          src={openingImage}
          width="1672"
          height="941"
          alt=""
          loading="eager"
          fetchPriority="high"
          decoding="async"
          onLoad={() => setImageReady(true)}
          onError={leave}
        />
        <div className="silentThreshold__wash" />
        <div className="silentThreshold__light" />
      </div>

      <div className="silentThreshold__frame" aria-hidden="true">
        <span>GÜVENLE, BİRLİKTE.</span>
        <span>KAAN ÖZKAN</span>
      </div>

      <div className="silentThreshold__content">
        <span className="silentThreshold__eyebrow">HER YENİ BAŞLANGICA BİR ALAN</span>
        <p className="silentThreshold__name">Kaan <em>Özkan</em></p>
        <div className="silentThreshold__identity">
          <i aria-hidden="true" />
          <span>AİLE DANIŞMANLIĞI</span>
          <i aria-hidden="true" />
        </div>
        <p className="silentThreshold__sentence">
          Her değişim, <em>güvenli bir ilk adımla</em> başlar.
        </p>
      </div>

      <div className="silentThreshold__footer">
        <span className="silentThreshold__progress" aria-hidden="true"><i /></span>
        <span className="silentThreshold__footnote">SİZE AYRILMIŞ BİR ALAN.</span>
        <button ref={skipRef} type="button" className="silentThreshold__skip" autoFocus onClick={leave}>
          Açılışı geç <span aria-hidden="true">↗</span>
        </button>
      </div>
    </section>
  );
}
