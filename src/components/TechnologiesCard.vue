<template>
  <div
    class="reveal border-brand-grayLightest/70 dark:border-brand-dark flex flex-col border-t pt-6 pb-4 first:border-t-0 first:pt-0 last:pb-0"
  >
    <div class="flex items-center justify-between">
      <p class="text-lg font-semibold tracking-tight">{{ title }}</p>
      <slot name="icon"></slot>
    </div>
    <p class="text-brand-grayDark dark:text-brand-gray text-sm">
      {{ description }}
    </p>
    <div class="xs:grid-cols-6 mt-4 grid w-fit grid-cols-3 gap-2.5">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  })
</script>
