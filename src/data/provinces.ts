import type { ProvinceMeta } from '@/types'

// 34 省份元数据（按七大地理分区）
export const PROVINCES: ProvinceMeta[] = [
  // 华北
  { name: '北京', region: '华北', heritageCount: 144 },
  { name: '天津', region: '华北', heritageCount: 56 },
  { name: '河北', region: '华北', heritageCount: 168 },
  { name: '山西', region: '华北', heritageCount: 182 },
  { name: '内蒙古', region: '华北', heritageCount: 110 },
  // 东北
  { name: '辽宁', region: '东北', heritageCount: 87 },
  { name: '吉林', region: '东北', heritageCount: 64 },
  { name: '黑龙江', region: '东北', heritageCount: 71 },
  // 华东
  { name: '上海', region: '华东', heritageCount: 63 },
  { name: '江苏', region: '华东', heritageCount: 152 },
  { name: '浙江', region: '华东', heritageCount: 196 },
  { name: '安徽', region: '华东', heritageCount: 122 },
  { name: '福建', region: '华东', heritageCount: 145 },
  { name: '江西', region: '华东', heritageCount: 98 },
  { name: '山东', region: '华东', heritageCount: 175 },
  // 华中
  { name: '河南', region: '华中', heritageCount: 178 },
  { name: '湖北', region: '华中', heritageCount: 137 },
  { name: '湖南', region: '华中', heritageCount: 128 },
  // 华南
  { name: '广东', region: '华南', heritageCount: 165 },
  { name: '广西', region: '华南', heritageCount: 89 },
  { name: '海南', region: '华南', heritageCount: 38 },
  // 西南
  { name: '重庆', region: '西南', heritageCount: 78 },
  { name: '四川', region: '西南', heritageCount: 173 },
  { name: '贵州', region: '西南', heritageCount: 102 },
  { name: '云南', region: '西南', heritageCount: 145 },
  { name: '西藏', region: '西南', heritageCount: 62 },
  // 西北
  { name: '陕西', region: '西北', heritageCount: 156 },
  { name: '甘肃', region: '西北', heritageCount: 86 },
  { name: '青海', region: '西北', heritageCount: 41 },
  { name: '宁夏', region: '西北', heritageCount: 37 },
  { name: '新疆', region: '西北', heritageCount: 78 },
  // 港澳台
  { name: '香港', region: '港澳台', heritageCount: 12 },
  { name: '澳门', region: '港澳台', heritageCount: 11 },
  { name: '台湾', region: '港澳台', heritageCount: 18 },
]

export const PROVINCE_NAMES = PROVINCES.map((p) => p.name)

// 短名集合，用于快速查找
const PROVINCE_NAME_SET = new Set(PROVINCE_NAMES)

/**
 * 将 GeoJSON 中的省份全称（如"北京市""广西壮族自治区""内蒙古自治区"）
 * 规范化为题库使用的短名（"北京""广西""内蒙古"）。
 * DataV GeoJSON 的 properties.name 带后缀，题库/图鉴/store 均使用短名。
 */
export function normalizeProvinceName(geoName: string): string {
  if (PROVINCE_NAME_SET.has(geoName)) return geoName
  // 按长度优先剥离后缀（壮族/维吾尔/回族 必须在 自治区 之前）
  const stripped = geoName.replace(
    /(壮族自治区|维吾尔自治区|回族自治区|自治区|特别行政区|省|市)$/,
    '',
  )
  if (PROVINCE_NAME_SET.has(stripped)) return stripped
  return geoName
}

export const REGION_ORDER: ProvinceMeta['region'][] = [
  '华北',
  '东北',
  '华东',
  '华中',
  '华南',
  '西南',
  '西北',
  '港澳台',
]

// ECharts 地图使用的省份名映射（部分省份 ECharts 注册名需对齐）
export const ECHARTS_PROVINCE_MAP: Record<string, string> = {
  北京: '北京',
  天津: '天津',
  河北: '河北',
  山西: '山西',
  内蒙古: '内蒙古',
  辽宁: '辽宁',
  吉林: '吉林',
  黑龙江: '黑龙江',
  上海: '上海',
  江苏: '江苏',
  浙江: '浙江',
  安徽: '安徽',
  福建: '福建',
  江西: '江西',
  山东: '山东',
  河南: '河南',
  湖北: '湖北',
  湖南: '湖南',
  广东: '广东',
  广西: '广西',
  海南: '海南',
  重庆: '重庆',
  四川: '四川',
  贵州: '贵州',
  云南: '云南',
  西藏: '西藏',
  陕西: '陕西',
  甘肃: '甘肃',
  青海: '青海',
  宁夏: '宁夏',
  新疆: '新疆',
  香港: '香港',
  澳门: '澳门',
  台湾: '台湾',
}
