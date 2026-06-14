"use client";

import { motion, useReducedMotion, useSpring } from "framer-motion";
import { AgenticTree } from "./agentic-tree";

/*
  Gives the hero chip diagram volume: a static 3D tilt, cursor parallax,
  a slow float, and a soft brand drop-shadow. Flat + still under reduced-motion.
*/
export function ChipHero({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const rx = useSpring(0, { stiffness: 110, damping: 16 });
  const ry = useSpring(0, { stiffness: 110, damping: 16 });

  return (
    <div
      className={className}
      style={{ perspective: 1200 }}
      onMouseMove={
        reduce
          ? undefined
          : (e) => {
              const r = e.currentTarget.getBoundingClientRect();
              rx.set(-(((e.clientY - r.top) / r.height) - 0.5) * 10);
              ry.set((((e.clientX - r.left) / r.width) - 0.5) * 16);
            }
      }
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {/* static base tilt for dimensionality */}
      <div style={{ transform: reduce ? undefined : "rotateX(5deg) rotateY(-9deg)", transformStyle: "preserve-3d" }}>
        <motion.div
          style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
          animate={reduce ? undefined : { y: [0, -10, 0] }}
          transition={reduce ? undefined : { duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          className="[filter:drop-shadow(0_40px_70px_rgba(214,68,143,0.28))]"
        >
          <AgenticTree className="w-full" />
        </motion.div>
      </div>
    </div>
  );
}
