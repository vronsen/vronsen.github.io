<script setup lang="ts">
import { UButton } from "#components";
import { useAsyncData } from "nuxt/app";
import { useRoute } from "vue-router";

const slug = useRoute().params.slug;

const { data: project } = await useAsyncData(`projects-${slug}`, () => {
  return queryCollection("content").path(`/projects/${slug}`).first();
});
</script>

<template>
  <div v-if="project" class="m-8">
    <ContentRenderer v-if="project" :value="project"></ContentRenderer>
    <p class="mb-4 text-2xl">{{ project.description }}</p>
    <UButton>
      <NuxtLink class="text-lg" to="/projectOverview">Back to overview</NuxtLink>
    </UButton>
  </div>
</template>
