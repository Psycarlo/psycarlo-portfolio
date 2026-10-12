<template>
  <a
    :href="to"
    class="group bg-brand-lightest text-brand-dark shadow-border hover:shadow-border-hover dark:bg-brand-dark dark:text-brand-lightest flex h-9 shrink-0 items-center gap-1 rounded-full border border-transparent ps-3.5 pe-3 text-sm font-medium whitespace-nowrap transition-[box-shadow,scale] duration-150 ease-out active:scale-[0.96]"
  >
    <span>{{ text }}</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="stroke-brand-gray h-4 w-4 transition-[translate] duration-200 ease-out motion-safe:group-hover:translate-x-0.5"
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
  defineProps({
    text: {
      type: String,
      default: 'View All'
    },
    to: {
      type: String,
      default: '/projects/'
    }
  })
</script>
