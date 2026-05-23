import { useScroll, useTransform, motion } from "motion/react";
import { useRef } from "react";

export default function LogoMark() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div ref={ref} style={{ width: "7rem", height: "7rem", flexShrink: 0 }}>
      <motion.svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ rotate, width: "100%", height: "100%" }}
      >
        {/* Circular text path */}
        <defs>
          <path
            id="circle-path"
            d="M 60,60 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
          />
        </defs>
        <text
          fontFamily="var(--font-mono, 'DM Mono', monospace)"
          fontSize="10"
          letterSpacing="4"
          fill="var(--color-cream, #F4EDD9)"
          opacity="0.5"
        >
          <textPath href="#circle-path">
            HMNG SHRMA · HMNG SHRMA ·
          </textPath>
        </text>
        {/* Centre dot */}
        <circle cx="60" cy="60" r="4" fill="var(--color-cream, #F4EDD9)" opacity="0.8" />
      </motion.svg>
    </div>
  );
}
