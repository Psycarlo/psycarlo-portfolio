<template>
  <div class="relative my-12 flex flex-col items-center gap-3 px-3">
    <h3 class="text-3xl font-semibold">Let's work together.</h3>
    <p class="text-center text-base xs:text-lg text-brand-grayDark dark:text-brand-gray">
      Building beautiful and performant products
    </p>
    <div class="my-3 flex items-center gap-4">
      <Button to="/contact/" text="Contact Me" variant="primary" />
      <CopyButton
        client:visible
        text="Copy Email"
        copyText="psycarlo1@gmail.com"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import Button from './Button.vue'
  import CopyButton from './CopyButton.vue'
</script>
