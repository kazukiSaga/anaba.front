<template>
  <div>
    <h1>コメント一覧</h1>
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

      <div
        v-for="(comment, index) in spot.comments"
        :key="index"
        class="pa-2"
        style="border: 1px solid black"
      >
        <p>投稿者:{{ comment.user.name }}</p>
        <p>内容:{{ comment.body }}</p>
        <v-btn
          @click="
            router.push({ name: 'comment_show', params: { id: spot.id, comment_id: comment.id } })
          "
          >詳細ページへ</v-btn
        >
      </div>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '../plugins/axios'
import router from '@/router'

const route = useRoute()

const spot = ref({ name: null, prefecture: {} })

onMounted(() => {
  fetchComments()
})

const fetchComments = () => {
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
    .get(`api/v1/spots/${spot_id}/comments`, { headers })
    .then((res) => {
      console.log(res.data)
      spot.value = res.data.spot
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>
