<template>
  <a
    class="bg-brand-lightest shadow-border hover:shadow-border-hover dark:bg-brand-dark flex h-14 min-h-[3.5rem] w-14 min-w-[3.5rem] items-center justify-center rounded-full border border-transparent bg-center transition-[box-shadow,translate,scale] duration-200 ease-out active:scale-[0.96] motion-safe:hover:-translate-y-0.5"
    :href="to"
    target="_blank"
  >
    <slot></slot>
  </a>
</template>

<script setup lang="ts">
  defineProps({
    to: {
      type: String,
      required: true
    }
  })
</script>
