import { motion } from 'framer-motion'
import { ACHIEVEMENTS } from '@/data/achievements'
import { useGameStore } from '@/store/gameStore'
import {
  SparkIcon,
  FlameIcon,
  BookIcon,
  StarIcon,
  BrushIcon,
  SealIcon,
  ToolIcon,
} from '@/components/Icons'

const ICON_MAP: Record<string, typeof SparkIcon> = {
  spark: SparkIcon,
  flame: FlameIcon,
  book: BookIcon,
  star: StarIcon,
  brush: BrushIcon,
  seal: SealIcon,
  tool: ToolIcon,
}

export default function AchievementsPage() {
  const achieved = useGameStore((s) => s.achievements)
  const stats = useGameStore((s) => s.stats)
  const litProvinces = useGameStore((s) => s.litProvinces)
  const unlockedHeritages = useGameStore((s) => s.unlockedHeritages)

  const accuracy =
    stats.totalAnswered > 0
      ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100)
      : 0

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <header className="mb-8 text-center">
        <h1 className="font-serif text-3xl text-[var(--text)] sm:text-4xl">成就纪事</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          已达成{' '}
          <span className="font-mono text-[var(--aura-light)]">{achieved.length}</span> /{' '}
          {ACHIEVEMENTS.length}
        </p>
      </header>

      {/* 统计概览 */}
      <section className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="点亮省份" value={`${litProvinces.length}/34`} />
        <StatCard label="收集图鉴" value={`${unlockedHeritages.length}`} />
        <StatCard label="最高连胜" value={`${stats.bestStreak}`} />
        <StatCard label="答题准确率" value={`${accuracy}%`} />
      </section>

      {/* 成就列表 */}
      <div className="flex flex-col gap-3">
        {ACHIEVEMENTS.map((ach, idx) => {
          const done = achieved.includes(ach.id)
          const Icon = ICON_MAP[ach.icon] ?? SparkIcon
          return (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(idx * 0.05, 0.4) }}
              className={`flex items-center gap-4 rounded-2xl border p-4 transition-all ${
                done
                  ? 'border-[var(--aura)]/50 bg-[rgba(124,92,255,0.08)]'
                  : 'border-[var(--border)] bg-[var(--surface)]/60'
              }`}
            >
              <div
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border"
                style={{
                  borderColor: done ? 'var(--aura)' : 'var(--border)',
                  color: done ? 'var(--aura-light)' : 'var(--text-muted)',
                  background: done ? 'rgba(124,92,255,0.12)' : 'transparent',
                  boxShadow: done ? '0 0 18px rgba(124,92,255,0.3)' : 'none',
                }}
              >
                <Icon size={24} />
              </div>
              <div className="flex-1">
                <div
                  className={`font-serif text-base ${done ? 'text-[var(--text)]' : 'text-[var(--text-muted)]'}`}
                >
                  {ach.name}
                </div>
                <div className="text-xs text-[var(--text-muted)]">{ach.desc}</div>
              </div>
              {done && (
                <span className="rounded-full border border-[var(--aura)] px-2.5 py-1 text-[11px] text-[var(--aura-light)]">
                  已达成
                </span>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-center">
      <div className="font-mono text-2xl text-[var(--aura-light)]">{value}</div>
      <div className="mt-1 text-xs text-[var(--text-muted)]">{label}</div>
    </div>
  )
}
