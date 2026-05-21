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
    >
      <TooltipProvider :delay-duration="80" :skip-delay-duration="200">
        <div
          class="grid grid-flow-col grid-rows-7 gap-0.75"
          :style="{ gridTemplateColumns: `repeat(${columns}, 10px)` }"
        >
          <span
            v-for="i in offset"
            :key="`pad-${i}`"
            class="w-2.5 h-2.5"
          ></span>
          <TooltipRoot v-for="d in displayDays" :key="d.date">
            <TooltipTrigger as-child>
              <span
                :class="['w-2.5 h-2.5 rounded-sm', tierClass(d.level)]"
              ></span>
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent
                side="top"
                :side-offset="6"
                class="bg-brand-darkest text-brand-lightest data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade dark:bg-brand-dark z-100 rounded-md px-2.5 py-1.5 text-xs leading-none shadow-md will-change-[transform,opacity] select-none"
              >
                {{ dayTitle(d) }}
              </TooltipContent>
            </TooltipPortal>
          </TooltipRoot>
        </div>
      </TooltipProvider>
      <div
        class="grid mt-2 text-xs text-brand-grayDark dark:text-brand-gray"
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
  </div>
</template>

<script setup lang="ts">
  import { computed, nextTick, onMounted, ref } from 'vue'
  import {
    TooltipContent,
    TooltipPortal,
    TooltipProvider,
    TooltipRoot,
    TooltipTrigger
  } from 'reka-ui'

  type Day = { date: string; count: number; level: number }
  type Payload = { total: number; days: Day[] }

  const days = ref<Day[]>([])
  const total = ref<number | null>(null)
  const loading = ref(true)
  const error = ref(false)
  const scrollRef = ref<HTMLDivElement | null>(null)

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

  const skeletonDays = computed<Day[]>(() => {
    const end = new Date()
    end.setUTCHours(0, 0, 0, 0)
    const arr: Day[] = []
    for (let i = 364; i >= 0; i--) {
      const d = new Date(end)
      d.setUTCDate(d.getUTCDate() - i)
      arr.push({ date: d.toISOString().slice(0, 10), count: 0, level: 0 })
    }
    return arr
  })

  const displayDays = computed(() =>
    days.value.length ? days.value : skeletonDays.value
  )

  const offset = computed(() => {
    if (!displayDays.value.length) return 0
    return new Date(
      displayDays.value[0].date + 'T00:00:00Z'
    ).getUTCDay()
  })

  const columns = computed(() =>
    Math.ceil((offset.value + displayDays.value.length) / 7)
  )

  const monthLabels = computed(() => {
    const labels: { col: number; label: string }[] = []
    let lastMonth = -1
    for (let i = 0; i < displayDays.value.length; i++) {
      const dt = new Date(displayDays.value[i].date + 'T00:00:00Z')
      const m = dt.getUTCMonth()
      if (m === lastMonth) continue
      lastMonth = m
      const col = Math.floor((i + offset.value) / 7) + 1
      const prev = labels[labels.length - 1]
      if (prev && col - prev.col < 3) continue
      labels.push({
        col,
        label: dt.toLocaleString('en-US', { month: 'short' })
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
      year: 'numeric'
    })
  }

  function dayTitle(d: Day): string {
    const n = d.count
    return `${n} contribution${n === 1 ? '' : 's'} on ${formatDate(d.date)}`
  }

  onMounted(async () => {
    await nextTick()
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
</script>

<style scoped>
  .no-scrollbar {
    scrollbar-width: none;
  }
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
</style>
