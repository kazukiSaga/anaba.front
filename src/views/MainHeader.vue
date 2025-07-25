<template>
  <header>
    <nav>
      <ul>
        <li class="right-links">
          <router-link to="/">トップ</router-link>
          <router-link v-if="!loggedIn" to="/login">ログイン</router-link>
          <button v-if="!loggedIn" @click="guestLogin" class="guest-login-btn">
            ゲストログイン
          </button>
          <router-link v-if="!loggedIn" to="/sign_up">ユーザー登録</router-link>
          <button v-if="loggedIn" @click="redirectSpotNew">スポット投稿</button>
          <button v-if="loggedIn" @click="logout">ログアウト</button>
          <button v-if="loggedIn" @click="MyPage">マイページ</button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/index'
import axios from '../plugins/axios'
import router from '@/router'

const userStore = useUserStore()

const loggedIn = computed(() => {
  return Object.keys(userStore.getUser).length !== 0
})

onMounted(() => {
  fetchUser()
})

const fetchUser = () => {
  const token = localStorage.getItem('access-token')
  const client = localStorage.getItem('client')
  const uid = localStorage.getItem('uid')

  if (token) {
    axios
      .get(`/api/v1/users`, {
        headers: {
          'access-token': token,
          client: client,
          uid: uid
        }
      })
      .then((res) => {
        userStore.setUser(res.data.user)
      })
      .catch(() => {
        alert('スポット情報の取得に失敗しました。もう一度お試しください。')
      })
    axios
      .get(`/api/v1/users`, {
        headers: {
          'access-token': token,
          client: client,
          uid: uid
        }
      })
      .then((res) => {
        userStore.setUser(res.data.user)
      })
      .catch((error) => {
        console.error('ユーザー情報の取得に失敗しました。', error)
      })
  }
}

const guestLogin = async () => {
  try {
    const response = await axios.post('api/v1/auth/guest_sign_in')

    console.log(response)

    localStorage.setItem('access-token', response.headers['access-token'])
    localStorage.setItem('client', response.headers['client'])
    localStorage.setItem('uid', response.headers['uid'])

    userStore.setUser(response.data.data)

    alert('ゲストログインしました！')

    router.push('/spots')
  } catch (error) {
    console.error('ゲストログインエラー:', error)
    alert('ゲストログインに失敗しました。')
  }
}

const logout = () => {
  const token = localStorage.getItem('access-token')
  const client = localStorage.getItem('client')
  const uid = localStorage.getItem('uid')

  axios
    .delete('/api/v1/auth/sign_out', {
      headers: {
        uid: uid,
        'access-token': token,
        client: client
      }
    })
    .then(() => {
      localStorage.removeItem('uid')
      localStorage.removeItem('access-token')
      localStorage.removeItem('client')
      alert('ログアウトしました。')
      userStore.deleteUser()
      router.push({ path: '/' })
    })
    .catch(() => {
      alert('ログアウトに失敗しました。もう一度お試しください。')
    })
}

const redirectSpotNew = () => {
  router.push({ name: 'spot_new' })
}

const MyPage = () => {
  router.push({ name: 'MyPage' })
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
  justify-content: flex-start;
}

.right-links {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  overflow-x: auto;
  white-space: nowrap;
}

a,
button {
  color: black;
  text-decoration: none;
  font-size: 0.85rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 6px;
}

a:hover,
button:hover {
  text-decoration: underline;
}

.guest-login-btn {
  background-color: #4caf50;
  color: white !important;
  border-radius: 4px;
  font-weight: bold;
}

.guest-login-btn:hover {
  background-color: #45a049;
  text-decoration: none;
}

@media (min-width: 1024px) {
  a,
  button {
    font-size: 1.2rem;
    padding: 8px 12px;
  }
}

@media (max-width: 600px) {
  a,
  button {
    font-size: 0.8rem;
    gap: 0.3rem;
  }
}
</style>
