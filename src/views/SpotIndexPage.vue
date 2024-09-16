<template>
  <div width="1200px">
    <v-text-field
      :label="'スポット検索'"
      v-model="q.name_cont"
      @input="searchSpots"
      hint="スポット名を入力してください"
      persistent-hint
      variant="outlined"
      density="compact"
    />
    <v-select
      :label="'都道府県検索'"
      class="mt-2"
      v-model="q.prefecture_id_eq"
      hint="都道府県を選択してください"
      persistent-hint
      variant="outlined"
      density="compact"
      item-title="name"
      item-value="id"
      :items="prefectures"
      @update:modelValue="searchSpots"
    />

    <v-row justify="center" class="mt-4">
      <v-card
        v-for="(spot, index) in spots"
        :key="index"
        elevation="16"
        min-width="200"
        width="300px"
        height="auto"
        class="my-2 mr-2"
        @click="router.push({ name: 'spot_show', params: { id: spot.id } })"
      >
        <v-card-item>
          <v-card-title class="mt-2 mb-4 text-body-3"> 投稿一覧</v-card-title>
          <v-text-field
            :label="'タイトル'"
            v-model="spot.name"
            variant="outlined"
            density="compact"
            readonly
          />
          <v-textarea
            :label="'説明'"
            readonly
            v-model="spot.body"
            variant="outlined"
            density="compact"
          />
          <v-select
            :label="'都道府県'"
            v-model="spot.prefecture_id"
            variant="outlined"
            density="compact"
            item-title="name"
            item-value="id"
            :items="prefectures"
            readonly
          />
          <v-text-field
            v-model="spot.city"
            :label="'市町村・番地'"
            variant="outlined"
            density="compact"
            readonly
          />
          <!-- <label for="spot-tags">タグ</label> -->
          <!-- <input type="text" id="spot-tags" placeholder="タグを入力 (カンマ区切り)" /> -->
        </v-card-item>
      </v-card>
      <PaginationModule :pagination="pagination" @get-page="getPage($event)" />
    </v-row>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from '../plugins/axios'
import Qs from 'qs'
import PaginationModule from './PaginationModule.vue'

onMounted(() => {
  fetchSpots(1)
})

const spots = ref([])
const prefectures = ref([])
const q = ref({
  name_cont: null,
  prefecture_id_eq: null
})
const pagination = ref({
  count: null,
  current: 1,
  limit_value: null,
  next: null,
  pages: null,
  previous: null
})

const getPage = (page) => {
  fetchSpots(page)
}

const fetchSpots = (page) => {
  const token = localStorage.getItem('access-token')
  const client = localStorage.getItem('client')
  const uid = localStorage.getItem('uid')
  const headers = {
    'access-token': token,
    uid: uid,
    client: client
  }
  const params = {
    page: page
  }
  axios
    .get('api/v1/spots', { params, headers })
    .then((res) => {
      spots.value = res.data.spots
      pagination.value = res.data.pagination
      prefectures.value = res.data.prefectures
    })
    .catch((error) => {
      console.error(error)
    })
}

const searchSpots = () => {
  const token = localStorage.getItem('access-token')
  const client = localStorage.getItem('client')
  const uid = localStorage.getItem('uid')
  const headers = {
    'access-token': token,
    uid: uid,
    client: client
  }
  const params = {
    q: q.value
  }

  axios
    .get('api/v1/search_spots', {
      params,
      headers,
      headers,
      paramsSerializer: function (params) {
        return Qs.stringify(params)
      }
    })
    .then((res) => {
      spots.value = res.data.spots
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>

<script></script>
