<script setup lang="ts">
import { UContainer } from "#components";
import { OrbitControls, GLTFModel } from "@tresjs/cientos";

const { data: projects } = await useAsyncData("content", () =>
  queryCollection("content").all()
);

defineOgImageComponent("PortfolioOgImage", {
  headline: "Moin!",
  title: "I am Veronika 👋",
  description:
    "This Portfolio introduces me briefly as a person and my most successful projects.",
});
</script>

<template>
  <html lang="en">
    <head>
      <title>Homepage</title>
      <meta
        name="description"
        content="This is the start page with a brief summary of who I am and one example project."
      />
    </head>
    <div class="m-8 h-screen">
      <section>
        <h1 class="text-3xl">Hi I am Veronika.</h1>
      </section>
      <section>
        <p class="text-xl">
          I'm a business psychologist, currently studying media informatics.
          I've been working in the areas of UX Design/Research and Frontend
          Development.
        </p>
      </section>
      <TresCanvas>
        <TresPerspectiveCamera :position="[3, 2, 5]" />
        <OrbitControls />
        <Suspense>
          <GLTFModel path="/models/cuteMug/scene.gltf" draco />
        </Suspense>
        <TresDirectionalLight
          :position="[3, 3, 3]"
          :intensity="2"
          cast-shadow
        />
      </TresCanvas>
    </div>

    <div v-if="projects">
      <div v-for="project in projects" :key="project.id">
        <div v-if="project.title == 'ESC Voting App'" class="m-8">
          <h1 class="text-2xl font-bold">{{ project.title }}</h1>

          <ContentRenderer :value="project" class="w-lg mb-4 text-xl" />

          <UButton>
            <NuxtLink :to="project.path" class="text-lg"
              >Details for {{ project.title }}
            </NuxtLink>
          </UButton>
        </div>
      </div>
    </div>

    <div v-else>Keine Projekte gefunden.</div>
  </html>
</template>
