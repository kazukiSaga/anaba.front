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
        <!-- <label for="spot-tags">タグ</label> -->n
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
import { Loader } from '@googlemaps/js-api-loader'

// データの初期化
const prefectures = ref([])
const errors = ref([])
const name = ref(null)
const body = ref(null)
const prefecture_id = ref(null)
const city = ref(null)
const latitude = ref(null) // 緯度
const longitude = ref(null) // 経度
const router = useRouter()
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

onMounted(() => {
  fetchSpot() // 都道府県のデータを取得

  // Google Maps APIをロード
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
    .catch((e) => {
      console.error(e) // エラー発生時の処理
    })
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
  axios
    .get('/api/v1/spots/new', { headers })
    .then((res) => {
      console.log(res.data.prefectures)
      prefectures.value = res.data.prefectures
      errors.value = []
    })
    .catch((error) => {
      console.error(error)
    })
}

//住所から緯度経度を取得
const geocodeAddress = (address, callback) => {
  const geocoder = new window.google.maps.Geocoder()
  geocoder.geocode({ address }, (results, status) => {
    // コールバックでは、results と status のコードをこの順序で保持する 2 つのパラメータを渡す必要がある
    if (status === window.google.maps.GeocoderStatus.OK) {
      const location = results[0].geometry.location;

      latitude.value = location.lat();
      longitude.value = location.lng();

      console.log('緯度 (Latitude):', latitude.value);
      console.log('経度 (Longitude):', longitude.value);
      callback();
    } else {
      console.error('Geocoding failed: ' + status);
      errors.value = ['住所の変換に失敗しました。'] // エラー処理
    }
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
  //都道府県 市町村を結合
  const selectedPrefecture = prefectures.value.find(function (prefecture) {
    //prefectures.valueは都道府県の一覧データ //ユーザーが選択した都道府県と一致するものを探す
    return prefecture.id === prefecture_id.value
  })

  let address = '' // 住所

  if (selectedPrefecture) {
    address = selectedPrefecture.name // 都道府県をアドレスに入れる
  }

  address += city.value //市町村・番地を住所に追加

  geocodeAddress(address, () => {
    console.log('Latitude:', latitude.value);  
    console.log('Longitude:', longitude.value);

    const params = {
      name: name.value,
      body: body.value,
      prefecture_id: prefecture_id.value,
      city: city.value,
      latitude: latitude.value, // 緯度
      longitude: longitude.value // 経度
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
  })
}
</script>

<style scoped></style>
