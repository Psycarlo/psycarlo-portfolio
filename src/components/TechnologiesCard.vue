<template>
  <div
    class="border-brand-light bg-brand-lightest dark:border-brand-grayDarkest dark:bg-brand-dark flex flex-col rounded-lg border p-4 shadow-sm"
  >
    <div class="flex items-center justify-between">
      <p class="text-lg font-semibold">{{ title }}</p>
      <slot name="icon"></slot>
    </div>
    <p class="text-brand-grayDark dark:text-brand-gray text-xs">
      {{ description }}
    </p>
    <div class="xs:grid-cols-6 mt-3 grid w-fit grid-cols-3 gap-2">
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
