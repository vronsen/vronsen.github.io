<script setup lang="ts">
const { data: project } = await useAsyncData("content", () =>
  queryCollection("content").first()
);
</script>

<template>
  <div v-if="project">
    <div
      
    >
   
      <ContentRenderer :value="project" />


    </div>
  </div>

  <div v-else>Kein Projekt gefunden.</div>
</template>