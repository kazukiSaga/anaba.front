<template>
  <header>
    <nav>
      <ul>
        <li class="search-form">
          <form>
            <input type="text" placeholder="検索フォーム" />
          </form>
        </li>

        <li class="right-links">
          <router-link to="/">ユーザー登録</router-link>
        </li>
        <li class="right-links">
          <router-link to="/about">ログイン</router-link>
        </li>
        <li class="right-links">
          <router-link to="/about">ユーザー登録</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: #ffff00;
  color: black;
  display: flex;
  align-items: center;
  padding: 0 20px;
  z-index: 1000;
}

nav ul {
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
  width: 100%;
  align-items: center;
}

.search-form {
  flex-grow: 1;
}

.right-links {
  display: flex;
  gap: 1.5rem;
}

input[type="text"] {
  padding: 0.5rem;
  border: 2px solid black;
  border-radius: 4px;
}

a {
  color: black;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>