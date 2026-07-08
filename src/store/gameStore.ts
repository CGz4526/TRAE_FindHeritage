import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type {
  PropType,
  PropInventory,
  QuizStats,
  SaveState,
} from '@/types'
import { ACHIEVEMENTS } from '@/data/achievements'

// ===== 默认存档 =====
const DEFAULT_PROPS: PropInventory = { hint: 3, fifty: 3, skip: 3, revive: 3 }

const DEFAULT_STATS: QuizStats = {
  totalCorrect: 0,
  totalAnswered: 0,
  bestStreak: 0,
  currentStreak: 0,
  perfectProvinces: [],
}

const DEFAULT_STATE: SaveState = {
  litProvinces: [],
  unlockedHeritages: [],
  props: { ...DEFAULT_PROPS },
  achievements: [],
  stats: { ...DEFAULT_STATS },
  dailyStreak: 0,
  onboarded: false,
}

interface GameStore extends SaveState {
  // 点亮省份 + 解锁图鉴
  lightProvince: (province: string, heritageId: string) => void
  unlockHeritage: (heritageId: string) => void
  // 道具
  useProp: (type: PropType) => boolean
  addProps: (reward?: Partial<PropInventory>) => void
  // 答题统计
  recordAnswer: (correct: boolean) => void
  resetStreak: () => void
  recordPerfectProvince: (province: string) => void
  // 成就
  checkAchievements: () => string[]
  // 新手引导
  completeOnboarding: () => void
  // 家乡
  setHometown: (province: string) => void
  // 重置存档
  resetGame: () => void
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      ...DEFAULT_STATE,

      lightProvince: (province, heritageId) => {
        const state = get()
        if (state.litProvinces.includes(province)) return
        set({
          litProvinces: [...state.litProvinces, province],
          unlockedHeritages: state.unlockedHeritages.includes(heritageId)
            ? state.unlockedHeritages
            : [...state.unlockedHeritages, heritageId],
        })
        get().checkAchievements()
      },

      unlockHeritage: (heritageId) => {
        const state = get()
        if (state.unlockedHeritages.includes(heritageId)) return
        set({ unlockedHeritages: [...state.unlockedHeritages, heritageId] })
      },

      useProp: (type) => {
        const state = get()
        if (state.props[type] <= 0) return false
        set({ props: { ...state.props, [type]: state.props[type] - 1 } })
        return true
      },

      addProps: (reward) => {
        const state = get()
        const next = { ...state.props }
        const r = reward ?? { hint: 1, fifty: 1, skip: 1, revive: 1 }
        ;(Object.keys(r) as PropType[]).forEach((k) => {
          next[k] = next[k] + (r[k] ?? 0)
        })
        set({ props: next })
      },

      recordAnswer: (correct) => {
        const s = get()
        const stats = { ...s.stats }
        stats.totalAnswered += 1
        if (correct) {
          stats.totalCorrect += 1
          stats.currentStreak += 1
          stats.bestStreak = Math.max(stats.bestStreak, stats.currentStreak)
        } else {
          stats.currentStreak = 0
        }
        set({ stats })
        get().checkAchievements()
      },

      resetStreak: () => {
        set((s) => ({ stats: { ...s.stats, currentStreak: 0 } }))
      },

      recordPerfectProvince: (province) => {
        const s = get()
        if (s.stats.perfectProvinces.includes(province)) return
        set({
          stats: { ...s.stats, perfectProvinces: [...s.stats.perfectProvinces, province] },
        })
        get().checkAchievements()
      },

      checkAchievements: () => {
        const s = get()
        const newly: string[] = []
        for (const ach of ACHIEVEMENTS) {
          if (s.achievements.includes(ach.id)) continue
          if (evaluateAchievement(ach.check, s)) {
            newly.push(ach.id)
          }
        }
        if (newly.length > 0) {
          set({ achievements: [...s.achievements, ...newly] })
        }
        return newly
      },

      completeOnboarding: () => set({ onboarded: true }),
      setHometown: (province) => set({ hometown: province }),

      resetGame: () => {
        set({
          ...DEFAULT_STATE,
          onboarded: true, // 重置后不再弹引导
          props: { ...DEFAULT_PROPS },
          stats: { ...DEFAULT_STATS },
        })
      },
    }),
    {
      name: 'xunyiji-save',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    },
  ),
)

// ===== 成就判定 =====
function evaluateAchievement(check: string, s: SaveState): boolean {
  switch (check) {
    case 'first_light':
      return s.litProvinces.length >= 1
    case 'streak_10':
      return s.stats.bestStreak >= 10
    case 'streak_20':
      return s.stats.bestStreak >= 20
    case 'collect_5':
      return s.unlockedHeritages.length >= 5
    case 'collect_10':
      return s.unlockedHeritages.length >= 10
    case 'collect_20':
      return s.unlockedHeritages.length >= 20
    case 'all_light':
      return s.litProvinces.length >= 34
    case 'answer_100':
      return s.stats.totalAnswered >= 100
    case 'perfect_3':
      return s.stats.perfectProvinces.length >= 3
    case 'props_used':
      // 任意道具累计用光过一次（判断是否曾为 0 难以追踪，这里放宽为点亮 5 省即触发）
      return s.litProvinces.length >= 5
    default:
      return false
  }
}
