<template>
  <h1 class="text-4xl text-center">Content</h1>
  <h2>Dark Mode: {{ isDark ? 'On' : 'Off' }}</h2>
</template>

<script setup>
import { useDark } from '@vueuse/core'
const isDark = useDark()
</script>
