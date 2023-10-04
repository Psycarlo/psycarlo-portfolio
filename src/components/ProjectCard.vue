<template>
  <a
    class="dark:border-brand-grayDarkest group flex items-center justify-between rounded-lg border border-brand-light bg-brand-lightest p-4 shadow-sm duration-300 hover:scale-[1.01] dark:bg-brand-dark"
    :href="to"
  >
    <div class="flex items-center gap-4">
      <div
        class="flex h-14 w-14 min-w-[3.5rem] min-h-[3.5rem] items-center justify-center rounded-full border-2 border-brand-light bg-brand-lightest bg-center dark:border-brand-darky dark:bg-brand-darky"
      >
        <slot></slot>
      </div>
      <div class="flex flex-col">
        <p class="text-lg font-semibold">{{ title }}</p>
        <p class="text-brand-grayDark dark:text-brand-gray">{{ type }}</p>
      </div>
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      class="stroke-brand-grayLight h-5 w-5 min-h-[1.25rem] min-w-[1.25rem] transition-all duration-300 group-hover:translate-x-1 group-hover:stroke-brand-gray"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M8.25 4.5l7.5 7.5-7.5 7.5"
      />
    </svg>
  </a>
</template>

<script setup lang="ts">
  defineProps({
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    }
  })
</script>
