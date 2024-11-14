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
      <v-card-title class="mt-2 mb-4 text-body-3">投稿編集</v-card-title>
      <v-text-field :label="'タイトル'" v-model="spot.name" variant="outlined" density="compact" />
      <v-textarea :label="'説明'" v-model="spot.body" variant="outlined" density="compact" />

      <v-chip-group column>
        <div class="text-body-1 mt-2">
          タグ :
          <v-chip
            v-for="(tag, tagIndex) in spot.tags"
            :key="tagIndex"
            class="ma-1"
            color="primary"
            text-color="white"
            @click="removeTag(tag)"
          >
            {{ tag.name }} <v-icon small @click.stop="removeTag(tag)">mdi-close</v-icon>
          </v-chip>
        </div>
        <v-select
          v-model="selectedTag"
          :items="availableTags"
          item-title="title"
          item-value="value"
          label="タグを追加"
          @change="addTag"
          variant="outlined"
          density="compact"
        ></v-select>
      </v-chip-group>

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
const tags = ref([]) // 追加
const prefectures = ref([])
const errors = ref([])

const spot = ref({
  name: null,
  body: null,
  prefecture_id: null,
  city: null,
  tags: []
})

const selectedTag = ref(null)

const availableTags = computed(() => {
  return tags.value.map((tag) => ({
    title: tag.name,
    value: tag.id
  }))
})

const addTag = (tagId) => {
  const tag = tags.value.find((tag) => tag.id === tagId)
  if (tag) {
    spot.value.tags.push({ id: tag.id, name: tag.name })
  }
  selectedTag.value = null
}

const removeTag = (tag) => {
  spot.value.tags = spot.value.tags.filter((t) => t.id !== tag.id)
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
    .get(`api/v1/spots/${id}/edit`, { headers })
    .then((res) => {
      console.log('API Response:', res.data)
      spot.value = res.data.spot
      prefectures.value = res.data.prefectures
      tags.value = res.data.tags //追加
      console.log('Tags:', tags.value)
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
    tag_ids: spot.value.tags.map((tag) => tag.id),
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
