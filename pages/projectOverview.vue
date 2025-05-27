<script setup lang="ts">
import { UButton } from "#components";
import { routeLocationKey } from "vue-router";

const { data: projects } = await useAsyncData("content", () =>
  queryCollection("content").all()
);


// const { data: reducedProjects } = await useAsyncData(
//   "content", () =>
//   queryCollection("content").select("tags").first()
// );





// const { data: reducedProjects } = await useAsyncData("content", () => {
//   return queryCollection("content").select("path", "title", "date").all();
// });

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
      <div class="flex justify-between gap-0">
      <h1 class="text-4xl mb-4 font-bold">Project Overview</h1>
      <UDropdownMenu class="px-10"> 
        <UButton label="Filter" color="neutral" variant="outline" icon="i-lucide-filter">

        </UButton>
      </UDropdownMenu>
      </div>
      <div v-for="project in projects" class="mb-8 border-b pb-4">
       <ContentRenderer :value="project" class="mb-4 text-xl" />
      
      

        <!-- <p class="mb-4 text-2xl">{{ project.date }}</p> -->
      

        <UButton>
          <NuxtLink :to="project.path" class="text-lg"
            >Details to {{ project.title }}</NuxtLink
          >
        </UButton>
               
      </div>
    </div>

    <div v-else>Keine Projekte gefunden.</div>

  
  </html>
</template>
