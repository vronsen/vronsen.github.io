
 
  <script setup lang="ts">
import { useAsyncData } from 'nuxt/app';
import { useRoute } from 'vue-router';

    const slug = useRoute().params.slug;
   
    const { data: project } = await useAsyncData(`projects-${slug}`, () => {
      return queryCollection("content").path(`/projects/${slug}`).first();
    });
  
  

</script>

  <template>
     <p>{{ $route.params.slug }}</p>
     <ContentRenderer v-if="project" :value="project"></ContentRenderer>
  </template>
