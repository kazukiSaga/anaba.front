<template>
  <v-container fluid class="full-width-container">
    <v-row justify="center">
      <v-col cols="12" sm="12" md="8" lg="12">
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

          <v-row class="mt-3">
            <v-col v-for="(image, index) in validImages" :key="index" cols="12">
              <div class="image-wrapper">
                <v-img
                  :src="image.url"
                  class="clickable-image full-width-image"
                  aspect-ratio="16/9"
                  cover
                />
              </div>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import axios from '../plugins/axios'

const route = useRoute()
const spot = ref({ name: null, prefecture: {}, tags: [] })
const comment = ref({ title: null, body: null, images: [], user: { name: null } })

const validImages = ref([])

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
      alert('スポット情報の取得に失敗しました。もう一度お試しください。')
    })
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
      alert('スポット情報の取得に失敗しました。もう一度お試しください。')
    })
}
watch(
  () => comment.value.images,
  (newImages) => {
    validImages.value = []

    console.log(newImages)

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
.clickable-image {
  cursor: pointer;
}

.full-width-container {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.full-width-image {
  width: 100% !important;
  height: auto !important;
}

</style>
