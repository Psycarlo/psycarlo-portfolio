<template>
  <a
    :href="to"
    class="hover:ring-brand-grayLightest rounded-lg bg-brand-darkest px-5 py-2 text-sm font-medium text-brand-lightest shadow-md ring-offset-1 ring-offset-transparent transition-all duration-300 hover:ring-[3px] dark:border-brand-darky dark:bg-brand-dark dark:text-brand-lightest dark:hover:ring-brand-dark/40"
  >
    {{ text }}
  </a>
</template>

<script setup lang="ts">
  import { type PropType } from 'vue'

  type Variant = 'primary' | 'subtle'

  defineProps({
    variant: {
      type: String as PropType<Variant>,
      required: true
    },
    to: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  })
</script>
