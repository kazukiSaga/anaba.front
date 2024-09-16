<template>
  <div class="register-page">
    <h1>ログイン</h1>
    <form>
      <div class="form-group">
        <labelquiet_rating for="email">メールアドレス</labelquiet_rating>
        <input type="email" v-model="email" id="email" placeholder="アドレス" />
      </div>

      <div class="form-group">
        <label for="password">パスワード</label>
        <input type="password" v-model="password" id="password" placeholder="パスワード" />
      </div>

      <button type="button" @click="login">ログイン</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from '../plugins/axios'
import { useRoute, useRouter } from 'vue-router'

const email = ref(null)
const password = ref(null)
const router = useRouter()

const login = () => {
  axios
    .post('api/v1/auth/sign_in', {
      email: email.value,
      password: password.value
    })
    .then((response) => {
      console.log(response)
      localStorage.setItem('access-token', response.headers['access-token'])
      localStorage.setItem('client', response.headers['client'])
      localStorage.setItem('uid', response.headers['uid'])
      alert('ログインしました。')
      router.push({ path: '/' })
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>

<style scoped>
.register-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}

h1 {
  text-align: center;
  font-size: 36px;
  margin-bottom: 30px;
  color: #333;
}

form {
  width: 500%;
  max-width: 900px;
  padding: 0;
  background-color: transparent;
  border: none;
  box-shadow: none;
}

.form-group {
  margin-bottom: 25px;
}

.form-group input {
  width: 100%;
  padding: 15px;
  font-size: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 15px;
  font-size: 24px;
  background-color: #4169e1;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
}

button:hover {
  background-color: #0000cd;
}
</style>
