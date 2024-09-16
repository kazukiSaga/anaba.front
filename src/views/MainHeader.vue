<template>
  <header>
    <nav>
      <ul>
        <li class="right-links">
          <router-link to="/">トップ</router-link>
          <router-link v-if="!loggedIn" to="/login">ログイン</router-link>
          <router-link v-if="!loggedIn" to="/sing_up">ユーザー登録</router-link>
          <button v-if="loggedIn" @click="redirectSpotNew">スポット投稿</button>
          <button v-if="loggedIn" @click="logout">ログアウト</button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from '../plugins/axios'
import { RouterLink } from 'vue-router'
import router from '@/router'

const loggedIn = computed(() => {
  const token = localStorage.getItem('access-token')
  return token !== null
})

const logout = () => {
  const token = localStorage.getItem('access-token')
  const client = localStorage.getItem('client')
  const uid = localStorage.getItem('uid')

  axios
    .delete('/api/v1/auth/sign_out', {
      test: { test: 'test' },
      headers: {
        uid: uid,
        'access-token': token,
        client: client
      }
    })
    .then((response) => {
      localStorage.removeItem('uid')
      localStorage.removeItem('access-token')
      localStorage.removeItem('client')
      alert('ログアウトしました。')
    })
    .catch((error) => {
      console.error(error)
    })
}

const redirectSpotNew = () => {
  router.push({ name: 'spot_new' })
}
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
