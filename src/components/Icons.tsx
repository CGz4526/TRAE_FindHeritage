import type { SVGProps } from 'react'

// ===== 镂空线性图标库（描边风格，禁用实心填充）=====
// 所有图标统一 viewBox 24x24，stroke=current，fill=none

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

const base = (size = 24): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
})

// ---- UI 通用图标 ----
export const MapIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" />
    <path d="M9 4v14M15 6v14" />
  </svg>
)

export const BookIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M4 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4Z" />
    <path d="M20 4h-7a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h8Z" />
  </svg>
)

export const TrophyIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M6 4h12v4a6 6 0 0 1-12 0Z" />
    <path d="M6 6H3v2a3 3 0 0 0 3 3M18 6h3v2a3 3 0 0 1-3 3" />
    <path d="M12 14v4M9 21h6M10 18h4l1 3H9Z" />
  </svg>
)

export const HomeIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M3 11 12 3l9 8" />
    <path d="M5 10v10h14V10" />
    <path d="M10 20v-6h4v6" />
  </svg>
)

export const SparkIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
    <circle cx="12" cy="12" r="2.5" />
  </svg>
)

export const FlameIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M12 3c1 3 4 4 4 8a4 4 0 0 1-8 0c0-2 1-3 1-4 0 1 1 2 2 2 0-2-1-4 1-6Z" />
  </svg>
)

export const StarIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M12 3l2.6 6 6.4.5-4.9 4.2 1.5 6.3L12 16.8 6.4 20l1.5-6.3L3 9.5 9.4 9Z" />
  </svg>
)

export const BrushIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M3 21c2 0 3-2 3-4M14 4l6 6M9 14 4 19l1 2 2-1 5-5" />
    <path d="M11 12 18 5a2 2 0 0 1 3 3l-7 7" />
  </svg>
)

export const SealIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <rect x="5" y="5" width="14" height="14" rx="1.5" />
    <path d="M9 9h6v6H9z" />
    <path d="M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2" />
  </svg>
)

export const ToolIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M14 4a4 4 0 0 0-5 5L3 15l3 3 6-6a4 4 0 0 0 5-5l-3 3-2-2 3-3Z" />
  </svg>
)

// ---- 道具图标 ----
export const HintIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M9 18h6M10 21h4" />
    <path d="M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3Z" />
  </svg>
)

export const FiftyIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M8 14a4 4 0 0 0 8 0M9 9h.01M15 9h.01" />
  </svg>
)

export const SkipIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M5 5l8 7-8 7Z" />
    <path d="M15 5v14" />
  </svg>
)

export const ReviveIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    <path d="M3 21v-5h5" />
  </svg>
)

export const CloseIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const CheckIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M5 12l5 5L19 7" />
  </svg>
)

export const ShareIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <circle cx="6" cy="12" r="2.5" />
    <circle cx="18" cy="6" r="2.5" />
    <circle cx="18" cy="18" r="2.5" />
    <path d="M8 11l8-4M8 13l8 4" />
  </svg>
)

export const SoundIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M4 9v6h4l5 4V5L8 9Z" />
    <path d="M16 8a5 5 0 0 1 0 8M19 5a9 9 0 0 1 0 14" />
  </svg>
)

export const MuteIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M4 9v6h4l5 4V5L8 9Z" />
    <path d="M16 9l5 5M21 9l-5 5" />
  </svg>
)

export const ResetIcon = ({ size, ...p }: IconProps) => (
  <svg {...base(size)} {...p}>
    <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
    <path d="M3 3v5h5" />
  </svg>
)

