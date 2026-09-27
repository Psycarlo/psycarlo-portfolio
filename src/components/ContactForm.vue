<template>
  <div class="px-8 pb-12">
    <Transition
      mode="out-in"
      enter-active-class="transition duration-500 ease-out motion-reduce:transition-none"
      enter-from-class="translate-y-2 opacity-0"
      leave-active-class="transition duration-200 ease-in motion-reduce:transition-none"
      leave-to-class="opacity-0"
    >
      <div
        v-if="status === 'success'"
        key="success"
        role="status"
        class="bg-brand-lighty dark:bg-brand-dark flex flex-col items-center gap-3 rounded-lg px-6 py-12 text-center"
      >
        <svg
          class="text-brand-success h-14 w-14"
          viewBox="0 0 52 52"
          aria-hidden="true"
        >
          <circle
            class="success-circle"
            cx="26"
            cy="26"
            r="24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
          />
          <path
            class="success-check"
            d="M15 27l7 7 15-15"
            fill="none"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p class="text-xl font-semibold">Message sent</p>
        <p class="text-brand-grayDark dark:text-brand-gray text-sm">
          Thanks for reaching out. I'll get back to you soon.
        </p>
        <button
          type="button"
          class="mt-2 cursor-pointer text-sm font-medium underline hover:no-underline"
          @click="status = 'idle'"
        >
          Send another message
        </button>
      </div>
      <form
        v-else
        key="form"
        ref="formRef"
        class="flex flex-col gap-4"
        novalidate
        @submit.prevent="submit"
      >
        <!-- Honeypot: hidden from people, often filled in by spam bots. -->
        <div
          class="absolute -left-[9999px] h-px w-px overflow-hidden"
          aria-hidden="true"
        >
          <label for="company">Company</label>
          <input
            id="company"
            name="company"
            type="text"
            tabindex="-1"
            autocomplete="off"
          />
        </div>
        <div class="flex flex-col gap-4 sm:flex-row sm:gap-3">
          <div class="flex flex-1 flex-col gap-1.5">
            <label for="name" :class="labelClass">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              autocomplete="name"
              placeholder="Your name"
              :class="[
                inputClass,
                errors.name ? errorInputClass : validInputClass
              ]"
              :aria-invalid="errors.name ? 'true' : undefined"
              :aria-describedby="errors.name ? 'name-error' : undefined"
              @input="clearError('name')"
            />
            <Transition v-bind="errorTransition">
              <p v-if="errors.name" id="name-error" :class="errorClass">
                {{ errors.name }}
              </p>
            </Transition>
          </div>
          <div class="flex flex-1 flex-col gap-1.5">
            <label for="email" :class="labelClass">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              placeholder="you@example.com"
              :class="[
                inputClass,
                errors.email ? errorInputClass : validInputClass
              ]"
              :aria-invalid="errors.email ? 'true' : undefined"
              :aria-describedby="errors.email ? 'email-error' : undefined"
              @input="clearError('email')"
            />
            <Transition v-bind="errorTransition">
              <p v-if="errors.email" id="email-error" :class="errorClass">
                {{ errors.email }}
              </p>
            </Transition>
          </div>
        </div>
        <div class="flex flex-col gap-1.5">
          <label for="message" :class="labelClass">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell me about your project"
            :class="[
              inputClass,
              'h-52 resize-none',
              errors.message ? errorInputClass : validInputClass
            ]"
            :aria-invalid="errors.message ? 'true' : undefined"
            :aria-describedby="errors.message ? 'message-error' : undefined"
            @input="clearError('message')"
          ></textarea>
          <Transition v-bind="errorTransition">
            <p v-if="errors.message" id="message-error" :class="errorClass">
              {{ errors.message }}
            </p>
          </Transition>
        </div>
        <button
          type="submit"
          class="text-brand-lightest dark:text-brand-lightest w-full cursor-pointer rounded-lg py-3 font-medium transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-75"
          :class="
            status === 'error'
              ? 'bg-brand-error hover:bg-brand-error/90'
              : 'bg-brand-darkest hover:bg-brand-dark dark:bg-brand-dark dark:hover:bg-brand-grayDarkest'
          "
          :disabled="status === 'loading'"
        >
          <span
            v-if="status === 'loading'"
            class="inline-flex items-center justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              aria-hidden="true"
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
            Sending…
          </span>
          <template v-else>
            {{ status === 'error' ? 'Try again' : 'Submit Inquiry' }}
          </template>
        </button>
        <Transition v-bind="errorTransition">
          <p
            v-if="status === 'error'"
            role="alert"
            class="text-brand-error text-center text-xs font-medium"
          >
            Unable to send right now. Please try again, or email
            <a href="mailto:psycarlo1@gmail.com" class="underline"
              >psycarlo1@gmail.com</a
            >.
          </p>
        </Transition>
      </form>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue'

  type Field = 'name' | 'email' | 'message'
  type Status = 'idle' | 'loading' | 'success' | 'error'

  const MESSAGES: Record<Field, string> = {
    name: 'Name must be at least 2 characters',
    email: 'Enter a valid email address',
    message: 'Message must be at least 2 characters'
  }
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

  const labelClass =
    'text-brand-grayDark dark:text-brand-gray text-xs font-medium'
  const inputClass =
    'bg-brand-lighty dark:bg-brand-dark placeholder:text-brand-gray dark:placeholder:text-brand-grayDark block w-full rounded-lg border-0 px-4 py-4 ring-offset-1 ring-offset-transparent transition-shadow duration-300 outline-none focus:ring-2'
  // Only one ring colour per state so the error colour wins while focused.
  const validInputClass = 'focus:ring-orange-500/50'
  const errorInputClass = 'ring-brand-error/70 ring-2'
  const errorClass = 'text-brand-error text-xs font-medium'
  const errorTransition = {
    enterActiveClass:
      'transition duration-200 ease-out motion-reduce:transition-none',
    enterFromClass: '-translate-y-1 opacity-0',
    leaveActiveClass:
      'transition duration-150 ease-in motion-reduce:transition-none',
    leaveToClass: 'opacity-0'
  }

  const status = ref<Status>('idle')
  const errors = reactive<Partial<Record<Field, string>>>({})
  const formRef = ref<HTMLFormElement | null>(null)

  function isField(value: string): value is Field {
    return value in MESSAGES
  }

  function validate(data: FormData): Field[] {
    const value = (field: Field) => String(data.get(field) ?? '').trim()
    const invalid: Field[] = []
    if (value('name').length < 2) invalid.push('name')
    if (!EMAIL_REGEX.test(value('email'))) invalid.push('email')
    if (value('message').length < 2) invalid.push('message')
    return invalid
  }

  function showErrors(fields: Field[]) {
    for (const field of fields) errors[field] = MESSAGES[field]
    formRef.value?.querySelector<HTMLElement>(`#${fields[0]}`)?.focus()
  }

  function clearError(field: Field) {
    delete errors[field]
  }

  async function submit() {
    const form = formRef.value
    if (!form || status.value === 'loading') return

    const data = new FormData(form)
    const invalid = validate(data)
    if (invalid.length) return showErrors(invalid)

    status.value = 'loading'
    try {
      const res = await fetch('/api/contact', { method: 'POST', body: data })
      const body = await res.json().catch(() => null)
      if (res.ok && body?.message === 'success') {
        status.value = 'success'
        return
      }
      if (Array.isArray(body?.message)) {
        const fields = (body.message as string[])
          .map((m) => m.replace('error/', ''))
          .filter(isField)
        if (fields.length) {
          status.value = 'idle'
          return showErrors(fields)
        }
      }
      status.value = 'error'
    } catch {
      status.value = 'error'
    }
  }
</script>

<style scoped>
  /* Circle circumference ≈ 151, check path length ≈ 32. */
  .success-circle {
    stroke-dasharray: 151;
    stroke-dashoffset: 151;
    animation: draw 0.6s var(--expo-out) forwards;
  }
  .success-check {
    stroke-dasharray: 32;
    stroke-dashoffset: 32;
    animation: draw 0.4s var(--expo-out) 0.45s forwards;
  }
  @keyframes draw {
    to {
      stroke-dashoffset: 0;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .success-circle,
    .success-check {
      animation: none;
      stroke-dashoffset: 0;
    }
  }
</style>
