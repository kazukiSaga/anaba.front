<!-- template 見た目定義 -->
<template>
  <div>
    <div class="full-background">
      <div class="content-background">
        <div class="toppage">
          <div class="text-container" style="margin-right: 50px">
            <h1><span class="big-A">A</span>naba</h1>
            <ul>
              <li>
                <router-link to="/spots">穴場スポット一覧</router-link>
              </li>
              <li>
                <router-link to="/map">穴場スポットMAP</router-link>
              </li>
            </ul>
          </div>
          <div class="logo" style="margin-left: 50px">
            <img src="@/assets/camera8.svg" alt="Logo" class="logo-image" />
          </div>
        </div>
      </div>
    </div>
    <div class="map-container">
      <GoogleMap
        class="google-map"
        :api-key="apiKey"
        map-id="7eee96cd28abb9a0"
        style="width: 100%; height: 800px"
        :center="center"
        :zoom="9"
      >
        <Marker :options="{ position: center }" />
        <!-- 将来、AdvancedMarkerElementに移行する場合は、下記を上記に入れる -->
        <!-- <AdvancedMarker :options="markerOptions" :pin-options="pinOptions" /> -->
        <Marker
          v-for="spot in spots"
          :key="spot.id"
          :options="markerOptions(spot)"
          @mouseover="openInfoWindow(spot.id)"
          @mouseout="hideInfoWindow"
        >
          <InfoWindow v-model="isInfoWindowVisible" v-if="infoWindowid === spot.id">
            <div>
              <strong>{{ spot.name }}</strong> - おすすめ度: {{ spot.rating }}
              <br />
              <router-link :to="'/spot/' + spot.id">詳細を見る</router-link>
            </div>
          </InfoWindow>
        </Marker>

        <!-- <Marker :options="markerOptions" @mouseover="showInfoWindow = true" @mouseout="showInfoWindow = false">
          <InfoWindow v-model="showInfoWindow">
            <div>
              <strong>{{ spot.name }}</strong> - 評価: {{ spot.rating }}
              <br />
              スポット詳細リンク  <router-link :to="'/spot/' + spot.id">詳細を見る</router-link> 
            </div>
          </InfoWindow>
        </Marker> -->
      </GoogleMap>
    </div>
  </div>
</template>

<script setup>
// script ロジック、動き、データ定義
import { ref } from 'vue'
// 将来、AdvancedMarkerへ移行する場合はMarkerをAdvancedMarkerへ置き換えてインポートする
import { GoogleMap, Marker, InfoWindow } from 'vue3-google-map'

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const center = { lat: 35.65856, lng: 139.745461 }

const spots = ref([
  { id: 1, name: '東京タワー', rating: 4.5, lat: 35.65856, lng: 139.745461 },
  { id: 2, name: 'スカイツリー', rating: 4.8, lat: 35.710063, lng: 139.8107 }
])


//ポップアップ表示非表示のフラグ
const isInfoWindowVisible = ref(false)
const infoWindowid = ref(null)

const markerOptions = (spot) => ({
  position: { lat: spot.lat, lng: spot.lng },
  title: spot.name
  // clickable: false
})

const openInfoWindow = (id) => {
  infoWindowid.value = id
  isInfoWindowVisible.value = true
}

const hideInfoWindow = () => {
  infoWindowid.value = null
  isInfoWindowVisible.value = false
}

// 現時点ではAdvancedMarkerのpinOptionsは必要ないが、将来の移行のため保持
// const pinOptions = { background: '#FBBC04' }
</script>

<style scoped>
/* デザイン定義 色や大きさ */

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');

/* 背景は白のまま */
.full-background {
  background-color: white;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: flex-start;
  padding-top: 250px;
}

.toppage {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
}

.text-container {
  display: flex;
  flex-direction: column;
  margin-left: 50px;
}

.text-container h1 {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 150px;
  text-align: left;
  margin: 0;
  color: orange;
  display: flex;
  align-items: flex-end;
}

.text-container h1 .big-A {
  font-size: 220px;
  line-height: 1;
  transform: translateY(-34px);
}

.text-container ul {
  list-style: none;
  padding: 0;
  margin-top: 5px;
  margin-left: 80px;
}

.text-container ul li {
  color: black;
  margin: 0 0;
  font-size: 50px;
}

.text-container ul li a {
  color: black;
  text-decoration: none;
}

.logo-image {
  width: 400px;
  height: auto;
}

.map-container {
  width: 100%; /* 横幅を全体に広げる */
  justify-content: center;
}
.google-map {
  margin-top: 5px;
  margin-bottom: 100px;
  width: 100%;
  max-width: 1200px;
}
</style>
