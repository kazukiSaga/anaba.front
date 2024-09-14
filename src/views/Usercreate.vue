<template>
  <div class="register-page">
    <main-header />
    <h1>ユーザー登録</h1>
    <form>
      <div class="form-group">
        <input type="text" id="username" placeholder="ニックネーム" />
      </div>

      <div class="form-group">
        <input type="email" id="email" placeholder="アドレス" />
      </div>

      <div class="form-group">
        <input type="password" id="password" placeholder="パスワード" />
      </div>

      <div class="form-group">
        <input type="password" id="confirm-password" placeholder="パスワード確認" />
      </div>

      <button type="button">登録</button>
    </form>
  </div>
</template>

<script>
import MainHeader from './MainHeader.vue'

export default {
  components: {
    MainHeader
  }
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
  background-color: #4169E1;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 15px;
}

button:hover {
  background-color: #0000CD;
}
</style>