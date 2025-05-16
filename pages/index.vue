<script setup lang="ts">
//  const { data: project } = await useAsyncData("content", () =>
//    queryCollection("content").first()
//  );

//  if(project) {
// console.log("Example Project", project.value);
//  }

const { data: projects } = await useAsyncData("content", () =>
  queryCollection("content").all()
);
</script>

<template>
  <div class="m-8">
    <section>
      <h1>Hi I am Veronika.</h1>
    </section>
    <section>
      <p>
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
    <div
      v-for="project in projects"
      :key="project.id"
     
    >
      <div v-if="project.title == 'ESC Voting App'" class="m-8">
        
         <h1 class="text-2xl font-bold">{{ project.title }}</h1>
         
         <p>{{ project.description }}</p>
         <ContentRenderer :value="project" class="w-lg" />
    
         <UButton>
<NuxtLink :to="project.path">Details</NuxtLink>
         </UButton>
        
      </div>
    </div>
  </div>

  <div v-else>Keine Projekte gefunden.</div>
</template>

