<template>
  <div class="flex flex-col gap-4">
    <slot></slot>
    <div class="flex flex-col gap-2">
      <h3 class="text-2xl font-medium">Learn about Bitcoin</h3>
      <p class="text-brand-gray">
        Psybitcoin is a learning platform that teaches about bitcoin and other
        exciting topics. Video lessons are currently only available in
        Portuguese.
      </p>
      <p class="text-brand-gray">
        In psybitcoin you can watch engaging videos that will teach you
        everything in a simplified way, track the price of bitcoin with a
        wonderful custom chart, interact with the community, read articles,
        invite friends and earn achievements and bitcoin.
      </p>
    </div>
  </div>
  <div class="mt-3 flex justify-center">
    <PsybitcoinButton />
  </div>
  <div class="mt-8">
    <div class="flex flex-col gap-2">
      <h3 class="text-2xl font-medium">Buy me a coffee</h3>
      <p class="text-brand-gray">
        Want to buy me a coffee? I am taking bitcoin ;)
      </p>
      <div>
        <slot name="qr"></slot>
        <p class="mt-1 text-center text-xs text-brand-grayDark">
          scan the qr code
        </p>
      </div>
      <div class="mt-2 flex items-center justify-center gap-4">
        <CopyButton
          client:visible
          text="Copy Address"
          :copy-text="BC1_ADDRESS"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import PsybitcoinButton from '../components/PsybitcoinButton.vue'
  import CopyButton from '../components/CopyButton.vue'

  const BC1_ADDRESS = 'bc1qzsdges0lm34jkjfydgltr6jqnuxcjrj7rapuyy'
</script>
