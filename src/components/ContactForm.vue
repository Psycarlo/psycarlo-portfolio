<template>
  <form
    class="relative mb-20 flex flex-col gap-3 px-8"
    @submit.prevent="submit"
    id="contactform"
  >
    <div class="flex gap-3">
      <input
        class="bg-brand-lighty ring-brand-light dark:bg-brand-dark dark:ring-brand-grayDarkest block w-[50%] rounded-lg border-0 px-4 py-4 ring-offset-1 ring-offset-transparent transition-all duration-300 outline-none focus:ring-2"
        :class="{ 'border-brand-error border-2': nameError }"
        type="text"
        id="name"
        name="name"
        placeholder="Name"
        required
      />
      <input
        class="bg-brand-lighty ring-brand-light dark:bg-brand-dark dark:ring-brand-grayDarkest block w-[50%] rounded-lg border-0 px-4 py-4 ring-offset-1 ring-offset-transparent transition-all duration-300 outline-none focus:ring-2"
        :class="{ 'border-brand-error border-2': emailError }"
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        required
      />
    </div>
    <textarea
      class="bg-brand-lighty ring-brand-light dark:bg-brand-dark dark:ring-brand-grayDarkest h-52 resize-none rounded-lg p-4 ring-offset-1 ring-offset-transparent transition-all duration-300 outline-none focus:ring-2 focus:outline-none"
      :class="{ 'border-brand-error border-2': messageError }"
      id="message"
      name="message"
      placeholder="Message"
      required
    ></textarea>
    <button
      type="submit"
      class="text-brand-lightest dark:text-brand-lightest w-full cursor-pointer rounded-lg py-3 font-medium transition-colors duration-300"
      :class="[
        success
          ? 'bg-brand-success'
          : error
            ? 'bg-brand-error'
            : 'bg-brand-darkest hover:bg-brand-dark dark:bg-brand-dark dark:hover:bg-brand-grayDarkest',
        (loading || error) && 'cursor-not-allowed opacity-75'
      ]"
      :disabled="loading || error"
    >
      <span
        v-if="loading"
        class="inline-flex items-center justify-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
        >
          <g stroke="currentColor">
            <circle
              cx="12"
              cy="12"
              r="9.5"
              fill="none"
              stroke-linecap="round"
              stroke-width="3"
            >
              <animate
                attributeName="stroke-dasharray"
                calcMode="spline"
                dur="1.5s"
                keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                keyTimes="0;0.475;0.95;1"
                repeatCount="indefinite"
                values="0 150;42 150;42 150;42 150"
              />
              <animate
                attributeName="stroke-dashoffset"
                calcMode="spline"
                dur="1.5s"
                keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                keyTimes="0;0.475;0.95;1"
                repeatCount="indefinite"
                values="0;-16;-59;-59"
              />
            </circle>
            <animateTransform
              attributeName="transform"
              dur="2s"
              repeatCount="indefinite"
              type="rotate"
              values="0 12 12;360 12 12"
            />
          </g>
        </svg>
        Sending...
      </span>
      <template v-else>
        {{
          success
            ? 'Sent successfully!'
            : error
              ? 'Error sending'
              : 'Submit Inquiry'
        }}
      </template>
    </button>
    <p
      class="text-brand-error absolute -bottom-6 left-[50%] translate-x-[-50%] text-xs font-medium"
      v-if="isRemote"
    >
      Unable to send. Please try again later.
    </p>
    <p
      class="text-brand-error absolute left-[50%] translate-x-[-50%] text-center text-xs font-medium"
      v-if="nameError || emailError || messageError"
      :class="{
        '-bottom-8': errorCount === 1,
        '-bottom-10': errorCount === 2,
        '-bottom-14': errorCount === 3
      }"
    >
      <span v-if="nameError">Name must be at least 2 characters<br /></span>
      <span v-if="emailError">Email must be valid<br /></span>
      <span v-if="messageError">Message should be at least 2 characters</span>
    </p>
  </form>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const responseMessage = ref<string | string[]>()
  const success = ref(false)
  const error = ref(false)
  const loading = ref(false)
  const isRemote = ref(false)
  const nameError = ref(false)
  const emailError = ref(false)
  const messageError = ref(false)
  const errorCount = ref(0)

  async function submit(e: Event) {
    error.value = false
    messageError.value = false
    nameError.value = false
    emailError.value = false
    messageError.value = false
    isRemote.value = false
    errorCount.value = 0
    loading.value = true

    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement)
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      responseMessage.value = data.message
    } finally {
      loading.value = false
    }

    if (responseMessage.value === 'success') {
      const form = document.getElementById('contactform')
      if (form) {
        const formElement = form as HTMLFormElement
        formElement.reset()
      }
      success.value = true
      setTimeout(function () {
        success.value = false
      }, 2000)
      return
    }

    if (responseMessage.value === 'error/remote') {
      error.value = true
      isRemote.value = true
      setTimeout(function () {
        error.value = false
        isRemote.value = false
      }, 2000)
    }

    errorCount.value =
      responseMessage.value instanceof Array ? responseMessage.value.length : 0

    if (responseMessage.value?.includes('error/name')) {
      nameError.value = true
    }

    if (responseMessage.value?.includes('error/email')) {
      emailError.value = true
    }

    if (responseMessage.value?.includes('error/message')) {
      messageError.value = true
    }
  }
</script>
