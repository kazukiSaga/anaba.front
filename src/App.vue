<template>
  <div id="app">
    <main-header />
    <RouterView />
  </div>
</template>

<script setup>
import MainHeader from './views/MainHeader.vue'
import { RouterView } from 'vue-router'
import 'normalize.css'
</script>

<style scoped></style>
