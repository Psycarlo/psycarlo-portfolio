<template>
  <a
    class="hover:border-brand-grayLight flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand-light bg-brand-lightest bg-center transition-colors duration-300 dark:border-brand-darky dark:bg-brand-darky"
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
