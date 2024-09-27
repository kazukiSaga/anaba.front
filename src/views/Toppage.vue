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
        style="width: 100%; height: 800px"
        :center="center"
        :zoom="15"
      >
        <Marker :options="{ position: center }" />
      </GoogleMap>
    </div>
  </div>
</template>

<script setup>
// script ロジック、動き、データ定義

import { GoogleMap, Marker } from 'vue3-google-map'

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const center = { lat: 35.65856, lng: 139.745461 }
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
