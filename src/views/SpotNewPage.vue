<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="12" lg="12">
        <v-card elevation="16" class="pa-4 custom-card">
          <template v-if="errors.length">
            <v-alert type="error" dense>{{ errors.join(", ") }}</v-alert>
          </template>

          <v-card-title>スポット投稿</v-card-title>

          <v-text-field label="タイトル" v-model="name" outlined dense class="mb-4" />

          <v-textarea label="説明" v-model="body" outlined dense class="mb-4" />

          <v-combobox
            label="タグを選択もしくは新規登録"
            v-model="combo"
            :items="tags"
            item-title="name"
            item-value="name"
            outlined
            dense
            multiple
            class="mb-4"
          />

          <v-select
            label="都道府県"
            v-model="prefecture_id"
            :items="prefectures"
            item-title="name"
            item-value="id"
            outlined
            dense
            class="mb-4"
          />

          <v-text-field label="市町村・番地" v-model="city" outlined dense class="mb-4" />

          <div class="button-wrapper">
            <v-btn
              color="orange"
              class="post-btn"
              @click="post"
            >
              投稿する
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "../plugins/axios";
import { Loader } from "@googlemaps/js-api-loader";
import { useRouter } from "vue-router";

const prefectures = ref([]);
const tags = ref([]);
const errors = ref([]);
const name = ref(null);
const body = ref(null);
const combo = ref([]);
const prefecture_id = ref(null);
const city = ref(null);
const latitude = ref(null);
const longitude = ref(null);
const router = useRouter();
const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

onMounted(() => {
  fetchSpot();

  new Loader({
    apiKey,
    version: "Release",
    libraries: ["places", "drawing", "geometry", "visualization"],
    language: "ja",
  })
    .load()
    .then((google) => {
      window.google = google;
    })
    .catch(() => {
      alert("ページの読み込みに失敗しました。ページを再読み込みしてください。");
    });
});

const fetchSpot = () => {
  const token = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const uid = localStorage.getItem("uid");

  axios
    .get("/api/v1/spots/new", {
      headers: {
        "access-token": token,
        client: client,
        uid: uid,
      },
    })
    .then((res) => {
      prefectures.value = res.data.prefectures;
      tags.value = res.data.tags;
      errors.value = [];
    })
    .catch(() => {
      alert("ページの読み込みに失敗しました。ページを再読み込みしてください。");
    });
};

const geocodeAddress = (address, callback) => {
  const geocoder = new window.google.maps.Geocoder();
  geocoder.geocode({ address }, (results, status) => {
    if (status === "OK") {
      latitude.value = results[0].geometry.location.lat();
      longitude.value = results[0].geometry.location.lng();
      callback();
    } else {
      errors.value = ["住所の変換に失敗しました"];
    }
  });
};

const post = () => {
  const token = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const uid = localStorage.getItem("uid");

  const selectedPrefecture = prefectures.value.find(
    (prefecture) => prefecture.id === prefecture_id.value
  );

  const address = `${selectedPrefecture?.name || ""} ${city.value}`;

  geocodeAddress(address, () => {
    const params = {
      name: name.value,
      body: body.value,
      prefecture_id: prefecture_id.value,
      city: city.value,
      latitude: latitude.value,
      longitude: longitude.value,
      tags: combo.value,
    };

    axios
      .post("/api/v1/spots", params, {
        headers: {
          "access-token": token,
          client: client,
          uid: uid,
        },
      })
      .then((response) => {
        alert("投稿しました！");
        router.push(`/spots/${response.data.spot.id}`);
      })
      .catch((error) => {
        errors.value = error.response.data.errors || ["投稿に失敗しました"];
      });
  });
};
</script>

<style scoped>
.custom-card {
  max-width: 100%;
  width: 100%;
}

.post-btn {
  font-size: 1rem;
  padding: 10px 20px;
  background-color: orange;
  color: white;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  width: auto;
}

.post-btn:hover {
  background-color: darkorange;
}

.button-wrapper {
  text-align: center;
  margin-top: 16px;
}

@media (min-width: 820px) and (max-width: 1180px) and (orientation: portrait) {
  .custom-card {
    max-width: 700px;
    margin: 0;
  }
}

@media (min-width: 1024px) and (max-width: 1366px) {
  .custom-card {
    max-width: 800px;
  }
}
</style>


