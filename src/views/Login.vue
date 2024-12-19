<template>
  <v-container class="register-page">
    <v-row justify="center" align="start" class="fill-height mt-10">
      <v-col cols="12" md="8" lg="6">
        <h1 class="text-center mb-6">ログイン</h1>
        <v-card elevation="12" class="pa-6 large-card">
          <v-form>
            <v-text-field
              v-model="email"
              label="メールアドレス"
              outlined
              dense
              class="mb-5"
              type="email"
              placeholder="アドレス"
            />
            <v-text-field
              v-model="password"
              label="パスワード"
              outlined
              dense
              class="mb-5"
              type="password"
              placeholder="パスワード"
            />
            <v-btn color="primary" large block @click="login">
              ログイン
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import axios from "../plugins/axios";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const login = () => {
  axios
    .post("api/v1/auth/sign_in", {
      email: email.value,
      password: password.value,
    })
    .then((response) => {
      localStorage.setItem("access-token", response.headers["access-token"]);
      localStorage.setItem("client", response.headers["client"]);
      localStorage.setItem("uid", response.headers["uid"]);
      alert("ログインしました。");
      router.push({ path: "/" });
    })
    .catch(() => {
      alert("ログインに失敗しました。メールアドレスまたはパスワードを確認してください。");
    });
};
</script>

<style scoped>
.register-page {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  min-height: 100vh;
  background-color: #ffffff;
  padding: 20px;
  box-sizing: border-box;
}

.large-card {
  width: 100%;
  max-width: 800px;
  padding: 30px;
  border-radius: 12px;
}

h1 {
  font-size: 2.2rem;
  color: #333;
  margin-top: 0;
  margin-bottom: 24px;
}

.v-btn {
  text-transform: none;
  font-size: 1.2rem;
  padding: 12px;
}
</style>

