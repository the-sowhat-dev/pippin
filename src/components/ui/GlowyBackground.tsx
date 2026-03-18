"use client";

import { useEffect, useRef } from "react";

export const GlowyBackground = ({
  children,
  className,
  bgColor = "#C6F0D0",
  glowColor = "#35C055",
}: {
  children?: React.ReactNode;
  className?: string;
  bgColor?: string;
  glowColor?: string;
}) => {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blob = blobRef.current;
    if (!blob) return;

    let t = 0;
    let animFrameId: number;

    const animate = () => {
      t += 0.003;
      const x = 50 + 28 * Math.sin(t * 1.0);
      const y = 50 + 22 * Math.cos(t * 0.7);
      blob.style.left = `${x}%`;
      blob.style.top = `${y}%`;
      animFrameId = requestAnimationFrame(animate);
    };

    animFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameId);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ backgroundColor: bgColor }}>
      <div
        ref={blobRef}
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "520px",
          height: "520px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${glowColor} 0%, ${bgColor} 60%, transparent 80%)`,
          filter: "blur(60px)",
          willChange: "left, top",
        }}
      />
      <div className="relative z-0">{children}</div>
    </div>
  );
};
