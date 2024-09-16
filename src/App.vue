<template>
  <!-- ルートごとのコンテンツを表示 -->
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

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  margin: 0;
  padding: 0;
  width: 1200px;
  height: 1000px;
}
</style>
