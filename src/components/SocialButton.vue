<template>
  <a
    :href="to"
    target="_blank"
    class="dark:border-brand-grayDarkest border-brand-light bg-brand-lightest hover:ring-brand-light dark:bg-brand-dark dark:hover:ring-brand-dark/40 flex h-10 w-10 items-center justify-center rounded-full border shadow-md ring-offset-1 ring-offset-transparent transition-all duration-300 hover:ring-[3px]"
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
