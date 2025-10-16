"use client";
import { motion, type Variants } from "framer-motion";
import { useState } from "react";

const container: Variants = {
  hidden: { opacity: 0.5 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.2 },
  },
};

const child: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 12, stiffness: 100 },
  },
};

export default function AnimatedWord({ text }: { text: string }) {
  const letters = Array.from(text);
  const [shine, setShine] = useState(false);
  const [flash, setFlash] = useState(false);

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      className={`inline-block text-primary-50/30 ${shine ? "shine" : ""} ${
        flash ? "flash-once" : ""
      }`}
      onAnimationComplete={() => {
        setShine(true);
        setFlash(true);
      }}
    >
      {letters.map((char, i) => (
        <motion.span key={i} variants={child} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
