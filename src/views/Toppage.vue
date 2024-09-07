<template>
  <div>
    <main-header />

    <div class="toppage">
        <h1>Anaba</h1>
          <li class="right-links">
            <router-link to="/about">穴場スポット一覧</router-link>
          </li>
          <li class="right-links">
            <router-link to="/about">穴場スポットMAP</router-link>
          </li>

    </div>
  </div>
</template>

<script>
import MainHeader from '../views/MainHeader.vue'

export default {
  components: {
    MainHeader
  }
}
</script>

<style scoped>
.toppage {
  /* 必要に応じてスタイルを追加 */
  text-align: center;
  margin-top: 20px;
}
</style>