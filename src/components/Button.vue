<template>
  <a :href="to" class="shadow-md py-2 px-5 bg-brand-darkest text-brand-lightest rounded-lg font-medium text-sm hover:-translate-y-[2px] transition-transform duration-300">
    {{ text }}
  </a>
</template>

<script setup lang="ts">
  import { type PropType } from 'vue';

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