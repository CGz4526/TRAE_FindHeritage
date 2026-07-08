/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // 墨韵主题（深色，默认）
        ink: {
          900: '#0E0E12', // 主背景 墨黑
          800: '#16161D',
          700: '#1E1E28',
          600: '#262633',
          500: '#34343F',
        },
        // 宣纸主题（浅色）
        paper: {
          50: '#F5F2EA', // 主背景 宣纸白
          100: '#EFEAE0',
          200: '#E2DCCD',
        },
        // 紫调强调色（与 TRAE 主页呼应）
        aura: {
          DEFAULT: '#7C5CFF', // 主强调 紫调
          light: '#A78BFA', // 辅助 浅紫
          glow: '#9D7FFF', // 辉光
        },
        // 朱砂点缀（克制使用）
        cinnabar: {
          DEFAULT: '#C73E3A',
          light: '#E85A56',
        },
        moss: '#639922', // 苔绿 答对
        vermilion: '#E24B4A', // 朱红 答错
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', '"Source Han Serif SC"', 'serif'],
        sans: ['"Noto Sans SC"', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        '4xl': '1.5rem',
      },
      animation: {
        'glow-pulse': 'glowPulse 2.4s ease-in-out infinite',
        'ink-spread': 'inkSpread 0.6s ease-out',
        'scroll-unroll': 'scrollUnroll 0.5s ease-out',
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 18px rgba(124,92,255,0.35)' },
          '50%': { boxShadow: '0 0 32px rgba(124,92,255,0.65)' },
        },
        inkSpread: {
          '0%': { transform: 'scale(0.3)', opacity: '0.8' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        scrollUnroll: {
          '0%': { transform: 'scaleY(0)', opacity: '0' },
          '100%': { transform: 'scaleY(1)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'aura-radial': 'radial-gradient(circle at 50% 0%, rgba(124,92,255,0.18), transparent 60%)',
      },
    },
  },
  plugins: [],
}
