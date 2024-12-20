<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card class="custom-card pa-4" elevation="16">
          <v-card-item style="background-color: yellow">
            <v-row no-gutters justify="end">
              <div class="mr-3">おすすめ度: {{ spot.average_rating }}</div>
              <div>混雑の少なさ: {{ spot.average_quiet_rating }}</div>
            </v-row>
            <div class="text-body-1 mt-2">
              タグ:
              <v-chip
                v-for="(tag, index) in spot.tags"
                :key="index"
                class="ma-1"
                color="primary"
                text-color="white"
              >
                {{ tag.name }}
              </v-chip>
            </div>
            <div class="text-body-1">スポット名：{{ spot.name }}</div>
            <div class="text-body-1">都道府県：{{ spot.prefecture.name }}</div>
          </v-card-item>

          <div class="pa-2" style="border: 1px solid black">
            <p>投稿者:{{ comment.user.name }}</p>
          </div>
          <div class="pa-2" style="border: 1px solid black">
            <p>タイトル:{{ comment.title }}</p>
            <p>内容:{{ comment.body }}</p>
          </div>

          <div v-if="validImages.length > 0" class="text-center mb-3">
            <p class="click-to-enlarge-text">画像クリックで拡大</p>
          </div>

          <v-row class="mt-3" justify="start">
            <v-col v-for="(image, index) in validImages" :key="index" cols="12" sm="6" md="4">
              <div class="image-container">
                <v-img
                  :src="image.url"
                  class="clickable-image"
                  aspect-ratio="16/9"
                  cover
                  @click="openImage(image.url)"
                />
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="isDialogOpen" max-width="90%">
      <v-card class="dialog-card">
        <img
          src="@/assets/closeicon.svg"
          alt="閉じる"
          class="close-icon"
          @click="closeDialog"
        />
        <div class="rotate-controls">
          <v-btn text color="orange" @click="rotateLeft">左回転</v-btn>
          <v-btn text color="orange" @click="rotateRight">右回転</v-btn>
        </div>
        <div class="image-wrapper">
          <img
            :src="selectedImage"
            :style="{ transform: `rotate(${rotation}deg) scale(${scale})` }"
            class="dialog-image"
          />
        </div>
        <div class="zoom-controls">
          <v-btn text color="orange" @click="zoomIn">拡大</v-btn>
          <v-btn text color="orange" @click="zoomOut">縮小</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from '../plugins/axios'

const route = useRoute()
const spot = ref({ name: null, prefecture: {}, tags: [] })
const comment = ref({ title: null, body: null, images: [], user: { name: null } })

const isDialogOpen = ref(false)
const selectedImage = ref('')
const rotation = ref(0)
const scale = ref(1)
const validImages = ref([])

const openImage = (url) => {
  selectedImage.value = url
  isDialogOpen.value = true
  rotation.value = 0
  scale.value = 1
}

const closeDialog = () => {
  isDialogOpen.value = false
}

const rotateLeft = () => {
  rotation.value -= 90
}

const rotateRight = () => {
  rotation.value += 90
}

const zoomIn = () => {
  scale.value = Math.min(scale.value + 0.2, 3)
}

const zoomOut = () => {
  scale.value = Math.max(scale.value - 0.2, 0.5)
}

onMounted(() => {
  fetchSpot()
  fetchComment()
})

const fetchSpot = () => {
  const token = localStorage.getItem('access-token')
  const client = localStorage.getItem('client')
  const uid = localStorage.getItem('uid')
  const headers = { 'access-token': token, uid: uid, client: client }

  const spot_id = route.params.id
  axios
    .get(`api/v1/spots/${spot_id}/comments/new`, { headers })
    .then((res) => (spot.value = res.data.spot))
    .catch(() => {
      alert("スポット情報の取得に失敗しました。もう一度お試しください。");
    });
}

const fetchComment = () => {
  const token = localStorage.getItem('access-token')
  const client = localStorage.getItem('client')
  const uid = localStorage.getItem('uid')
  const headers = { 'access-token': token, uid: uid, client: client }

  const spot_id = route.params.id
  const comment_id = route.params.comment_id
  axios
    .get(`api/v1/spots/${spot_id}/comments/${comment_id}`, { headers })
    .then((res) => {
      comment.value = res.data.comment
    })
    .catch(() => {
      alert("スポット情報の取得に失敗しました。もう一度お試しください。");
    });
}
watch(
  () => comment.value.images,
  (newImages) => {
    validImages.value = []

    newImages.forEach((image) => {
      const img = new Image()
      img.src = image.url

      img.onload = () => {
        if (img.naturalWidth > 0) {
          validImages.value.push(image)
        }
      }
    })
  },
  { deep: true }
)
</script>

<style scoped>
.dialog-card {
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.dialog-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  transition: transform 0.3s ease-in-out;
}

.image-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
}

.rotate-controls {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 16px 0;
}

.clickable-image {
  cursor: pointer;
}
.zoom-controls {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 16px 0;
}

.rotate-controls v-btn,
.zoom-controls v-btn {
  font-size: 16px;
  padding: 14px 28px;
}

@media (min-width: 1024px) {
  .rotate-controls v-btn,
  .zoom-controls v-btn {
    font-size: 24px;
    padding: 20px 40px;
  }
}

.close-icon {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  cursor: pointer;
  z-index: 1000;
}

.close-icon:hover {
  opacity: 0.8;
}

.image-container {
  text-align: center;
  margin-bottom: 16px;
}

.click-to-enlarge-text {
  font-size: 16px;
  color: #888;
  margin-top: 8px;
}

@media (min-width: 1024px) {
  .click-to-enlarge-text {
    font-size: 20px;
  }
}
</style>
