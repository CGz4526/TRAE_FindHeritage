import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useGameStore } from '@/store/gameStore'
import { MapIcon, BookIcon, TrophyIcon } from './Icons'

const STEPS = [
  {
    icon: MapIcon,
    title: '探索非遗版图',
    desc: '点击中国地图上任意省份，开启该省的非遗闯关挑战。',
  },
  {
    icon: TrophyIcon,
    title: '答题闯关',
    desc: '每省 5 道非遗题，答对 3 题即点亮该省。可用道具助你过关。',
  },
  {
    icon: BookIcon,
    title: '收集非遗图鉴',
    desc: '点亮的省份会解锁对应非遗图鉴卡片，集齐 34 省点亮九州。',
  },
]

export default function Onboarding() {
  const [step, setStep] = useState(0)
  const completeOnboarding = useGameStore((s) => s.completeOnboarding)
  const isOnboarded = useGameStore((s) => s.onboarded)

  if (isOnboarded) return null

  const isLast = step === STEPS.length - 1
  const Icon = STEPS[step].icon

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="glass-card w-full max-w-sm rounded-4xl p-7 text-center"
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        >
          {/* 品牌印章 */}
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--aura)] bg-[rgba(124,92,255,0.12)] text-[var(--aura-light)] shadow-[0_0_24px_rgba(124,92,255,0.4)]">
            <span className="font-serif text-xl">遗</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <div className="mb-4 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--aura)]/50 text-[var(--aura-light)]">
                  <Icon size={28} />
                </div>
              </div>
              <h2 className="mb-2 font-serif text-xl text-[var(--text)]">
                {STEPS[step].title}
              </h2>
              <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                {STEPS[step].desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* 进度点 */}
          <div className="my-6 flex justify-center gap-1.5">
            {STEPS.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === step ? 'w-6 bg-[var(--aura)]' : 'w-1.5 bg-[var(--border)]'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {step > 0 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="icon-btn flex-1 rounded-xl py-2.5 text-sm"
              >
                上一步
              </button>
            )}
            <button
              onClick={() => (isLast ? completeOnboarding() : setStep((s) => s + 1))}
              className="btn-aura flex-1 rounded-xl py-2.5 text-sm font-medium"
            >
              {isLast ? '开始寻遗' : '下一步'}
            </button>
          </div>

          {step === 0 && (
            <button
              onClick={completeOnboarding}
              className="mt-3 text-xs text-[var(--text-muted)] hover:text-[var(--text)]"
            >
              跳过引导
            </button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
