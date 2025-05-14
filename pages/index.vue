<script setup lang="ts">

const { data: home }= await useAsyncData(() => queryCollection('content').path('/').first())

useSeoMeta({
    title: home.value?.title,
    description: home.value?.description
})

</script>



<template>
    <ContentRenderer v-if="home" :value="home"/>
    <div> Home not found</div>

    <h1 class="mt-8">Hallo!</h1>
    <UButton>Button</UButton>
</template>