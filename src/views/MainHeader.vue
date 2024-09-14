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
          <router-link to="/about">ログイン</router-link>
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
  justify-content: flex-start; /* 全て左寄せ */
}

.search-form {
  margin-right: 20px; /* 検索フォームと右側のリンクの間に20pxのスペースを設定 */
}

.right-links {
  display: flex;
  gap: 1.5rem; /* リンク間のスペース */
}

input[type='text'] {
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
