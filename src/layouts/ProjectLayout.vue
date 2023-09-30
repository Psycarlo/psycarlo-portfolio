<template>
  <div class="relative rounded-lg bg-brand-lightest dark:bg-brand-darker">
    <div class="p-8 flex flex-col gap-4">
      <div class="flex flex-col gap-4">
        <slot></slot>
        <h2 class="font-bold text-3xl text-brand-darkest dark:text-brand-lightest">{{ title }}</h2>
        <p class="text-brand-grayDark dark:text-brand-gray">{{ description }}</p>
        <Button v-if="website" :to="website" text="Visit Website" variant="primary" with-arrow with-target-blank class="w-fit" />
        <div class="flex flex-col">
          <slot name="image1"></slot>
          <p class="text-brand-grayDark dark:text-brand-gray">{{ intro }}</p>
          <slot name="image2"></slot>
          <h2 class="font-semibold text-2xl text-brand-darkest dark:text-brand-lightest">The Problem</h2>
          <p class="text-brand-grayDark dark:text-brand-gray">{{ problem }}</p>
          <slot name="iamge3"></slot>
          <h2 class="font-semibold text-2xl text-brand-darkest dark:text-brand-lightest">Our Solution</h2>
          <p class="text-brand-grayDark dark:text-brand-gray">{{ solution }}</p>
        </div>
      </div>
    </div>
    <div class="flex flex-col"></div>
    <LetsWorkTogether />
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
  import Button from '../components/Button.vue';
  import LetsWorkTogether from '../components/LetsWorkTogether.vue';
  import TheFooter from '../components/TheFooter.vue';

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