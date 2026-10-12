<template>
  <a
    class="reveal group hover:bg-brand-lightest hover:shadow-border dark:hover:bg-brand-dark -mx-3 flex items-center justify-between gap-3 rounded-xl border border-transparent p-3 transition-[background-color,box-shadow,scale] duration-150 ease-out active:scale-[0.99]"
    :href="to"
  >
    <div class="flex items-center gap-4">
      <div
        class="bg-brand-lightest shadow-border dark:bg-brand-darker flex h-14 min-h-[3.5rem] w-14 min-w-[3.5rem] items-center justify-center overflow-hidden rounded-full border border-transparent bg-center"
      >
        <slot></slot>
      </div>
      <div class="flex flex-col">
        <p class="text-lg font-semibold tracking-tight">{{ title }}</p>
        <p class="text-brand-grayDark dark:text-brand-gray text-sm">
          {{ type }}
        </p>
      </div>
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      class="stroke-brand-grayLight group-hover:stroke-brand-grayDark dark:stroke-brand-grayDark dark:group-hover:stroke-brand-gray h-5 min-h-[1.25rem] w-5 min-w-[1.25rem] transition-[translate,stroke] duration-200 ease-out motion-safe:group-hover:translate-x-0.5"
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
