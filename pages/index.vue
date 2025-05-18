<script setup lang="ts">
import { UContainer } from "#components";

//  const { data: project } = await useAsyncData("content", () =>
//    queryCollection("content").first()
//  );

//  if(project) {
// console.log("Example Project", project.value);
//  }

const { data: projects } = await useAsyncData("content", () =>
  queryCollection("content").all()
);

// const { datas } = await useAsyncData("content", () => {
//   return queryCollection('content')
//     .select('title', 'description', 'meta')
//     .all()
// })



</script>

<template>
  <html lang="en">
    <head>
  <title>Homepage</title>
   <meta name="description" content="This is the start page with a brief summary of who I am and one example project.">
</head>
  <div class="m-8">
    <section>
      <h1 class="text-3xl">Hi I am Veronika.</h1>
    </section>
    <section>
      <p class="text-xl">
        I'm a business psychologist, currently studying media informatics. I've
        been working in the areas of UX Design/Research and Frontend
        Development.
      </p>
    </section>
  </div>

  <!-- <div v-if="project">
  
      <ContentRenderer :value="project" />
      <NuxtLink :to='project.path'>{{project.title}}</NuxtLink>

    </div>
  
  <div v-else>Projekt nicht gefunden</div> -->

  <div v-if="projects">
    <div v-for="project in projects" :key="project.id">
      <div v-if="project.title == 'ESC Voting App'" class="m-8">
        <h1 class="text-2xl font-bold">{{ project.title }}</h1>

        <ContentRenderer :value="project" class="w-lg mb-4 text-xl" />

        <UButton>
          <NuxtLink :to="project.path" class="text-lg">Details for {{ project.title }} </NuxtLink>
        </UButton>
      </div>
    </div>
  </div>

  <div v-else>Keine Projekte gefunden.</div>
  </html>
</template>
