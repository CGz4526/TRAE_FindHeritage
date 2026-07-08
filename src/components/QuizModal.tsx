import { useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { PropType, Question } from '@/types'
import { QUESTIONS_BY_PROVINCE } from '@/data/questions'
import { HERITAGE_BY_ID } from '@/data/heritages'
import { HERITAGES } from '@/data/heritages'
import { useGameStore } from '@/store/gameStore'
import {
  HintIcon,
  FiftyIcon,
  SkipIcon,
  ReviveIcon,
  CloseIcon,
  CheckIcon,
  HeritageGlyph,
} from './Icons'

const PASS_THRESHOLD = 3
const QUESTIONS_PER_ROUND = 5

interface QuizModalProps {
  province: string
  onClose: () => void
}

// 洗牌
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const PROP_META: Record<PropType, { label: string; icon: typeof HintIcon; desc: string }> = {
  hint: { label: '提示', icon: HintIcon, desc: '暗化一个错误项' },
  fifty: { label: '五五开', icon: FiftyIcon, desc: '去掉两个错误项' },
  skip: { label: '跳过', icon: SkipIcon, desc: '跳过本题，不计对错' },
  revive: { label: '复活', icon: ReviveIcon, desc: '答错后重答本题' },
}

export default function QuizModal({ province, onClose }: QuizModalProps) {
  // 每次开启新省份时重新抽题
  const [round] = useState(() => {
    const pool = QUESTIONS_BY_PROVINCE[province] ?? []
    return shuffle(pool).slice(0, QUESTIONS_PER_ROUND)
  })

  const [qIndex, setQIndex] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [selected, setSelected] = useState<number | null>(null)
  const [dimmed, setDimmed] = useState<number[]>([]) // 被道具暗化/移除的选项索引
  const [phase, setPhase] = useState<'playing' | 'finished'>('playing')
  const [usedReviveThisQ, setUsedReviveThisQ] = useState(false)

  const props = useGameStore((s) => s.props)
  const useProp = useGameStore((s) => s.useProp)
  const recordAnswer = useGameStore((s) => s.recordAnswer)
  const resetStreak = useGameStore((s) => s.resetStreak)
  const lightProvince = useGameStore((s) => s.lightProvince)
  const recordPerfectProvince = useGameStore((s) => s.recordPerfectProvince)
  const addProps = useGameStore((s) => s.addProps)

  const current: Question | undefined = round[qIndex]
  const heritage = current ? HERITAGE_BY_ID[current.heritageId] : undefined

  const isCorrect = current && selected !== null && current.correct.includes(selected)

  const handleAnswer = useCallback(
    (idx: number) => {
      if (answered || dimmed.includes(idx)) return
      setSelected(idx)
      setAnswered(true)
      const right = current!.correct.includes(idx)
      recordAnswer(right)
      if (right) {
        setCorrectCount((c) => c + 1)
      } else {
        resetStreak()
      }
    },
    [answered, dimmed, current, recordAnswer, resetStreak],
  )

  // 道具：提示 — 暗化一个错误项
  const useHint = () => {
    if (useProp('hint')) {
      const wrongs = current!.options
        .map((_, i) => i)
        .filter((i) => !current!.correct.includes(i) && !dimmed.includes(i))
      if (wrongs.length > 0) {
        const pick = wrongs[Math.floor(Math.random() * wrongs.length)]
        setDimmed((d) => [...d, pick])
      }
    }
  }

  // 道具：五五开 — 去掉两个错误项
  const useFifty = () => {
    if (useProp('fifty')) {
      const wrongs = current!.options
        .map((_, i) => i)
        .filter((i) => !current!.correct.includes(i) && !dimmed.includes(i))
      const toRemove = shuffle(wrongs).slice(0, 2)
      setDimmed((d) => [...d, ...toRemove])
    }
  }

  // 道具：跳过 — 进入下一题，不计对错
  const useSkip = () => {
    if (!useProp('skip')) return
    recordAnswer(false)
    resetStreak()
    goNext()
  }

  // 道具：复活 — 答错后重置本题状态
  const useRevive = () => {
    if (!useProp('revive')) return
    setAnswered(false)
    setSelected(null)
    setUsedReviveThisQ(true)
  }

  const goNext = () => {
    if (qIndex + 1 >= round.length) {
      finish()
    } else {
      setQIndex((i) => i + 1)
      setAnswered(false)
      setSelected(null)
      setDimmed([])
      setUsedReviveThisQ(false)
    }
  }

  const finish = () => {
    setPhase('finished')
  }

  if (!current && phase === 'playing') {
    return (
      <ModalShell onClose={onClose}>
        <div className="p-8 text-center text-[var(--text-muted)]">该省份题库筹备中</div>
      </ModalShell>
    )
  }

  if (phase === 'finished') {
    const passed = correctCount >= PASS_THRESHOLD
    // 通关：点亮省份 + 解锁图鉴 + 记录零失误 + 奖励道具
    if (passed && !useGameStore.getState().litProvinces.includes(province)) {
      const h = HERITAGES.find((h) => h.province === province)
      if (h) lightProvince(province, h.id)
      if (correctCount === round.length) recordPerfectProvince(province)
      addProps({ hint: 1, fifty: 1 })
    }
    return (
      <ModalShell onClose={onClose} wide>
        <ResultView
          province={province}
          correct={correctCount}
          total={round.length}
          passed={passed}
          heritage={HERITAGES.find((h) => h.province === province)}
          onClose={onClose}
        />
      </ModalShell>
    )
  }

  return (
    <ModalShell onClose={onClose} wide>
      <div className="px-5 pt-5 sm:px-7 sm:pt-7">
        {/* 顶部：省份 + 进度 */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[var(--aura)] shadow-[0_0_10px_var(--aura)]" />
            <span className="font-serif text-sm tracking-wider text-[var(--aura-light)]">
              {province} · 非遗挑战
            </span>
          </div>
          <button onClick={onClose} className="icon-btn h-9 w-9 rounded-full" aria-label="关闭">
            <CloseIcon size={18} />
          </button>
        </div>

        <div className="mb-1 flex items-center justify-between text-xs text-[var(--text-muted)]">
          <span>
            第 {qIndex + 1} / {round.length} 题
          </span>
          <span>
            已答对 <span className="font-mono text-[var(--moss)]">{correctCount}</span> /{' '}
            {round.length}
          </span>
        </div>
        {/* 进度条 */}
        <div className="mb-5 h-1 overflow-hidden rounded-full bg-[var(--border)]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[var(--aura)] to-[var(--aura-light)]"
            initial={false}
            animate={{ width: `${((qIndex + (answered ? 1 : 0)) / round.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* 题干 */}
        <AnimatePresence mode="wait">
          <motion.div
            key={qIndex}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-md border border-[var(--border)] px-2 py-0.5 text-[11px] text-[var(--text-muted)]">
                {current!.category}
              </span>
              <span className="rounded-md border border-[var(--border)] px-2 py-0.5 text-[11px] text-[var(--text-muted)]">
                {current!.difficulty === 'easy' ? '简单' : current!.difficulty === 'normal' ? '普通' : '困难'}
              </span>
            </div>
            <h3 className="mb-5 font-serif text-lg leading-relaxed text-[var(--text)] sm:text-xl">
              {current!.stem}
            </h3>

            {/* 选项 */}
            <div className="flex flex-col gap-2.5">
              {current!.options.map((opt, i) => {
                const showCorrect = answered && current!.correct.includes(i)
                const showWrong = answered && selected === i && !current!.correct.includes(i)
                return (
                  <button
                    key={i}
                    disabled={answered || dimmed.includes(i)}
                    onClick={() => handleAnswer(i)}
                    className={`quiz-opt ${showCorrect ? 'correct' : ''} ${showWrong ? 'wrong' : ''} ${dimmed.includes(i) ? 'dimmed' : ''}`}
                  >
                    <span className="opt-badge">{String.fromCharCode(65 + i)}</span>
                    <span className="flex-1">{opt}</span>
                    {showCorrect && <CheckIcon size={18} />}
                  </button>
                )
              })}
            </div>

            {/* 解析 */}
            <AnimatePresence>
              {answered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-4">
                    <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-[var(--aura-light)]">
                      <span>解析</span>
                      {heritage && (
                        <span className="text-[var(--text-muted)]">· {heritage.name}</span>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed text-[var(--text-muted)]">
                      {current!.explanation}
                    </p>
                    {current!.source && (
                      <p className="mt-2 text-[11px] text-[var(--text-muted)]/70">
                        来源：{current!.source}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 底部操作栏 */}
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-[var(--border)] px-5 py-4 sm:px-7">
        {/* 道具组 */}
        <div className="flex items-center gap-2">
          {(['hint', 'fifty', 'skip'] as PropType[]).map((t) => {
            const meta = PROP_META[t]
            const Icon = meta.icon
            const disabled = answered || (t === 'fifty' && dimmed.length >= 2) || props[t] <= 0
            return (
              <button
                key={t}
                onClick={() => {
                  if (t === 'hint') useHint()
                  if (t === 'fifty') useFifty()
                  if (t === 'skip') useSkip()
                }}
                disabled={disabled}
                title={`${meta.label}：${meta.desc}（剩余 ${props[t]}）`}
                className="flex flex-col items-center gap-0.5 rounded-xl border border-[var(--border)] px-2.5 py-1.5 text-[var(--text-muted)] transition-colors hover:border-[var(--aura)] hover:text-[var(--aura-light)] disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Icon size={18} />
                <span className="font-mono text-[10px]">×{props[t]}</span>
              </button>
            )
          })}
          {/* 复活：仅答错时可用 */}
          {answered && !isCorrect && !usedReviveThisQ && props.revive > 0 && (
            <button
              onClick={useRevive}
              title={`复活：重答本题（剩余 ${props.revive}）`}
              className="flex flex-col items-center gap-0.5 rounded-xl border border-[var(--cinnabar)] px-2.5 py-1.5 text-[var(--cinnabar-light)] transition-colors hover:bg-[rgba(199,62,58,0.12)]"
            >
              <ReviveIcon size={18} />
              <span className="font-mono text-[10px]">×{props.revive}</span>
            </button>
          )}
        </div>

        {/* 下一题 / 完成 */}
        {answered ? (
          <button onClick={goNext} className="btn-aura rounded-xl px-6 py-2.5 text-sm font-medium">
            {qIndex + 1 >= round.length ? '查看结果' : '下一题'}
          </button>
        ) : (
          <span className="text-xs text-[var(--text-muted)]">答对 {PASS_THRESHOLD} 题即可过关</span>
        )}
      </div>
    </ModalShell>
  )
}

function ModalShell({
  children,
  onClose,
  wide,
}: {
  children: React.ReactNode
  onClose: () => void
  wide?: boolean
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        className={`glass-card max-h-[92vh] w-full overflow-y-auto rounded-t-4xl sm:rounded-4xl ${wide ? 'sm:max-w-lg' : 'sm:max-w-md'}`}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

function ResultView({
  province,
  correct,
  total,
  passed,
  heritage,
  onClose,
}: {
  province: string
  correct: number
  total: number
  passed: boolean
  heritage?: import('@/types').Heritage
  onClose: () => void
}) {
  return (
    <div className="px-6 py-8 text-center sm:px-8">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 240, damping: 18 }}
        className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border-2"
        style={{
          borderColor: passed ? 'var(--aura)' : 'var(--border)',
          boxShadow: passed ? '0 0 40px rgba(124,92,255,0.5)' : 'none',
        }}
      >
        {passed ? (
          heritage && HeritageGlyph[heritage.icon] ? (
            (() => {
              const G = HeritageGlyph[heritage.icon]
              return <G size={36} style={{ color: 'var(--aura-light)' }} />
            })()
          ) : (
            <CheckIcon size={36} style={{ color: 'var(--aura-light)' }} />
          )
        ) : (
          <span className="font-serif text-2xl text-[var(--text-muted)]">·</span>
        )}
      </motion.div>

      <div className="mb-1 font-mono text-sm text-[var(--text-muted)]">
        {correct} / {total}
      </div>
      <h3 className="mb-2 font-serif text-2xl text-[var(--text)]">
        {passed ? `${province} 已点亮` : '再试一次'}
      </h3>

      {passed && heritage && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mb-5 max-w-sm rounded-2xl border border-[var(--aura)]/40 bg-[var(--surface-2)] p-4"
        >
          <div className="mb-1 text-xs text-[var(--aura-light)]">图鉴已解锁</div>
          <div className="font-serif text-lg text-[var(--text)]">{heritage.name}</div>
          <div className="text-sm text-[var(--text-muted)]">{heritage.shortDesc}</div>
        </motion.div>
      )}

      {!passed && (
        <p className="mx-auto mb-5 max-w-xs text-sm text-[var(--text-muted)]">
          还差一点，达到 {PASS_THRESHOLD} 题即可点亮该省
        </p>
      )}

      <div className="flex justify-center gap-3">
        <button onClick={onClose} className="btn-aura rounded-xl px-7 py-2.5 text-sm font-medium">
          {passed ? '返回版图' : '稍后再战'}
        </button>
      </div>
    </div>
  )
}
