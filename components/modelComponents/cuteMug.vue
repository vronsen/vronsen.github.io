<script setup lang="ts">
import { useGLTF } from '@tresjs/cientos'

const { scene, nodes, animations, materials } = await useGLTF('/models/cuteMug.gltf', {draco: true})
</script>

<template>
    <!-- <primitive :object="nodes.cuteMug"></primitive> -->
</template>


