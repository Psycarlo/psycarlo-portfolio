<template>
  <div class="bg-brand-lightest dark:bg-brand-darker relative rounded-lg">
    <div class="flex flex-col gap-4 px-8 pt-8">
      <div class="flex flex-col gap-4">
        <slot></slot>
        <h2
          class="text-brand-darkest dark:text-brand-lightest text-3xl font-bold"
        >
          {{ title }}
        </h2>
        <p class="text-brand-grayDark dark:text-brand-gray text-lg">
          {{ description }}
        </p>
        <Button
          v-if="website"
          :to="website"
          text="Visit Website"
          variant="primary"
          with-arrow
          with-target-blank
          class="w-fit"
        />
        <div class="mt-6 flex flex-col gap-3">
          <slot name="image1"></slot>
          <p class="text-brand-grayDark dark:text-brand-gray text-lg">
            {{ intro }}
          </p>
          <slot name="image2"></slot>
          <h2
            v-if="problem"
            class="text-brand-darkest dark:text-brand-lightest text-2xl font-semibold"
          >
            The Problem
          </h2>
          <p
            v-if="problem"
            class="text-brand-grayDark dark:text-brand-gray text-lg"
          >
            {{ problem }}
          </p>
          <slot name="image3"></slot>
          <h2
            v-if="solution"
            class="text-brand-darkest dark:text-brand-lightest text-2xl font-semibold"
          >
            Our Solution
          </h2>
          <p
            v-if="solution"
            class="text-brand-grayDark dark:text-brand-gray text-lg"
          >
            {{ solution }}
          </p>
          <h2
            class="text-brand-darkest dark:text-brand-lightest text-2xl font-semibold"
          >
            Technologies Used
          </h2>
          <slot name="technologies"></slot>
          <div class="bg-brand-lighty dark:bg-brand-dark mt-3 h-px w-full" />
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
