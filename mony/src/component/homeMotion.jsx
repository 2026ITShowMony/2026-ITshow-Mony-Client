import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const revealVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.62,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const cardMotion = {
  whileHover: { y: -2, boxShadow: "0 14px 30px rgba(0, 0, 0, 0.28)" },
  whileTap: { scale: 0.99 },
  transition: {
    type: "tween",
    duration: 0.22,
    ease: [0.25, 0.1, 0.25, 1],
  },
};

export const buttonMotion = {
  whileHover: { scale: 1.01 },
  whileTap: { scale: 0.98 },
  transition: {
    type: "tween",
    duration: 0.22,
    ease: [0.25, 0.1, 0.25, 1],
  },
};

export function Reveal({ children, className = "", as = "div", amount = 0.25, delay = 0 }) {
  const Component = motion[as] || motion.div;

  return (
    <Component
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}

export function CountUp({
  value,
  className = "",
  duration = 1.35,
  formatter = (n) => n.toLocaleString("ko-KR"),
  prefix = "",
  suffix = "",
  amount = 0.55,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount });
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (reduceMotion) {
      setCount(value);
      return;
    }

    let rafId = 0;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));

      if (progress < 1) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    rafId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(rafId);
  }, [inView, reduceMotion, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatter(count)}
      {suffix}
    </span>
  );
}

export function ProgressFill({ value, className = "", duration = 1.15, amount = 0.6 }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={{ transformOrigin: "0% 50%", width: "100%", height: "100%" }}
      initial={reduceMotion ? false : { scaleX: 0 }}
      whileInView={{ scaleX: value }}
      viewport={{ once: true, amount }}
      transition={{
        duration: reduceMotion ? 0 : duration,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    />
  );
}
