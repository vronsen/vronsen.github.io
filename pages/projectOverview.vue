<script setup lang="ts">
import { UButton } from "#components";
import { routeLocationKey } from "vue-router";

const { data: projects } = await useAsyncData("content", () =>
  queryCollection("content").all()
);

const tagsToFilterBy = ref([
  {
    label: "No filter",
    id: "noFilter",
  },
  {
    label: "UX",
    id: "ux",
  },
  {
    label: "C#",
    id: "cSharp",
  },
  {
    label: "Game Development",
    id: "gameDevelopment",
  },
  {
    label: "HTML",
    id: "html",
  },
  {
    label: "TypeScript",
    id: "typescript",
  },
  {
    label: "Daisy UI",
    id: "daisyUi",
  },
  {
    label: "Unity",
    id: "unity",
  },
]);

const chosenFilter = ref("No filter");

function chosenTagIsInTagsOf(project: any) {
  console.log(project.value);

  return project.tags.includes(chosenFilter.value) ||
    chosenFilter.value === "No filter"
    ? true
    : false;
}

defineOgImageComponent("PortfolioOgImage", {
  headline: "Moin!",
  title: "These are my projects",
  description: "This overview provides information about my projects.",
});
</script>

<template>
  <html lang="en">
    <head>
      <title>Project overview</title>
      <meta
        name="description"
        content="This page provides information about some of my successful projects in an overview."
      />
    </head>

    <div v-if="projects" class="m-8">
      <div class="flex flex-col justify-between gap-0">
        <h1 class="text-4xl mb-4 font-bold">Project Overview</h1>
        <USelect
          v-model="chosenFilter"
          :items="tagsToFilterBy"
          value-key="label"
          placeholder="Filter projects"
          class="mb-8"
        >
        </USelect>
      </div>
      <div v-for="project in projects" class="mb-8 pb-4">
        <div v-if="chosenTagIsInTagsOf(project)" class="border-b">
          <ContentRenderer :value="project" class="mb-4 text-xl" />
          <UButton class="mb-4">
            <NuxtLink :to="project.path" class="text-lg"
              >Details to {{ project.title }}</NuxtLink
            >
          </UButton>
        </div>
      </div>
      
    </div>
  </html>
</template>
