<template>
  <div class="relative rounded-lg bg-brand-lightest dark:bg-brand-darker">
    <div class="flex flex-col gap-4 px-8 pt-8">
      <div class="flex flex-col gap-4">
        <slot></slot>
        <h2
          class="text-3xl font-bold text-brand-darkest dark:text-brand-lightest"
        >
          {{ title }}
        </h2>
        <p class="text-lg text-brand-grayDark dark:text-brand-gray">
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
          <p class="text-lg text-brand-grayDark dark:text-brand-gray">
            {{ intro }}
          </p>
          <slot name="image2"></slot>
          <h2
            v-if="problem"
            class="text-2xl font-semibold text-brand-darkest dark:text-brand-lightest"
          >
            The Problem
          </h2>
          <p
            v-if="problem"
            class="text-lg text-brand-grayDark dark:text-brand-gray"
          >
            {{ problem }}
          </p>
          <slot name="image3"></slot>
          <h2
            v-if="solution"
            class="text-2xl font-semibold text-brand-darkest dark:text-brand-lightest"
          >
            Our Solution
          </h2>
          <p
            v-if="solution"
            class="text-lg text-brand-grayDark dark:text-brand-gray"
          >
            {{ solution }}
          </p>
          <h2
            class="text-2xl font-semibold text-brand-darkest dark:text-brand-lightest"
          >
            Technologies Used
          </h2>
          <slot name="technologies"></slot>
          <div class="mt-3 h-px w-full bg-brand-lighty dark:bg-brand-dark" />
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
