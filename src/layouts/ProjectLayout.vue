<template>
  <div class="relative rounded-lg bg-brand-lightest dark:bg-brand-darker">
    <div class="px-8 pt-8 flex flex-col gap-4">
      <div class="flex flex-col gap-4">
        <slot></slot>
        <h2 class="font-bold text-3xl text-brand-darkest dark:text-brand-lightest">{{ title }}</h2>
        <p class="text-brand-grayDark dark:text-brand-gray text-lg">{{ description }}</p>
        <Button v-if="website" :to="website" text="Visit Website" variant="primary" with-arrow with-target-blank class="w-fit" />
        <div class="flex flex-col gap-3 mt-6">
          <slot name="image1"></slot>
          <p class="text-brand-grayDark dark:text-brand-gray text-lg">{{ intro }}</p>
          <slot name="image2"></slot>
          <h2 class="font-semibold text-2xl text-brand-darkest dark:text-brand-lightest">The Problem</h2>
          <p class="text-brand-grayDark dark:text-brand-gray text-lg">{{ problem }}</p>
          <slot name="image3"></slot>
          <h2 class="font-semibold text-2xl text-brand-darkest dark:text-brand-lightest">Our Solution</h2>
          <p class="text-brand-grayDark dark:text-brand-gray text-lg">{{ solution }}</p>
          <h2 class="font-semibold text-2xl text-brand-darkest dark:text-brand-lightest">Technologies Used</h2>
          <slot name="technologies"></slot>
          <div class="w-full h-[1px] bg-brand-lighty mt-3 dark:bg-brand-dark"></div>
        </div>
      </div>
    </div>
    <div class="flex flex-col"></div>
    <LetsWorkTogether />
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
  import Button from '../components/Button.vue'
  import LetsWorkTogether from '../components/LetsWorkTogether.vue'
  import TheFooter from '../components/TheFooter.vue'

  defineProps({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    website: {
      type: String,
      required: false
    },
    intro: {
      type: String,
      required: false
    },
    problem: {
      type: String,
      required: false
    },
    solution: {
      type: String,
      required: false
    }
  })
</script>