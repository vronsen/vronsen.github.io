<script setup lang="ts">
import { UButton } from "#components";

const { data: projects } = await useAsyncData("content", () =>
  queryCollection("content").all()
);
</script>

<template>
  <html lang="en">
    <head>
      <title>Project overview</title>
    </head>
    
  <div v-if="projects" class="m-8">
    <h1 class="text-4xl mb-4 font-bold">Project Overview</h1>
    <div
      v-for="project in projects"
      :key="project.id"
      class="mb-8 border-b pb-4"
    >
      <ContentRenderer :value="project" class="mb-4 text-xl" />

      <UButton>
        <NuxtLink :to="project.path" class="text-lg">Details to {{ project.title }}</NuxtLink>
      </UButton>
    </div>
  </div>

  <div v-else>Keine Projekte gefunden.</div>
  </html>
</template>
