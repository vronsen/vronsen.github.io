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

const { data: education } = await useAsyncData(
  () => "education-" + locale.value,
  () => queryCollection("education").where("lang", "=", locale.value).all(),
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
  <!-- <h1 class="text-4xl font-bold text-primary mt-4 ml-8">
    {{ $t("ABOUT_ME.TITLE") }}
  </h1> -->

  <div v-if="jobs">
    <h2 class="ml-12 mt-16 text-3xl text-secondary font-bold">
      {{ $t("ABOUT_ME.TITLE_JOBS") }}
    </h2>
    <div v-for="(job, index) in jobs" :key="index">
      <UCard variant="soft" class="m-8">
        <template #header>
          <p class="font-bold text-xl">
            {{ job.jobTitle }} @ {{ job.company }}
          </p>
        </template>

        <p class="text-lg">{{ job.description }}</p>

        <template #footer>
          <p class="text-lg">{{ job.start }} - {{ job.end }}</p>
        </template>
      </UCard>
    </div>
  </div>

  <div v-if="education">
    <h2 class="ml-12 mt-16 text-3xl text-secondary font-bold">
      {{ $t("ABOUT_ME.TITLE_EDUCATION") }}
    </h2>
    <div v-for="(educationStep, index) in education" :key="index">
      <UCard variant="soft" class="m-8">
        <template #header>
          <p class="font-bold text-xl">
            {{ educationStep.course }} @ {{ educationStep.university }}
          </p>
        </template>

        <p class="text-lg">{{ educationStep.description }}</p>

        <template #footer>
          <p class="text-lg">
            {{ educationStep.start }} - {{ educationStep.end }}
          </p>
        </template>
      </UCard>
    </div>
  </div>
</template>
