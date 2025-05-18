<script setup lang="ts">

const colorModeButtonValue = ref('system');

defineOgImageComponent('PortfolioOgImage', {
  headline: 'Moin!',
  title: "This is me 👋",
  description: 'This about me page introduces me and my CV in detail.'
});

// definePageMeta({
//   colorMode: 'light',
// })


</script>

<template>
  <html lang="en">
    <head>
      <title>About me</title>
       <meta name="description" content="This page contains information about myself and my CV.">
    </head>
    <UButtonGroup>

    </UButtonGroup>
    <h1 class="text-xl mt-4 ml-12">Here will be my CV.</h1>
  </html>
</template>
