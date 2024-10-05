<template>
  <TooltipProvider>
    <TooltipRoot>
      <TooltipTrigger as-child>
        <a
          :href="props.href"
          class="group flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:bg-brand-light dark:hover:bg-brand-dark"
          :class="{ 'bg-brand-light dark:bg-brand-dark': page === 'bitcoin' }"
          :aria-label="props.ariaLabel"
        >
          <span
            :class="[
              props.selected
                ? 'text-brand-darkest dark:text-brand-lightest'
                : 'text-brand-gray'
            ]"
          >
            <slot />
          </span>
        </a>
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          side="bottom"
          :side-offset="5"
          class="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade z-[100] select-none rounded-md bg-brand-darkest px-[15px] py-[10px] text-sm leading-none text-brand-lightest shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity] dark:bg-brand-dark dark:text-brand-lightest"
        >
          {{ props.title }}
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>

<script setup lang="ts">
  import {
    TooltipContent,
    TooltipPortal,
    TooltipProvider,
    TooltipRoot,
    TooltipTrigger
  } from 'radix-vue'

  type HeaderButtonProps = {
    title: string
    href: string
    selected: boolean
    ariaLabel: string
  }

  const props = defineProps<HeaderButtonProps>()
</script>
