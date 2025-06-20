<script setup lang="ts">
// const { data: jobs } = await useAsyncData("jobs", () => {
//   return queryCollection("jobs").all();
// });

const { locale, t } = useI18n();
const { data: jobs } = await useAsyncData(
  () => "job-" + locale.value,
  () => queryCollection("jobs").where("lang", "=", locale.value).all(),
  {
    watch: [locale],
  }
);

defineOgImageComponent("PortfolioOgImage", {
  headline: t("OG_IMAGES.HEADLINE"),
  title: t("OG_IMAGES.ABOUT_ME.TITLE"),
  description: t("OG_IMAGES.ABOUT_ME.DESCRIPTION"),
});

useHead({
  htmlAttrs: {
    lang: "en",
  },
  title: "About me",
  meta: [
    {
      name: "description",
      content: "This page contains information about myself and my CV.",
    },
  ],
});
</script>

<template>
  <h1 class="text-4xl font-bold mt-4 ml-8">{{ $t("ABOUT_ME.TITLE") }}</h1>

  <div v-if="jobs">
    <h2 class="m-8 text-3xl text-red-300 font-bold">
      {{ $t("ABOUT_ME.TITLE_JOBS") }}
    </h2>
    <div v-for="(job, index) in jobs" :key="index">
      <UCard variant="soft" class="m-8">
        <template #header>
          <p class="font-bold text-2xl">
            {{ job.jobTitle }} @ {{ job.company }}
          </p>
        </template>

        <p class="text-xl">{{ job.description }}</p>

        <template #footer>
          <p class="text-xl">{{ job.start }} - {{ job.end }}</p>
        </template>
      </UCard>
    </div>
  </div>
</template>
