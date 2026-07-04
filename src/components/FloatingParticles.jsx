import { useEffect, useRef } from 'react'

export default function FloatingParticles({ count = 20, color = '#00a8cc', maxSize = 4, speed = 0.5 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationId

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2
      canvas.height = canvas.offsetHeight * 2
      ctx.scale(2, 2)
    }
    resize()
    window.addEventListener('resize', resize)

    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 168, b: 204 }
    }

    const rgb = hexToRgb(color)

    class Particle {
      constructor() {
        this.reset()
      }

      reset() {
        const w = canvas.offsetWidth
        const h = canvas.offsetHeight
        this.x = Math.random() * w
        this.y = Math.random() * h
        this.size = 0.5 + Math.random() * maxSize
        this.speedX = (Math.random() - 0.5) * speed
        this.speedY = (Math.random() - 0.5) * speed * 0.5 - speed * 0.2
        this.alpha = 0.1 + Math.random() * 0.3
        this.pulseSpeed = 0.01 + Math.random() * 0.02
        this.pulsePhase = Math.random() * Math.PI * 2
      }

      draw(time) {
        const w = canvas.offsetWidth
        const h = canvas.offsetHeight
        const pulse = Math.sin(time * this.pulseSpeed + this.pulsePhase) * 0.3 + 0.7

        this.x += this.speedX
        this.y += this.speedY

        if (this.x < -10) this.x = w + 10
        if (this.x > w + 10) this.x = -10
        if (this.y < -10) this.y = h + 10
        if (this.y > h + 10) this.y = -10

        const s = this.size * pulse

        ctx.beginPath()
        ctx.arc(this.x, this.y, s, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, s)
        gradient.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${this.alpha * pulse})`)
        gradient.addColorStop(1, `rgba(${rgb.r},${rgb.g},${rgb.b},0)`)
        ctx.fillStyle = gradient
        ctx.fill()
      }
    }

    const particles = Array.from({ length: count }, () => new Particle())
    let time = 0

    const animate = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      particles.forEach(p => p.draw(time))
      time++
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [count, color, maxSize, speed])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}
