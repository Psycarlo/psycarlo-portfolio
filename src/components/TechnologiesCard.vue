<template>
  <div
    class="dark:border-brand-grayDarkest flex flex-col rounded-lg border border-brand-light bg-brand-lightest p-4 shadow-sm dark:bg-brand-dark"
  >
    <div class="flex items-center justify-between">
      <p class="text-lg font-semibold">{{ title }}</p>
      <slot name="icon"></slot>
    </div>
    <p class="text-xs text-brand-gray">{{ description }}</p>
    <div class="mt-3 grid grid-cols-3 xs:grid-cols-5 gap-2 w-fit">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    title: {
      tpye: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  })
</script>
