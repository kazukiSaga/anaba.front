<template>
  <v-card class="pa-2" elevation="16" min-width="800" width="100%" height="600px">
    <v-card-title class="mt-2 mb-4 text-body-3"> 投稿詳細</v-card-title>
    <v-row justify="end" class="mr-3">
      <v-btn color="orange" @click="redirectSpotEdit">編集</v-btn>
    </v-row>
    <div>
      平均おすすめ度：{{ spot.average_rating }}
      <br />
      平均混雑度：{{ spot.average_quiet_rating }}
    </div>

    <v-card-item>
      <div>スポット名：{{ spot.name }}</div>
      <div>説明：{{ spot.body }}</div>
      <div>都道府県：{{ spot.prefecture.name }}</div>
      <div>市町村・番地{{ spot.city }}</div>
      <br />
      <div>おすすめ度: {{ assessment.rating }}</div>
      <div>混雑の少なさ: {{ assessment.quiet_rating }}</div>
    </v-card-item>

    <v-row class="mt-4" no-gutters justify="center">
      <v-col cols="12">
        <v-select
          :label="'おすすめ度'"
          v-model="assessment.rating"
          variant="outlined"
          density="compact"
          item-title="name"
          item-value="id"
          :items="ratings"
        />
      </v-col>
      <v-col cols="12">
        <v-select
          :label="'混雑の少なさ'"
          v-model="assessment.quiet_rating"
          variant="outlined"
          density="compact"
          item-title="name"
          item-value="id"
          :items="ratings"
        />
      </v-col>

      <v-btn color="orange" @click="createAssessment">送信</v-btn>
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
const ratings = ref([1, 2, 3, 4, 5])

const spot = ref({
  name: null,
  body: null,
  city: null,
  prefecture: {
    name: null
  }
})
const assessment = ref({
  rating: null,
  quiet_rating: null
})

const createAssessment = () => {
  const token = localStorage.getItem('access-token')
  const client = localStorage.getItem('client')
  const uid = localStorage.getItem('uid')
  const headers = {
    'access-token': token,
    uid: uid,
    client: client
  }

  const params = {
    rating: assessment.value.rating,
    quiet_rating: assessment.value.quiet_rating
  }

  axios
    .post(`api/v1/spots/${spot.value.id}/assessments`, params, {
      headers
    })
    .then((res) => {
      assessment.value.rating = null
      assessment.value.quiet_rating = null
      spot.value = res.data.spot
      alert('評価しました。')
    })
    .catch((error) => {
      console.error(error)
    })
}

const redirectSpotEdit = () => {
  console.log(route)
  router.push({ name: 'spot_edit', params: { id: route.params.id } })
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

  const id = route.params.id
  axios
    .get(`api/v1/spots/${id}`, { headers })
    .then((res) => {
      spot.value = res.data.spot
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>

<script></script>
