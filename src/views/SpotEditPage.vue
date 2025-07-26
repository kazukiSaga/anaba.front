<template>
  <v-card elevation="16" max-width="800px" width="100%" class="custom-card">
    <template v-if="errors.length">
      <v-alert
        density="compact"
        :text="errors.join(', ')"
        name="入力に誤りがあります"
        type="warning"
        class="mb-4"
      ></v-alert>
    </template>
    <v-card-item>
      <v-card-title class="mt-2 mb-4 text-body-3">投稿編集</v-card-title>

      <v-text-field
        label="タイトル"
        v-model="spot.name"
        variant="outlined"
        density="compact"
        class="mb-4"
      />

      <v-textarea
        label="説明"
        v-model="spot.body"
        variant="outlined"
        density="compact"
        class="mb-4"
      />

      <div class="text-body-1 mb-2">
        <strong>タグ:</strong>
        <v-chip
          v-for="(tag, tagIndex) in spot.tags"
          :key="tagIndex"
          class="ma-1"
          color="primary"
          text-color="white"
          @click="removeTag(tag)"
          style="position: relative"
        >
          {{ tag.name }}
          <img src="@/assets/closeicon.svg" alt="削除" class="tag-delete-icon" />
        </v-chip>
      </div>

      <v-combobox
        label="タグを選択もしくは新規登録"
        v-model="combo"
        :items="tags.map((tag) => tag.name)"
        variant="outlined"
        density="compact"
        multiple
        class="mb-4"
        @update:modelValue="updateTags"
      ></v-combobox>

      <v-select
        label="都道府県"
        v-model="spot.prefecture_id"
        :items="prefectures"
        item-title="name"
        item-value="id"
        variant="outlined"
        density="compact"
        class="mb-4"
      />

      <v-text-field
        v-model="spot.city"
        label="市町村・番地"
        variant="outlined"
        density="compact"
        class="mb-4"
      />
    </v-card-item>

    <v-row class="mt-4 mb-4" no-gutters justify="center">
      <v-btn color="orange" class="update-button" @click="updateSpot">更新する</v-btn>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'
import { useUserStore } from '@/stores/index'
import { useRoute, useRouter } from 'vue-router'
import axios from '../plugins/axios'

const userStore = useUserStore()
const route = useRoute()
const router = useRouter()

const tags = ref([])
const prefectures = ref([])
const errors = ref([])
const combo = ref([])

const latitude = ref(null)
const longitude = ref(null)
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const spot = ref({
  name: null,
  body: null,
  prefecture_id: null,
  city: null,
  tags: []
})

const loggedIn = computed(() => {
  return Object.keys(userStore.getUser).length !== 0
})

const updateTags = (newTags) => {
  spot.value.tags = newTags.map((tagName) => {
    const existingTag = tags.value.find((tag) => tag.name === tagName)
    if (existingTag) {
      return existingTag
    }
    return { id: null, name: tagName }
  })
}

const removeTag = (tag) => {
  spot.value.tags = spot.value.tags.filter((t) => t.name !== tag.name)
  combo.value = spot.value.tags.map((t) => t.name)
}

const geocodeAddress = (address, callback) => {
  const geocoder = new window.google.maps.Geocoder()
  geocoder.geocode({ address }, (results, status) => {
    if (status === 'OK') {
      latitude.value = results[0].geometry.location.lat()
      longitude.value = results[0].geometry.location.lng()
      callback()
    } else {
      errors.value = ['住所の変換に失敗しました']
    }
  })
}

onMounted(() => {
  if (!loggedIn.value) {
    router.push('/login')
    return
  }
  fetchSpot()
  new Loader({
    apiKey,
    version: 'Release',
    libraries: ['places', 'drawing', 'geometry', 'visualization'],
    language: 'ja'
  })
    .load()
    .then((google) => {
      window.google = google
    })
    .catch(() => {
      alert('ページの読み込みに失敗しました。ページを再読み込みしてください。')
    })
})

const fetchSpot = () => {
  const token = localStorage.getItem('access-token')
  const client = localStorage.getItem('client')
  const uid = localStorage.getItem('uid')
  const headers = {
    'access-token': token,
    client: client,
    uid: uid
  }

  const id = route.params.id
  axios
    .get(`api/v1/spots/${id}/edit`, { headers })
    .then((res) => {
      spot.value = res.data.spot
      prefectures.value = res.data.prefectures
      tags.value = res.data.tags
      combo.value = spot.value.tags.map((tag) => tag.name)
    })
    .catch(() => {
      alert('スポット情報の取得に失敗しました。もう一度お試しください。')
    })
}

const updateSpot = () => {
  const token = localStorage.getItem('access-token')
  const client = localStorage.getItem('client')
  const uid = localStorage.getItem('uid')
  const headers = {
    'access-token': token,
    client: client,
    uid: uid
  }

  const selectedPrefecture = prefectures.value.find(
    (prefecture) => prefecture.id === spot.value.prefecture_id
  )
  const address = `${selectedPrefecture?.name || ''} ${spot.value.city}`

  geocodeAddress(address, () => {
    const params = {
      name: spot.value.name,
      body: spot.value.body,
      prefecture_id: spot.value.prefecture_id,
      city: spot.value.city,
      latitude: latitude.value,
      longitude: longitude.value,
      tags: spot.value.tags.map((tag) => tag.name)
    }

    const id = route.params.id

    axios
      .put(`/api/v1/spots/${id}`, params, { headers })
      .then(() => {
        alert('更新しました。')
        router.push(`/spots/${id}`)
      })
      .catch((error) => {
        if (error.response.data.errors) {
          errors.value = error.response.data.errors
        } else {
          alert('更新に失敗しました。もう一度お試しください。')
        }
      })
  })
}
</script>

<style scoped>
.custom-card {
  margin: 16px auto;
}

.update-button {
  margin-bottom: 16px;
}

.tag-delete-icon {
  margin-left: 8px;
  width: 16px;
  height: 16px;
  cursor: pointer;
  vertical-align: middle;
}
</style>
