<template>
  <div>
    <h1>コメント投稿</h1>
    <v-card class="pa-2" elevation="16" min-width="800" width="100%" height="600px">
      <v-card-item style="background-color: yellow">
        <v-row no-gutters justify="end">
          <div class="mr-3">おすすめ度: {{ spot.average_rating }}</div>
          <div>混雑の少なさ: {{ spot.average_quiet_rating }}</div>
        </v-row>

        <div class="text-body-1 mt-2">
          タグ:
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
      </v-card-item>
      <div class="mt-2">
        <v-text-field
          :label="'タイトル'"
          v-model="comment.title"
          variant="outlined"
          density="compact"
        />
        <v-text-field
          :label="'コメント'"
          v-model="comment.body"
          variant="outlined"
          density="compact"
        />
        <input type="file" multiple @change="setImage" />
      </div>
      <v-row no-gutters class="mt-4" justify="center">
        <v-btn color="orange" @click="createComment">投稿</v-btn>
      </v-row>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '../plugins/axios'

const route = useRoute()
const router = useRouter()
const spot = ref({ name: null, prefecture: {} })
const comment = ref({ title: null, body: null })
const images = ref([])

onMounted(() => {
  fetchSpot()
})

const setImage = (e) => {
  images.value = e.target.files
}

const createComment = () => {
  const spot_id = route.params.id

  const token = localStorage.getItem('access-token')
  const client = localStorage.getItem('client')
  const uid = localStorage.getItem('uid')
  const headers = {
    'access-token': token,
    uid: uid,
    client: client
  }

  const formData = new FormData()
  // formData.append('comment[images][]', comment.value.images

  // console.log(images.value)
  Array.from(images.value).forEach((image) => {
    formData.append(
      'comment[images][]',
      new Blob([image], {
        type: image.type
      }),
      image.name
    )
  })

  // images.value.forEach((image) => {
  //   formData.append(
  //     'comment[images]' + '[]',
  //     new Blob([image], {
  //       type: image.type
  //     }),
  //     image.name
  //   )
  // })
  formData.append('comment[title]', comment.value.title)
  formData.append('comment[body]', comment.value.body)
  axios
    .post(`api/v1/spots/${spot_id}/comments`, formData, { headers })
    .then((res) => {
      alert('コメントを作成しました。')

      console.log(res.data)
      router.push({
        name: 'comment_show',
        params: { id: res.data.spot_id, comment_id: res.data.comment_id }
      })
    })
    .catch((error) => {
      console.error(error)
    })
}

const fetchSpot = () => {
  const token = localStorage.getItem('access-token')
  const client = localStorage.getItem('client')
  const uid = localStorage.getItem('uid')
  const headers = {
    'access-token': token,
    uid: uid,
    client: client
  }

  const spot_id = route.params.id
  axios
    .get(`api/v1/spots/${spot_id}/comments/new`, { headers })
    .then((res) => {
      spot.value = res.data.spot
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>
