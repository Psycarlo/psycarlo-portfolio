<template>
  <button
    @click="copyText"
    class="border-brand-grayLightest flex items-center gap-1 rounded-lg border px-3 py-2 text-sm font-medium shadow-sm ring-offset-1 transition-all duration-300 hover:ring-[3px] hover:ring-brand-light"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="h-5 w-5"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
      />
    </svg>
    <span class="min-w-[10ch]">{{ wasCopied ? 'Copied!' : text }}</span>
  </button>
</template>

<script setup lang="ts">
  import { toRefs, ref } from 'vue'

  const props = defineProps({
    text: {
      type: String,
      required: true
    },
    copyText: {
      type: String,
      required: true
    }
  })

  const { copyText: c } = toRefs(props)

  const wasCopied = ref(false)

  function copyText() {
    navigator.clipboard.writeText(c.value)
    wasCopied.value = true
    setTimeout(function () {
      wasCopied.value = false
    }, 2000)
  }
</script>
