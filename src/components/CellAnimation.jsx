import { useEffect, useRef } from 'react'

export default function CellAnimation({ type = 'cells', count = 12, colors = ['#00a8cc', '#003d5b', '#00d4ff', '#005a80'] }) {
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

    class Cell {
      constructor() {
        this.reset()
      }

      reset() {
        const w = canvas.offsetWidth
        const h = canvas.offsetHeight
        this.x = Math.random() * w
        this.y = Math.random() * h
        this.size = 4 + Math.random() * 12
        this.speedX = (Math.random() - 0.5) * 0.8
        this.speedY = (Math.random() - 0.5) * 0.6
        this.color = hexToRgb(colors[Math.floor(Math.random() * colors.length)])
        this.alpha = 0.15 + Math.random() * 0.25
        this.pulseSpeed = 0.01 + Math.random() * 0.02
        this.pulsePhase = Math.random() * Math.PI * 2
        this.wobbleAmp = 0.5 + Math.random() * 1.5
        this.wobbleFreq = 0.02 + Math.random() * 0.03
        this.wobblePhase = Math.random() * Math.PI * 2
        this.rotation = Math.random() * Math.PI * 2
        this.rotSpeed = (Math.random() - 0.5) * 0.02
        this.type = type
        this.membraneWave = Math.random() * Math.PI * 2
      }

      draw(time) {
        const w = canvas.offsetWidth
        const h = canvas.offsetHeight
        const pulse = Math.sin(time * this.pulseSpeed + this.pulsePhase) * 0.3 + 0.7
        const wobbleX = Math.sin(time * this.wobbleFreq + this.wobblePhase) * this.wobbleAmp
        const wobbleY = Math.cos(time * this.wobbleFreq * 0.7 + this.wobblePhase) * this.wobbleAmp * 0.6

        this.x += this.speedX + wobbleX * 0.01
        this.y += this.speedY + wobbleY * 0.01
        this.rotation += this.rotSpeed

        if (this.x < -this.size * 2) this.x = w + this.size
        if (this.x > w + this.size * 2) this.x = -this.size
        if (this.y < -this.size * 2) this.y = h + this.size
        if (this.y > h + this.size * 2) this.y = -this.size

        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)

        if (this.type === 'cells') {
          this.drawCell(time, pulse)
        } else if (this.type === 'particles') {
          this.drawParticle(pulse)
        } else if (this.type === 'molecules') {
          this.drawMolecule(time, pulse)
        }

        ctx.restore()
      }

      drawCell(time, pulse) {
        const s = this.size * pulse
        const { r, g, b } = this.color

        // Outer membrane with wave effect
        ctx.beginPath()
        const segments = 36
        for (let i = 0; i <= segments; i++) {
          const angle = (i / segments) * Math.PI * 2
          const waveOffset = Math.sin(angle * 3 + time * 0.03 + this.membraneWave) * s * 0.08
          const radius = s + waveOffset
          const px = Math.cos(angle) * radius
          const py = Math.sin(angle) * radius
          if (i === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        }
        ctx.closePath()

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, s)
        gradient.addColorStop(0, `rgba(${r},${g},${b},${this.alpha * 0.8})`)
        gradient.addColorStop(0.6, `rgba(${r},${g},${b},${this.alpha * 0.4})`)
        gradient.addColorStop(1, `rgba(${r},${g},${b},${this.alpha * 0.1})`)
        ctx.fillStyle = gradient
        ctx.fill()

        // Inner nucleus
        ctx.beginPath()
        ctx.arc(0, 0, s * 0.35, 0, Math.PI * 2)
        const nucleusGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 0.35)
        nucleusGrad.addColorStop(0, `rgba(${r},${g},${b},${this.alpha * 1.2})`)
        nucleusGrad.addColorStop(1, `rgba(${r},${g},${b},${this.alpha * 0.3})`)
        ctx.fillStyle = nucleusGrad
        ctx.fill()

        // Glow ring
        ctx.beginPath()
        ctx.arc(0, 0, s * 1.3, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${r},${g},${b},${this.alpha * 0.15 * pulse})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      drawParticle(pulse) {
        const s = this.size * 0.5 * pulse
        const { r, g, b } = this.color

        ctx.beginPath()
        ctx.arc(0, 0, s, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, s)
        gradient.addColorStop(0, `rgba(${r},${g},${b},${this.alpha})`)
        gradient.addColorStop(1, `rgba(${r},${g},${b},0)`)
        ctx.fillStyle = gradient
        ctx.fill()
      }

      drawMolecule(time, pulse) {
        const s = this.size * pulse
        const { r, g, b } = this.color

        // Central atom
        ctx.beginPath()
        ctx.arc(0, 0, s * 0.4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${this.alpha})`
        ctx.fill()

        // Bonds
        const bondCount = 3 + Math.floor(Math.random() * 2)
        for (let i = 0; i < bondCount; i++) {
          const angle = (i / bondCount) * Math.PI * 2 + time * 0.005
          const bondLen = s * 1.2

          ctx.beginPath()
          ctx.moveTo(0, 0)
          ctx.lineTo(Math.cos(angle) * bondLen, Math.sin(angle) * bondLen)
          ctx.strokeStyle = `rgba(${r},${g},${b},${this.alpha * 0.3})`
          ctx.lineWidth = 1
          ctx.stroke()

          // Terminal atom
          ctx.beginPath()
          ctx.arc(Math.cos(angle) * bondLen, Math.sin(angle) * bondLen, s * 0.2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r},${g},${b},${this.alpha * 0.6})`
          ctx.fill()
        }
      }
    }

    const particles = Array.from({ length: count }, () => new Cell())
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
  }, [type, count, colors])

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
      }}
    />
  )
}
