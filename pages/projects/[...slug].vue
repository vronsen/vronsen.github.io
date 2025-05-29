<script setup lang="ts">
import { UButton } from "#components";
import { useAsyncData } from "nuxt/app";
import { useRoute } from "vue-router";

const slug = useRoute().params.slug;

const { data: project } = await useAsyncData(`projects-${slug}`, () => {
  return queryCollection("content").path(`/projects/${slug}`).first();
});

const route = useRoute();
const { data: page } = await useAsyncData(`page-${route.path}`, () => {
  return queryCollection("content").path(route.path).first();
});

const { data: reducedProjects } = await useAsyncData(
  `page-${route.path}`,
  () => {
    return queryCollection("content")
      .select("path", "title", "date", "tags")
      .first();
  }
);

if (page.value?.ogImage) {
  defineOgImage(page.value.ogImage);
}
</script>

<template>
  <head>
      <title v-if="project">{{ project.title }}</title>
      <meta
        name="description"
        content="This page provides more information about one of my projects."
      />
    </head>
  <div class="m-8" v-if="project">
    <ContentRenderer :value="project" />
    <p class="mb-4 text-2xl">{{ project.description }}</p>

    <div v-if="reducedProjects" class="mb-4 text-2xl">
      <p class="font-bold">Published:</p>
      <p>{{ reducedProjects.date }}</p>
    </div>

    <div v-if="reducedProjects?.tags" class="flex flex-wrap gap-2 mb-6">
      <UBadge
        v-for="tag in reducedProjects.tags"
        :key="tag"
        color="info"
        variant="outline"
      >
        {{ tag }}
      </UBadge>
    </div>

    <NuxtLink to="/projectOverview">
      <UButton class="text-lg">Overview</UButton>
    </NuxtLink>
  </div>
</template>
