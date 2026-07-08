import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import FloatingLines from '@/components/FloatingLines'
import ShinyText from '@/components/ShinyText'

// 项目宣传首页：FloatingLines（reactbits 紫调着色器背景）+ ShinyText（reactbits 闪光大标题）
export default function LandingPage() {
  const navigate = useNavigate()
  const reduceMotion = useReducedMotion()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0E0E12] text-[var(--text)]">
      {/* 背景层：FloatingLines 紫调着色器（reduce-motion 时降级为静态渐变） */}
      <div className="absolute inset-0 z-0">
        {reduceMotion ? (
          <div
            className="h-full w-full"
            style={{
              background:
                'radial-gradient(120% 80% at 50% 30%, rgba(124,92,255,0.22), transparent 60%), radial-gradient(80% 60% at 70% 80%, rgba(199,62,58,0.10), transparent 70%), #0E0E12',
            }}
          />
        ) : (
          <FloatingLines
            linesGradient={['#3D2B7A', '#7C5CFF', '#A78BFA']}
            enabledWaves={['top', 'middle', 'bottom']}
            lineCount={[5, 7, 4]}
            lineDistance={[8, 5, 10]}
            animationSpeed={0.8}
            interactive
            parallax
            parallaxStrength={0.15}
            bendRadius={4}
            bendStrength={-0.4}
            mixBlendMode="screen"
          />
        )}
      </div>

      {/* 暗角，让中央文字更突出 */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 50%, rgba(14,14,18,0.55), rgba(14,14,18,0.85) 75%, rgba(14,14,18,0.95))',
        }}
      />

      {/* 内容层 */}
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
        {/* 顶部标签 */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--aura)]/40 bg-[rgba(124,92,255,0.08)] px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--aura)] shadow-[0_0_8px_var(--aura)]" />
          <span className="text-xs tracking-[0.2em] text-[var(--aura-light)]">
            TRAE AI 创造力大赛 · 非遗创新
          </span>
        </motion.div>

        {/* 巨幅标题：ShinyText 闪光 */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.92, letterSpacing: '0.4em' }}
          animate={mounted ? { opacity: 1, scale: 1, letterSpacing: '0.15em' } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="font-serif font-bold leading-none"
          style={{ fontSize: 'clamp(4.5rem, 16vw, 13rem)' }}
        >
          <ShinyText
            text="寻遗记"
            speed={3.2}
            color="#6B5BD6"
            shineColor="#F5F2EA"
            spread={110}
          />
        </motion.h1>

        {/* 副标题 */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-6 font-serif text-xl tracking-[0.3em] text-[var(--text)]/90 sm:text-2xl"
        >
          点亮中国非遗版图
        </motion.p>

        {/* 宣传文案 */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-5 max-w-xl text-sm leading-relaxed text-[var(--text-muted)] sm:text-base"
        >
          打开即玩。在中国地图上选省份、答非遗题、收图鉴——
          <br className="hidden sm:block" />
          34 省非遗，170 道题，2 分钟一局，玩着玩着就记住了家乡的非遗。
        </motion.p>

        {/* CTA 按钮组 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={mounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.85 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
        >
          <button
            onClick={() => navigate('/play')}
            className="group relative overflow-hidden rounded-full px-10 py-4 text-base font-medium text-[#0E0E12] transition-transform hover:scale-[1.03] active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #A78BFA 0%, #7C5CFF 60%, #6B4FE8 100%)',
              boxShadow: '0 0 40px rgba(124,92,255,0.45), 0 8px 24px rgba(0,0,0,0.3)',
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              开始闯关
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </button>

          <button
            onClick={() => navigate('/collection')}
            className="rounded-full border border-[var(--aura)]/40 bg-[rgba(124,92,255,0.06)] px-8 py-4 text-sm text-[var(--text)]/85 backdrop-blur-sm transition-colors hover:border-[var(--aura)] hover:text-[var(--aura-light)]"
          >
            浏览非遗图鉴
          </button>
        </motion.div>

        {/* 数据指标 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={mounted ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-16 flex items-center gap-8 font-mono text-xs text-[var(--text-muted)] sm:gap-12 sm:text-sm"
        >
          {[
            { n: '34', l: '省份版图' },
            { n: '170', l: '非遗题目' },
            { n: '34', l: '图鉴收藏' },
          ].map((s) => (
            <div key={s.l} className="flex flex-col items-center gap-1">
              <span className="text-2xl text-[var(--aura-light)] sm:text-3xl">{s.n}</span>
              <span className="tracking-wider">{s.l}</span>
            </div>
          ))}
        </motion.div>
      </main>

      {/* 底部署名 */}
      <footer className="absolute bottom-0 left-0 right-0 z-10 px-6 py-5 text-center text-[11px] text-[var(--text-muted)]/60">
        AI 非遗知识闯关游戏 · 用游戏化传播非遗
      </footer>
    </div>
  )
}
