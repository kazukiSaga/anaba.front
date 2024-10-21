<template>
  <div>
    <h1>コメント詳細</h1>
    <v-card elevation="16" min-width="800" width="100%" height="600px">
      <v-card-item style="background-color: yellow">
        <v-row no-gutters justify="end">
          <div class="mr-3">おすすめ度: {{ spot.average_rating }}</div>
          <div>混雑の少なさ: {{ spot.average_quiet_rating }}</div>
        </v-row>

        <div class="text-body-1 mt-2">タグ:</div>
        <div class="text-body-1">スポット名：{{ spot.name }}</div>
        <div class="text-body-1">都道府県：{{ spot.prefecture.name }}</div>
      </v-card-item>

      <div class="pa-2" style="border: 1px solid black">
        <p>{{ comment.user.name }}</p>
        <p>{{ comment.title }}</p>
      </div>
      <div class="pa-2" style="border: 1px solid black">
        <p>{{ comment.body }}</p>
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '../plugins/axios'

const route = useRoute()
const spot = ref({ name: null, prefecture: {} })
const comment = ref({ title: null, body: null, image: null, user: { name: null } })

onMounted(() => {
  fetchSpot()
  fetchComment()
})
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

const fetchComment = () => {
  const token = localStorage.getItem('access-token')
  const client = localStorage.getItem('client')
  const uid = localStorage.getItem('uid')
  const headers = {
    'access-token': token,
    uid: uid,
    client: client
  }

  const spot_id = route.params.id
  const comment_id = route.params.comment_id
  axios
    .get(`api/v1/spots/${spot_id}/comments/${comment_id}`, { headers })
    .then((res) => {
      console.log(res.data)
      comment.value = res.data.comment
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>
