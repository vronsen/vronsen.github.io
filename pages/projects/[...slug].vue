<script setup lang="ts">
import { UButton } from "#components";
import { useAsyncData } from "nuxt/app";
import { useRoute } from "vue-router";

// const slug = useRoute().params.slug;

// funktioniert wahrscheinlich ohne die sub-ordner in content/projects
// const { data: project } = await useAsyncData(`projects-${slug}`, () => {
//   return queryCollection("content").path(`/projects/${slug}`).first();
// });


const route = useRoute();

const { locale } = useI18n();

// const { data: page } = await useAsyncData(`page-${route.path}`, () => {
//  return queryCollection("content").path(route.path).first();
// });

//Test

//const pathWithoutPrefix = route.path.replace(/^\/[a-z]{2}(\/|$)/, '')

//const contentPath = `/${pathWithoutPrefix}`

// const { data: pageTest } = await useAsyncData(`pageTest-${contentPath}`, async () => {
//   const result = await queryCollection("content").path(contentPath).first()
//   console.log("Lade:", contentPath, "→", result)
//   return result
// })

const contentPath = computed(() => {
  return route.path
    .replace(/^\/[a-z]{2}(\/|$)/, "")
    .replace(/\.(en|de|fr|es|it)$/, "");
});

const localizedContentPath = computed(() => {
  return `${contentPath.value}.${locale.value}`;
});

const { data: pageTest } = await useAsyncData(
  () => `pageTest-${localizedContentPath.value}`,
  async () => {
    const result = await queryCollection("content")
      .path(localizedContentPath.value)
      .select("body", "description", "title", "date", "tags")
      .first();
    console.log("Lade:", localizedContentPath.value, "→", result);
    return result;
  },
  {
    watch: [localizedContentPath],
  }
);

// const { data: reducedProjects } = await useAsyncData(
//   `reducedProjects-${route.path}`,
//   () => {
//     return queryCollection("content")
//       .select("path", "title", "date", "tags")
//       .first();
//   }
// );

// if (page.value?.ogImage) {
//   defineOgImage(page.value.ogImage);
// }

if (pageTest.value) {
  defineOgImageComponent("PortfolioOgImage", {
    headline: "Moin!",
    title: pageTest.value.title,
    description: pageTest.value.description,
  });
}

useHead({
  htmlAttrs: {
    lang: "en",
  },
  title: pageTest.title,
  meta: [
    {
      name: "description",
      content: "This page provides more information about one of my projects.",
    },
  ],
});
</script>

<template>
  <div class="m-8" v-if="pageTest">
    <ContentRenderer :value="pageTest" />
    <p class="mb-4 text-2xl">{{ pageTest.description }}</p>

    <div class="mb-4 text-lg">
      <p class="font-bold">{{
      $t("PROJECT_DETAIL.PUBLISHED_LABEL")
    }}:</p>
      <p>{{ pageTest.date }}</p>
    </div>

    <div class="flex flex-wrap gap-2 mb-2">
      <UBadge
        v-for="tag in pageTest.tags"
        :key="tag"
        color="info"
        variant="outline"
        class="flex flex-wrap gap-2 mb-6"
      >
        {{ tag }}
      </UBadge>
    </div>

    <NuxtLink to="/projectOverview">
      <UButton class="text-lg">{{
        $t("PROJECT_DETAIL.BACK_TO_OVERVIEW_BUTTON_LABEL")
      }}</UButton>
    </NuxtLink>
  </div>
</template>
