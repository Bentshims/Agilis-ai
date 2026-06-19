"use client";

import { motion } from "motion/react";

function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0,
          }}
          animate={{
            y: [0, -(Math.random() * 150 + 50)],
            x: [0, (Math.random() - 0.5) * 80],
            opacity: [0, Math.random() * 0.5 + 0.2, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function AmbientGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ x: ["-5%", "5%", "-5%"], y: ["0%", "10%", "0%"], scale: [1, 1.08, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-white/[0.04] blur-3xl"
      />
      <motion.div
        animate={{ x: ["5%", "-8%", "5%"], y: ["5%", "-5%", "5%"], scale: [1.05, 1, 1.05] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-white/[0.03] blur-3xl"
      />
    </div>
  );
}

export default function HeroScene() {
  return (
    <>
      <AmbientGlow />
      <Particles />
    </>
  );
}
