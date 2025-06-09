<script setup lang="ts">
import { UButton } from "#components";
import { routeLocationKey } from "vue-router";

// const { data: projects } = await useAsyncData("content", () =>
//   queryCollection("content").all()
// );

const { locale, t } = useI18n();

const { data: projects } = await useAsyncData(
  () => "project-" + locale.value,
  () =>
    queryCollection("content")
      .where("stem", "LIKE", "%." + locale.value)
      .all(),
  {
    watch: [locale],
  }
);

const tagsToFilterBy = computed(() => [
  {
    label: t("PROJECT_OVERVIEW.NO_FILTER"),
    id: "noFilter",
  },
  {
    label: "UX",
    id: "UX",
  },
  {
    label: "C#",
    id: "C#",
  },
  {
    label: "Game Development",
    id: "Game Development",
  },
  {
    label: "HTML",
    id: "HTML",
  },
  {
    label: "TypeScript",
    id: "TypeScript",
  },
  {
    label: "Daisy UI",
    id: "Daisy UI",
  },
  {
    label: "Unity",
    id: "Unity",
  },
]);

const chosenFilter = ref("noFilter");

function chosenTagIsInTagsOf(project: any) {

  return (
    chosenFilter.value === "noFilter" ||
    project.tags?.includes(chosenFilter.value)
  );
}

useHead({
  htmlAttrs: {
    lang: "en",
  },
  title: "Project overview",
  meta: [
    {
      name: "description",
      content:
        "This page provides information about some of my successful projects in an overview.",
    },
  ],
});

defineOgImageComponent("PortfolioOgImage", {
  headline: t("OG_IMAGES.HEADLINE"),
  title: t("OG_IMAGES.PROJECT_OVERVIEW.TITLE"),
  description: t("OG_IMAGES.PROJECT_OVERVIEW.DESCRIPTION"),
});
</script>

<template>
  <div v-if="projects" class="m-8">
    <div class="flex flex-col justify-between gap-0">
      <h1 class="text-4xl mb-4 font-bold">
        {{ $t("PROJECT_OVERVIEW.TITLE") }}
      </h1>
      <USelect
        v-model="chosenFilter"
        :items="tagsToFilterBy"
        value-key="id"
        option-attribute="label"
        placeholder="Filter projects"
        class="mb-8"
      >
      </USelect>
    </div>
    <div v-for="project in projects" class="mb-8 pb-4">
      <div v-if="chosenTagIsInTagsOf(project)" class="border-b">
        <ContentRenderer :value="project" class="mb-4 text-xl" />
        <UButton class="mb-4">
          <NuxtLink :to="project.path" class="text-lg">
            {{ $t("PROJECT_OVERVIEW.BUTTON_DETAILS") }}
            {{ project.title }}</NuxtLink
          >
        </UButton>
      </div>
    </div>
  </div>
</template>
