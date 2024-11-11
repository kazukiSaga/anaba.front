<template>
  <div class="mypage-header">
    <h1>マイページ</h1>
    <form>
      <div class="form-group">
        <label for="nickname">ニックネーム</label>
        <input v-model="user.name" type="text" placeholder="ニックネームを入力" />
      </div>
      <div class="button-group">
        <button type="button" @click="updateUsername">更新する</button>
      </div>
      <p v-if="updateMessage">{{ updateMessage }}</p>
    </form>
  </div>
</template>

<script>
import axios from '../plugins/axios'
import { useRoute, useRouter } from 'vue-router'

export default {
  data() {
    return {
      user: {
        name: ''
      },
      updateMessage: ''
    }
  },
  mounted() {
    console.log("Initial user_id in localStorage:", localStorage.getItem('user_id')); 
    this.fetchUserName()
  },
  methods: {
    fetchUserName() {
      axios
        .get('/api/v1/auth/validate_token', {
          headers: {
            'access-token': localStorage.getItem('access-token'),
            client: localStorage.getItem('client'),
            uid: localStorage.getItem('uid')
          }
        })
        .then((response) => {
          console.log('User data:', response.data)
          this.user.name = response.data.data.name

          const userId = response.data.data.id
          if (userId) {
            localStorage.setItem('user_id', userId)
            console.log('user_id set in localStorage:', userId)
          }
        })
        .catch((error) => {
          console.error('ユーザー名の取得に失敗しました', error)
        })
    },
    updateUsername() {
      const userId = localStorage.getItem('user_id')
      console.log('Updating user_id:', userId)

      axios
        .patch(
          `/api/v1/users/${localStorage.getItem('user_id')}`,{ name: this.user.name },
          {
            headers: {
              'access-token': localStorage.getItem('access-token'),
              client: localStorage.getItem('client'),
              uid: localStorage.getItem('uid')
            }
          }
        )
        .then((response) => {
          this.updateMessage = 'ニックネームが更新されました！'
          console.log("Update response:", response.data);
        })
        .catch((error) => {
          this.updateMessage = '更新に失敗しました'
          console.error('更新エラー', error.response || error);
        })
    }
  }
}
</script>

<style scoped>
.mypage-header {
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
  width: 100%;
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

.button-group {
  text-align: center;
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
