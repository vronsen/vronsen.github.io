<script setup lang="ts">
const { data } = await useAsyncData('project', () => queryCollection('content').path('/projects/${route.params.slug').first())
</script>

<template>
  <div v-if="data">
    <h1>{{ data.title }}</h1>
    <ContentRenderer :value="data" />
  </div>
</template>


