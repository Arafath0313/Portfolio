export const easing = [0.22, 1, 0.36, 1];

export const pageTransition = {
  initial: { opacity: 0, y: 15 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: easing, staggerChildren: 0.05 },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2, ease: easing },
  },
};

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: easing },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.3, ease: easing },
  },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: easing },
  },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: easing },
  },
};

export const viewportOnce = {
  once: true,
  amount: 0.24,
};
