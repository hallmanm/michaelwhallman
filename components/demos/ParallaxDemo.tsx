"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ParallaxDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const yFg = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        height: "70vh",
        overflow: "hidden",
        borderRadius: "0.5rem",
        background: "linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%)",
      }}
    >
      <motion.div
        style={{
          y: yBg,
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.04), transparent 40%), radial-gradient(circle at 80% 60%, rgba(255, 255, 255, 0.06), transparent 35%)",
        }}
      />
      <motion.div
        style={{
          y: yFg,
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#f7f5f2",
          textAlign: "center",
          padding: "0 2rem",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
            }}
          >
            Scroll to see the parallax.
          </div>
          <div style={{ opacity: 0.6, marginTop: "1rem" }}>
            Two layers move at different rates — same idea, modern stack.
          </div>
        </div>
      </motion.div>
    </div>
  );
}
