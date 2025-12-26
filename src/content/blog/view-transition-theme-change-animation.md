---
title: 'View Transitions: Theme change animation'
pubDate: 2025-12-26
description: 'How you can use view transitions to animate theme change'
heroImage: '../../assets/blog/view-transitions.png'
---

The necessary `css` code for the view transitions:

```css
:root {
  --expo-out: linear(
    0 0%,
    0.1684 2.66%,
    0.3165 5.49%,
    0.446 8.52%,
    0.5581 11.78%,
    0.6535 15.29%,
    0.7341 19.11%,
    0.8011 23.3%,
    0.8557 27.93%,
    0.8962 32.68%,
    0.9283 38.01%,
    0.9529 44.08%,
    0.9711 51.14%,
    0.9833 59.06%,
    0.9915 68.74%,
    1 100%
  );
}

::view-transition-group(root) {
  animation-duration: 0.7s;
  animation-timing-function: var(--expo-out);
}

@keyframes reveal-dark {
  from {
    clip-path: polygon(50% -71%, -50% 71%, -50% 71%, 50% -71%);
  }
  to {
    clip-path: polygon(50% -71%, -50% 71%, 50% 171%, 171% 50%);
  }
}

@keyframes reveal-light {
  from {
    clip-path: polygon(171% 50%, 50% 171%, 50% 171%, 171% 50%);
  }
  to {
    clip-path: polygon(171% 50%, 50% 171%, -50% 71%, 50% -71%);
  }
}

::view-transition-new(root) {
  animation-name: reveal-light;
}

::view-transition-old(root),
.dark::view-transition-old(root) {
  animation: none;
  z-index: -1;
}
.dark::view-transition-new(root) {
  animation-name: reveal-dark;
}
```

Now, when you are toggling the theme from light to dark or vice-versa, use `document.startViewTransition`:

```js
// Example in vue.js

const theme = ref('light')

function handleToggle() {
  if (!document.startViewTransition)
    return (theme.value = theme.value === 'light' ? 'dark' : 'light')
  document.startViewTransition(
    () => (theme.value = theme.value === 'light' ? 'dark' : 'light')
  )
}
```

Note: Make sure you check if `document.startViewTransition` exists and toggle the theme anyway if it doesn't.

If you want to see the code by yourself, check my portfolio code [here](https://github.com/Psycarlo/psycarlo-portfolio). It's open source!
