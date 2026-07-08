import type { Achievement } from '@/types'

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first_light', name: '初探遗珍', desc: '点亮第一个省份', icon: 'spark', check: 'first_light' },
  { id: 'streak_10', name: '十步芳草', desc: '连续答对 10 题', icon: 'flame', check: 'streak_10' },
  { id: 'streak_20', name: '博古通今', desc: '连续答对 20 题', icon: 'flame', check: 'streak_20' },
  { id: 'collect_5', name: '初窥门径', desc: '收集 5 张非遗图鉴', icon: 'book', check: 'collect_5' },
  { id: 'collect_10', name: '渐入佳境', desc: '收集 10 张非遗图鉴', icon: 'book', check: 'collect_10' },
  { id: 'collect_20', name: '雅集满堂', desc: '收集 20 张非遗图鉴', icon: 'book', check: 'collect_20' },
  { id: 'all_light', name: '九州遗韵', desc: '点亮全部 34 个省份', icon: 'star', check: 'all_light' },
  { id: 'answer_100', name: '勤学不辍', desc: '累计答题 100 道', icon: 'brush', check: 'answer_100' },
  { id: 'perfect_3', name: '毫厘不爽', desc: '零失误通关 3 个省份', icon: 'seal', check: 'perfect_3' },
  { id: 'props_used', name: '善假于物', desc: '点亮 5 个省份（道具运用）', icon: 'tool', check: 'props_used' },
]
