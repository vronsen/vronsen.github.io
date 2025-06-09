<script setup lang="ts">

const { t } = useI18n();

defineOgImageComponent('PortfolioOgImage', {
  headline: t("OG_IMAGES.HEADLINE"),
  title: t("OG_IMAGES.ABOUT_ME.TITLE"),
  description: t("OG_IMAGES.ABOUT_ME.DESCRIPTION"),
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
    <h1 class="text-xl mt-4 ml-12">{{ $t("ABOUT_ME.TITLE") }}</h1>
  
</template>
