<template>
  <v-card elevation="16" min-width="800" width="100%" height="600px">
    <template v-if="errors.length">
      <v-alert
        density="compact"
        :text="errors.join(', ')"
        name="入力に誤りがあります"
        type="warning"
      ></v-alert>
    </template>
    <v-card-item>
      <v-card-title class="mt-2 mb-4 text-body-3"> 投稿編集</v-card-title>
      <v-text-field :label="'タイトル'" v-model="spot.name" variant="outlined" density="compact" />
      <v-textarea :label="'説明'" v-model="spot.body" variant="outlined" density="compact" />
      <v-select
        :label="'都道府県'"
        v-model="spot.prefecture_id"
        variant="outlined"
        density="compact"
        item-title="name"
        item-value="id"
        :items="prefectures"
      />
      <v-text-field
        v-model="spot.city"
        :label="'市町村・番地'"
        variant="outlined"
        density="compact"
      />
      <!-- <label for="spot-tags">タグ</label> -->
      <!-- <input type="text" id="spot-tags" placeholder="タグを入力 (カンマ区切り)" /> -->
    </v-card-item>

    <v-row class="mt-4" no-gutters justify="center">
      <v-btn color="orange" @click="updateSpot">更新する</v-btn>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '../plugins/axios'

onMounted(() => {
  fetchSpot()
})

const route = useRoute()
const router = useRouter()
const prefectures = ref([])
const errors = ref([])

const spot = ref({
  name: null,
  body: null,
  prefecture_id: null,
  city: null
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

  const id = route.params.id
  axios
    .get(`api/v1/spots/${id}/edit`, { headers })
    .then((res) => {
      console.log(res)
      spot.value = res.data.spot
      prefectures.value = res.data.prefectures
    })
    .catch((error) => {
      console.error(error)
    })
}

const updateSpot = () => {
  const token = localStorage.getItem('access-token')
  const client = localStorage.getItem('client')
  const uid = localStorage.getItem('uid')
  const headers = {
    'access-token': token,
    uid: uid,
    client: client
  }

  const params = {
    name: spot.value.name,
    body: spot.value.body,
    prefecture_id: spot.value.prefecture_id,
    city: spot.value.city
  }
  const id = route.params.id

  axios
    .put(`/api/v1/spots/${id}`, params, { headers })
    .then((res) => {
      console.log(res)
      alert('更新しました。')
      router.push({ name: 'spot_index' })
    })
    .catch((error) => {
      console.error(error)
      if (error.response.data.errors) {
        errors.value = error.response.data.errors
      }
    })
}
</script>

<script></script>
