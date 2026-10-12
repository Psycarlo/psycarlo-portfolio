<template>
  <a
    :href="to"
    class="group bg-brand-darkest text-brand-lightest hover:bg-brand-darker dark:bg-brand-dark dark:text-brand-lightest dark:hover:bg-brand-grayDarkest flex h-10 shrink-0 items-center gap-1.5 rounded-full text-sm font-medium whitespace-nowrap shadow-[inset_0_1px_0_oklch(1_0_0/0.12),0_1px_2px_oklch(0_0_0/0.12),0_4px_12px_-4px_oklch(0_0_0/0.3)] transition-[background-color,scale] duration-150 ease-out active:scale-[0.96]"
    :class="withArrow ? 'ps-5 pe-4' : 'px-5'"
    :target="withTargetBlank ? '_blank' : undefined"
  >
    <span>{{ text }}</span>
    <svg
      v-if="withArrow"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="stroke-brand-grayLight h-4 w-4 transition-[translate] duration-200 ease-out motion-safe:group-hover:translate-x-0.5"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
      />
    </svg>
  </a>
</template>

<script setup lang="ts">
  import { type PropType } from 'vue'

  type Variant = 'primary' | 'subtle'

  defineProps({
    variant: {
      type: String as PropType<Variant>,
      required: true
    },
    to: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    withArrow: {
      type: Boolean,
      default: false
    },
    withTargetBlank: {
      type: Boolean,
      default: false
    }
  })
</script>
