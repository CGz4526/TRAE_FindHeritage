import { useState } from 'react'
import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import MapView from '@/components/MapView'
import QuizModal from '@/components/QuizModal'
import AuroraBackground from '@/components/AuroraBackground'
import Onboarding from '@/components/Onboarding'
import CollectionPage from '@/pages/CollectionPage'
import AchievementsPage from '@/pages/AchievementsPage'
import LandingPage from '@/pages/LandingPage'
import { useGameStore } from '@/store/gameStore'
import { HomeIcon, BookIcon, TrophyIcon, ShareIcon, ResetIcon } from '@/components/Icons'

export default function App() {
  const [quizProvince, setQuizProvince] = useState<string | null>(null)
  const litProvinces = useGameStore((s) => s.litProvinces)
  const unlockedHeritages = useGameStore((s) => s.unlockedHeritages)
  const stats = useGameStore((s) => s.stats)
  const resetGame = useGameStore((s) => s.resetGame)
  const location = useLocation()

  const handleProvinceClick = (province: string) => {
    setQuizProvince(province)
  }

  const handleReset = () => {
    if (window.confirm('确定要重置所有进度吗？此操作不可撤销。')) {
      resetGame()
    }
  }

  const handleShare = async () => {
    const text = `我已在「寻遗记」点亮 ${litProvinces.length}/34 个省份，收集 ${unlockedHeritages.length} 张非遗图鉴！来挑战吧～`
    if (navigator.share) {
      try {
        await navigator.share({ title: '寻遗记 · 点亮中国非遗版图', text, url: window.location.href })
      } catch {
        /* 用户取消 */
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${text}\n${window.location.href}`)
        alert('已复制分享文案到剪贴板')
      } catch {
        alert(text)
      }
    }
  }

  const isLanding = location.pathname === '/'

  return (
    <div className="relative min-h-screen">
      {/* 全局背景（Landing 宣传页自带背景，不叠加） */}
      {!isLanding && <AuroraBackground />}

      {/* 导航栏（Landing 页隐藏） */}
      {!isLanding && (
        <header className="sticky top-0 z-40 border-b border-[var(--border)]/60 bg-[var(--bg)]/70 backdrop-blur-xl">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
            <NavLink to="/play" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--aura)] bg-[rgba(124,92,255,0.12)] font-serif text-base text-[var(--aura-light)] shadow-[0_0_16px_rgba(124,92,255,0.35)]">
                遗
              </span>
              <div className="leading-none">
                <div className="font-serif text-lg text-[var(--text)]">寻遗记</div>
                <div className="text-[10px] text-[var(--text-muted)]">点亮中国非遗版图</div>
              </div>
            </NavLink>

            <div className="flex items-center gap-1">
              <NavItem to="/play" icon={<HomeIcon size={18} />} label="版图" />
              <NavItem to="/collection" icon={<BookIcon size={18} />} label="图鉴" />
              <NavItem to="/achievements" icon={<TrophyIcon size={18} />} label="成就" />
              <button
                onClick={handleShare}
                title="分享"
                className="icon-btn ml-1 h-9 w-9 rounded-full"
                aria-label="分享"
              >
                <ShareIcon size={17} />
              </button>
              <button
                onClick={handleReset}
                title="重置进度"
                className="icon-btn h-9 w-9 rounded-full"
                aria-label="重置进度"
              >
                <ResetIcon size={16} />
              </button>
            </div>
          </nav>
        </header>
      )}

      {/* 路由内容 */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/play"
              element={
                <HomePage
                  litCount={litProvinces.length}
                  totalCorrect={stats.totalCorrect}
                  bestStreak={stats.bestStreak}
                  onProvinceClick={handleProvinceClick}
                />
              }
            />
            <Route path="/collection" element={<CollectionPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* 答题弹窗 */}
      <AnimatePresence>
        {quizProvince && (
          <QuizModal province={quizProvince} onClose={() => setQuizProvince(null)} />
        )}
      </AnimatePresence>

      {/* 新手引导（Landing 页隐藏） */}
      {!isLanding && <Onboarding />}
    </div>
  )
}

function NavItem({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        `flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-colors ${
          isActive
            ? 'bg-[rgba(124,92,255,0.15)] text-[var(--aura-light)]'
            : 'text-[var(--text-muted)] hover:text-[var(--text)]'
        }`
      }
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </NavLink>
  )
}

function HomePage({
  litCount,
  totalCorrect,
  bestStreak,
  onProvinceClick,
}: {
  litCount: number
  totalCorrect: number
  bestStreak: number
  onProvinceClick: (p: string) => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mx-auto max-w-5xl px-4 pb-16 pt-8 sm:px-6 sm:pt-12"
    >
      {/* Hero */}
      <section className="mb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block rounded-full border border-[var(--aura)]/40 bg-[rgba(124,92,255,0.08)] px-4 py-1.5 text-xs text-[var(--aura-light)]">
            TRAE AI 创造力大赛 · 非遗创新
          </span>
          <h1 className="mt-5 font-serif text-4xl leading-tight text-[var(--text)] sm:text-6xl">
            点亮你的<span className="text-aura-gradient">非遗版图</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[var(--text-muted)] sm:text-base">
            打开即玩。在中国地图上选省份、答非遗题、收图鉴——
            <br className="hidden sm:block" />
            2 分钟一局，玩着玩着就记住了家乡的非遗。
          </p>
        </motion.div>

        {/* 进度统计 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-8 grid max-w-2xl grid-cols-3 gap-3"
        >
          <StatBox value={`${litCount}`} suffix="/34" label="点亮省份" />
          <StatBox value={`${totalCorrect}`} label="累计答对" />
          <StatBox value={`${bestStreak}`} label="最高连胜" />
        </motion.div>
      </section>

      {/* 地图 */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-serif text-lg text-[var(--text)]">探索非遗版图</h2>
          <span className="text-xs text-[var(--text-muted)]">点击省份开始闯关 · 可拖动缩放</span>
        </div>
        <MapView onProvinceClick={onProvinceClick} />
      </motion.section>

      {/* 玩法说明 */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-10 grid gap-3 sm:grid-cols-3"
      >
        <FeatureCard
          num="01"
          title="选省闯关"
          desc="34 省份各有 5 道非遗题，AI 生成、覆盖十大非遗类别"
        />
        <FeatureCard
          num="02"
          title="道具助阵"
          desc="提示、五五开、跳过、复活——答错不惩罚，3 题即过关"
        />
        <FeatureCard
          num="03"
          title="收集图鉴"
          desc="点亮省份解锁非遗图鉴，零失误通关记录完美战绩"
        />
      </motion.section>

      <footer className="mt-16 text-center text-xs text-[var(--text-muted)]">
        <div className="mb-1 font-serif text-base text-[var(--aura-light)]">寻遗记</div>
        <p>AI 非遗知识闯关游戏 · 用游戏化传播非遗</p>
      </footer>
    </motion.div>
  )
}

function StatBox({ value, suffix, label }: { value: string; suffix?: string; label: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/60 px-4 py-3 backdrop-blur-sm">
      <div className="font-mono text-2xl text-[var(--aura-light)] sm:text-3xl">
        {value}
        {suffix && <span className="text-sm text-[var(--text-muted)]">{suffix}</span>}
      </div>
      <div className="mt-0.5 text-xs text-[var(--text-muted)]">{label}</div>
    </div>
  )
}

function FeatureCard({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/60 p-5 backdrop-blur-sm transition-colors hover:border-[var(--aura)]/40">
      <div className="mb-2 font-mono text-xs text-[var(--aura)]">{num}</div>
      <h3 className="mb-1.5 font-serif text-base text-[var(--text)]">{title}</h3>
      <p className="text-xs leading-relaxed text-[var(--text-muted)]">{desc}</p>
    </div>
  )
}
