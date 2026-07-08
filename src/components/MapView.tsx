import { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts/core'
import { MapChart } from 'echarts/charts'
import { GeoComponent, TooltipComponent, VisualMapComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import { useGameStore } from '@/store/gameStore'
import { normalizeProvinceName } from '@/data/provinces'

echarts.use([MapChart, GeoComponent, TooltipComponent, VisualMapComponent, CanvasRenderer])

interface MapViewProps {
  onProvinceClick: (province: string) => void
}

// 阿里云 DataV 中国地图 GeoJSON（含港澳台）
const CHINA_GEO_URL = 'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json'

export default function MapView({ onProvinceClick }: MapViewProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstance = useRef<echarts.ECharts | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const litProvinces = useGameStore((s) => s.litProvinces)

  useEffect(() => {
    let disposed = false
    const init = async () => {
      try {
        const res = await fetch(CHINA_GEO_URL)
        if (!res.ok) throw new Error('地图数据加载失败')
        const geo = await res.json()
        if (disposed) return
        echarts.registerMap('china', geo)

        if (!chartRef.current) return
        chartInstance.current = echarts.init(chartRef.current)

        const provinces = geo.features.map((f: any) => f.properties.name) as string[]

        const renderChart = () => {
          if (!chartInstance.current) return
          // litProvinces 存的是短名，需用规范化后的短名匹配
          const data = provinces.map((name: string) => ({
            name,
            value: litProvinces.includes(normalizeProvinceName(name)) ? 1 : 0,
          }))

          chartInstance.current.setOption({
            tooltip: {
              trigger: 'item',
              backgroundColor: 'rgba(22,22,29,0.92)',
              borderColor: 'rgba(124,92,255,0.4)',
              borderWidth: 1,
              textStyle: { color: '#edeaf3', fontSize: 13 },
              formatter: (p: any) => {
                const lit = p.value === 1
                return `<div style="font-weight:600">${p.name}</div><div style="color:${lit ? '#a78bfa' : '#9b98a8'};font-size:12px;margin-top:2px">${lit ? '已点亮 ✓' : '点击闯关'}</div>`
              },
            },
            visualMap: { show: false, min: 0, max: 1, inRange: { opacity: 1 } },
            series: [
              {
                type: 'map',
                map: 'china',
                roam: true,
                scaleLimit: { min: 1, max: 6 },
                zoom: 1.15,
                label: { show: false },
                emphasis: {
                  label: { show: true, color: '#edeaf3', fontSize: 12 },
                  itemStyle: {
                    areaColor: 'rgba(124,92,255,0.28)',
                    borderColor: '#a78bfa',
                    borderWidth: 1.4,
                  },
                },
                select: {
                  label: { show: true, color: '#fff' },
                  itemStyle: { areaColor: 'rgba(124,92,255,0.45)' },
                },
                itemStyle: {
                  areaColor: 'rgba(38,38,51,0.85)',
                  borderColor: 'rgba(124,92,255,0.22)',
                  borderWidth: 0.8,
                },
                data,
              },
            ],
          })
        }

        renderChart()

        chartInstance.current.on('click', (params: any) => {
          if (params.name) onProvinceClick(normalizeProvinceName(params.name))
        })

        const resize = () => chartInstance.current?.resize()
        window.addEventListener('resize', resize)
        setLoading(false)

        // 清理函数存到实例上
        ;(chartInstance.current as any).__cleanup = () => {
          window.removeEventListener('resize', resize)
        }
      } catch (e) {
        console.error(e)
        setError(true)
        setLoading(false)
      }
    }
    init()

    return () => {
      disposed = true
      const inst = chartInstance.current as any
      if (inst?.__cleanup) inst.__cleanup()
      chartInstance.current?.dispose()
      chartInstance.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 点亮状态变化时刷新
  useEffect(() => {
    if (!chartInstance.current) return
    const option = chartInstance.current.getOption() as any
    if (!option?.series?.[0]?.data) return
    const series = option.series[0]
    series.data = series.data.map((d: any) => {
      const lit = litProvinces.includes(normalizeProvinceName(d.name))
      return {
        ...d,
        value: lit ? 1 : 0,
        itemStyle: lit
          ? { areaColor: 'rgba(124,92,255,0.38)', borderColor: '#a78bfa', borderWidth: 1.2, shadowColor: 'rgba(124,92,255,0.6)', shadowBlur: 16 }
          : { areaColor: 'rgba(38,38,51,0.85)', borderColor: 'rgba(124,92,255,0.22)', borderWidth: 0.8 },
      }
    })
    chartInstance.current.setOption({ series: [series] })
  }, [litProvinces])

  if (error) {
    return (
      <div className="flex h-[420px] items-center justify-center rounded-4xl border border-[var(--border)] bg-[var(--surface)] text-center text-[var(--text-muted)]">
        <div>
          <p className="mb-2 font-serif text-lg">地图数据加载失败</p>
          <p className="text-sm">请检查网络后刷新页面</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-[420px] overflow-hidden rounded-4xl border border-[var(--border)] bg-[var(--surface)] sm:h-[520px] md:h-[600px]">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-[var(--aura)] border-t-transparent" />
            <p className="text-sm text-[var(--text-muted)]">正在展开非遗版图...</p>
          </div>
        </div>
      )}
      <div ref={chartRef} className="h-full w-full" />
    </div>
  )
}
