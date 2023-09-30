<template>
  <form class="relative px-8 gap-3 flex flex-col mb-20" @submit.prevent="submit" id="contactform">
      <div class="flex gap-3">
        <input
          class="w-[50%] block px-4 border-0 bg-brand-lighty dark:bg-brand-dark outline-none rounded-lg py-4 focus:ring-2 ring-brand-light dark:ring-brand-grayDarkest duration-300 ring-offset-1 transition-all ring-offset-transparent"
          :class="{'border-brand-error border-2': nameError}"
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          required
        />
        <input
          class="w-[50%] block px-4 border-0 bg-brand-lighty dark:bg-brand-dark outline-none rounded-lg py-4 focus:ring-2 ring-brand-light dark:ring-brand-grayDarkest duration-300 ring-offset-1 transition-all ring-offset-transparent"
          :class="{'border-brand-error border-2': emailError}"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
        />
      </div>
      <textarea
        class="h-52 p-4 resize-none bg-brand-lighty dark:bg-brand-dark focus:outline-none dark:ring-brand-grayDarkest rounded-lg focus:ring-2 ring-brand-light outline-none duration-300 ring-offset-1 transition-all ring-offset-transparent"
        :class="{'border-brand-error border-2': messageError}"
        id="message"
        name="message"
        placeholder="Message"
        required
      ></textarea>
      <button
        type="submit"
        class="py-3 w-full font-medium duration-300 transition-colors rounded-lg text-brand-lightest dark:text-brand-lightest"
        :class="[success ? 'bg-brand-success' : error ? 'bg-brand-error' : 'bg-brand-darkest dark:bg-brand-dark hover:bg-brand-dark dark:hover:bg-brand-grayDarkest']"
        :disabled="error"
      >
        {{ success ? 'Sent successfully!' : error ? 'Error sending' : 'Submit Inquiry' }}
      </button>
      <p class="absolute -bottom-6 text-xs font-medium text-brand-error left-[50%] -translate-x-[50%]" v-if="isRemote">Unable to send. Please try again later.</p>
      <p class="text-center absolute text-xs font-medium text-brand-error left-[50%] -translate-x-[50%]" v-if="nameError || emailError || messageError"
      :class="{'-bottom-8': errorCount === 1, '-bottom-10': errorCount === 2, '-bottom-14': errorCount === 3}"
      >
        <span v-if="nameError">Name must be at least 2 characters<br /></span>
        <span v-if="emailError">Email must be valid<br /></span>
        <span v-if="messageError">Message should be at least 2 characters</span>
      </p>
    </form>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const responseMessage = ref<string | string[]>();
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

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const response = await fetch("/api/contact", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    responseMessage.value = data.message;

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

    console.log('hey3', responseMessage.value)

    if (responseMessage.value === 'error/remote') {
      error.value = true
      isRemote.value = true
      setTimeout(function () {
        error.value = false
        isRemote.value = false
      }, 2000)
    }

    errorCount.value = (responseMessage.value instanceof Array) ? responseMessage.value.length : 0

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