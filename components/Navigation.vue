<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const { locales, locale, setLocale, t } = useI18n();

const currentLocale = computed(() => locale.value);

const items = computed<NavigationMenuItem[][]>(() => [
  [
    {
      label: t("NAVIGATION.HOME"),
      icon: "i-lucide-house",
      to: "/",
      class: "text-xl",
    },
    {
      label: t("NAVIGATION.ABOUT_ME"),
      icon: "i-lucide:user-round-search",
      to: "/aboutme",
      class: "text-xl",
    },
    {
      label: t("NAVIGATION.PROJECTS"),
      icon: "i-lucide-files",
      to: "/projectOverview",
      class: "text-xl",
    },
    {
      label: t("NAVIGATION.CONTACT"),
      icon: "i-lucide-contact",
      to: "/contact",
      class: "text-xl",
    },
  ],
  [
    {
      label: "GitHub",
      icon: "i-simple-icons-github",
      to: "https://github.com/vronsen",
      target: "_blank",
      class: "text-xl",
    },
  ],
]);

const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.preference === "dark";
  },
  set() {
    colorMode.preference = colorMode.preference === "dark" ? "light" : "dark";
  },
});
</script>

<template>
  <UNavigationMenu color="neutral" :items="items" class="ml-8 mr-2 mt-4" />
  <div class="flex flex-row justify-end mr-6">
    <USwitch
      label="Select color mode here."
      size="xl"
      color="primary"
      checked-icon="i-heroicons-moon"
      unchecked-icon="i-heroicons-sun"
      v-model="isDark"
    >
    </USwitch>

    <UButton
      @click="setLocale('de')"
      class="ml-2"
      :variant="currentLocale === 'de' ? 'solid' : 'outline'"
    >
      German
    </UButton>
    <UButton
      @click="setLocale('en')"
      class="ml-2"
      :variant="currentLocale === 'en' ? 'solid' : 'outline'"
    >
      English
    </UButton>
    <!-- <h1>{{ $t('NAVIGATION.ABOUT_ME') }}</h1> -->
  </div>
</template>
