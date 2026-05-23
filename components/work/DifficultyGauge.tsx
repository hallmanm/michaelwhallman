"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

interface DifficultyGaugeProps {
  difficulty: number;
}

const CX = 100;
const CY = 100;
const RADIUS = 80;
const ANIMATION_DURATION_MS = 1200;

function difficultyToAngle(value: number): number {
  const clamped = Math.max(0, Math.min(10, value));
  return clamped * 18 - 90;
}

// Convert an arc-coordinate angle (180° = left, 90° = top, 0° = right) into an (x, y) pair.
function arcPoint(angleDeg: number, radius = RADIUS) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: CX + radius * Math.cos(rad),
    y: CY - radius * Math.sin(rad),
  };
}

// Approximates the CSS cubic-bezier(0.4, 0, 0.2, 1) used by the needle, so the
// number counts up in sync with the needle sweep.
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Interpolated color along the gauge gradient (green → yellow → red).
// Matches the linearGradient stops defined on the arc.
function gaugeColor(value: number): string {
  const t = Math.max(0, Math.min(10, value)) / 10;
  const lerp = (a: number, b: number, k: number) => Math.round(a + (b - a) * k);

  if (t <= 0.5) {
    const k = t * 2;
    return `rgb(${lerp(74, 251, k)}, ${lerp(222, 191, k)}, ${lerp(128, 36, k)})`;
  }
  const k = (t - 0.5) * 2;
  return `rgb(${lerp(251, 248, k)}, ${lerp(191, 113, k)}, ${lerp(36, 113, k)})`;
}

export function DifficultyGauge({ difficulty }: DifficultyGaugeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!animate) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayed(difficulty);
      return;
    }

    const start = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / ANIMATION_DURATION_MS, 1);
      setDisplayed(Math.round(easeInOutCubic(t) * difficulty));
      if (t < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [animate, difficulty]);

  const targetAngle = difficultyToAngle(difficulty);
  const targetColor = gaugeColor(difficulty);
  const left = arcPoint(180);
  const right = arcPoint(0);

  const ticks = Array.from({ length: 11 }, (_, i) => {
    const arcAngle = 180 - i * 18;
    const outer = arcPoint(arcAngle, RADIUS + 4);
    const inner = arcPoint(arcAngle, RADIUS - 6);
    const isMajor = i === 0 || i === 5 || i === 10;
    return { i, outer, inner, isMajor };
  });

  const style = {
    "--target-angle": `${targetAngle}deg`,
    "--target-color": targetColor,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      className={`difficulty-gauge${animate ? " is-animating" : ""}`}
      style={style}
      role="img"
      aria-label={`Difficulty ${difficulty} out of 10`}
    >
      <span className="difficulty-gauge__label">Difficulty</span>
      <svg viewBox="0 0 200 110" aria-hidden="true">
        <defs>
          <linearGradient id="gauge-arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f87171" />
          </linearGradient>
        </defs>

        <path
          d={`M ${left.x},${left.y} A ${RADIUS},${RADIUS} 0 0 1 ${right.x},${right.y}`}
          fill="none"
          stroke="url(#gauge-arc-gradient)"
          strokeWidth={6}
          strokeLinecap="round"
        />

        {ticks.map(({ i, outer, inner, isMajor }) => (
          <line
            key={i}
            x1={inner.x}
            y1={inner.y}
            x2={outer.x}
            y2={outer.y}
            stroke="#cdd9e5"
            strokeWidth={isMajor ? 2 : 1}
            strokeOpacity={isMajor ? 0.85 : 0.4}
          />
        ))}

        <line
          className="difficulty-gauge__needle"
          x1={CX}
          y1={CY}
          x2={CX}
          y2={CY - RADIUS + 12}
          stroke="#ffffff"
          strokeWidth={2.5}
          strokeLinecap="round"
        />

        <circle cx={CX} cy={CY} r={5} fill="#ffffff" />
        <circle cx={CX} cy={CY} r={2.5} fill="#161b22" />
      </svg>

      <div className="difficulty-gauge__value">
        {displayed}
        <span aria-hidden="true">/10</span>
      </div>
    </div>
  );
}
