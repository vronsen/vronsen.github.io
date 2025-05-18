<script setup lang="ts">
import { UButton } from "#components";
import { useAsyncData } from "nuxt/app";
import { useRoute } from "vue-router";

const slug = useRoute().params.slug;

const { data: project } = await useAsyncData(`projects-${slug}`, () => {
  return queryCollection("content").path(`/projects/${slug}`).first();
});

const route = useRoute()
const { data: page } = await useAsyncData(`page-${route.path}`, () => {
  return queryCollection('content').path(route.path).first()
})
if (page.value?.ogImage) {
  defineOgImage(page.value.ogImage)
}




</script>

<template>
  <html lang="en">
    <head>
      <title v-if="project">{{ project.title }}</title>
      <meta
        name="description"
        content="This page provides more information about one of my projects."
      />
    </head>
    <div v-if="project" class="m-8">
      <ContentRenderer v-if="project" :value="project"></ContentRenderer>
      <p class="mb-4 text-2xl">{{ project.description }}</p>
      <UButton>
        <NuxtLink class="text-lg" to="/projectOverview"
          >Back to overview</NuxtLink
        >
      </UButton>
    </div>
  </html>
</template>
