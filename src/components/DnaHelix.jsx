import { useEffect, useRef } from 'react'

export default function DnaHelix() {
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

    let time = 0

    const draw = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      const centerX = w * 0.85
      const amplitude = 30
      const frequency = 0.04
      const speed = 0.03
      const rungs = 20

      // Draw double helix strands
      for (let strand = 0; strand < 2; strand++) {
        ctx.beginPath()
        const phaseOffset = strand * Math.PI

        for (let y = 0; y < h; y += 2) {
          const x = centerX + Math.sin(y * frequency + time * speed + phaseOffset) * amplitude
          if (y === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }

        const gradient = ctx.createLinearGradient(0, 0, 0, h)
        gradient.addColorStop(0, 'rgba(0,168,204,0.05)')
        gradient.addColorStop(0.3, 'rgba(0,168,204,0.15)')
        gradient.addColorStop(0.7, 'rgba(0,61,91,0.15)')
        gradient.addColorStop(1, 'rgba(0,61,91,0.05)')

        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.stroke()
      }

      // Draw connecting rungs
      for (let i = 0; i < rungs; i++) {
        const y = (h / rungs) * i + (h / rungs / 2)
        const x1 = centerX + Math.sin(y * frequency + time * speed) * amplitude
        const x2 = centerX + Math.sin(y * frequency + time * speed + Math.PI) * amplitude

        const alpha = 0.05 + Math.abs(Math.sin(y * frequency + time * speed)) * 0.1

        ctx.beginPath()
        ctx.moveTo(x1, y)
        ctx.lineTo(x2, y)
        ctx.strokeStyle = `rgba(0,212,255,${alpha})`
        ctx.lineWidth = 1
        ctx.stroke()

        // Base pair dots
        const midX = (x1 + x2) / 2
        ctx.beginPath()
        ctx.arc(x1, y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,168,204,${alpha + 0.05})`
        ctx.fill()

        ctx.beginPath()
        ctx.arc(x2, y, 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,61,91,${alpha + 0.05})`
        ctx.fill()
      }

      // Floating particles along helix
      for (let i = 0; i < 8; i++) {
        const t = (time * 0.5 + i * 40) % h
        const x = centerX + Math.sin(t * frequency + time * speed) * amplitude * 1.5
        const alpha = 0.1 + Math.sin(time * 0.02 + i) * 0.05
        const size = 2 + Math.sin(time * 0.03 + i * 0.5) * 1

        ctx.beginPath()
        ctx.arc(x, t, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,212,255,${alpha})`
        ctx.fill()
      }

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
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0.7,
      }}
    />
  )
}
