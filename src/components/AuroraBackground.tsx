import { useEffect, useRef } from 'react'

// 灵感来源：reactbits.dev Soft Aurora + 中式水墨晕染
// 紫调辉光在墨黑背景上缓慢流动，营造"墨韵流光"的主页氛围
export default function AuroraBackground({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    // 三个紫调光团 + 一个朱砂微光
    const blobs = [
      { x: 0.2, y: 0.25, r: 0.42, color: 'rgba(124,92,255,0.55)', vx: 0.00018, vy: 0.00012 },
      { x: 0.78, y: 0.4, r: 0.38, color: 'rgba(157,127,255,0.42)', vx: -0.00014, vy: 0.0002 },
      { x: 0.5, y: 0.8, r: 0.5, color: 'rgba(167,139,250,0.32)', vx: 0.0001, vy: -0.00016 },
      { x: 0.65, y: 0.15, r: 0.18, color: 'rgba(199,62,58,0.22)', vx: 0.00022, vy: 0.0001 },
    ]

    let t = 0
    const render = () => {
      t += 1
      ctx.clearRect(0, 0, w, h)

      // 底色微噪点（宣纸纹理感）
      ctx.fillStyle = 'rgba(14,14,18,0)'
      ctx.fillRect(0, 0, w, h)

      for (const b of blobs) {
        b.x += b.vx
        b.y += b.vy
        if (b.x < -0.2 || b.x > 1.2) b.vx *= -1
        if (b.y < -0.2 || b.y > 1.2) b.vy *= -1

        const cx = b.x * w + Math.sin(t * 0.005 + b.r * 10) * 30
        const cy = b.y * h + Math.cos(t * 0.006 + b.r * 10) * 24
        const rad = b.r * Math.max(w, h)

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad)
        grad.addColorStop(0, b.color)
        grad.addColorStop(1, 'rgba(14,14,18,0)')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, w, h)
      }

      rafRef.current = requestAnimationFrame(render)
    }

    if (prefersReduced) {
      // 静态渲染一帧
      for (const b of blobs) {
        const cx = b.x * w
        const cy = b.y * h
        const rad = b.r * Math.max(w, h)
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad)
        grad.addColorStop(0, b.color)
        grad.addColorStop(1, 'rgba(14,14,18,0)')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, w, h)
      }
    } else {
      render()
    }

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  )
}
