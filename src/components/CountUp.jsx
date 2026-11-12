import { useEffect, useRef, useState } from 'react'

// A number that counts up from 0 when it scrolls into view (used for the impact numbers).
export default function CountUp({ end, suffix = '', duration = 1400 }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    let frame
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      if (reduceMotion) return setValue(end)
      const start = performance.now()
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        setValue(Math.round(end * (1 - Math.pow(1 - progress, 3)))) // ease-out
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    })
    if (ref.current) observer.observe(ref.current)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [end, duration])

  return (
    <span ref={ref}>
      {value.toLocaleString('en-SG')}
      {suffix}
    </span>
  )
}
