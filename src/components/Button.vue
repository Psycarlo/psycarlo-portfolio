<template>
  <a
    :href="to"
    class="group flex gap-1 hover:ring-brand-grayLightest rounded-lg bg-brand-darkest px-5 py-2 text-sm items-center font-medium text-brand-lightest shadow-md ring-offset-1 ring-offset-transparent transition-all duration-300 hover:ring-[3px] dark:border-brand-darky dark:bg-brand-dark dark:text-brand-lightest dark:hover:ring-brand-dark/40"
    :target="withTargetBlank ? '_blank' : undefined"
    >
    <span>{{ text }}</span>
    <svg v-if="withArrow" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="group-hover:translate-x-1 duration-200 transition-transform w-4 h-4 stroke-brand-grayLight">
      <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
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
