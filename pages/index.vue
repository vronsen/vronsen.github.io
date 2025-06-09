<script setup lang="ts">
import { UContainer } from "#components";
import { OrbitControls, GLTFModel } from "@tresjs/cientos";

const { locale, t } = useI18n();

// const { data: project } = await useAsyncData("content", () =>
//   queryCollection("content").where('stem', 'LIKE', '%.' + locale.value).first()
// );

const { data: project } = await useAsyncData(
  () => "project-" + locale.value,
  () =>
    queryCollection("content")
      .where("stem", "LIKE", "%." + locale.value)
      .first(),
  {
    watch: [locale],
  }
);

defineOgImageComponent("PortfolioOgImage", {
  headline: t("OG_IMAGES.HEADLINE"),
  title: t("OG_IMAGES.HOME.TITLE"),
  description: t("OG_IMAGES.HOME.DESCRIPTION"),
});

useHead({
  htmlAttrs: {
    lang: "en",
  },
  title: "Homepage",
  meta: [
    {
      name: "description",
      content:
        "This is the start page with a brief summary of who I am and one example project.",
    },
  ],
});
</script>

<template>
  <div class="ml-12">
    <section>
      <h1 class="text-3xl">{{ $t("HOMEPAGE.DESCRIPTION_TITLE_SHORT") }}</h1>
    </section>
    <section>
      <p class="text-xl">
        {{ $t("HOMEPAGE.DESCRIPTION_TITLE_LONG") }}
      </p>
    </section>
    <div class="m-4 h-80 w-120">
      <TresCanvas>
        <TresPerspectiveCamera :position="[2, 2, 5]" />
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
  </div>

  <div v-if="project" class="ml-12">
    <ContentRenderer :value="project" class="w-lg mb-4 text-xl" />

    <UButton class="mb-8">
      <NuxtLink :to="project.path" class="text-lg"
        >{{ $t("PROJECT_OVERVIEW.BUTTON_DETAILS") }} {{ project.title }}
      </NuxtLink>
    </UButton>
  </div>
</template>
