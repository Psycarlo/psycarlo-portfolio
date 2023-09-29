<template>
  <a
    :href="to"
    class="group flex items-center gap-1 rounded-lg border border-brand-light bg-brand-lightest px-3 py-2 text-sm font-semibold text-brand-dark shadow-md ring-offset-1 transition-all duration-300 hover:ring-[3px] hover:ring-brand-light"
  >
    <span>{{ text }}</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="h-4 w-4 stroke-brand-gray transition-transform duration-300 group-hover:translate-x-[3px]"
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
