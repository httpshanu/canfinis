import { useInView } from 'framer-motion'
import { useRef } from 'react'

export function useFadeIn(threshold = 0) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: threshold })
  return { ref, isInView }
}

// IMPORTANT: hidden state uses opacity:0 with NO y/x offset
// This prevents animated sections from appearing as blank spaces.
// Layout space is always preserved; only opacity fades in on scroll.
export const fadeUp = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.55, ease: 'easeOut' } }
}

export const fadeLeft = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.55, ease: 'easeOut' } }
}

export const fadeRight = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.55, ease: 'easeOut' } }
}

export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }
}
