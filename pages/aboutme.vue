<script setup lang="ts">

defineOgImageComponent('PortfolioOgImage', {
  headline: 'Moin!',
  title: "This is me 👋",
  description: 'This about me page introduces me and my CV in detail.'
});

useHead({
  htmlAttrs: {
    lang: "en",
  },
  title: "About me",
  meta: [
    {
      name: "description",
      content:
        "This page contains information about myself and my CV.",
    },
  ],
});


</script>

<template>
  
    <UButtonGroup>

    </UButtonGroup>
    <h1 class="text-xl mt-4 ml-12">Here will be my CV.</h1>
  
</template>