// ---- 非遗图鉴图标（按 heritage.icon key 映射）----
export const HeritageGlyph: Record<string, (p: IconProps) => JSX.Element> = {
  mask: ({ size, ...p }: IconProps) => (
    <svg {...base(size)} {...p}>
      <path d="M5 5h14v8a7 7 0 0 1-14 0Z" />
      <path d="M9 10h.01M15 10h.01M9 14c1 1 5 1 6 0" />
      <path d="M5 5 3 3M19 5l2-2" />
    </svg>
  ),
  fan: ({ size, ...p }: IconProps) => (
    <svg {...base(size)} {...p}>
      <path d="M12 3v9M12 12 4 19M12 12l8 7" />
      <path d="M5 16a14 14 0 0 1 14 0" />
      <path d="M12 12 9 19M12 12l3 7M12 12l-6-2M12 12l6-2" />
    </svg>
  ),
  acrobat: ({ size, ...p }: IconProps) => (
    <svg {...base(size)} {...p}>
      <circle cx="8" cy="6" r="2" />
      <path d="M8 8v5l-3 7M8 13l5-3 4 2" />
      <path d="M8 13l-4 4M13 10l3-3" />
    </svg>
  ),
  lacquer: ({ size, ...p }: IconProps) => (
    <svg {...base(size)} {...p}>
      <path d="M6 4h12v3H6zM7 7l-1 13h12L17 7" />
      <path d="M10 11h4M9 15h6" />
    </svg>
  ),
  horse: ({ size, ...p }: IconProps) => (
    <svg {...base(size)} {...p}>
      <path d="M4 18l2-5 3-2 4 3 5-1 2 3v3" />
      <path d="M6 13V8l3-3 2 2 3-1 2 3" />
      <path d="M4 18h16M9 18v2M15 18v2" />
    </svg>
  ),
  jade: ({ size, ...p }: IconProps) => (
    <svg {...base(size)} {...p}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 4v3M12 17v3M4 12h3M17 12h3" />
    </svg>
  ),
  drum: ({ size, ...p }: IconProps) => (
    <svg {...base(size)} {...p}>
      <ellipse cx="12" cy="6" rx="7" ry="2.5" />
      <path d="M5 6v12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6" />
      <path d="M5 10c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5M5 14c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" />
    </svg>
  ),
  scroll: ({ size, ...p }: IconProps) => (
    <svg {...base(size)} {...p}>
      <path d="M5 4h11a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H8" />
      <path d="M8 4a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3" />
      <path d="M9 9h6M9 13h6" />
    </svg>
  ),
  needle: ({ size, ...p }: IconProps) => (
    <svg {...base(size)} {...p}>
      <path d="M4 20 16 8M16 8l3-3a2 2 0 0 0-3-3l-3 3" />
      <path d="M14 10l2 2M11 13l2 2" />
    </svg>
  ),
  porcelain: ({ size, ...p }: IconProps) => (
    <svg {...base(size)} {...p}>
      <path d="M8 4h8l1 4a5 5 0 0 1-10 0Z" />
      <path d="M8 4 7 2M16 4l1-2" />
      <path d="M9 13c0 4-2 6-2 8h10c0-2-2-4-2-8" />
    </svg>
  ),
  house: ({ size, ...p }: IconProps) => (
    <svg {...base(size)} {...p}>
      <ellipse cx="12" cy="12" rx="8" ry="5" />
      <path d="M4 12v3a8 5 0 0 0 16 0v-3" />
      <path d="M8 11h.01M16 11h.01M12 13h.01" />
    </svg>
  ),
  kite: ({ size, ...p }: IconProps) => (
    <svg {...base(size)} {...p}>
      <path d="M12 3 4 11l8 8 8-8Z" />
      <path d="M12 3v16M4 11h16" />
      <path d="M12 19c2 1 4 1 6 0M12 21c2 1 4 1 6 0" />
    </svg>
  ),
  martial: ({ size, ...p }: IconProps) => (
    <svg {...base(size)} {...p}>
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v6M12 13l-4 7M12 13l4 7M9 10l-4 1M15 10l4 1" />
    </svg>
  ),
  festival: ({ size, ...p }: IconProps) => (
    <svg {...base(size)} {...p}>
      <circle cx="12" cy="9" r="5" />
      <path d="M12 4V2M12 14v8M8 18h8" />
      <path d="M9 9h.01M15 9h.01" />
    </svg>
  ),
  textile: ({ size, ...p }: IconProps) => (
    <svg {...base(size)} {...p}>
      <path d="M4 6h16M4 6v12M20 6v12M4 18h16" />
      <path d="M8 6v12M12 6v12M16 6v12" />
    </svg>
  ),
  wave: ({ size, ...p }: IconProps) => (
    <svg {...base(size)} {...p}>
      <path d="M3 8c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      <path d="M3 13c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
      <path d="M3 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0" />
    </svg>
  ),
  song: ({ size, ...p }: IconProps) => (
    <svg {...base(size)} {...p}>
      <path d="M9 18V6l8-2v10" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="15" cy="14" r="2" />
    </svg>
  ),
  water: ({ size, ...p }: IconProps) => (
    <svg {...base(size)} {...p}>
      <path d="M12 3c3 4 5 7 5 10a5 5 0 0 1-10 0c0-3 2-6 5-10Z" />
      <path d="M10 13a2 2 0 0 0 2 2" />
    </svg>
  ),
  thangka: ({ size, ...p }: IconProps) => (
    <svg {...base(size)} {...p}>
      <rect x="5" y="5" width="14" height="14" rx="1" />
      <path d="M8 8h8v8H8z" />
      <path d="M5 5 3 3M19 5l2-2M5 19l-2 2M19 19l2 2" />
    </svg>
  ),
  flower: ({ size, ...p }: IconProps) => (
    <svg {...base(size)} {...p}>
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 9.5c0-3 1-5 0-6.5-1 1.5 0 3.5 0 6.5M14.5 12c3 0 5 1 6.5 0-1.5-1-3.5 0-6.5 0M12 14.5c0 3-1 5 0 6.5 1-1.5 0-3.5 0-6.5M9.5 12c-3 0-5-1-6.5 0 1.5 1 3.5 0 6.5 0" />
    </svg>
  ),
  shadow: ({ size, ...p }: IconProps) => (
    <svg {...base(size)} {...p}>
      <path d="M4 6h16M4 18h16" />
      <path d="M8 6v12M16 6v12" />
      <path d="M8 10h8M8 14h8" />
    </svg>
  ),
  puppet: ({ size, ...p }: IconProps) => (
    <svg {...base(size)} {...p}>
      <circle cx="12" cy="6" r="2.5" />
      <path d="M12 8.5V15M12 12l-5-3M12 12l5-3M12 15l-4 5M12 15l4 5" />
    </svg>
  ),
}

export const GLYPH_KEYS = Object.keys(HeritageGlyph)
