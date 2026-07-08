import { useState } from 'react'
import { motion } from 'framer-motion'
import { HERITAGES } from '@/data/heritages'
import { useGameStore } from '@/store/gameStore'
import { HeritageGlyph, CloseIcon } from '@/components/Icons'
import type { Heritage, HeritageCategory, Rarity } from '@/types'
import { REGION_ORDER, PROVINCES } from '@/data/provinces'

const RARITY_LABEL: Record<Rarity, { text: string; color: string }> = {
  common: { text: '寻常', color: 'var(--text-muted)' },
  rare: { text: '珍稀', color: 'var(--aura-light)' },
  epic: { text: '传世', color: 'var(--cinnabar-light)' },
}

const LEVEL_LABEL: Record<string, string> = {
  world: '世界级',
  national: '国家级',
  province: '省级',
}

const CATEGORIES: (HeritageCategory | '全部')[] = [
  '全部',
  '传统戏剧',
  '传统音乐',
  '传统技艺',
  '传统美术',
  '民俗',
  '曲艺',
  '民间文学',
  '传统舞蹈',
  '传统体育、游艺与杂技',
  '传统医药',
]

export default function CollectionPage() {
  const unlocked = useGameStore((s) => s.unlockedHeritages)
  const [filter, setFilter] = useState<HeritageCategory | '全部'>('全部')
  const [selected, setSelected] = useState<Heritage | null>(null)

  const list = HERITAGES.filter((h) => filter === '全部' || h.category === filter)
  const collected = list.filter((h) => unlocked.includes(h.id)).length

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <header className="mb-8 text-center">
        <h1 className="font-serif text-3xl text-[var(--text)] sm:text-4xl">非遗图鉴</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          已收集{' '}
          <span className="font-mono text-[var(--aura-light)]">{unlocked.length}</span> /{' '}
          {HERITAGES.length} · 点亮省份解锁图鉴
        </p>
      </header>

      {/* 类别筛选 */}
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
              filter === c
                ? 'border-[var(--aura)] bg-[rgba(124,92,255,0.14)] text-[var(--aura-light)]'
                : 'border-[var(--border)] text-[var(--text-muted)] hover:border-[var(--aura)]/50'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mb-4 text-center text-xs text-[var(--text-muted)]">
        当前筛选：{collected} / {list.length}
      </div>

      {/* 图鉴网格 */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {list.map((h, idx) => {
          const owned = unlocked.includes(h.id)
          const Glyph = HeritageGlyph[h.icon]
          return (
            <motion.button
              key={h.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(idx * 0.02, 0.3) }}
              onClick={() => owned && setSelected(h)}
              disabled={!owned}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl border p-4 text-left transition-all ${
                owned
                  ? 'border-[var(--aura)]/40 bg-[var(--surface)] hover:border-[var(--aura)] hover:shadow-[0_0_24px_rgba(124,92,255,0.25)]'
                  : 'border-[var(--border)] bg-[var(--surface)]/50'
              }`}
            >
              <div className="mb-3 flex items-center justify-between">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl border"
                  style={{
                    borderColor: owned ? 'var(--aura)' : 'var(--border)',
                    color: owned ? 'var(--aura-light)' : 'var(--text-muted)',
                    background: owned ? 'rgba(124,92,255,0.1)' : 'transparent',
                  }}
                >
                  {owned ? (
                    Glyph ? (
                      <Glyph size={26} />
                    ) : null
                  ) : (
                    <span className="font-serif text-lg opacity-50">?</span>
                  )}
                </div>
                {owned && (
                  <span
                    className="text-[10px]"
                    style={{ color: RARITY_LABEL[h.rarity].color }}
                  >
                    {RARITY_LABEL[h.rarity].text}
                  </span>
                )}
              </div>
              <div className={`font-serif text-sm ${owned ? 'text-[var(--text)]' : 'text-[var(--text-muted)]/60'}`}>
                {owned ? h.name : '未解锁'}
              </div>
              <div className="mt-1 text-[11px] text-[var(--text-muted)]">
                {owned ? `${h.province} · ${LEVEL_LABEL[h.level]}` : '点亮该省解锁'}
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* 省份进度快览 */}
      <section className="mt-10 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <h2 className="mb-4 font-serif text-lg text-[var(--text)]">分省进度</h2>
        <div className="flex flex-wrap gap-1.5">
          {REGION_ORDER.map((region) => {
            const provs = PROVINCES.filter((p) => p.region === region)
            return (
              <div key={region} className="flex flex-col gap-1.5">
                <span className="text-[10px] text-[var(--text-muted)]">{region}</span>
                <div className="flex flex-wrap gap-1.5">
                  {provs.map((p) => {
                    const lit = useGameStore.getState().litProvinces.includes(p.name)
                    return (
                      <span
                        key={p.name}
                        title={p.name}
                        className={`rounded-md border px-2 py-1 text-[11px] ${
                          lit
                            ? 'border-[var(--aura)] bg-[rgba(124,92,255,0.15)] text-[var(--aura-light)]'
                            : 'border-[var(--border)] text-[var(--text-muted)]/60'
                        }`}
                      >
                        {p.name}
                      </span>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 详情弹窗 */}
      {selected && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => e.target === e.currentTarget && setSelected(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card max-w-md overflow-hidden rounded-4xl"
          >
            <HeritageDetail heritage={selected} onClose={() => setSelected(null)} />
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

function HeritageDetail({ heritage, onClose }: { heritage: Heritage; onClose: () => void }) {
  const Glyph = HeritageGlyph[heritage.icon]
  return (
    <div>
      <div className="relative overflow-hidden bg-gradient-to-br from-[rgba(124,92,255,0.18)] to-transparent p-6">
        <button
          onClick={onClose}
          className="icon-btn absolute right-4 top-4 h-9 w-9 rounded-full"
          aria-label="关闭"
        >
          <CloseIcon size={18} />
        </button>
        <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--aura)] bg-[rgba(124,92,255,0.12)] text-[var(--aura-light)]">
          {Glyph && <Glyph size={34} />}
        </div>
        <h2 className="font-serif text-2xl text-[var(--text)]">{heritage.name}</h2>
        <p className="mt-1 text-sm text-[var(--text-muted)]">{heritage.shortDesc}</p>
      </div>
      <div className="px-6 pb-6">
        <div className="mb-4 flex flex-wrap gap-2">
          <Tag>{heritage.province}</Tag>
          <Tag>{heritage.category}</Tag>
          <Tag>{LEVEL_LABEL[heritage.level]}</Tag>
          <Tag style={{ color: RARITY_LABEL[heritage.rarity].color }}>
            {RARITY_LABEL[heritage.rarity].text}
          </Tag>
        </div>
        <p className="text-sm leading-relaxed text-[var(--text-muted)]">{heritage.longDesc}</p>
      </div>
    </div>
  )
}

function Tag({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <span
      className="rounded-md border border-[var(--border)] px-2 py-0.5 text-[11px] text-[var(--text-muted)]"
      style={style}
    >
      {children}
    </span>
  )
}
