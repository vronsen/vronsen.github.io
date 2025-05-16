<script setup lang="ts">
const { data: projects } = await useAsyncData("content", () =>
  queryCollection("content").all()
);
</script>

<template>
  <div v-if="projects">
    <div
      v-for="project in projects"
      :key="project.id"
      class="mb-8 border-b pb-4"
    >
   
      <ContentRenderer :value="project" />

      <NuxtLink :to='project.path'>{{project.title}}</NuxtLink>
    </div>
  </div>

  <div v-else>Keine Projekte gefunden.</div>
</template>
