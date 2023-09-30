<template>
  <div class="relative rounded-lg bg-brand-lightest dark:bg-brand-darker">
    <div class="p-8">
      <div class="flex items-center gap-2">
        <div
          class="h-2 min-h-[0.5rem] w-2 min-w-[0.5rem] animate-pulse rounded-full bg-orange-500 motion-reduce:animate-none"
        ></div>
        <h2 class="text-xl font-medium">{{ topic }}</h2>
      </div>
      <div class="mt-10 flex flex-col gap-2">
        <h3 class="text-4xl font-semibold">{{ title }}</h3>
        <p class="dark:text-brand-grayLight text-brand-grayDark">
          {{ description }}
        </p>
      </div>
    </div>
    <slot></slot>
    <LetsWorkTogether client:visible v-if="!withoutLetsWorkTogether" />
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
  import LetsWorkTogether from '../components/LetsWorkTogether.vue'
  import TheFooter from '../components/TheFooter.vue'

  defineProps({
    topic: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    withoutLetsWorkTogether: {
      type: Boolean,
      default: false
    }
  })
</script>
