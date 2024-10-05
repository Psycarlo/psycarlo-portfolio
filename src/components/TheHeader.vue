<template>
  <div
    class="fixed left-[50%] top-4 z-50 flex h-28 w-[96%] translate-x-[-50%] flex-col items-center justify-center gap-2 rounded-xl bg-brand-lightest px-6 shadow-md dark:border dark:border-brand-darky dark:bg-brand-darker he:h-16 he:flex-row he:justify-between he:gap-0 sm:w-[560px]"
  >
    <ul class="flex items-center gap-2.5">
      <li>
        <HeaderButton
          title="Home"
          href="/"
          ariaLabel="Home"
          :selected="page === 'home'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6 transition-colors duration-200 group-hover:stroke-brand-darkest dark:group-hover:stroke-brand-lightest"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </HeaderButton>
      </li>
      <li>
        <HeaderButton
          title="About"
          href="/about/"
          ariaLabel="About"
          :selected="page === 'about'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6 transition-colors duration-200 group-hover:stroke-brand-darkest dark:group-hover:stroke-brand-lightest"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </HeaderButton>
      </li>
      <li>
        <HeaderButton
          title="Projects"
          href="/projects/"
          ariaLabel="Projects"
          :selected="page === 'projects'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6 transition-colors duration-200 group-hover:stroke-brand-darkest dark:group-hover:stroke-brand-lightest"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
            />
          </svg>
        </HeaderButton>
      </li>
      <li>
        <HeaderButton
          title="Technologies"
          href="/technologies/"
          ariaLabel="Technologies"
          :selected="page === 'technologies'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6 transition-colors duration-200 group-hover:stroke-brand-darkest dark:group-hover:stroke-brand-lightest"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
            />
          </svg>
        </HeaderButton>
      </li>
      <li>
        <HeaderButton
          title="Bitcoin"
          href="/bitcoin/"
          ariaLabel="Bitcoin"
          :selected="page === 'bitcoin'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="h-6 w-6 transition-colors duration-200 group-hover:text-brand-darkest dark:group-hover:text-brand-lightest"
          >
            <path
              fill="currentColor"
              d="M9 21v-2H6v-2h2V7H6V5h3V3h2v2h2V3h2v2.125q1.3.35 2.15 1.413T18 9q0 .725-.25 1.388t-.7 1.187q.875.525 1.413 1.425T19 15q0 1.65-1.175 2.825T15 19v2h-2v-2h-2v2H9Zm1-10h4q.825 0 1.413-.588T16 9q0-.825-.588-1.413T14 7h-4v4Zm0 6h5q.825 0 1.413-.588T17 15q0-.825-.588-1.413T15 13h-5v4Z"
            />
          </svg>
        </HeaderButton>
      </li>
      <li>
        <HeaderButton
          title="Blog"
          href="/blog/"
          ariaLabel="Blog"
          :selected="page === 'blog'"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-5 w-5 transition-colors duration-200 group-hover:text-brand-darkest dark:group-hover:text-brand-lightest"
          >
            <path d="M2 6h4" />
            <path d="M2 10h4" />
            <path d="M2 14h4" />
            <path d="M2 18h4" />
            <rect width="16" height="20" x="4" y="2" rx="2" />
            <path d="M16 2v20" />
          </svg>
        </HeaderButton>
      </li>
    </ul>
    <ul class="flex items-center gap-3">
      <li>
        <ThemeToggle client:only="vue" />
      </li>
      <li>
        <Button to="/contact/" text="Contact Me" variant="primary" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { type PropType } from 'vue'
  import Button from './Button.vue'
  import ThemeToggle from './ThemeToggle.vue'
  import HeaderButton from './HeaderButton.vue'

  type CurrentPage =
    | 'home'
    | 'about'
    | 'projects'
    | 'technologies'
    | 'bitcoin'
    | 'blog'
    | 'post'
    | 'none'

  defineProps({
    page: {
      type: String as PropType<CurrentPage>,
      required: true
    }
  })
</script>
