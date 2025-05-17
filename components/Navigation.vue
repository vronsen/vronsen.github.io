<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const items = ref<NavigationMenuItem[][]>([
  [
     {
      label: "Home",
      icon: "i-lucide-house",
      to: "/",
      class:"text-xl"
    },
    {
      label: "About me",
      icon: "i-lucide:user-round-search",
      to: "/aboutme",
      class:"text-xl"
    },
    {
      label: "Projects",
      icon: "i-lucide-files",
      to: "/projectOverview",
      class:"text-xl"
    },
    {
      label: "Contact",
      icon: "i-lucide-contact",
      to: "/contact",
      class:"text-xl"
    },
  ],
  [
    {
      label: "GitHub",
      icon: "i-simple-icons-github",
      to: "https://github.com/vronsen",
      target: "_blank",
      class:"text-xl"
    },
  ],
]);
</script>

<template>
  <UNavigationMenu color="neutral" :items="items" class="ml-8 mr-2 mt-4" />
</template>
