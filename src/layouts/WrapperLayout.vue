<template>
  <div class="relative rounded-lg bg-brand-lightest dark:bg-brand-darker">
    <div v-if="topic || title || description" class="p-8">
      <div v-if="topic" class="flex items-center gap-2">
        <div
          class="h-2 min-h-[0.5rem] w-2 min-w-[0.5rem] animate-pulse rounded-full bg-orange-500 motion-reduce:animate-none"
        ></div>
        <h2 class="text-xl font-medium">{{ topic }}</h2>
      </div>
      <div v-if="title && description" class="mt-10 flex flex-col gap-2">
        <h3 class="text-4xl font-semibold">{{ title }}</h3>
        <p class="text-brand-grayDark dark:text-brand-grayLight">
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

  type WrapperLayoutProps = {
    topic: string
    title: string
    description: string
    withoutLetsWorkTogether?: boolean
  }

  withDefaults(defineProps<WrapperLayoutProps>(), {
    withoutLetsWorkTogether: false
  })
</script>
