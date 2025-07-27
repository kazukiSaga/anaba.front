<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-card elevation="16" class="pa-4 custom-card">

          <v-card-title class="text-h5 text-center">マイページ</v-card-title>
          <v-divider class="mb-4"></v-divider>
          <v-alert v-if="isGuest" type="info" class="mb-4">
            ゲストユーザーです。本登録すると情報を編集できます。
          </v-alert>
          
          <v-form>
            <v-text-field
              label="ニックネーム"
              v-model="user.name"
              :outlined="!isGuest"
              :dense="true"
              :readonly="isGuest"
              :variant="isGuest ? 'plain' : undefined"
              class="mb-4"
            ></v-text-field>

            <div class="button-wrapper">
              <v-btn
                v-if="!isGuest"
                color="orange"
                class="post-btn"
                @click="updateUsername"
              >
                更新する
              </v-btn>
            </div>
          </v-form>

          <v-alert
            v-if="updateMessage"
            type="success"
            dense
            text
            class="mt-4"
          >
            {{ updateMessage }}
          </v-alert>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "../plugins/axios";
import { useUserStore } from '@/stores/index'
import { useRouter } from 'vue-router'

const user = ref({ name: "" });
const updateMessage = ref("");
const userStore = useUserStore()
const router = useRouter()

const loggedIn = computed(() => {
  return Object.keys(userStore.getUser).length !== 0
})

const isGuest = computed(() => {
  const user = userStore.getUser
  return user.email === 'guest@example.com'
})

onMounted(async () => {
    const token = localStorage.getItem('access-token')

    if (!token) {
      router.push('/login')
      return
    }

    try {
      await fetchUserName()

      if (!loggedIn.value) {
        router.push('/login')
      }
    } catch (error) {
      router.push('/login')
    }
  });

const fetchUserName = async () => {
  return axios
    .get("/api/v1/auth/validate_token", {
      headers: {
        "access-token": localStorage.getItem("access-token"),
        client: localStorage.getItem("client"),
        uid: localStorage.getItem("uid"),
      },
    })
    .then((response) => {
      user.value.name = response.data.data.name;
      userStore.setUser(response.data.data);
      const userId = response.data.data.id;
      if (userId) localStorage.setItem("user_id", userId);
    })
    .catch(() => {
      alert("ユーザー情報の取得に失敗しました");
    });
};

const updateUsername = () => {
  const userId = localStorage.getItem("user_id");
  axios
    .patch(
      `/api/v1/users/${userId}`,
      { name: user.value.name },
      {
        headers: {
          "access-token": localStorage.getItem("access-token"),
          client: localStorage.getItem("client"),
          uid: localStorage.getItem("uid"),
        },
      }
    )
    .then(() => {
      updateMessage.value = "ニックネームが更新されました！";
    })
    .catch(() => {
      updateMessage.value = "更新に失敗しました。もう一度お試しください。";
    });
};
</script>

<style scoped>
.custom-card {
  max-width: 100%;
  width: 100%;
}

.post-btn {
  font-size: 1rem;
  padding: 8px 16px;
  background-color: orange;
  color: white;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  width: auto;
}

.post-btn:hover {
  background-color: darkorange;
}

.button-wrapper {
  text-align: center;
  margin-top: 16px;
}

@media (min-width: 820px) and (max-width: 1180px) and (orientation: portrait) {
  .custom-card {
    max-width: 700px;
    margin: 0;
  }
}

@media (min-width: 1024px) and (max-width: 1366px) {
  .custom-card {
    max-width: 800px;
  }
}
</style>
