// ===== 寻遗记 数据模型 =====

/** 非遗十大类别 */
export type HeritageCategory =
  | '民间文学'
  | '传统音乐'
  | '传统舞蹈'
  | '传统戏剧'
  | '曲艺'
  | '传统体育、游艺与杂技'
  | '传统美术'
  | '传统技艺'
  | '传统医药'
  | '民俗'

/** 保护级别 */
export type HeritageLevel = 'world' | 'national' | 'province'

/** 图鉴稀有度 */
export type Rarity = 'common' | 'rare' | 'epic'

/** 题目难度 */
export type Difficulty = 'easy' | 'normal' | 'hard'

/** 题型 */
export type QuestionType = 'single' | 'multi' | 'judge'

/** 非遗图鉴 */
export interface Heritage {
  id: string
  name: string
  province: string
  category: HeritageCategory
  level: HeritageLevel
  icon: string // 镂空线性图标 key（见 iconMap）
  shortDesc: string
  longDesc: string
  rarity: Rarity
}

/** 题目 */
export interface Question {
  id: string
  province: string
  category: HeritageCategory
  difficulty: Difficulty
  type: QuestionType
  stem: string
  options: string[]
  correct: number[] // 正确答案索引（单选为 1 个元素）
  explanation: string
  heritageId: string // 关联非遗 id
  source?: string
}

/** 道具类型 */
export type PropType = 'hint' | 'fifty' | 'skip' | 'revive'

export interface PropInventory {
  hint: number
  fifty: number
  skip: number
  revive: number
}

/** 成就 */
export interface Achievement {
  id: string
  name: string
  desc: string
  icon: string
  /** 判定函数标识，由 store 解析 */
  check: string
}

/** 答题统计 */
export interface QuizStats {
  totalCorrect: number
  totalAnswered: number
  bestStreak: number
  currentStreak: number
  perfectProvinces: string[] // 零失误通关的省份
}

/** 用户存档 */
export interface SaveState {
  litProvinces: string[]
  unlockedHeritages: string[]
  props: PropInventory
  achievements: string[]
  stats: QuizStats
  hometown?: string
  nickname?: string
  lastDailyDate?: string
  dailyStreak: number
  onboarded: boolean
}

/** 省份元数据 */
export interface ProvinceMeta {
  name: string
  region: '华北' | '东北' | '华东' | '华中' | '华南' | '西南' | '西北' | '港澳台'
  heritageCount: number // 代表非遗数量（用于展示）
}
