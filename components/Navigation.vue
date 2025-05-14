
<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: 'About me',
      icon: 'i-lucide:user-round-search',
      to: '/aboutme',
      
    },
    {
      label: 'Projects',
      icon: 'i-lucide:user-round-search',
      to: '/projects'
    },
    {
      label: 'Contact',
      icon: 'i-lucide-contact',
      to: '/contact'
    }
  ],
  [
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      to: 'https://github.com/vronsen',
      target: '_blank'
    }
  ]
])
</script>

<template>
    

    
  <UNavigationMenu color="neutral" :items="items" class="w-full" />

</template>
