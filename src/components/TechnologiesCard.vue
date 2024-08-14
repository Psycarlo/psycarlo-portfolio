<template>
  <div
    class="flex flex-col rounded-lg border border-brand-light bg-brand-lightest p-4 shadow-sm dark:border-brand-grayDarkest dark:bg-brand-dark"
  >
    <div class="flex items-center justify-between">
      <p class="text-lg font-semibold">{{ title }}</p>
      <slot name="icon"></slot>
    </div>
    <p class="text-xs text-brand-grayDark dark:text-brand-gray">
      {{ description }}
    </p>
    <div class="mt-3 grid w-fit grid-cols-3 gap-2 xs:grid-cols-6">
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
