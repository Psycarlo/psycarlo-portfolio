<template>
  <form
    class="relative mb-20 flex flex-col gap-3 px-8"
    @submit.prevent="submit"
    id="contactform"
  >
    <div class="flex gap-3">
      <input
        class="block w-[50%] rounded-lg border-0 bg-brand-lighty px-4 py-4 outline-none ring-brand-light ring-offset-1 ring-offset-transparent transition-all duration-300 focus:ring-2 dark:bg-brand-dark dark:ring-brand-grayDarkest"
        :class="{ 'border-2 border-brand-error': nameError }"
        type="text"
        id="name"
        name="name"
        placeholder="Name"
        required
      />
      <input
        class="block w-[50%] rounded-lg border-0 bg-brand-lighty px-4 py-4 outline-none ring-brand-light ring-offset-1 ring-offset-transparent transition-all duration-300 focus:ring-2 dark:bg-brand-dark dark:ring-brand-grayDarkest"
        :class="{ 'border-2 border-brand-error': emailError }"
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        required
      />
    </div>
    <textarea
      class="h-52 resize-none rounded-lg bg-brand-lighty p-4 outline-none ring-brand-light ring-offset-1 ring-offset-transparent transition-all duration-300 focus:outline-none focus:ring-2 dark:bg-brand-dark dark:ring-brand-grayDarkest"
      :class="{ 'border-2 border-brand-error': messageError }"
      id="message"
      name="message"
      placeholder="Message"
      required
    ></textarea>
    <button
      type="submit"
      class="w-full cursor-pointer rounded-lg py-3 font-medium text-brand-lightest transition-colors duration-300 dark:text-brand-lightest"
      :class="[
        success
          ? 'bg-brand-success'
          : error
            ? 'bg-brand-error'
            : 'bg-brand-darkest hover:bg-brand-dark dark:bg-brand-dark dark:hover:bg-brand-grayDarkest'
      ]"
      :disabled="error"
    >
      {{
        success
          ? 'Sent successfully!'
          : error
            ? 'Error sending'
            : 'Submit Inquiry'
      }}
    </button>
    <p
      class="absolute -bottom-6 left-[50%] -translate-x-[50%] text-xs font-medium text-brand-error"
      v-if="isRemote"
    >
      Unable to send. Please try again later.
    </p>
    <p
      class="absolute left-[50%] -translate-x-[50%] text-center text-xs font-medium text-brand-error"
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

    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: formData
    })
    const data = await response.json()
    responseMessage.value = data.message

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
