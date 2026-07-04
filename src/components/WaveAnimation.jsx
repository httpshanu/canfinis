import { useEffect, useRef } from 'react'

export default function WaveAnimation({ className = '', style = {} }) {
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

    const colors = [
      { r: 0, g: 61, b: 91, a: 0.12 },    // #003d5b primary
      { r: 0, g: 168, b: 204, a: 0.10 },   // #00a8cc teal
      { r: 0, g: 90, b: 128, a: 0.08 },    // #005a80 primary-light
      { r: 0, g: 212, b: 255, a: 0.06 },   // light cyan
    ]

    const waves = colors.map((color, i) => ({
      color,
      amplitude: 20 + i * 8,
      frequency: 0.008 - i * 0.001,
      speed: 0.015 + i * 0.005,
      phase: i * 1.2,
      yOffset: 0.3 + i * 0.15,
    }))

    let time = 0

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      waves.forEach(wave => {
        ctx.beginPath()
        ctx.moveTo(0, h)

        for (let x = 0; x <= w; x += 2) {
          const y = h * wave.yOffset +
            Math.sin(x * wave.frequency + time * wave.speed + wave.phase) * wave.amplitude +
            Math.sin(x * wave.frequency * 1.5 + time * wave.speed * 0.7) * wave.amplitude * 0.4
          ctx.lineTo(x, y)
        }

        ctx.lineTo(w, h)
        ctx.closePath()

        const gradient = ctx.createLinearGradient(0, 0, w, 0)
        gradient.addColorStop(0, `rgba(${wave.color.r},${wave.color.g},${wave.color.b},${wave.color.a * 0.3})`)
        gradient.addColorStop(0.5, `rgba(${wave.color.r},${wave.color.g},${wave.color.b},${wave.color.a})`)
        gradient.addColorStop(1, `rgba(${wave.color.r},${wave.color.g},${wave.color.b},${wave.color.a * 0.5})`)

        ctx.fillStyle = gradient
        ctx.fill()
      })

      time++
      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        ...style,
      }}
    />
  )
}
