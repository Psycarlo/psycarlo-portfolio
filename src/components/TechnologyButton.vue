<template>
  <a
    class="hover:border-brand-grayLight border-brand-light bg-brand-lightest dark:border-brand-dark dark:bg-brand-darky dark:hover:border-brand-darky flex h-14 min-h-[3.5rem] w-14 min-w-[3.5rem] items-center justify-center rounded-full border-2 bg-center transition-colors duration-300"
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
