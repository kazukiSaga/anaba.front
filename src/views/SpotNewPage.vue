<template>
  <div>
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
        <v-card-title class="mt-2 mb-4 text-body-3"> スポット投稿</v-card-title>
        <v-text-field :label="'タイトル'" v-model="name" variant="outlined" density="compact" />
        <v-textarea :label="'説明'" v-model="body" variant="outlined" density="compact" />
        <v-select
          :label="'都道府県'"
          v-model="prefecture_id"
          variant="outlined"
          density="compact"
          item-title="name"
          item-value="id"
          :items="prefectures"
        />
        <v-text-field v-model="city" :label="'市町村・番地'" variant="outlined" density="compact" />
        <!-- <label for="spot-tags">タグ</label> -->
        <!-- <input type="text" id="spot-tags" placeholder="タグを入力 (カンマ区切り)" /> -->
      </v-card-item>

      <v-row class="mt-4" no-gutters justify="center">
        <v-btn color="orange" @click="post">投稿する</v-btn>
      </v-row>
    </v-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from '../plugins/axios'
import { errorMessages } from 'vue/compiler-sfc'
import { useRoute, useRouter } from 'vue-router'

onMounted(() => {
  fetchSpot()
})

const prefectures = ref([])
const errors = ref([])
const name = ref(null)
const body = ref(null)
const prefecture_id = ref(null)
const city = ref(null)
const router = useRouter()

const fetchSpot = () => {
  const token = localStorage.getItem('access-token')
  const client = localStorage.getItem('client')
  const uid = localStorage.getItem('uid')
  const headers = {
    'access-token': token,
    uid: uid,
    client: client
  }
  axios
    .get('/api/v1/spots/new', { headers })
    .then((res) => {
      console.log(res)
      prefectures.value = res.data.prefectures
      errors.value = []
    })
    .catch((error) => {
      console.error(error)
    })
}

const post = () => {
  const token = localStorage.getItem('access-token')
  const client = localStorage.getItem('client')
  const uid = localStorage.getItem('uid')
  const headers = {
    'access-token': token,
    uid: uid,
    client: client
  }

  const params = {
    name: name.value,
    body: body.value,
    prefecture_id: prefecture_id.value,
    city: city.value
  }
  axios
    .post('/api/v1/spots', params, { headers })
    .then((res) => {
      console.log(res)
      alert('投稿しました。')
      router.push({ name: 'spot_show', params: { id: res.data.spot.id } })
    })
    .catch((error) => {
      console.error(error)
      errors.value = error.response.data.errors
    })
}
</script>

<style scoped></style>
