<template>
  <v-container>
    <h1 class="page-title">コメント投稿</h1>
    <v-card class="custom-card pa-4" elevation="16">
      <v-card-item class="spot-info">
        <v-row justify="space-between" align="center">
          <v-col cols="12" md="8">
            <div class="text-body-1 mb-2">
              <strong>タグ:</strong>
              <v-chip
                v-for="(tag, tagIndex) in spot.tags"
                :key="tagIndex"
                class="ma-1"
                color="primary"
                text-color="white"
              >
                {{ tag.name }}
              </v-chip>
            </div>
            <div class="text-body-1">スポット名：{{ spot.name }}</div>
            <div class="text-body-1">都道府県：{{ spot.prefecture.name }}</div>
          </v-col>
          <v-col cols="12" md="4" class="text-right">
            <div class="text-body-1">おすすめ度: {{ spot.average_rating }}</div>
            <div class="text-body-1">混雑の少なさ: {{ spot.average_quiet_rating }}</div>
          </v-col>
        </v-row>
      </v-card-item>

      <v-row class="form-section">
        <v-col cols="12">
          <v-text-field
            label="タイトル"
            v-model="comment.title"
            outlined
            dense
            class="form-field"
          />
          <p v-if="errors.title" class="error-text">
            {{ errors.title }}
          </p>
        </v-col>
        <v-col cols="12">
          <v-textarea
            label="コメント"
            v-model="comment.body"
            outlined
            dense
            rows="4"
            class="form-field"
          />
          <p v-if="errors.body" class="error-text">
            {{ errors.body }}
          </p>
        </v-col>
      </v-row>

      <v-row class="form-section">
        <v-col cols="12">
          <label class="file-label">
            <div class="file-box">
              ファイル選択Ï
              <input type="file" multiple @change="setImage" class="file-input" />
            </div>
            対応形式: JPG / JPEG / GIF / PNG のみ
          </label>
          <p class="file-status mt-2">
            {{ selectedFilesMessage }}
          </p>
          <p v-show="fileError" class="error-text">{{ fileError }}</p>
        </v-col>
      </v-row>

      <v-row justify="center" class="form-section">
        <v-btn color="orange" large @click="createComment" :disabled="isLoading">
          投稿
          <v-progress-circular
            v-if="isLoading"
            indeterminate
            color="white"
            size="20"
            class="ml-2"
          />
        </v-btn>
      </v-row>
      <v-row justify="center" align="center" v-if="isLoading" class="loading-overlay">
        <v-progress-circular indeterminate color="orange" size="50" />
        <p class="loading-text">投稿中です。しばらくお待ちください...</p>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import { useUserStore } from '@/stores/index'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '../plugins/axios'

const route = useRoute()
const router = useRouter()
const spot = ref({ name: 'null', prefecture: {}, tags: [] })
const comment = ref({ title: '', body: '' })
const images = ref([])
const fileError = ref(null)
const isLoading = ref(false)
const errors = ref({ title: null, body: null })

const userStore = useUserStore()

const loggedIn = computed(() => {
  return Object.keys(userStore.getUser).length !== 0
})

onMounted(async () => {
  const token = localStorage.getItem('access-token')

  if (!token) {
    router.push('/login')
    return
  }

  try {
    await fetchSpot()

    if (!loggedIn.value) {
      router.push('/login')
    }
  } catch (error) {
    router.push('/login')
  }
})

const setImage = (e) => {
  fileError.value = null
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
  const files = Array.from(e.target.files)

  if (files.some((file) => !allowedTypes.includes(file.type))) {
    fileError.value = 'JPG/JPEG/GIF/PNG以外の画像が選択されています'
    images.value = []
    return
  }

  images.value = files
}

const selectedFilesMessage = computed(() => {
  if (images.value.length === 0) {
    return '選択されていません'
  }
  return images.value.map((file) => file.name).join(', ')
})

const createComment = () => {
  isLoading.value = true
  const spot_id = route.params.id

  const token = localStorage.getItem('access-token')
  const client = localStorage.getItem('client')
  const uid = localStorage.getItem('uid')
  const headers = {
    'Content-Type': 'multipart/form-data',
    'access-token': token,
    uid: uid,
    client: client
  }
  const formData = new FormData()
  images.value.forEach((image) => {
    formData.append('comment[images][]', new Blob([image], { type: image.type }), image.name)
  })
  formData.append('comment[title]', comment.value.title)
  formData.append('comment[body]', comment.value.body)

  axios
    .post(`api/v1/spots/${spot_id}/comments`, formData, { headers })
    .then((res) => {
      isLoading.value = false

      errors.value = { title: null, body: null }
      router.push({
        name: 'comment_show',
        params: { id: res.data.spot_id, comment_id: res.data.comment_id }
      })
    })
    .catch((error) => {
      console.error('エラー:', error)
      if (error.response && error.response.data.errors) {
        console.log('バリデーションエラー:', error.response.data.errors)

        const errorMessages = error.response.data.errors
        errors.value = {
          title: errorMessages.title ? errorMessages.title.join('\n') : null,
          body: errorMessages.body ? errorMessages.body.join('\n') : null
        }
      } else {
        alert('コメントの作成に失敗しました。もう一度お試しください。')
      }
      isLoading.value = false
    })
}

const fetchSpot = async () => {
  const token = localStorage.getItem('access-token')
  const client = localStorage.getItem('client')
  const uid = localStorage.getItem('uid')
  const headers = {
    'access-token': token,
    uid: uid,
    client: client
  }

  const spot_id = route.params.id
  return axios
    .get(`api/v1/spots/${spot_id}/comments/new`, { headers })
    .then((res) => {
      spot.value = res.data.spot
      userStore.setUser(res.data.user || { id: 1, name: 'ユーザー' });
    })
    .catch(() => {
      alert('スポット情報の取得に失敗しました。もう一度お試しください。')
    })
}
</script>

<style scoped>
.custom-card {
  width: 100%;
  max-width: 900px;
  margin: 0 auto !important;
}

.spot-info {
  background-color: yellow !important;
  margin-bottom: 8px !important;
  padding: 8px !important;
}

.form-section {
  margin-bottom: 8px !important;
}

.form-field {
  margin-bottom: 8px !important;
}

.file-box {
  border: 1px solid #ccc !important;
  padding: 8px 12px !important;
  border-radius: 4px !important;
  cursor: pointer !important;
  background-color: #f9f9f9 !important;
  display: inline-block !important;
}

.file-box:hover {
  background-color: #eaeaea !important;
}

.file-input {
  display: none !important;
}

.file-status {
  margin-top: 8px !important;
  font-size: 14px !important;
  color: #888 !important;
}

.page-title {
  text-align: center !important;
  margin-bottom: 16px !important;
  font-size: 1.5rem !important;
  font-weight: bold !important;
}
.error-text {
  color: red;
  font-size: 14px;
  margin-top: 4px;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  z-index: 999;
}

.loading-text {
  margin-top: 16px;
  font-size: 16px;
  font-weight: bold;
  color: #ff9800;
}
</style>
