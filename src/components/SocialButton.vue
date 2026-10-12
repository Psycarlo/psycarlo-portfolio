<template>
  <a
    :href="to"
    target="_blank"
    class="bg-brand-lightest shadow-border hover:shadow-border-hover dark:bg-brand-dark flex h-10 w-10 items-center justify-center rounded-full border border-transparent transition-[box-shadow,scale,translate] duration-150 ease-out active:scale-[0.96] motion-safe:hover:-translate-y-0.5"
    :title="title"
  >
    <slot></slot>
  </a>
</template>

<script setup lang="ts">
  defineProps({
    to: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  })
</script>
