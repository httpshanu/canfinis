import { useEffect, useRef } from 'react'

export default function ColorWave({ colors = ['#003d5b', '#00a8cc', '#005a80', '#00d4ff'], speed = 0.8, amplitude = 30 }) {
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
      } : { r: 0, g: 0, b: 0 }
    }

    const waveConfigs = colors.map((color, i) => ({
      rgb: hexToRgb(color),
      amp: amplitude + i * 5,
      freq: 0.006 + i * 0.002,
      spd: (0.01 + i * 0.003) * speed,
      phase: i * Math.PI / 3,
      yOffset: 0.4 + i * 0.1,
      alpha: 0.08 + (colors.length - i) * 0.02,
    }))

    let time = 0

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      waveConfigs.forEach(wave => {
        ctx.beginPath()
        ctx.moveTo(0, h)

        for (let x = 0; x <= w; x += 3) {
          const y = h * wave.yOffset +
            Math.sin(x * wave.freq + time * wave.spd + wave.phase) * wave.amp +
            Math.sin(x * wave.freq * 1.8 + time * wave.spd * 0.6 + wave.phase * 2) * wave.amp * 0.3
          ctx.lineTo(x, y)
        }

        ctx.lineTo(w, h)
        ctx.closePath()

        const gradient = ctx.createLinearGradient(0, 0, w, 0)
        gradient.addColorStop(0, `rgba(${wave.rgb.r},${wave.rgb.g},${wave.rgb.b},${wave.alpha * 0.2})`)
        gradient.addColorStop(0.3, `rgba(${wave.rgb.r},${wave.rgb.g},${wave.rgb.b},${wave.alpha})`)
        gradient.addColorStop(0.7, `rgba(${wave.rgb.r},${wave.rgb.g},${wave.rgb.b},${wave.alpha})`)
        gradient.addColorStop(1, `rgba(${wave.rgb.r},${wave.rgb.g},${wave.rgb.b},${wave.alpha * 0.3})`)

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
  }, [colors, speed, amplitude])

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
