<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="11" md="10" lg="8">
        <v-card class="custom-card pa-4" elevation="16">
          <v-card-title class="text-h5 text-center mb-4">
            投稿詳細
          </v-card-title>

          <v-row justify="center" class="mt-4 mb-4">
            <v-btn class="custom-btn mx-2" color="green" @click="router.push({ name: 'comment_index' })">
              コメント一覧ページへ
            </v-btn>
            <v-btn class="custom-btn mx-2" color="green" @click="router.push({ name: 'comment_new' })">
              コメント投稿ページへ
            </v-btn>
            <v-btn class="custom-btn mx-2" color="orange" @click="redirectSpotEdit">
              編集ページへ
            </v-btn>
          </v-row>

          <v-card-text class="custom-card-text">
            <div class="mb-2">
              <strong>平均おすすめ度：</strong>{{ spot.average_rating }}
            </div>
            <div class="mb-2">
              <strong>平均混雑度：</strong>{{ spot.average_quiet_rating }}
            </div>

            <v-divider class="my-4"></v-divider>
            <div class="mb-2">
              <strong>スポット名：</strong>{{ spot.name }}
            </div>
            <div class="mb-2">
              <strong>タグ：</strong>
              <v-chip
                v-for="(tag, tagIndex) in spot.tags"
                :key="tagIndex"
                class="ma-1"
                color="primary"
                text-color="white"
              >
                {{ tag.name }}
              </v-chip>
            </div>
            <div class="mb-2">
              <strong>説明：</strong>{{ spot.body }}
            </div>
            <div class="mb-2">
              <strong>都道府県：</strong>{{ spot.prefecture.name }}
            </div>
            <div class="mb-2">
              <strong>市町村・番地：</strong>{{ spot.city }}
            </div>
          </v-card-text>

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
                    @click="openInfoWindow(spot.id)"
                    @mouseover="openInfoWindow(spot.id)"
                  >
                    <InfoWindow
                      v-model="isInfoWindowVisible"
                      v-if="infoWindowid === spot.id"
                      class="info-window"
                    >
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

          <v-divider class="my-4"></v-divider>

          <div class="text-center mb-4">
            評価をして他のユーザーに情報を共有しましょう
          </div>
          <v-row justify="center">
            <v-col cols="12" sm="6">
              <v-select
                :label="'おすすめ度'"
                v-model="assessment.rating"
                variant="outlined"
                density="compact"
                :items="ratings"
              />
            </v-col>
            <v-col cols="12" sm="6">
              <v-select
                :label="'混雑の少なさ'"
                v-model="assessment.quiet_rating"
                variant="outlined"
                density="compact"
                :items="ratings"
              />
            </v-col>
          </v-row>
          <v-row justify="center" class="mt-4">
            <v-btn class="custom-btn" color="orange" @click="createAssessment">
              送信
            </v-btn>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from '../plugins/axios';
import { GoogleMap, Marker, InfoWindow } from 'vue3-google-map'

const route = useRoute();
const router = useRouter();
const ratings = ref([1, 2, 3, 4, 5]);

const spot = ref({
  name: null,
  body: null,
  city: null,
  prefecture: { name: null },
  average_rating: null,
  average_quiet_rating: null,
  tags: [],
});
const assessment = ref({
  rating: null,
  quiet_rating: null,
});

onMounted(() => {
  fetchSpot();
});

const fetchSpot = () => {
  const token = localStorage.getItem('access-token');
  const client = localStorage.getItem('client');
  const uid = localStorage.getItem('uid');
  const headers = { 'access-token': token, uid, client };

  const id = route.params.id;
  axios
    .get(`api/v1/spots/${id}`, { headers })
    .then((res) => {
      console.log('レスポンス:', res.data);
      spot.value = res.data.spot;
    })
    .catch(() => {
      errors.value = ["スポット情報の取得に失敗しました。もう一度お試しください。"];
    });
};

const createAssessment = () => {
  const token = localStorage.getItem('access-token');
  const client = localStorage.getItem('client');
  const uid = localStorage.getItem('uid');
  const headers = { 'access-token': token, uid, client };

  const params = {
    rating: assessment.value.rating,
    quiet_rating: assessment.value.quiet_rating,
  };

  axios
    .post(`api/v1/spots/${spot.value.id}/assessments`, params, { headers })
    .then((res) => {
      assessment.value.rating = null;
      assessment.value.quiet_rating = null;
      spot.value = res.data.spot;
      alert('評価しました。');
    })
    .catch(() => {
      errors.value = ["評価の送信に失敗しました。もう一度お試しください。"];
    });
};

const redirectSpotEdit = () => {
  router.push({ name: 'spot_edit', params: { id: route.params.id } });
};
</script>

<style scoped>
.custom-card {
  max-width: 1000px;
  margin: 0 auto;
}

.custom-btn {
  font-size: 1rem;
  min-width: 120px;
}

.custom-card-text div {
  margin-bottom: 8px;
}

@media (max-width: 600px) {
  .custom-btn {
    font-size: 0.8rem;
    min-width: 100px;
  }
}
</style>
