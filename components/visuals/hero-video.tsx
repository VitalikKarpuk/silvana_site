"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";

/*
  Hero visual — the animated Silvana chip diagram (public/heroVideo.mp4).
  Plays once (no loop), then holds its last frame. Composited with `screen`
  blend so its pure-black background drops to transparent and only the glowing
  diagram shows over our real page background. Edges are feathered with a mask.

  Once the clip ends, it's gently dimmed and a faint light bar sweeps left→right
  on a loop, as if scanning/illuminating the diagram. Skipped under reduced-motion.
*/
// approximate positions of the right-hand output nodes in the held frame
// (percent of the framed video box), top → bottom
const RIGHT_NODES: { x: string; y: string }[] = [
  { x: "84%", y: "26%" },
  { x: "84%", y: "42%" },
  { x: "84%", y: "58%" },
  { x: "84%", y: "74%" },
];

export function HeroVideo({
  className = "",
  speed = 0.8,
}: {
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [ended, setEnded] = useState(false);

  // cursor-driven 3D tilt
  const rx = useSpring(0, { stiffness: 120, damping: 18 });
  const ry = useSpring(0, { stiffness: 120, damping: 18 });

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.playbackRate = speed;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      return;
    }
    v.play().catch(() => {});
    // play through once; once it has ended, never restart — hold the last frame
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !v.ended) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [speed]);

  return (
    <div
      className={className}
      style={{ perspective: 1100 }}
      onMouseMove={
        reduce
          ? undefined
          : (e) => {
              const r = e.currentTarget.getBoundingClientRect();
              rx.set(-(((e.clientY - r.top) / r.height) - 0.5) * 12);
              ry.set((((e.clientX - r.left) / r.width) - 0.5) * 18);
            }
      }
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      <motion.div
        className="relative aspect-video"
        style={{
          rotateX: reduce ? 0 : rx,
          rotateY: reduce ? 0 : ry,
          transformStyle: "preserve-3d",
        }}
      >
      <video
        ref={ref}
        src="/heroVideo.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={() => setEnded(true)}
        className="absolute inset-0 h-full w-full scale-[1.1] object-cover mix-blend-screen"
        style={{
          // feather every edge into transparency so the clip melts into the bg
          // solid core, then a very wide soft ramp so the edge dissolves into
          // any background with no perceptible border
          WebkitMaskImage:
            "radial-gradient(100% 100% at 50% 50%, #000 30%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.3) 68%, transparent 85%)",
          maskImage:
            "radial-gradient(100% 100% at 50% 50%, #000 30%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.3) 68%, transparent 85%)",
        }}
      />

      {/* once ended: dim the held frame, then sweep a faint light bar across it */}
      {ended && !reduce && (
        <>
          {/* gentle dim, fades in */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: "var(--bg)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
          {/* pulse the right-hand output nodes so the held frame stays alive */}
          {RIGHT_NODES.map((n, i) => (
            <motion.div
              key={i}
              aria-hidden
              className="pointer-events-none absolute mix-blend-screen"
              style={{
                left: n.x,
                top: n.y,
                width: 90,
                height: 90,
                marginLeft: -45,
                marginTop: -45,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(214,68,143,0.55) 0%, rgba(214,68,143,0.22) 38%, transparent 70%)",
                filter: "blur(4px)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.15, 0.85, 0.15], scale: [0.9, 1.15, 0.9] }}
              transition={{
                duration: 2.6,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 1.2 + i * 0.45,
              }}
            />
          ))}
        </>
      )}
      </motion.div>
    </div>
  );
}
