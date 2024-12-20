<template>
  <v-container fluid>
    <v-row class="full-background" justify="center" align="center">
      <v-col cols="12" sm="6" md="6" class="text-container">
        <h1><span class="big-A">A</span>naba</h1>
        <ul>
          <li>
            <router-link to="/spots">穴場スポット一覧</router-link>
          </li>
        </ul>
      </v-col>
      <v-col cols="12" sm="6" md="6" class="logo">
        <img src="@/assets/camera8.svg" alt="Logo" class="logo-image" />
      </v-col>
    </v-row>

    <h2 class="app-description">
      Anabaは自分のお気に入りの穴場スポットを登録し、写真とコメントで他者と共有することができるアプリです。
    </h2>

    <v-row justify="center" class="map-container">
      <v-col cols="12" md="10" lg="8">
        <GoogleMap
          class="google-map"
          :api-key="apiKey"
          map-id="7eee96cd28abb9a0"
          style="width: 100%; height: 300px"
          :center="center"
          :zoom="9"
        >
          <Marker :options="{ position: center }" />
          <Marker
            v-for="spot in spots"
            :key="spot.id"
            :options="markerOptions(spot)"
            @mouseover="openInfoWindow(spot.id)"
          >
            <InfoWindow v-model="isInfoWindowVisible" v-if="infoWindowid === spot.id">
              <div>
                <strong>{{ spot.name }}</strong> - おすすめ度: {{ spot.average_rating }} -
                混雑の少なさ: {{ spot.average_quiet_rating }}
                <br />
                <router-link :to="{ name: 'spot_show', params: { id: spot.id } }"
                  >詳細を見る</router-link
                >
              </div>
            </InfoWindow>
          </Marker>
        </GoogleMap>
      </v-col>
    </v-row>

    <v-row justify="center" class="privaryterms">
      <v-col cols="auto">
        <router-link to="/terms_of_use" class="terms-link">利用規約</router-link>
      </v-col>
      <v-col cols="auto">
        <router-link to="/privacy_policy_page" class="terms-link">プライバシーポリシー</router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from '../plugins/axios';
import { useRouter } from 'vue-router';
import { GoogleMap, Marker, InfoWindow } from 'vue3-google-map';

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
console.log(apiKey);
const center = { lat: 35.65856, lng: 139.745461 };
const spots = ref([]);
const isInfoWindowVisible = ref(false);
const infoWindowid = ref(null);

const router = useRouter();

onMounted(() => {
  fetchSpots();
});

const fetchSpots = () => {
  axios
    .get('api/v1/marker_spots')
    .then((res) => {
      spots.value = res.data.spots;
    })
    .catch(() => {
      alert('スポット情報の取得に失敗しました。もう一度お試しください。');
    });
};

const markerOptions = (spot) => ({
  position: { lat: spot.latitude, lng: spot.longitude },
  title: spot.name,
});

const openInfoWindow = (id) => {
  infoWindowid.value = id;
  isInfoWindowVisible.value = true;
};
</script>

<style scoped>
.full-background {
  background-color: white;
  padding: 30px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.text-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 20px;
}

.text-container h1 {
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 3rem;
  color: orange;
  margin: 0;
}

.text-container h1 .big-A {
  font-size: 4.5rem;
}

.text-container ul {
  list-style: none;
  margin-top: 10px;
  padding: 0;
}

.text-container ul li {
  font-size: 1.5rem;
}

.text-container ul li a {
  text-decoration: none;
  color: black;
}

.text-container ul li a:hover {
  text-decoration: underline;
}

.logo {
  display: flex;
  justify-content: center;
}

.logo-image {
  width: 250px;
  max-width: 100%;
  height: auto;
}

.app-description {
  font-size: 1.5rem;
  line-height: 1.5;
  margin: 15px auto 30px;
  text-align: center;
  max-width: 800px;
}

.full-background {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  padding: 30px 20px;
}

@media (max-width: 600px) {
  .full-background {
    flex-direction: row;
    justify-content: space-around;
    padding: 0;
  }

  .text-container {
    margin-bottom: 0;
    max-width: 50%;
    text-align: center;
  }

  .text-container h1 {
    font-size: 2rem;
  }

  .text-container h1 .big-A {
    font-size: 3rem;
  }

  .text-container ul li {
    font-size: 1rem;
  }

  .logo {
    margin-top: 0;
    max-width: 50%;
    text-align: center;
  }

  .logo-image {
    width: 150px;
  }

  .app-description {
    font-size: 1rem;
    margin: 15px auto 30px;
  }
}

@media (min-width: 1024px) {
  .full-background {
    justify-content: space-evenly;
  }

  .text-container {
    align-items: flex-end;
    text-align: left;
  }

  .logo {
    justify-content: flex-start;
  }
}
</style>

