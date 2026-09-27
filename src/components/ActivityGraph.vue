<template>
  <div>
    <div class="flex items-baseline justify-between mb-4 flex-wrap gap-2">
      <p class="text-sm text-brand-grayDark dark:text-brand-grayLight">
        <span v-if="loading">Loading activity…</span>
        <span v-else-if="error">Activity unavailable</span>
        <span v-else>
          <span
            class="font-semibold text-brand-darkest dark:text-brand-lightest"
          >
            {{ total?.toLocaleString() ?? 0 }}
          </span>
          contributions in the last year
        </span>
      </p>
      <div
        class="flex items-center gap-1.5 text-xs text-brand-grayDark dark:text-brand-gray"
      >
        <span>Less</span>
        <span
          v-for="lvl in 5"
          :key="lvl"
          :class="['w-2.5 h-2.5 rounded-sm', tierClass(lvl - 1)]"
        ></span>
        <span>More</span>
      </div>
    </div>
    <div
      ref="scrollRef"
      class="no-scrollbar overflow-x-auto select-none"
      @mousedown="onDragStart"
      @scroll.passive="hideTooltip"
    >
      <div
        ref="gridRef"
        class="grid grid-flow-col grid-rows-7 gap-0.75"
        :style="{ gridTemplateColumns: `repeat(${columns}, 10px)` }"
        @pointerover="onCellOver"
        @pointerleave="onGridLeave"
      >
        <template v-if="days.length">
          <span
            v-for="i in offset"
            :key="`pad-${i}`"
            class="w-2.5 h-2.5"
          ></span>
          <span
            v-for="(d, i) in days"
            :key="d.date"
            :data-index="i"
            :class="['w-2.5 h-2.5 rounded-sm', tierClass(d.level)]"
          ></span>
        </template>
        <template v-else>
          <span
            v-for="i in SKELETON_CELLS"
            :key="`skeleton-${i}`"
            :class="['w-2.5 h-2.5 rounded-sm', tierClass(0)]"
          ></span>
        </template>
      </div>
      <div
        class="grid h-4 mt-2 text-xs text-brand-grayDark dark:text-brand-gray"
        :style="{ gridTemplateColumns: `repeat(${columns}, 10px)`, columnGap: '3px' }"
      >
        <span
          v-for="lbl in monthLabels"
          :key="lbl.col"
          class="whitespace-nowrap"
          :style="{ gridColumn: `${lbl.col} / span 1` }"
          >{{ lbl.label }}</span
        >
      </div>
    </div>
    <div
      v-if="tooltip"
      role="tooltip"
      class="bg-brand-darkest text-brand-lightest animate-slideDownAndFade dark:bg-brand-dark pointer-events-none fixed z-100 -translate-x-1/2 -translate-y-full rounded-md px-2.5 py-1.5 text-xs leading-none whitespace-nowrap shadow-md will-change-[transform,opacity] select-none"
      :style="{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }"
    >
      {{ tooltip.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

  type Day = { date: string; count: number; level: number }
  type Payload = { total: number; days: Day[] }
  type Tooltip = { text: string; x: number; y: number }

  // The page is prerendered, so the loading skeleton must not depend on the
  // current date or it would differ between the build and the visitor.
  const SKELETON_COLUMNS = 53
  const SKELETON_CELLS = SKELETON_COLUMNS * 7

  const days = ref<Day[]>([])
  const total = ref<number | null>(null)
  const loading = ref(true)
  const error = ref(false)
  const scrollRef = ref<HTMLDivElement | null>(null)
  const gridRef = ref<HTMLDivElement | null>(null)
  const tooltip = ref<Tooltip | null>(null)

  function scrollToRight() {
    if (scrollRef.value) {
      scrollRef.value.scrollLeft = scrollRef.value.scrollWidth
    }
  }

  function onDragStart(e: MouseEvent) {
    const el = scrollRef.value
    if (!el) return
    const startX = e.pageX
    const startScroll = el.scrollLeft
    const onMove = (ev: MouseEvent) => {
      el.scrollLeft = startScroll - (ev.pageX - startX)
    }
    const onUp = () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    e.preventDefault()
  }

  // One tooltip for the whole grid instead of one component per day.
  function onCellOver(e: PointerEvent) {
    const cell = e.target as HTMLElement
    const index = cell.dataset.index
    if (index === undefined) return hideTooltip()
    const day = days.value[Number(index)]
    if (!day) return hideTooltip()
    const rect = cell.getBoundingClientRect()
    tooltip.value = {
      text: dayTitle(day),
      x: rect.left + rect.width / 2,
      y: rect.top - 6
    }
  }

  // Touch fires pointerleave on release; keep the tooltip until the next tap
  // or scroll so it can be read.
  function onGridLeave(e: PointerEvent) {
    if (e.pointerType === 'mouse') hideTooltip()
  }

  function onPointerDownOutside(e: PointerEvent) {
    if (!gridRef.value?.contains(e.target as Node)) hideTooltip()
  }

  function hideTooltip() {
    tooltip.value = null
  }

  const offset = computed(() => {
    if (!days.value.length) return 0
    return new Date(days.value[0].date + 'T00:00:00Z').getUTCDay()
  })

  const columns = computed(() =>
    days.value.length
      ? Math.ceil((offset.value + days.value.length) / 7)
      : SKELETON_COLUMNS
  )

  const monthLabels = computed(() => {
    const labels: { col: number; label: string }[] = []
    let lastMonth = -1
    for (let i = 0; i < days.value.length; i++) {
      const dt = new Date(days.value[i].date + 'T00:00:00Z')
      const m = dt.getUTCMonth()
      if (m === lastMonth) continue
      lastMonth = m
      const col = Math.floor((i + offset.value) / 7) + 1
      const prev = labels[labels.length - 1]
      if (prev && col - prev.col < 3) continue
      labels.push({
        col,
        label: dt.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })
      })
    }
    return labels
  })

  function tierClass(level: number): string {
    switch (level) {
      case 0:
        return 'bg-brand-light dark:bg-brand-dark'
      case 1:
        return 'bg-orange-500/25'
      case 2:
        return 'bg-orange-500/50'
      case 3:
        return 'bg-orange-500/75'
      case 4:
        return 'bg-orange-500'
      default:
        return ''
    }
  }

  function formatDate(iso: string): string {
    const d = new Date(iso + 'T00:00:00Z')
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC'
    })
  }

  function dayTitle(d: Day): string {
    const n = d.count
    return `${n} contribution${n === 1 ? '' : 's'} on ${formatDate(d.date)}`
  }

  onMounted(async () => {
    window.addEventListener('scroll', hideTooltip, { passive: true })
    document.addEventListener('pointerdown', onPointerDownOutside)
    scrollToRight()
    try {
      const res = await fetch('/api/activity.json')
      if (!res.ok) throw new Error('fetch_failed')
      const data = (await res.json()) as Payload
      days.value = data.days
      total.value = data.total
      await nextTick()
      scrollToRight()
    } catch {
      error.value = true
    } finally {
      loading.value = false
    }
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', hideTooltip)
    document.removeEventListener('pointerdown', onPointerDownOutside)
  })
</script>

<style scoped>
  .no-scrollbar {
    scrollbar-width: none;
  }
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
</style>
